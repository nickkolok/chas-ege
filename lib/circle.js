'use strict';
/**
 * Рисует окружность на холсте.
 * Центр и радиус берутся из полей pc и r объекта Circle (flatten-shape-geometry):
 * this.radius у него — метод radius(angle), а не число.
 * @param {CanvasRenderingContext2D} ctx — контекст отрисовки.
 */
Circle.prototype.drawOnto = function(ctx) {
	ctx.drawCircle(this.pc.x, this.pc.y, this.r);
};
