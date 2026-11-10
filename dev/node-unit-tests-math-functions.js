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

    const {
        brent, findRoots, findIntersectionPoints, findIntegerPointsInInterval,
        findPositiveAndNegativeIntervals, findPositiveIntervals, findNegativeIntervals,
        findPositiveAndNegativePoints, findPositiveIntegerPoints, findNegativeIntegerPoints,
    } = loadMathFunctions([
        'brent', 'findRoots', 'findIntersectionPoints', 'findIntegerPointsInInterval',
        'findPositiveAndNegativeIntervals', 'findPositiveIntervals', 'findNegativeIntervals',
        'findPositiveAndNegativePoints', 'findPositiveIntegerPoints', 'findNegativeIntegerPoints',
    ]);
    const {
        getRandomSubSegment, isCloseToInteger, isDistinctByTolerance, findPointsInIntervals,
        intPoints, intPointsWithTolerance,
    } = loadMathFunctions([
        'getRandomSubSegment', 'isCloseToInteger', 'isDistinctByTolerance', 'findPointsInIntervals',
        'intPoints', 'intPointsWithTolerance',
    ]);

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

    // ============================================================
    //  findRoots  (lib/math_functions.js)
    // ============================================================
    QUnit.module('Math Functions: findRoots');

    function assertRoots(assert, actual, expected, message) {
        const ok = actual.length === expected.length &&
            actual.every((root, i) => Math.abs(root - expected[i]) < EPS);
        assert.ok(ok, message + ' (получено ' + JSON.stringify(actual) + ', ожидалось ' + JSON.stringify(expected) + ')');
    }

    QUnit.test('findRoots: корни между узлами сетки', function (assert) {
        assertRoots(assert, findRoots(x => x * x - 2, -5, 5), [-Math.SQRT2, Math.SQRT2], 'x² - 2 на [-5; 5]');
        assertRoots(assert, findRoots(Math.sin, -7, 7),
            [-2 * Math.PI, -Math.PI, 0, Math.PI, 2 * Math.PI], 'sin x на [-7; 7]');
        assertRoots(assert, findRoots(x => (x - 1) * (x + 2), -5, 5), [-2, 1], '(x-1)(x+2) на [-5; 5]');
    });

    QUnit.test('findRoots: корень ровно в узле сетки не теряется', function (assert) {
        assertRoots(assert, findRoots(x => x - 2.5, -5, 10), [2.5], 'x - 2.5 на [-5; 10]');
        assertRoots(assert, findRoots(x => x - 1, 0, 3, 1), [1], 'x - 1 на [0; 3] с шагом 1');
        assertRoots(assert, findRoots(x => (x - 1) * (x - 2), 0, 3, 1), [1, 2], 'два корня в соседних узлах');
    });

    QUnit.test('findRoots: корни на концах отрезка', function (assert) {
        assertRoots(assert, findRoots(x => x * (x - 3), 0, 3, 1), [0, 3], 'x(x-3) на [0; 3]');
        assertRoots(assert, findRoots(x => x - 3, 0, 3, 0.7), [3], 'корень в maxX, шаг не делит отрезок нацело');
    });

    QUnit.test('findRoots: корни не дублируются', function (assert) {
        const roots = findRoots(Math.sin, -7, 7);
        assert.equal(roots.length, 5, 'у sin x на [-7; 7] ровно пять корней');
        assertRoots(assert, findRoots(x => x, -1, 1, 0.25), [0], 'корень в узле найден один раз');
    });

    QUnit.test('findRoots: корней нет', function (assert) {
        assert.deepEqual(findRoots(x => x * x + 1, -5, 5), [], 'x² + 1');
        assert.deepEqual(findRoots(x => x - 20, -5, 5), [], 'корень вне отрезка');
    });

    QUnit.test('findRoots: корни идут по возрастанию и без сообщений об ошибках', function (assert) {
        let roots;
        const errors = countConsoleErrors(function () {
            roots = findRoots(x => (x + 3) * (x + 0.5) * (x - 2.5) * (x - 4), -5, 5);
        });
        assertRoots(assert, roots, [-3, -0.5, 2.5, 4], 'четыре корня, часть из них в узлах сетки');
        assert.equal(errors, 0, 'console.error не вызывался');
    });

    // ============================================================
    //  findIntersectionPoints  (lib/math_functions.js)
    // ============================================================
    QUnit.module('Math Functions: findIntersectionPoints');

    QUnit.test('findIntersectionPoints: пересечения с горизонтальной прямой', function (assert) {
        assertRoots(assert, findIntersectionPoints(x => x * x, 2, -5, 5),
            [-Math.SQRT2, Math.SQRT2], 'y = x² и y = 2');
        assertRoots(assert, findIntersectionPoints(Math.sin, 0.5, 0, 7),
            [Math.PI / 6, 5 * Math.PI / 6, 13 * Math.PI / 6], 'y = sin x и y = 0,5 на [0; 7]');
        assertRoots(assert, findIntersectionPoints(x => 2 * x + 1, -3, -5, 5), [-2], 'y = 2x + 1 и y = -3');
    });

    QUnit.test('findIntersectionPoints: пересечение в узле сетки не теряется и не дублируется', function (assert) {
        let points;
        const errors = countConsoleErrors(function () {
            points = findIntersectionPoints(x => x * x, 4, 0, 4, 1);
        });
        assertRoots(assert, points, [2], 'y = x² и y = 4 на [0; 4] с шагом 1');
        assert.equal(errors, 0, 'console.error не вызывался');
        assertRoots(assert, findIntersectionPoints(x => x, 4, 0, 4, 1), [4], 'пересечение в maxX');
    });

    QUnit.test('findIntersectionPoints: пересечений нет', function (assert) {
        assert.deepEqual(findIntersectionPoints(x => x * x, -1, -5, 5), [], 'y = x² и y = -1');
    });

    QUnit.test('findIntersectionPoints: при нулевой константе совпадает с findRoots', function (assert) {
        const func = x => (x + 3) * (x - 0.37) * (x - 4);
        assert.deepEqual(findIntersectionPoints(func, 0, -5, 5), findRoots(func, -5, 5), 'те же точки');
    });

    // ============================================================
    //  findIntegerPointsInInterval  (lib/math_functions.js)
    // ============================================================
    QUnit.module('Math Functions: findIntegerPointsInInterval');

    // Строгий вариант: концы интервала не входят в ответ
    const strictPoints = (interval, minX, maxX, includeMinX, includeMaxX) =>
        findIntegerPointsInInterval(interval, minX, maxX, includeMinX, includeMaxX, undefined, true);

    QUnit.test('findIntegerPointsInInterval: нецелые концы интервала', function (assert) {
        assert.deepEqual(findIntegerPointsInInterval([-2.5, 3.5], -10, 10), [-2, -1, 0, 1, 2, 3], '[-2,5; 3,5]');
        assert.deepEqual(findIntegerPointsInInterval([0.2, 0.8], -10, 10), [], 'целых точек нет');
        assert.deepEqual(findIntegerPointsInInterval([1.5, 2.5], -10, 10), [2], 'одна точка');
        assert.deepEqual(strictPoints([-2.5, 3.5], -10, 10), [-2, -1, 0, 1, 2, 3], 'строгий вариант даёт то же');
    });

    QUnit.test('findIntegerPointsInInterval: целые концы интервала входят в ответ', function (assert) {
        // Промежутки монотонности записывают вместе с точками экстремума
        assert.deepEqual(findIntegerPointsInInterval([1, 5], -10, 10), [1, 2, 3, 4, 5], '[1; 5]');
        assert.deepEqual(findIntegerPointsInInterval([-2, 1], -5, 5), [-2, -1, 0, 1], '[-2; 1]');
        assert.deepEqual(findIntegerPointsInInterval([3, 4], -10, 10), [3, 4], 'только концы');
        assert.deepEqual(findIntegerPointsInInterval([2, 2], -10, 10), [2], 'вырожденный интервал');
    });

    QUnit.test('findIntegerPointsInInterval: соседние промежутки монотонности делят точку экстремума', function (assert) {
        // Возрастает на [-3,5; 2], убывает на [2; 4,5]: точка 2 входит в оба промежутка
        assert.deepEqual(findIntegerPointsInInterval([-3.5, 2], -5, 6), [-3, -2, -1, 0, 1, 2], 'возрастание');
        assert.deepEqual(findIntegerPointsInInterval([2, 4.5], -5, 6), [2, 3, 4], 'убывание');
    });

    QUnit.test('findIntegerPointsInInterval: excludeIntervalEnds исключает концы интервала', function (assert) {
        assert.deepEqual(strictPoints([1, 5], -10, 10), [2, 3, 4], '(1; 5)');
        assert.deepEqual(strictPoints([-2, 1], -5, 5), [-1, 0], '(-2; 1)');
        assert.deepEqual(strictPoints([3, 4], -10, 10), [], 'между соседними целыми точек нет');
    });

    QUnit.test('findIntegerPointsInInterval: шум в численно найденных концах', function (assert) {
        assert.deepEqual(findIntegerPointsInInterval([-2.0000000000000018, 0.9999999999999989], -5, 5), [-2, -1, 0, 1],
            'концы -2 и 1 с ошибкой округления входят');
        assert.deepEqual(strictPoints([-2.0000000000000018, 0.9999999999999989], -5, 5), [-1, 0],
            'в строгом варианте концы -2 и 1 не входят');
        assert.deepEqual(strictPoints([-8.132383655379272e-15, 3.1415926516264103], -7, 7), [1, 2, 3],
            'левый конец — нуль, найденный как -8e-15');
        assert.deepEqual(strictPoints([8.132383655379272e-15, 3.1415926516264103], -7, 7), [1, 2, 3],
            'левый конец — нуль, найденный как +8e-15');
        assert.deepEqual(findIntegerPointsInInterval([8.132383655379272e-15, 3.1415926516264103], -7, 7), [0, 1, 2, 3],
            'в нестрогом варианте нуль, найденный как +8e-15, входит');
        assert.deepEqual(strictPoints([0.5, 2.00000002], -7, 7), [1], 'правый конец 2 с ошибкой 2e-8');
        assert.deepEqual(strictPoints([0.5, 2.01], -7, 7), [1, 2], 'отличие 0,01 больше допуска: точка 2 лежит внутри');
        assert.deepEqual(findIntegerPointsInInterval([0.5, 2.01], -7, 7, false, false, 0.05, true), [1],
            'допуск можно задать явно');
        assert.deepEqual(findIntegerPointsInInterval([0.5, 1.99], -7, 7, false, false, 0.05), [1, 2],
            'с допуском 0,05 конец 1,99 считается точкой 2');
    });

    QUnit.test('findIntegerPointsInInterval: границы minX и maxX', function (assert) {
        assert.deepEqual(findIntegerPointsInInterval([-5, 5], -3, 3), [-2, -1, 0, 1, 2], 'по умолчанию minX и maxX не входят');
        assert.deepEqual(findIntegerPointsInInterval([-5, 5], -3, 3, true, false), [-3, -2, -1, 0, 1, 2], 'includeMinX');
        assert.deepEqual(findIntegerPointsInInterval([-5, 5], -3, 3, false, true), [-2, -1, 0, 1, 2, 3], 'includeMaxX');
        assert.deepEqual(findIntegerPointsInInterval([-3, 3], -3, 3, true, true), [-3, -2, -1, 0, 1, 2, 3],
            'интервал совпадает с отрезком, оба конца включены');
        assert.deepEqual(findIntegerPointsInInterval([-5, 5], -2.5, 2.5), [-2, -1, 0, 1, 2], 'нецелые minX и maxX');
    });

    QUnit.test('findIntegerPointsInInterval: конец интервала на границе области определения', function (assert) {
        // Функция определена на интервале (-5; 6) и возрастает на [4,5; 6): точка 6 не входит
        assert.deepEqual(findIntegerPointsInInterval([4.5, 6], -5, 6), [5], 'открытый конец области определения');
        assert.deepEqual(findIntegerPointsInInterval([-5, -1.5], -5, 6), [-4, -3, -2], 'то же слева');
        assert.deepEqual(findIntegerPointsInInterval([-5, 1], -5, 5, true, true), [-5, -4, -3, -2, -1, 0, 1],
            'includeMinX включает minX, правый конец 1 входит как конец интервала');
        assert.deepEqual(strictPoints([-5, 1], -5, 5, true, true), [-5, -4, -3, -2, -1, 0],
            'строгий вариант: включённый minX остаётся, внутренний конец 1 исключён');
        assert.deepEqual(strictPoints([-5, 1], -5, 5), [-4, -3, -2, -1, 0],
            'строгий вариант без includeMinX исключает оба конца');
    });

    QUnit.test('findIntegerPointsInInterval: интервал как собственные границы', function (assert) {
        // Так функцию вызывает setTaskWithGraphOfFunctionDerivative: концы
        // совпадают с minX и maxX и потому не входят в ответ
        const call = interval => findIntegerPointsInInterval(interval, interval[0], interval[1]);
        assert.deepEqual(call([-2.0000000000000018, 0.9999999999999989]), [-1, 0], 'концы с шумом');
        assert.deepEqual(call([-2, 1]), [-1, 0], 'целые концы');
        assert.deepEqual(call([-6.7, -3.2]), [-6, -5, -4], 'нецелые концы');
        assert.deepEqual(call([2, 3]), [], 'пусто');
    });

    QUnit.test('findIntegerPointsInInterval: интервал вне отрезка', function (assert) {
        assert.deepEqual(findIntegerPointsInInterval([6, 9], -5, 5), [], 'правее maxX');
        assert.deepEqual(findIntegerPointsInInterval([-9, -6], -5, 5, true, true), [], 'левее minX');
    });

    // ============================================================
    //  Интервалы знакопостоянства  (lib/math_functions.js)
    // ============================================================
    QUnit.module('Math Functions: интервалы знакопостоянства');

    function assertIntervals(assert, actual, expected, message) {
        const ok = actual.length === expected.length && actual.every((interval, i) =>
            Math.abs(interval[0] - expected[i][0]) < EPS && Math.abs(interval[1] - expected[i][1]) < EPS);
        assert.ok(ok, message + ' (получено ' + JSON.stringify(actual) + ', ожидалось ' + JSON.stringify(expected) + ')');
    }

    const parabola = x => (x - 1) * (x + 2);

    QUnit.test('findPositiveAndNegativeIntervals: парабола', function (assert) {
        const intervals = findPositiveAndNegativeIntervals(parabola, -5, 5);
        assertIntervals(assert, intervals.positiveIntervals, [[-5, -2], [1, 5]], 'положительна на (-5; -2) и (1; 5)');
        assertIntervals(assert, intervals.negativeIntervals, [[-2, 1]], 'отрицательна на (-2; 1)');
    });

    QUnit.test('findPositiveAndNegativeIntervals: функция без корней', function (assert) {
        let intervals = findPositiveAndNegativeIntervals(x => x * x + 1, -5, 5);
        assertIntervals(assert, intervals.positiveIntervals, [[-5, 5]], 'x² + 1 положительна на всём отрезке');
        assertIntervals(assert, intervals.negativeIntervals, [], 'отрицательных интервалов нет');

        intervals = findPositiveAndNegativeIntervals(x => -x * x - 1, -5, 5);
        assertIntervals(assert, intervals.positiveIntervals, [], '-x² - 1: положительных интервалов нет');
        assertIntervals(assert, intervals.negativeIntervals, [[-5, 5]], '-x² - 1 отрицательна на всём отрезке');
    });

    QUnit.test('findPositiveAndNegativeIntervals: синус', function (assert) {
        const intervals = findPositiveAndNegativeIntervals(Math.sin, -7, 7);
        const pi = Math.PI;
        assertIntervals(assert, intervals.positiveIntervals, [[-2 * pi, -pi], [0, pi], [2 * pi, 7]], 'положительные');
        assertIntervals(assert, intervals.negativeIntervals, [[-7, -2 * pi], [-pi, 0], [pi, 2 * pi]], 'отрицательные');
    });

    QUnit.test('findPositiveAndNegativeIntervals: интервалы не пересекаются и покрывают отрезок', function (assert) {
        const func = x => (x + 3) * (x + 0.5) * (x - 2.5) * (x - 4);
        const intervals = findPositiveAndNegativeIntervals(func, -5, 5);
        const all = intervals.positiveIntervals.concat(intervals.negativeIntervals).sort((a, b) => a[0] - b[0]);
        assertIntervals(assert, all, [[-5, -3], [-3, -0.5], [-0.5, 2.5], [2.5, 4], [4, 5]], 'пять кусков подряд');
        assert.equal(intervals.positiveIntervals.length, 3, 'три положительных');
        assert.equal(intervals.negativeIntervals.length, 2, 'два отрицательных');
    });

    QUnit.test('findPositiveAndNegativeIntervals: касание оси без смены знака', function (assert) {
        // Точка касания, известная как корень, разделяет интервалы
        let intervals = findPositiveAndNegativeIntervals(x => x * x, -5, 5, [0]);
        assertIntervals(assert, intervals.positiveIntervals, [[-5, 0], [0, 5]], 'x²: два интервала, нуль между ними');
        assertIntervals(assert, intervals.negativeIntervals, [], 'отрицательных интервалов нет');

        // findRoots видит касание, только если оно попало в узел сетки; иначе
        // интервал остаётся цельным, но знак всё равно определяется верно,
        // даже когда середина куска совпала с точкой касания
        intervals = findPositiveAndNegativeIntervals(x => x * x, -5, 5, []);
        assertIntervals(assert, intervals.positiveIntervals, [[-5, 5]], 'x² без известных корней: один интервал');
        assertIntervals(assert, intervals.negativeIntervals, [], 'отрицательных интервалов нет');

        intervals = findPositiveAndNegativeIntervals(x => -x * x, -5, 5, []);
        assertIntervals(assert, intervals.negativeIntervals, [[-5, 5]], '-x² без известных корней: один интервал');
    });

    QUnit.test('findPositiveAndNegativeIntervals: корни на концах отрезка', function (assert) {
        const intervals = findPositiveAndNegativeIntervals(x => x * (x - 3), 0, 3);
        assertIntervals(assert, intervals.positiveIntervals, [], 'положительных интервалов нет');
        assertIntervals(assert, intervals.negativeIntervals, [[0, 3]], 'отрицательна на (0; 3)');
    });

    QUnit.test('findPositiveAndNegativeIntervals: готовые корни четвёртым аргументом', function (assert) {
        let calls = 0;
        const counted = x => {
            calls++;
            return parabola(x);
        };
        const intervals = findPositiveAndNegativeIntervals(counted, -5, 5, [1, -2]);
        assertIntervals(assert, intervals.positiveIntervals, [[-5, -2], [1, 5]], 'корни можно передать в любом порядке');
        assertIntervals(assert, intervals.negativeIntervals, [[-2, 1]], 'отрицательный интервал');
        assert.equal(calls, 3, 'функция вычислена только в серединах трёх кусков');

        const outside = findPositiveAndNegativeIntervals(parabola, -5, 5, [-7, -2, 1, 9]);
        assertIntervals(assert, outside.positiveIntervals, [[-5, -2], [1, 5]], 'корни вне отрезка отбрасываются');
    });

    QUnit.test('findPositiveIntervals и findNegativeIntervals', function (assert) {
        assertIntervals(assert, findPositiveIntervals(parabola, -5, 5), [[-5, -2], [1, 5]], 'положительные интервалы параболы');
        assertIntervals(assert, findNegativeIntervals(parabola, -5, 5), [[-2, 1]], 'отрицательный интервал параболы');
        assertIntervals(assert, findPositiveIntervals(x => -x * x - 1, -5, 5), [], 'положительных интервалов нет');
        assertIntervals(assert, findNegativeIntervals(x => x * x + 1, -5, 5), [], 'отрицательных интервалов нет');
        assertIntervals(assert, findPositiveIntervals(Math.sin, -7, 7, 0.1),
            [[-2 * Math.PI, -Math.PI], [0, Math.PI], [2 * Math.PI, 7]], 'синус с шагом 0,1');
    });

    // ============================================================
    //  Целые точки, где функция положительна или отрицательна
    // ============================================================
    QUnit.module('Math Functions: целые точки знакопостоянства');

    QUnit.test('findPositiveAndNegativePoints', function (assert) {
        const intervals = { positiveIntervals: [[-5, -2], [1, 5]], negativeIntervals: [[-2, 1]] };
        assert.deepEqual(findPositiveAndNegativePoints(intervals, -5, 5),
            { positivePoints: [-4, -3, 2, 3, 4], negativePoints: [-1, 0] }, 'концы отрезка и корни не входят');
        assert.deepEqual(findPositiveAndNegativePoints(intervals, -5, 5, true, true),
            { positivePoints: [-5, -4, -3, 2, 3, 4, 5], negativePoints: [-1, 0] }, 'концы отрезка включены');
        assert.deepEqual(findPositiveAndNegativePoints({ positiveIntervals: [], negativeIntervals: [] }, -5, 5),
            { positivePoints: [], negativePoints: [] }, 'интервалов нет');
    });

    QUnit.test('findPositiveIntegerPoints и findNegativeIntegerPoints: парабола с целыми корнями', function (assert) {
        assert.deepEqual(findPositiveIntegerPoints(parabola, -5, 5), [-4, -3, 2, 3, 4], 'положительна');
        assert.deepEqual(findNegativeIntegerPoints(parabola, -5, 5), [-1, 0], 'отрицательна');
    });

    QUnit.test('findPositiveIntegerPoints и findNegativeIntegerPoints: синус', function (assert) {
        assert.deepEqual(findPositiveIntegerPoints(Math.sin, -7, 7), [-6, -5, -4, 1, 2, 3], 'положителен; нуль не входит');
        assert.deepEqual(findNegativeIntegerPoints(Math.sin, -7, 7), [-3, -2, -1, 4, 5, 6], 'отрицателен; нуль не входит');
    });

    QUnit.test('findPositiveIntegerPoints и findNegativeIntegerPoints: функция без корней', function (assert) {
        assert.deepEqual(findPositiveIntegerPoints(x => x * x + 1, -3, 3), [-2, -1, 0, 1, 2], 'x² + 1 положительна');
        assert.deepEqual(findNegativeIntegerPoints(x => x * x + 1, -3, 3), [], 'отрицательных точек нет');
        assert.deepEqual(findNegativeIntegerPoints(x => -x * x - 1, -3, 3), [-2, -1, 0, 1, 2], '-x² - 1 отрицательна');
        assert.deepEqual(findPositiveIntegerPoints(x => -x * x - 1, -3, 3), [], 'положительных точек нет');
    });

    QUnit.test('findPositiveIntegerPoints и findNegativeIntegerPoints: касание оси в целой точке', function (assert) {
        assert.deepEqual(findPositiveIntegerPoints(x => (x - 1) * (x - 1), -3, 3), [-2, -1, 0, 2], 'точка касания 1 не входит');
        assert.deepEqual(findNegativeIntegerPoints(x => -(x - 1) * (x - 1), -3, 3), [-2, -1, 0, 2], 'точка касания 1 не входит');
    });

    QUnit.test('findPositiveIntegerPoints и findNegativeIntegerPoints: нецелые концы отрезка', function (assert) {
        assert.deepEqual(findPositiveIntegerPoints(parabola, -4.5, 3.5), [-4, -3, 2, 3], 'положительна на (-4,5; 3,5)');
        assert.deepEqual(findNegativeIntegerPoints(parabola, -4.5, 3.5), [-1, 0], 'отрицательна на (-4,5; 3,5)');
    });

    QUnit.test('целые точки: каждая точка интервала попадает ровно в одно множество', function (assert) {
        const func = x => (x + 3.5) * (x + 0.5) * (x - 2.5) * (x - 4.25);
        const positive = findPositiveIntegerPoints(func, -5, 5);
        const negative = findNegativeIntegerPoints(func, -5, 5);
        assert.deepEqual(positive.concat(negative).sort((a, b) => a - b), [-4, -3, -2, -1, 0, 1, 2, 3, 4],
            'вместе дают все целые точки интервала (-5; 5)');
        assert.ok(positive.every(x => func(x) > 0), 'в «положительных» точках функция положительна');
        assert.ok(negative.every(x => func(x) < 0), 'в «отрицательных» точках функция отрицательна');
    });

    // ============================================================
    //  getRandomSubSegment  (lib/math_functions.js)
    // ============================================================
    QUnit.module('Math Functions: getRandomSubSegment');

    // Сводка по многим случайным отрезкам
    function sampleSubSegments(minX, maxX, stepX, count) {
        const summary = { min: Infinity, max: -Infinity, minLength: Infinity, maxLength: -Infinity, nonInteger: 0, lengths: {} };
        for (let i = 0; i < count; i++) {
            const [start, end] = getRandomSubSegment(minX, maxX, stepX);
            summary.min = Math.min(summary.min, start);
            summary.max = Math.max(summary.max, end);
            summary.minLength = Math.min(summary.minLength, end - start);
            summary.maxLength = Math.max(summary.maxLength, end - start);
            summary.lengths[end - start] = true;
            if (!Number.isInteger(start) || !Number.isInteger(end)) {
                summary.nonInteger++;
            }
        }
        return summary;
    }

    QUnit.test('getRandomSubSegment: отрезок лежит внутри заданного и не короче stepX', function (assert) {
        const cases = [[-5, 5, 4], [-5, 5, 1], [-4, 3, 3], [-10, 9, 4], [0, 20, 7]];
        for (const [minX, maxX, stepX] of cases) {
            const summary = sampleSubSegments(minX, maxX, stepX, 2000);
            const label = '[' + minX + '; ' + maxX + '], stepX = ' + stepX + ': ';
            assert.ok(summary.min >= minX && summary.max <= maxX, label + 'не выходит за границы');
            assert.ok(summary.minLength >= stepX, label + 'длина не меньше stepX');
            assert.equal(summary.nonInteger, 0, label + 'концы целые');
        }
    });

    QUnit.test('getRandomSubSegment: встречаются все допустимые длины и крайние положения', function (assert) {
        const summary = sampleSubSegments(-5, 5, 4, 5000);
        assert.deepEqual(Object.keys(summary.lengths).map(Number).sort((a, b) => a - b), [4, 5, 6, 7, 8, 9, 10],
            'длины от 4 до 10');
        assert.equal(summary.min, -5, 'отрезок может начинаться в minX');
        assert.equal(summary.max, 5, 'отрезок может заканчиваться в maxX');
    });

    QUnit.test('getRandomSubSegment: единственный возможный отрезок', function (assert) {
        assert.deepEqual(getRandomSubSegment(0, 3, 3), [0, 3], 'stepX равен длине всего отрезка');
        assert.deepEqual(getRandomSubSegment(2, 3, 1), [2, 3], 'отрезок единичной длины');
    });

    QUnit.test('getRandomSubSegment: нецелые аргументы', function (assert) {
        let summary = sampleSubSegments(-5.5, 5.5, 2, 2000);
        assert.equal(summary.nonInteger, 0, 'нецелые границы: концы всё равно целые');
        assert.ok(summary.min >= -5 && summary.max <= 5, 'нецелые границы: отрезок внутри [-5; 5]');

        summary = sampleSubSegments(-5, 5, 0.5, 2000);
        assert.equal(summary.nonInteger, 0, 'stepX = 0,5: концы целые');
        assert.ok(summary.minLength >= 1, 'stepX = 0,5: длина не меньше 1');

        summary = sampleSubSegments(-5, 5, 2.5, 2000);
        assert.ok(summary.minLength >= 3, 'stepX = 2,5: длина не меньше 3');
    });

    QUnit.test('getRandomSubSegment: вырожденный отрезок не выдаётся', function (assert) {
        const summary = sampleSubSegments(-3, 3, 0, 2000);
        assert.ok(summary.minLength >= 1, 'при stepX = 0 длина не меньше 1');
    });

    QUnit.test('getRandomSubSegment: слишком большой stepX', function (assert) {
        assert.throws(() => getRandomSubSegment(-5, 5, 12), 'отрезок длины 12 не помещается в [-5; 5]');
        assert.throws(() => getRandomSubSegment(0.2, 0.8, 1), 'между границами нет целых точек');
    });

    // ============================================================
    //  isCloseToInteger, isDistinctByTolerance  (lib/math_functions.js)
    // ============================================================
    QUnit.module('Math Functions: сравнение с допуском');

    QUnit.test('isCloseToInteger', function (assert) {
        assert.strictEqual(isCloseToInteger(3, 0), true, 'целое число при нулевом допуске');
        assert.strictEqual(isCloseToInteger(2.95, 0.1), true, '2,95 при допуске 0,1');
        assert.strictEqual(isCloseToInteger(3.05, 0.1), true, '3,05 при допуске 0,1');
        assert.strictEqual(isCloseToInteger(2.8, 0.1), false, '2,8 при допуске 0,1');
        assert.strictEqual(isCloseToInteger(-0.15, 0.2), true, 'отрицательное число рядом с нулём');
        assert.strictEqual(isCloseToInteger(-3.9, 0.2), true, '-3,9 при допуске 0,2');
        assert.strictEqual(isCloseToInteger(-3.5, 0.2), false, '-3,5 при допуске 0,2');
        assert.strictEqual(isCloseToInteger(2.5, 0.5), true, 'граница допуска входит');
        assert.strictEqual(isCloseToInteger(2.5, 0.49), false, 'чуть меньше границы');
        assert.strictEqual(isCloseToInteger(NaN, 1), false, 'NaN');
    });

    QUnit.test('isDistinctByTolerance', function (assert) {
        assert.strictEqual(isDistinctByTolerance([1, 2.5, 4], 1), true, 'все значения далеко друг от друга');
        assert.strictEqual(isDistinctByTolerance([1, 1.5, 4], 1), false, 'два значения ближе допуска');
        assert.strictEqual(isDistinctByTolerance([4, 1, 1.5], 1), false, 'близкие значения стоят не рядом в массиве');
        assert.strictEqual(isDistinctByTolerance([1, 2, 3], 1), true, 'разность, равная допуску, считается достаточной');
        assert.strictEqual(isDistinctByTolerance([2, 2], 0.1), false, 'одинаковые значения');
        assert.strictEqual(isDistinctByTolerance([-1, 1], 1.5), true, 'числа разных знаков');
        assert.strictEqual(isDistinctByTolerance([5], 1), true, 'одно значение');
        assert.strictEqual(isDistinctByTolerance([], 1), true, 'пустой массив');
    });

    // ============================================================
    //  findPointsInIntervals  (lib/math_functions.js)
    // ============================================================
    QUnit.module('Math Functions: findPointsInIntervals');

    QUnit.test('findPointsInIntervals', function (assert) {
        const points = [-3, -1.5, 0, 2, 2.5, 4];
        assert.deepEqual(findPointsInIntervals(points, [-2, 3]), [-1.5, 0, 2, 2.5], 'точки внутри интервала');
        assert.deepEqual(findPointsInIntervals(points, [-3, 4]), [-1.5, 0, 2, 2.5], 'по умолчанию концы не входят');
        assert.deepEqual(findPointsInIntervals(points, [-3, 4], true, false), [-3, -1.5, 0, 2, 2.5], 'левый конец включён');
        assert.deepEqual(findPointsInIntervals(points, [-3, 4], false, true), [-1.5, 0, 2, 2.5, 4], 'правый конец включён');
        assert.deepEqual(findPointsInIntervals(points, [-3, 4], true, true), points, 'оба конца включены');
        assert.deepEqual(findPointsInIntervals(points, [5, 9]), [], 'в интервале нет точек');
        assert.deepEqual(findPointsInIntervals([], [-3, 4]), [], 'пустой список точек');
        assert.deepEqual(findPointsInIntervals([4, -1.5, 2], [-2, 3]), [-1.5, 2], 'порядок точек сохраняется');
    });

    // ============================================================
    //  intPoints, intPointsWithTolerance  (lib/math_functions.js)
    // ============================================================
    QUnit.module('Math Functions: intPoints');

    const halfSquare = x => x * x / 2;

    // Значения ниже сверены с intPoints из lib/func.js: функция должна
    // остаться для существующих шаблонов такой же
    QUnit.test('intPoints: точки графика с целыми координатами', function (assert) {
        assert.deepEqual(intPoints(halfSquare, { minX: -3, maxX: 3, minY: -5, maxY: 5 }),
            [[-2, 2], [0, 0], [2, 2]], 'x²/2 на [-3; 3)');
        assert.deepEqual(intPoints(x => 2 * x + 1, { minX: -2, maxX: 2, minY: -10, maxY: 10 }),
            [[-2, -3], [-1, -1], [0, 1], [1, 3]], 'правая граница maxX не входит');
        assert.deepEqual(intPoints(x => 2 * x + 0.5, { minX: -3, maxX: 3, minY: -10, maxY: 10 }), [], 'целых значений нет');
    });

    QUnit.test('intPoints: ограничения по y', function (assert) {
        assert.deepEqual(intPoints(halfSquare, { minX: -5, maxX: 5, minY: 0, maxY: 2 }),
            [[-2, 2], [0, 0], [2, 2]], 'точки выше maxY отброшены');
        assert.deepEqual(intPoints(halfSquare, { minX: -5, maxX: 5, minY: 1, maxY: 8 }),
            [[-4, 8], [-2, 2], [2, 2], [4, 8]], 'границы minY и maxY входят');
        assert.deepEqual(intPoints(halfSquare, { minX: -3, maxX: 3 }), [], 'без minY и maxY точек нет');
    });

    QUnit.test('intPoints: нецелые границы и шаг', function (assert) {
        const options = { minX: -3.5, maxX: 4.5, minY: 0, maxY: 5 };
        assert.deepEqual(intPoints(halfSquare, options), [[-2, 2], [0, 0], [2, 2]], 'границы округляются внутрь');
        assert.deepEqual(options, { minX: -3, maxX: 4, minY: 0, maxY: 5, step: 1 }, 'объект параметров при этом изменяется');
        assert.deepEqual(intPoints(x => 2 * x, { minX: -1, maxX: 1.5, minY: -5, maxY: 5, step: 0.5 }),
            [[-1, -2], [-0.5, -1], [0, 0], [0.5, 1], [1, 2]], 'с явным шагом абсциссы могут быть нецелыми');
    });

    QUnit.test('intPoints: значения, не являющиеся числами', function (assert) {
        assert.deepEqual(intPoints(x => 1 / x, { minX: -2, maxX: 3, minY: -5, maxY: 5 }),
            [[-1, -1], [1, 1]], '1/x: точка x = 0 пропущена');
        assert.deepEqual(intPoints(Math.sqrt, { minX: -4, maxX: 10, minY: -5, maxY: 5 }),
            [[0, 0], [1, 1], [4, 2], [9, 3]], '√x: отрицательные x пропущены');
    });

    QUnit.test('intPoints: функция вычисляется один раз на точку', function (assert) {
        let calls = 0;
        intPoints(x => {
            calls++;
            return x;
        }, { minX: 0, maxX: 5, minY: -5, maxY: 5 });
        assert.equal(calls, 5, 'пять точек — пять вызовов');
    });

    QUnit.test('intPointsWithTolerance', function (assert) {
        const shifted = x => x * x / 2 + 0.05;
        assert.deepEqual(intPointsWithTolerance(shifted, { minX: -3, maxX: 3, minY: 0, maxY: 5, tolerance: 0.1 }),
            [[-2, 2.05], [0, 0.05], [2, 2.05]], 'значения возвращаются без округления');
        assert.deepEqual(intPointsWithTolerance(shifted, { minX: -3, maxX: 3, minY: 0, maxY: 5, tolerance: 0.01 }),
            [], 'при меньшем допуске точек нет');
        assert.deepEqual(intPointsWithTolerance(x => x, { minX: -1, maxX: 2, minY: -5, maxY: 5, tolerance: 0.1 }),
            [[-1, -1], [0, 0], [1, 1], [2, 2]], 'в отличие от intPoints, правая граница maxX входит');
        assert.deepEqual(intPointsWithTolerance(shifted, { minX: -4.5, maxX: 4.5, minY: 1, maxY: 3, tolerance: 0.1 }),
            [[-2, 2.05], [2, 2.05]], 'нецелые границы и ограничения по y');
    });
};
