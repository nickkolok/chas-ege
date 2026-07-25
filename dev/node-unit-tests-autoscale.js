module.exports = function registerAutoScaleTests(QUnit) {

// ============================================================
// autoScale (lib/func.js)
// ============================================================
QUnit.module('autoScale');

QUnit.test('2D: масштабирование до выхода за диапазон', function (assert) {
const vertex = [{x: 1, y: 1}];
const result = autoScale(vertex, {
x: 0, y: 0, z: 0,
scale: 1,
rotationX: 0, rotationY: 0, rotationZ: 0,
}, [], {
startX: -5, finishX: 5,
startY: -5, finishY: 5,
step: 1,
maxScale: 100,
});
assert.strictEqual(result.length, 1, 'одна вершина на выходе');
assert.strictEqual(result[0].x, 6, 'x = 1 * 6 = 6 (вышел за 5)');
assert.strictEqual(result[0].y, 6, 'y = 1 * 6 = 6 (вышел за 5)');
});

QUnit.test('2D: разные x и y — выход по большей координате', function (assert) {
const vertex = [{x: 2, y: 1}];
const result = autoScale(vertex, {
x: 0, y: 0, z: 0,
scale: 1,
rotationX: 0, rotationY: 0, rotationZ: 0,
}, [], {
startX: -5, finishX: 5,
startY: -5, finishY: 5,
step: 1,
maxScale: 100,
});
assert.strictEqual(result[0].x, 6, 'x = 2 * 3 = 6');
assert.strictEqual(result[0].y, 3, 'y = 1 * 3 = 3');
});

QUnit.test('2D: несколько вершин', function (assert) {
const vertex = [{x: 1, y: 1}, {x: 2, y: 2}];
const result = autoScale(vertex, {
x: 0, y: 0, z: 0,
scale: 1,
rotationX: 0, rotationY: 0, rotationZ: 0,
}, [], {
startX: -5, finishX: 5,
startY: -5, finishY: 5,
step: 1,
maxScale: 100,
});
assert.strictEqual(result[0].x, 3, 'первая вершина x = 1 * 3');
assert.strictEqual(result[0].y, 3, 'первая вершина y = 1 * 3');
assert.strictEqual(result[1].x, 6, 'вторая вершина x = 2 * 3');
assert.strictEqual(result[1].y, 6, 'вторая вершина y = 2 * 3');
});

QUnit.test('2D: ограничение maxScale', function (assert) {
const vertex = [{x: 0.001, y: 0.001}];
const result = autoScale(vertex, {
x: 0, y: 0, z: 0,
scale: 1,
rotationX: 0, rotationY: 0, rotationZ: 0,
}, [], {
startX: -5, finishX: 5,
startY: -5, finishY: 5,
step: 1,
maxScale: 3,
});
assert.ok(result[0].x < 5, 'x не вышел за диапазон');
assert.ok(result[0].y < 5, 'y не вышел за диапазон');
assert.strictEqual(result[0].x, 0.003, 'x = 0.001 * 3');
assert.strictEqual(result[0].y, 0.003, 'y = 0.001 * 3');
});

QUnit.test('3D: без поворотов эквивалентно 2D', function (assert) {
const vertex = [{x: 1, y: 1, z: 0}];
const result = autoScale(vertex, {
x: 0, y: 0, z: 0,
scale: 1,
rotationX: 0, rotationY: 0, rotationZ: 0,
}, [], {
startX: -5, finishX: 5,
startY: -5, finishY: 5,
step: 1,
maxScale: 100,
});
assert.strictEqual(result[0].x, 6, 'x = 6 (как в 2D)');
assert.strictEqual(result[0].y, 6, 'y = 6 (как в 2D)');
assert.strictEqual(result[0].z, undefined, 'z не возвращается (2D-результат)');
});

QUnit.test('3D: ненулевая z влияет на проекцию', function (assert) {
const vertex = [{x: 0, y: 0, z: 1}];
const camera = {
x: 0, y: 0, z: 0,
scale: 1,
rotationX: 0,
rotationY: Math.PI / 2,
rotationZ: 0,
};
const result = autoScale(vertex, camera, [], {
startX: -5, finishX: 5,
startY: -5, finishY: 5,
step: 1,
maxScale: 100,
});
assert.ok(Math.abs(result[0].x) > 5, 'x вышел за диапазон');
assert.ok(Math.abs(result[0].y) < 1, 'y ≈ 0 (не изменился)');
});

QUnit.test('genAssert: бросает ошибку если вершины изначально вне диапазона', function (assert) {
const vertex = [{x: 200, y: 200}];
assert.throws(function () {
autoScale(vertex, {
x: 0, y: 0, z: 0,
scale: 1,
rotationX: 0, rotationY: 0, rotationZ: 0,
}, [], {
startX: -180, finishX: 180,
startY: -160, finishY: 160,
step: 0.1,
maxScale: 100,
});
}, Error, 'genAssert бросает Error для вершин вне диапазона');
});

QUnit.test('2D: отрицательные координаты', function (assert) {
const vertex = [{x: -1, y: -1}];
const result = autoScale(vertex, {
x: 0, y: 0, z: 0,
scale: 1,
rotationX: 0, rotationY: 0, rotationZ: 0,
}, [], {
startX: -5, finishX: 5,
startY: -5, finishY: 5,
step: 1,
maxScale: 100,
});
assert.strictEqual(result[0].x, -6, 'x = -1 * 6 = -6 (вышел за -5)');
assert.strictEqual(result[0].y, -6, 'y = -1 * 6 = -6 (вышел за -5)');
});

};
