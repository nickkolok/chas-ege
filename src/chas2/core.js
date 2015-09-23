'use strict';


/** @namespace chas2
 * New API [на́пи]
 */
window.chas2 = {};


/** @namespace chas2._
 * Функционал, используемый только внутри самого chas2
 * @private
 */
chas2._ = {
	debugMode : false,
	local : false,
	verboseMode : false,
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
	   Версия
	 */
	VERSION : '?.?.?',


	/** @function chas2.info.requireApiVersion
	 * Проверить совместимость
	 * @param {Number} major
	 * @param {Number} minor
	 */
	requireApiVersion : function(major, minor) {
		if (major > chas2.info.API_VERSION.major || minor > chas2.info.API_VERSION.minor) {
			console.warn('Была запрошена более новая версия chas2');
		}
	}
};


chas2.log = {};


/** @function chas2.log.info
 * Занести в лог информацию
 * @param {String} msg текст сообщения
 */
chas2.log.info = function(msg) {
	console.log(msg);
};


/** @function chas2.log.msg
 * Занести в лог сообщение
 * @param {String} msg текст сообщения
 */
chas2.log.msg = function(msg) {
	console.info(msg);
};


/** @function chas2.log.warn
 * Занести в лог предупреждение
 * @param {String} msg текст сообщения
 */
chas2.log.warn = function(msg) {
	console.warn(msg);
};


/** @function chas2.log.error
 * Занести в лог информацию об ощибке
 * @param {String} msg текст сообщения
 */
chas2.log.error = function(msg) {
	console.error(msg);
};


/** @function chas2.log.debug
	Занести в лог отладочную информацию
	@param {String} msg текст сообщения
	@note Выводиться только в режиме отладки
*/
chas2.log.debug = function(msg) {
	if (chas2.debug) {
		console.log('[DEBUG] ' + msg);
	}
};


Object.defineProperty(chas2, 'debug', {
	get: function() { return chas2._.debug; }
});


Object.defineProperty(chas2, 'local', {
	get: function() { return chas2._.local; }
});


Object.defineProperty(chas2, 'verboseMode', {
	get: function() { return chas2._.verboseMode; }
});


chas2.verbose = {};


/** @function chas2.verbose.info
 * Занести в лог информацию (только при verbose-режиме)
 * @param {String} msg текст сообщения
 */
chas2.verbose.info = function(msg) {
	if (chas2.verboseMode) {
		console.log(msg);
	}
};


/** @function chas2.verbose.msg
 * Занести в лог сообщение (только при verbose-режиме)
 * @param {String} msg текст сообщения
 */
chas2.verbose.msg = function(msg) {
	if (chas2.verboseMode) {
		console.info(msg);
	}
};


/** @function chas2.verbose.warn
 * Занести в лог предупреждение (только при verbose-режиме)
 * @param {String} msg текст сообщения
 */
chas2.verbose.warn = function(msg) {
	if (chas2.verboseMode) {
		console.warn(msg);
	}
};


/** @function chas2.verbose.error
 * Занести в лог информацию об ощибке (только при verbose-режиме)
 * @param {String} msg текст сообщения
 */
chas2.verbose.error = function(msg) {
	if (chas2.verboseMode) {
		console.error(msg);
	}
};


/** @function chas2.panic
 * Сообщить о серёзной проблеме (с последующей остановкой)
 * @param cause причина
 */
chas2.panic = function(cause) {
	chas2.log.err('chas2.panic()');
	switch (chas2.getTypeOf(cause)) {
	case '[object String]':
		chas2.log.info('Причина: ' + cause);
		break;
	case '[object Error]':
		chas2.log.info('Причина: ' + cause.msg);
		break;
	default:
		throw Error('Паника');
	}
};


/**
   Хеш текущей страницы
 */
chas2.hash = '';


/**
   Аргументы текущей страницы
 */
chas2.args = {};


/** @function chas3.hasArgument
   Проверка на наличия аругмента
   @param argument Аргумент
 */
chas2.hasArgument = function(argument) {
	chas2.log.info(argument);
	return !!chas2.args[argument] || chas2.args[argument] == '';
};


(function() {
	// Инициализация chas2.hash и chas2.args
	chas2.hash = location.hash.split('?')[0].slice(1);

	var href = location.href.split('?');
	var hashvarsstr = href[href.length - 1];

	var hashvars = hashvarsstr.split('&');
	for (var i = 0; i < hashvars.length; i++) {
		var varstr = hashvars[i];
		var vararr = varstr.split('=');

		var name = vararr[0];
		var value = '';
		if (vararr.length > 1) {
			value = vararr[1];
			if (vararr.length > 2) {
				for (var vl = 2; vl < vararr.length; vl++) {
					value += '=' + vararr[vl];
				}
			}
		}

		chas2.args[name] = value;
	}


	// Инициализация режима отладки
	if (chas2.hasArgument('debug')) {
		chas2._.debugMode = true;
		chas2.log.debug('Режим отладки включен');
		$('#mark-debug').show();
	}


	if (chas2.hasArgument('verbose')) {
		chas2._.verboseMode = true;
		chas2.verbose.info('Включен verbose-режим');
	}


	// Получение текущей версии
	try {//Обёртка на случай, если такого элемента нет
		//TODO: прекратить передавать данные JS->HTML->JS! Нечего дёргать DOM без необходимости!
		chas2.info.VERSION = document.getElementById('var-version').value;
	} catch (e) {
		// TODO: А если #var-version нет в DOM?
	}

	// Проверка откуда запущен тренажёр
	if (location.href.split(':')[0] == 'file') {
		chas2._.local = true;
		$('#mark-local').show();
	}
})();
