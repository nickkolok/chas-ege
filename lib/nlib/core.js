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


	/** @function NLib._.getTypeOf
	 * @param object объект
	 * @return тип объекта ввиде [object ТИП]
	 */
	getTypeOf : function(object) {
		return Object.prototype.toString.call(object);
	}
};


(function() {
	NLib._.loadLibModule("Array");
	NLib._.loadLibModule("Number");
	NLib._.loadLibModule("math");
	NLib._.loadLibModule("sets");

	NLib._.loadLibModule("alias");
})();

