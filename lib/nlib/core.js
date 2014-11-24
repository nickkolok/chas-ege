/** @namespace NLib
 * Утилиты
 */
NLib = {
	/** @namespace NLib._
	 * Функционал, используемый только внутри модуля NLib
	 * @private
	 */
	_ : {},


	/** @function NLib.get_random_items
	 * Получение случайные (не повторяющиеся) элементы массива
	 * @param {Array} arr массив
	 * @param {Number} count кол-во случайных элеметнов
	 * @return Массив случайных элементов массива
	 */
	get_random_items : function(arr, count) {
		var items = [];
		for (var i = 0; i < count; i++) {
			if (arr.length >= 1) {
				items.push(arr[NLib.math.randomize(0, arr.length - 1)]);
			} else {
				items.push(arr[0]);
			}
		}
		return items;
	},


	/** @function NLib.get_random_item
	 * Получение случайный элемент массива
	 * @param {Array} arr массив
	 * @return Случайный элемент массива
	 */
	get_random_item : function(arr) {
		return NLib.get_random_items(arr, 1);
	},
};

