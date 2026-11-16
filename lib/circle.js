'use strict';
/**
 * Рисует окружность на холсте.
 * @param {CanvasRenderingContext2D} ctx — контекст отрисовки.
 */
Circle.prototype.drawOnto = function(ctx) {
	ctx.drawCircle(this.pc.x, this.pc.y, this.r);
};

