'use strict';
// Тест: Circle.prototype.drawOnto из lib/circle.js.
// Раннер уже загрузил бандл (build/lib/chas-lib.js), Circle и Point — глобальные,
// поэтому проверяется настоящий класс: и то, что lib/circle.js попал в бандл,
// и то, что у Circle из flatten-shape-geometry по-прежнему поля pc и r.

module.exports = function registerCircleDrawOntoTests(QUnit) {
    QUnit.module('Circle: drawOnto (lib/circle.js)');

    function drawCalls(circle) {
        const calls = [];
        const ctx = { drawCircle: function(x, y, r) { calls.push([x, y, r]); } };
        const ret = circle.drawOnto(ctx);
        return { calls: calls, ret: ret };
    }

    QUnit.test('drawOnto определён на прототипе Circle', function(assert) {
        assert.strictEqual(typeof Circle.prototype.drawOnto, 'function', 'метод на прототипе');
    });

    QUnit.test('drawOnto вызывает ctx.drawCircle(pc.x, pc.y, r)', function(assert) {
        assert.deepEqual(drawCalls(new Circle(new Point(3, -4), 7)).calls, [[3, -4, 7]],
            'drawCircle вызван один раз с центром и радиусом');
    });

    QUnit.test('drawOnto: дробный центр и нулевой радиус передаются как есть', function(assert) {
        assert.deepEqual(drawCalls(new Circle(new Point(0.5, 1.25), 0)).calls, [[0.5, 1.25, 0]],
            'без округлений и проверок');
    });

    QUnit.test('drawOnto ничего не возвращает', function(assert) {
        assert.strictEqual(drawCalls(new Circle(new Point(0, 0), 1)).ret, undefined,
            'рисует, но не возвращает значение');
    });
};
