"use strict";

/** @namespace chas2
 * New API [на́пи]
 */
window.chas2 = {
	/** @namespace chas2.info
	 * Информация об API
	 */
	info : {
		/**
		   Версия API
		 */
		API_VERSION : { major : 0, minor : 1 },


		/**
		   Версия для заголовков
		 */
		VERSION_TITLE : "??VERSION_TITLE??",


		/**
		   Точная версия
		 */
		VERSION_EXACT : "??VERSION_EXACT??",


		/**
		   Выпуск приложения
		   @deprecated
		 */
		APPLICATION_RELEASE : "__APPLICATION_RELEASE____",


		/**
		 * Версия в которой была (последний раз) сломана обратная совметсимость
		 */
		LAST_BACKWARD_COMPATIBILITY_BREAK : { major : 0, minor : 0 },


		/** @function chas2.info.requireApiVersion
		 * Проверить совместимость с текущего API, с API версии major.minor
		 * @param {Number} major
		 * @param {Number} minor
		 */
		requireApiVersion : function(major, minor) {
			if (major < chas2.info.LAST_BACKWARD_COMPATIBILITY_BREAK.major || minor < chas2.info.LAST_BACKWARD_COMPATIBILITY_BREAK.minor) {
				throw new Error("Была запрошена устаревшая версия chas2");
			} else if (major > chas2.info.API_VERSION.major || minor > chas2.info.API_VERSION.minor) {
				throw new Error("Была запрошена более новая версия chas2");
			}
		}
	},


	/** @namespace chas2._
	 * Функционал, используемый только внутри самого chas2
	 * @private
	 */
	_ : {
		/** @function chas2._.Linfo
		 * Занести в лог информацию
		 * @param {String} msg текст сообщения
		 * @private
		 */
		Linfo : function(msg) {
			console.log("[chas2][info] " + msg);
		},


		/** @function chas2._.Lmsg
		 * Занести в лог сообщение
		 * @param {String} msg текст сообщения
		 * @private
		 */
		Lmsg : function(msg) {
			console.log("[chas2][msg] " + msg);
		},


		/** @function chas2._.Lwarn
		 * Занести в лог предупреждение
		 * @param {String} msg текст сообщения
		 * @private
		 */
		Lwarn : function(msg) {
			console.log("[chas2][WARN] " + msg);
		},


		/** @function chas2._.Lerr
		 * Занести в лог информацию об ощибке
		 * @param {String} msg текст сообщения
		 * @private
		 */
		Lerr : function(msg) {
			console.log("[chas2][ERROR] " + msg);
		},


		/** @function chas2._.loadApiModule
		 * Загрузить модуль API
		 * @param {String} name название модуля
		 * @private
		 */
		// loadApiModule : function(name) {
			// document.write("<script charset=\"utf-8\" src=\"../js/chas2/" + name + ".js\" onload=\"chas2._.Linfo('Загружен модуль " + name + "');\"></script>");
		// }
	},


	/** @function chas2.Linfo
	 * Занести в лог информацию
	 * @param {String} msg текст сообщения
	 */
	Linfo : function(msg) {
		console.log("[info] " + msg);
	},


	/** @function chas2.Lmsg
	 * Занести в лог сообщение
	 * @param {String} msg текст сообщения
	 */
	Lmsg : function(msg) {
		console.log("[msg] " + msg);
	},


	/** @function chas2.Lwarn
	 * Занести в лог предупреждение
	 * @param {String} msg текст сообщения
	 */
	Lwarn : function(msg) {
		console.log("[WARN] " + msg);
	},


	/** @function chas2.Lerr
	 * Занести в лог информацию об ощибке
	 * @param {String} msg текст сообщения
	 */
	Lerr : function(msg) {
		console.log("[ERROR] " + msg);
	},


	/** @function chas2.panic
	 * Сообщить о серёзной проблеме (с последующей остановкой)
	 * @param cause причина
	 */
	panic : function(cause) {
		chas2.Lerr("chas2.panic()");
		switch (chas2.getTypeOf(cause)) {
		case "[object String]":
			chas2.Linfo("Причина: " + cause);
			break;
		case "[object Error]":
			chas2.Linfo("Причина: " + cause.msg);
			break;
		}
		throw Error("Паника");
	},
};
