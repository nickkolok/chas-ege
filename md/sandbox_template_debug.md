# Отладка шаблона в песочнице с ограничениями

Если полноценная сборка (`git clone` + `npm install` + `grunt`) недоступна —
например, в ассистентской песочнице с урезанной сетью, эфемерной файловой системой
и коротким бюджетом на вызов, — шаблон всё равно можно прогнать и проверить.

Общий метод (массовый прогон, проверка ответов своей формулой, сравнение
«байт в байт») описан в [Как делать ревью пуллреквеста](how_to_review_PR.md),
раздел «Массовый прогон шаблона». Здесь — только то, что отличается,
когда сборку поднять нельзя.

## Ограничения: какие бывают и как проверить

**Важно:** перечисленное ниже — не обязательные свойства любой песочницы, а то,
с чем мы столкнулись в нашей. Конкретный набор ограничений может отличаться:
файлы **могут** пропадать между вызовами, а **могут и сохраняться**; системные
библиотеки **могут** быть устаревшими, а **могут и свежими**; сеть может быть
урезана, а может и нет; бюджет вызова может быть коротким, а может и щедрым.
Поэтому сначала проверяем, что действительно так (см. «Диагностика»), и применяем
обходы только там, где они нужны.

- **Эфемерная ФС (возможна).** Файлы (и `/tmp`, и рабочий каталог) могут стереться
  между вызовами, но не обязаны. Если ФС постоянная — зависимости ставим один раз
  и переиспользуем; если эфемерная — каждый вызов самодостаточный, загрузки
  возобновляемые.
- **Короткий бюджет вызова (возможен).** У нас ~20 с: долгое `npm install` или
  скачивание 6 МБ не помещаются. Если бюджет щедрый — ставим и качаем обычно;
  если короткий — качать chunked (`Range`), npm с тёплым кэшем (`--prefer-offline`).
- **Избирательная сеть (возможна).** `github.com` (web) может не открываться, зато
  работают `api.github.com`, `release-assets.githubusercontent.com`,
  `registry.npmjs.org`, `archive.debian.org`. Если сеть полная — берём всё напрямую.
- **Старые системные библиотеки (возможны).** У нас Debian buster: `pango 1.42`,
  `glib 2.58`, `glibc 2.28` — это ломает native-canvas (см. ниже). Если библиотеки
  свежие — node-canvas встаёт штатно, и обход с `@napi-rs/canvas` не нужен.

### Диагностика

Прежде чем применять обходы, проверить, что из этого действительно есть:

- **ФС:** записать файл-маркер в одном вызове и прочитать в следующем. Пропал —
  ФС эфемерная; на месте — постоянная.
- **Библиотеки:** `ldconfig -p | grep -E 'pango|glib'` (версии pango/glib),
  `node --version`. Свежий pango ≥ 1.44 — native-canvas можно ставить штатно.
- **Сеть:** `curl -sI https://github.com` и `https://registry.npmjs.org` — что
  открывается. Если `github.com` web закрыт, качать через `api.github.com` /
  `release-assets.githubusercontent.com`.
- **Бюджет:** замерить длительность вызова; если обрывается на ~20 с — закладывать
  chunked-загрузки и тёплый кэш.

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
и само не завершится (см. [«Подводные камни»](how_to_review_PR.md#подводные-камни) в how_to_review_PR.md).

Если нужно проверить не шаблон, а функцию библиотеки, свой harness не нужен:
`node dev/run-node-template.js --eval '<выражение>'` вычисляет выражение в том же окне
с бандлом (см. [«Функция библиотеки без шаблона»](how_to_review_PR.md#функция-библиотеки-без-шаблона---eval)
в how_to_review_PR.md).

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
Иначе подписи нельзя выделить/скопировать и неудобно сравнивать.

### Рабочий рецепт: `canvas2svg` как backend шаблона

`@napi-rs/canvas` `SVGCanvas` в нашей песочнице падал (сигнал), поэтому надёжный
путь — чистый JS **`canvas2svg`**: рисует в SVG по canvas-API, `fillText` даёт
`<text>`. Нюансы, без которых не заводится:

1. Конструктор — **одним объектом**: `new C2S({ width, height, document })`.
   Вызов `new C2S(w, h, opts)` игнорирует `opts` (при `arguments.length > 1`
   библиотека берёт только width/height), и `document` теряется.
2. `global.XMLSerializer = window.XMLSerializer` — иначе `getSerializedSvg()`
   падает (`XMLSerializer is not defined`).
3. `document` — jsdom-окно. Внутри C2S создаёт measuring-канвас и зовёт
   `getContext('2d')` для `measureText`, поэтому jsdom должен иметь реальный
   backend (`@napi-rs/canvas` через shim, см. выше).
4. Подменяем backend и навешиваем расширения `lib/canvas.js` на прототип C2S
   (флаг `constructing` защищает от рекурсии — C2S внутри себя тоже зовёт
   `getContext`):

```js
window.CanvasRenderingContext2D = C2S;  // drawFigure/arcBetweenSegments лягут на C2S.prototype
let constructing = false;
window.HTMLCanvasElement.prototype.getContext = function (type) {
  if (type !== '2d') return null;
  const w = this.width || 300, h = this.height || 150;
  if (constructing) return napi.createCanvas(w, h).getContext('2d'); // measuring-канвас
  if (!this.__c2s) {
    constructing = true;
    try { this.__c2s = new C2S({ width: w, height: h, document: window.document }); }
    finally { constructing = false; }
  }
  return this.__c2s;
};
```

5. **Полифиллы** методов, которых нет в canvas2svg, но которые зовёт
   `lib/canvas.js` (иначе `dey()` падает):

```js
// пунктир
C2S.prototype.setLineDash = function (d) {
  this.__lineDash = d || [];
  const e = this.__currentElement;
  if (e) { if (this.__lineDash.length) e.setAttribute('stroke-dasharray', this.__lineDash.join(','));
           else e.removeAttribute('stroke-dasharray'); }
};
C2S.prototype.getLineDash = function () { return this.__lineDash || []; };
// шрифт: встроенный __parseFont не понимает подчёркивание в имени (liberation_sans)
C2S.prototype.__parseFont = function () {
  const f = this.font || '10px sans-serif';
  const m = f.match(/([.\d]+(?:px|pt|em|ex|%|cm|mm|in|pc))\s*(.*)$/);
  return { style: /italic|oblique/.test(f) ? 'italic' : 'normal',
           size: m ? m[1] : '10px',
           family: (m ? m[2] : 'sans-serif').trim() || 'sans-serif',
           weight: /bold|[1-9]00/.test(f) ? 'bold' : 'normal',
           decoration: 'normal', href: null };
};
```

Дальше — как обычно: грузим бандл + шаблон, `vopr.dey()` рисует в C2S, затем
`canvas.__c2s.getSerializedSvg()` даёт SVG. **Проверено на шаблоне 6623:
6 `<path>` (стороны, биссектриса, дуги углов) + 4 `<text>` (подписи S/B/A/J) —
текст остаётся текстом.**

Мелочь: при «пустом» пунктире `setLineDash([0,0])` остаётся
`stroke-dasharray="0,0"` (рендерится как сплошная линия); при желании полифилл
можно научить убирать атрибут и для all-zero.

### Альтернатива: `@napi-rs/canvas` `SVGCanvas`

`new SVGCanvas(w, h)` **без** флага `SvgExportFlag.ConvertTextToPaths` — текст
остаётся `<text>` (с флагом — кривые, это как раз НЕ наш вариант). В нашей
песочнице экспорт падал с сигналом, поэтому основной рецепт — canvas2svg;
в нормальном окружении `SVGCanvas` может оказаться удобнее (все методы canvas
на месте, полифиллы не нужны).

SVG→PNG при необходимости — `resvg-js` (Rust, zero deps) или `svg2png-wasm`
(чистый WASM): оба без системного pango.

## Подводные камни песочницы

- **`npm install --no-save` второй раз удаляет то, что поставил первый**
  (см. [«Подводные камни»](how_to_review_PR.md#подводные-камни) в how_to_review_PR.md). Ставить нужные пакеты одной командой.
- **Частичный tarball битый.** Если скачивание node оборвалось по бюджету,
  файл есть, но `tar` скажет «File format not recognized». Проверять размер
  против `Content-Length` и перекачивать.
- **Качать chunked и возобновляемо.** `Range: bytes=N-` через API-ассет
  (`api.github.com/.../releases/assets/{id}`, `Accept: application/octet-stream`)
  работает, когда `github.com` web закрыт.
- **`libgif.so.7`** для canvas можно взять из `archive.debian.org`
  (`libgif7` deb, `ar x` + `tar xf data.tar.*`) и положить в `LD_LIBRARY_PATH`.
- **Эфемерная ФС (если есть)** — каждый вызов самодостаточен; но если ФС
  постоянная (см. «Диагностика»), файлы переиспользуем.
