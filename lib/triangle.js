'use strict';

Triangle.prototype.isEquilateral = function(precision = 1/1024/1024) {
	return Object.values(this.lengths).hasAlmostDuplicateNumbers(precision);
};

Triangle.prototype.minAngleInDegrees = function() {
	return [this.angleAInDegrees, this.angleBInDegrees, this.angleCInDegrees].minE();
};

Triangle.prototype.maxAngleInDegrees = function() {
	return [this.angleAInDegrees, this.angleBInDegrees, this.angleCInDegrees].maxE();
};
Triangle.prototype.inscribedCircle = function() {
/**
 * Возвращает вписанную окружность треугольника.
 * Центр тут точка пересечения биссектрис, радиус: r = S/p.
 * @returns {Circle} Объект вписанной окружности.
 */
	if (!this.bisectorA || !this.bisectorB) {
		throw new Error('Для получения вписанной окружности необходимо создать треугольник с опцией calculateBisectors: true');
	}
	
	let centerPoint = this.bisectorA.intersect(this.bisectorB);
	if (!centerPoint || !centerPoint.vertices || centerPoint.vertices.length === 0) {
		throw new Error('Не удалось найти центр вписанной окружности');
	}
	let center = centerPoint.vertices[0];
	let semiPerimeter = this.perimeter / 2;
	let radius = this.area() / semiPerimeter;
	return new Circle(center, radius);
};
