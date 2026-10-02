const Flatten = require('@flatten-js/core');
const {Circle, Point} = Flatten;

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
		// mzhd без 3-го аргумента — строгое неравенство,
		// поэтому (5,5) уже «вне» диапазона (-5, 5)
		assert.strictEqual(result[0].x, 5, 'x = 1 * 5 = 5 (граница, строго вне)');
		assert.strictEqual(result[0].y, 5, 'y = 1 * 5 = 5 (граница, строго вне)');
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
		assert.ok(Math.abs(result[0].x - 0.003) < 1e-12, 'x ≈ 0.001 * 3');
		assert.ok(Math.abs(result[0].y - 0.003) < 1e-12, 'y ≈ 0.001 * 3');
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
		assert.strictEqual(result[0].x, 5, 'x = 5 (как в 2D, граница)');
		assert.strictEqual(result[0].y, 5, 'y = 5 (как в 2D, граница)');
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
		// при rotationY = π/2 координата z переходит в x:
		// на scale = 5 получаем x = -5, что строго вне (-5, 5)
		assert.ok(Math.abs(result[0].x) >= 5, 'x достиг границы диапазона');
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
		assert.strictEqual(result[0].x, -5, 'x = -1 * 5 = -5 (граница, строго вне)');
		assert.strictEqual(result[0].y, -5, 'y = -1 * 5 = -5 (граница, строго вне)');
	});

	// ============================================================
	// autoScale + Circle
	// ============================================================
	QUnit.module('autoScale + Circle');

	QUnit.test('isCircleObj: распознаёт Circle из @flatten-js/core', function (assert) {
		const c = new Circle(new Point(1, 2), 3);
		assert.ok(isCircleObj(c), 'Circle распознаётся');
		assert.notOk(isCircleObj({x: 1, y: 2}), 'обычная точка — не Circle');
		assert.notOk(isCircleObj(null), 'null — не Circle');
	});

	QUnit.test('isCircleObj: распознаёт duck-typed объект', function (assert) {
		const fake = {center: {x: 0, y: 0}, radius: 5};
		assert.ok(isCircleObj(fake), 'duck-typed объект распознаётся');
	});

	QUnit.test('2D Circle: масштабирование до выхода за диапазон', function (assert) {
		const vertex = [new Circle(new Point(1, 1), 0.5)];
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
		// scale=4: center (4,4), r=2 	 bbox (2,2)..(6,6) 	 6 вне (-5,5)
		assert.strictEqual(result[0].center.x, 4, 'center.x = 1 * 4');
		assert.strictEqual(result[0].center.y, 4, 'center.y = 1 * 4');
		assert.strictEqual(result[0].radius, 2, 'radius = 0.5 * 4');
	});

	QUnit.test('2D Circle: центр в начале координат', function (assert) {
		const vertex = [new Circle(new Point(0, 0), 1)];
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
		// scale=5: r=5, bbox (-5,-5)..(5,5) 	 -5 не mzhd(-5,5) 	 стоп
		assert.strictEqual(result[0].center.x, 0, 'center.x = 0');
		assert.strictEqual(result[0].center.y, 0, 'center.y = 0');
		assert.strictEqual(result[0].radius, 5, 'radius = 1 * 5');
	});

	QUnit.test('2D: Circle + точка вместе', function (assert) {
		const vertex = [
			new Circle(new Point(0, 0), 1),
			{x: 3, y: 3},
		];
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
		// Точка (3,3) выходит при scale=2: (6,6) вне
		assert.strictEqual(result[1].x, 6, 'точка x = 3 * 2 = 6');
		assert.strictEqual(result[1].y, 6, 'точка y = 3 * 2 = 6');
		assert.strictEqual(result[0].radius, 2, 'круг radius = 1 * 2');
	});

	QUnit.test('3D + Circle: бросает ошибку', function (assert) {
		const vertex = [
			{x: 1, y: 1, z: 1},
			new Circle(new Point(0, 0), 1),
		];
		assert.throws(function () {
			autoScale(vertex, {
				x: 0, y: 0, z: 0,
				scale: 1,
				rotationX: 0, rotationY: 0, rotationZ: 0,
			}, [], {
				startX: -5, finishX: 5,
				startY: -5, finishY: 5,
				step: 1,
				maxScale: 100,
			});
		}, /Circle.*3D/, 'ошибка упоминает Circle и 3D');
	});

	QUnit.test('genAssert: Circle изначально вне диапазона', function (assert) {
		const vertex = [new Circle(new Point(0, 0), 200)];
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
		}, Error, 'Circle радиусом 200 не влезает в диапазон');
	});

};
