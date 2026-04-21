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


/**
* Возвращает вписанную окружность треугольника.
* Центр вычисляется как взвешенное среднее координат вершин (инцентр),
 * радиус — по формуле r = S / p.
 * @returns {Circle} Объект вписанной окружности.
 */
Triangle.prototype.inscribedCircle = function() {
	let a = this.lengthBC;
	let b = this.lengthAC;
	let c = this.lengthAB;

	let perimeter = a + b + c;
	if (perimeter === 0) {
		throw new Error('Вырожденный треугольник. Периметр равен нулю');
	}
	let x = (a * A.x + b * B.x + c * C.x) / perimeter;
	let y = (a * A.y + b * B.y + c * C.y) / perimeter;

	let center = new Point(x, y);
	let semiPerimeter = perimeter / 2;
	let radius = this.area() / semiPerimeter;
	return new Circle(center, radius);
};
