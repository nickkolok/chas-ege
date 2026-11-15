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
 * Вершины многоугольника, вписанного в окружность, по дугам между соседними вершинами.
 * Дуги откладываются последовательно от стартового угла в положительном направлении
 * (против часовой стрелки в математической системе координат): первая дуга — от первой
 * вершины ко второй, вторая — от второй к третьей, …, последняя — от последней к первой.
 * Сумма дуг должна равняться полному обороту (360° или 2π радиан).
 * Каждая дуга должна быть положительной; чтобы вершины на чертеже не сливались,
 * нижнюю границу дуги (например, minArc = 25°) задаёт вызывающий шаблон.
 *
 * Частный случай — четырёхугольник, в том числе равнобедренная трапеция: дуги [AB, BC, CD, DA].
 *
 * @param {Number[]} arcs — дуги между соседними вершинами, в градусах или радианах.
 * @param {Number} startAngle — полярный угол первой вершины.
 * @param {Object} [options]
 * @param {Boolean} [options.angleInDegrees=false] — true, если углы заданы в градусах.
 * @returns {Point[]} вершины в порядке обхода.
 */
Circle.prototype.inscribedPolygonByArcs = function(arcs, startAngle, {angleInDegrees = false} = {}) {
	if (!Array.isArray(arcs) || arcs.length < 3) {
		throw new Error('Нужно не меньше трёх дуг');
	}
	const fullCircle = angleInDegrees ? 360 : 2 * Math.PI;
	let sum = 0;
	for (const arc of arcs) {
		if (typeof arc !== 'number' || !isFinite(arc) || arc <= 0) {
			throw new Error('Каждая дуга должна быть положительным числом');
		}
		sum += arc;
	}
	if (Math.abs(sum - fullCircle) > 1e-9 * fullCircle) {
		throw new Error('Сумма дуг должна равняться полному обороту');
	}
	const vertices = [];
	let angle = startAngle;
	for (let i = 0; i < arcs.length; i++) {
		vertices.push(this.pointOnCircle(angle, {angleInDegrees}));
		angle += arcs[i];
	}
	return vertices;
};
