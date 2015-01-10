"use strict";

/** @namespace NLib
 * Утилиты
 */
var NLib = {
	/** @namespace NLib._
	 * Функционал, используемый только внутри модуля NLib
	 * @private
	 */
	_ : {
		/** @function NLib._.loadLibModule
		 * Загрузить модуль NLib
		 * @param {String} name название модуля
		 * @private
		 */
		loadLibModule : function(name) {
			document.write("<script charset=\"utf-8\" src=\"../lib/nlib/" + name + ".js\" onload=\"console.log('[NLib] Загружен модуль " + name + "');\"></script>");
		}
	},


	/** @function NLib.getTypeOf
	 * @param object объект
	 * @return тип объекта ввиде [object ТИП]
	 */
	getTypeOf : function(object) {
		return Object.prototype.toString.call(object);
	},


	/** @function NLib.toStringsArray
	 * @param arr объект, которые необходимо превратить
	 * @return arr ввиде массива строк
	 */
	toStringsArray : function(arr) {
		switch (NLib.getTypeOf(arr)) {
		case "[object Array]":
			var newArr = [];
			for (var i = 0; i < arr.length; i++) {
				switch (NLib.getTypeOf(arr[i])) {
				case "[object Number]":
					newArr.push(arr[i].ts().toString());
					break;
				case "[object String]":
					newArr.push(arr[i]);
					break;
				default:
					throw TypeError("Параметр arr должен содержать только строки и числа");
				}
			}
			return newArr;
		case "[object Number]":
			return [arr.ts()];
		case "[object String]":
			return [arr];
		default:
			throw TypeError("Параметр answers должен");
		}
	}
};


(function() {
})();

