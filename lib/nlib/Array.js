/** @function Array#get_random_items
 * Получение случайные (не повторяющиеся) элементы массива
 * @param {Number} count кол-во случайных элеметнов
 * @return Массив случайных элементов массива
 */
Array.prototype.get_random_items = function(count) {
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


/** @function NLib#get_random_item
 * Получение случайный элемент массива
 * @return Случайный элемент массива
 */
Array.prototype.get_random_item = function() {
	return this.get_random_items(1);
}

