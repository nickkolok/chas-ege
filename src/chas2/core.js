"use strict";


/** @namespace chas2
 * New API [на́пи]
 */
window.chas2 = {};


/** @namespace chas2._
 * Функционал, используемый только внутри самого chas2
 * @private
 */
chas2._ = {
	debug_mode : false,
	local : false,

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
};


/** @namespace chas2.info
 * Информация об API
 */
chas2.info = {
	/**
	   Версия API
	 */
	API_VERSION : { major : 0, minor : 2 },


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
	LAST_BACKWARD_COMPATIBILITY_BREAK : { major : 0, minor : 2 },


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
};


/** @function chas2.Linfo
 * Занести в лог информацию
 * @param {String} msg текст сообщения
 */
chas2.Linfo = function(msg) {
	console.log("[info] " + msg);
};


/** @function chas2.Lmsg
 * Занести в лог сообщение
 * @param {String} msg текст сообщения
 */
chas2.Lmsg = function(msg) {
	console.log("[msg] " + msg);
};


/** @function chas2.Lwarn
 * Занести в лог предупреждение
 * @param {String} msg текст сообщения
 */
chas2.Lwarn = function(msg) {
	console.log("[WARN] " + msg);
};


/** @function chas2.Lerr
 * Занести в лог информацию об ощибке
 * @param {String} msg текст сообщения
 */
chas2.Lerr = function(msg) {
	console.log("[ERROR] " + msg);
};


/** @function chas2.Ldebug
	Занести в лог отладочную информацию
	@param {String} msg текст сообщения
	@note Выводиться только в режиме отладки
*/
chas2.Ldebug = function(msg) {
	if (chas2.isDebug()) {
		console.log("[DEBUG] " + msg);
	}
};


chas2.isDebug = function() {
	return chas2._.debug_mode;
};


chas2.isLocal = function() {
	return chas2._.local;
};


/** @function chas2.panic
 * Сообщить о серёзной проблеме (с последующей остановкой)
 * @param cause причина
 */
chas2.panic = function(cause) {
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
};


/**
   Хеш текущей страницы
 */
chas2.hash = "";


/**
   Аргументы текущей страницы
 */
chas2.args = {};


/** @function chas3.hasArgument
   Проверка на наличия аругмента
   @param argument Аргумент
 */
chas2.hasArgument = function(argument) {
	chas2.Linfo(argument)
	return !!chas2.args[argument] || chas2.args[argument] == "";
};


(function(){
	// Инициализация chas2.hash и chas2.args
	chas2.hash = location.hash.split("?")[0].slice(1);

	var href = location.href.split("?");
	var hashvarsstr = href[href.length - 1];

	var hashvars = hashvarsstr.split("&");
	for (var i = 0; i < hashvars.length; i++) {
		var varstr = hashvars[i];
		var vararr = varstr.split("=");

		var name = vararr[0];
		var value = "";
		if (vararr.length > 1) {
			value = vararr[1];
			if (vararr.length > 2) {
				for (var vl = 2; vl < vararr.length; vl++) {
					value += "=" + vararr[vl];
				}
			}
		}

		chas2.args[name] = value;
	}


	// Инициализация режима отладки
	if (chas2.hasArgument("debug")) {
		chas2._.debug_mode = true;
		chas2.Ldebug("Режим отладки включен");
		$("#mark-debug").show();
	}


	// Получение текущей версии
	chas2.info.VERSION_EXACT = document.getElementById("var-version-exact").value;
	chas2.info.VERSION_TITLE = document.getElementById("var-version-title").value;


	// Проверка откуда запущен тренажёр
	if (location.href.split(":")[0] == "file") {
		chas2._.local = true;
		$("#mark-local").show();
	}
})();
