'use strict';

/**
 * Юнит-тесты для lib/math_functions.js (Node.js / QUnit)
 * Подключаются через require() в run-node-tests.js
 *
 * Пока lib/math_functions.js не подключён в lib/load-chas-lib.js, его функций
 * нет в build/lib/chas-lib.js, поэтому файл читается прямо из исходников.
 * Он выполняется внутри отдельной функции, чтобы его объявления (в том числе
 * ещё не проверенные intPoints и findExtremumsOfFunction) не подменяли
 * одноимённые глобальные функции из lib/func.js.
 */

const fs = require('fs');
const path = require('path');

function loadMathFunctions(names) {
    const source = fs.readFileSync(path.join(__dirname, '..', 'lib', 'math_functions.js'), 'utf8');
    return new Function(source + '\nreturn {' + names.join(', ') + '};')();
}

// Эталон: корень методом деления пополам
function bisection(func, a, b) {
    let fa = func(a);
    for (let i = 0; i < 200; i++) {
        const m = (a + b) / 2;
        const fm = func(m);
        if (fm === 0) {
            return m;
        }
        if (fa * fm < 0) {
            b = m;
        } else {
            a = m;
            fa = fm;
        }
    }
    return (a + b) / 2;
}

// console.error на время вызова заглушается и подсчитывается
function countConsoleErrors(callback) {
    const original = console.error;
    let count = 0;
    console.error = function () {
        count++;
    };
    try {
        callback();
    } finally {
        console.error = original;
    }
    return count;
}

module.exports = function registerMathFunctionsTests(QUnit) {

    const { brent } = loadMathFunctions(['brent']);

    const EPS = 1e-6;

    function assertClose(assert, actual, expected, message) {
        assert.ok(Math.abs(actual - expected) < EPS, message + ' (получено ' + actual + ', ожидалось ' + expected + ')');
    }

    // ============================================================
    //  brent  (lib/math_functions.js)
    // ============================================================
    QUnit.module('Math Functions: brent');

    QUnit.test('brent: простые корни', function (assert) {
        assertClose(assert, brent(x => x - 2.5, 0, 10), 2.5, 'x - 2.5 на [0; 10]');
        assertClose(assert, brent(x => x * x - 2, 0, 2), Math.SQRT2, 'x² - 2 на [0; 2]');
        assertClose(assert, brent(x => x * x * x - x - 2, 1, 2), 1.5213797068, 'x³ - x - 2 на [1; 2]');
        assertClose(assert, brent(Math.cos, 0, 3), Math.PI / 2, 'cos x на [0; 3]');
        assertClose(assert, brent(x => Math.exp(x) - 3, 0, 5), Math.log(3), 'eˣ - 3 на [0; 5]');
    });

    QUnit.test('brent: корень не подменяется концом отрезка', function (assert) {
        assertClose(assert, brent(Math.sin, -7, -5.5), -2 * Math.PI, 'sin x на [-7; -5,5]');
        assertClose(assert, brent(Math.sin, 2.5, 4), Math.PI, 'sin x на [2,5; 4]');
        assertClose(assert, brent(x => Math.pow(x - 1, 3) + 0.3 * (x - 1), -5, 5), 1, '(x-1)³ + 0,3(x-1) на [-5; 5]');
    });

    QUnit.test('brent: порядок концов отрезка не важен', function (assert) {
        assertClose(assert, brent(x => x - 2.5, 10, 0), 2.5, 'x - 2.5 на [10; 0]');
        assertClose(assert, brent(x => 2.5 - x, 0, 10), 2.5, 'убывающая функция');
    });

    QUnit.test('brent: сверка с делением пополам', function (assert) {
        let checked = 0;
        let wrong = [];
        for (let i = 0; i < 70; i++) {
            const root = -3 + i * 0.083;
            const funcs = [
                x => Math.pow(x - root, 3) + 0.3 * (x - root),
                x => Math.atan(4 * (x - root)),
                x => Math.exp(x - root) - 1,
            ];
            for (let k = 0; k < funcs.length; k++) {
                const expected = bisection(funcs[k], -5, 5);
                const actual = brent(funcs[k], -5, 5);
                checked++;
                if (!(Math.abs(actual - expected) < EPS)) {
                    wrong.push('функция ' + k + ', корень ' + root + ': получено ' + actual);
                }
            }
        }
        assert.equal(checked, 210, 'проверено 210 случаев');
        assert.deepEqual(wrong, [], 'расхождений с делением пополам нет');
    });

    QUnit.test('brent: заданная точность соблюдается', function (assert) {
        const root = brent(x => x * x - 2, 0, 2, 1e-12);
        assert.ok(Math.abs(root - Math.SQRT2) < 1e-10, 'точность 1e-12 даёт ошибку меньше 1e-10 (получено ' + root + ')');
    });

    QUnit.test('brent: на концах нужны значения разных знаков', function (assert) {
        assert.throws(() => brent(x => x * x + 1, -1, 1), 'нет корня: исключение');
        assert.throws(() => brent(x => x - 2, 3, 5), 'корень вне отрезка: исключение');
        assert.throws(() => brent(x => x - 2, 2, 5), 'нуль ровно на конце отрезка: исключение');
    });

    QUnit.test('brent: превышение числа итераций', function (assert) {
        assert.throws(() => brent(x => x * x * x - 2, 0, 1000, 1e-12, 2), 'двух итераций не хватает: исключение');
    });
};
