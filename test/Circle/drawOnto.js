'use strict';
// Покадровый тест: Circle.prototype.drawOnto из lib/circle.js.
// Метод навешивается на Circle из flatten-shape-geometry (поля pc и r),
// поэтому грузим сам lib/circle.js в изолированный контекст с Circle-заглушкой
// нужной формы и проверяем контракт: drawOnto вызывает ctx.drawCircle(pc.x, pc.y, r).
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadCircleLib() {
    const context = vm.createContext({});
    vm.runInContext('function Circle(pc, r) { this.pc = pc; this.r = r; }', context);
    const src = fs.readFileSync(path.join(__dirname, '..', '..', 'lib', 'circle.js'), 'utf8');
    vm.runInContext(src, context, { filename: 'lib/circle.js' });
    return context.Circle;
}

module.exports = function registerCircleDrawOntoTests(QUnit) {
    QUnit.module('Circle: drawOnto (lib/circle.js)');
    const Circle = loadCircleLib();

    QUnit.test('drawOnto определён на прототипе Circle', function(assert) {
        assert.strictEqual(typeof Circle.prototype.drawOnto, 'function', 'метод на прототипе');
    });

    QUnit.test('drawOnto вызывает ctx.drawCircle(pc.x, pc.y, r)', function(assert) {
        const calls = [];
        const ctx = { drawCircle: function(x, y, r) { calls.push([x, y, r]); } };
        new Circle({ x: 3, y: -4 }, 7).drawOnto(ctx);
        assert.deepEqual(calls, [[3, -4, 7]], 'drawCircle вызван один раз с центром и радиусом');
    });

    QUnit.test('drawOnto: дробный центр и нулевой радиус передаются как есть', function(assert) {
        const calls = [];
        const ctx = { drawCircle: function(x, y, r) { calls.push([x, y, r]); } };
        new Circle({ x: 0.5, y: 1.25 }, 0).drawOnto(ctx);
        assert.deepEqual(calls, [[0.5, 1.25, 0]], 'без округлений и проверок');
    });

    QUnit.test('drawOnto ничего не возвращает', function(assert) {
        const ctx = { drawCircle: function() {} };
        assert.strictEqual(new Circle({ x: 0, y: 0 }, 1).drawOnto(ctx), undefined, 'рисует, но не возвращает значение');
    });
};
