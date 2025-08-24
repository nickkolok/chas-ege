'use strict';

/** @namespace chaslib
 * Утилиты
 */
var chaslib = {
	/** @namespace chaslib._
	 * Функционал, используемый только внутри модуля chaslib
	 * @private
	 */
	_ : {
		/** @function chaslib._.loadLibModule
		 * Загрузить модуль chaslib
		 * @param {String} name название модуля
		 * @private
		 */
		loadLibModule : function(name) {
			document.write('<script charset="utf-8" src="../lib/chaslib/' + name + '.js" onload="console.log(\'[chaslib] Загружен модуль ' + name + '\');"></script>');
		}
	},


	/** @function chaslib.typeOf
	 * @param object объект
	 * @return тип объекта ввиде [object ТИП]
	 */
	typeOf : function(object) {
		return Object.prototype.toString.call(object);
	},


	/** @function chaslib.toStringsArray
	 * @param arr объект, которые необходимо превратить
	 * @return arr в виде массива строк
	 */
	toStringsArray : function(arr) {
		switch (chaslib.typeOf(arr)) {
		case '[object Array]':
			var newArr = [];
			for (var i = 0; i < arr.length; i++) {
				switch (chaslib.typeOf(arr[i])) {
				case '[object Number]':
					newArr.push(arr[i].ts().toString());
					break;
				case '[object String]':
					newArr.push(arr[i]);
					break;
				default:
					throw TypeError('Параметр arr должен содержать только строки и числа');
				}
			}
			return newArr;
		case '[object Number]':
			return [arr.ts()];
		case '[object String]':
			return [arr];
		default:
			throw TypeError('Невозможно преобразовать в строковый массив параметр: ' + JSON.stringify(arr));
		}
	},


	/** @function chaslib.toArray
	 * @param arr объект, которые необходимо превратить
	 * @param len длина массива из одинаковых значений
	 * @return arr, если arr - массив, и массив длиной len из элементов arr в противном случае
	 */
	toArray : function(arr, len) {
		if (chaslib.typeOf(arr) == '[object Array]') {
			return arr;
		}
		var result = [];
		for (var i = 0; i < len; i++) {
			result.push(arr);
		}
		return result;
	},
};
