'use strict';
/**
 * Рисует окружность на холсте.
 * @param {CanvasRenderingContext2D} ctx — контекст отрисовки.
 */
Circle.prototype.drawOnto = function(ctx) {
	ctx.drawCircle(this.center.x, this.center.y, this.radius);
};
