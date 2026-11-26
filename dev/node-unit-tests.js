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

    QUnit.test('Number.prototype.withoutFalsePrecision', function (assert) {
        assert.strictEqual((6.000000000000001).pow(2).withoutFalsePrecision(), 36, '(6.000000000000001)² → 36');
        assert.strictEqual((20 * (3).sqrt()).pow(2).withoutFalsePrecision(), 1200, '(20√3)² → 1200');
        assert.strictEqual((0.1 + 0.2).withoutFalsePrecision(), 0.3, '0.1 + 0.2 → 0.3');
        assert.strictEqual((2.5).withoutFalsePrecision(), 2.5, 'без ложной точности число не меняется');
        assert.strictEqual((-35.99999999999999).withoutFalsePrecision(), -36, 'отрицательное → -36');
    });

    QUnit.test('texsqrt, texsqrtfrac, texcbrt: ложная точность — как у целого', function (assert) {
        // Квадрат длины, посчитанный в плавающей точке, печатался как \sqrt{36} и \sqrt{1200}
        assert.equal((6.000000000000001).pow(2).texsqrt(1), '6', '(6.000000000000001)² → 6, а не \\sqrt{36}');
        assert.equal((35.99999999999999).texsqrt(), '6', '35.99999999999999 → 6');
        assert.equal((20 * (3).sqrt()).pow(2).texsqrt(1), '20\\sqrt{3}', '(20√3)² с выносом множителя → 20√3');
        assert.equal((20 * (3).sqrt()).pow(2).texsqrt(), (1200).texsqrt(), 'без выноса множителя — как у 1200');
        assert.equal((1199.9999999999998).texsqrtfrac(7), (1200).texsqrtfrac(7), 'texsqrtfrac: как у 1200, а не исключение');
        assert.equal((53.99999999999999).texcbrt(1), '3\\sqrt[3]{2}', 'texcbrt: как у 54, а не исключение');
        assert.equal((12).texsqrt(1), '2\\sqrt{3}', 'целое — как раньше');
        assert.equal((2.5).texsqrt(), '\\sqrt{2,5}', 'нецелое — как раньше');
    });

    QUnit.test('texsqrtfrac: знаменатель 1 не пишется', function (assert) {
        assert.equal((3).texsqrtfrac(1), '\\sqrt{3}', '√3, а не \\frac{\\sqrt{3}}{1}');
        assert.equal((36).texsqrtfrac(1), '6', '6, а не \\frac{6}{1}');
        assert.equal((2.9999999999999996).texsqrtfrac(1), '\\sqrt{3}', 'tg² 60°, посчитанный в плавающей точке');
        assert.equal((0.75).texsqrtfrac(1), '\\frac{\\sqrt{3}}{2}', 'дробь — как раньше');
        assert.equal((12).texsqrtfrac(5), '\\frac{2\\sqrt{15}}{5}', 'дробь — как раньше');
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

    QUnit.test('Array.prototype.pointsWithMidpoints', function (assert) {
        assert.deepEqual([10, 20, 30].pointsWithMidpoints(),
            [[0, 10], [0.5, 15], [1, 20], [1.5, 25], [2, 30]],
            'точки с полуцелыми серединами');
        assert.deepEqual([5].pointsWithMidpoints(), [[0, 5]], 'один элемент');
        assert.deepEqual([].pointsWithMidpoints(), [], 'пустой массив');
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
    //  Лексика: род глагола в прошедшем времени  (lib/func.js + lib/lxglagol.js)
    // ============================================================
    QUnit.module('selectVerbGender');

    QUnit.test('Обычные глаголы на -л', function (assert) {
        assert.equal(selectVerbGender('купил', 0), 'купил', 'мужской род - как есть');
        assert.equal(selectVerbGender('купил', 1), 'купила');
        assert.equal(selectVerbGender('купил', 2), 'купило');
        assert.equal(selectVerbGender('купил', 3), 'купили');
        assert.equal(selectVerbGender('выехал', 1), 'выехала');
    });

    QUnit.test('Возвратные глаголы на -лся', function (assert) {
        assert.equal(selectVerbGender('умылся', 0), 'умылся');
        assert.equal(selectVerbGender('умылся', 1), 'умылась');
        assert.equal(selectVerbGender('умылся', 2), 'умылось');
        assert.equal(selectVerbGender('умылся', 3), 'умылись');
        assert.equal(selectVerbGender('занялся', 1), 'занялась');
        assert.equal(selectVerbGender('спасся', 1), 'спаслась', 'регресс: -сся, а не -лся');
    });

    QUnit.test('Глаголы без -л, где правило даёт верную форму', function (assert) {
        assert.equal(selectVerbGender('мог', 1), 'могла');
        assert.equal(selectVerbGender('рос', 1), 'росла');
        assert.equal(selectVerbGender('тёр', 1), 'тёрла', 'ё сохраняется');
        assert.equal(selectVerbGender('мёрз', 2), 'мёрзло');
        assert.equal(selectVerbGender('умер', 3), 'умерли');
        assert.equal(selectVerbGender('лез', 1), 'лезла');
    });

    QUnit.test('Неправильные формы прошедшего времени', function (assert) {
        assert.equal(selectVerbGender('нёс', 1), 'несла');
        assert.equal(selectVerbGender('нёс', 2), 'несло');
        assert.equal(selectVerbGender('нёс', 3), 'несли');
        assert.equal(selectVerbGender('вёз', 1), 'везла');
        assert.equal(selectVerbGender('пёк', 1), 'пекла');
        assert.equal(selectVerbGender('жёг', 1), 'жгла');
        assert.equal(selectVerbGender('берёг', 1), 'берегла');
        assert.equal(selectVerbGender('шёл', 1), 'шла');
        assert.equal(selectVerbGender('вёл', 1), 'вела');
        assert.equal(selectVerbGender('цвёл', 1), 'цвела', 'цв+ёл берётся окончанием вёл: цв+ела');
        assert.equal(selectVerbGender('плёл', 3), 'плели');
        assert.equal(selectVerbGender('мёл', 1), 'мела');
        assert.equal(selectVerbGender('счёл', 1), 'сочла');
    });

    QUnit.test('Приставочные глаголы берутся из словаря автоматически', function (assert) {
        assert.equal(selectVerbGender('нашёл', 1), 'нашла');
        assert.equal(selectVerbGender('пришёл', 1), 'пришла');
        assert.equal(selectVerbGender('перешёл', 2), 'перешло');
        assert.equal(selectVerbGender('привёз', 1), 'привезла');
        assert.equal(selectVerbGender('принёс', 3), 'принесли');
        assert.equal(selectVerbGender('поджёг', 1), 'подожгла');
        assert.equal(selectVerbGender('приобрёл', 1), 'приобрела');
        assert.equal(selectVerbGender('свёл', 1), 'свела');
        assert.equal(selectVerbGender('стерёг', 1), 'стерегла');
    });

    QUnit.test('обрести: обрёл, приобрёл, изобрёл — по записи брёл', function (assert) {
        // приобрёл встречается в шаблонах: physoge2026/6/3488 (машина приобрела скорость)
        assert.equal(selectVerbGender('приобрёл', 1), 'приобрела', 'не приобрёла');
        assert.equal(selectVerbGender('приобрёл', 2), 'приобрело');
        assert.equal(selectVerbGender('приобрёл', 3), 'приобрели');
        assert.equal(selectVerbGender('приобрел', 1), 'приобрела', 'без ё — правилом');
        assert.equal(selectVerbGender('обрёл', 1), 'обрела');
        assert.equal(selectVerbGender('изобрёл', 3), 'изобрели');
    });

    QUnit.test('толок: о между л и к выпадает', function (assert) {
        assert.equal(selectVerbGender('толок', 1), 'толкла', 'не толокла');
        assert.equal(selectVerbGender('толок', 2), 'толкло');
        assert.equal(selectVerbGender('толок', 3), 'толкли');
        assert.equal(selectVerbGender('растолок', 1), 'растолкла');
        assert.equal(selectVerbGender('истолок', 3), 'истолкли');
        assert.equal(selectVerbGender('волок', 1), 'волокла', 'а волок — правилом');
    });

    QUnit.test('Неправильные формы без ё', function (assert) {
        assert.equal(selectVerbGender('пошел', 1), 'пошла', 'ё в шаблонах пишут не всегда');
        assert.equal(selectVerbGender('пришел', 3), 'пришли');
        assert.equal(selectVerbGender('вышел', 1), 'вышла', 'после ударной вы- ё не бывает');
        assert.equal(selectVerbGender('вышел', 2), 'вышло');
        assert.equal(selectVerbGender('вычел', 1), 'вычла');
        assert.equal(selectVerbGender('расчёл', 1), 'разочла', 'не ра+сочла');
        assert.equal(selectVerbGender('расчел', 3), 'разочли');
        assert.equal(selectVerbGender('учел', 1), 'учла');
        assert.equal(selectVerbGender('счел', 1), 'сочла');
        assert.equal(selectVerbGender('выжег', 1), 'выжгла');
        assert.equal(selectVerbGender('зажег', 3), 'зажгли');
        assert.equal(selectVerbGender('разошелся', 1), 'разошлась', 'возвратный без ё');
    });

    QUnit.test('Без ё правило верно и без словаря', function (assert) {
        assert.equal(selectVerbGender('вел', 1), 'вела');
        assert.equal(selectVerbGender('вывел', 1), 'вывела');
        assert.equal(selectVerbGender('нес', 1), 'несла');
        assert.equal(selectVerbGender('вынес', 3), 'вынесли');
        assert.equal(selectVerbGender('вез', 1), 'везла');
        assert.equal(selectVerbGender('лег', 1), 'легла');
        assert.equal(selectVerbGender('берег', 1), 'берегла');
        assert.equal(selectVerbGender('греб', 1), 'гребла');
        assert.equal(selectVerbGender('мел', 1), 'мела');
    });

    QUnit.test('Неправильные возвратные глаголы', function (assert) {
        assert.equal(selectVerbGender('нёсся', 0), 'нёсся');
        assert.equal(selectVerbGender('нёсся', 1), 'неслась');
        assert.equal(selectVerbGender('нёсся', 2), 'неслось');
        assert.equal(selectVerbGender('нёсся', 3), 'неслись');
        assert.equal(selectVerbGender('вёзся', 1), 'везлась');
    });

    QUnit.test('Род из объекта, числа, строки и слова', function (assert) {
        assert.equal(selectVerbGender('купил', { rod: 1 }), 'купила', 'объект с полем rod');
        assert.equal(selectVerbGender('купил', { rod: 2 }), 'купило');
        assert.equal(selectVerbGender('купил', '1'), 'купила', 'род строкой');
        assert.equal(selectVerbGender('купил', '0'), 'купил', 'род нулём строкой');
        assert.equal(selectVerbGender('купил', 'час'), 'купил', "lx['час'].rod === 0");
        assert.equal(selectVerbGender('нёс', 'конференция'), 'несла', 'род определяется по словарю');
        assert.equal(selectVerbGender('нёс', sklonlxkand('конференция')), 'несла', 'Word-объект');
    });

    QUnit.test('Аргументы обязательны', function (assert) {
        assert.throws(function () { selectVerbGender(); }, /Verb must be defined/);
        assert.throws(function () { selectVerbGender('купил'); }, /nounOrRod must be defined/);
    });

    QUnit.test('Глаголы на -ёк: весь класс -ечь одной записью', function (assert) {
        assert.equal(selectVerbGender('пёк', 1), 'пекла');
        assert.equal(selectVerbGender('испёк', 1), 'испекла');
        assert.equal(selectVerbGender('сёк', 1), 'секла');
        assert.equal(selectVerbGender('отсёк', 1), 'отсекла');
        assert.equal(selectVerbGender('пересёк', 1), 'пересекла');
        assert.equal(selectVerbGender('тёк', 1), 'текла');
        assert.equal(selectVerbGender('истёк', 1), 'истекла');
        assert.equal(selectVerbGender('утёк', 1), 'утекла');
        assert.equal(selectVerbGender('стёк', 1), 'стекла');
        assert.equal(selectVerbGender('протёк', 1), 'протекла');
        assert.equal(selectVerbGender('отёк', 1), 'отекла');
        assert.equal(selectVerbGender('влёк', 1), 'влекла');
        assert.equal(selectVerbGender('увлёк', 1), 'увлекла');
        assert.equal(selectVerbGender('привлёк', 1), 'привлекла');
        assert.equal(selectVerbGender('извлёк', 1), 'извлекла');
        assert.equal(selectVerbGender('развлёк', 1), 'развлекла');
        assert.equal(selectVerbGender('облёк', 1), 'облекла');
        assert.equal(selectVerbGender('изрёк', 1), 'изрекла');
        assert.equal(selectVerbGender('нарёк', 1), 'нарекла');
        assert.equal(selectVerbGender('прорёк', 1), 'прорекла');
        assert.equal(selectVerbGender('обрёк', 1), 'обрекла');
    });

    QUnit.test('Глаголы на -ёк: средний род, множественное число, возвратные', function (assert) {
        assert.equal(selectVerbGender('извлёк', 2), 'извлекло');
        assert.equal(selectVerbGender('истёк', 3), 'истекли');
        assert.equal(selectVerbGender('сёк', 0), 'сёк', 'мужской род не трогаем');
        assert.equal(selectVerbGender('отрёкся', 1), 'отреклась');
        assert.equal(selectVerbGender('увлёкся', 1), 'увлеклась');
        assert.equal(selectVerbGender('облёкся', 2), 'облеклось');
        assert.equal(selectVerbGender('извлёкся', 3), 'извлеклись');
    });

    QUnit.test('Формы без ё и ё под ударением на основе', function (assert) {
        assert.equal(selectVerbGender('выпек', 1), 'выпекла', 'ударение на приставке, ё нет');
        assert.equal(selectVerbGender('высек', 1), 'высекла');
        assert.equal(selectVerbGender('вытек', 1), 'вытекла');
        assert.equal(selectVerbGender('тёр', 1), 'тёрла', 'ё на основе сохраняется');
        assert.equal(selectVerbGender('пёр', 1), 'пёрла');
        assert.equal(selectVerbGender('мёрз', 1), 'мёрзла');
        assert.equal(selectVerbGender('блёк', 1), 'блёкла', 'блёкнуть: ё сохраняется, хотя окончание -ёк');
        assert.equal(selectVerbGender('поблёк', 1), 'поблёкла');
        assert.equal(selectVerbGender('поблёк', 3), 'поблёкли');
    });

    QUnit.test('отпёр: ё только в мужском роде', function (assert) {
        assert.equal(selectVerbGender('отпёр', 1), 'отперла');
        assert.equal(selectVerbGender('отпёр', 2), 'отперло');
        assert.equal(selectVerbGender('отпёр', 3), 'отперли');
        assert.equal(selectVerbGender('отпер', 1), 'отперла', 'без ё — правилом');
        assert.equal(selectVerbGender('отпёрся', 1), 'отперлась');
        assert.equal(selectVerbGender('упёр', 1), 'упёрла', 'а здесь ё сохраняется');
        assert.equal(selectVerbGender('запер', 1), 'заперла');
    });

    QUnit.test('Глаголы на -ёг: лёг, берёг и жёг ведут себя по-разному', function (assert) {
        assert.equal(selectVerbGender('лёг', 1), 'легла');
        assert.equal(selectVerbGender('лёг', 2), 'легло');
        assert.equal(selectVerbGender('лёг', 3), 'легли');
        assert.equal(selectVerbGender('прилёг', 1), 'прилегла');
        assert.equal(selectVerbGender('залёг', 1), 'залегла');
        assert.equal(selectVerbGender('налёг', 1), 'налегла');
        assert.equal(selectVerbGender('слёг', 1), 'слегла');
        assert.equal(selectVerbGender('жёг', 1), 'жгла', 'здесь гласная выпадает');
        assert.equal(selectVerbGender('сжёг', 1), 'сожгла', 'после приставки на согласный — о');
        assert.equal(selectVerbGender('поджёг', 1), 'подожгла');
        assert.equal(selectVerbGender('обжёг', 2), 'обожгло');
        assert.equal(selectVerbGender('разжёг', 3), 'разожгли');
        assert.equal(selectVerbGender('отжёг', 1), 'отожгла');
        assert.equal(selectVerbGender('изжёг', 1), 'изожгла');
        assert.equal(selectVerbGender('сжег', 1), 'сожгла', 'и без ё');
        assert.equal(selectVerbGender('поджег', 1), 'подожгла');
        assert.equal(selectVerbGender('зажёг', 1), 'зажгла', 'после приставки на гласный о нет');
        assert.equal(selectVerbGender('пережёг', 1), 'пережгла');
        assert.equal(selectVerbGender('обжёгся', 1), 'обожглась');
        assert.equal(selectVerbGender('берёг', 1), 'берегла');
        assert.equal(selectVerbGender('стерёг', 1), 'стерегла');
        assert.equal(selectVerbGender('сберёг', 1), 'сберегла');
        assert.equal(selectVerbGender('пренебрёг', 1), 'пренебрегла');
    });

    QUnit.test('Возвратные глаголы на -ёг', function (assert) {
        assert.equal(selectVerbGender('улёгся', 0), 'улёгся');
        assert.equal(selectVerbGender('улёгся', 1), 'улеглась');
        assert.equal(selectVerbGender('улёгся', 2), 'улеглось');
        assert.equal(selectVerbGender('улёгся', 3), 'улеглись');
        assert.equal(selectVerbGender('берёгся', 1), 'береглась');
        assert.equal(selectVerbGender('жёгся', 1), 'жглась');
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

    // genPifag() выбирает тройку через sl(), то есть через Math.random:
    // на время теста подставляется генератор с постоянным зерном,
    // чтобы тест каждый раз проверял одни и те же тройки
    function withSeedGenPifag(seed, fn) {
        var originalRandom = Math.random;
        Math.random = require('seedrandom')(seed);
        try {
            fn();
        } finally {
            Math.random = originalRandom;
        }
    }

    QUnit.test('genPifag: тройка по умолчанию — гипотенуза до 125, катеты по возрастанию', function (assert) {
        withSeedGenPifag('genPifag по умолчанию', function () {
            for (var i = 0; i < 100; i++) {
                var t = genPifag();
                assert.ok(t[0] > 0 && t[0] < t[1] && t[2] <= 125 && t[0] * t[0] + t[1] * t[1] === t[2] * t[2], 'тройка ' + t);
            }
        });
        assert.ok(genPifag.cache.maxSide >= 125, 'кэш покрывает гипотенузы до 125');
        assert.equal(genPifag.cache.triples.filter(function (t) { return t[2] <= 125; }).length, 71, 'все 71 тройка с гипотенузой до 125');
        [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]].forEach(function (base) {
            for (var k = 1; k <= 5; k++) {
                var scaled = JSON.stringify(base.map(function (x) { return k * x; }));
                assert.ok(genPifag.cache.triples.some(function (t) { return JSON.stringify(t) === scaled; }), 'прежняя тройка ' + scaled + ' есть в кэше');
            }
        });
    });

    QUnit.test('genPifag(maxSide): только тройки с гипотенузой не больше maxSide', function (assert) {
        var seen = {};
        withSeedGenPifag('genPifag(65)', function () {
            for (var i = 0; i < 2000; i++) {
                seen[genPifag(65).join()] = true;
            }
        });
        var allowed = genPifag.cache.triples.filter(function (t) { return t[2] <= 65; }).map(function (t) { return t.join(); });
        assert.equal(allowed.length, 31, 'с гипотенузой до 65 ровно 31 тройка');
        assert.ok(Object.keys(seen).every(function (t) { return allowed.indexOf(t) !== -1; }), 'выпадают только тройки с гипотенузой до 65');
        assert.ok(seen['16,63,65'] && seen['20,21,29'], 'в том числе 16-63-65 и 20-21-29, которых нет среди кратных om.pifagtr');
        assert.deepEqual(genPifag(5), [3, 4, 5], 'genPifag(5) — только 3-4-5');
    });

    QUnit.test('genPifag: кэш достраивается, тройка — копия', function (assert) {
        withSeedGenPifag('genPifag(1000)', function () {
            var t = genPifag(1000);
            assert.ok(t[2] <= 1000 && t[0] * t[0] + t[1] * t[1] === t[2] * t[2], 'тройка ' + t);
            assert.ok(genPifag.cache.maxSide >= 1000, 'кэш покрывает гипотенузы до 1000');
            assert.equal(genPifag.cache.triples.filter(function (t) { return t[2] <= 1000; }).length, 881, 'все 881 тройка с гипотенузой до 1000');
            assert.ok(genPifag.cache.triples.every(function (t, i, a) { return i === 0 || a[i - 1][2] <= t[2]; }), 'кэш отсортирован по гипотенузе');
            assert.ok(genPifag(30)[2] <= 30, 'после расширения малые maxSide работают');
        });
        var copy = genPifag(5);
        copy[0] = 100;
        assert.deepEqual(genPifag(5), [3, 4, 5], 'изменение возвращённой тройки не портит кэш');
    });

    QUnit.test('genPifag: неверный maxSide', function (assert) {
        assert.throws(function () { genPifag(4); }, RangeError, 'меньше 5');
        assert.throws(function () { genPifag(NaN); }, RangeError, 'NaN');
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
    //  RectilinearSolid  (lib/rectilinearSolid.js)
    // ============================================================
    QUnit.module('RectilinearSolid');

    QUnit.test('Параллелепипед', function (assert) {
        var box = new RectilinearSolid([[0, 0, 0, 2, 3, 4]]);
        assert.equal(box.volume(), 24, 'V = 2·3·4');
        assert.equal(box.surfaceArea(), 52, 'S = 2(6 + 8 + 12)');
        assert.equal(box.edges().length, 12, '12 рёбер');
    });

    QUnit.test('Касающиеся и перекрывающиеся параллелепипеды', function (assert) {
        var halves = new RectilinearSolid([[0, 0, 0, 1, 3, 4], [1, 0, 0, 2, 3, 4]]);
        assert.equal(halves.volume(), 24, 'две половины дают тот же объём');
        assert.equal(halves.surfaceArea(), 52, 'общая грань не входит в поверхность');
        assert.equal(halves.edges().length, 12, 'шов по общей грани — не ребро');
        var overlap = new RectilinearSolid([[0, 0, 0, 2, 3, 4], [1, 1, 1, 2, 2, 2]]);
        assert.equal(overlap.volume(), 24, 'вложенный параллелепипед не меняет объём');
    });

    QUnit.test('Детали из открытого банка ФИПИ', function (assert) {
        // 02985D: Г-образный профиль, объём 20
        var l = new RectilinearSolid([[0, 0, 0, 2, 2, 4], [2, 0, 0, 3, 2, 2]]);
        assert.equal(l.volume(), 20, 'Г-образная деталь: V = 20');
        assert.equal(l.edges().length, 18, 'Г-образная деталь: 18 рёбер');
        // 510136 (Решу ЕГЭ): параллелепипед 2×2×3 с вырезом 1×1 по всей высоте, объём 9
        var notch = new RectilinearSolid([[0, 0, 0, 1, 2, 3], [1, 1, 0, 2, 2, 3]]);
        assert.equal(notch.volume(), 9, 'деталь с вырезом: V = 9');
        assert.equal(notch.surfaceArea(), 2 * (4 + 6 + 6) - 2, 'деталь с вырезом: S = 30');
        // 6DF52F: «С»-образная деталь 3×4×6 с выемкой глубиной 2 и высотой 3, площадь 108
        var c = new RectilinearSolid([[0, 0, 0, 3, 4, 2], [0, 2, 2, 3, 4, 5], [0, 0, 5, 3, 4, 6]]);
        assert.equal(c.surfaceArea(), 108, '«С»-образная деталь: S = 108');
    });

    QUnit.test('Видимость точек', function (assert) {
        var box = new RectilinearSolid([[0, 0, 0, 2, 2, 2]]);
        var toViewer = [0.4, -1, 0.4];
        assert.notOk(box.isPointHidden([1, 0, 1], toViewer), 'точка передней грани видна');
        assert.notOk(box.isPointHidden([2, 0, 2], toViewer), 'передняя верхняя правая вершина видна');
        assert.ok(box.isPointHidden([0, 2, 0], toViewer), 'задняя нижняя левая вершина не видна');
        assert.ok(box.isPointHidden([1, 2, 0], toViewer), 'точка заднего нижнего ребра не видна');
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
        vm.runInContext('this.Cube = Cube; this.Parallelepiped = Parallelepiped; this.RegularPyramid = RegularPyramid; this.RegularPrism = RegularPrism;', context);
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
        var faces = cube.faces;
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
        var faces = cube.faces;
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
        var faces = cube.faces;
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

    QUnit.test('Parallelepiped.faces: грани согласованы с connectionMatrix и verticesOfFigure', function (assert) {
        var par = new geometry.Parallelepiped({ depth: 3, height: 4, width: 5 });
        assert.deepEqual(par.faces,
            [[0, 1, 2, 3], [5, 6, 7, 4], [0, 1, 6, 5], [1, 2, 7, 6], [2, 3, 4, 7], [3, 0, 5, 4]],
            'два основания и четыре боковые грани; верхнее основание начинается с вершины над D');
        assert.equal(par.faces.length, 6, 'шесть граней');
        par.connectionMatrix.forEach(function (row, i) {
            row.forEach(function (value, j) {
                if (!value) { return; }
                var edge = [i + 1, j];
                var incident = par.faces.filter(function (face) {
                    return edge.every(function (v) { return face.includes(v); });
                });
                assert.equal(incident.length, 2, 'ребро ' + (i + 1) + '-' + j + ' лежит в двух гранях');
            });
        });
        var v = par.verticesOfFigure;
        var vis = geometry.facesVisibility(v, project(v), par.faces);
        assert.ok(vis[1], 'верхнее основание видно (взгляд сверху)');
        assert.notOk(vis[0], 'нижнее основание не видно');
        var dashed = geometry.dashHiddenEdges(par.connectionMatrix, par.faces, vis, [5, 4]);
        var dashedCount = 0;
        dashed.forEach(function (row) {
            row.forEach(function (value) { if (Array.isArray(value)) { dashedCount++; } });
        });
        assert.ok(dashedCount > 0, 'невидимые рёбра рисуются пунктиром');
        assert.deepEqual(par.connectionMatrix[0], [1], 'исходная матрица не изменилась');
        assert.deepEqual(new geometry.Cube(4).faces, par.faces, 'Cube наследует грани параллелепипеда');
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
    //  Canvas: дуга угла и значок прямого угла  (lib/canvas.js)
    // ============================================================
    QUnit.module('Canvas: arcBetweenSegments');

    // Что нарисовал arcBetweenSegments для угла при вершине (0, 0) между лучами
    // под углами a и b (в радианах): 'дуга' или 'прямой' (два отрезка)
    function arcKind(a, b) {
        var calls = [];
        var ctx = {
            drawArc: function () { calls.push('дуга'); },
            drawLineAtAngle: function () { calls.push('отрезок'); },
        };
        CanvasRenderingContext2D.prototype.arcBetweenSegments.call(ctx,
            [10 * Math.cos(a), 10 * Math.sin(a), 0, 0, 10 * Math.cos(b), 10 * Math.sin(b)], 5);
        return calls.join() === 'дуга' ? 'дуга' : calls.join() === 'отрезок,отрезок' ? 'прямой' : calls.join();
    }

    QUnit.test('arcBetweenSegments: значок прямого угла — по величине угла, а не по направлениям сторон', function (assert) {
        var deg = Math.PI / 180;
        assert.equal(arcKind(0, 90 * deg), 'прямой', 'прямой угол со сторонами по осям');
        assert.equal(arcKind(45 * deg, -45 * deg), 'прямой', 'прямой угол, повёрнутый на 45°');
        assert.equal(arcKind(170 * deg, 260 * deg), 'прямой', 'прямой угол, стороны по разные стороны от оси x');
        assert.equal(arcKind(0.2, -1.77), 'дуга', 'угол ≈113° — дуга (раньше рисовался как прямой)');
        assert.equal(arcKind(10 * deg, 70 * deg), 'дуга', 'острый угол 60° — дуга');
        assert.equal(arcKind(0, 150 * deg), 'дуга', 'тупой угол 150° — дуга');
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
    //  Canvas: дуга угла по массиву точек  (lib/canvas.js)
    // ============================================================
    QUnit.module('Canvas: arcBetweenSegments — вход массивом точек');

    // Какие вызовы рисования сделал arcBetweenSegments
    function arcBetweenSegmentsCalls(coordinates, radius, drawRightAngle) {
        var calls = [];
        var ctx = {
            drawArc: function () { calls.push(['arc'].concat(Array.prototype.slice.call(arguments))); },
            drawLineAtAngle: function () { calls.push(['line'].concat(Array.prototype.slice.call(arguments))); },
        };
        CanvasRenderingContext2D.prototype.arcBetweenSegments.call(ctx, coordinates, radius, drawRightAngle);
        return calls;
    }

    QUnit.test('ctx.arcBetweenSegments: три точки равнозначны плоскому массиву координат', function (assert) {
        var points = [{ x: 30, y: 10 }, { x: -20, y: -40 }, { x: 50, y: -40 }];
        var flat = [30, 10, -20, -40, 50, -40];
        assert.deepEqual(arcBetweenSegmentsCalls(points), arcBetweenSegmentsCalls(flat), 'умолчание радиуса: вызовы совпадают');
        assert.deepEqual(arcBetweenSegmentsCalls(points, 15), arcBetweenSegmentsCalls(flat, 15), 'радиус передаётся как прежде');
        assert.deepEqual(arcBetweenSegmentsCalls(points, 15, true), arcBetweenSegmentsCalls(flat, 15, true), 'значок прямого угла: вызовы совпадают');
        assert.deepEqual(arcBetweenSegmentsCalls(points, 15, true).map(function (c) { return c[0]; }), ['line', 'line'],
            'drawRightAngle: два отрезка, а не дуга');
    });

    QUnit.test('ctx.arcBetweenSegments: четыре точки — угол между отрезками', function (assert) {
        // Отрезки (0,0)-(6,0) и (0,-3)-(6,3) пересекаются в (3,0) под углом 45 градусов
        var points = [{ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 0, y: -3 }, { x: 6, y: 3 }];
        var flat = [0, 0, 6, 0, 0, -3, 6, 3];
        assert.deepEqual(arcBetweenSegmentsCalls(points, 12), arcBetweenSegmentsCalls(flat, 12), 'вызовы совпадают');
        assert.deepEqual(arcBetweenSegmentsCalls(points, 12)[0].slice(0, 4), ['arc', 3, 0, 12], 'дуга радиуса 12 при точке пересечения отрезков (3, 0)');
    });

    QUnit.test('ctx.arcBetweenSegmentsCount пробрасывает массив точек без изменений', function (assert) {
        var calls = [];
        var ctx = {
            arcBetweenSegments: function (coordinates, radius) { calls.push([coordinates, radius]); },
        };
        var points = [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }];
        CanvasRenderingContext2D.prototype.arcBetweenSegmentsCount.call(ctx, points, 20, 2);
        assert.deepEqual(calls, [[points, 20], [points, 25]], 'точки уходят в arcBetweenSegments как есть, шаг радиуса 5');
    });

    QUnit.test('ctx.arcBetweenSegments: не три и не четыре точки — ошибка', function (assert) {
        var five = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 2, y: 2 }];
        assert.throws(function () { arcBetweenSegmentsCalls(five); }, /три или четыре точки, получено 5/, 'пять точек');
        assert.throws(function () { arcBetweenSegmentsCalls(five.slice(0, 2)); }, /получено 2/, 'две точки');
        assert.throws(function () { arcBetweenSegmentsCalls([0, 0, 1, 0, 1, 1, 0, 1, 2, 2]); }, /получено 5/, 'плоский массив из пяти точек');
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
    //  Canvas: внешний угол при вершине  (lib/canvas.js)
    // ============================================================
    QUnit.module('Canvas: drawExternalAngle');

    function externalAngleStubCtx(calls) {
        return {
            strokeStyle: '#123456',
            drawLineAtAngle: function (x, y, angle, length) {
                calls.push(['ray', x, y, angle, length]);
                return { x: x + Math.cos(angle) * length, y: y + Math.sin(angle) * length };
            },
            arcBetweenSegments: function (coordinates, radius) {
                calls.push(['arc', coordinates, radius, this.strokeStyle]);
            },
        };
    }

    QUnit.test('ctx.drawExternalAngle продлевает сторону за вершину и рисует дугу до второй стороны', function (assert) {
        assert.ok(typeof CanvasRenderingContext2D.prototype.drawExternalAngle === 'function', 'метод drawExternalAngle определён');
        var calls = [];
        var ctx = externalAngleStubCtx(calls);
        var ray = CanvasRenderingContext2D.prototype.drawExternalAngle.call(
            ctx, { x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 8 }, { radius: 15, rayLength: 40 }
        );
        assert.deepEqual(calls[0], ['ray', 10, 0, 0, 40], 'продление из вершины вдоль стороны на 40');
        assert.ok(Math.abs(ray.x - 50) < 1e-9 && Math.abs(ray.y) < 1e-9, 'возвращается конец продления');
        assert.equal(calls[1][0], 'arc', 'дуга нарисована');
        assert.deepEqual(calls[1][1].slice(0, 4), [5, 8, 10, 0], 'дуга между второй стороной и вершиной');
        assert.ok(Math.abs(calls[1][1][4] - 50) < 1e-9 && Math.abs(calls[1][1][5]) < 1e-9, 'третья точка дуги — конец продления');
        assert.equal(calls[1][2], 15, 'радиус дуги из options');
    });

    QUnit.test('ctx.drawExternalAngle: направление продления берётся из стороны, значения по умолчанию', function (assert) {
        var calls = [];
        var ctx = externalAngleStubCtx(calls);
        CanvasRenderingContext2D.prototype.drawExternalAngle.call(ctx, { x: 1, y: 1 }, { x: 4, y: 5 }, { x: 0, y: 0 });
        assert.deepEqual(calls[0].slice(1, 3), [4, 5], 'продление начинается в вершине');
        assert.ok(Math.abs(calls[0][3] - Math.atan2(4, 3)) < 1e-12, 'угол продления — направление previous→vertex');
        assert.equal(calls[0][4], 40, 'длина продления по умолчанию 40');
        assert.equal(calls[1][2], 20, 'радиус дуги по умолчанию 20');
    });

    QUnit.test('ctx.drawExternalAngle: arcStrokeStyle применяется к дуге и восстанавливается', function (assert) {
        var calls = [];
        var ctx = externalAngleStubCtx(calls);
        CanvasRenderingContext2D.prototype.drawExternalAngle.call(
            ctx, { x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 8 }, { arcStrokeStyle: '#abcdef' }
        );
        assert.equal(calls[1][3], '#abcdef', 'дуга нарисована цветом arcStrokeStyle');
        assert.equal(ctx.strokeStyle, '#123456', 'после вызова strokeStyle прежний');
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
    //  Canvas: начало координат данных drawGridWithArrows  (lib/canvas.js)
    // ============================================================
    QUnit.module('Canvas: drawGridWithArrows origin');

    // Стаб следит за преобразованием координат и запоминает стрелки осей
    // в координатах контекста на момент вызова drawGridWithArrows.
    function gridTransformStubCtx(arrows) {
        var st = { sx: 1, sy: 1, tx: 0, ty: 0 };
        var stack = [];
        return {
            lineWidth: 0, font: '', textAlign: '', textBaseline: '',
            save: function () { stack.push({ sx: st.sx, sy: st.sy, tx: st.tx, ty: st.ty }); },
            restore: function () {
                var s = stack.pop();
                st.sx = s.sx; st.sy = s.sy; st.tx = s.tx; st.ty = s.ty;
            },
            translate: function (x, y) { st.tx += st.sx * x; st.ty += st.sy * y; },
            scale: function (x, y) { st.sx *= x; st.sy *= y; },
            setLineDash: function () {},
            fillText: function () {},
            irregularGrid: function () {},
            drawArrow: function (x1, y1, x2, y2) {
                arrows.push([st.tx + st.sx * x1, st.ty + st.sy * y1, st.tx + st.sx * x2, st.ty + st.sy * y2]);
            },
            drawLine: function () {},
        };
    }

    QUnit.test('drawGridWithArrows возвращает точку пересечения осей', function (assert) {
        assert.ok(typeof CanvasRenderingContext2D.prototype.drawGridWithArrows === 'function', 'метод drawGridWithArrows определён');
        var arrows = [];
        var ctx = gridTransformStubCtx(arrows);
        var origin = CanvasRenderingContext2D.prototype.drawGridWithArrows.call(ctx, {
            gridWidth: 460, gridHeight: 440, cellWidth: 40, cellHeight: 40,
            minX: 0, maxX: 12, minY: 90, maxY: 130, stepY: 5,
        });
        assert.deepEqual(origin, { originX: 40, originY: 360 }, 'начало — (cellWidth, gridHeight - 2 * cellHeight)');
        assert.equal(arrows[0][1], origin.originY, 'ось X лежит на возвращённой ординате');
        assert.equal(arrows[0][3], origin.originY, 'ось X горизонтальна');
        assert.equal(arrows[1][0], origin.originX, 'ось Y лежит на возвращённой абсциссе');
        assert.equal(arrows[1][2], origin.originX, 'ось Y вертикальна');
    });

    QUnit.test('начало координат по умолчанию', function (assert) {
        var arrows = [];
        var ctx = gridTransformStubCtx(arrows);
        var origin = CanvasRenderingContext2D.prototype.drawGridWithArrows.call(ctx, {});
        assert.deepEqual(origin, { originX: 30, originY: 330 }, 'cellWidth 30, gridHeight 390 → (30, 330)');
        assert.equal(arrows[0][1], origin.originY, 'ось X на той же ординате');
        assert.equal(arrows[1][0], origin.originX, 'ось Y на той же абсциссе');
    });

    QUnit.test('неквадратная клетка: originX от cellWidth, originY от cellHeight', function (assert) {
        var arrows = [];
        var ctx = gridTransformStubCtx(arrows);
        var origin = CanvasRenderingContext2D.prototype.drawGridWithArrows.call(ctx, {
            gridWidth: 200, gridHeight: 300, cellWidth: 25, cellHeight: 20, maxX: 8, maxY: 10,
        });
        assert.deepEqual(origin, { originX: 25, originY: 260 }, '(25, 300 - 2 * 20)');
        assert.equal(arrows[0][1], origin.originY, 'ось X на той же ординате');
        assert.equal(arrows[1][0], origin.originX, 'ось Y на той же абсциссе');
    });

    QUnit.test('minX/minY подписывают засечки, но начало координат не сдвигают', function (assert) {
        var arrows1 = [], arrows2 = [];
        var o1 = CanvasRenderingContext2D.prototype.drawGridWithArrows.call(gridTransformStubCtx(arrows1), {
            gridWidth: 200, gridHeight: 300, cellWidth: 25, cellHeight: 20, minX: 0, minY: 0, maxX: 8, maxY: 10,
        });
        var o2 = CanvasRenderingContext2D.prototype.drawGridWithArrows.call(gridTransformStubCtx(arrows2), {
            gridWidth: 200, gridHeight: 300, cellWidth: 25, cellHeight: 20, minX: 5, minY: 90, maxX: 13, maxY: 130,
        });
        assert.deepEqual(o2, o1, 'начало координат зависит только от размеров сетки и клетки');
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

    // ============================================================
    //  Проекция параллелепипеда  (lib/canvas.js)
    // ============================================================
    QUnit.module('parallelepipedVertices, parallelepipedSize');

    // lib/canvas.js, как и lib/figure.js, не отдаёт свои функции в global,
    // поэтому загружаем его в отдельный контекст
    var canvasLib = (function () {
        var vm = require('vm');
        var fs = require('fs');
        var path = require('path');
        var context = vm.createContext({
            Math: Math,
            CanvasRenderingContext2D: { prototype: {} },
            om: { primaryBrandColors: ['#000000'] },
        });
        vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'lib', 'canvas.js'), 'utf8'), context);
        return context;
    })();

    function assertVertexClose(assert, actual, expected, message) {
        assert.ok(Math.abs(actual[0] - expected[0]) < 1e-12 && Math.abs(actual[1] - expected[1]) < 1e-12,
            message + ': ожидалось [' + expected + '], получено [' + actual + ']');
    }

    QUnit.test('parallelepipedVertices: глубина уходит на depth*cos(angle) вправо и depth/2 вверх', function (assert) {
        var v = canvasLib.parallelepipedVertices({ width: 3, height: 5, depth: 2, angle: Math.PI / 4 });
        var dx = Math.SQRT2, dy = 1;
        assert.equal(v.length, 8, 'восемь вершин');
        assertVertexClose(assert, v[5], [0, 0], 'передняя нижняя левая - начало координат');
        assertVertexClose(assert, v[6], [3, 0], 'передняя нижняя правая');
        assertVertexClose(assert, v[1], [0, 5], 'передняя верхняя левая');
        assertVertexClose(assert, v[2], [3, 5], 'передняя верхняя правая');
        assertVertexClose(assert, v[4], [dx, dy], 'задняя нижняя левая');
        assertVertexClose(assert, v[0], [dx, 5 + dy], 'задняя верхняя левая');
        assertVertexClose(assert, v[7], [3 + dx, dy], 'задняя нижняя правая');
        assertVertexClose(assert, v[3], [3 + dx, 5 + dy], 'задняя верхняя правая');
    });

    QUnit.test('parallelepipedVertices: угол нормализуется, как в drawParallelepiped', function (assert) {
        var expected = [2 * Math.cos(Math.PI / 6), 1];
        assertVertexClose(assert, canvasLib.parallelepipedVertices({ width: 1, height: 1, depth: 2 })[4],
            expected, 'без угла - π/6');
        assertVertexClose(assert, canvasLib.parallelepipedVertices({ width: 1, height: 1, depth: 2, angle: Math.PI / 2 })[4],
            expected, 'π/2 заменяется на π/6');
        assertVertexClose(assert, canvasLib.parallelepipedVertices({ width: 1, height: 1, depth: 2, angle: Math.PI + Math.PI / 6 })[4],
            expected, 'угол больше π уменьшается на π');
    });

    QUnit.test('parallelepipedVertices и parallelepipedSize не меняют переданный объект', function (assert) {
        var box = { width: 3, height: 5, depth: 2, angle: 40 };
        canvasLib.parallelepipedVertices(box);
        canvasLib.parallelepipedSize(box);
        assert.equal(box.angle, 40, 'угол остался как был');
        var noAngle = { width: 3, height: 5, depth: 2 };
        canvasLib.parallelepipedSize(noAngle);
        assert.ok(!('angle' in noAngle), 'угол не дописан');
    });

    QUnit.test('drawParallelepiped по-прежнему записывает нормализованный угол в o', function (assert) {
        var ctx = { setLineDash: function () {}, drawLine: function () {} };
        var box = { width: 3, height: 5, depth: 2, angle: 40, strokeStyle: '#000000', diagonalStrokeStyle: '#000000' };
        canvasLib.CanvasRenderingContext2D.prototype.drawParallelepiped.call(ctx, box);
        assert.ok(Math.abs(box.angle - (40 - 12 * Math.PI)) < 1e-12, '40 → 40 - 12π');
        assert.equal(canvasLib.parallelepipedAngle(undefined), Math.PI / 6, 'без угла - π/6');
    });

    QUnit.test('parallelepipedSize: габариты проекции', function (assert) {
        var size = canvasLib.parallelepipedSize({ width: 3, height: 5, depth: 2, angle: Math.PI / 4 });
        assert.ok(Math.abs(size.width - (3 + Math.SQRT2)) < 1e-12, 'ширина 3 + √2');
        assert.ok(Math.abs(size.height - 6) < 1e-12, 'высота 5 + 1');
        // При угле больше π/2 глубина уходит влево, габарит всё равно положительный
        var left = canvasLib.parallelepipedSize({ width: 3, height: 5, depth: 2, angle: 2 * Math.PI / 3 });
        assert.ok(Math.abs(left.width - 4) < 1e-12, 'глубина влево: ширина 3 + 1');
        assert.ok(Math.abs(left.height - 6) < 1e-12, 'высота от знака косинуса не зависит');
        assert.equal(size.minX, 0, 'глубина вправо: габарит начинается в нуле');
        assert.equal(size.minY, 0, 'по вертикали габарит начинается в нуле');
        assert.ok(Math.abs(left.minX + 1) < 1e-12, 'глубина влево: габарит начинается в x = -1');
        // angle: 40, как в большинстве шаблонов: 40 - 12π ≈ 2,30, глубина влево
        var common = canvasLib.parallelepipedSize({ width: 25, height: 25, depth: 12.5, angle: 40 });
        assert.ok(Math.abs(common.minX - 12.5 * Math.cos(40 - 12 * Math.PI)) < 1e-12, 'angle: 40 - minX = depth·cos(angle) < 0');
        assert.ok(Math.abs(common.minX + common.width - 25) < 1e-12, 'правый край - передняя правая грань');
    });

    QUnit.test('drawParallelepiped рисует рёбра между теми же вершинами', function (assert) {
        var v = canvasLib.parallelepipedVertices({ width: 3, height: 5, depth: 2, angle: Math.PI / 4 })
            .map(function (p) { return [p[0], p[1]]; });
        var edges = [[5, 1], [6, 2], [5, 6], [1, 2], [1, 0], [2, 3], [5, 4], [6, 7], [4, 0], [7, 3], [4, 7], [0, 3]];
        var lines = [], dashes = [], current = [];
        var ctx = {
            strokeStyle: '',
            setLineDash: function (d) { current = d.slice(); },
            drawLine: function (x1, y1, x2, y2) {
                lines.push([x1, y1, x2, y2]);
                dashes.push(current);
            },
        };
        canvasLib.CanvasRenderingContext2D.prototype.drawParallelepiped.call(ctx, {
            width: 3, height: 5, depth: 2, angle: Math.PI / 4,
            strokeStyle: '#000000', diagonalStrokeStyle: '#000000',
        }, [6, 8, 10], false, [6, 4]);
        assert.equal(lines.length, edges.length, 'нарисовано 12 рёбер');
        edges.forEach(function (e, i) {
            assertVertexClose(assert, [lines[i][0], lines[i][1]], v[e[0]], 'ребро ' + i + ', начало');
            assertVertexClose(assert, [lines[i][2], lines[i][3]], v[e[1]], 'ребро ' + i + ', конец');
        });
        assert.deepEqual(dashes[6], [6, 4], 'невидимое ребро 6 - пунктиром');
        assert.deepEqual(dashes[8], [6, 4], 'невидимое ребро 8 - пунктиром');
        assert.deepEqual(dashes[10], [6, 4], 'невидимое ребро 10 - пунктиром');
        assert.deepEqual(dashes[0], [], 'видимое ребро - сплошное');
    });
};
