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
├── node-unit-tests*.js    ← легаси: большие файлы тестов, раннер грузит их явно
├── Circle/
│   └── drawOnto.js        ← пример покадрового теста: test/<Модуль>/<метод>.js
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
- Чистые функции удобно грузить исходником через `vm` (см. пример ниже).
- Если код опирается на всю сборку (`build/lib/chas-lib.js`), окружение уже поднято
  раннером к моменту подключения тестов: jsdom-`window`/`document`, классы
  `Triangle`, `Circle` и др. доступны глобально (образец использования —
  `node-unit-tests-task-correspondence.js`).

---

## Пример: `test/Circle/drawOnto.js`

Реальный покадровый тест на `Circle.prototype.drawOnto` из `lib/circle.js`.
Метод навешивается на `Circle` из flatten-shape-geometry (поля `pc` и `r`),
а не на `Circle` из `@flatten-js/core`, поэтому файл грузит исходник в изолированный
`vm`-контекст с классом-заглушкой нужной формы. Содержимое файла целиком:

```js
'use strict';
// Покадровый тест: Circle.prototype.drawOnto из lib/circle.js.
// Метод навешивается на Circle из flatten-shape-geometry (поля pc и r),
// поэтому грузим сам lib/circle.js в изолированный контекст с Circle-заглушкой
// нужной формы и проверяем контракт: drawOnto вызывает ctx.drawCircle(pc.x, pc.y, r).
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadCircleLib() {
    const context = vm.createContext({});
    vm.runInContext('function Circle(pc, r) { this.pc = pc; this.r = r; }', context);
    const src = fs.readFileSync(path.join(__dirname, '..', '..', 'lib', 'circle.js'), 'utf8');
    vm.runInContext(src, context, { filename: 'lib/circle.js' });
    return context.Circle;
}

module.exports = function registerCircleDrawOntoTests(QUnit) {
    QUnit.module('Circle: drawOnto (lib/circle.js)');
    const Circle = loadCircleLib();

    QUnit.test('drawOnto определён на прототипе Circle', function(assert) {
        assert.strictEqual(typeof Circle.prototype.drawOnto, 'function', 'метод на прототипе');
    });

    QUnit.test('drawOnto вызывает ctx.drawCircle(pc.x, pc.y, r)', function(assert) {
        const calls = [];
        const ctx = { drawCircle: function(x, y, r) { calls.push([x, y, r]); } };
        new Circle({ x: 3, y: -4 }, 7).drawOnto(ctx);
        assert.deepEqual(calls, [[3, -4, 7]], 'drawCircle вызван один раз с центром и радиусом');
    });

    QUnit.test('drawOnto: дробный центр и нулевой радиус передаются как есть', function(assert) {
        const calls = [];
        const ctx = { drawCircle: function(x, y, r) { calls.push([x, y, r]); } };
        new Circle({ x: 0.5, y: 1.25 }, 0).drawOnto(ctx);
        assert.deepEqual(calls, [[0.5, 1.25, 0]], 'без округлений и проверок');
    });

    QUnit.test('drawOnto ничего не возвращает', function(assert) {
        const ctx = { drawCircle: function() {} };
        assert.strictEqual(new Circle({ x: 0, y: 0 }, 1).drawOnto(ctx), undefined, 'рисует, но не возвращает значение');
    });
};
```

---

## Что делает лоадер (`test/load-tests.js`)

1. Рекурсивно обходит `test/` и собирает все `*.js` (сортировка по пути).
2. Пропускает:
   - каталоги с именем `old/` — браузерные тесты, их собирает grunt;
   - `run-node-tests.js` и `load-tests.js` — служебные файлы;
   - `node-unit-tests*.js` — легаси, раннер подключает их явно (чтобы не задвоить).
3. Для каждого файла: `require()` → проверяет, что экспортируется функция
   регистрации → вызывает её с `QUnit`.
4. Пишет в лог `↳ тест подключён: Circle/drawOnto.js` и итоговое количество
   подключённых файлов.

Рекомендуемая раскладка — `test/<Модуль>/<метод>.js`, но технически лоадер подхватит
любой `*.js` в `test/` и подпапках, кроме перечисленных исключений.

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
npm install     # зависимости
grunt           # сборка — нужна для build/lib/chas-lib.js
npm test        # node-тесты (QUnit + jsdom); Node 22.12.0, как в CI
grunt qunit     # старые браузерные тесты из test/old/ (собираются в build/test/old/)
```

CI (`.github/workflows/ci.yml`) гоняет `grunt` + `node test/run-node-tests.js`
на Node 22.12.0; браузерный `grunt qunit` в CI не запускается.

---

## См. также

- [Файловая структура репозитория](repo_structure.md)
- [#3848](https://github.com/nickkolok/chas-ege/pull/3848) — перенос тестов в `test/`,
  покадровый лоадер, fail-fast.
