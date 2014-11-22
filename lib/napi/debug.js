/** @namespace NApi.debug
 * Параметры задания
 */
NApi.debug = {
	/** @namespace NApi.debug._
	 * Функционал, используемый только внутри модуля NApi.debug
	 * @private
	 */
	_ : {
		debug_mode : false,
	},


	isDebug : function() {
		return NApi.debug._.debug_mode;
	},


	/** @function NApi.debug.enable_debugging
	 * Включить режим отладки
	 */
	enable_debugging : function() {
		NApi.debug._.debug_mode = true;
	},


	/** @function NApi.debug.disable_debugging
	 * Выключить режим отладки
	 */
	disable_debugging : function() {
		NApi.debug._.debug_mode = false;
	},


	/** @function NApi.debug.Ldebug
	 * Занести в лог отладочную информацию
	 * @param {String} msg текст сообщения
	 * @note Выводиться только в режиме отладки
	 */
	Ldebug : function(msg) {
		if (NApi.debug.isDebug()) {
			console.log("[DEBUG] " + msg);
		}
	}
};


/**
 * Алиас на NApi.debug
 */
var Ndbg = NApi.debug;


(function() {
	NApi.debug.enable_debugging();
})();

