'use strict';
Circle.prototype.drawOnto = function(ctx) {
/**
 * Рисует окружность на холсте.
 * @param {CanvasRenderingContext2D} ctx — контекст отрисовки.
 */
	ctx.drawCircle(this.center.x, this.center.y, this.radius);
};
