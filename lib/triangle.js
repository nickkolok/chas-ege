'use strict';

Triangle.prototype.isEquilateral = function(precision = 1/1024/1024) {
	let sides = Object.values(this.lengths);
	return sides[0].isAlmostEqual(sides[1], precision)
		&& sides[1].isAlmostEqual(sides[2], precision);
};

Triangle.prototype.isIsosceles = function(precision = 1/1024/1024) {
	return Object.values(this.lengths).hasAlmostDuplicateNumbers(precision);
};

Triangle.prototype.minAngleInDegrees = function() {
	return [this.angleAInDegrees, this.angleBInDegrees, this.angleCInDegrees].minE();
};

Triangle.prototype.maxAngleInDegrees = function() {
	return [this.angleAInDegrees, this.angleBInDegrees, this.angleCInDegrees].maxE();
};

/**
 * Возвращает вписанную окружность треугольника.
 * @returns {Circle} Объект вписанной окружности.
 */
Triangle.prototype.inscribedCircle = function() {
	return new Circle(this.incenter, this.radiusOfInscribedCircle);
};
