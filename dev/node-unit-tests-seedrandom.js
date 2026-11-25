'use strict';

/**
 * seedrandom должен попадать в бандл chas-uijs.js сам: lib/load-chas-lib.js
 * берёт его через choosePath из node_modules (как остальные npm-библиотеки),
 * а не из ext/seedrandom.min.js, которого в dev-репозитории нет.
 *
 * Проверяем, что Math.seedrandom навешивается бандлом БЕЗ отдельной загрузки
 * seedrandom.min.js и что повторная установка сида даёт воспроизводимый
 * Math.random(). Подключается через require() в dev/run-node-tests.js.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM, VirtualConsole } = require('jsdom');

const projectRoot = path.join(__dirname, '..');

// Окно с заглушками — как в отладочных node-тестах: грузим только бандл.
// extraCode дописывается в тот же скрипт, что и бандл, и наследует его строгость.
function createWindowWithBundle(extraCode) {
    const dom = new JSDOM('<!DOCTYPE html><html><body>' +
        '<div id="document-write"></div><div id="legacyMenuKeeper"></div><div id="legacySliderKeeper"></div>' +
        '<div id="readiness-message"></div><div id="typesettable-wrap"><div id="question" class="question"></div>' +
        '<div id="resh" class="question"></div><div id="answer"></div><div id="wrongAnswer"></div></div>' +
        '<div id="wrap"><div id="panel"><input id="answer-input"></div></div><div id="scripts"></div></body></html>', {
        url: 'http://localhost/dist/sh/otladka.html',
        runScripts: 'dangerously',
        pretendToBeVisual: true,
        virtualConsole: new VirtualConsole(),
    });
    const window = dom.window;
    const context = dom.getInternalVMContext();
    const run = (code, filename) => vm.runInContext(code, context, { filename: filename });

    run(`
        window.chas = {
            maintainer: 'node-tests',
            mode: { svinta: true, root: '../', extPath: '../ext/', forceminjs: false },
            design: { menuKeeperId: 'legacyMenuKeeper', sliderKeeperId: 'legacySliderKeeper' },
            version: '0',
        };
        window.MathJax = {
            isReady: true,
            Hub: { Typeset() {}, Queue() {}, Config() {}, Register: { StartupHook() {}, MessageHook() {} } },
            Ajax: { loadComplete() {}, Require() {} },
        };
        window.alert = function () {};
        window.CanvasRenderingContext2D = function () {};
        window.CanvasRenderingContext2D.prototype = {};
        if (!window.ImageData) { window.ImageData = function () {}; }
    `, '<stubs>');

    // Грузим ТОЛЬКО бандл: seedrandom должен прийти из него, без отдельной загрузки.
    run(fs.readFileSync(path.join(projectRoot, 'build', 'lib', 'chas-uijs.js'), 'utf8') + (extraCode || ''), 'chas-uijs.js');
    return window;
}

module.exports = function registerSeedrandomTests(QUnit) {
    QUnit.module('seedrandom в бандле');

    QUnit.test('Math.seedrandom навешивается бандлом и детерминирован', function (assert) {
        const window = createWindowWithBundle();

        assert.strictEqual(typeof window.Math.seedrandom, 'function',
            'Math.seedrandom должен присутствовать в chas-uijs.js (без отдельной загрузки seedrandom.min.js)');

        // 4 раза ставим один и тот же сид — первый Math.random() обязан совпадать.
        const first = [];
        for (let i = 0; i < 4; i++) {
            window.Math.seedrandom('chas-ege-determinism');
            first.push(window.Math.random());
        }
        assert.ok(first.every(v => v === first[0]),
            'после повторной установки сида Math.random() одинаков: ' + first.join(', '));

        // И вся последовательность воспроизводима после повторного сида.
        window.Math.seedrandom('chas-ege-determinism');
        const seqA = [window.Math.random(), window.Math.random(), window.Math.random()];
        window.Math.seedrandom('chas-ege-determinism');
        const seqB = [window.Math.random(), window.Math.random(), window.Math.random()];
        assert.deepEqual(seqA, seqB, 'последовательность Math.random() после повторного сида совпадает');
    });

    QUnit.test('бандл строгий: use strict действует на весь склеенный файл', function (assert) {
        // seedrandom.min.js идёт первым в chas-lib.js и не содержит 'use strict';
        // без баннера concat весь бандл нестриктовый: директивы 'use strict'
        // из середины склеенного файла не действуют. Функция, определённая
        // в том же скрипте, наследует строгость бандла: в строгом коде
        // this без получателя — undefined, а не window.
        const window = createWindowWithBundle(
            '\n;window.__bundleStrict = (function () { return this === undefined; }).call(undefined);\n'
        );
        assert.strictEqual(window.__bundleStrict, true,
            'код, дописанный в конец бандла, выполняется в строгом режиме');
    });

    QUnit.test('this в Number.prototype — примитив: (0).texsqrtfrac(4) === "0"', function (assert) {
        // В нестриктовом бандле this у (0).texsqrtfrac(4) — объект Number:
        // проверка this === 0 не срабатывает, ранний возврат '0' пропускается,
        // и наружу уходит \frac{0}{…} вместо '0'.
        const window = createWindowWithBundle();
        assert.strictEqual(window.eval('(0).texsqrtfrac(4)'), '0',
            '(0).texsqrtfrac(4) возвращает "0": this — примитив 0, а не Number-объект');
    });
};
