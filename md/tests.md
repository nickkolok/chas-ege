# 🧪 Тесты: как устроены и как добавлять

> Node-тесты гоняются `npm test` (QUnit + jsdom); старые браузерные QUnit-тесты лежат
> в `test/old/` и собираются grunt'ом. Покадровый механизм введён в
> [#3848](https://github.com/nickkolok/chas-ege/pull/3848) — описание соответствует
> состоянию репозитория после его мержа в `devel`.

---

## Раскладка `test/`

```
test/
├── run-node-tests.js      ← раннер node-тестов (npm test): jsdom + build/lib/chas-lib.js
├── load-tests.js          ← покадровый лоадер: сканирует test/ и подключает файлы тестов
├── node-unit-tests*.js    ← легаси: пять больших файлов тестов, раннер грузит их явно
├── Circle/
│   └── drawOnto.js        ← пример покадрового теста: test/<Модуль>/<метод>.js
├── helpers/               ← вспомогательные модули тестов; лоадер сюда не заходит
└── old/                   ← старые браузерные QUnit-тесты (grunt → build/test/old/)
```

---

## Как добавить тест на функцию

**Один метод — один файл** `test/<Модуль>/<метод>.js`.
Дописывать строки в здоровенные `node-unit-tests*.js` не нужно — параллельные
пуллреквесты не конфликтуют.

Файл экспортирует функцию регистрации — та же конвенция, что у легаси-тестов:

```js
'use strict';
module.exports = function (QUnit) {
    QUnit.module('MyModule: myMethod (lib/my_module.js)');
    QUnit.test('myMethod делает то, что должен', function (assert) {
        assert.strictEqual(2 + 2, 4, 'арифметика на месте');
    });
};
```

Лоадер сам найдёт файл и подключит его до старта QUnit — **править раннер не надо**.

### Имя файла и модуля

- `<Модуль>` — класс или модуль-источник: `Circle`, `Canvas`, `NumberMath`, …
  (ориентир — `lib/<module>.js` или имя класса).
- `<метод>` — имя тестируемой функции/метода: `drawOnto`, `drawGridWithArrows`, …
- Один файл — один метод: несколько проверок одного метода — в одном файле,
  разные методы — по разным файлам.
- Из `test/<Модуль>/` корень репозитория — `../..`.

### Формат

- `.js`, CommonJS (`module.exports`): в `package.json` нет `"type"`, раннер и бандл
  живут на `require`/`vm` — `.mjs` форсировал бы ESM и смешение модульных систем.
- Внутри — `QUnit.module(...)` + `QUnit.test(...)`, как в существующих тестах.
- Исходник через `vm` грузят только то, что бандл не отдаёт в global: так в `node-unit-tests.js`
  загружаются `lib/figure.js` и `lib/project3DTo2D.js` (раздел «Видимость граней»), а
  `node-unit-tests-math-functions.js` берёт `lib/math_functions.js` через `new Function`.
  Если функция или класс в бандле глобальные, тест вызывает их напрямую: так он проверяет
  и то, что файл попал в бандл.
- Если код опирается на всю сборку (`build/lib/chas-lib.js`), окружение уже поднято
  раннером к моменту подключения тестов: jsdom-`window`/`document`, классы
  `Triangle`, `Circle`, `Point` и др. доступны глобально, как и методы бандла вроде
  `Number.prototype.pow`. Образец — тест `Triangle` в самом `run-node-tests.js`
  и раздел `QUnit.module('Number Math Functions')` в `node-unit-tests.js`.
  А `node-unit-tests-task-correspondence.js` (и `-task-graph-derivative.js`, `-seedrandom.js`)
  окружением раннера не пользуется: он поднимает свой `new JSDOM(...)` со своим `window.chas`.
  Так делают, только когда тесту нужно окружение, отличное от раннера.

---

## Пример: `test/Circle/drawOnto.js`

Реальный покадровый тест на `Circle.prototype.drawOnto` из `lib/circle.js`, перенесённый
из легаси-раздела `QUnit.module('Circle')` в `node-unit-tests.js`. Метод навешивается на `Circle`
из flatten-shape-geometry (поля `pc` и `r`), а этот класс раннер уже сделал глобальным вместе
с `Point`, и бандл уже повесил на него `drawOnto`. Поэтому тест создаёт настоящий `Circle`
и упадёт, если `lib/circle.js` выпадет из бандла или у `Circle` сменятся поля.
Содержимое файла целиком:

```js
'use strict';
// Тест: Circle.prototype.drawOnto из lib/circle.js.
// Раннер уже загрузил бандл (build/lib/chas-lib.js), Circle и Point — глобальные,
// поэтому проверяется настоящий класс: и то, что lib/circle.js попал в бандл,
// и то, что у Circle из flatten-shape-geometry по-прежнему поля pc и r.

module.exports = function registerCircleDrawOntoTests(QUnit) {
    QUnit.module('Circle: drawOnto (lib/circle.js)');

    function drawCalls(circle) {
        const calls = [];
        const ctx = { drawCircle: function() { calls.push(Array.prototype.slice.call(arguments)); } };
        const ret = circle.drawOnto(ctx);
        return { calls: calls, ret: ret };
    }

    QUnit.test('drawOnto определён на прототипе Circle', function(assert) {
        assert.strictEqual(typeof Circle.prototype.drawOnto, 'function', 'метод на прототипе');
    });

    QUnit.test('drawOnto вызывает ctx.drawCircle(pc.x, pc.y, r)', function(assert) {
        assert.deepEqual(drawCalls(new Circle(new Point(3, -4), 7)).calls, [[3, -4, 7]],
            'drawCircle вызван один раз с центром и радиусом');
    });

    QUnit.test('drawOnto: дробный центр и нулевой радиус передаются как есть', function(assert) {
        assert.deepEqual(drawCalls(new Circle(new Point(0.5, 1.25), 0)).calls, [[0.5, 1.25, 0]],
            'без округлений и проверок');
    });

    QUnit.test('drawOnto ничего не возвращает', function(assert) {
        assert.strictEqual(drawCalls(new Circle(new Point(0, 0), 1)).ret, undefined,
            'рисует, но не возвращает значение');
    });
};
```

---

## Что делает лоадер (`test/load-tests.js`)

1. Рекурсивно обходит `test/` и собирает все `*.js` (сортировка по пути).
2. Пропускает:
   - в корне `test/`: каталог `old/` — браузерные тесты, их собирает grunt,
     и каталог `helpers/` — вспомогательные модули (см. ниже). В `test/<Модуль>/`
     каталоги с такими именами — обычные, тесты из них подключаются;
   - в корне `test/`: `run-node-tests.js` и `load-tests.js` — служебные файлы,
     и пять легаси-файлов `node-unit-tests*.js` из списка `LEGACY_FILES` — раннер подключает
     их явно (чтобы не задвоить). Другой файл в корне, в том числе новый `node-unit-tests-*.js`,
     лоадер подключает сам. В подкаталогах файлы с такими именами — обычные тесты;
   - файлы, которые раннер уже подключил явным `require()` (они есть в `require.cache`):
     второй раз их тесты не регистрируются.
3. Для каждого файла: `require()` → проверяет, что экспортируется функция
   регистрации → вызывает её с `QUnit`.
4. Пишет в лог `↳ тест подключён: Circle/drawOnto.js` и итоговое количество
   подключённых файлов.

Рекомендуемая раскладка — `test/<Модуль>/<метод>.js`, но технически лоадер подхватит
любой `*.js` в `test/` и подпапках, кроме перечисленных исключений.

### Вспомогательные модули: `test/helpers/`

Общие заглушки, фабрики объектов и прочее, что не регистрирует тестов, кладут
в `test/helpers/` (каталог держится пустым файлом `.gitkeep`), а тесты подключают
их сами: `require('../helpers/имя.js')`. Вне `test/helpers/` (в том числе в `test/<Модуль>/helpers/`) такой файл роняет прогон:
лоадер требует от каждого `.js` функцию регистрации (см. «Fail-fast»).

### Что молча не попадёт в прогон

Лоадер об этих файлах ничего не пишет, `npm test` проходит без них:

- всё, что не `.js`: `.cjs`, `.mjs`, `.json` и т. п.;
- символьные ссылки — и на файлы, и на каталоги (лоадер берёт только обычные файлы и каталоги).

Новый `node-unit-tests-*.js` в корне `test/` лоадер подключает сам, как любой другой `.js`.
Дописывать его в `run-node-tests.js` явным `require()` не нужно; если дописали, лоадер
второй раз его не подключает, и строки `↳ тест подключён` для него не будет. Новые тесты
всё равно кладут в `test/<Модуль>/<метод>.js`.

Проверить, что файл подключён, — по строке `↳ тест подключён: <путь>` в выводе `npm test`.

---

## Fail-fast: битый тест роняет прогон

Любая ошибка загрузки или регистрации теста **фатальна** (`process.exit(1)`),
а не «⚠️ не удалось загрузить…» в логе:

- синтаксическая ошибка в файле тестов;
- файл не экспортирует функцию регистрации;
- исключение при регистрации тестов.

Это касается и покадровых файлов, и легаси-`require` в раннере. Дополнительно раннер
падает, если QUnit не выполнил ни одного теста.

---

## Как запускать

```bash
npm install
npm install --no-save grunt-cli canvas   # одной командой, см. how_to_review_PR.md, «Подводные камни»
./node_modules/.bin/grunt                 # сборка — нужна для build/lib/chas-lib.js
npm test                                  # node-тесты (QUnit + jsdom); Node 22.12.0, как в CI
```

Голого `grunt` в `PATH` обычно нет: его даёт `grunt-cli` из `node_modules`.

Старые браузерные тесты из `test/old/` (собираются в `build/test/old/`) запускаются
`./node_modules/.bin/grunt qunit`, но сейчас эта команда не работает, ни на `devel`,
ни после переноса в `old/`: страница падает с `QUnit.on is not a function`
(мост `grunt-contrib-qunit` 6 рассчитан на QUnit 2, а `templ-test.html` подключает
`qunitjs` 1.23) и `math is not defined`, и Chrome выходит по тайм-ауту.

CI (`.github/workflows/ci.yml`) гоняет `grunt` + `node test/run-node-tests.js`
на Node 22.12.0; браузерный `grunt qunit` в CI не запускается.

---

## См. также

- [Файловая структура репозитория](repo_structure.md)
- [#3848](https://github.com/nickkolok/chas-ege/pull/3848) — перенос тестов в `test/`,
  покадровый лоадер, fail-fast.
