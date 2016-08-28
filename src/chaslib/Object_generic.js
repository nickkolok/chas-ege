'use strict';

Object.prototype.clone = function() {
/**Рекурсивно клонирует объект.*/
	var temp = {};
	for (var prop in this) {
		if (this[prop] === undefined) {
			temp[prop] = undefined;
		} else if (this[prop] instanceof Array) {
			temp[prop] = this[prop].slice();
		} else if (this[prop] instanceof Object) {
			temp[prop] = this[prop].clone();
		} else {
			temp[prop] = this[prop];
		}
	}
	return temp;
};

Object.prototype.makeAllPropertiesNotEnumerable = function() {
/**Сделать все свойства объекта неперечислимыми.*/
	for (var prop in this) {
		Object.defineProperty(this, prop, { enumerable: false });
	}
};

Object.prototype.cloneNonRecursive = function() {
/**Нерекурсивно клонирует объект.*/
	var a = {};
	for (var prop in this) {
		a[prop] = this[prop];
	}
	return a;
};

Object.prototype.addToGlobal = function(glname, p1) {
/**Добавляет все перечислимые свойства объекта в глобальную переменную и, если p1, то делает их в объекте неперечислимыми.*/
	if (typeof(window) === 'undefined') {
		var window = {};
	}
	if (window[glname] === undefined) {
		window[glname] = {};
	}
	for (var prop in this) {
		window[glname][prop] = this[prop];

		// TODO: разобраться, выше же вроде есть
		if (p1) {
			Object.defineProperty(this, prop, { enumerable: false });
		}
	}
	return this;
};

Object.prototype.importFrom = function(p1) {
/**Импортировать все свойства p1 в данный объект*/
	if (p1) {
		for (var prop in p1) {
			this[prop] = p1[prop];
		}
	}
};

Object.prototype.importNonExistingFrom = function(p1) {
/**Импортировать все недостающие свойства p1 в данный объект*/
	if (p1) {
		for (var prop in p1) {
			if (!(prop in this)) {
				this[prop] = p1[prop];
			}
		}
	}
};

Object.prototype.addToGlobal('docsObject', 1);
