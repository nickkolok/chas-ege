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

/**
 * Четыре кардинальные точки окружности: справа, слева, сверху и снизу от центра.
 * Нужны, чтобы autoScale() учёл габариты окружности: autoScale работает только
 * с точками и про окружности ничего не знает (lib/func.js). Передайте эти точки
 * вместе с вершинами фигуры — и окружность поместится в поле целиком.
 * @returns {Point[]} точки на окружности в направлениях осей координат.
 */
Circle.prototype.boundingPoints = function() {
	return [
		new Point(this.pc.x + this.r, this.pc.y),
		new Point(this.pc.x - this.r, this.pc.y),
		new Point(this.pc.x, this.pc.y + this.r),
		new Point(this.pc.x, this.pc.y - this.r),
	];
};
