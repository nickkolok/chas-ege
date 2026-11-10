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
};
