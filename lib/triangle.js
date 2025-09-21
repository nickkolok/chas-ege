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
