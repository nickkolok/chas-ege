"use strict";

/** @function Array#getRandomItems
 * Получение случайные (не повторяющиеся) элементы массива
 * @param {Number} count кол-во случайных элеметнов
 * @return Массив случайных элементов массива
 */
Array.prototype.getRandomItems = function(count) {
	var items = [];
	for (var i = 0; i < count; i++) {
		if (this.length >= 1) {
			items.push(this[NLib.math.randomize(0, this.length - 1)]);
		} else {
			items.push(this[0]);
		}
	}
	return items;
};


/** @function NLib#getRandomItem
 * Получение случайный элемент массива
 * @return Случайный элемент массива
 */
Array.prototype.getRandomItem = function() {
	return this.getRandomItems(1);
}

