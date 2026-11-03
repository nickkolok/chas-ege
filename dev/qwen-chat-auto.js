#!/usr/bin/env node
'use strict';

/*
 * qwen-chat-auto.js
 * ------------------------------------------------------------------
 * Автоматизация https://chat.qwen.ai через Puppeteer 23.0.0.
 *
 * Что делает:
 *   1. стартует Chrome на профиле --user-data-dir;
 *   2. проверяет логин: если /settings/general НЕ редиректит на "/" - залогинены;
 *   3. если не залогинены - логинится по --login/--password (email + SHA-256 пароль,
 *      двухшаговая форма: "Log in with a password" -> email/password -> Log in);
 *      если учетка не зарегистрирована/нет флагов - ругается и выходит;
 *   4. при --agent включает Agent Mode; если он недоступен - ругается и выходит;
 *   5. вводит --text или содержимое --text-file в поле чата;
 *   6. отправляет сообщение и ждет --post-wait (по умолчанию 30) секунд.
 *
 * Селекторы проверены на реальном DOM qwen-chat-fe 0.3.20 и 0.3.22.
 *
 * ГЛАВНАЯ ЛОВУШКА ЭТОГО САЙТА (найдена и исправлена 2026-10-22):
 *   qwen-chat-fe рендерит блок выбора режима ДВАЖДЫ. Первый узел ".mode-select-open"
 *   появляется примерно через 1.2 с после навигации, а ~3 с спустя React пересоздаёт
 *   его (у <ModeSelect/> меняется key "mode-selector-*" после прихода /api/v2/configs,
 *   списка моделей и featureStatuses). Первый узел отцепляется от документа, но
 *   остаётся живым JS-объектом вместе со своим поддеревом, поэтому:
 *     - handle.boundingBox() возвращает null;
 *     - handle.evaluate(el => el.click()) НЕ бросает ошибку и НИЧЕГО не делает
 *       (событие не доходит до корневого слушателя React);
 *     - в логе это выглядит как "Меню режимов не открылось после клика" без единой
 *       ошибки - именно так и падал --agent.
 *   Любой код вида "нашёл элемент -> сохранил handle -> потом кликнул" здесь гонится
 *   с ремаунтом. Что сделано:
 *     (а) ждём, пока узел ПЕРЕСТАНЕТ пересоздаваться (waitForStableVisible);
 *     (б) переразрешаем узел непосредственно перед кликом и проверяем isConnected
 *         (humanClick больше не кликает по мёртвым узлам и сообщает об этом);
 *     (в) после клика проверяем СОСТОЯНИЕ страницы, а не факт клика, и при неудаче
 *         эскалируем стратегию: мышь -> el.click() -> синтетическая последовательность
 *         pointer/mouse-событий -> onClick из __reactProps$;
 *     (г) поддержан и десктопный дропдаун, и мобильный drawer (.mode-selector-drawer);
 *     (д) ожидание переведено внутрь страницы (waitForFunction) - на медленной машине
 *         прежние циклы evaluateHandle растягивали 21 с ожидания до полутора минут;
 *     (е) починен --new-chat: [data-testid="sidebar-new-chat-button"] в 0.3.22 больше
 *         нет, из-за чего скрипт делал лишний полный reload страницы и гарантированно
 *         попадал в окно ремаунта композера.
 * ------------------------------------------------------------------
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const readline = require('readline');
const { parseArgs } = require('util');

const puppeteer = require('puppeteer');

const SITE = 'https://chat.qwen.ai';
const APP_VERSION_HINT = 'qwen-chat-fe 0.3.20/0.3.22';
/** Версии фронта, на которых селекторы и поведение проверены вживую. */
const TESTED_APP_VERSIONS = ['0.3.20', '0.3.22'];

/* ============================ exit codes ============================ */
const EXIT = {
  OK: 0,
  BAD_ARGS: 2,
  NOT_LOGGED_IN: 3,
  LOGIN_FAILED: 4,
  CAPTCHA_BLOCKED: 7,
  AGENT_UNAVAILABLE: 5,
  INPUT_NOT_FOUND: 6,
  SEND_FAILED: 8,
  LAUNCH_FAILED: 9,
  INTERNAL: 1,
};

/* ============================ logging ============================ */
const COLOR = process.stderr.isTTY && !process.env.NO_COLOR;
const C = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

let LOG_LEVEL = 'info';
const LEVELS = { debug: 10, info: 20, warn: 30, error: 40 };
const LOG_FILE = { fd: null };

function ts() {
  return new Date().toISOString().replace('T', ' ').replace('Z', '');
}

function emit(level, msg, extra) {
  if (LEVELS[level] < LEVELS[LOG_LEVEL]) return;
  const tag = { debug: 'DEBUG', info: 'INFO ', warn: 'WARN ', error: 'ERROR', ok: 'OK   ' }[level] || level;
  const color = { debug: C.dim, info: C.cyan, warn: C.yellow, error: C.red, ok: C.green }[level] || '';
  const line = `[${ts()}] [${tag}] ${msg}`;
  const styled = COLOR ? `${color}${line}${C.reset}` : line;
  process.stderr.write(styled + '\n');
  if (extra !== undefined) {
    const dump = typeof extra === 'string' ? extra : JSON.stringify(extra);
    for (const l of dump.split('\n')) process.stderr.write((COLOR ? C.dim : '') + '        ' + l + C.reset + '\n');
  }
  if (LOG_FILE.fd) {
    try {
      fs.writeSync(LOG_FILE.fd, stripAnsi(line) + (extra !== undefined ? '\n        ' + stripAnsi(typeof extra === 'string' ? extra : JSON.stringify(extra)) : '') + '\n');
    } catch (_) {}
  }
}
function stripAnsi(s) {
  return String(s).replace(/\x1b\[[0-9;]*m/g, '');
}

const log = {
  debug: (m, e) => emit('debug', m, e),
  info: (m, e) => emit('info', m, e),
  ok: (m, e) => emit('ok', m, e),
  warn: (m, e) => emit('warn', m, e),
  error: (m, e) => emit('error', m, e),
};

/* ============================ helpers ============================ */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rnd = (a, b) => a + Math.random() * (b - a);
const randInt = (a, b) => Math.floor(rnd(a, b + 1));

class StepError extends Error {
  constructor(message, exitCode, details) {
    super(message);
    this.exitCode = exitCode || EXIT.INTERNAL;
    this.details = details;
  }
}

function maskSecret(s) {
  if (!s) return '(empty)';
  if (s.length <= 4) return '*'.repeat(s.length);
  return s[0] + '*'.repeat(Math.max(3, s.length - 2)) + s[s.length - 1] + ` (len=${s.length})`;
}

function sha256hex(s) {
  return crypto.createHash('sha256').update(s, 'utf8').digest('hex');
}

function humanize(s, max = 90) {
  const one = String(s || '').replace(/\s+/g, ' ').trim();
  return one.length > max ? one.slice(0, max) + '...' : one;
}

/* ============================ CLI ============================ */
const OPTIONS_SPEC = {
  'user-data-dir': { type: 'string' },
  login: { type: 'string' },
  password: { type: 'string' },
  'password-stdin': { type: 'boolean', default: false },
  text: { type: 'string' },
  'text-file': { type: 'string' },
  agent: { type: 'boolean', default: false },
  headless: { type: 'boolean', default: false },
  lang: { type: 'string' },
  'no-force-lang': { type: 'boolean', default: false },
  'executable-path': { type: 'string' },
  channel: { type: 'string' },
  'window-size': { type: 'string', default: '1440,900' },
  'nav-timeout': { type: 'string', default: '60000' },
  'login-timeout': { type: 'string', default: '180000' },
  'element-timeout': { type: 'string', default: '15000' },
  'settle-delay': { type: 'string', default: '1200' },
  'type-delay': { type: 'string', default: '18' },
  'step-delay': { type: 'string', default: '400' },
  'post-wait': { type: 'string', default: '30' },
  'capture-timeout': { type: 'string', default: '45000' },
  'screenshots-dir': { type: 'string' },
  'no-screenshots': { type: 'boolean', default: false },
  'on-error-dump': { type: 'boolean', default: true },
  'no-on-error-dump': { type: 'boolean', default: false },
  'capture-response': { type: 'boolean', default: false },
  'dry-run': { type: 'boolean', default: false },
  'new-chat': { type: 'boolean', default: false },
  'keep-open': { type: 'boolean', default: false },
  'block-ads': { type: 'boolean', default: false },
  'profile-copy': { type: 'boolean', default: false },
  'log-level': { type: 'string', default: 'info' },
  'log-file': { type: 'string' },
  'verbose-logs': { type: 'boolean', default: false },
  help: { type: 'boolean', short: 'h', default: false },
  version: { type: 'boolean', short: 'v', default: false },
};

function usage() {
  return `qwen-chat-auto - автоматизация chat.qwen.ai (puppeteer 23.0.0)

ИСПОЛЬЗОВАНИЕ
  node qwen-chat-auto.js --user-data-dir <dir> (--text <s> | --text-file <f>) [опции]

ОБЯЗАТЕЛЬНО
  --user-data-dir <dir>      профиль Chrome (persistent context)
  --text <строка>            текст сообщения
  --text-file <путь>         текст сообщения из файла (нельзя вместе с --text)

АВТОРИЗАЦИЯ (нужна только если профиль не залогинен)
  --login <email>            либо $QWEN_LOGIN
  --password <secret>        либо $QWEN_PASSWORD (светится в истории shell!)
  --password-stdin           прочитать пароль из stdin (самый безопасный вариант)

РЕЖИМЫ / ПОВЕДЕНИЕ
  --agent                    переключиться в Agent Mode (ошибка, если недоступен)
  --new-chat                 начать новый чат перед вводом текста
  --dry-run                  ввести текст, но НЕ отправлять
  --capture-response         после отправки вытащить текст ответа в лог
  --keep-open                не закрывать браузер после завершения
  --headless                 без окна (по умолчанию - с окном: капчу Baxia/Aliyun
                             руками решать проще; в headless капча = выход с кодом 7)
  --lang <en-US|ru-RU|...>   форсировать язык интерфейса (default: en-US,
                             англ. UI делает матчинг по тексту надежнее)
  --no-force-lang            не трогать locale сайта
  --block-ads                резать аналитику/трекеры (alicdn aes, adjust, firebase...)
  --profile-copy             работать на временной копии профиля (оригинал не трогается)

БРАУЗЕР
  --executable-path <path>   явный путь к Chrome/Chromium
  --channel <chrome|...>     канал puppeteer
  --window-size <W,H>        default 1440,900

ТАЙМИНГИ
  --nav-timeout <ms>         default 60000
  --login-timeout <ms>        default 180000  (включая ручное решение капчи)
  --element-timeout <ms>     default 15000
  --settle-delay <ms>        пауза "на успокоение" SPA, default 1200
  --type-delay <ms>          средняя задержка между символами, default 18
  --step-delay <ms>          пауза между шагами, default 400
  --post-wait <sec>          сколько ждать после отправки, default 30
  --capture-timeout <ms>     default 45000

ДИАГНОСТИКА
  --screenshots-dir <dir>    default ./screenshots
  --no-screenshots           не делать скриншоты этапов
  --no-on-error-dump         не делать дамп (png+html) при ошибке
  --log-level <debug|info|warn|error>
  --log-file <path>          дублировать лог в файл
  --verbose-logs             писать console-сообщения страницы в лог

КОДЫ ВЫХОДА
  0 успех | 2 аргументы | 3 не залогинен и нет кредов | 4 логин не удался
  5 Agent Mode недоступен | 6 не найдено поле ввода | 7 капча (нет окна)
  8 не удалось отправить | 9 не запустился браузер | 1 прочее

ПРИМЕРЫ
  node qwen-chat-auto.js --user-data-dir ./profile-a --agent \\
      --text "Проверка связи! Представься и расскажи о себе парой предложений."

  QWEN_PASSWORD='...' node qwen-chat-auto.js --user-data-dir ./profile-a \\
      --login 04hwxsfx@tempmailpro.io --password-stdin --text-file msg.txt < pw.txt

  node qwen-chat-auto.js --user-data-dir ./profile-b --text-file msg.txt --headless
`;
}

function num(v, name, fallback) {
  if (v === undefined || v === '') return fallback;
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0) throw new StepError(`Некорректное числовое значение для --${name}: ${JSON.stringify(v)}`, EXIT.BAD_ARGS);
  return n;
}

function readPasswordStdin() {
  return new Promise((resolve, reject) => {
    try {
      if (process.stdin.isTTY) {
        // интерактивно: выключаем эхо
        const rl = readline.createInterface({ input: process.stdin, output: process.stderr, terminal: true });
        process.stderr.write('Пароль (ввод скрыт): ');
        rl._writeToOutput = function () {};
        rl.question('', (ans) => {
          rl.close();
          process.stderr.write('\n');
          resolve(ans);
        });
      } else {
        let data = '';
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', (d) => (data += d));
        process.stdin.on('end', () => resolve(data.replace(/[\r\n]+$/, '')));
        process.stdin.on('error', reject);
        process.stdin.resume();
      }
    } catch (e) {
      reject(e);
    }
  });
}

async function parseCli(argv) {
  let parsed;
  try {
    parsed = parseArgs({ args: argv, options: OPTIONS_SPEC, allowPositionals: false, strict: true });
  } catch (e) {
    throw new StepError(`Ошибка разбора аргументов: ${e.message}\n\n${usage()}`, EXIT.BAD_ARGS);
  }
  const f = parsed.values;

  if (f.help) {
    process.stdout.write(usage());
    process.exit(EXIT.OK);
  }
  if (f.version) {
    process.stdout.write(`qwen-chat-auto 1.0.0 (puppeteer ${require('puppeteer/package.json').version}, target ${APP_VERSION_HINT})\n`);
    process.exit(EXIT.OK);
  }

  LOG_LEVEL = (f['log-level'] || 'info').toLowerCase();
  if (!(LOG_LEVEL in LEVELS)) throw new StepError(`--log-level должен быть одним из: ${Object.keys(LEVELS).join(', ')}`, EXIT.BAD_ARGS);
  if (f['verbose-logs'] && LOG_LEVEL === 'info') LOG_LEVEL = 'debug';

  const cfg = {
    userDataDir: f['user-data-dir'],
    login: f.login || process.env.QWEN_LOGIN || '',
    password: f.password || process.env.QWEN_PASSWORD || '',
    passwordStdin: !!f['password-stdin'],
    text: f.text,
    textFile: f['text-file'],
    agent: !!f.agent,
    headless: !!f.headless,
    lang: f['no-force-lang'] ? null : f.lang || 'en-US',
    executablePath: f['executable-path'] || process.env.PUPPETEER_EXECUTABLE_PATH || '',
    channel: f.channel || '',
    windowSize: f['window-size'],
    navTimeout: num(f['nav-timeout'], 'nav-timeout', 60000),
    loginTimeout: num(f['login-timeout'], 'login-timeout', 180000),
    elementTimeout: num(f['element-timeout'], 'element-timeout', 15000),
    settleDelay: num(f['settle-delay'], 'settle-delay', 1200),
    typeDelay: num(f['type-delay'], 'type-delay', 18),
    stepDelay: num(f['step-delay'], 'step-delay', 400),
    postWaitSec: num(f['post-wait'], 'post-wait', 30),
    captureTimeout: num(f['capture-timeout'], 'capture-timeout', 45000),
    screenshotsDir: f['screenshots-dir'] || path.resolve('screenshots'),
    screenshots: !f['no-screenshots'],
    onErrorDump: !(f['no-on-error-dump'] || f['on-error-dump'] === false),
    captureResponse: !!f['capture-response'],
    dryRun: !!f['dry-run'],
    newChat: !!f['new-chat'],
    keepOpen: !!f['keep-open'],
    blockAds: !!f['block-ads'],
    profileCopy: !!f['profile-copy'],
    logFile: f['log-file'] || '',
    verboseLogs: !!f['verbose-logs'],
  };

  if (cfg.logFile) {
    try {
      fs.mkdirSync(path.dirname(path.resolve(cfg.logFile)), { recursive: true });
      LOG_FILE.fd = fs.openSync(path.resolve(cfg.logFile), 'a');
    } catch (e) {
      throw new StepError(`Не удалось открыть --log-file: ${e.message}`, EXIT.BAD_ARGS);
    }
  }

  /* ---- валидация ---- */
  if (!cfg.userDataDir) throw new StepError('Не указан --user-data-dir (обязательный флаг).\n\n' + usage(), EXIT.BAD_ARGS);

  if ((cfg.text !== undefined) && (cfg.textFile !== undefined)) {
    throw new StepError('Флаги --text и --text-file несовместимы: укажите что-то одно.', EXIT.BAD_ARGS);
  }
  if (cfg.text === undefined && cfg.textFile === undefined) {
    throw new StepError('Не задан текст сообщения: нужен --text или --text-file.\n\n' + usage(), EXIT.BAD_ARGS);
  }
  if (cfg.textFile !== undefined) {
    const p = path.resolve(cfg.textFile);
    if (!fs.existsSync(p)) throw new StepError(`--text-file: файл не найден: ${p}`, EXIT.BAD_ARGS);
    let stat;
    try {
      stat = fs.statSync(p);
    } catch (e) {
      throw new StepError(`--text-file: ${e.message}`, EXIT.BAD_ARGS);
    }
    if (!stat.isFile()) throw new StepError(`--text-file: это не обычный файл: ${p}`, EXIT.BAD_ARGS);
    cfg.messageText = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n').replace(/\n+$/, '');
    cfg.messageSource = `файл ${p} (${stat.size} байт)`;
  } else {
    cfg.messageText = String(cfg.text);
    cfg.messageSource = 'флаг --text';
  }
  if (!cfg.messageText || !cfg.messageText.trim()) {
    throw new StepError('Текст сообщения пуст после чтения источника - нечего отправлять.', EXIT.BAD_ARGS);
  }

  const [w, h] = String(cfg.windowSize).split(',').map((x) => parseInt(x, 10));
  if (!w || !h) throw new StepError(`--window-size должен быть в формате W,H (получено: ${cfg.windowSize})`, EXIT.BAD_ARGS);
  cfg.winW = w;
  cfg.winH = h;

  if (cfg.passwordStdin) {
    cfg.password = await readPasswordStdin();
  }
  cfg.hasCreds = Boolean(cfg.login && cfg.password);
  if (cfg.login && !cfg.password) {
    log.warn('Указан --login, но пароль не передан. Логин через UI будет невозможен.');
  }

  return cfg;
}

/* ============================ browser discovery ============================ */
function resolveExecutablePath(cfg) {
  const tried = [];
  if (cfg.executablePath) {
    tried.push(`flag:${cfg.executablePath}`);
    if (fs.existsSync(cfg.executablePath)) return cfg.executablePath;
    throw new StepError(`--executable-path не найден: ${cfg.executablePath}`, EXIT.LAUNCH_FAILED);
  }
  if (cfg.channel) return null; // puppeteer сам найдет по каналу
  try {
    const p = puppeteer.executablePath();
    tried.push(`puppeteer-cache:${p}`);
    if (p && fs.existsSync(p)) return p;
  } catch (e) {
    tried.push('puppeteer-cache: unavailable (' + e.message + ')');
  }
  const candidates = [
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/snap/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.CHROME_PATH,
  ].filter(Boolean);
  for (const c of candidates) {
    tried.push(`system:${c}`);
    try {
      if (fs.existsSync(c)) return c;
    } catch (_) {}
  }
  throw new StepError(
    'Не найден исполняемый файл Chrome/Chromium.\n' +
      'Установите браузер для puppeteer:  npx puppeteer browsers install chrome\n' +
      'или укажите путь явно:             --executable-path /path/to/chrome\n' +
      'Пробовали:\n  ' + tried.join('\n  '),
    EXIT.LAUNCH_FAILED
  );
}

function copyDirSync(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === 'SingletonLock' || entry.name === 'SingletonCookie' || entry.name === 'SingletonSocket') continue;
    if (entry.name === 'Cache' || entry.name === 'Code Cache' || entry.name === 'GPUCache' || entry.name === 'Crashpad') continue;
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyDirSync(s, d);
    else if (entry.isFile()) {
      try {
        fs.copyFileSync(s, d);
      } catch (_) {}
    }
  }
}

/* ============================ page helpers ============================ */
class Ctx {
  constructor(cfg, browser, page) {
    this.cfg = cfg;
    this.browser = browser;
    this.page = page;
    this.stepNo = 0;
    /** Версия фронта (qwen-chat-fe), определяется после открытия страницы чата. */
    this.appVersion = null;
  }
  get t() {
    return this.cfg;
  }
}

async function shot(ctx, name, fullPage = false) {
  if (!ctx.cfg.screenshots) return null;
  try {
    fs.mkdirSync(ctx.cfg.screenshotsDir, { recursive: true });
    const p = path.join(ctx.cfg.screenshotsDir, `${String(++ctx.stepNo).padStart(2, '0')}-${name}.png`);
    await ctx.page.screenshot({ path: p, fullPage });
    log.debug(`скриншот: ${p}`);
    return p;
  } catch (e) {
    log.warn(`не удалось сделать скриншот "${name}": ${e.message}`);
    return null;
  }
}

async function dumpDiagnostics(ctx, name) {
  const dir = ctx.cfg.screenshotsDir;
  const out = { name, at: new Date().toISOString(), userDataDir: ctx.cfg.userDataDir };
  try {
    fs.mkdirSync(dir, { recursive: true });
    out.url = ctx.page.url();
    out.title = await ctx.page.title().catch(() => '');
    const png = path.join(dir, `FAIL-${name}.png`);
    await ctx.page.screenshot({ path: png, fullPage: false }).catch(() => {});
    const html = path.join(dir, `FAIL-${name}.html`);
    fs.writeFileSync(html, await ctx.page.content());
    out.screenshot = png;
    out.html = html;
    out.visibleText = await ctx.page
      .evaluate(() => (document.body && document.body.innerText ? document.body.innerText.slice(0, 2000) : ''))
      .catch(() => '');
    out.captcha = await detectCaptcha(ctx.page);
  } catch (e) {
    out.dumpError = e.message;
  }
  log.error(`диагностический дамп "${name}"`, out);
  return out;
}

async function settle(ctx, mult = 1) {
  await sleep(Math.round(ctx.cfg.settleDelay * mult));
}

async function waitForFunctionSafe(page, fn, opts, ...args) {
  return page.waitForFunction(fn, { timeout: opts.timeout, polling: opts.polling || 250 }, ...args);
}

/** Прозрачная проверка "видимости" элемента по CSS-селектору. */
async function findVisible(page, selectors, timeout = 0) {
  const list = Array.isArray(selectors) ? selectors : [selectors];
  const deadline = Date.now() + timeout;
  for (;;) {
    for (const sel of list) {
      const handle = await page.evaluateHandle((s) => {
        const isVisible = (el) => {
          if (!el) return false;
          const cs = window.getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
          const r = el.getBoundingClientRect();
          if (r.width < 2 || r.height < 2) return false;
          if (el.closest('[aria-hidden="true"]')) return false;
          return true;
        };
        for (const el of Array.from(document.querySelectorAll(s))) {
          if (isVisible(el)) return el;
        }
        return null;
      }, sel);
      const el = handle.asElement();
      if (el) return { handle: el, selector: sel };
    }
    if (Date.now() >= deadline) return null;
    await sleep(200);
  }
}

/** Клик "по-человечески": скролл в область, движение мыши, пауза, клик по центру.
 *  Возвращает true, если клик состоялся, и false - если узел уже мёртв (stale handle).
 *  ПРОВЕРКА isConnected ОБЯЗАТЕЛЬНА: qwen-chat-fe пересоздаёт узлы композера, и клик по
 *  отцепленному узлу не бросает ошибку, а молча уходит в никуда (см. шапку файла). */
async function humanClick(page, handleOrSel, label = '') {
  let handle = handleOrSel;
  if (typeof handleOrSel === 'string') {
    const found = await findVisible(page, [handleOrSel], 0);
    if (!found) {
      log.warn(`не найден видимый элемент для клика: ${handleOrSel} (${label})`);
      return false;
    }
    handle = found.handle;
  }
  // живой ли узел? отцепленный от документа узел кликом не взять
  const alive = await handle.evaluate((el) => !!(el && el.isConnected && document.contains(el))).catch(() => false);
  if (!alive) {
    log.warn(
      `элемент "${label || '(без имени)'}" больше не в DOM (stale handle: React пересоздал узел) - ` +
        'клик отменён, элемент нужно найти заново'
    );
    return false;
  }
  try {
    await handle.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' }));
  } catch (_) {}
  await sleep(randInt(60, 180));
  let box = await handle.boundingBox();
  if (!box) {
    await sleep(200);
    box = await handle.boundingBox();
  }
  if (box && box.width > 0 && box.height > 0) {
    const x = box.x + box.width / 2 + rnd(-Math.min(4, box.width / 6), Math.min(4, box.width / 6));
    const y = box.y + box.height / 2 + rnd(-Math.min(3, box.height / 6), Math.min(3, box.height / 6));
    await page.mouse.move(x - rnd(30, 90), y - rnd(20, 60));
    await sleep(randInt(40, 120));
    await page.mouse.move(x, y, { steps: randInt(4, 12) });
    await sleep(randInt(50, 160));
    await page.mouse.down();
    await sleep(randInt(35, 95));
    await page.mouse.up();
  } else {
    log.warn(`"${label || 'элемент'}" не дал boundingBox (скрыт/перекрыт/вне вьюпорта) - кликаю программно`);
    await handle.evaluate((el) => el.click());
  }
  if (label) log.debug(`клик: ${label}`);
  await sleep(randInt(80, 200));
  return true;
}

/** Набор текста с рваным ритмом (antidetect: ровный интервал - явный признак бота). */
async function humanType(page, handle, text, baseDelay) {
  await handle.click({ clickCount: 1 });
  await sleep(randInt(60, 160));
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    // page.type корректно обрабатывает и "\n", и эмодзи из строки
    await page.keyboard.type(ch, { delay: 0 });
    let d = rnd(baseDelay * 0.45, baseDelay * 1.9);
    if (i % randInt(18, 40) === 0) d += rnd(120, 420); // микропауза "на обдумывание"
    if (/[.,!?;:\n]/.test(ch)) d += rnd(60, 220);
    await sleep(d);
  }
}

/**
 * Заполнение React-контролируемого инпута: native setter + полный набор событий.
 * Надёжнее, чем type() для ant-design форм, и не зависит от фокуса.
 */
async function setInputValue(page, handle, value, label = '') {
  const ok = await handle.evaluate((el, val) => {
    try {
      const proto = el instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
      el.focus();
      setter.call(el, val);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
      return el.value === val;
    } catch (e) {
      return false;
    }
  }, value);
  if (!ok) log.warn(`React-инпут "${label}" заполнен, но значение не сошлось - проверю ещё раз`);
  return ok;
}

async function detectCaptcha(page) {
  try {
    return await page.evaluate(() => {
      const q = (s) => !!document.querySelector(s);
      const hasBaxia = typeof window.__baxia__ !== 'undefined' || typeof window.baxiaCommon !== 'undefined';
      const slider = q('#aliyunCaptcha-sliding-slider') || q('.aliyun-captcha') || q('.nc-container') || q('#capture-container');
      // baxia-попап обычно вставляется в <header> или в конец body
      const iframe = Array.from(document.querySelectorAll('iframe')).map((f) => f.src || f.id || f.className).filter(Boolean);
      return {
        slider,
        hasBaxia,
        wafMeta: q('meta[name="aliyun_waf_aa"]'),
        suspiciousIframes: iframe.filter((s) => /captcha|baxia|punish|nocaptcha|aliyun/i.test(s)),
        bodyText: (document.body && document.body.innerText ? document.body.innerText.slice(0, 400) : ''),
      };
    });
  } catch (_) {
    return { slider: false, hasBaxia: false, wafMeta: false, suspiciousIframes: [], bodyText: '' };
  }
}

/* ============================ selectors (проверены на 0.3.20 и 0.3.22) ============================ */
const SEL = {
  // --- форма авторизации ---
  authRoot: '.qwenchat-page-auth',
  otpPanel: '.qwenchat-email-otp-panel',
  otpPanelButton: '.qwenchat-email-otp-panel-button',
  otpEmailInput: '.qwenchat-email-otp-panel-email-input input[name="email"]',
  otpReturnButton: '.qwenchat-email-otp-panel-return button',
  authInputs: '.qwenchat-auth-pc-input-items',
  emailInput: '.qwenchat-auth-pc-input-items input[name="email"]',
  passwordInput: '.qwenchat-auth-pc-input-items input[name="password"]',
  submitButton: '.qwenchat-auth-pc-submit-button',
  forgetRow: '.qwenchat-auth-pc-forget',
  otpCodeCells: '.qwenchat-verification-code-input-cell',
  mobileEmailInput: '.qwenchat-auth-mobile-input-items input[name="email"]',
  mobilePasswordInput: '.qwenchat-auth-mobile-input-items input[name="password"]',

  // --- чат ---
  textarea: 'textarea.message-input-textarea',
  inputContainer: '.message-input-container',
  sendWrap: '.message-input-right-button-send',
  // 0.3.22: data-testid из сайдбара исчез, кнопка "New Chat" - это
  // div.new-chat / [aria-label="New Chat"] (см. startNewChat)
  newChatButton: '[data-testid="sidebar-new-chat-button"]',
  // 0.3.22: контейнер сообщений - это ID (#chat-message-container), а не класс,
  // поэтому прежний '.chat-message-container' не матчил ничего и проверка отправки
  // деградировала до "URL похож на /c/". Сами сообщения: .chat-user-message (наши)
  // и .chat-response-message (ответы).
  messageContainer: '#chat-message-container',
  messageUser: '.chat-user-message',
  messageResponse: '.chat-response-message',
  // Кнопка отправки. ВАЖНО: в .message-input-right-button-send при ПУСТОМ поле ввода
  // лежит кнопка голосового режима (aria-label="Voice mode", .omb__btn), а при тексте -
  // button.send-button[aria-label="Send"]. Кликаем строго по Send.
  sendButton:
    '.message-input-right-button-send button.send-button, .message-input-right-button-send button[aria-label="Send"], .chat-prompt-send-button button',

  // --- переключатель режимов ---
  // Как это устроено в qwen-chat-fe 0.3.20/0.3.22 (проверено на живом DOM):
  //  * Триггер меню - div.mode-select-open (role="button", aria-label="Select Mode",
  //    иконка "+"). onClick висит НЕ на нём, а на обёртке
  //    .qwen-chat-v2-dropdown-menu-trigger, поэтому клик по "+" всплывает до неё.
  //  * Признаки "меню открыто": класс .mode-select-open-active на триггере,
  //    .mode-select-dropdown-menu внутри .qwen-chat-v2-dropdown-menu-popup
  //    (поповер портируется в .message-input-container, а НЕ в body).
  //  * На мобильной верстке (store.mobile) вместо дропдауна открывается drawer
  //    .mode-selector-drawer-container с пунктами .mode-selector-drawer-item /
  //    .mode-selector-drawer-list-item.
  //  * ".mode-select-current-mode" - чип УЖЕ выбранного режима (иконка + название +
  //    крестик ".mode-select-current-mode-close"). Клик по нему открывает поповер
  //    "Add more details", а НЕ список режимов.
  //  * Кликабельный пункт меню - ".mode-select-common-item" (он же [role="menuitem"],
  //    базовый класс "qwen-chat-v2-dropdown-menu-item"). Когда пункт недоступен, на нём
  //    aria-disabled="true" и класс "qwen-chat-v2-dropdown-menu-item-disabled".
  //  * Название пункта - ".mode-select-dropdown-item-name" (например "Agent Mode"),
  //    бейдж (например "Beta") - ".mode-select-dropdown-item-tag".
  //  * ВАЖНО: весь блок .mode-select ПЕРЕСОЗДАЁТСЯ React'ом примерно через 3 с после
  //    навигации (key "mode-selector-*" меняется после прихода конфигов/моделей).
  //    Handle, взятый до ремаунта, после него указывает на отцепленный узел: клик по
  //    нему НЕ бросает ошибку и НИЧЕГО не делает. Поэтому узлы ищем заново прямо перед
  //    кликом (waitForStableVisible + findModeItemFresh + tryOpenModeMenu).
  modeSelect: '.mode-select',
  modeOpen: '.mode-select-open',
  modeOpenActive: '.mode-select-open-active',
  modeOpenByLabel: '[aria-label="Select Mode"]',
  modeTriggerWrap: '.mode-select .qwen-chat-v2-dropdown-menu-trigger',
  modeCurrent: '.mode-select-current-mode',
  modeCurrentClose: '.mode-select-current-mode-close',
  modeDropdownMenu: '.mode-select-dropdown-menu',
  modeDropdownPopup: '.qwen-chat-v2-dropdown-menu-popup',
  modeItem: '.mode-select-common-item',
  modeItemRole: '[role="menuitem"]',
  modeItemName: '.mode-select-dropdown-item-name',
  modeItemTag: '.mode-select-dropdown-item-tag',
  modeItemDisabledClass: 'qwen-chat-v2-dropdown-menu-item-disabled',
  modeSubPopover: '.mode-select-sub-popover-container',
  modeDrawer: '.mode-selector-drawer-container, .mode-selector-drawer',
  modeDrawerItem: '.mode-selector-drawer-item, .mode-selector-drawer-list-item',

  // --- то, что может перекрыть клик (модалки, онбординг-тур, куки-баннер) ---
  blockers: [
    '.qwen-chat-v2-modal-root',
    '[class*="welcome-modal"]',
    '[class*="onboarding"]',
    '[class*="guide-mask"]',
    '[class*="tour-"]',
    '[class*="cookie"][class*="banner"]',
    '[class*="cookie-confirm"]',
  ],

  // --- капча ---
  captcha: ['#aliyunCaptcha-sliding-slider', '.aliyun-captcha', '.nc-container', '#capture-container'],
};

/** Текст кнопок/пунктов меню: en + ru (сайт локализуется, а matching по тексту хрупкий). */
const TXT = {
  loginWithPassword: ['Log in with a password', 'Войти с паролем', 'Вход с паролем'],
  loginSubmit: ['Log in', 'Войти'],
  signInSubmit: ['Sign in', 'Войти'],
  continue: ['Continue', 'Продолжить'],
  agentMode: ['Agent Mode', 'Режим агента', 'Агент'],
  more: ['More', 'Ещё', 'Еще'],
};

/* ==================== внутристраничные хелперы (window.__qca) ====================
 * Небольшой набор функций, который инжектится в КАЖДЫЙ документ страницы
 * (evaluateOnNewDocument). Зачем:
 *   1) все проверки видимости/живости узла делаются одним вызовом внутри страницы -
 *      на медленной машине это в разы быстрее, чем цикл evaluateHandle из Node
 *      (прежний waitForAny на 15 с мог растягиваться до минуты);
 *   2) узлы ищутся ЗАНОВО в момент клика, поэтому отцепленный (stale) handle
 *      физически не может быть использован.
 */
const QCA_VERSION = 3; // должно совпадать с "ver:" внутри QCA_SRC
const QCA_SRC = [
  '(() => {',
  '  const isVisible = (el) => {',
  '    if (!el || el.nodeType !== 1) return false;',
  '    const cs = window.getComputedStyle(el);',
  '    if (cs.display === "none" || cs.visibility === "hidden" || Number(cs.opacity) === 0) return false;',
  '    const r = el.getBoundingClientRect();',
  '    if (r.width < 2 || r.height < 2) return false;',
  '    if (el.closest(\'[aria-hidden="true"]\')) return false;',
  '    return true;',
  '  };',
  '  const all = (sel) => Array.prototype.slice.call(document.querySelectorAll(sel));',
  '  const firstVisible = (sels) => {',
  '    for (let i = 0; i < sels.length; i++) { const list = all(sels[i]); for (let j = 0; j < list.length; j++) { if (isVisible(list[j])) return list[j]; } }',
  '    return null;',
  '  };',
  '  const mkEvent = (type) => {',
  '    const base = { bubbles: true, cancelable: true, composed: true, view: window };',
  '    if (type.indexOf("pointer") === 0) {',
  '      try {',
  '        return new PointerEvent(type, Object.assign(base, { pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0, buttons: /down$/.test(type) ? 1 : 0 }));',
  '      } catch (e) { return new MouseEvent(type.replace("pointer", "mouse"), base); }',
  '    }',
  '    if (type.indexOf("key") === 0) return new KeyboardEvent(type, Object.assign(base, { key: "Enter", code: "Enter", keyCode: 13, which: 13 }));',
  '    return new MouseEvent(type, Object.assign(base, { button: 0, buttons: /down$/.test(type) ? 1 : 0 }));',
  '  };',
  '  const fire = (el, type) => el.dispatchEvent(mkEvent(type));',
  '  const clickSeq = (el) => {',
  '    const seq = ["pointerover", "pointerenter", "mouseover", "mouseenter", "pointerdown", "mousedown", "pointerup", "mouseup", "click"];',
  '    try { el.focus({ preventScroll: true }); } catch (e) {}',
  '    for (let i = 0; i < seq.length; i++) fire(el, seq[i]);',
  '  };',
  '  const reactProps = (el, maxDepth) => {',
  '    let cur = el, depth = 0;',
  '    while (cur && depth <= (maxDepth || 6)) {',
  '      const keys = Object.keys(cur);',
  '      for (let i = 0; i < keys.length; i++) {',
  '        if (keys[i].indexOf("__reactProps") === 0 && cur[keys[i]]) return { node: cur, props: cur[keys[i]], depth: depth };',
  '      }',
  '      cur = cur.parentElement; depth++;',
  '    }',
  '    return null;',
  '  };',
  '  const fakeReactEvent = (target, currentTarget) => ({',
  '    type: "click", target: target, currentTarget: currentTarget || target, nativeEvent: mkEvent("click"),',
  '    bubbles: true, cancelable: true, defaultPrevented: false, isTrusted: false,',
  '    preventDefault() {}, stopPropagation() {}, stopImmediatePropagation() {}, persist() {},',
  '  });',
  '  const _ids = new WeakMap();',
  '  let _n = 0;',
  '  const idOf = (el) => { if (!el) return 0; let v = _ids.get(el); if (!v) { v = ++_n; _ids.set(el, v); } return v; };',
  '  const describe = (el) => {',
  '    if (!el) return null;',
  '    let cls = el.className;',
  '    if (cls && typeof cls !== "string") cls = cls.baseVal;',
  '    return { tag: el.tagName, cls: String(cls || "").trim().split(/\\s+/).slice(0, 4).join("."), id: el.id || "" };',
  '  };',
  '  const topAt = (el) => {',
  '    const r = el.getBoundingClientRect();',
  '    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;',
  '    const inVp = cx >= 0 && cy >= 0 && cx <= window.innerWidth && cy <= window.innerHeight;',
  '    if (!inVp) return { covered: true, by: null, reason: "outside viewport", rect: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)] };',
  '    const top = document.elementFromPoint(cx, cy);',
  '    if (!top) return { covered: true, by: null, reason: "elementFromPoint=null" };',
  '    if (top === el) return { covered: false, by: "self" };',
  '    if (el.contains(top)) return { covered: false, by: "child" };',
  '    if (top.contains && top.contains(el)) return { covered: false, by: "parent:" + (describe(top) || {}).cls };',
  '    return { covered: true, by: describe(top), reason: "another element is on top" };',
  '  };',
  '  window.__qca = { ver: 3, isVisible: isVisible, all: all, firstVisible: firstVisible, fire: fire, clickSeq: clickSeq,',
  '    mkEvent: mkEvent, reactProps: reactProps, fakeReactEvent: fakeReactEvent, idOf: idOf, describe: describe, topAt: topAt };',
  '})();',
].join('\n');

/** Гарантируем, что __qca есть в текущем документе (после навигации он ставится сам). */
async function ensureQca(page) {
  let ok = false;
  try {
    ok = await page.evaluate((v) => !!(window.__qca && window.__qca.ver === v), QCA_VERSION);
  } catch (_) {}
  if (!ok) {
    try {
      await page.evaluate(QCA_SRC);
      ok = await page.evaluate((v) => !!(window.__qca && window.__qca.ver === v), QCA_VERSION);
    } catch (_) {}
  }
  if (!ok) log.debug('window.__qca не установился - использую резервные проверки на стороне Node');
  return ok;
}

/** Ошибки страницы копим всегда: если React-компонент упал, клик по нему "молча" не сработает. */
const PAGE_ERRORS = [];
function rememberPageError(where, msg) {
  PAGE_ERRORS.push({ where, at: ts(), msg: String(msg).slice(0, 300) });
  if (PAGE_ERRORS.length > 12) PAGE_ERRORS.shift();
}

/** Версия фронта, которую реально отдаёт сайт (из URL бандла qwen-chat-fe). */
async function readAppVersion(page) {
  try {
    return await page.evaluate(() => {
      const srcs = Array.prototype.slice
        .call(document.querySelectorAll('script[src],link[href]'))
        .map((e) => e.src || e.href)
        .filter(Boolean);
      const hit = srcs.find((u) => /qwen-chat-fe\//.test(u));
      return hit ? (hit.match(/qwen-chat-fe\/([^/]+)\//) || [])[1] || null : null;
    });
  } catch (_) {
    return null;
  }
}

/**
 * Ждём не просто появления элемента, а момента, когда ОДИН И ТОТ ЖЕ узел перестанет
 * пересоздаваться (продержится stableMs подряд).
 * Это главная защита от ремаунта композера qwen-chat-fe: handle, взятый до ремаунта,
 * после него указывает на отцепленный узел, и клик по нему молча уходит в никуда.
 */
async function waitForStableVisible(page, selectors, opts = {}) {
  const list = Array.isArray(selectors) ? selectors : [selectors];
  const timeout = opts.timeout === undefined ? 15000 : opts.timeout;
  const stableMs = opts.stableMs === undefined ? 700 : opts.stableMs;
  const label = opts.label || list[0];
  const t0 = Date.now();
  await ensureQca(page);
  let stable = true;
  try {
    await page.waitForFunction(
      (sels, stableFor) => {
        const Q = window.__qca;
        if (!Q) return 0;
        const el = Q.firstVisible(sels);
        if (!el) {
          Q.stab = null;
          return 0;
        }
        const id = Q.idOf(el);
        if (!Q.stab || Q.stab.id !== id) {
          Q.stab = { id: id, since: Date.now() };
          return 0;
        }
        return Date.now() - Q.stab.since >= stableFor ? 1 : 0;
      },
      { timeout, polling: 120 },
      list,
      stableMs
    );
  } catch (_) {
    stable = false;
    log.debug(`${label}: не дождался стабильного узла за ${timeout} мс (элемента может не быть вовсе)`);
  }
  const hit = await findVisible(page, list, 0);
  if (hit) {
    const id = await hit.handle.evaluate((el) => (window.__qca ? window.__qca.idOf(el) : 0)).catch(() => 0);
    log.debug(`${label}: узел #${id} ${stable ? 'стабилен' : 'найден, но не стабилен'}, ждали ${Date.now() - t0} мс`);
  }
  return hit;
}

/* ============================ launch ============================ */
async function launchBrowser(cfg) {
  const executablePath = resolveExecutablePath(cfg);

  let userDataDir = path.resolve(cfg.userDataDir);
  let tempCopy = null;
  if (cfg.profileCopy) {
    if (!fs.existsSync(userDataDir)) {
      log.warn(`--profile-copy: исходный профиль ${userDataDir} не существует - создаю пустой`);
      fs.mkdirSync(userDataDir, { recursive: true });
    }
    tempCopy = fs.mkdtempSync(path.join(os.tmpdir(), 'qwen-profile-'));
    log.info(`копирую профиль в ${tempCopy} (кэши браузера пропускаю)`);
    copyDirSync(userDataDir, tempCopy);
    userDataDir = tempCopy;
  } else {
    fs.mkdirSync(userDataDir, { recursive: true });
  }

  const args = [
    `--user-data-dir=${userDataDir}`,
    `--window-size=${cfg.winW},${cfg.winH}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-blink-features=AutomationControlled',
    '--disable-features=IsolateOrigins,site-per-process,AutomationControllerForContentScripts',
    '--disable-dev-shm-usage',
    '--start-maximized',
    '--lang=' + (cfg.lang || 'en-US').split('-')[0],
  ];
  if (process.getuid && process.getuid() === 0) args.push('--no-sandbox', '--disable-setuid-sandbox');

  const launchOpts = {
    headless: cfg.headless ? true : false,
    args,
    defaultViewport: null,
    protocolTimeout: Math.max(cfg.navTimeout, 120000),
    ignoreDefaultArgs: ['--enable-automation', '--disable-popup-blocking'],
  };
  if (executablePath) launchOpts.executablePath = executablePath;
  if (cfg.channel) launchOpts.channel = cfg.channel;

  log.info(`запускаю браузер: ${cfg.headless ? 'headless' : 'headed'}`);
  log.debug('executablePath: ' + (executablePath || '(channel ' + cfg.channel + ')'));
  log.debug('userDataDir: ' + userDataDir);
  log.debug('args: ' + args.join(' '));

  let browser;
  try {
    browser = await puppeteer.launch(launchOpts);
  } catch (e) {
    throw new StepError(
      `Не удалось запустить браузер: ${e.message}\n` +
        'Проверьте, что Chrome/Chromium установлен (npx puppeteer browsers install chrome), ' +
        'и что этот профиль сейчас не открыт другим окном Chrome.',
      EXIT.LAUNCH_FAILED
    );
  }

  const pages = await browser.pages();
  const page = pages[0] || (await browser.newPage());
  await page.setViewport({ width: cfg.winW, height: cfg.winH }).catch(() => {});

  /* --- антидетект: убираем webdriver и чиним плагины/языки --- */
  await page.evaluateOnNewDocument(() => {
    try {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined, configurable: true });
      Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'], configurable: true });
      Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5], configurable: true });
      window.chrome = window.chrome || { runtime: {}, app: { isInstalled: false } };
      const q = window.navigator.permissions && window.navigator.permissions.query;
      if (q) {
        window.navigator.permissions.query = (p) =>
          p && p.name === 'notifications' ? Promise.resolve({ state: Notification.permission }) : q(p);
      }
    } catch (_) {}
  });

  /* --- наши внутристраничные хелперы: ставятся в каждый новый документ --- */
  await page.evaluateOnNewDocument(QCA_SRC).catch(() => {});
  await ensureQca(page);

  /* --- форсируем язык UI (для надежного матчинга по тексту) --- */
  if (cfg.lang) {
    await page
      .evaluateOnNewDocument((lang) => {
        try {
          if (location.hostname.endsWith('qwen.ai') || location.hostname.endsWith('qwen.com')) {
            localStorage.setItem('locale', lang);
          }
        } catch (_) {}
      }, cfg.lang)
      .catch(() => {});
    log.info(`форсирую язык интерфейса: ${cfg.lang}`);
  }

  /* --- опциональная блокировка аналитики --- */
  if (cfg.blockAds) {
    const BLOCK = /(aes|adjust|firebase|googletagmanager|google-analytics|doubleclick|aplus|hotjar|sentry)/i;
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const u = req.url();
      if (BLOCK.test(u) && !/alicdn\.com\/frontend-lib/.test(u)) {
        req.abort().catch(() => {});
      } else {
        req.continue().catch(() => {});
      }
    });
    log.info('блокировка аналитики/трекеров включена (--block-ads)');
  }

  if (cfg.verboseLogs) {
    page.on('console', (m) => log.debug(`[page console:${m.type()}] ${humanize(m.text(), 300)}`));
  }
  // Ошибки страницы копим ВСЕГДА (а не только в verbose): если React-компонент упал,
  // клик по нему молча не сработает, и без этой информации причину не установить.
  page.on('pageerror', (e) => {
    rememberPageError('pageerror', (e && e.message) || e);
    if (cfg.verboseLogs) log.debug('[page error] ' + humanize(e.message, 300));
  });
  page.on('framenavigated', (f) => {
    if (f === page.mainFrame()) ensureQca(page).catch(() => {});
  });
  page.on('dialog', async (d) => {
    log.warn(`диалог страницы (${d.type()}): ${humanize(d.message(), 160)} - принимаю`);
    await d.accept().catch(() => {});
  });
  browser.on('disconnected', () => log.warn('браузер отключился (disconnected)'));

  page.setDefaultTimeout(cfg.elementTimeout);
  page.setDefaultNavigationTimeout(cfg.navTimeout);

  return { browser, page, tempCopy, userDataDir };
}

/* ============================ login check ============================ */

/**
 * Достаем признаки сессии со страницы.
 * ВАЖНО: токен qwen-chat хранит НЕ в простом localStorage["active_token"],
 * а через token-coordinator (localStorage/sessionStorage + маркер
 * "qwen_token_session_marker"), поэтому смотрим все хранилища и ищем JWT-подобное.
 */
async function readSessionState(page) {
  return page.evaluate(async () => {
    const looksLikeJwt = (v) => typeof v === 'string' && v.split('.').length === 3 && v.length > 40;
    const hits = [];
    for (const storeName of ['localStorage', 'sessionStorage']) {
      let store;
      try {
        store = window[storeName];
      } catch (_) {
        continue;
      }
      if (!store) continue;
      for (let i = 0; i < store.length; i++) {
        let k;
        try {
          k = store.key(i);
        } catch (_) {
          continue;
        }
        if (!k) continue;
        let v = '';
        try {
          v = store.getItem(k) || '';
        } catch (_) {
          continue;
        }
        if (/token|jwt|session|auth/i.test(k) && v.length > 10) {
          hits.push({ store: storeName, key: k, preview: v.slice(0, 12), len: v.length, jwt: looksLikeJwt(v) });
        }
        if (looksLikeJwt(v)) hits.push({ store: storeName, key: k, preview: v.slice(0, 12), len: v.length, jwt: true });
      }
    }
    const cookies = document.cookie ? document.cookie.split(';').map((c) => c.trim().split('=')[0]) : [];
    const tokenishCookies = cookies.filter((c) => /token|session|auth|uid/i.test(c));

    // дополнительный (не обязательный) признак: авторизованный запрос к своему API из контекста страницы
    let api = { status: null, ok: false, id: null, email: null, error: null };
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 9000);
      const r = await fetch('/api/v2/auths/', {
        method: 'GET',
        credentials: 'include',
        headers: { accept: 'application/json' },
        signal: ctrl.signal,
      });
      clearTimeout(t);
      api.status = r.status;
      const ct = r.headers.get('content-type') || '';
      if (/json/i.test(ct)) {
        const j = await r.json();
        api.ok = r.status === 200 && !!j;
        api.id = j && (j.id || null);
        api.email = j && (j.email || null);
        api.role = j && (j.role || null);
      } else {
        api.ok = false;
        api.error = 'non-json (' + ct.slice(0, 40) + ')';
      }
    } catch (e) {
      api.error = String((e && e.message) || e).slice(0, 120);
    }

    return {
      url: location.href,
      path: location.pathname,
      title: document.title,
      hits: hits.slice(0, 12),
      tokenishCookies,
      api,
      text: document.body && document.body.innerText ? document.body.innerText.slice(0, 300) : '',
    };
  });
}

async function isLoggedIn(ctx, reason = '') {
  const { page, cfg } = ctx;
  log.info(`проверяю авторизацию${reason ? ' (' + reason + ')' : ''}: открываю ${SITE}/settings/general`);

  let resp = null;
  try {
    resp = await page.goto(`${SITE}/settings/general`, { waitUntil: 'domcontentloaded', timeout: cfg.navTimeout });
  } catch (e) {
    log.warn(`goto /settings/general бросил исключение: ${humanize(e.message, 160)} - смотрю, куда мы в итоге попали`);
  }
  await settle(ctx, 1.2);

  // SPA может доредиректить уже после domcontentloaded: ждем, пока URL устоится
  try {
    await page.waitForFunction(
      (origin) => {
        if (!location.href.startsWith(origin)) return true; // ушли на другой домен
        if (!/\/settings\/general/.test(location.pathname)) return true; // редирект прочь из настроек
        // всё еще на настройках: ждем появления контента
        return document.querySelectorAll('input,button,[role="button"]').length > 0;
      },
      { timeout: Math.min(8000, Math.max(cfg.elementTimeout, 8000)), polling: 200 },
      SITE
    );
  } catch (_) {}
  await sleep(500);

  const state = await readSessionState(page);
  const onSettings = /^\/settings(\/|$)/.test(state.path);

  log.debug('состояние после перехода', {
    url: state.url,
    path: state.path,
    httpStatus: resp ? resp.status() : 'n/a',
    onSettings,
    tokenKeys: state.hits.map((h) => `${h.store}:${h.key}${h.jwt ? '(jwt)' : ''}`),
    cookies: state.tokenishCookies,
    api: state.api,
    text: humanize(state.text, 120),
  });

  // Главное правило из ТЗ: /settings/general открывается => залогинены.
  // Анонима сайт редиректит на "/" - это и есть признак "не залогинен".
  if (onSettings) {
    const extra = state.api.ok
      ? `, API /api/v2/auths/ -> 200 (id=${state.api.id}, email=${state.api.email})`
      : `, API /api/v2/auths/ -> ${state.api.status || state.api.error || 'n/a'}`;
    log.ok(`профиль ЗАЛОГИНЕН: /settings/general открылся (url=${state.url}${extra})`);
    await shot(ctx, 'logged-in-settings');
    return true;
  }

  log.warn(
    `профиль НЕ залогинен: /settings/general не открылся, нас редиректнуло на ${state.url} ` +
      `(path=${state.path}, token-ключей найдено: ${state.hits.length}, API /api/v2/auths/ -> ${state.api.status || state.api.error || 'n/a'})`
  );
  await shot(ctx, 'not-logged-in');
  return false;
}

/* ============================ login flow ============================ */
async function clickByText(page, texts, scopeSel, label, timeout) {
  const list = Array.isArray(texts) ? texts : [texts];
  const found = await page.evaluateHandle(
    (scope, wanted) => {
      const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
      const root = scope ? document.querySelector(scope) : document;
      if (!root) return null;
      const cands = Array.from(
        root.querySelectorAll('button, [role="button"], a, .qwen-chat-v2-btn, span.qwen-chat-v2-btn-content')
      );
      for (const w of wanted) {
        const target = norm(w);
        for (const el of cands) {
          const own = norm(el.textContent);
          if (!own) continue;
          if (own === target || own.startsWith(target)) {
            // предпочитаем кликабельного предка
            const clickable = el.closest('button,[role="button"],a') || el;
            const cs = getComputedStyle(clickable);
            if (cs.display === 'none' || cs.visibility === 'hidden') continue;
            const r = clickable.getBoundingClientRect();
            if (r.width < 2 || r.height < 2) continue;
            return clickable;
          }
        }
      }
      return null;
    },
    scopeSel || null,
    list
  );
  const el = found.asElement();
  if (!el) {
    if (timeout) throw new StepError(`Не найдена кнопка "${list[0]}" (${label}) за ${timeout} мс`, EXIT.LOGIN_FAILED);
    return null;
  }
  let clicked = await humanClick(page, el, label || list[0]);
  if (clicked === false) {
    // узел успели пересоздать (форма логина тоже React) - ищем заново и кликаем ещё раз
    log.debug(`"${label || list[0]}": клик по stale-узлу, пробую заново`);
    await sleep(400);
    const retry = await page.evaluateHandle(
      (wanted) => {
        const norm = (t) => (t || '').replace(/\s+/g, ' ').trim().toLowerCase();
        const cands = Array.prototype.slice.call(document.querySelectorAll('button, [role="button"], a, .qwen-chat-v2-btn'));
        for (let i = 0; i < wanted.length; i++) {
          const target = norm(wanted[i]);
          for (let j = 0; j < cands.length; j++) {
            const own = norm(cands[j].textContent);
            if (own && (own === target || own.indexOf(target) === 0) && cands[j].isConnected) return cands[j];
          }
        }
        return null;
      },
      list
    );
    const el2 = retry.asElement();
    if (el2) {
      await humanClick(page, el2, (label || list[0]) + ' (retry)');
      return el2;
    }
  }
  return el;
}

async function waitForAny(page, selectors, timeout, label) {
  const list = Array.isArray(selectors) ? selectors : [selectors];
  // Ждём ВНУТРИ страницы одним вызовом вместо цикла evaluateHandle из Node: на медленной
  // машине/тяжёлой странице прежний цикл растягивал ожидание в разы (6 с -> 30+ с) и
  // лишний раз дёргал main thread.
  try {
    await page.waitForFunction(
      (sels) => {
        const Q = window.__qca;
        const isVisible = Q
          ? Q.isVisible
          : (el) => {
              if (!el || el.nodeType !== 1) return false;
              const cs = getComputedStyle(el);
              if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
              const r = el.getBoundingClientRect();
              return r.width > 2 && r.height > 2 && !el.closest('[aria-hidden="true"]');
            };
        for (let i = 0; i < sels.length; i++) {
          const nodes = document.querySelectorAll(sels[i]);
          for (let j = 0; j < nodes.length; j++) if (isVisible(nodes[j])) return true;
        }
        return false;
      },
      { timeout, polling: 120 },
      list
    );
  } catch (_) {
    log.debug(`${label}: не появился за ${timeout} мс`);
    return null;
  }
  const hit = await findVisible(page, list, 0);
  if (hit) log.debug(`${label}: найден ${hit.selector}`);
  return hit;
}

async function handleCaptchaIfAny(ctx, stageLabel) {
  const cap = await detectCaptcha(ctx.page);
  const shown = cap.slider || cap.wafMeta || (cap.suspiciousIframes && cap.suspiciousIframes.length > 0);
  if (!shown) return false;

  log.warn(
    `Обнаружена капча/антибот (Aliyun Baxia) на этапе "${stageLabel}": ` +
      `slider=${cap.slider}, wafMeta=${cap.wafMeta}, iframes=${JSON.stringify(cap.suspiciousIframes)}`
  );
  await shot(ctx, 'captcha-detected');

  if (ctx.cfg.headless) {
    throw new StepError(
      'Сработала капча Aliyun Baxia, а браузер запущен в --headless - решить её некому.\n' +
        'Запустите без --headless и проведите слайдер руками (скрипт подождет --login-timeout), ' +
        'либо используйте уже "прогретый" профиль.',
      EXIT.CAPTCHA_BLOCKED
    );
  }

  log.warn(
    `!!! ТРЕБУЕТСЯ РУЧНОЕ ДЕЙСТВИЕ: решите капчу в открытом окне браузера. ` +
      `Жду до ${Math.round(ctx.cfg.loginTimeout / 1000)} с (--login-timeout)...`
  );
  const deadline = Date.now() + ctx.cfg.loginTimeout;
  while (Date.now() < deadline) {
    await sleep(1500);
    const c = await detectCaptcha(ctx.page);
    if (!c.slider && !c.wafMeta) {
      log.ok('капча решена, продолжаю');
      await settle(ctx);
      return true;
    }
    if ((Date.now() / 1000) % 15 < 1.6) log.debug('всё ещё жду решения капчи...');
  }
  throw new StepError('Капча так и не была решена за отведенное время (--login-timeout).', EXIT.CAPTCHA_BLOCKED);
}

async function ensurePasswordForm(ctx) {
  const { page, cfg } = ctx;

  const already = await findVisible(page, [SEL.passwordInput], 0);
  if (already) {
    log.debug('форма email+password уже на экране');
    return true;
  }

  // по умолчанию сайт показывает панель "Login with verification code" ->
  // переключаемся на пароль
  const otp = await findVisible(page, [SEL.otpPanel], 0);
  if (otp) log.info('вижу панель входа по коду подтверждения - переключаюсь на вход по паролю');

  const clicked = await clickByText(page, TXT.loginWithPassword, null, 'Log in with a password', 0);
  if (!clicked) {
    // запасной вариант: клик по самой ссылке-возврату в OTP-панели
    const back = await findVisible(page, [SEL.otpReturnButton], 0);
    if (back) {
      await humanClick(page, back.handle, 'otp-return button');
    }
  }
  await settle(ctx, 0.8);

  const pass = await waitForAny(page, [SEL.passwordInput, SEL.mobilePasswordInput], cfg.elementTimeout, 'поле пароля');
  if (!pass) {
    throw new StepError(
      'Не удалось добраться до формы входа по паролю: поле input[name="password"] не появилось.\n' +
        'Возможно, изменилась верстка (site version != ' + APP_VERSION_HINT + ') или форма закрыта капчей.',
      EXIT.LOGIN_FAILED
    );
  }
  log.ok('форма входа по паролю открыта');
  return true;
}

async function readErrorToasts(page) {
  try {
    return await page.evaluate(() => {
      const sels = [
        '.ant-message-notice-content',
        '.qwen-chat-v2-message',
        '[class*="message-notice"]',
        '[class*="toast"]',
        '.ant-form-item-explain-error',
      ];
      const out = [];
      for (const s of sels) {
        for (const el of Array.from(document.querySelectorAll(s))) {
          const t = (el.innerText || '').trim();
          if (t) out.push(t);
        }
      }
      return Array.from(new Set(out)).slice(0, 8);
    });
  } catch (_) {
    return [];
  }
}

async function performLogin(ctx) {
  const { page, cfg } = ctx;
  const deadline = Date.now() + cfg.loginTimeout;

  log.info(`начинаю авторизацию: ${cfg.login} (пароль: ${maskSecret(cfg.password)})`);
  await page.goto(`${SITE}/auth?action=signin`, { waitUntil: 'domcontentloaded', timeout: cfg.navTimeout });
  await settle(ctx, 1.5);
  await shot(ctx, 'auth-page');

  const onAuth = await findVisible(page, [SEL.authRoot, SEL.otpPanel, SEL.authInputs], cfg.elementTimeout);
  if (!onAuth) {
    // возможно, мы уже залогинены (или нас выкинуло на главную)
    log.warn('страница /auth?action=signin не отдала форму авторизации - перепроверяю логин');
    if (await isLoggedIn(ctx, 'после перехода на /auth')) return true;
    throw new StepError('Не найдена форма авторизации на /auth?action=signin.', EXIT.LOGIN_FAILED);
  }
  log.debug('контейнер авторизации найден: ' + onAuth.selector);

  await handleCaptchaIfAny(ctx, 'открытие формы логина');
  await ensurePasswordForm(ctx);
  await shot(ctx, 'password-form');

  /* ---- email ---- */
  const emailHit = await findVisible(page, [SEL.emailInput, SEL.mobileEmailInput, 'input[name="email"]'], cfg.elementTimeout);
  if (!emailHit) throw new StepError('Не найдено поле email в форме входа.', EXIT.LOGIN_FAILED);
  await humanClick(page, emailHit.handle, 'email field');
  await emailHit.handle.evaluate((el) => {
    el.focus();
    if (typeof el.select === 'function') el.select();
  });
  await page.keyboard.press('Backspace');
  await sleep(randInt(80, 200));
  await setInputValue(page, emailHit.handle, cfg.login, 'email');
  // контрольный human-type последнего символа, чтобы React точно увидел ввод
  await page.keyboard.type(' ', { delay: 30 });
  await page.keyboard.press('Backspace');
  await sleep(randInt(120, 260));
  log.ok('email введен');

  /* ---- password ---- */
  const passHit = await findVisible(page, [SEL.passwordInput, SEL.mobilePasswordInput, 'input[name="password"]'], cfg.elementTimeout);
  if (!passHit) throw new StepError('Не найдено поле пароля в форме входа.', EXIT.LOGIN_FAILED);
  await humanClick(page, passHit.handle, 'password field');
  await passHit.handle.evaluate((el) => el.focus());
  await setInputValue(page, passHit.handle, cfg.password, 'password');
  await page.keyboard.type(' ', { delay: 25 });
  await page.keyboard.press('Backspace');
  await sleep(randInt(150, 320));
  log.ok('пароль введен (в логах не отображается)');

  /* ---- submit ---- */
  const submit = await findVisible(page, [SEL.submitButton], 0);
  if (submit) {
    const disabled = await submit.handle.evaluate((el) => el.disabled === true || el.getAttribute('aria-disabled') === 'true');
    if (disabled) log.warn('кнопка "Log in" неактивна - возможно, форма считает данные неполными');
    await humanClick(page, submit.handle, 'Log in');
  } else {
    const byText = await clickByText(page, TXT.loginSubmit, null, 'Log in (by text)', 0);
    if (!byText) {
      log.warn('кнопка отправки не найдена - жму Enter в поле пароля');
      await page.keyboard.press('Enter');
    }
  }
  log.info('форма отправлена, жду результата...');

  /* ---- ждем результата ---- */
  let lastToasts = [];
  let lastUrl = page.url();
  while (Date.now() < deadline) {
    await sleep(1200);

    if (await handleCaptchaIfAny(ctx, 'после отправки формы логина')) continue;

    const st = await page.evaluate(() => {
      const otp = !!document.querySelector('.qwenchat-verification-code-input, .qwenchat-email-otp-panel-code-buttons');
      const stillAuth = !!document.querySelector('.qwenchat-page-auth');
      return {
        url: location.href,
        path: location.pathname,
        otp,
        stillAuth,
        text: document.body && document.body.innerText ? document.body.innerText.slice(0, 600) : '',
      };
    });

    const toasts = await readErrorToasts(page);
    if (toasts.length && JSON.stringify(toasts) !== JSON.stringify(lastToasts)) {
      lastToasts = toasts;
      log.warn('сообщение сайта: ' + toasts.map((t) => humanize(t, 160)).join(' | '));
    }

    // Успех = нас убрало со страницы /auth (приложение редиректит на "/" или на исходный from)
    if (!st.stillAuth && !/^\/auth/.test(st.path)) {
      const sess = await readSessionState(page).catch(() => null);
      const tokenKeys = sess ? sess.hits.map((h) => `${h.store}:${h.key}`) : [];
      log.ok(`авторизация выполнена: ушли со страницы /auth на ${st.url}`);
      log.debug('признаки сессии', { tokenKeys, cookies: sess ? sess.tokenishCookies : [], api: sess ? sess.api : null });
      await settle(ctx);
      await shot(ctx, 'after-login');
      return true;
    }

    if (st.otp) {
      throw new StepError(
        'Сайт запросил код подтверждения из почты (email OTP) - вход по паролю для этой учетки не сработал.\n' +
          'Возможные причины: аккаунт не зарегистрирован (нужен Sign up + подтверждение почты),\n' +
          'либо включена принудительная верификация. Автоматически читать почту скрипт не умеет.\n' +
          `Текст на странице: ${humanize(st.text, 220)}`,
        EXIT.LOGIN_FAILED
      );
    }

    const bad =
      /incorrect|invalid|not exist|doesn'?t exist|wrong|too many requests|неверн|не правильн|ошибк/i.test(st.text) ||
      toasts.some((t) => /incorrect|invalid|not exist|wrong|too many|неверн|ошибк/i.test(t));
    if (bad) {
      throw new StepError(
        `Вход отклонен сайтом. Вероятно, неверный логин/пароль или аккаунт не зарегистрирован.\n` +
          `login=${cfg.login}\n` +
          `Сообщения: ${JSON.stringify(toasts)}\n` +
          `Текст страницы: ${humanize(st.text, 300)}`,
        EXIT.LOGIN_FAILED
      );
    }

    if (st.url !== lastUrl) {
      log.debug('url изменился: ' + st.url);
      lastUrl = st.url;
    }
  }

  throw new StepError(
    `Авторизация не завершилась за ${Math.round(cfg.loginTimeout / 1000)} с (--login-timeout).\n` +
      `Последние сообщения сайта: ${JSON.stringify(lastToasts)}`,
    EXIT.LOGIN_FAILED
  );
}

/* ============================ agent mode ============================
 * Всё, что здесь происходит, написано с учётом двух особенностей qwen-chat-fe:
 *   1) блок .mode-select ПЕРЕСОЗДАЁТСЯ React'ом через ~3 с после навигации
 *      (первый узел .mode-select-open появляется на ~1.2 с и к ~4.2 с заменяется
 *      новым). Клик по "старому" handle молча уходит в никуда: boundingBox() даёт
 *      null, а el.click() на отцепленном узле не доходит до слушателя React;
 *   2) onClick висит не на .mode-select-open, а на обёртке
 *      .qwen-chat-v2-dropdown-menu-trigger, а само меню портируется внутрь
 *      .message-input-container.
 * Поэтому: узлы переразрешаются в момент клика, успех определяется по СОСТОЯНИЮ
 * страницы (.mode-select-open-active / .mode-select-dropdown-menu / drawer),
 * а при неудаче стратегии клика эскалируются.
 */

/** Селекторы триггера меню режимов (по убыванию предпочтения). */
const MODE_TRIGGER_SELS = ['.mode-select-open', '[aria-label="Select Mode"]'];
/** Селекторы пунктов меню (desktop + mobile). */
const MODE_ITEM_SELS = [
  '.mode-select-common-item',
  '.mode-selector-drawer-list-item',
  '.mode-selector-drawer-item',
  '.mode-selector-drawer-control-item',
  '[role="menuitem"]',
];
/** Селекторы названий пунктов (desktop + mobile). */
const MODE_ITEM_NAME_SELS = [
  '.mode-select-dropdown-item-name',
  '.mode-selector-drawer-list-item-title',
  '.mode-selector-drawer-item-title',
];

async function getCurrentModeLabel(page) {
  return page
    .evaluate((sel) => {
      const el = document.querySelector(sel);
      return el ? (el.innerText || '').replace(/\s+/g, ' ').trim() : '';
    }, SEL.modeCurrent)
    .catch(() => '');
}

/** Состояние меню режимов: открыто/закрыто, какой именно вариант, сколько пунктов. */
async function readModeMenuState(page) {
  return page
    .evaluate((itemSels) => {
      const Q = window.__qca;
      const vis = Q ? Q.isVisible : (el) => !!el;
      const fv = (sels) => {
        for (let i = 0; i < sels.length; i++) {
          const list = document.querySelectorAll(sels[i]);
          for (let j = 0; j < list.length; j++) if (vis(list[j])) return list[j];
        }
        return null;
      };
      const menu = fv(['.mode-select-dropdown-menu']);
      const drawer = fv(['.mode-selector-drawer-container', '.mode-selector-drawer']);
      const trigger = fv(['.mode-select-open']);
      let items = 0;
      for (let i = 0; i < itemSels.length; i++) {
        const list = document.querySelectorAll(itemSels[i]);
        for (let j = 0; j < list.length; j++) if (vis(list[j])) items++;
      }
      return {
        open: !!(menu || drawer || (trigger && /mode-select-open-active/.test(String(trigger.className)))),
        kind: menu ? 'dropdown' : drawer ? 'drawer' : trigger && /mode-select-open-active/.test(String(trigger.className)) ? 'active-class' : null,
        visibleItems: items,
        triggerInDom: !!document.querySelector('.mode-select-open'),
      };
    }, MODE_ITEM_SELS)
    .catch((e) => ({ err: String((e && e.message) || e).slice(0, 140) }));
}

/** Ждём открытия меню (внутри страницы - дёшево даже на медленной машине). */
async function waitModeMenuOpen(page, timeout = 3000) {
  try {
    await page.waitForFunction(
      () => {
        const Q = window.__qca;
        const vis = Q ? Q.isVisible : (el) => !!el;
        const fv = (sels) => {
          for (let i = 0; i < sels.length; i++) {
            const list = document.querySelectorAll(sels[i]);
            for (let j = 0; j < list.length; j++) if (vis(list[j])) return list[j];
          }
          return null;
        };
        if (fv(['.mode-select-dropdown-menu', '.mode-selector-drawer-container', '.mode-selector-drawer'])) return true;
        const t = fv(['.mode-select-open']);
        return !!(t && /mode-select-open-active/.test(String(t.className)));
      },
      { timeout, polling: 100 }
    );
    return true;
  } catch (_) {
    return false;
  }
}

/** Полная информация о триггере - для логов и диагностики. */
async function inspectModeTrigger(page) {
  return page
    .evaluate(() => {
      const Q = window.__qca;
      const el = Q ? Q.firstVisible(['.mode-select-open', '[aria-label="Select Mode"]']) : document.querySelector('.mode-select-open');
      if (!el) return { exists: false, anyInDom: document.querySelectorAll('.mode-select-open').length };
      const r = el.getBoundingClientRect();
      const wrap = el.closest('.qwen-chat-v2-dropdown-menu-trigger');
      const rp = Q ? Q.reactProps(wrap || el) : null;
      return {
        exists: true,
        nodeId: Q ? Q.idOf(el) : 0,
        connected: el.isConnected,
        rect: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)],
        ariaLabel: el.getAttribute('aria-label'),
        opacity: getComputedStyle(el).opacity,
        inlineStyle: el.getAttribute('style'),
        hasTriggerWrapper: !!wrap,
        hasReactOnClick: !!(rp && typeof rp.props.onClick === 'function'),
        reactDepth: rp ? rp.depth : null,
        hitTest: Q ? Q.topAt(el) : null,
        activeClass: /mode-select-open-active/.test(String(el.className)),
      };
    })
    .catch((e) => ({ err: String((e && e.message) || e).slice(0, 140) }));
}

/** Что может перекрывать клик (модалка, тур-онбординг, куки-баннер). */
async function detectBlockers(page) {
  return page
    .evaluate((sels) => {
      const Q = window.__qca;
      const vis = Q ? Q.isVisible : (el) => !!el;
      const out = [];
      for (let i = 0; i < sels.length; i++) {
        const list = document.querySelectorAll(sels[i]);
        for (let j = 0; j < list.length; j++) {
          if (!vis(list[j])) continue;
          out.push({
            sel: sels[i],
            cls: String(list[j].className || '').slice(0, 90),
            text: (list[j].innerText || '').replace(/\s+/g, ' ').trim().slice(0, 70),
          });
        }
      }
      return out;
    }, SEL.blockers)
    .catch(() => []);
}

/** Аккуратно закрываем то, что может мешать клику. */
async function dismissBlockers(ctx) {
  const { page } = ctx;
  const found = await detectBlockers(page);
  if (!found.length) return [];
  log.warn('найдены оверлеи, которые могут перехватывать клики: ' + JSON.stringify(found.slice(0, 4)));
  await page.keyboard.press('Escape').catch(() => {});
  await sleep(350);
  const closed = await page
    .evaluate(() => {
      const Q = window.__qca;
      const vis = Q ? Q.isVisible : (el) => !!el;
      const closeSels = ['.qwen-chat-v2-modal-close', '[aria-label="Close"]', '[class*="modal"] [class*="close-icon"]', '[class*="tour"] [class*="close"]'];
      let n = 0;
      for (let i = 0; i < closeSels.length && n < 2; i++) {
        const list = document.querySelectorAll(closeSels[i]);
        for (let j = 0; j < list.length && n < 2; j++) {
          if (!vis(list[j])) continue;
          try {
            list[j].click();
            n++;
          } catch (_) {}
        }
      }
      // куки-баннер: жмём только "принять", чтобы не менять настройки пользователя
      const btns = document.querySelectorAll('button,[role="button"]');
      for (let j = 0; j < btns.length && n < 3; j++) {
        const t = (btns[j].innerText || '').trim().toLowerCase();
        if (!vis(btns[j])) continue;
        if (/^(accept|agree|ok|got it|принять|согласен|понятно)$/.test(t)) {
          try {
            btns[j].click();
            n++;
          } catch (_) {}
        }
      }
      return n;
    })
    .catch(() => 0);
  if (closed) {
    log.debug(`закрыл оверлеев: ${closed}`);
    await sleep(600);
  }
  return found;
}

/** Список пунктов меню режимов (desktop-дропдаун и mobile-drawer). */
async function listModeItems(page) {
  return page
    .evaluate((itemSels, nameSels, disabledCls) => {
      const Q = window.__qca;
      const vis = Q ? Q.isVisible : (el) => !!el;
      const seen = [];
      const out = [];
      const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
      for (let i = 0; i < itemSels.length; i++) {
        const list = document.querySelectorAll(itemSels[i]);
        for (let j = 0; j < list.length; j++) {
          const el = list[j];
          if (seen.indexOf(el) !== -1) continue;
          seen.push(el);
          let nameEl = null;
          for (let k = 0; k < nameSels.length && !nameEl; k++) nameEl = el.querySelector(nameSels[k]);
          const cls = String(el.className || '');
          const r = el.getBoundingClientRect();
          out.push({
            text: norm(nameEl ? nameEl.innerText : el.innerText).slice(0, 80),
            tag: norm(el.querySelector('.mode-select-dropdown-item-tag') ? el.querySelector('.mode-select-dropdown-item-tag').innerText : ''),
            disabled:
              el.getAttribute('aria-disabled') === 'true' ||
              cls.split(/\s+/).indexOf(disabledCls) !== -1 ||
              !!el.querySelector('.' + disabledCls) ||
              !!el.closest('.' + disabledCls) ||
              !!el.querySelector('.mode-selector-drawer-item-disabled, .mode-selector-drawer-list-item-disabled'),
            visible: vis(el) && r.width > 2 && r.height > 2,
            connected: el.isConnected,
            cls: cls.slice(0, 120),
          });
        }
      }
      return out;
    }, MODE_ITEM_SELS, MODE_ITEM_NAME_SELS, SEL.modeItemDisabledClass)
    .catch((e) => {
      log.debug('listModeItems: ' + String((e && e.message) || e).slice(0, 140));
      return [];
    });
}

/**
 * Находит пункт меню по тексту и возвращает СВЕЖИЙ handle (плюс текст/disabled).
 * Handle сразу используется для клика - держать его про запас нельзя (ремаунт).
 */
async function findModeItemFresh(page, wantedTexts) {
  const res = await page.evaluateHandle(
    (itemSels, nameSels, wanted) => {
      const Q = window.__qca;
      const vis = Q ? Q.isVisible : (el) => !!el;
      const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
      const items = [];
      for (let i = 0; i < itemSels.length; i++) {
        const list = document.querySelectorAll(itemSels[i]);
        for (let j = 0; j < list.length; j++) if (vis(list[j]) && items.indexOf(list[j]) === -1) items.push(list[j]);
      }
      for (let w = 0; w < wanted.length; w++) {
        const t = norm(wanted[w]);
        if (!t) continue;
        for (let k = 0; k < items.length; k++) {
          const el = items[k];
          let nameEl = null;
          for (let n = 0; n < nameSels.length && !nameEl; n++) nameEl = el.querySelector(nameSels[n]);
          const own = norm(nameEl ? nameEl.innerText : el.innerText);
          if (!own) continue;
          if (own === t || own.indexOf(t) === 0 || own.indexOf(t) !== -1) return el;
        }
      }
      return null;
    },
    MODE_ITEM_SELS,
    MODE_ITEM_NAME_SELS,
    wantedTexts
  );
  const handle = res.asElement();
  if (!handle) return null;
  const meta = await handle
    .evaluate((el, nameSels) => {
      let nameEl = null;
      for (let n = 0; n < nameSels.length && !nameEl; n++) nameEl = el.querySelector(nameSels[n]);
      const cls = String(el.className || '');
      return {
        text: ((nameEl ? nameEl.innerText : el.innerText) || '').replace(/\s+/g, ' ').trim().slice(0, 80),
        disabled:
          el.getAttribute('aria-disabled') === 'true' ||
          cls.indexOf('qwen-chat-v2-dropdown-menu-item-disabled') !== -1 ||
          !!el.closest('.qwen-chat-v2-dropdown-menu-item-disabled'),
        connected: el.isConnected,
        nodeId: window.__qca ? window.__qca.idOf(el) : 0,
      };
    }, MODE_ITEM_NAME_SELS)
    .catch(() => null);
  if (!meta || !meta.connected) return null;
  return { handle, text: meta.text, disabled: meta.disabled, nodeId: meta.nodeId };
}

/** Клик по пункту меню целиком внутри страницы (узел берётся в момент клика). */
async function clickModeItemInPage(page, wantedTexts, strategy) {
  return page
    .evaluate(
      (itemSels, nameSels, wanted, strat) => {
        const Q = window.__qca;
        if (!Q) return { ok: false, reason: 'window.__qca отсутствует' };
        const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
        const items = [];
        for (let i = 0; i < itemSels.length; i++) {
          const list = document.querySelectorAll(itemSels[i]);
          for (let j = 0; j < list.length; j++) if (Q.isVisible(list[j]) && items.indexOf(list[j]) === -1) items.push(list[j]);
        }
        let el = null;
        for (let w = 0; w < wanted.length && !el; w++) {
          const t = norm(wanted[w]);
          if (!t) continue;
          for (let k = 0; k < items.length; k++) {
            let nameEl = null;
            for (let n = 0; n < nameSels.length && !nameEl; n++) nameEl = items[k].querySelector(nameSels[n]);
            const own = norm(nameEl ? nameEl.innerText : items[k].innerText);
            if (own && (own === t || own.indexOf(t) !== -1)) {
              el = items[k];
              break;
            }
          }
        }
        if (!el) return { ok: false, reason: 'пункт не найден', available: items.map((e) => norm(e.innerText).slice(0, 32)).slice(0, 20) };
        if (!el.isConnected) return { ok: false, reason: 'пункт отцеплен от DOM (stale)' };
        if (strat === 'native') {
          el.click();
          return { ok: true, via: 'native' };
        }
        if (strat === 'react') {
          const rp = Q.reactProps(el);
          if (!rp || typeof rp.props.onClick !== 'function') return { ok: false, reason: 'onClick в __reactProps не найден' };
          try {
            rp.props.onClick(Q.fakeReactEvent(el, rp.node));
            return { ok: true, via: 'react', depth: rp.depth };
          } catch (e) {
            return { ok: false, reason: 'onClick бросил: ' + String((e && e.message) || e).slice(0, 120) };
          }
        }
        Q.clickSeq(el);
        return { ok: true, via: 'synthetic' };
      },
      MODE_ITEM_SELS,
      MODE_ITEM_NAME_SELS,
      wantedTexts,
      strategy
    )
    .catch((e) => ({ ok: false, reason: 'exception: ' + String((e && e.message) || e).slice(0, 140) }));
}

/** Одна попытка открыть меню режимов выбранной стратегией. */
async function tryOpenModeMenu(ctx, strategy) {
  const { page } = ctx;
  if (strategy === 'mouse') {
    const fresh = await findVisible(page, MODE_TRIGGER_SELS, 0);
    if (!fresh) return { ok: false, reason: 'триггер не найден' };
    const info = await inspectModeTrigger(page);
    if (info.exists && info.connected === false) return { ok: false, reason: 'триггер отцеплен от DOM (stale handle)', info };
    if (info.hitTest && info.hitTest.covered) {
      log.warn(`точку клика по "+" перекрывает ${JSON.stringify(info.hitTest.by)} (${info.hitTest.reason}) - клик мышью может не пройти`);
    }
    const clicked = await humanClick(page, fresh.handle, 'mode-select trigger (.mode-select-open)');
    return { ok: clicked !== false, via: 'mouse', info };
  }
  return page
    .evaluate((strat) => {
      const Q = window.__qca;
      if (!Q) return { ok: false, reason: 'window.__qca отсутствует' };
      const open = Q.firstVisible(['.mode-select-open', '[aria-label="Select Mode"]']);
      if (!open) return { ok: false, reason: 'триггер не найден' };
      if (!open.isConnected) return { ok: false, reason: 'триггер отцеплен от DOM (stale)' };
      const wrap = open.closest('.qwen-chat-v2-dropdown-menu-trigger') || open.parentElement || open;
      if (strat === 'native') {
        open.click();
        return { ok: true, via: 'native' };
      }
      if (strat === 'synthetic') {
        Q.clickSeq(open);
        return { ok: true, via: 'synthetic' };
      }
      if (strat === 'react') {
        const rp = Q.reactProps(wrap) || Q.reactProps(open);
        if (!rp || typeof rp.props.onClick !== 'function') return { ok: false, reason: 'onClick в __reactProps не найден' };
        try {
          rp.props.onClick(Q.fakeReactEvent(open, rp.node));
          return { ok: true, via: 'react', depth: rp.depth };
        } catch (e) {
          return { ok: false, reason: 'onClick бросил: ' + String((e && e.message) || e).slice(0, 120) };
        }
      }
      return { ok: false, reason: 'неизвестная стратегия ' + strat };
    }, strategy)
    .catch((e) => ({ ok: false, reason: 'exception: ' + String((e && e.message) || e).slice(0, 140) }));
}

/**
 * Открывает меню режимов. Возвращает подпись текущего режима (до переключения).
 * Бросает StepError(EXIT.AGENT_UNAVAILABLE) с полной диагностикой, если меню так и
 * не открылось.
 */
async function openModeDropdown(ctx) {
  const { page, cfg } = ctx;
  await ensureQca(page);

  const before = await getCurrentModeLabel(page);
  if (before) log.debug(`текущий режим: "${before}"`);

  let st = await readModeMenuState(page);
  if (st.open) {
    log.debug(`меню режимов уже открыто (${st.kind}, пунктов: ${st.visibleItems})`);
    return before;
  }

  const waitMs = Math.max(6000, Math.min(cfg.elementTimeout, 20000));

  // 1) Ждём, пока триггер не только появится, но и ПЕРЕСТАНЕТ пересоздаваться.
  //    Без этого клик приходится на узел, который React вот-вот заменит.
  let trig = await waitForStableVisible(page, MODE_TRIGGER_SELS, {
    timeout: waitMs,
    stableMs: 700,
    label: 'триггер меню режимов',
  });

  // 1b) Запасной путь: "+" нет, но есть чип выбранного режима - сбрасываем крестиком.
  if (!trig) {
    const chip = await findVisible(page, [SEL.modeCurrent], 0);
    const close = chip ? await findVisible(page, [SEL.modeCurrentClose], 0) : null;
    if (close) {
      log.debug('триггер "+" не найден, но есть чип режима - сбрасываю его крестиком и ищу "+" снова');
      await humanClick(page, close.handle, 'current-mode close (x)');
      await settle(ctx, 0.8);
      trig = await waitForStableVisible(page, MODE_TRIGGER_SELS, {
        timeout: Math.min(waitMs, 8000),
        stableMs: 500,
        label: 'триггер меню режимов (после сброса чипа)',
      });
    }
  }

  if (!trig) {
    const diag = await inspectModeTrigger(page);
    const ver = ctx.appVersion || (await readAppVersion(page));
    await dumpModeDiagnostics(ctx, 'no-trigger');
    throw new StepError(
      'Не найден переключатель режимов (кнопка ".mode-select-open" / [aria-label="Select Mode"]) рядом с полем ввода.\n' +
        `Состояние триггера: ${JSON.stringify(diag)}\n` +
        `Версия фронта: ${ver || 'не определена'} (проверены: ${TESTED_APP_VERSIONS.join(', ')}).\n` +
        'Возможные причины: профиль не авторизован, открыта не страница чата, мобильная верстка или верстка изменилась.',
      EXIT.AGENT_UNAVAILABLE,
      diag
    );
  }

  // 2) Открываем меню, эскалируя стратегии. После каждой - проверяем СОСТОЯНИЕ.
  const strategies = ['mouse', 'native', 'synthetic', 'react'];
  const attemptsLog = [];
  for (let round = 0; round < 2; round++) {
    if (round === 1) {
      // второй круг: убираем то, что может мешать, и перечитываем страницу
      log.warn('меню режимов не открылось ни одной стратегией - убираю оверлеи и перезагружаю страницу чата');
      await dismissBlockers(ctx);
      await page.goto(`${SITE}/`, { waitUntil: 'domcontentloaded', timeout: cfg.navTimeout }).catch(() => {});
      await settle(ctx, 1.2);
      await waitForComposerReady(ctx);
      trig = await waitForStableVisible(page, MODE_TRIGGER_SELS, { timeout: waitMs, stableMs: 700, label: 'триггер (после перезагрузки)' });
      if (!trig) continue;
    }
    for (let i = 0; i < strategies.length; i++) {
      const strategy = strategies[i];
      const stNow = await readModeMenuState(page);
      if (stNow.open) {
        log.debug(`меню режимов открыто (${stNow.kind}) после стратегий: ${attemptsLog.map((a) => a.via || a.strategy).join(',')}`);
        await sleep(300);
        return before;
      }
      const res = await tryOpenModeMenu(ctx, strategy);
      attemptsLog.push({ round, strategy, ok: !!res.ok, via: res.via, reason: res.reason });
      log.debug(`стратегия "${strategy}": ${JSON.stringify({ ok: !!res.ok, via: res.via, reason: res.reason })}`);
      const opened = await waitModeMenuOpen(page, 2500);
      if (opened) {
        const st2 = await readModeMenuState(page);
        log.ok(`меню режимов открылось (${st2.kind || '?'}, видимых пунктов: ${st2.visibleItems}) - стратегия "${strategy}"`);
        await sleep(300);
        return before;
      }
      // могло открыться и тут же закрыться (клик мимо/по оверлею) - чуть ждём и пробуем дальше
      await sleep(250);
    }
  }

  // 3) Ничего не помогло - собираем полную диагностику.
  const diag = await dumpModeDiagnostics(ctx, 'menu-not-opened');
  throw new StepError(
    'Меню режимов не открылось после клика по переключателю ".mode-select-open".\n' +
      `Перепробованы стратегии: ${JSON.stringify(attemptsLog)}.\n` +
      `Триггер: ${JSON.stringify(diag.trigger)}\n` +
      `Состояние меню: ${JSON.stringify(diag.menu)}; оверлеи: ${JSON.stringify(diag.blockers || [])}\n` +
      (diag.pageErrors && diag.pageErrors.length ? `Ошибки страницы: ${JSON.stringify(diag.pageErrors)}\n` : '') +
      `Версия фронта: ${diag.appVersion || '?'} (проверены: ${TESTED_APP_VERSIONS.join(', ')}).`,
    EXIT.AGENT_UNAVAILABLE,
    { attemptsLog, diag }
  );
}

/** Подробная диагностика переключателя режимов (пишется в лог при неудаче). */
async function dumpModeDiagnostics(ctx, stage) {
  const { page } = ctx;
  const d = { stage, url: page.url(), at: new Date().toISOString() };
  try {
    d.appVersion = ctx.appVersion || (await readAppVersion(page));
    d.trigger = await inspectModeTrigger(page);
    d.menu = await readModeMenuState(page);
    d.items = (await listModeItems(page)).slice(0, 16);
    d.blockers = await detectBlockers(page);
    d.pageErrors = PAGE_ERRORS.slice(-6);
    d.viewport = await page.evaluate(() => ({ w: window.innerWidth, h: window.innerHeight, dpr: window.devicePixelRatio }));
    d.currentMode = await getCurrentModeLabel(page);
    d.modeSelectHTML = await page.evaluate(() => {
      const el = document.querySelector('.mode-select');
      return el ? el.outerHTML.replace(/\s+/g, ' ').slice(0, 1200) : null;
    });
    d.composerHTML = await page.evaluate(() => {
      const el = document.querySelector('.message-input-container');
      return el ? el.outerHTML.replace(/\s+/g, ' ').slice(0, 700) : null;
    });
    d.hints = await page.evaluate(() => {
      const out = {};
      try {
        out.localStorage = Object.keys(localStorage)
          .filter((k) => /temporary|thinking|mode|locale/i.test(k))
          .reduce((acc, k) => ((acc[k] = String(localStorage.getItem(k)).slice(0, 40)), acc), {});
      } catch (_) {}
      return out;
    });
  } catch (e) {
    d.dumpError = String((e && e.message) || e).slice(0, 160);
  }
  log.error(`диагностика переключателя режимов (${stage})`, d);
  return d;
}

async function closeModeDropdown(ctx) {
  await ctx.page.keyboard.press('Escape').catch(() => {});
  await sleep(250);
}

/** Композер готов: поле ввода на месте и блок режимов перестал пересоздаваться. */
async function waitForComposerReady(ctx, opts = {}) {
  const { page, cfg } = ctx;
  await ensureQca(page);
  const timeout = Math.max(8000, cfg.elementTimeout);
  const ta = await waitForAny(page, [SEL.textarea, 'textarea[placeholder]', '[contenteditable="true"]'], timeout, 'поле ввода (composer ready)');
  // главная защита от гонки с ремаунтом: ждём, пока .mode-select устоится
  await waitForStableVisible(page, [SEL.modeSelect, SEL.inputContainer], {
    timeout: Math.min(timeout, 15000),
    stableMs: opts.stableMs === undefined ? 800 : opts.stableMs,
    label: 'блок режимов (.mode-select)',
  });
  return !!ta;
}

async function enableAgentMode(ctx) {
  const { page, cfg } = ctx;
  log.info('переключаю режим в Agent Mode (--agent)');

  // Регулярка для пункта/чипа "Agent Mode" (en + ru). Название пункта в меню приходит
  // как "Agent Mode" (+ отдельно бейдж "Beta"), поэтому матчим именно "agent mode".
  const AGENT_RE = /agent\s*mode|режим\s*агента|^агент$/i;

  // ждём, пока композер отрисуется И устоится (иначе кликнем по узлу, который
  // React заменит через мгновение)
  await waitForComposerReady(ctx);

  // 0) Если Agent Mode уже активен - ничего кликать не нужно.
  const pre = await getCurrentModeLabel(page);
  if (AGENT_RE.test(pre)) {
    log.ok(`Agent Mode уже активен (переключатель показывает "${pre}") - переключение не требуется`);
    await shot(ctx, 'agent-mode-already-active');
    return;
  }
  if (pre) log.debug(`сейчас выбран режим "${pre}" - переключаю на Agent Mode`);

  // 1) Открываем меню режимов (с эскалацией стратегий клика).
  await openModeDropdown(ctx);
  let items = await listModeItems(page);
  log.debug('пункты меню режимов', items.filter((i) => i.visible));
  await shot(ctx, 'mode-dropdown');

  let target = items.find((i) => i.visible && AGENT_RE.test(i.text));

  // 2) Пункт мог уехать в подменю "More" (в основном меню показываются не все фичи).
  if (!target) {
    log.debug('Agent Mode не виден в основном меню - раскрываю подменю "More"');
    const moreRes = await clickModeItemInPage(page, TXT.more, 'synthetic');
    log.debug('клик по "More": ' + JSON.stringify(moreRes));
    await sleep(700);
    const moreItems = await listModeItems(page);
    log.debug(
      'пункты после раскрытия "More"',
      moreItems.filter((i) => i.visible)
    );
    const inMore = moreItems.find((i) => i.visible && AGENT_RE.test(i.text));
    if (inMore) {
      target = inMore;
      items = items.concat(moreItems);
    }
  }

  // 3) Пункта нет вовсе - фича недоступна этому аккаунту.
  if (!target) {
    await shot(ctx, 'agent-mode-missing');
    const st = await readModeMenuState(page);
    const ver = ctx.appVersion || (await readAppVersion(page));
    await closeModeDropdown(ctx);
    throw new StepError(
      'Agent Mode НЕДОСТУПЕН: пункта "Agent Mode" нет в меню режимов этого аккаунта.\n' +
        `Доступные пункты (${st.kind || '?'}): ${JSON.stringify(items.filter((i) => i.visible).map((i) => i.text).filter(Boolean))}\n` +
        'Причина в самом сайте: пункт скрывается, если agent_mode выключен для учетной записи/региона\n' +
        '(клиентский featureStatuses + флаг agentModeUnavailable), либо включен "temporary chat".\n' +
        `Версия фронта: ${ver || '?'}. Дальше не продолжаю.`,
      EXIT.AGENT_UNAVAILABLE,
      { items }
    );
  }

  // 4) Пункт есть, но неактивен (disabled).
  if (target.disabled) {
    await shot(ctx, 'agent-mode-disabled');
    let tip = '';
    try {
      const found = await findModeItemFresh(page, TXT.agentMode);
      if (found) {
        await found.handle.hover().catch(() => {});
        await sleep(800);
        tip = await page.evaluate(() => {
          const t = document.querySelector('.ant-tooltip-inner, [role="tooltip"], .qwen-chat-v2-tooltip, .qwen-chat-v2-tooltip-inner, .qwen-chat-v2-tooltip-title');
          return t ? (t.innerText || '').trim() : '';
        });
      }
    } catch (_) {}
    await closeModeDropdown(ctx);
    throw new StepError(
      'Agent Mode НЕДОСТУПЕН: пункт есть в меню, но он неактивен (disabled).\n' +
        (tip ? `Подсказка сайта: ${tip}\n` : '') +
        'Частая причина - включен "temporary chat" ("Agent Mode is unavailable in temporary chat")\n' +
        'либо фича выключена для аккаунта/модели. Дальше не продолжаю.',
      EXIT.AGENT_UNAVAILABLE,
      { tip }
    );
  }

  // 5) Кликаем по пункту Agent Mode и ПРОВЕРЯЕМ результат (а не факт клика).
  let after = '';
  const clickStrategies = ['mouse', 'synthetic', 'native', 'react'];
  for (let i = 0; i < clickStrategies.length; i++) {
    const strategy = clickStrategies[i];
    if (strategy === 'mouse') {
      const found = await findModeItemFresh(page, TXT.agentMode);
      if (!found) {
        log.debug('пункт Agent Mode не найден свежим поиском - пробую следующую стратегию');
        continue;
      }
      log.debug(`кликаю пункт "${found.text}" (узел #${found.nodeId}) мышью`);
      const clicked = await humanClick(page, found.handle, 'Agent Mode item');
      if (clicked === false) continue; // stale handle - попробуем ещё раз
    } else {
      const res = await clickModeItemInPage(page, TXT.agentMode, strategy);
      log.debug(`клик по Agent Mode стратегией "${strategy}": ${JSON.stringify(res)}`);
      if (!res.ok) continue;
    }
    await settle(ctx, 1.0);

    after = await getCurrentModeLabel(page);
    if (/agent/i.test(after)) break;

    // меню могло закрыться без применения режима - открываем заново и пробуем снова
    log.debug(`после "${strategy}" режим не сменился (чип: "${after || '(пусто)'}") - пробую снова`);
    const st = await readModeMenuState(page);
    if (!st.open) {
      await openModeDropdown(ctx).catch((e) => log.debug('не удалось снова открыть меню: ' + humanize(e.message, 120)));
    }
  }

  // сайт может открыть новый чат при переключении режима - дожидаемся поля ввода
  const input = await waitForAny(page, [SEL.textarea, 'textarea[placeholder]'], cfg.elementTimeout, 'поле чата после смены режима');
  if (!input) throw new StepError('После выбора Agent Mode пропало поле ввода сообщения.', EXIT.AGENT_UNAVAILABLE);

  // Чип режима обновляется не мгновенно: при переключении сайт пересоздаёт композер
  // (а в Agent Mode ещё и уходит на /c/new-chat). Дочитываем его, чтобы не получить
  // ложное "не включился".
  if (!/agent/i.test(after)) {
    try {
      await page.waitForFunction(
        (sel) => {
          const e = document.querySelector(sel);
          return !!e && /agent|агент/i.test(e.innerText || '');
        },
        { timeout: 6000, polling: 250 },
        SEL.modeCurrent
      );
    } catch (_) {}
    after = await getCurrentModeLabel(page);
  }

  log.debug(`режим после переключения: "${after}"`);
  if (!/agent/i.test(after)) {
    await shot(ctx, 'agent-mode-not-applied');
    const toasts = await readErrorToasts(page);
    const diag = await dumpModeDiagnostics(ctx, 'mode-not-applied');
    throw new StepError(
      `Agent Mode НЕ включился: переключатель показывает "${after || '(пусто)'}" вместо Agent Mode.\n` +
        (toasts.length ? `Сообщения сайта: ${JSON.stringify(toasts)}\n` : '') +
        `Пункты меню: ${JSON.stringify((diag.items || []).filter((i) => i.visible).map((i) => i.text))}\n` +
        'Возможно, аккаунту фича недоступна или переключение требует нового чата.',
      EXIT.AGENT_UNAVAILABLE,
      diag
    );
  }
  log.ok(`Agent Mode включен и подтвержден переключателем режимов ("${after}")`);
  await shot(ctx, 'agent-mode-active');
}

/* ============================ chat input & send ============================ */
async function startNewChat(ctx) {
  const { page, cfg } = ctx;
  log.info('создаю новый чат (--new-chat)');
  // 0.3.22: data-testid у кнопки сайдбара больше нет (в DOM вообще не осталось
  // data-testid), а ссылки на чаты в сайдбаре теперь без href, поэтому прежний fallback
  // a[href="/"] тоже не срабатывал - скрипт на каждом запуске делал ЛИШНИЙ полный
  // reload страницы и попадал в окно ремаунта композера (см. шапку файла).
  const NEW_CHAT_SELS = [
    '[data-testid="sidebar-new-chat-button"]',
    '.new-chat',
    '[aria-label="New Chat"]',
    '[aria-label="new chat"]',
    '.sidebar-entry-fixed-list-content[aria-label]',
    'a[href="/"]',
  ];
  let btn = await waitForStableVisible(page, NEW_CHAT_SELS, {
    timeout: Math.min(cfg.elementTimeout, 10000),
    stableMs: 500,
    label: 'кнопка New Chat',
  });
  let clicked = false;
  if (btn) clicked = (await humanClick(page, btn.handle, 'new chat')) !== false;
  if (!clicked) {
    const again = await findVisible(page, NEW_CHAT_SELS, 0);
    if (again) clicked = (await humanClick(page, again.handle, 'new chat (retry)')) !== false;
  }
  if (!clicked) {
    log.debug('кнопку "New Chat" в сайдбаре найти/кликнуть не удалось - перезагружаю страницу чата');
    await page.goto(`${SITE}/`, { waitUntil: 'domcontentloaded', timeout: cfg.navTimeout });
  }
  await settle(ctx, 1.2);
  // обязательно дожидаемся, пока композер устоится: иначе следующий шаг (Agent Mode)
  // будет кликать по узлу, который React вот-вот заменит
  await waitForComposerReady(ctx);
}

async function ensureChatPage(ctx) {
  const { page, cfg } = ctx;
  const state = await page.evaluate(() => ({ path: location.pathname, href: location.href }));
  if (/^\/(settings|auth|community|legal)/.test(state.path)) {
    log.info(`перехожу с ${state.path} на страницу чата`);
    await page.goto(`${SITE}/`, { waitUntil: 'domcontentloaded', timeout: cfg.navTimeout });
    await settle(ctx, 1.5);
  } else {
    await sleep(300);
  }
}

async function typeMessage(ctx) {
  const { page, cfg } = ctx;
  log.info(`ввожу текст сообщения (${cfg.messageSource}, ${Array.from(cfg.messageText).length} симв.)`);
  log.debug('текст: ' + humanize(cfg.messageText, 200));

  let hit = await waitForAny(page, [SEL.textarea, 'textarea[placeholder]', '[contenteditable="true"]'], cfg.elementTimeout, 'поле ввода чата');
  if (!hit) {
    throw new StepError(
      'Не найдено поле ввода сообщения (textarea.message-input-textarea).\n' +
        'Возможно, профиль не авторизован, открыта не страница чата или верстка изменилась.',
      EXIT.INPUT_NOT_FOUND
    );
  }
  log.debug('поле ввода найдено: ' + hit.selector);

  let clicked = await humanClick(page, hit.handle, 'chat textarea');
  if (clicked === false) {
    // узел поля ввода успели пересоздать - ищем заново (иначе набор текста уйдёт в никуда)
    log.warn('поле ввода оказалось stale - ищу его заново');
    const fresh = await waitForStableVisible(page, [SEL.textarea, 'textarea[placeholder]'], {
      timeout: 8000,
      stableMs: 500,
      label: 'поле ввода (после stale)',
    });
    if (!fresh) throw new StepError('Поле ввода сообщения исчезло (React пересоздал композер).', EXIT.INPUT_NOT_FOUND);
    hit = fresh;
    clicked = await humanClick(page, hit.handle, 'chat textarea (retry)');
    if (clicked === false) log.warn('клик по полю ввода снова не удался - продолжаю через focus()');
  }
  await hit.handle.evaluate((el) => el.focus()).catch(() => {});

  const readOnly = await hit.handle.evaluate((el) => el.readOnly === true || el.getAttribute('readonly') !== null);
  if (readOnly) throw new StepError('Поле ввода в режиме "только чтение" - отправка невозможна.', EXIT.INPUT_NOT_FOUND);

  // Комбинация: быстрый reliable-путь (native setter + input event) и
  // "человеческий" доввод, чтобы React/autosize и антиспам-эвристики увидели живой набор.
  const text = cfg.messageText;
  const head = Array.from(text).slice(0, 12).join('');
  const tail = Array.from(text).slice(12).join('');

  await setInputValue(page, hit.handle, head, 'chat textarea');
  await page.keyboard.type(' ', { delay: 30 });
  await page.keyboard.press('Backspace');
  if (tail) {
    // добиваем остальной текст "руками"
    await hit.handle.evaluate((el, prefix) => {
      const proto = window.HTMLTextAreaElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
      setter.call(el, prefix);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.focus();
      el.setSelectionRange(prefix.length, prefix.length);
    }, head);
    await humanType(page, hit.handle, tail, cfg.typeDelay);
  }
  await sleep(randInt(200, 450));

  const actual = await hit.handle.evaluate((el) => el.value);
  if (actual !== text) {
    log.warn(`текст в поле не совпал (ожидал ${Array.from(text).length} симв., получил ${Array.from(actual || '').length}) - переустанавливаю значение`);
    await setInputValue(page, hit.handle, text, 'chat textarea (retry)');
    await sleep(250);
    const again = await hit.handle.evaluate((el) => el.value);
    if (again !== text) {
      throw new StepError(
        `Не удалось корректно вставить текст в поле ввода.\nОжидал: ${humanize(text, 120)}\nПолучил: ${humanize(again, 120)}`,
        EXIT.INPUT_NOT_FOUND
      );
    }
  }
  log.ok('текст вставлен в поле чата и сверен с эталоном');
  await shot(ctx, 'text-typed');
}

async function sendMessage(ctx) {
  const { page, cfg } = ctx;

  if (cfg.dryRun) {
    log.warn('--dry-run: текст введен, но НЕ отправлен');
    await shot(ctx, 'dry-run');
    return;
  }

  log.info('отправляю сообщение');
  const MSG_SELS = [SEL.messageUser, SEL.messageResponse];
  const countMsgs = () =>
    page.evaluate((sels) => {
      let n = 0;
      for (let i = 0; i < sels.length; i++) n += document.querySelectorAll(sels[i]).length;
      return n;
    }, MSG_SELS);
  const beforeCount = await countMsgs();

  // Ищем именно кнопку Send: в том же контейнере может лежать "Voice mode" (.omb__btn),
  // клик по ней уводит сценарий в голосовой ввод.
  let sendBtn = await findVisible(page, [SEL.sendButton], 0);
  if (!sendBtn) {
    const sendWrap = await findVisible(page, [SEL.sendWrap], 0);
    if (sendWrap) {
      const btn = await sendWrap.handle.evaluateHandle((el) => {
        const cand = Array.prototype.slice.call(el.querySelectorAll('button,[role="button"]'));
        const good = cand.filter((b) => {
          const sig = (b.getAttribute('aria-label') || '') + ' ' + String(b.className || '');
          return !/voice|omb/i.test(sig);
        });
        return good[0] || null;
      });
      const el = btn.asElement();
      if (el) sendBtn = { handle: el, selector: SEL.sendWrap + ' button:not([aria-label="Voice mode"])' };
    }
  }

  let clicked = false;
  if (sendBtn) {
    const disabled = await sendBtn.handle
      .evaluate((b) => b.disabled === true || b.getAttribute('aria-disabled') === 'true')
      .catch(() => true);
    if (disabled) {
      log.warn('кнопка отправки неактивна - пробую Enter');
    } else {
      clicked = (await humanClick(page, sendBtn.handle, 'send button')) !== false;
      if (!clicked) {
        const again = await findVisible(page, [SEL.sendButton], 0);
        if (again) clicked = (await humanClick(page, again.handle, 'send button (retry)')) !== false;
      }
    }
  } else {
    log.warn('кнопка Send не найдена - отправляю через Enter');
  }
  if (!clicked) {
    const ta = await findVisible(page, [SEL.textarea], 0);
    if (ta) {
      await ta.handle.evaluate((el) => el.focus());
      await page.keyboard.press('Enter');
      log.debug('отправка через Enter');
    } else {
      throw new StepError('Не найдено ни кнопки отправки, ни поля ввода - отправить сообщение нечем.', EXIT.SEND_FAILED);
    }
  }

  await sleep(900);

  const readSendState = () =>
    page.evaluate(
      (taSel, msgSels, before) => {
        const ta = document.querySelector(taSel);
        let count = 0;
        for (let i = 0; i < msgSels.length; i++) count += document.querySelectorAll(msgSels[i]).length;
        const stop = document.querySelector(
          '.message-input-right-button-send button.stop-button, .message-input-right-button-send button[aria-label="Stop"]'
        );
        return {
          textareaEmpty: ta ? (ta.value || '').trim().length === 0 : null,
          messageCount: count,
          before,
          hasMessageBox: !!document.getElementById('chat-message-container'),
          stopButton: !!stop,
          generating: !!document.querySelector('[class*="loading"], [class*="generating"], [class*="stop"]'),
          url: location.href,
        };
      },
      SEL.textarea,
      MSG_SELS,
      beforeCount
    );

  // В Agent Mode подтверждение отправки приходит НЕ сразу: сначала URL становится
  // "/c/new-chat", через ~2 с - "/c/<uuid>", и лишь к ~4 с очищается поле ввода,
  // появляются .chat-user-message/.chat-response-message и кнопка Send меняется на
  // Stop. Прежняя однократная проверка через 900 мс давала ложные срабатывания
  // (в обычном режиме "проскакивала" по URL, в агентском - вообще не работала,
  // потому что ".chat-message-container" в 0.3.22 уже не класс, а id).
  const REAL_CHAT_RE = /\/c\/(?!new-chat)[0-9a-f-]{8,}/i;
  const hasSignal = (st) =>
    st.textareaEmpty === true || st.messageCount > st.before || st.hasMessageBox || st.stopButton || REAL_CHAT_RE.test(st.url);

  let sent = await readSendState();
  if (!hasSignal(sent)) {
    const verifyTimeout = Math.max(15000, Math.min(cfg.elementTimeout * 1.5, 30000));
    log.debug(`жду подтверждения отправки (до ${verifyTimeout} мс)...`);
    try {
      await page.waitForFunction(
        (taSel, msgSels, before) => {
          const ta = document.querySelector(taSel);
          if (ta && (ta.value || '').trim().length === 0) return true;
          let count = 0;
          for (let i = 0; i < msgSels.length; i++) count += document.querySelectorAll(msgSels[i]).length;
          if (count > before) return true;
          if (document.getElementById('chat-message-container')) return true;
          if (document.querySelector('.message-input-right-button-send button.stop-button, .message-input-right-button-send button[aria-label="Stop"]')) return true;
          return /\/c\/(?!new-chat)[0-9a-f-]{8,}/i.test(location.href);
        },
        { timeout: verifyTimeout, polling: 300 },
        SEL.textarea,
        MSG_SELS,
        beforeCount
      );
    } catch (_) {
      log.debug('подтверждения отправки не дождались - фиксирую текущее состояние');
    }
    sent = await readSendState();
  }

  // Если сработал "быстрый" признак (URL/Stop), а сообщения ещё не отрендерились -
  // дочитываем состояние, чтобы в логе было честное число сообщений.
  if (hasSignal(sent) && sent.messageCount <= sent.before) {
    try {
      await page.waitForFunction(
        (msgSels, before) => {
          let count = 0;
          for (let i = 0; i < msgSels.length; i++) count += document.querySelectorAll(msgSels[i]).length;
          return count > before;
        },
        { timeout: 6000, polling: 250 },
        MSG_SELS,
        beforeCount
      );
      sent = await readSendState();
    } catch (_) {}
  }

  log.debug('состояние после отправки', sent);

  const okSignals = {
    textareaCleared: sent.textareaEmpty === true,
    messagesAdded: sent.messageCount > sent.before,
    messageBoxAppeared: sent.hasMessageBox,
    generationStarted: sent.stopButton,
    chatUrlWithId: REAL_CHAT_RE.test(sent.url),
  };
  log.debug('признаки отправки: ' + JSON.stringify(okSignals));
  if (!Object.keys(okSignals).some((k) => okSignals[k])) {
    await shot(ctx, 'send-failed');
    const toasts = await readErrorToasts(page);
    throw new StepError(
      'Похоже, сообщение НЕ отправилось: поле ввода не очистилось и новых сообщений не появилось.\n' +
        (toasts.length ? `Сообщения сайта: ${JSON.stringify(toasts)}\n` : '') +
        `Состояние: ${JSON.stringify(sent)}`,
      EXIT.SEND_FAILED
    );
  }

  log.ok(
    `сообщение отправлено (url=${sent.url}, сообщений в DOM: ${sent.before} -> ${sent.messageCount}, ` +
      `признаки: ${Object.keys(okSignals)
        .filter((k) => okSignals[k])
        .join('+') || 'нет'})`
  );
  await shot(ctx, 'message-sent');
}

async function captureResponse(ctx) {
  const { page, cfg } = ctx;
  log.info('пытаюсь вытащить текст ответа (--capture-response)');
  const deadline = Date.now() + cfg.captureTimeout;
  let lastText = '';
  let stableSince = Date.now();
  while (Date.now() < deadline) {
    const txt = await page.evaluate((sel, fallbackSel) => {
      let nodes = Array.from(document.querySelectorAll(sel));
      if (!nodes.length) nodes = Array.from(document.querySelectorAll(fallbackSel));
      if (!nodes.length) return '';
      const last = nodes[nodes.length - 1];
      return (last.innerText || '').replace(/\n{3,}/g, '\n\n').trim();
    }, SEL.messageResponse, SEL.messageContainer);
    if (txt && txt === lastText) {
      if (Date.now() - stableSince > 4000) break; // 4 с без изменений - считаем готовым
    } else {
      stableSince = Date.now();
      lastText = txt;
    }
    await sleep(1000);
  }
  if (lastText) log.ok('ответ ассистента:\n' + lastText.slice(0, 4000));
  else log.warn('текст ответа получить не удалось (пусто или не отрендерился)');
  await shot(ctx, 'final-response', true);
}

/* ============================ main ============================ */
async function main() {
  let cfg;
  try {
    cfg = await parseCli(process.argv.slice(2));
  } catch (err) {
    const code = err instanceof StepError ? err.exitCode : EXIT.BAD_ARGS;
    log.error(err && err.message ? err.message : String(err));
    process.exit(code);
  }

  log.info('=== qwen-chat-auto ===');
  log.info('путь к профилю: ' + path.resolve(cfg.userDataDir));
  log.debug('конфигурация (без секретов)', {
    userDataDir: path.resolve(cfg.userDataDir),
    profileCopy: cfg.profileCopy,
    agent: cfg.agent,
    headless: cfg.headless,
    lang: cfg.lang,
    messageSource: cfg.messageSource,
    messageLength: Array.from(cfg.messageText).length,
    messagePreview: humanize(cfg.messageText, 100),
    login: cfg.login || '(не задан)',
    password: cfg.password ? maskSecret(cfg.password) : '(не задан)',
    hasCreds: cfg.hasCreds,
    timings: {
      navTimeout: cfg.navTimeout,
      loginTimeout: cfg.loginTimeout,
      elementTimeout: cfg.elementTimeout,
      settleDelay: cfg.settleDelay,
      typeDelay: cfg.typeDelay,
      stepDelay: cfg.stepDelay,
      postWaitSec: cfg.postWaitSec,
    },
  });

  const launched = await launchBrowser(cfg);
  const ctx = new Ctx(cfg, launched.browser, launched.page);
  let exitCode = EXIT.OK;
  let tempCopyToRemove = launched.tempCopy;

  const shutdown = async (code, reason) => {
    try {
      if (cfg.keepOpen && code === EXIT.OK) {
        log.warn('--keep-open: оставляю браузер открытым. Нажмите Ctrl+C для выхода.');
        await new Promise(() => {});
      }
    } finally {
      try {
        await launched.browser.close();
      } catch (_) {}
      if (tempCopyToRemove) {
        try {
          fs.rmSync(tempCopyToRemove, { recursive: true, force: true });
          log.debug('временная копия профиля удалена: ' + tempCopyToRemove);
        } catch (_) {}
      }
      if (LOG_FILE.fd) {
        try {
          fs.closeSync(LOG_FILE.fd);
        } catch (_) {}
      }
      if (reason) log.info('завершение: ' + reason);
      process.exit(code);
    }
  };

  process.on('SIGINT', () => {
    log.warn('получен SIGINT - закрываю браузер');
    shutdown(EXIT.INTERNAL, 'прервано пользователем');
  });
  process.on('SIGTERM', () => shutdown(EXIT.INTERNAL, 'получен SIGTERM'));

  try {
    /* --- шаг 1: проверка логина --- */
    let authed = await isLoggedIn(ctx, 'первичная проверка');
    await sleep(cfg.stepDelay);

    /* --- шаг 2: логин при необходимости --- */
    if (!authed) {
      if (!cfg.hasCreds) {
        throw new StepError(
          'Профиль НЕ залогинен на chat.qwen.ai, а учетные данные не переданы.\n' +
            'Путь к профилю: ' + cfg.userDataDir + '\n' +
            'Нужны --login и --password (или переменные окружения $QWEN_LOGIN/$QWEN_PASSWORD,\n' +
            'или --password-stdin). Без них скрипт не может авторизоваться - выхожу.\n' +
            'Альтернатива: залогиньтесь в этом профиле руками один раз, дальше сессия будет жить в --user-data-dir.',
          EXIT.NOT_LOGGED_IN
        );
      }
      const okLogin = await performLogin(ctx);
      if (!okLogin) throw new StepError('performLogin вернул false - авторизация не удалась.', EXIT.LOGIN_FAILED);

      log.info('контрольная проверка авторизации после логина');
      const verified = await isLoggedIn(ctx, 'контроль после логина');
      if (!verified) {
        throw new StepError(
          'После попытки входа /settings/general по-прежнему не открывается - профиль так и не залогинен.',
          EXIT.LOGIN_FAILED
        );
      }
      log.ok('ЭТАП ПРОЙДЕН: авторизация подтверждена открытием /settings/general');
      authed = true;
    } else {
      log.ok('ЭТАП ПРОЙДЕН: профиль уже был авторизован, логин не понадобился');
    }
    await sleep(cfg.stepDelay);

    /* --- шаг 3: страница чата --- */
    await ensureChatPage(ctx);
    if (cfg.newChat) await startNewChat(ctx);
    await settle(ctx);
    // КРИТИЧНО: дожидаемся, пока композер отрисуется И перестанет пересоздаваться.
    // Без этого следующий шаг кликает по узлу, который React заменяет через ~3 с.
    await waitForComposerReady(ctx);
    ctx.appVersion = await readAppVersion(ctx.page);
    if (ctx.appVersion) {
      const known = TESTED_APP_VERSIONS.indexOf(ctx.appVersion) !== -1;
      log.info(
        `версия фронта: qwen-chat-fe ${ctx.appVersion}` +
          (known ? '' : ` (ВНИМАНИЕ: не входит в список проверенных ${TESTED_APP_VERSIONS.join(', ')} - селекторы могли измениться)`)
      );
    }
    log.ok('ЭТАП ПРОЙДЕН: открыта страница чата ' + ctx.page.url());
    await shot(ctx, 'chat-page');

    /* --- шаг 4: agent mode --- */
    if (cfg.agent) {
      await enableAgentMode(ctx);
      log.ok('ЭТАП ПРОЙДЕН: режим агента активен');
      await sleep(cfg.stepDelay);
    } else {
      log.info('--agent не указан - остаюсь в текущем режиме чата');
    }

    /* --- шаг 5: ввод текста --- */
    await typeMessage(ctx);
    log.ok('ЭТАП ПРОЙДЕН: текст сообщения введен');
    await sleep(cfg.stepDelay);

    /* --- шаг 6: отправка --- */
    await sendMessage(ctx);
    if (cfg.dryRun) {
      log.ok('ЭТАП ПРОЙДЕН: dry-run завершен (сообщение не отправлялось)');
    } else {
      log.ok('ЭТАП ПРОЙДЕН: обработка сообщения запущена');
    }

    /* --- шаг 7: ожидание --- */
    const waitSec = cfg.postWaitSec;
    if (waitSec > 0) {
      log.info(`жду ${waitSec} с после запуска обработки (--post-wait)...`);
      const start = Date.now();
      for (;;) {
        const left = waitSec - Math.round((Date.now() - start) / 1000);
        if (left <= 0) break;
        if (left % 10 === 0) log.debug(`осталось ${left} с`);
        await sleep(1000);
      }
      log.ok(`ожидание завершено (${waitSec} с)`);
    }

    if (cfg.captureResponse && !cfg.dryRun) await captureResponse(ctx);

    await shot(ctx, 'final-state');
    log.ok('=== ГОТОВО: все этапы выполнены успешно ===');
    exitCode = EXIT.OK;
  } catch (err) {
    const code = err instanceof StepError ? err.exitCode : EXIT.INTERNAL;
    log.error(err && err.message ? err.message : String(err));
    if (err && err.details) log.error('детали', err.details);
    if (!(err instanceof StepError)) log.debug('stack: ' + (err && err.stack ? err.stack : 'n/a'));
    if (cfg.onErrorDump && ctx.page) {
      await dumpDiagnostics(ctx, `exit-${code}`).catch(() => {});
    }
    exitCode = code;
  }

  await shutdown(exitCode, exitCode === EXIT.OK ? 'успех' : `код выхода ${exitCode}`);
}

if (require.main === module) {
  main().catch((e) => {
    log.error('необработанная ошибка: ' + (e && e.stack ? e.stack : e));
    process.exit(EXIT.INTERNAL);
  });
}

module.exports = { EXIT, sha256hex, SEL, TXT };

/**
 * Внутренности экспортируются только для тестов/отладки
 * (require('./qwen-chat-auto.js')._internals) - на поведение CLI не влияют.
 */
module.exports._internals = {
  Ctx,
  QCA_SRC,
  QCA_VERSION,
  ensureQca,
  readAppVersion,
  waitForStableVisible,
  waitForComposerReady,
  readModeMenuState,
  waitModeMenuOpen,
  inspectModeTrigger,
  listModeItems,
  findModeItemFresh,
  clickModeItemInPage,
  tryOpenModeMenu,
  openModeDropdown,
  enableAgentMode,
  dismissBlockers,
  detectBlockers,
  dumpModeDiagnostics,
  getCurrentModeLabel,
  typeMessage,
  sendMessage,
  startNewChat,
  ensureChatPage,
  humanClick,
  findVisible,
  waitForAny,
  MODE_TRIGGER_SELS,
  MODE_ITEM_SELS,
  PAGE_ERRORS,
  log,
  setLogLevel: (l) => {
    LOG_LEVEL = l;
  },
};
