"use strict";

/** @namespace chas2.debug
 * Параметры задания
 */
chas2.debug = {
	/** @namespace chas2.debug._
	 * Функционал, используемый только внутри модуля chas2.debug
	 * @private
	 */
	_ : {
		debug_mode : false,
	},


	isDebug : function() {
		return chas2.debug._.debug_mode;
	},


	/** @function chas2.debug.enableDebugging
	 * Включить режим отладки
	 */
	enableDebugging : function() {
		chas2.debug._.debug_mode = true;
	},


	/** @function chas2.debug.disableDebugging
	 * Выключить режим отладки
	 */
	disableDebugging : function() {
		chas2.debug._.debug_mode = false;
	},


	/** @function chas2.debug.Ldebug
	 * Занести в лог отладочную информацию
	 * @param {String} msg текст сообщения
	 * @note Выводиться только в режиме отладки
	 */
	Ldebug : function(msg) {
		if (chas2.debug.isDebug()) {
			console.log("[DEBUG] " + msg);
		}
	}
};


(function() {
	chas2.debug.enableDebugging();
})();

