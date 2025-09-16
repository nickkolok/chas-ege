'use strict';

Triangle.prototype.isEquilateral = function(precision = 1/1024/1024) {
	return Object.values(this.lengths).hasAlmostDuplicateNumbers(precision);
};
