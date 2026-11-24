'use strict';

/**
 * Дополнительные юнит-тесты для chas-ege (Node.js / QUnit)
 * Подключаются через require() в run-node-tests.js
 */

module.exports = function registerNodeTests(QUnit) {

    // ============================================================
    //  Number Math Functions  (lib/number_math.js)
    // ============================================================
    QUnit.module('Number Math Functions');

    QUnit.test('Number.prototype.pow', function (assert) {
        assert.equal((2).pow(5), 32, '2^5 = 32');
        assert.equal((0).pow(5), 0,  '0^5 = 0');
        assert.equal((1).pow(100), 1, '1^100 = 1');
        assert.equal((0.5).pow(2), 0.25, '0.5^2 = 0.25');
    });

    QUnit.test('Number.prototype.sqrt', function (assert) {
        assert.equal((9).sqrt(), 3, '√9 = 3');
        assert.equal((0).sqrt(), 0, '√0 = 0');
        assert.equal((16).sqrt(), 4, '√16 = 4');
        assert.equal((100).sqrt(), 10, '√100 = 10');
    });

    QUnit.test('Number.prototype.cbrt', function (assert) {
        assert.equal((8).cbrt(), 2, '∛8 = 2');
        assert.equal((27).cbrt(), 3, '∛27 = 3');
        assert.equal((0).cbrt(), 0, '∛0 = 0');
        assert.equal((-8).cbrt(), -2, '∛(-8) = -2');
    });

    QUnit.test('Number.prototype.sqr', function (assert) {
        assert.equal((2).sqr(), 4, '2² = 4');
        assert.equal((3).sqr(), 9, '3² = 9');
        assert.equal((0).sqr(), 0, '0² = 0');
        assert.equal((-5).sqr(), 25, '(-5)² = 25');
    });

    QUnit.test('Number.prototype.sgn / sign', function (assert) {
        assert.equal((5).sgn(), 1, 'sgn(5) = 1');
        assert.equal((-5).sgn(), -1, 'sgn(-5) = -1');
        assert.equal((0).sgn(), 0, 'sgn(0) = 0');
    });

    QUnit.test('Number.prototype.abs', function (assert) {
        assert.equal((-5).abs(), 5, '|-5| = 5');
        assert.equal((5).abs(), 5, '|5| = 5');
        assert.equal((0).abs(), 0, '|0| = 0');
    });

    QUnit.test('Number.prototype.floor', function (assert) {
        assert.equal((3.7).floor(), 3, 'floor(3.7) = 3');
        assert.equal((-3.2).floor(), -4, 'floor(-3.2) = -4');
        assert.equal((5).floor(), 5, 'floor(5) = 5');
    });

    QUnit.test('Number.prototype.ceil', function (assert) {
        assert.equal((3.2).ceil(), 4, 'ceil(3.2) = 4');
        assert.equal((-3.7).ceil(), -3, 'ceil(-3.7) = -3');
        assert.equal((5).ceil(), 5, 'ceil(5) = 5');
    });

    QUnit.test('Number.prototype.sin / cos', function (assert) {
        assert.ok(Math.abs((0).sin()) < 1e-10, 'sin(0) = 0');
        assert.ok(Math.abs((Math.PI / 2).sin() - 1) < 1e-10, 'sin(π/2) = 1');
        assert.ok(Math.abs((0).cos() - 1) < 1e-10, 'cos(0) = 1');
        assert.ok(Math.abs((Math.PI).cos() + 1) < 1e-10, 'cos(π) = -1');
    });

    QUnit.test('Number.prototype.arcctg', function (assert) {
        assert.ok(Math.abs((1).arcctg() - Math.PI / 4) < 1e-10, 'arcctg(1) = π/4');
        assert.ok(Math.abs((0).arcctg() - Math.PI / 2) < 1e-10, 'arcctg(0) = π/2');
        assert.ok(Math.abs((-1).arcctg() - 3 * Math.PI / 4) < 1e-10, 'arcctg(-1) = 3π/4');
        assert.ok((-2).arcctg() > Math.PI / 2 && (-2).arcctg() < Math.PI, 'arcctg(-2) ∈ (π/2, π)');
        assert.ok((2).arcctg() > 0 && (2).arcctg() < Math.PI / 2, 'arcctg(2) ∈ (0, π/2)');
        assert.ok(Math.abs(((-2).arcctg()).ctg() + 2) < 1e-10, 'ctg(arcctg(-2)) = -2');
    });

    // ============================================================
    //  Number Utility Functions  (lib/number.js)
    // ============================================================
    QUnit.module('Number Utility Functions');

    QUnit.test('Number.prototype.isZ (целое число)', function (assert) {
        assert.strictEqual((5).isZ(), true, '5 — целое');
        assert.strictEqual((0).isZ(), true, '0 — целое');
        assert.strictEqual((-3).isZ(), true, '-3 — целое');
        assert.strictEqual((3.5).isZ(), false, '3.5 — не целое');
    });

    QUnit.test('Number.prototype.isAlmostInteger', function (assert) {
        assert.strictEqual((5.0000001).isAlmostInteger(), true, '5.0000001 ≈ 5');
        assert.strictEqual((5.5).isAlmostInteger(), false, '5.5 ≉ целому');
        assert.strictEqual((4.9999999).isAlmostInteger(), true, '4.9999999 ≈ 5');
    });

    QUnit.test('Number.prototype.isPolnKvadr (полный квадрат)', function (assert) {
        assert.strictEqual((4).isPolnKvadr(), true, '4 = 2²');
        assert.strictEqual((9).isPolnKvadr(), true, '9 = 3²');
        assert.strictEqual((0).isPolnKvadr(), true, '0 = 0²');
        assert.strictEqual((5).isPolnKvadr(), false, '5 — не квадрат');
    });

    QUnit.test('Number.prototype.mzhd (между a и b)', function (assert) {
        assert.strictEqual((5).mzhd(1, 10), true, '5 между 1 и 10');
        assert.strictEqual((5).mzhd(5, 10,  true), true, '5 между 5 и 10 (включительно)');
        assert.strictEqual((5).mzhd(5, 10, false), false, '5 не между 5 и 10 (не включительно)');
        assert.strictEqual((5).mzhd(6, 10), false, '5 не между 6 и 10');
    });

    QUnit.test('Number.prototype.polozh (положительное или 0)', function (assert) {
        assert.equal((5).polozh(), 5, '5 → 5');
        assert.equal((-5).polozh(), 0, '-5 → 0');
        assert.equal((0).polozh(), 0, '0 → 0');
    });

    QUnit.test('Number.prototype.nod (НОД)', function (assert) {
        assert.equal((12).nod(18), 6, 'НОД(12, 18) = 6');
        assert.equal((7).nod(13), 1, 'НОД(7, 13) = 1');
        assert.equal((0).nod(5), 5, 'НОД(0, 5) = 5');
    });

    QUnit.test('Number.prototype.nok (НОК)', function (assert) {
        assert.equal((12).nok(18), 36, 'НОК(12, 18) = 36');
        assert.equal((7).nok(13), 91, 'НОК(7, 13) = 91');
        assert.equal((4).nok(6), 12, 'НОК(4, 6) = 12');
        assert.equal((5).nok(5), 5, 'НОК(5, 5) = 5');
        assert.equal((-4).nok(6), 12, 'НОК(-4, 6) = 12 (знак не важен)');
        assert.equal((0).nok(5), 0, 'НОК(0, 5) = 0');
        assert.equal((5).nok(0), 0, 'НОК(5, 0) = 0');
    });

    QUnit.test('nod и nok: несколько аргументов', function (assert) {
        assert.equal((12).nod(18, 30), 6, 'НОД(12, 18, 30) = 6');
        assert.equal((12).nod(18, 30, 7), 1, 'НОД(12, 18, 30, 7) = 1');
        assert.equal((-12).nod(18, -30), 6, 'знаки не важны');
        assert.equal((4).nok(6, 10), 60, 'НОК(4, 6, 10) = 60');
        assert.equal((2).nok(3, 4, 5), 60, 'НОК(2, 3, 4, 5) = 60');
        assert.equal((4).nok(6, 0), 0, 'ноль среди аргументов — НОК 0');
    });

    QUnit.test('Number.prototype.kratno (кратность)', function (assert) {
        assert.strictEqual((12).kratno(6), true, '12 кратно 6');
        assert.strictEqual((0).kratno(5), true, '0 кратно 5');
        assert.strictEqual((5).kratno(3), false, '5 не кратно 3');
    });

    QUnit.test('Number.prototype.delit (делитель)', function (assert) {
        assert.strictEqual((3).delit(12), true, '3 — делитель 12');
        assert.strictEqual((5).delit(12), false, '5 — не делитель 12');
        assert.strictEqual((1).delit(0), true, '1 — делитель 0');
    });

    QUnit.test('Number.prototype.isPrime (простое число)', function (assert) {
        assert.strictEqual((2).isPrime(), true, '2 — простое');
        assert.strictEqual((3).isPrime(), true, '3 — простое');
        assert.strictEqual((4).isPrime(), false, '4 — не простое');
    });

    QUnit.test('Number.prototype.fct (факториал)', function (assert) {
        assert.equal((0).fct(), 1, '0! = 1');
        assert.equal((1).fct(), 1, '1! = 1');
        assert.equal((5).fct(), 120, '5! = 120');
    });

    QUnit.test('Number.prototype.isAlmostEqual', function (assert) {
        assert.strictEqual((5).isAlmostEqual(5.00000000001,1/1024/1024), true, '5 ≈ 5.00000000001');
        assert.strictEqual((5).isAlmostEqual(5.1), false, '5 ≉ 5.1');
    });

    QUnit.test('Number.prototype.toFixedLess', function (assert) {
        assert.equal((3.14159).toFixedLess(2), '3.14', '3.14159 → 3.14');
        assert.equal((3).toFixedLess(2), '3', '3 → 3');
    });

    QUnit.test('Number.prototype.negativeBrackets', function (assert) {
        assert.equal((-5).negativeBrackets(), '(-5)', '-5 → (-5)');
        assert.equal((5).negativeBrackets(), '5', '5 → 5');
    });

    // ============================================================
    //  Array Utility Functions  (lib/array.js)
    // ============================================================
    QUnit.module('Array Utility Functions');

    QUnit.test('Array.prototype.soed (склеивание)', function (assert) {
        assert.equal(['a', 'b', 'c'].soed(), 'abc', 'soed строк');
        assert.equal([1, 2, 3].soed(), '123', 'soed чисел');
        assert.equal([].soed(), '', 'soed пустого');
    });

    QUnit.test('Array.prototype.sum', function (assert) {
        assert.equal([1, 2, 3].sum(), 6, 'sum [1,2,3] = 6');
        assert.equal([].sum(), 0, 'sum [] = 0');
        assert.equal([-1, -2, -3].sum(), -6, 'sum отрицательных');
    });

    QUnit.test('Array.prototype.production', function (assert) {
        assert.equal([1, 2, 3].production(), 6, 'production [1,2,3] = 6');
        assert.equal([].production(), 1, 'production [] = 1');
        assert.equal([1, 2, 0, 4].production(), 0, 'production с нулём = 0');
    });

    QUnit.test('Array.prototype.hasElem', function (assert) {
        assert.strictEqual([1, 2, 3].hasElem(2), true, '2 есть');
        assert.strictEqual([1, 2, 3].hasElem(5), false, '5 нет');
    });

    QUnit.test('Array.prototype.equalAr', function (assert) {
        assert.strictEqual([1, 2, 3].equalAr([1, 2, 3]), true, 'равны');
        assert.strictEqual([1, 2, 3].equalAr([1, 2, 4]), false, 'не равны');
        assert.strictEqual([1, 2, 3].equalAr([1, 2]), false, 'разная длина');
    });

    QUnit.test('Array.prototype.delEmpty', function (assert) {
        var arr = [1, '', 2, undefined, 3, ''];
        arr.delEmpty();
        assert.deepEqual(arr, [1, 2, 3], 'пустые удалены');
    });

    QUnit.test('Array.prototype.last', function (assert) {
        assert.equal([1, 2, 3].last(), 3, 'last [1,2,3] = 3');
        assert.equal(['a', 'b', 'c'].last(), 'c', 'last строк');
        assert.strictEqual([].last(), undefined, 'last [] = undefined');
    });

    QUnit.test('Array.prototype.pushIf', function (assert) {
        var arr = [1, 2];
        arr.pushIf(3, true);
        arr.pushIf(4, false);
        assert.deepEqual(arr, [1, 2, 3], 'добавлен только 3');
    });

    QUnit.test('Array.prototype.pushUnique', function (assert) {
        var arr = [1, 2, 3];
        arr.pushUnique(3, 4, 5, 2);
        assert.deepEqual(arr, [1, 2, 3, 4, 5], 'дубликаты не добавлены');
    });

    QUnit.test('Array.prototype.sortDelDubl', function (assert) {
        assert.deepEqual([3, 1, 2, 1, 3].sortDelDubl(), [1, 2, 3], 'сортировка + дедупликация');
    });

    QUnit.test('Array.prototype.min / max (индексы)', function (assert) {
        assert.equal([3, 1, 2].min(), 1, 'min индекс = 1 (значение 1)');
        assert.equal([3, 1, 2].max(), 0, 'max индекс = 0 (значение 3)');
    });

    QUnit.test('Array.prototype.minE / maxE', function (assert) {
        assert.equal([3, 1, 2].minE(), 1, 'minE = 1');
        assert.equal([3, 1, 2].maxE(), 3, 'maxE = 3');
    });

    // ============================================================
    //  Array vector functions  (lib/array.js)
    // ============================================================
    QUnit.module('Array vector functions');

    QUnit.test('Array.prototype.veclength', function (assert) {
        assert.equal([3, 4].veclength(), 5, '|[3,4]| = 5');
        assert.equal([0, 0].veclength(), 0, '|[0,0]| = 0');
        assert.equal([1, 2, 2].veclength(), 3, '|[1,2,2]| = 3 (3D)');
        assert.equal([-3, -4].veclength(), 5, '|[-3,-4]| = 5');
    });

    QUnit.test('Array.prototype.scalprod', function (assert) {
        assert.equal([1, 2].scalprod([3, 4]), 11, '(1,2)·(3,4) = 11');
        assert.equal([1, 0].scalprod([0, 1]), 0, 'ортогональные → 0');
        assert.equal([1, 2, 3].scalprod([4, 5, 6]), 32, '3D: 4+10+18 = 32');
        assert.equal([-1, 1].scalprod([-3, -3]), 0, '(-1,1)·(-3,-3) = 0');
        assert.throws(function () { [1].scalprod([3, 4]); }, 'разная размерность (первый короче) — исключение');
        assert.throws(function () { [1, 2].scalprod([3]); }, 'разная размерность (второй короче) — исключение');
    });

    QUnit.test('Array.prototype.veclengthSquared', function (assert) {
        assert.equal([3, 4].veclengthSquared(), 25, 'квадрат длины 3-4-5');
        assert.equal([0, 0].veclengthSquared(), 0, 'нулевой вектор');
        assert.equal([1, 2, 2].veclengthSquared(), 9, 'трёхмерный случай');
    });

    QUnit.test('Array.prototype.veccos', function (assert) {
        assert.equal([1, 0].veccos([0, 1]), 0, 'прямой угол');
        assert.equal([2, 0].veccos([3, 0]), 1, 'сонаправленные');
        assert.equal([2, 0].veccos([-3, 0]), -1, 'противоположные');
        assert.ok(Math.abs([1, 1].veccos([1, 0]) - Math.SQRT1_2) < 1e-10, '45 градусов');
        assert.strictEqual([6, 3].veccos([5, 10]), 0.8, '(6;3) и (5;10): ровно 0,8, без потери точности');
        assert.throws(function () { [0, 0].veccos([1, 0]); }, 'нулевой вектор — исключение');
    });

    QUnit.test('Array.prototype.vecangleInDegrees', function (assert) {
        assert.equal([1, 0].vecangleInDegrees([0, 1]), 90, 'прямой угол');
        assert.equal([2, 0].vecangleInDegrees([3, 0]), 0, 'сонаправленные');
        assert.equal([2, 0].vecangleInDegrees([-3, 0]), 180, 'противоположные');
        assert.ok(Math.abs([1, 0].vecangleInDegrees([1, 1]) - 45) < 1e-10, '45 градусов');
    });

    QUnit.test('Array.prototype.coordVect', function (assert) {
        assert.deepEqual([1, 2, 4, 6].coordVect(), [3, 4], 'конец минус начало');
        assert.deepEqual([5, 5, 5, 5].coordVect(), [0, 0], 'вырожденный → [0,0]');
        assert.deepEqual([1, 2, 3, 4, 6, 8].coordVect(), [3, 4, 5], 'в пространстве: [x1,y1,z1,x2,y2,z2]');
    });

    QUnit.test('segmentIntersectionCount: пересекающиеся отрезки', function (assert) {
        assert.equal(segmentIntersectionCount(0, 0, 2, 2, 0, 2, 2, 0), 1, 'крест-накрест');
        assert.equal(segmentIntersectionCount(0, 0, 4, 0, 2, -2, 2, 2), 1, 'вертикальный пересекает горизонтальный');
    });

    QUnit.test('segmentIntersectionCount: непересекающиеся отрезки', function (assert) {
        assert.equal(segmentIntersectionCount(0, 0, 1, 0, 0, 1, 1, 1), 0, 'параллельные');
        assert.equal(segmentIntersectionCount(0, 0, 1, 0, 2, 1, 3, 2), 0, 'прямые пересекаются вне отрезков');
    });

    // ============================================================
    //  Array General Functions  (lib/array_general.js)
    // ============================================================
    QUnit.module('Array General Functions');

    QUnit.test('Array.prototype.permuteCyclic', function (assert) {
        assert.deepEqual([1, 2, 3, 4].permuteCyclic(1), [4, 1, 2, 3], 'сдвиг на 1');
        assert.deepEqual([1, 2, 3, 4].permuteCyclic(0), [1, 2, 3, 4], 'сдвиг на 0');
    });

    QUnit.test('Array.prototype.generatePairs', function (assert) {
        assert.deepEqual([1, 2, 3].generatePairs(), [[1, 2], [1, 3], [2, 3]], 'пары из 3');
        assert.deepEqual([1].generatePairs(), [], 'пары из 1');
        assert.deepEqual([].generatePairs(), [], 'пары из 0');
    });

    // ============================================================
    //  Function Utilities  (lib/func.js)
    // ============================================================
    QUnit.module('Function Utilities');

    QUnit.test('getRandomInt', function (assert) {
        for (var i = 0; i < 50; i++) {
            var val = getRandomInt(1, 10);
            assert.ok(val >= 1 && val <= 10, 'getRandomInt(1,10) = ' + val);
        }
    });

    // ============================================================
    //  Ограничение числа знаков после запятой  (lib/func_assert.js)
    // ============================================================
    QUnit.module('genAssertDecimalPlaces');

    QUnit.test('не более N знаков после запятой', function (assert) {
        genAssertDecimalPlaces(1.25, 2);
        genAssertDecimalPlaces(0.0015, 4);
        genAssertDecimalPlaces(7, 0);
        assert.ok(true, 'подходящие числа не отбраковываются');
        assert.throws(function () {
            genAssertDecimalPlaces(1.256, 2);
        }, /не более 2 знаков/, '1.256 при двух знаках отбраковывается');
        assert.throws(function () {
            genAssertDecimalPlaces(0.0015, 3);
        }, /не более 3 знаков/, '0.0015 при трёх знаках отбраковывается');
        assert.throws(function () {
            genAssertDecimalPlaces(1.5, 0);
        }, /не более 0 знаков/, '1.5 при нуле знаков отбраковывается');
    });

    QUnit.test('ложная точность вычислений за знаки не считается', function (assert) {
        genAssertDecimalPlaces(0.9 / 100, 3); // 0.009000000000000001
        genAssertDecimalPlaces(0.1 + 0.2, 1); // 0.30000000000000004
        assert.ok(true, 'хвосты плавающей точки не мешают');
    });

    QUnit.test('своё сообщение проходит насквозь', function (assert) {
        assert.throws(function () {
            genAssertDecimalPlaces(1.234, 2, 'Удлинение имеет слишком много знаков');
        }, /Удлинение имеет слишком много знаков/, 'сообщение автора шаблона сохранено');
    });

    QUnit.test('все функции lib/func_assert.js доступны в node', function (assert) {
        [
            'retryWhileUndefined', 'retryWhileError', 'genAssert', 'genAssertNonempty',
            'genAssertDecimalPlaces', 'genAssertZ1000', 'genAssertAlmostInteger', 'genAssertIrreducible',
            'genAssertSaneDecomposition', 'genAssertGraphIntersectsPointWithNeighborhood',
        ].forEach(function (name) {
            assert.equal(typeof global[name], 'function', name + ' экспортирована в global');
        });
        assert.equal(retryWhileError(function () { return 42; }, 1), 42, 'retryWhileError вызывается');
        assert.throws(function () {
            genAssertAlmostInteger(1.5, 'Не целое');
        }, /Не целое/, 'genAssertAlmostInteger вызывается');
    });

    QUnit.test('genAssertZ1000 ведёт себя как раньше', function (assert) {
        genAssertZ1000(0.001);
        genAssertZ1000(2);
        assert.ok(true, '0.001 и 2 подходят');
        assert.throws(function () {
            genAssertZ1000(0.0001);
        }, /не более 3 знаков/, '0.0001 - четыре знака');
        assert.throws(function () {
            genAssertZ1000(1 / 3);
        }, /не более 3 знаков/, '1/3 - бесконечная дробь');
    });

    // ============================================================
    //  String Generic Functions  (src/chaslib/String_generic.js)
    // ============================================================
    QUnit.module('String Generic Functions');

    QUnit.test('String.prototype.deleteFirst', function (assert) {
        assert.equal('hello'.deleteFirst(1), 'ello', 'удалить 1 символ');
        assert.equal('hello'.deleteFirst(3), 'lo', 'удалить 3 символа');
        assert.equal(''.deleteFirst(1), '', 'из пустой строки');
    });

    QUnit.test('String.prototype.deleteLast', function (assert) {
        assert.equal('hello'.deleteLast(1), 'hell', 'удалить 1 с конца');
        assert.equal('hello'.deleteLast(3), 'he', 'удалить 3 с конца');
    });

    QUnit.test('String.prototype.insert', function (assert) {
        assert.equal('hello'.insert(1, 'X'), 'hXello', 'вставка в позицию 1');
        assert.equal('hello'.insert(0, 'X'), 'Xhello', 'вставка в начало');
        assert.equal('hello'.insert(5, 'X'), 'helloX', 'вставка в конец');
    });

    QUnit.test('String.prototype.last', function (assert) {
        assert.equal('hello'.last(), 'o', 'последний символ');
        assert.equal(''.last(), undefined, 'из пустой строки');
    });

    QUnit.test('String.prototype.multiply', function (assert) {
        assert.equal('abc'.multiply(3), 'abcabcabc', 'abc × 3');
        assert.equal('abc'.multiply(1), 'abc', 'abc × 1');
    });

    QUnit.test('String.prototype.reverse', function (assert) {
        assert.equal('hello'.reverse(), 'olleh', 'hello → olleh');
        assert.equal(''.reverse(), '', 'пустая строка');
    });

    // ============================================================
    //  String TeX Functions  (src/chaslib/String_tex.js)
    // ============================================================
    QUnit.module('String TeX Functions');

    QUnit.test('String.prototype.negativeBracketsTeX', function (assert) {
        assert.equal('-5'.negativeBracketsTeX(), '\\left(-5\\right)', '-5 → скобки');
        assert.equal('5'.negativeBracketsTeX(), '5', '5 → без скобок');
    });

    QUnit.test('String.prototype.ob$', function (assert) {
        assert.equal('x'.ob$(), '$x$', 'обёртка в $');
        assert.equal(''.ob$(), '$$', 'пустая строка');
    });

    // ============================================================
    //  Chaslib Number Functions  (src/chaslib/Number.js)
    // ============================================================
    QUnit.module('Chaslib Number Functions');

    QUnit.test('Number.prototype.isDividedBy', function (assert) {
        assert.strictEqual((12).isDividedBy(6), true, '12 делится на 6');
        assert.strictEqual((5).isDividedBy(3), false, '5 не делится на 3');
    });

    QUnit.test('Number.prototype.isDivisorOf', function (assert) {
        assert.strictEqual((3).isDivisorOf(12), true, '3 — делитель 12');
        assert.strictEqual((5).isDivisorOf(12), false, '5 — не делитель 12');
    });

    // ============================================================
    //  Complex Numbers  (lib/complex.js)
    // ============================================================
    QUnit.module('Complex Numbers');

    QUnit.test('Complex — базовые операции', function (assert) {
        if (typeof Complex === 'undefined') {
            assert.ok(true, 'Complex не определён — пропускаем');
            return;
        }
        var c1 = new Complex(1, 2);
        var c2 = new Complex(3, 4);

        var sum = c1.sum(c2);
        assert.equal(sum.re, 4, '(1+2i)+(3+4i) re = 4');
        assert.equal(sum.im, 6, '(1+2i)+(3+4i) im = 6');

        var prod = c1.umn(c2);
        assert.equal(prod.re, -5, '(1+2i)·(3+4i) re = -5');
        assert.equal(prod.im, 10, '(1+2i)·(3+4i) im = 10');

        var m = c1.minus();
        assert.equal(m.re, -1, 'противоположное re = -1');
        assert.equal(m.im, -2, 'противоположное im = -2');

        var s = c1.sopr();
        assert.equal(s.re, 1, 'сопряжённое re = 1');
        assert.equal(s.im, -2, 'сопряжённое im = -2');

        assert.equal(c1.norma(), 5, '|1+2i|² = 5');
    });

    // ============================================================
    //  Progressions  (lib/arithm_progression.js, lib/geom_progression.js)
    // ============================================================
    QUnit.module('Progressions');

    QUnit.test('ArithmeticProgression', function (assert) {
        if (typeof ArithmeticProgression === 'undefined') {
            assert.ok(true, 'ArithmeticProgression не определён — пропускаем');
            return;
        }
        var ap = new ArithmeticProgression(2, 3);
        assert.equal(ap.member(1), 2, 'a₁ = 2');
        assert.equal(ap.member(2), 5, 'a₂ = 5');
        assert.equal(ap.member(3), 8, 'a₃ = 8');
        assert.equal(ap.sum(1), 2, 'S₁ = 2');
        assert.equal(ap.sum(2), 7, 'S₂ = 7');
        assert.equal(ap.sum(3), 15, 'S₃ = 15');
    });

    QUnit.test('GeometricProgression', function (assert) {
        if (typeof GeometricProgression === 'undefined') {
            assert.ok(true, 'GeometricProgression не определён — пропускаем');
            return;
        }
        var gp = new GeometricProgression(2, 3);
        assert.equal(gp.member(1), 2, 'b₁ = 2');
        assert.equal(gp.member(2), 6, 'b₂ = 6');
        assert.equal(gp.member(3), 18, 'b₃ = 18');
    });

    // ============================================================
    //  Видимость граней и рёбер  (lib/figure.js)
    // ============================================================
    QUnit.module('Видимость граней (facesVisibility, isOnVisibleFace, dashHiddenEdges)');

    // lib/figure.js и lib/project3DTo2D.js в chas-lib.js не отдают свои
    // функции и классы в global, поэтому загружаем их в отдельный контекст
    var geometry = (function () {
        var vm = require('vm');
        var fs = require('fs');
        var path = require('path');
        var context = vm.createContext({ Math: Math });
        ['figure.js', 'project3DTo2D.js'].forEach(function (file) {
            vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'lib', file), 'utf8'), context);
        });
        vm.runInContext('this.Cube = Cube; this.RegularPyramid = RegularPyramid; this.RegularPrism = RegularPrism;', context);
        return context;
    })();

    // Камера, как в шаблонах matege2024b: взгляд сверху-спереди под небольшим углом
    var camera = {
        x: 0, y: 0, z: 0, scale: 50,
        rotationX: -Math.PI / 2 + Math.PI / 11, rotationY: 0, rotationZ: Math.PI / 10,
    };
    var project = function (vertices, cam) {
        return vertices.map(function (v) {
            return geometry.project3DTo2D(v, cam || camera);
        });
    };
    var count = function (array) {
        return array.filter(Boolean).length;
    };

    QUnit.test('Куб: видны ровно три грани, и верхняя среди них', function (assert) {
        var cube = new geometry.Cube(4);
        var vertices = cube.verticesOfFigure;
        // Нумерация Cube: 0-3 - нижнее основание (z < 0), 4-7 - верхнее
        var faces = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 6, 5], [1, 2, 7, 6], [2, 3, 4, 7], [3, 0, 5, 4]];
        var visibility = geometry.facesVisibility(vertices, project(vertices), faces);
        assert.equal(count(visibility), 3, 'видны три грани');
        assert.ok(visibility[1], 'верхнее основание видно (взгляд сверху)');
        assert.notOk(visibility[0], 'нижнее основание не видно');
        // Противоположные грани не видны одновременно
        assert.notOk(visibility[2] && visibility[4], 'боковые грани y = 2 и y = -2');
        assert.notOk(visibility[3] && visibility[5], 'боковые грани x = 2 и x = -2');
    });

    QUnit.test('Порядок обхода грани и масштаб чертежа не влияют на ответ', function (assert) {
        var cube = new geometry.Cube(4);
        var vertices = cube.verticesOfFigure;
        var faces = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 6, 5], [1, 2, 7, 6], [2, 3, 4, 7], [3, 0, 5, 4]];
        var reversed = faces.map(function (face) {
            return face.slice().reverse();
        });
        var points2D = project(vertices);
        // Сдвиг и растяжение, как после autoScale() и центрирования
        var moved = points2D.map(function (p) {
            return { x: 3 * p.x + 100, y: 3 * p.y - 40 };
        });
        var visibility = geometry.facesVisibility(vertices, points2D, faces);
        assert.deepEqual(geometry.facesVisibility(vertices, points2D, reversed), visibility, 'обход в другую сторону');
        assert.deepEqual(geometry.facesVisibility(vertices, moved, faces), visibility, 'сдвиг и масштаб');
    });

    QUnit.test('Взгляд снизу: видимость меняется на противоположную', function (assert) {
        var cube = new geometry.Cube(4);
        var vertices = cube.verticesOfFigure;
        var faces = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 6, 5], [1, 2, 7, 6], [2, 3, 4, 7], [3, 0, 5, 4]];
        var below = Object.assign({}, camera, { rotationX: -Math.PI / 2 - Math.PI / 11 });
        var visibility = geometry.facesVisibility(vertices, project(vertices, below), faces);
        assert.ok(visibility[0], 'нижнее основание видно');
        assert.notOk(visibility[1], 'верхнее основание не видно');
    });

    QUnit.test('Тетраэдр и треугольная призма: одна скрытая вершина, три пунктирных ребра', function (assert) {
        var pyramid = new geometry.RegularPyramid({ height: 4, baseSide: 4, numberSide: 3 });
        var pv = pyramid.verticesOfFigure;
        var pyramidFaces = [[0, 1, 2], [0, 1, 3], [1, 2, 3], [2, 0, 3]];
        var pVisibility = geometry.facesVisibility(pv, project(pv), pyramidFaces);
        var pMatrix = geometry.dashHiddenEdges(pyramid.connectionMatrix, pyramidFaces, pVisibility, [6, 4]);
        var dashed = [];
        pMatrix.forEach(function (row, i) {
            row.forEach(function (value, j) {
                if (Array.isArray(value)) {
                    dashed.push((i + 1) + '-' + j);
                }
            });
        });
        assert.deepEqual(dashed, ['2-0', '2-1', '3-2'], 'тетраэдр: пунктир - три ребра при вершине 2');
        assert.deepEqual(pMatrix[0], [1], 'ребро 1-0 сплошное');
        assert.deepEqual(pyramid.connectionMatrix[1], [1, 1], 'исходная матрица не изменилась');

        var prism = new geometry.RegularPrism({ height: 4, baseSide: 4, numberSide: 3 });
        var rv = prism.verticesOfFigure;
        var prismFaces = [[0, 1, 2], [3, 4, 5], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]];
        var rVisibility = geometry.facesVisibility(rv, project(rv), prismFaces);
        // Скрыта задняя нижняя вершина 2, а с ней - нижнее основание и обе
        // боковые грани при ней; видны верхнее основание и передняя грань 0-1-4-3
        assert.deepEqual(rVisibility, [false, true, true, false, false], 'призма: видны верхнее основание и грань 0-1-4-3');
        assert.ok(geometry.isOnVisibleFace(prismFaces, rVisibility, [3, 4]), 'ребро верхнего основания видно');
        assert.notOk(geometry.isOnVisibleFace(prismFaces, rVisibility, [2, 0]), 'ребро 2-0 скрыто');
        assert.notOk(geometry.isOnVisibleFace(prismFaces, rVisibility, [2, 5]), 'боковое ребро 2-5 скрыто');
        assert.ok(geometry.isOnVisibleFace(prismFaces, rVisibility, [0, 1, 3, 4]),
            'отрезок между точками на рёбрах 0-1 и 3-4 лежит в видимой грани');
    });

    // ============================================================
    //  Расстояние между точками плоскости  (lib/figure.js)
    // ============================================================
    QUnit.module('lengthInPlane (lib/figure.js)');

    QUnit.test('lengthInPlane: расстояние между точками плоскости', function (assert) {
        assert.equal(geometry.lengthInPlane({ x: 0, y: 0 }, { x: 3, y: 4 }), 5, 'треугольник 3-4-5');
        assert.equal(geometry.lengthInPlane({ x: 3, y: 4 }, { x: 0, y: 0 }), 5, 'симметрично');
        assert.equal(geometry.lengthInPlane({ x: -2, y: -1 }, { x: 1, y: 3 }), 5, 'отрицательные координаты');
        assert.equal(geometry.lengthInPlane({ x: 7, y: -2 }, { x: 7, y: -2 }), 0, 'совпадающие точки');
    });

    QUnit.test('lengthInPlane: плоские точки без z, как после autoScale', function (assert) {
        var p1 = { x: 1, y: 2 };
        var p2 = { x: 4, y: 6 };
        assert.ok(Number.isFinite(geometry.lengthInPlane(p1, p2)), 'без z даёт число, а не NaN');
        assert.equal(geometry.lengthInPlane(p1, p2), 5, 'расстояние 3-4-5');
    });

    // ============================================================
    //  Circle  (lib/circle.js)
    // ============================================================
    QUnit.module('Circle');

    QUnit.test('Circle.prototype.drawOnto передаёт в drawCircle центр и числовой радиус', function (assert) {
        var circle = new Circle(new Point(3, -4), 5);
        var calls = [];
        var ctx = {
            drawCircle: function () {
                calls.push(Array.prototype.slice.call(arguments));
            },
        };
        circle.drawOnto(ctx);
        assert.equal(calls.length, 1, 'drawCircle вызван ровно один раз');
        assert.deepEqual(calls[0], [3, -4, 5], 'drawCircle(x центра, y центра, радиус)');
    });

    // ============================================================
    //  autoScale: уменьшение больших фигур  (lib/func.js)
    // ============================================================
    QUnit.module('autoScale: shrink');

    function newCamera() {
        return { x: 0, y: 0, z: 0, scale: 1, rotationX: 0, rotationY: 0, rotationZ: 0 };
    }

    QUnit.test('без shrink большая фигура отбраковывается, как раньше', function (assert) {
        assert.throws(function () {
            autoScale([{ x: -1000, y: 0 }, { x: 1000, y: 500 }], newCamera());
        }, 'genAssert');
    });

    QUnit.test('с shrink большая фигура рисуется так же, как подобная ей маленькая', function (assert) {
        var bigCamera = newCamera();
        var big = autoScale([{ x: -1000, y: 0 }, { x: 1000, y: 500 }], bigCamera, [], { shrink: true });
        var small = autoScale([{ x: -10, y: 0 }, { x: 10, y: 5 }], newCamera());
        assert.deepEqual(big, small, 'та же картинка, что у фигуры в 100 раз меньше');
        assert.ok(Math.abs(bigCamera.scale - 0.18) < 1e-12, 'camera.scale = 0,18');
    });

    QUnit.test('с shrink фигура, которая и так помещается, не меняется', function (assert) {
        var vertex = [{ x: -10, y: 0 }, { x: 10, y: 5 }];
        var withShrink = newCamera();
        var withoutShrink = newCamera();
        assert.deepEqual(
            autoScale(vertex, withShrink, [], { shrink: true }),
            autoScale(vertex, withoutShrink)
        );
        assert.strictEqual(withShrink.scale, withoutShrink.scale);
    });

    // ============================================================
    //  autoScale: центрирование  (lib/func.js)
    // ============================================================
    QUnit.module('autoScale: center');

    QUnit.test('без center начало координат остаётся на месте', function (assert) {
        var result = autoScale([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 5 }], newCamera());
        assert.deepEqual(result[0], { x: 0, y: 0 });
    });

    QUnit.test('с center фигура рисуется так же, как сдвинутая заранее в начало координат', function (assert) {
        var centeredCamera = newCamera();
        var centered = autoScale([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 5 }], centeredCamera, [], { center: true });
        var moved = autoScale([{ x: -5, y: -2.5 }, { x: 5, y: -2.5 }, { x: 5, y: 2.5 }], newCamera());
        assert.deepEqual(centered, moved, 'середина габаритов — в середине поля');
        assert.strictEqual(centeredCamera.scale, 36, 'фигура занимает всё поле по ширине');
    });

    QUnit.test('с center фигура вдали от начала координат не отбраковывается', function (assert) {
        var vertex = [{ x: 1000, y: 1000 }, { x: 1004, y: 1000 }, { x: 1004, y: 1002 }];
        assert.throws(function () {
            autoScale(vertex, newCamera());
        }, 'без center — genAssert');
        assert.deepEqual(
            autoScale(vertex, newCamera(), [], { center: true, startX: 0, finishX: 400, startY: 0, finishY: 400 }),
            [{ x: 0, y: 100 }, { x: 400, y: 100 }, { x: 400, y: 300 }],
            'поле 0..400: фигура в его середине'
        );
    });

    // ============================================================
    //  Положение подписей точек на чертеже  (lib/func.js)
    // ============================================================
    QUnit.module('labelPositionAwayFrom, labelPositionOutsideSegment');

    function assertPointClose(assert, actual, expected, message) {
        assert.ok(Math.abs(actual.x - expected.x) < 1e-12 && Math.abs(actual.y - expected.y) < 1e-12,
            message + ': ожидалось (' + expected.x + ', ' + expected.y + '), получено (' + actual.x + ', ' + actual.y + ')');
    }

    QUnit.test('labelPositionAwayFrom: подпись отодвигается от точки from', function (assert) {
        assertPointClose(assert, labelPositionAwayFrom({ x: 3, y: 4 }, { x: 0, y: 0 }, 10), { x: 9, y: 12 }, 'наружу от начала координат');
        assertPointClose(assert, labelPositionAwayFrom({ x: -2, y: 1 }, { x: -2, y: 5 }, 3), { x: -2, y: -2 }, 'вниз от точки выше');
    });

    QUnit.test('labelPositionOutsideSegment: по нормали к отрезку, со стороны без точки from', function (assert) {
        var start = { x: 0, y: 0 };
        var end = { x: 10, y: 0 };
        assertPointClose(assert, labelPositionOutsideSegment({ x: 4, y: 0 }, start, end, { x: 5, y: 3 }, 2), { x: 4, y: -2 }, 'from сверху — подпись снизу');
        assertPointClose(assert, labelPositionOutsideSegment({ x: 4, y: 0 }, start, end, { x: 5, y: -3 }, 2), { x: 4, y: 2 }, 'from снизу — подпись сверху');
        assertPointClose(assert, labelPositionOutsideSegment({ x: 4, y: 0 }, end, start, { x: 5, y: 3 }, 2), { x: 4, y: -2 }, 'порядок концов отрезка не важен');
    });

    QUnit.test('labelPositionOutsideSegment: наклонный отрезок', function (assert) {
        // Отрезок на прямой y = x, центр фигуры — выше прямой; подпись — ниже, по нормали (1, -1)/√2
        var label = labelPositionOutsideSegment({ x: 1, y: 1 }, { x: 0, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }, Math.SQRT2);
        assertPointClose(assert, label, { x: 2, y: 0 }, 'на расстоянии √2 по нормали');
    });

    // ============================================================
    //  Подписи в стороне от отрезков; рёбра матрицы смежности (lib/func.js)
    // ============================================================
    QUnit.module('labelPositionAwayFromSegments, segmentsFromConnectionMatrix');

    QUnit.test('segmentsFromConnectionMatrix: рёбра в формате drawFigure', function (assert) {
        var points = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 2 }];
        var segments = segmentsFromConnectionMatrix(points, [[1], [1, 1], [1, 1]]);
        assert.deepEqual(segments, [
            [points[1], points[0]],
            [points[2], points[0]],
            [points[2], points[1]],
            [points[3], points[0]],
            [points[3], points[1]],
        ], 'строка i — рёбра из points[i+1] в points[j], «рваные» строки допустимы');
        assert.deepEqual(segmentsFromConnectionMatrix(points, [[0], [0, 0], [0, 0]]), [], 'нулевая матрица — рёбер нет');
        assert.deepEqual(segmentsFromConnectionMatrix(points, [[[4, 2]]]), [[points[1], points[0]]], 'пунктирное ребро — тоже ребро');
    });

    QUnit.test('labelPositionAwayFromSegments: направление с наибольшим зазором до отрезков', function (assert) {
        var below = [[{ x: -100, y: -10 }, { x: 100, y: -10 }]];
        assertPointClose(assert, labelPositionAwayFromSegments({ x: 0, y: 0 }, below, 20), { x: 0, y: 20 }, 'отрезок снизу — подпись сверху');
        assertPointClose(assert, labelPositionAwayFromSegments({ x: 0, y: 0 }, below, 5), { x: 0, y: 5 }, 'distance задаёт отступ');
        assertPointClose(assert, labelPositionAwayFromSegments({ x: 3, y: 4 }, below, 20, 4), { x: 3, y: 24 }, 'отсчёт от point, directions = 4');
    });

    QUnit.test('labelPositionAwayFromSegments: неверные distance и directions', function (assert) {
        var below = [[{ x: -100, y: -10 }, { x: 100, y: -10 }]];
        assert.throws(function () { labelPositionAwayFromSegments({ x: 0, y: 0 }, below); }, TypeError, 'без distance');
        assert.throws(function () { labelPositionAwayFromSegments({ x: 0, y: 0 }, below, NaN); }, TypeError, 'distance = NaN');
        assert.throws(function () { labelPositionAwayFromSegments({ x: 0, y: 0 }, below, 20, 0); }, RangeError, 'directions = 0');
        assert.throws(function () { labelPositionAwayFromSegments({ x: 0, y: 0 }, below, 20, -4); }, RangeError, 'directions < 0');
        assert.throws(function () { labelPositionAwayFromSegments({ x: 0, y: 0 }, below, 20, 2.5); }, RangeError, 'directions не целое');
    });

    QUnit.test('labelPositionAwayFromSegments: при равенстве — первое направление', function (assert) {
        var symmetric = [[{ x: -100, y: -10 }, { x: 100, y: -10 }], [{ x: -100, y: 10 }, { x: 100, y: 10 }]];
        assertPointClose(assert, labelPositionAwayFromSegments({ x: 0, y: 0 }, symmetric, 20), { x: 20, y: 0 }, 'симметрия — направление k = 0');
    });

    QUnit.test('labelPositionAwayFromSegments: зазоры сравниваются с допуском', function (assert) {
        // Короткий отрезок за каждым из четырёх направлений: зазор направления 0 — 5,
        // направления 1 — 5 + delta, направлений 2 и 3 — 1
        function segmentsWithDelta(delta) {
            return [
                [{ x: 25, y: -1 }, { x: 25, y: 1 }],
                [{ x: -1, y: 25 + delta }, { x: 1, y: 25 + delta }],
                [{ x: -21, y: -1 }, { x: -21, y: 1 }],
                [{ x: -1, y: -21 }, { x: 1, y: -21 }],
            ];
        }
        assertPointClose(assert, labelPositionAwayFromSegments({ x: 0, y: 0 }, segmentsWithDelta(1e-12), 20, 4), { x: 20, y: 0 },
            'разница меньше допуска — равенство, первое направление');
        assertPointClose(assert, labelPositionAwayFromSegments({ x: 0, y: 0 }, segmentsWithDelta(1e-6), 20, 4), { x: 0, y: 20 },
            'разница больше допуска — направление с большим зазором');
    });

    // ============================================================
    //  Canvas: заливка кольца  (lib/canvas.js)
    // ============================================================
    QUnit.module('Canvas: fillRing');

    QUnit.test('ctx.fillRing закрашивает кольцо между концентрическими окружностями через evenodd', function (assert) {
        assert.ok(typeof CanvasRenderingContext2D.prototype.fillRing === 'function', 'метод fillRing определён');
        var calls = [];
        var ctx = {
            beginPath: function () { calls.push(['beginPath']); },
            arc: function () { calls.push(['arc'].concat(Array.prototype.slice.call(arguments))); },
            moveTo: function () { calls.push(['moveTo'].concat(Array.prototype.slice.call(arguments))); },
            fill: function () { calls.push(['fill'].concat(Array.prototype.slice.call(arguments))); },
        };
        CanvasRenderingContext2D.prototype.fillRing.call(ctx, 3, -4, 50, 20);
        assert.deepEqual(calls[0], ['beginPath'], 'начинает новый контур');
        assert.deepEqual(calls[1], ['arc', 3, -4, 50, 0, 2 * Math.PI], 'внешняя окружность');
        assert.deepEqual(calls[2], ['moveTo', 23, -4], 'переход к внутренней окружности без соединительной линии');
        assert.deepEqual(calls[3], ['arc', 3, -4, 20, 0, 2 * Math.PI], 'внутренняя окружность');
        assert.deepEqual(calls[4], ['fill', 'evenodd'], 'заливка по evenodd: внутренний круг остаётся пустым');
    });

    // ============================================================
    //  Canvas: клетчатая бумага  (lib/canvas.js)
    // ============================================================
    QUnit.module('Canvas: gridPaper');

    QUnit.test('ctx.gridPaper готовит клетчатую бумагу и переводит координаты в клетки', function (assert) {
        assert.ok(typeof CanvasRenderingContext2D.prototype.gridPaper === 'function', 'метод gridPaper определён');
        var calls = [];
        var ctx = {
            canvas: { width: 400, height: 400 },
            fillRect: function () { calls.push(['fillRect'].concat(Array.prototype.slice.call(arguments))); },
            translateToCenter: function () { calls.push(['translateToCenter']); },
            regularGrid: function () { calls.push(['regularGrid'].concat(Array.prototype.slice.call(arguments))); },
            scale: function () { calls.push(['scale'].concat(Array.prototype.slice.call(arguments))); },
        };
        CanvasRenderingContext2D.prototype.gridPaper.call(ctx, 30, 6);
        assert.deepEqual(calls[0], ['fillRect', 0, 0, 400, 400], 'белый фон на весь холст');
        assert.equal(ctx.fillStyle, '#fff', 'цвет фона');
        assert.equal(ctx.strokeStyle, '#888', 'цвет сетки');
        assert.equal(ctx.lineWidth, 1, 'толщина линий сетки');
        assert.deepEqual(calls[1], ['translateToCenter'], 'начало координат — в центре холста');
        assert.deepEqual(calls[2], ['regularGrid', 30, 6], 'сетка ±6 клеток по 30 px');
        assert.deepEqual(calls[3], ['scale', 30, -30], 'масштаб в клетки, ось Y вверх');
    });

    // ============================================================
    //  Canvas: перенос начала координат  (lib/canvas.js)
    // ============================================================
    QUnit.module('Canvas: translateToCenter');

    QUnit.test('ctx.translateToCenter переносит начало координат в центр холста', function (assert) {
        assert.ok(typeof CanvasRenderingContext2D.prototype.translateToCenter === 'function', 'метод translateToCenter определён');
        var calls = [];
        var ctx = {
            canvas: { width: 400, height: 300 },
            translate: function () {
                calls.push(Array.prototype.slice.call(arguments));
            },
        };
        CanvasRenderingContext2D.prototype.translateToCenter.call(ctx);
        assert.equal(calls.length, 1, 'translate вызван ровно один раз');
        assert.deepEqual(calls[0], [200, 150], 'translate(width/2, height/2)');
    });

    // ============================================================
    //  Canvas: цвет диагонали параллелепипеда  (lib/canvas.js)
    // ============================================================
    QUnit.module('Canvas: drawParallelepiped diagonalStrokeStyle');

    QUnit.test('drawParallelepiped: цвет диагонали по умолчанию — элемент om.primaryBrandColors, а не массив', function (assert) {
        assert.ok(typeof CanvasRenderingContext2D.prototype.drawParallelepiped === 'function', 'метод drawParallelepiped определён');
        var draws = [];
        var ctx = {
            strokeStyle: '',
            drawLine: function () {
                draws.push({ strokeStyle: this.strokeStyle, args: Array.prototype.slice.call(arguments) });
            },
            setLineDash: function () {},
        };
        CanvasRenderingContext2D.prototype.drawParallelepiped.call(ctx,
            { width: 2, height: 2, depth: 1, angle: Math.PI / 6 }, [], true);
        var diagonal = draws[draws.length - 1];
        assert.deepEqual(diagonal.args.slice(0, 2), [0, 0], 'диагональ — последний отрезок, из начала координат');
        assert.ok(typeof diagonal.strokeStyle === 'string', 'strokeStyle — строка цвета: массив canvas молча игнорирует');
        assert.ok(om.primaryBrandColors.includes(diagonal.strokeStyle), 'цвет диагонали по умолчанию взят из om.primaryBrandColors');
        var edgeColors = draws.slice(0, -1).map(function (d) { return d.strokeStyle; });
        assert.ok(edgeColors.every(function (c) { return c === om.secondaryBrandColors[0]; }), 'рёбра остаются цвета strokeStyle');
    });

    QUnit.test('drawParallelepiped: явный diagonalStrokeStyle уважается', function (assert) {
        var draws = [];
        var ctx = {
            strokeStyle: '',
            drawLine: function () {
                draws.push({ strokeStyle: this.strokeStyle, args: Array.prototype.slice.call(arguments) });
            },
            setLineDash: function () {},
        };
        CanvasRenderingContext2D.prototype.drawParallelepiped.call(ctx,
            { width: 2, height: 2, depth: 1, angle: Math.PI / 6, diagonalStrokeStyle: '#123456' }, [], true);
        assert.equal(draws[draws.length - 1].strokeStyle, '#123456', 'диагональ рисуется заданным цветом');
    });

    // ============================================================
    //  Canvas: подписи вершин фигуры  (lib/canvas.js)
    // ============================================================
    QUnit.module('Canvas: signVertices');

    QUnit.test('ctx.signVertices подписывает каждую вершину своей буквой', function (assert) {
        assert.ok(typeof CanvasRenderingContext2D.prototype.signVertices === 'function', 'метод signVertices определён');
        var calls = [];
        var ctx = {
            font: '',
            save: function () { calls.push({ op: 'save' }); },
            restore: function () { calls.push({ op: 'restore' }); },
            scale: function (x, y) { calls.push({ op: 'scale', x: x, y: y }); },
            fillText: function (text, x, y) { calls.push({ op: 'text', text: text, x: x, y: y, font: this.font }); },
        };
        var points = [{ x: 10, y: 20 }, { x: -30, y: 40 }, { x: 50, y: -60 }];
        CanvasRenderingContext2D.prototype.signVertices.call(ctx, points, ['A', 'B', 'C']);
        var texts = calls.filter(function (c) { return c.op === 'text'; });
        assert.equal(texts.length, 3, 'по одной подписи на вершину');
        assert.deepEqual(texts[0], { op: 'text', text: 'A', x: 10, y: 5, font: '20px liberation_sans' }, 'первая половина вершин: подпись под вершиной (-y + 25)');
        assert.deepEqual(texts[1], { op: 'text', text: 'B', x: -30, y: -15, font: '20px liberation_sans' }, 'вторая вершина тоже в первой половине (i < 3/2)');
        assert.deepEqual(texts[2], { op: 'text', text: 'C', x: 50, y: 55, font: '20px liberation_sans' }, 'вторая половина вершин: подпись над вершиной (-y - 5)');
        assert.deepEqual(calls.filter(function (c) { return c.op === 'scale'; }), [{ op: 'scale', x: 1, y: -1 }], 'ось Y отражается ровно один раз');
        assert.equal(calls[0].op, 'save', 'контекст сохраняется до переворота оси');
        assert.equal(calls[calls.length - 1].op, 'restore', 'контекст восстанавливается после подписей');
    });

    QUnit.test('ctx.signVertices: чётное число вершин и пустой список', function (assert) {
        var calls = [];
        var ctx = {
            font: '',
            save: function () {},
            restore: function () {},
            scale: function () {},
            fillText: function (text, x, y) { calls.push({ text: text, x: x, y: y }); },
        };
        CanvasRenderingContext2D.prototype.signVertices.call(ctx, [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }], ['A', 'B', 'C', 'D']);
        assert.deepEqual(calls.map(function (c) { return c.y; }), [25, 24, -7, -8], 'первые две вершины +25, последние две -5');
        calls = [];
        CanvasRenderingContext2D.prototype.signVertices.call(ctx, [], []);
        assert.equal(calls.length, 0, 'пустой список вершин - ни одной подписи');
    });

    QUnit.test('ctx.signVertices: настройка above задаёт вершины для подписи сверху', function (assert) {
        var calls = [];
        var ctx = {
            font: '',
            save: function () {},
            restore: function () {},
            scale: function () {},
            fillText: function (text, x, y) { calls.push({ text: text, x: x, y: y }); },
        };
        var points = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }];
        CanvasRenderingContext2D.prototype.signVertices.call(ctx, points, ['A', 'B', 'C', 'K', 'M'], { above: [2, 3] });
        assert.deepEqual(calls.map(function (c) { return c.y; }), [25, 24, -7, -8, 21], 'вершины 2 и 3 сверху (-5), остальные снизу (+25)');
        assert.deepEqual(calls.map(function (c) { return c.text; }), ['A', 'B', 'C', 'K', 'M'], 'буквы в порядке вершин');
        calls = [];
        CanvasRenderingContext2D.prototype.signVertices.call(ctx, points, ['A', 'B', 'C', 'K', 'M']);
        assert.deepEqual(calls.map(function (c) { return c.y; }), [25, 24, 23, -8, -9], 'без above сохраняется правило половин');
        assert.throws(function () {
            CanvasRenderingContext2D.prototype.signVertices.call(ctx, points, ['A', 'B', 'C', 'K', 'M'], [2, 3]);
        }, /above/, 'массив третьим аргументом — ошибка с подсказкой про {above: [...]}');
    });

    QUnit.test('ctx.signVertices: необязательные настройки options', function (assert) {
        var calls;
        function makeCtx() {
            calls = [];
            return {
                font: 'контекст', textAlign: 'start', textBaseline: 'alphabetic', fillStyle: '#000',
                save: function () {},
                restore: function () {},
                scale: function () {},
                fillText: function (text, x, y) {
                    calls.push({ text: text, y: y, font: this.font, textAlign: this.textAlign, textBaseline: this.textBaseline, fillStyle: this.fillStyle });
                },
            };
        }
        var points = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }];
        CanvasRenderingContext2D.prototype.signVertices.call(makeCtx(), points, ['A', 'B', 'C'], {
            font: '16px liberation_sans', textAlign: 'center', textBaseline: 'middle', fillStyle: '#f00', offsetBelow: 20, offsetAbove: -10,
        });
        assert.deepEqual(calls.map(function (c) { return c.y; }), [20, 19, -12], 'отступы из options, без above — правило половин');
        assert.deepEqual([calls[0].font, calls[0].textAlign, calls[0].textBaseline, calls[0].fillStyle],
            ['16px liberation_sans', 'center', 'middle', '#f00'], 'шрифт, выравнивание и цвет из options');
        CanvasRenderingContext2D.prototype.signVertices.call(makeCtx(), points, ['A', 'B', 'C'], { above: [0], textAlign: 'center' });
        assert.deepEqual(calls.map(function (c) { return c.y; }), [-5, 24, 23], 'не заданные отступы — по умолчанию');
        assert.deepEqual([calls[0].font, calls[0].textAlign, calls[0].textBaseline, calls[0].fillStyle],
            ['20px liberation_sans', 'center', 'alphabetic', '#000'], 'не заданное — шрифт по умолчанию, остальное из контекста');
    });

    // ============================================================
    //  Canvas: ломаная по массивам точек  (lib/canvas.js)
    // ============================================================
    QUnit.module('Canvas: drawPolyline');

    QUnit.test('ctx.drawPolyline соединяет соседние точки отрезками', function (assert) {
        assert.ok(typeof CanvasRenderingContext2D.prototype.drawPolyline === 'function', 'метод drawPolyline определён');
        var calls = [];
        var ctx = {
            drawLine: function () {
                calls.push(Array.prototype.slice.call(arguments));
            },
        };
        CanvasRenderingContext2D.prototype.drawPolyline.call(ctx, [0, 1, 2], [3, 1, 4]);
        assert.deepEqual(calls, [[0, 3, 1, 1], [1, 1, 2, 4]], 'два отрезка: (0,3)-(1,1) и (1,1)-(2,4)');
    });

    QUnit.test('ctx.drawPolyline: ноль или одна точка — ничего не рисуется', function (assert) {
        var calls = [];
        var ctx = {
            drawLine: function () {
                calls.push(Array.prototype.slice.call(arguments));
            },
        };
        CanvasRenderingContext2D.prototype.drawPolyline.call(ctx, [], []);
        CanvasRenderingContext2D.prototype.drawPolyline.call(ctx, [5], [7]);
        assert.equal(calls.length, 0, 'drawLine не вызывался');
    });

    QUnit.test('ctx.drawPolyline с dotRadius: точка в каждой вершине, затем отрезок к следующей', function (assert) {
        var calls = [];
        var ctx = {
            drawLine: function () { calls.push(['line'].concat(Array.prototype.slice.call(arguments))); },
            drawFilledCircle: function () { calls.push(['dot'].concat(Array.prototype.slice.call(arguments))); },
        };
        CanvasRenderingContext2D.prototype.drawPolyline.call(ctx, [0, 1, 2], [3, 1, 4], 0.5);
        assert.deepEqual(calls, [
            ['dot', 0, 3, 0.5], ['line', 0, 3, 1, 1],
            ['dot', 1, 1, 0.5], ['line', 1, 1, 2, 4],
            ['dot', 2, 4, 0.5],
        ], 'порядок как в шаблонах: точка i, отрезок i→i+1');
        calls = [];
        CanvasRenderingContext2D.prototype.drawPolyline.call(ctx, [5], [7], 0.5);
        assert.deepEqual(calls, [['dot', 5, 7, 0.5]], 'одна точка — только точка');
    });

    QUnit.test('ctx.drawPolyline: NaN или разная длина массивов — предупреждение в консоль', function (assert) {
        var ctx = { drawLine: function () {} };
        var warnings = [];
        var originalWarn = console.warn;
        console.warn = function () { warnings.push(arguments[0]); };
        try {
            CanvasRenderingContext2D.prototype.drawPolyline.call(ctx, [0, 1, 2], [3, 1, 4]);
            assert.equal(warnings.length, 0, 'корректные данные — без предупреждения');
            CanvasRenderingContext2D.prototype.drawPolyline.call(ctx, [0, 1, 2], [3, NaN, 4]);
            assert.equal(warnings.length, 1, 'NaN в ординатах — предупреждение');
            CanvasRenderingContext2D.prototype.drawPolyline.call(ctx, [0, 1, 2], [3, 1]);
            assert.equal(warnings.length, 2, 'ys короче xs — предупреждение');
            CanvasRenderingContext2D.prototype.drawPolyline.call(ctx, [0, 1], [3, 1, 4]);
            assert.equal(warnings.length, 3, 'ys длиннее xs — тоже предупреждение');
        } finally {
            console.warn = originalWarn;
        }
    });

    // ============================================================
    //  chislit / chislitlx: отрицательные числа  (lib/func.js)
    // ============================================================
    QUnit.module('chislit / chislitlx: отрицательные числа');

    QUnit.test('chislit: форма слова выбирается по модулю числа', function (assert) {
        assert.equal(chislit(-4, 'день', 'дня', 'дней'), 'дня', '-4 → дня');
        assert.equal(chislit(-21, 'день', 'дня', 'дней'), 'день', '-21 → день');
        assert.equal(chislit(-22, 'день', 'дня', 'дней'), 'дня', '-22 → дня');
        assert.equal(chislit(-5, 'день', 'дня', 'дней'), 'дней', '-5 → дней');
        assert.equal(chislit(-11, 'день', 'дня', 'дней'), 'дней', '-11 → дней');
        assert.equal(chislit(-101, 'день', 'дня', 'дней'), 'день', '-101 → день');
        assert.equal(chislit(-100, 'день', 'дня', 'дней'), 'дней', '-100 → дней');
        assert.equal(chislit(-1.5, 'день', 'дня', 'дней'), 'дня', '-1,5 → дня (дробное)');
    });

    QUnit.test('chislit: положительные числа не затронуты', function (assert) {
        assert.equal(chislit(4, 'день', 'дня', 'дней'), 'дня', '4 → дня');
        assert.equal(chislit(21, 'день', 'дня', 'дней'), 'день', '21 → день');
        assert.equal(chislit(5, 'день', 'дня', 'дней'), 'дней', '5 → дней');
        assert.equal(chislit(11, 'день', 'дня', 'дней'), 'дней', '11 → дней');
    });

    QUnit.test('chislitlx: отрицательное число с существительным', function (assert) {
        assert.equal(chislitlx(-4, 'день'), '-4 дня', '-4 дня');
        assert.equal(chislitlx(-21, 'день'), '-21 день', '-21 день');
        assert.equal(chislitlx(-5, 'день'), '-5 дней', '-5 дней');
        assert.equal(chislitlx(-12.6, 'день'), '-12,6 дня', '-12,6 дня');
        assert.equal(chislitlx(21, 'день'), '21 день', '21 день (положительное не затронуто)');
    });

    // ============================================================
    //  Canvas: произвольные подписи оси X drawGridWithArrows  (lib/canvas.js)
    // ============================================================
    QUnit.module('Canvas: drawGridWithArrows labelsX');

    function gridLabelStubCtx(labels) {
        return {
            lineWidth: 0, font: '', textAlign: '', textBaseline: '',
            save: function () {}, restore: function () {},
            translate: function () {}, scale: function () {},
            setLineDash: function () {},
            fillText: function (text) { labels.push(text); },
            irregularGrid: function () {},
            drawArrow: function () {},
            drawLine: function () {},
        };
    }

    QUnit.test('typeX=custom: подписи оси X берутся из labelsX по порядку', function (assert) {
        assert.ok(typeof CanvasRenderingContext2D.prototype.drawGridWithArrows === 'function', 'метод drawGridWithArrows определён');
        var labels = [];
        var ctx = gridLabelStubCtx(labels);
        CanvasRenderingContext2D.prototype.drawGridWithArrows.call(ctx, {
            typeX: 'custom', labelsX: ['янв', 'фев', 'мар'],
            gridWidth: 120, gridHeight: 60, cellWidth: 40, cellHeight: 40,
            stepX: 1, stepByCeilX: 1, minX: 0, maxX: 12, maxY: 3,
        });
        // подписи оси X рисуются раньше подписей оси Y: первые три fillText — кастомные
        assert.deepEqual(labels.slice(0, 3), ['янв', 'фев', 'мар'], 'подписи оси X взяты из labelsX');
    });

    QUnit.test('typeX=custom: лишние засечки получают пустую подпись, а не undefined', function (assert) {
        var labels = [];
        var ctx = gridLabelStubCtx(labels);
        CanvasRenderingContext2D.prototype.drawGridWithArrows.call(ctx, {
            typeX: 'custom', labelsX: ['a', 'b'],
            gridWidth: 160, gridHeight: 60, cellWidth: 40, cellHeight: 40,
            stepX: 1, stepByCeilX: 1, minX: 0, maxX: 12, maxY: 3,
        });
        // 4 засечки по X (i=0,40,80,120), подписей всего 2
        assert.deepEqual(labels.slice(0, 4), ['a', 'b', '', ''], 'недостающие подписи — пустая строка');
    });

    QUnit.test('без typeX=custom сохраняются числовые подписи', function (assert) {
        var labels = [];
        var ctx = gridLabelStubCtx(labels);
        CanvasRenderingContext2D.prototype.drawGridWithArrows.call(ctx, {
            gridWidth: 120, gridHeight: 60, cellWidth: 40, cellHeight: 40,
            stepX: 1, stepByCeilX: 1, minX: 0, maxX: 12, maxY: 3,
        });
        assert.deepEqual(labels.slice(0, 3), [(0).ts(), (1).ts(), (2).ts()], 'по умолчанию подписи числовые');
    });

    // ============================================================
    //  Canvas: пунктирная сетка drawGridWithArrows  (lib/canvas.js)
    // ============================================================
    QUnit.module('Canvas: drawGridWithArrows gridLineDash');

    function gridStubCtx(events) {
        return {
            lineWidth: 0, font: '', textAlign: '', textBaseline: '',
            save: function () { events.push(['save']); },
            restore: function () { events.push(['restore']); },
            translate: function () { events.push(['translate']); },
            scale: function () { events.push(['scale']); },
            setLineDash: function (d) { events.push(['dash', Array.prototype.slice.call(d)]); },
            fillText: function () { events.push(['label']); },
            irregularGrid: function () { events.push(['grid']); },
            drawArrow: function () { events.push(['arrow']); },
            drawLine: function () { events.push(['tick']); },
        };
    }

    QUnit.test('gridLineDash применяется к сетке, а до осей состояние восстанавливается', function (assert) {
        assert.ok(typeof CanvasRenderingContext2D.prototype.drawGridWithArrows === 'function', 'метод drawGridWithArrows определён');
        var events = [];
        var ctx = gridStubCtx(events);
        CanvasRenderingContext2D.prototype.drawGridWithArrows.call(ctx, {
            gridLineDash: [3, 3], gridWidth: 60, gridHeight: 60, cellWidth: 10, cellHeight: 10, maxX: 3, maxY: 3,
        });
        var gi = -1, ai = -1, i;
        for (i = 0; i < events.length; i++) {
            if (events[i][0] === 'grid' && gi < 0) gi = i;
            if (events[i][0] === 'arrow' && ai < 0) ai = i;
        }
        assert.ok(gi >= 0 && ai > gi, 'сетка рисуется до осей');
        var dashBeforeGrid = null;
        for (i = 0; i < gi; i++) if (events[i][0] === 'dash') dashBeforeGrid = events[i][1];
        assert.deepEqual(dashBeforeGrid, [3, 3], 'перед сеткой установлен пунктир [3, 3]');
        var restoreBetween = false;
        for (i = gi + 1; i < ai; i++) if (events[i][0] === 'restore') restoreBetween = true;
        assert.ok(restoreBetween, 'после сетки и до осей — restore(): оси рисуются в прежнем состоянии');
    });

    QUnit.test('без gridLineDash пунктир контекста не трогается (поведение по умолчанию)', function (assert) {
        var events = [];
        var ctx = gridStubCtx(events);
        CanvasRenderingContext2D.prototype.drawGridWithArrows.call(ctx, {
            gridWidth: 60, gridHeight: 60, cellWidth: 10, cellHeight: 10, maxX: 3, maxY: 3,
        });
        var dashCalls = 0;
        for (var i = 0; i < events.length; i++) {
            if (events[i][0] === 'dash') dashCalls++;
        }
        assert.equal(dashCalls, 0, 'setLineDash не вызывается');
    });

    // ============================================================
    //  Прототипные обёртки chislitM / chislitlx  (lib/number.js)
    // ============================================================
    QUnit.module('Number.prototype.chislitM / chislitlx: проброс аргументов');

    QUnit.test('chislitM: tex, nots и separator доходят до функции', function (assert) {
        assert.equal((2).chislitM('метр', 'метра', 'метров'), '2 метра', 'без флагов — как раньше');
        assert.equal((2).chislitM('метр', 'метра', 'метров', true), '$ 2 $ метра', 'tex пробрасывается');
        assert.equal((2).chislitM('метр', 'метра', 'метров', true, true), '$2$ метра', 'nots пробрасывается');
        assert.equal((2).chislitM('метр', 'метра', 'метров', false, false, '~'), '2~метра', 'separator пробрасывается');
        assert.equal((2).chislitM('метр', 'метра', 'метров', true), chislitM(2, 'метр', 'метра', 'метров', true), 'обёртка совпадает с функцией');
    });

    QUnit.test('chislitlx: separator доходит до функции', function (assert) {
        assert.equal((2).chislitlx('метр'), '2 метра', 'без разделителя — как раньше');
        assert.equal((2).chislitlx('метр', '$'), '$ 2 $ метра', 'падеж и флаги работают');
        assert.equal((2).chislitlx('метр', '$', '~'), '$ 2 $~метра', 'separator пробрасывается');
        assert.equal((2).chislitlx('метр', '$', '~'), chislitlx(2, 'метр', '$', '~'), 'обёртка совпадает с функцией');
    });

    QUnit.test('Регресс: соседние обёртки не затронуты', function (assert) {
        assert.equal((5).chislit('день', 'дня', 'дней'), 'дней');
        assert.equal((90).toChMin(), '1 час 30 минут');
        assert.equal((1500).rub(), '1500 рублей');
        assert.equal((2).chislitlx('населённый пункт'), '2 населённых пункта', 'счётная форма r2 сохраняется');
    });

    // ============================================================
    //  Словарь числительных: последовательность «ё»  (lib/lxchisl.js)
    // ============================================================
    QUnit.module('lxchisl: ё в формах числительных');

    QUnit.test('«три»: предложный падеж с ё, как остальные формы', function (assert) {
        var tri = sklonlxkand('три');
        assert.equal(tri.r, 'трёх', 'родительный');
        assert.equal(tri.d, 'трём', 'дательный');
        assert.equal(tri.p, 'трёх', 'предложный: была опечатка «трех»');
        assert.equal(sklonlxkand('четыре').p, 'четырёх', 'соседнее числительное для сравнения');
    });

    // ============================================================
    //  Словарь: кукла  (lib/lx.js)
    // ============================================================
    QUnit.module('lx: кукла');

    QUnit.test('Счётные формы: 5 кукол, а не «5 кукл»', function (assert) {
        assert.equal(chislitlx(1, 'кукла'), '1 кукла');
        assert.equal(chislitlx(2, 'кукла'), '2 куклы');
        assert.equal(chislitlx(5, 'кукла'), '5 кукол');
        assert.equal(chislitlx(11, 'кукла'), '11 кукол');
        assert.equal(chislitlx(21, 'кукла'), '21 кукла');
        assert.equal(chislitlx(1.5, 'кукла'), '1,5 куклы');
    });

    QUnit.test('Винительный падеж', function (assert) {
        assert.equal(chislitlx(1, 'кукла', 'v'), '1 куклу');
        assert.equal(chislitlx(2, 'кукла', 'v'), '2 куклы');
        assert.equal(chislitlx(5, 'кукла', 'v'), '5 кукол');
        assert.equal(chislitlx(21, 'кукла', 'v'), '21 куклу');
    });

    QUnit.test('Формы слова и признаки', function (assert) {
        var k = sklonlxkand('кукла');
        assert.equal(k.re, 'куклы');
        assert.equal(k.te, 'куклой');
        assert.equal(k.pe, 'кукле');
        assert.equal(k.im, 'куклы');
        assert.equal(k.rm, 'кукол', 'беглая гласная: кукла — кукол');
        assert.equal(k.dm, 'куклам');
        assert.equal(k.vm, 'кукол');
        assert.equal(k.tm, 'куклами');
        assert.equal(k.pm, 'куклах');
        assert.equal(k.rod, 1, 'женский род');
        assert.equal(k.skl, 1, 'первое склонение');
    });
};
