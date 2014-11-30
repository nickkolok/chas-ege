"use strict";

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
		API_VERSION : { major : 0, minor : 0 },


		/**
		 * Выпуск приложения
		 */
		APPLICATION_RELEASE : "__APPLICATION_RELEASE____",


		/**
		 * Версия в которой была (последний раз) сломана обратная совметсимость
		 */
		LAST_BACKWARD_COMPATIBILITY_BREAK : { major : 0, minor : 0 },


		/** @function NApi.info.require_api_version
		 * Проверить совместимость с текущего API, с API версии major.minor
		 * @param {Number} major
		 * @param {Number} minor
		 */
		require_api_version : function(major, minor) {
			if (major < NApi.info.LAST_BACKWARD_COMPATIBILITY_BREAK.major || minor < NApi.info.LAST_BACKWARD_COMPATIBILITY_BREAK.minor) {
				throw new Error("Required outdated version of NApi");
			} else if (major > NApi.info.API_VERSION.major || minor > NApi.info.API_VERSION.minor) {
				throw new Error("Required too new version of NApi");
			}
		}
	},


	/** @namespace NApi._
	 * Функционал, используемый только внутри самого NApi
	 * @private
	 */
	_ : {
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


		/** @function NApi._.load_api_module
		 * Загрузить модуль API
		 * @param {String} name название модуля
		 * @private
		 */
		load_api_module : function(name) {
			document.write("<script charset=\"utf-8\" src=\"../lib/napi/" + name + ".js\" onload=\"NApi._.Linfo('Loaded API module " + name + "');\"></script>");
		}
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
	NApi._.Linfo("NApi v" + NApi.info.API_VERSION.major + "." + NApi.info.API_VERSION.minor);

	NApi._.Linfo("Loading API modules...");
	NApi._.load_api_module("debug");
	NApi._.load_api_module("task");
	NApi._.load_api_module("ui");

	NApi._.load_api_module("alias");
})();

