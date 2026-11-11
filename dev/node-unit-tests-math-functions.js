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
    const {
        findExtremumsOfFunction, findAllExtremumsOfFunctionSort, findIntExtremumsOfFunction,
        extremumsX, extremumsY, findMinimums, findMaximums, minimumsX, maximumsX,
    } = loadMathFunctions([
        'findExtremumsOfFunction', 'findAllExtremumsOfFunctionSort', 'findIntExtremumsOfFunction',
        'extremumsX', 'extremumsY', 'findMinimums', 'findMaximums', 'minimumsX', 'maximumsX',
    ]);
    const { transformExtremumsToIntervals } = loadMathFunctions(['transformExtremumsToIntervals']);
    const {
        findIntervalsOfIncreaseAndDecrease, findIncreasingIntervals, findDecreasingIntervals,
        findIncreasingAndDecreasingPoints, findIncreasingIntegerPoints, findDecreasingIntegerPoints,
    } = loadMathFunctions([
        'findIntervalsOfIncreaseAndDecrease', 'findIncreasingIntervals', 'findDecreasingIntervals',
        'findIncreasingAndDecreasingPoints', 'findIncreasingIntegerPoints', 'findDecreasingIntegerPoints',
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

    // ============================================================
    //  findExtremumsOfFunction  (lib/math_functions.js)
    // ============================================================
    QUnit.module('Math Functions: findExtremumsOfFunction');

    // Сравнение списков точек [x, y] с точностью EPS
    function assertPoints(assert, actual, expected, message) {
        const ok = actual.length === expected.length && actual.every((point, i) =>
            Math.abs(point[0] - expected[i][0]) < EPS && Math.abs(point[1] - expected[i][1]) < EPS);
        assert.ok(ok, message + ' (получено ' + JSON.stringify(actual) + ', ожидалось ' + JSON.stringify(expected) + ')');
    }

    const cubic = x => x * x * x - 3 * x; // максимум в (-1; 2), минимум в (1; -2)

    QUnit.test('findExtremumsOfFunction: парабола и кубическая функция', function (assert) {
        let extremums = findExtremumsOfFunction(x => (x - 1) * (x - 1) - 4, -5, 5);
        assertPoints(assert, extremums.minP, [[1, -4]], '(x-1)² - 4: минимум в (1; -4)');
        assertPoints(assert, extremums.maxP, [], '(x-1)² - 4: максимумов нет');

        extremums = findExtremumsOfFunction(cubic, -3, 3);
        assertPoints(assert, extremums.maxP, [[-1, 2]], 'x³ - 3x: максимум в (-1; 2)');
        assertPoints(assert, extremums.minP, [[1, -2]], 'x³ - 3x: минимум в (1; -2)');
    });

    QUnit.test('findExtremumsOfFunction: тригонометрические функции', function (assert) {
        const pi = Math.PI;
        let extremums = findExtremumsOfFunction(Math.cos, -7, 7);
        assertPoints(assert, extremums.maxP, [[-2 * pi, 1], [0, 1], [2 * pi, 1]], 'cos x: максимумы');
        assertPoints(assert, extremums.minP, [[-pi, -1], [pi, -1]], 'cos x: минимумы');

        extremums = findExtremumsOfFunction(Math.sin, 0, 7);
        assertPoints(assert, extremums.maxP, [[pi / 2, 1]], 'sin x: максимум');
        assertPoints(assert, extremums.minP, [[3 * pi / 2, -1]], 'sin x: минимум');
    });

    QUnit.test('findExtremumsOfFunction: абсцисса известна точнее шага сетки', function (assert) {
        const extremums = findExtremumsOfFunction(x => -(x - Math.SQRT2) * (x - Math.SQRT2), -5, 5, 0.1);
        assert.ok(Math.abs(extremums.maxP[0][0] - Math.SQRT2) < 1e-6,
            'при шаге 0,1 максимум найден с ошибкой меньше 1e-6 (получено ' + extremums.maxP[0][0] + ')');
        const integerExtremum = findExtremumsOfFunction(x => (x - 2) * (x - 2), -5.0004, 5).minP[0][0];
        assert.ok(Math.abs(integerExtremum - 2) < 1e-6,
            'целый экстремум, не попавший в узел сетки (получено ' + integerExtremum + ')');
    });

    QUnit.test('findExtremumsOfFunction: функция без экстремумов', function (assert) {
        assert.deepEqual(findExtremumsOfFunction(x => 2 * x + 1, -5, 5), { minP: [], maxP: [] }, 'линейная');
        assert.deepEqual(findExtremumsOfFunction(x => x * x * x, -5, 5), { minP: [], maxP: [] }, 'x³: перегиб не экстремум');
        assert.deepEqual(findExtremumsOfFunction(() => 3, -5, 5), { minP: [], maxP: [] }, 'постоянная');
    });

    QUnit.test('findExtremumsOfFunction: экстремум, симметричный относительно узлов сетки', function (assert) {
        // Узлы -0,5 и 0,5 дают одинаковые значения: вершина между ними не должна потеряться
        const extremums = findExtremumsOfFunction(x => x * x, -2.5, 2.5, 1);
        assertPoints(assert, extremums.minP, [[0, 0]], 'x² с шагом 1 на [-2,5; 2,5]');
        const plateau = findExtremumsOfFunction(x => Math.min(1, 2 - Math.abs(x)), -3, 3);
        assert.equal(plateau.maxP.length, 1, 'плоская вершина считается одним максимумом');
        assert.ok(plateau.maxP[0][0] >= -1 && plateau.maxP[0][0] <= 1 && plateau.maxP[0][1] === 1,
            'максимум лежит на плоском участке');
    });

    QUnit.test('findExtremumsOfFunction: экстремумы на концах отрезка', function (assert) {
        // x² на [-2; 3]: на концах значения 4 и 9, оба конца — граничные максимумы
        let extremums = findExtremumsOfFunction(x => x * x, -2, 3);
        assertPoints(assert, extremums.maxP, [], 'по умолчанию концы не считаются экстремумами');
        assertPoints(assert, extremums.minP, [[0, 0]], 'внутренний минимум');

        extremums = findExtremumsOfFunction(x => x * x, -2, 3, 0.001, true, false);
        assertPoints(assert, extremums.maxP, [[-2, 4], [3, 9]], 'boundaryPointIsMax: оба конца');
        assertPoints(assert, extremums.minP, [[0, 0]], 'минимумы не изменились');

        extremums = findExtremumsOfFunction(x => x * x, -2, 3, 0.001, false, true);
        assertPoints(assert, extremums.minP, [[0, 0]], 'boundaryPointIsMin: концы минимумами не являются');

        extremums = findExtremumsOfFunction(cubic, -3, 3, 0.001, true, true);
        assertPoints(assert, extremums.minP, [[-3, -18], [1, -2]], 'x³ - 3x: левый конец — минимум');
        assertPoints(assert, extremums.maxP, [[-1, 2], [3, 18]], 'x³ - 3x: правый конец — максимум');
    });

    QUnit.test('findExtremumsOfFunction: экстремум вплотную к концу отрезка', function (assert) {
        let extremums = findExtremumsOfFunction(x => (x - 4.9985) * (x - 4.9985), 0, 5);
        assertPoints(assert, extremums.minP, [[4.9985, 0]], 'минимум в полутора шагах от maxX');
        extremums = findExtremumsOfFunction(x => (x - 0.0015) * (x - 0.0015), 0, 5);
        assertPoints(assert, extremums.minP, [[0.0015, 0]], 'минимум в полутора шагах от minX');
        extremums = findExtremumsOfFunction(x => x * x, 0, 5);
        assertPoints(assert, extremums.minP, [], 'минимум ровно на конце внутренним экстремумом не считается');
    });

    QUnit.test('findExtremumsOfFunction: функция не вычисляется вне отрезка', function (assert) {
        let outside = 0;
        const extremums = findExtremumsOfFunction(x => {
            if (x < -3 || x > 3) {
                outside++;
            }
            return cubic(x);
        }, -3, 3, 0.07);
        assert.equal(outside, 0, 'все вызовы внутри [-3; 3]');
        assertPoints(assert, extremums.maxP, [[-1, 2]], 'шаг не делит отрезок нацело: максимум найден');
        assertPoints(assert, extremums.minP, [[1, -2]], 'шаг не делит отрезок нацело: минимум найден');
    });

    QUnit.test('findExtremumsOfFunction: точки, где функция не определена', function (assert) {
        const extremums = findExtremumsOfFunction(x => Math.sqrt(x) - x, -2, 4);
        assertPoints(assert, extremums.maxP, [[0.25, 0.25]], '√x - x: максимум найден, участок x < 0 пропущен');
        assertPoints(assert, extremums.minP, [], 'ложных минимумов нет');
    });

    QUnit.test('findExtremumsOfFunction: точки идут по возрастанию x', function (assert) {
        const extremums = findExtremumsOfFunction(Math.cos, -10, 10, 0.001, true, true);
        const sorted = points => points.every((point, i) => i === 0 || points[i - 1][0] < point[0]);
        assert.ok(sorted(extremums.maxP), 'максимумы упорядочены');
        assert.ok(sorted(extremums.minP), 'минимумы упорядочены');
        assert.equal(extremums.maxP.length + extremums.minP.length, 7 + 2, 'семь внутренних экстремумов и два граничных максимума');
        assert.equal(extremums.maxP[0][0], -10, 'первый максимум — левый конец');
        assert.equal(extremums.maxP[extremums.maxP.length - 1][0], 10, 'последний максимум — правый конец');
    });

    // ============================================================
    //  Обёртки над findExtremumsOfFunction  (lib/math_functions.js)
    // ============================================================
    QUnit.module('Math Functions: списки экстремумов');

    function assertNumbers(assert, actual, expected, message) {
        const ok = actual.length === expected.length && actual.every((value, i) => Math.abs(value - expected[i]) < EPS);
        assert.ok(ok, message + ' (получено ' + JSON.stringify(actual) + ', ожидалось ' + JSON.stringify(expected) + ')');
    }

    // Многочлен с экстремумами в -2 (максимум), 0,5 (минимум) и 3 (максимум):
    // его производная равна -(x + 2)(x - 0,5)(x - 3)
    const quartic = x => -(x * x * x * x / 4 - x * x * x / 2 - 11 * x * x / 4 + 3 * x);
    const quarticAt = { '-2': quartic(-2), '0.5': quartic(0.5), '3': quartic(3) };

    QUnit.test('findAllExtremumsOfFunctionSort: минимумы и максимумы вперемешку по возрастанию x', function (assert) {
        assertPoints(assert, findAllExtremumsOfFunctionSort(quartic, -4, 5),
            [[-2, quarticAt['-2']], [0.5, quarticAt['0.5']], [3, quarticAt['3']]], 'три экстремума');
        assertPoints(assert, findAllExtremumsOfFunctionSort(cubic, -3, 3, 0.001, true, true),
            [[-3, -18], [-1, 2], [1, -2], [3, 18]], 'с концами отрезка');
        assertPoints(assert, findAllExtremumsOfFunctionSort(x => x, -3, 3), [], 'экстремумов нет');
    });

    QUnit.test('extremumsX и extremumsY', function (assert) {
        assertNumbers(assert, extremumsX(quartic, -4, 5), [-2, 0.5, 3], 'абсциссы');
        assertNumbers(assert, extremumsY(quartic, -4, 5), [quarticAt['-2'], quarticAt['0.5'], quarticAt['3']], 'ординаты');
        assertNumbers(assert, extremumsX(quartic, -1, 2), [0.5], 'только экстремумы внутри отрезка');
        assertNumbers(assert, extremumsX(quartic, 0.5, 3), [], 'экстремумы на концах отрезка не считаются');
        assertNumbers(assert, extremumsX(cubic, -3, 3, 0.001, true, false), [-1, 1, 3], 'boundaryPointIsMax добавляет правый конец');
        assertNumbers(assert, extremumsY(x => x, -3, 3), [], 'экстремумов нет');
    });

    QUnit.test('findMinimums, findMaximums, minimumsX, maximumsX', function (assert) {
        assertPoints(assert, findMinimums(quartic, -4, 5), [[0.5, quarticAt['0.5']]], 'findMinimums');
        assertPoints(assert, findMaximums(quartic, -4, 5), [[-2, quarticAt['-2']], [3, quarticAt['3']]], 'findMaximums');
        assertNumbers(assert, minimumsX(quartic, -4, 5), [0.5], 'minimumsX');
        assertNumbers(assert, maximumsX(quartic, -4, 5), [-2, 3], 'maximumsX');
        assertNumbers(assert, minimumsX(Math.cos, -7, 7), [-Math.PI, Math.PI], 'minimumsX для cos x');
        assertNumbers(assert, maximumsX(Math.cos, -7, 7), [-2 * Math.PI, 0, 2 * Math.PI], 'maximumsX для cos x');
        assertNumbers(assert, maximumsX(x => x * x, -3, 3), [], 'у x² максимумов нет');
    });

    QUnit.test('minimumsX и maximumsX вместе дают extremumsX', function (assert) {
        const all = extremumsX(Math.sin, -10, 10);
        const merged = minimumsX(Math.sin, -10, 10).concat(maximumsX(Math.sin, -10, 10)).sort((a, b) => a - b);
        assert.deepEqual(merged, all, 'те же точки, в точности те же числа');
        assert.equal(all.length, 6, 'у sin x на [-10; 10] шесть экстремумов');
    });

    QUnit.test('findIntExtremumsOfFunction: экстремумы вблизи целых точек', function (assert) {
        let extremums = findIntExtremumsOfFunction(quartic, -4, 5);
        assertPoints(assert, extremums.maxP, [[-2, quarticAt['-2']], [3, quarticAt['3']]], 'целые максимумы');
        assertPoints(assert, extremums.minP, [], 'минимум в 0,5 отброшен');

        extremums = findIntExtremumsOfFunction(quartic, -4, 5, 0.5);
        assertPoints(assert, extremums.minP, [[0.5, quarticAt['0.5']]], 'при допуске 0,5 минимум в 0,5 остаётся');

        // Экстремумы в -1,9 и 1,15
        const shifted = x => -(x + 1.9) * (x + 1.9) * (x < -0.375 ? 1 : 0) + (x - 1.15) * (x - 1.15) * (x >= -0.375 ? 1 : 0);
        extremums = findIntExtremumsOfFunction(shifted, -1.5, 3, 0.2);
        assertPoints(assert, extremums.minP, [[1.15, 0]], 'отклонение 0,15 в пределах допуска 0,2');
        extremums = findIntExtremumsOfFunction(shifted, -1.5, 3, 0.1);
        assertPoints(assert, extremums.minP, [], 'отклонение 0,15 больше допуска 0,1');
    });

    // ============================================================
    //  transformExtremumsToIntervals  (lib/math_functions.js)
    // ============================================================
    QUnit.module('Math Functions: transformExtremumsToIntervals');

    // Отрезки сравниваются по концам, экстремум — с точностью EPS
    function assertExtremumIntervals(assert, actual, expected, message) {
        const ok = actual.length === expected.length && actual.every((interval, i) =>
            interval.leftEnd === expected[i][0] && Math.abs(interval.ext - expected[i][1]) < EPS &&
            interval.rightEnd === expected[i][2]);
        assert.ok(ok, message + ' (получено ' + JSON.stringify(actual) + ', ожидалось [leftEnd, ext, rightEnd]: ' +
            JSON.stringify(expected) + ')');
    }

    // Экстремумы в -4 (максимум), 0 (минимум), 3 (максимум): производная равна -(x + 4)x(x - 3)
    const threeExtremums = x => -(x * x * x * x / 4 + x * x * x / 3 - 6 * x * x);

    QUnit.test('transformExtremumsToIntervals: три экстремума', function (assert) {
        const intervals = transformExtremumsToIntervals(threeExtremums, -7, 6);
        assertExtremumIntervals(assert, intervals.intIntervalsMaximums, [[-6, -4, -1], [1, 3, 5]],
            'максимумы: отрезки от конца интервала до соседнего экстремума');
        assertExtremumIntervals(assert, intervals.intIntervalsMinimums, [[-3, 0, 2]],
            'минимум: отрезок между соседними экстремумами');
    });

    QUnit.test('transformExtremumsToIntervals: на отрезке лежит ровно один экстремум, и он даёт нужное значение', function (assert) {
        const funcs = [threeExtremums, Math.cos, x => Math.sin(1.3 * x) + 0.2 * x];
        let checked = 0;
        let wrong = [];
        for (const func of funcs) {
            const intervals = transformExtremumsToIntervals(func, -7, 7);
            const all = extremumsX(func, -7, 7);
            const check = (interval, isMinimum) => {
                checked++;
                const inside = all.filter(x => x >= interval.leftEnd && x <= interval.rightEnd);
                let best = interval.leftEnd;
                for (let x = interval.leftEnd; x <= interval.rightEnd; x += 0.001) {
                    if (isMinimum ? func(x) < func(best) : func(x) > func(best)) {
                        best = x;
                    }
                }
                if (inside.length !== 1 || Math.abs(inside[0] - interval.ext) > EPS || Math.abs(best - interval.ext) > 0.002) {
                    wrong.push(JSON.stringify(interval));
                }
            };
            intervals.intIntervalsMinimums.forEach(interval => check(interval, true));
            intervals.intIntervalsMaximums.forEach(interval => check(interval, false));
        }
        assert.ok(checked >= 8, 'проверено отрезков: ' + checked);
        assert.deepEqual(wrong, [], 'неверных отрезков нет');
    });

    QUnit.test('transformExtremumsToIntervals: единственный экстремум', function (assert) {
        const intervals = transformExtremumsToIntervals(x => (x - 1) * (x - 1), -5, 5);
        assertExtremumIntervals(assert, intervals.intIntervalsMinimums, [[-4, 1, 4]], 'отрезок от minX + 1 до maxX - 1');
        assertExtremumIntervals(assert, intervals.intIntervalsMaximums, [], 'максимумов нет');
    });

    QUnit.test('transformExtremumsToIntervals: экстремумов нет', function (assert) {
        assert.deepEqual(transformExtremumsToIntervals(x => 2 * x, -5, 5),
            { intIntervalsMinimums: [], intIntervalsMaximums: [] }, 'пустые списки');
    });

    QUnit.test('transformExtremumsToIntervals: нецелые концы интервала', function (assert) {
        const intervals = transformExtremumsToIntervals(x => (x - 1) * (x - 1), -5.5, 5.5);
        assertExtremumIntervals(assert, intervals.intIntervalsMinimums, [[-5, 1, 5]], 'концы отрезка целые');
    });

    QUnit.test('transformExtremumsToIntervals: слишком близкие экстремумы отбрасываются', function (assert) {
        // Минимум в 0 и максимум в 1: между ними нет места для отрезка с экстремумом внутри
        const close = x => x * x / 2 - x * x * x / 3;
        const intervals = transformExtremumsToIntervals(close, -5, 5);
        assertExtremumIntervals(assert, intervals.intIntervalsMinimums, [], 'минимум в 0: отрезок [-4; 0] его не содержит внутри');
        assertExtremumIntervals(assert, intervals.intIntervalsMaximums, [], 'максимум в 1: отрезок [1; 4] его не содержит внутри');
    });

    QUnit.test('transformExtremumsToIntervals: экстремум у самого конца интервала', function (assert) {
        const intervals = transformExtremumsToIntervals(x => (x + 4.5) * (x + 4.5), -5, 5);
        assertExtremumIntervals(assert, intervals.intIntervalsMinimums, [],
            'минимум в -4,5 левее наименьшей целой точки -4');
    });

    QUnit.test('transformExtremumsToIntervals: endSegmentIsNotExtremum', function (assert) {
        // Минимум в -3,6: отрезок [-4; 4] его содержит, но округлённый экстремум -4 совпадает с концом
        const func = x => (x + 3.6) * (x + 3.6);
        assertExtremumIntervals(assert, transformExtremumsToIntervals(func, -5, 5).intIntervalsMinimums,
            [[-4, -3.6, 4]], 'без флага отрезок строится');
        assertExtremumIntervals(assert, transformExtremumsToIntervals(func, -5, 5, true).intIntervalsMinimums,
            [], 'с флагом отрезок отброшен');
        assertExtremumIntervals(assert, transformExtremumsToIntervals(threeExtremums, -7, 6, true).intIntervalsMaximums,
            [[-6, -4, -1], [1, 3, 5]], 'на целые экстремумы внутри отрезка флаг не влияет');
    });

    // ============================================================
    //  Промежутки монотонности  (lib/math_functions.js)
    // ============================================================
    QUnit.module('Math Functions: промежутки монотонности');

    QUnit.test('findIntervalsOfIncreaseAndDecrease: три экстремума', function (assert) {
        const intervals = findIntervalsOfIncreaseAndDecrease(threeExtremums, -7, 6);
        assertIntervals(assert, intervals.increasingIntervals, [[-7, -4], [0, 3]], 'возрастание');
        assertIntervals(assert, intervals.decreasingIntervals, [[-4, 0], [3, 6]], 'убывание');
    });

    QUnit.test('findIntervalsOfIncreaseAndDecrease: косинус', function (assert) {
        const pi = Math.PI;
        const intervals = findIntervalsOfIncreaseAndDecrease(Math.cos, -7, 7);
        assertIntervals(assert, intervals.increasingIntervals, [[-7, -2 * pi], [-pi, 0], [pi, 2 * pi]], 'возрастание');
        assertIntervals(assert, intervals.decreasingIntervals, [[-2 * pi, -pi], [0, pi], [2 * pi, 7]], 'убывание');
    });

    QUnit.test('findIntervalsOfIncreaseAndDecrease: монотонные и постоянная функции', function (assert) {
        let intervals = findIntervalsOfIncreaseAndDecrease(x => 2 * x + 1, -5, 5);
        assertIntervals(assert, intervals.increasingIntervals, [[-5, 5]], 'возрастающая: весь отрезок');
        assertIntervals(assert, intervals.decreasingIntervals, [], 'возрастающая: убывания нет');

        intervals = findIntervalsOfIncreaseAndDecrease(x => -x * x * x, -5, 5);
        assertIntervals(assert, intervals.increasingIntervals, [], 'убывающая: возрастания нет');
        assertIntervals(assert, intervals.decreasingIntervals, [[-5, 5]], 'убывающая: весь отрезок');

        intervals = findIntervalsOfIncreaseAndDecrease(() => 3, -5, 5);
        assertIntervals(assert, intervals.increasingIntervals, [], 'постоянная: возрастания нет');
        assertIntervals(assert, intervals.decreasingIntervals, [], 'постоянная: убывания нет');
    });

    QUnit.test('findIntervalsOfIncreaseAndDecrease: промежутки идут подряд и покрывают отрезок', function (assert) {
        const func = x => Math.sin(1.3 * x) + 0.2 * x;
        const intervals = findIntervalsOfIncreaseAndDecrease(func, -7, 7);
        const all = intervals.increasingIntervals.concat(intervals.decreasingIntervals).sort((a, b) => a[0] - b[0]);
        assert.equal(all[0][0], -7, 'первый промежуток начинается в minX');
        assert.equal(all[all.length - 1][1], 7, 'последний заканчивается в maxX');
        assert.ok(all.every((interval, i) => i === 0 || all[i - 1][1] === interval[0]), 'соседние промежутки стыкуются');
        const middle = interval => (interval[0] + interval[1]) / 2;
        const slope = x => func(x + 1e-4) - func(x - 1e-4);
        assert.ok(intervals.increasingIntervals.every(interval => slope(middle(interval)) > 0), 'на промежутках возрастания функция растёт');
        assert.ok(intervals.decreasingIntervals.every(interval => slope(middle(interval)) < 0), 'на промежутках убывания функция убывает');
    });

    QUnit.test('findIncreasingIntervals и findDecreasingIntervals', function (assert) {
        assertIntervals(assert, findIncreasingIntervals(threeExtremums, -7, 6), [[-7, -4], [0, 3]], 'возрастание');
        assertIntervals(assert, findDecreasingIntervals(threeExtremums, -7, 6), [[-4, 0], [3, 6]], 'убывание');
        assertIntervals(assert, findDecreasingIntervals(x => x, -5, 5), [], 'у возрастающей функции убывания нет');
        assertIntervals(assert, findIncreasingIntervals(x => -x, -5, 5), [], 'у убывающей функции возрастания нет');
    });

    // ============================================================
    //  Целые точки промежутков монотонности
    // ============================================================
    QUnit.module('Math Functions: целые точки промежутков монотонности');

    QUnit.test('findIncreasingAndDecreasingPoints', function (assert) {
        const intervals = { increasingIntervals: [[-7, -4], [0, 3]], decreasingIntervals: [[-4, 0], [3, 6]] };
        assert.deepEqual(findIncreasingAndDecreasingPoints(intervals, -7, 6),
            { increasingPoints: [-6, -5, -4, 0, 1, 2, 3], decreasingPoints: [-4, -3, -2, -1, 0, 3, 4, 5] },
            'точки экстремума входят в оба соседних промежутка, концы интервала не входят');
        assert.deepEqual(findIncreasingAndDecreasingPoints(intervals, -7, 6, true, true),
            { increasingPoints: [-7, -6, -5, -4, 0, 1, 2, 3], decreasingPoints: [-4, -3, -2, -1, 0, 3, 4, 5, 6] },
            'includeMinX и includeMaxX добавляют концы');
        assert.deepEqual(findIncreasingAndDecreasingPoints({ increasingIntervals: [], decreasingIntervals: [] }, -7, 6),
            { increasingPoints: [], decreasingPoints: [] }, 'промежутков нет');
    });

    QUnit.test('findIncreasingIntegerPoints и findDecreasingIntegerPoints: целые экстремумы', function (assert) {
        assert.deepEqual(findIncreasingIntegerPoints(threeExtremums, -7, 6), [-6, -5, -4, 0, 1, 2, 3], 'возрастание');
        assert.deepEqual(findDecreasingIntegerPoints(threeExtremums, -7, 6), [-4, -3, -2, -1, 0, 3, 4, 5], 'убывание');
    });

    QUnit.test('findIncreasingIntegerPoints и findDecreasingIntegerPoints: нецелые экстремумы', function (assert) {
        // cos x на (-7; 7): экстремумы в 0, ±π, ±2π
        assert.deepEqual(findIncreasingIntegerPoints(Math.cos, -7, 7), [-3, -2, -1, 0, 4, 5, 6], 'возрастание');
        assert.deepEqual(findDecreasingIntegerPoints(Math.cos, -7, 7), [-6, -5, -4, 0, 1, 2, 3], 'убывание');
    });

    QUnit.test('findIncreasingIntegerPoints и findDecreasingIntegerPoints: как в задаче 697896', function (assert) {
        // Функция возрастает на [-3,5; -1,5] и на [4,5; 6), определена на (-5; 6):
        // в ответ входят точки -3, -2 и 5, их сумма равна 0
        const derivative = x => (x + 3.5) * (x + 1.5) * (x - 4.5);
        const func = x => x * x * x * x / 4 + x * x * x / 6 - 8.625 * x * x - 23.625 * x;
        assert.ok(Math.abs((func(1.001) - func(0.999)) / 0.002 - derivative(1)) < 1e-3, 'первообразная подобрана верно');
        const points = findIncreasingIntegerPoints(func, -5, 6);
        assert.deepEqual(points, [-3, -2, 5], 'целые точки промежутков возрастания');
        assert.equal(points.reduce((a, b) => a + b, 0), 0, 'сумма равна 0');
        assert.deepEqual(findDecreasingIntegerPoints(func, -5, 6), [-4, -1, 0, 1, 2, 3, 4], 'целые точки промежутков убывания');
    });

    QUnit.test('findIncreasingIntegerPoints и findDecreasingIntegerPoints: монотонная функция', function (assert) {
        assert.deepEqual(findIncreasingIntegerPoints(x => x * x * x, -3, 3), [-2, -1, 0, 1, 2], 'x³ возрастает всюду');
        assert.deepEqual(findDecreasingIntegerPoints(x => x * x * x, -3, 3), [], 'убывания нет');
    });
};
