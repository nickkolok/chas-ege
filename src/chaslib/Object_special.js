'use strict';

Object.prototype.NaNtoUndefined = function(r) {
	for (var prop in this) {
		if (this[prop] !== undefined && this[prop].isNumber && isNaN(this[prop])) {
			this[prop] = undefined;
		} else if (r && this[prop].isObject) {
			this[prop].NaNtoUndefined();
		}
	}
};

Object.prototype.deleteSimilarProperties = function(diff) {
	for (var prop in this) {
		if (diff[prop]) {
			if (diff[prop] == this[prop]) {
				delete this[prop];
			} else if (this[prop].isObject || this[prop].isArray) {
				if (diff[prop].isObject || diff[prop].isArray) {
					this[prop].deleteSimilarProperties(diff[prop]);
				}
			}
		}
	}
};

Object.prototype.isObject = true;

Object.prototype.addToGlobal('docsObject', 1);
