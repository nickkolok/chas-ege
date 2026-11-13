'use strict';

/**
 * Тесты для NAtask.setCorrespondenceTask (src/chas2/task.js)
 * Подключаются через require() в run-node-tests.js
 *
 * Функция опирается на всю сборку (NAtask.setTask, проверки задания), поэтому
 * здесь поднимается отдельное окно jsdom и в него загружается
 * build/lib/chas-uijs.js — так же, как это делает dev/run-node-template.js.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM, VirtualConsole } = require('jsdom');

const projectRoot = path.join(__dirname, '..');

function createTaskWindow() {
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
    run(fs.readFileSync(path.join(projectRoot, 'build', 'lib', 'chas-uijs.js'), 'utf8'), 'chas-uijs.js');
    window.dvig.dgn = 0;
    return { window, run };
}

module.exports = function registerTaskCorrespondenceTests(QUnit) {

    let environment = null;

    // Вызывает setCorrespondenceTask с заданными настройками и возвращает получившееся задание
    function makeTask(extraSettings) {
        if (!environment) {
            environment = createTaskWindow();
        }
        const { window, run } = environment;
        const settings = Object.assign({
            left: [
                { expr: 'x^2', solution: 'парабола' },
                { expr: '\\frac{1}{x}', solution: 'гипербола' },
                { expr: '2x+1', solution: 'прямая' },
            ],
            right: ['парабола', 'гипербола', 'прямая'],
            text: 'Установите соответствие между функциями и их графиками.',
            leftHeader: 'ФУНКЦИИ',
            rightHeader: 'ГРАФИКИ',
            postText: 'В ответе запишите цифры в порядке А, Б, В.',
            autoLaTeXLeft: true,
        }, extraSettings);
        window.vopr.podg();
        // Настройки создаются внутри окна: функция пользуется методами,
        // добавленными в Array.prototype этого окна
        run('window.__settings = ' + JSON.stringify(settings) + ';', '<settings>');
        run('NAtask.setCorrespondenceTask(window.__settings);', '<call>');
        return {
            text: String(window.vopr.txt),
            analys: window.vopr.rsh,
            answers: Array.prototype.slice.call(window.vopr.ver),
        };
    }

    QUnit.module('Task: setCorrespondenceTask');

    QUnit.test('setCorrespondenceTask: разбор задания передаётся в задачу', function (assert) {
        const task = makeTask({ analys: 'График квадратичной функции — парабола.' });
        assert.strictEqual(task.analys, 'График квадратичной функции — парабола.', 'текст разбора сохранён');
    });

    QUnit.test('setCorrespondenceTask: без параметра analys разбор пустой', function (assert) {
        assert.strictEqual(makeTask({}).analys, '', 'пустая строка');
        assert.strictEqual(makeTask({ analys: '' }).analys, '', 'пустая строка при пустом параметре');
    });

    QUnit.test('setCorrespondenceTask: условие и ответ', function (assert) {
        const task = makeTask({ analys: 'Разбор.' });
        assert.ok(task.text.includes('Установите соответствие между функциями и их графиками.'), 'текст задания на месте');
        assert.ok(task.text.includes('ФУНКЦИИ') && task.text.includes('ГРАФИКИ'), 'заголовки столбцов на месте');
        assert.ok(!task.text.includes('Разбор.'), 'разбор не попадает в условие');
        assert.equal(task.answers.length, 1, 'ответ один');
        assert.deepEqual(String(task.answers[0]).split('').sort(), ['1', '2', '3'], 'ответ — перестановка цифр 1, 2, 3');

        // Ответ согласован с условием: буква в левом столбце указывает на номер нужной строки правого
        const leftItems = task.text.match(/[A-C]\) \$?[^<]*/g) || [];
        assert.equal(leftItems.length, 3, 'в левом столбце три строки');
        const solutions = { 'x^2': 'парабола', '\\frac{1}{x}': 'гипербола', '2x+1': 'прямая' };
        const consistent = leftItems.every(function (item, index) {
            const expr = item.replace(/^[A-C]\) /, '').replace(/\$/g, '');
            const number = String(task.answers[0])[index];
            return task.text.includes(number + ') ' + solutions[expr] + '<br>');
        });
        assert.ok(consistent, 'каждой функции сопоставлен свой график');
    });
};
