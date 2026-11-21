# Отладка шаблона в песочнице с ограничениями

Если полноценная сборка (`git clone` + `npm install` + `grunt`) недоступна —
например, в ассистентской песочнице с урезанной сетью, эфемерной файловой системой
и коротким бюджетом на вызов, — шаблон всё равно можно прогнать и проверить.

Общий метод (массовый прогон, проверка ответов своей формулой, сравнение
«байт в байт») описан в [Как делать ревью пуллреквеста](how_to_review_PR.md),
раздел «Массовый прогон шаблона». Здесь — только то, что отличается,
когда сборку поднять нельзя.

## Ограничения, с которыми придётся жить

- **Эфемерная ФС.** Файлы (и `/tmp`, и рабочий каталог) могут стереться между
  вызовами. Каждый вызов делать самодостаточным; загрузки — возобновляемыми.
- **Бюджет вызова ~20 с.** Долгое `npm install` или скачивание 6 МБ не помещаются.
  Качать chunked (`Range`), npm — с тёплым кэшем (`--prefer-offline`).
- **Сеть избирательна.** `github.com` (web) может не открываться, зато работают
  `api.github.com`, `release-assets.githubusercontent.com`, `registry.npmjs.org`,
  `archive.debian.org`.
- **Старые системные библиотеки.** Debian buster: `pango 1.42`, `glib 2.58`,
  `glibc 2.28`. Это ломает native-canvas (см. ниже).

## Где брать bundle (без grunt)

Бандл `build/lib/chas-uijs.js` уже собирается CI на каждый push в `devel`
(см. `.github/workflows/ci.yml`), его не нужно собирать locally.

### Основной способ — rolling-релиз `devel-bundle-latest`

Прямые ссылки, **без токена**:

- `https://github.com/nickkolok/chas-ege/releases/download/devel-bundle-latest/chas-uijs.js`
- `https://github.com/nickkolok/chas-ege/releases/download/devel-bundle-latest/chas-lib.js`

Точный коммит — в заголовке и notes релиза (`devel bundle @ <sha>`);
сверять с `git rev-parse upstream/devel`. Тег «движется», поэтому для пиннинга
конкретного коммита использовать резервный способ.

### Резервный способ — CI-артефакт `lib-bundle`

Тот же самый билд, но zip (~1,9 МБ вместо 6,4 МБ сырых):

```
GET https://api.github.com/repos/nickkolok/chas-ege/actions/artifacts/{id}/zip
```

`id` — из `GET /repos/nickkolok/chas-ege/actions/runs/{run_id}/artifacts`.
Внутри zip — `chas-uijs.js` и `chas-lib.js`. Для конкретного PR берётся артефакт
его прогона. Этот способ удобен, когда сырой бандл не лезет в бюджет вызова.

### Проверка целостности

- размер (`chas-uijs.js` ≈ 6,4 МБ);
- `sha256` и сравнение с релиз-ассетом;
- голова файла: после фикса seedrandom бандл начинается с
  `!function(f,a,c){var s,l=256,p="random"` (а не с fraction.js).

## Чем рисовать: `@napi-rs/canvas` вместо node-canvas

**node-canvas 3.x требует `pango ≥ 1.44`** (символ
`pango_context_set_round_glyph_positions`), а в buster — 1.42. Подложить новый
pango нельзя: он тянет `glib ≥ 2.62` (`g_ptr_array_copy`), а тот — glibc. Каскад.

Решение — **`@napi-rs/canvas`**: canvas на Skia, prebuilt через N-API,
**не зависит от системных cairo/pango/glib**. API совместим с node-canvas
(`createCanvas`, `toBuffer`, `toDataURL`). Обвязка:

1. shim `node_modules/canvas` → `@napi-rs/canvas`:

```js
const napi = require('@napi-rs/canvas');
module.exports = napi;
module.exports.CanvasRenderingContext2D =
  Object.getPrototypeOf(napi.createCanvas(1,1).getContext('2d')).constructor;
```

2. однострочный патч jsdom `HTMLCanvasElement-impl.js` (у Skia-контекста
   `canvas` — getter-only):

```js
try { this._context.canvas = idlUtils.wrapperForImpl(this); } catch (e) {}
```

3. шрифты. В песочнице есть DejaVu (например, в matplotlib-каталоге);
   регистрируем под именем, которое ждут шаблоны:

```js
GlobalFonts.registerFromPath('…/DejaVuSans.ttf', 'liberation_sans');
```

## Запуск

Кладём рядом: `build/lib/chas-uijs.js`, `dev/run-node-template.js`, шаблон
по своему пути `zdn/<набор>/<№>/<номер>.js`. Гоняем проектным раннером:

```bash
node -r ./font-setup.js dev/run-node-template.js \
  --filepath zdn/matege2024b/12/6623.js \
  --iterations 10 --seed chas-ege-pic --no-tex --quiet --json
```

`--seed` даёт воспроизводимость, `--json` — машинный вывод (формат см.
в [how_to_review_PR.md](how_to_review_PR.md)). Чертежи приходят как
`<img src="data:image/png;base64,…">` прямо в `txt`.

Свой harness: jsdom-окно с заглушками (`MathJax`, `CanvasRenderingContext2D`,
`alert`) + бандл + шаблон; читать `window.vopr.txt/ver`, рисовать через
`vopr.dey()`. **В конце обязательно `process.exit()`** — окно держит таймеры
и само не завершится (см. «Подводные камни» в how_to_review_PR.md).

## Побайтовое сравнение

- **Бандл vs релиз-ассет:** размер + `sha256` + голова.
- **Детерминизм:** один и тот же `--seed` → идентичный JSON. seedrandom теперь
  приезжает из самого бандла (без отдельной загрузки), это проверяет
  `dev/node-unit-tests-seedrandom.js`.
- **До/после правки:** по [how_to_review_PR.md](how_to_review_PR.md) — каждый
  шаблон отдельным процессом, одно зерно на процесс, эталон прогнать дважды.

## Попиксельное сравнение

PNG загружаем тем же `@napi-rs/canvas` и сравниваем пиксели (или хэш буфера):

```js
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const img = await loadImage('task.png');
const c = createCanvas(img.width, img.height);
const x = c.getContext('2d'); x.drawImage(img, 0, 0);
const px = x.getImageData(0, 0, img.width, img.height).data;
// сравнивать буферы/хэши; учитывать антиалиасинг (допуск по яркости),
// либо сравнивать рендер тем же движком
```

Для штрихового рисунка удобно считать долю «тёмных» пикселей и раскладывать
картинку в ASCII-превью (порог по яркости, block-min) — так рисунок видно
прямо в логе/чате.

## SVG-вариант: текст остаётся текстом

PNG неудобен для разглядывания и диффа: бинарь, нужен просмотрщик, мылит при
масштабе. **SVG** векторный, текстовый (открывается в браузере, читается глазами,
кладётся в дифф), для штрихового рисунка обычно компактнее.

**Важно: текст должен остаться `<text>`, а не превратиться в кривые.**
Иначе подписи нельзя выделить/скопировать и неудобно сравнивать. Готовые средства:

- **`canvas2svg`** (чистый JS, без native): `new C2S(w, h, { document })` —
  `fillText` даёт `<text>`. Нужен `document` (подойдёт jsdom-окно).
- **`@napi-rs/canvas` `SVGCanvas`**: `new SVGCanvas(w, h)` **без** флага
  `SvgExportFlag.ConvertTextToPaths` — тогда текст остаётся `<text>`.
  С этим флагом текст превращается в кривые — это как раз то, чего НЕ надо.

SVG→PNG при необходимости — `resvg-js` (Rust, zero deps) или `svg2png-wasm`
(чистый WASM): оба без системного pango.

## Подводные камни песочницы

- **`npm install --no-save` второй раз удаляет то, что поставил первый**
  (см. how_to_review_PR.md). Ставить нужные пакеты одной командой.
- **Частичный tarball битый.** Если скачивание node оборвалось по бюджету,
  файл есть, но `tar` скажет «File format not recognized». Проверять размер
  против `Content-Length` и перекачивать.
- **Качать chunked и возобновляемо.** `Range: bytes=N-` через API-ассет
  (`api.github.com/.../releases/assets/{id}`, `Accept: application/octet-stream`)
  работает, когда `github.com` web закрыт.
- **`libgif.so.7`** для canvas можно взять из `archive.debian.org`
  (`libgif7` deb, `ar x` + `tar xf data.tar.*`) и положить в `LD_LIBRARY_PATH`.
- **Эфемерная ФС** — каждый вызов самодостаточен; не рассчитывать, что файлы
  доживут до следующего.
