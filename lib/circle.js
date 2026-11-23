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
 * Возвращает вписанную окружность трапеции или null, если её нет.
 * @param {number} precision - относительная точность проверки касания.
 * @returns {Circle|null}
 */
Trapezoid.prototype.inscribedCircle = function(precision = 1e-7) {
	let first = bisectorIntersection({
		fP: this.pointD, sP: this.pointA, tP: this.pointB,
	}, [this.segmentCD, this.segmentBC])[0];
	let second = bisectorIntersection({
		fP: this.pointA, sP: this.pointD, tP: this.pointC,
	}, [this.segmentAB, this.segmentBC])[0];
	if (!first || !second) {
		return null;
	}
	let center = first.intersect(second)[0];
	if (!center) {
		return null;
	}
	let sides = [this.segmentAB, this.segmentBC, this.segmentCD, this.segmentDA];
	let radius = center.distanceTo(sides[0])[0];
	if (!(radius > 0) || !sides.every(side =>
		Math.abs(center.distanceTo(side)[0] - radius) <= precision * Math.max(1, radius))) {
		return null;
	}
	return new Circle(center, radius);
};
