/** @namespace NApi
 * New API [на́пи]
 */
var NApi = {
	/** @namespace NApi.info
	 * Информация об API
	 */
	info : {
		/**
		 * Версия API
		 */
		API_VERSION : "InDev",
		APPLICATION_RELEASE : "__APPLICATION_RELEASE____"
	},


	/** @namespace NApi._
	 * Функционал, используемый только внутри самого NApi
	 * @private
	 */
	_ : {
		/**
		 * Флаг отладочного режима
		 */
		debug_mode : false,


		/** @function NApi._.Linfo
		 * Занести в лог информацию
		 * @param {String} msg текст сообщения
		 * @private
		 */
		Linfo : function(msg) {
			console.log("[NApi][info] " + msg);
		},


		/** @function NApi._.Lmsg
		 * Занести в лог сообщение
		 * @param {String} msg текст сообщения
		 * @private
		 */
		Lmsg : function(msg) {
			console.log("[NApi][msg] " + msg);
		},


		/** @function NApi._.Lwarn
		 * Занести в лог предупреждение
		 * @param {String} msg текст сообщения
		 * @private
		 */
		Lwarn : function(msg) {
			console.log("[NApi][WARN] " + msg);
		},


		/** @function NApi._.Lerr
		 * Занести в лог информацию об ощибке
		 * @param {String} msg текст сообщения
		 * @private
		 */
		Lerr : function(msg) {
			console.log("[NApi][ERROR] " + msg);
		},


		/** @function NApi._.Ldebug
		 * Занести в лог отладочную информацию
		 * @param {String} msg текст сообщения
		 * @note Выводиться только в режиме отладки
		 * @private
		 */
		Ldebug : function(msg) {
			if (NApi.state.isDebug()) {
				console.log("[NApi][DEBUG] " + msg);
			}
		},


		/** @function NApi._.load_js
		 * Загрузить .js-файл
		 * @param {String} path путь к .js-файлу
		 * @private
		 */
		load_js : function(path) {
			document.write("<script charset=\"utf-8\" src=\"" + path + "\" onload=\"console.log('Loaded " + path + "');\"></script>");
		},


		/** @function NApi._.load_api_module
		 * Загрузить модуль API
		 * @param {String} name название модуля
		 * @private
		 */
		load_api_module : function(name) {
			document.write("<script charset=\"utf-8\" src=\"../lib/napi/" + name + ".js\" onload=\"NApi._.Linfo('Loaded API module " + name + "');\"></script>");
		}
	},


	/** @namespace NApi.state
	 * Состояние приложения
	 */
	state : {
		/** @function NApi.state.isDebug
		 * Занести в лог информацию
		 * @return {Boolean} включен ли режим отладки
		 */
		isDebug : function() {
			return NApi._.debug_mode;
		},
	},


	/** @function NApi.Linfo
	 * Занести в лог информацию
	 * @param {String} msg текст сообщения
	 */
	Linfo : function(msg) {
		console.log("[info] " + msg);
	},


	/** @function NApi.Lmsg
	 * Занести в лог сообщение
	 * @param {String} msg текст сообщения
	 */
	Lmsg : function(msg) {
		console.log("[msg] " + msg);
	},


	/** @function NApi.Lwarn
	 * Занести в лог предупреждение
	 * @param {String} msg текст сообщения
	 */
	Lwarn : function(msg) {
		console.log("[WARN] " + msg);
	},


	/** @function NApi.Lerr
	 * Занести в лог информацию об ощибке
	 * @param {String} msg текст сообщения
	 */
	Lerr : function(msg) {
		console.log("[ERROR] " + msg);
	},
};


(function() {
	NApi._.Linfo("NApi " + NApi.info.VERSION);

	NApi._.Linfo("Loading API modules...");
	NApi._.load_api_module("util");
	NApi._.load_api_module("debug");
	NApi._.load_api_module("task");
})();

