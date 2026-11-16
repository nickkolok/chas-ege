'use strict';
/**
 * Рисует окружность на холсте.
 * @param {CanvasRenderingContext2D} ctx — контекст отрисовки.
 */
Circle.prototype.drawOnto = function(ctx) {
	ctx.drawCircle(this.pc.x, this.pc.y, this.r);
};

/**
 * Возвращает вписанную окружность квадрата.
 * @returns {Circle}
 */
Square.prototype.inscribedCircle = function() {
	return new Circle(this.diagonalIntersectionPoint, this.lengthAB / 2);
};

