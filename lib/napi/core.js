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
		VERSION : "InDev"
	},


	/** @namespace NApi._
	 * Функционал, используемый только внутри самого API
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


		/** @function NApi._.Ldebug
		 * Занести в лог отладочную информацию
		 * @param {String} msg текст сообщения
		 * @note Выводиться только в режиме отладки
		 * @private
		 */
		Ldebug : function(msg) {
			if (NApi.state.debug_mode) {
				console.log("[NApi][DEBUG] " + msg);
			}
		},


		/** @function NApi.load_js
		 * Загрузить .js-файл
		 * @param {String} path путь к .js-файлу
		 * @note Выводиться только в режиме отладки
		 * @private
		 */
		load_js : function(path) {
			document.write("<script charset=\"utf-8\" src=\"" + path + "\" onload=\"console.log('Loaded " + path + "');\"></script>");
		}
	},


	/** @namespace NApi.state
	 * Состояние приложения
	 */
	state : {
		/**
		 * Флаг отладочного режима
		 */
		debug_mode : true // TODO: debug_mode не должен быть по умолчанию
	},


	/** @namespace NApi.task
	 * Параметры задания
	 */
	task : {
		/**
		 * Текст задания
		 */
		get text () {
			return window.vopr.txt;
		},
		set text (v) {
			window.vopr.txt = v;
		},

		/**
		 * Разбор задания
		 */
		get analys () {
			return window.vopr.rsh;
		},
		set analys (v) {
			window.vopr.rsh = v;
		},

		/**
		 * Правильные ответы
		 */
		get answers () {
			return window.vopr.ver;
		},
		set answers (v) {
			window.vopr.ver = v;
		},

		/**
		 * Неправильные ответы
		 */
		get wrong_answers () {
			return window.vopr.nev;
		},
		set wrong_answers (v) {
			window.vopr.nev = v;
		},

		/**
		 * Теги
		 */
		tags : [],

		/**
		 * Функция проверки ответа
		 */
		get check_answer () {
			return window.vopr.vrn;
		},
		set check_answer (v) {
			window.vopr.vrn = v;
		},

		/** @function
		 * Функция отрисовки в canvas
		 */
		get draw () {
			return window.vopr.dey;
		},
		set draw (v) {
			window.vopr.dey = v;
		},

		/** @function NApi.task.reset
		 * Сбросить значения переменных NApi.task в исходные значения
		 */
		reset : function() { window.vopr.podg(); }
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


	/** @function NApi.Ldebug
	 * Занести в лог отладочную информацию
	 * @param {String} msg текст сообщения
	 * @note Выводиться только в режиме отладки
	 */
	Ldebug : function(msg) {
		if (NApi.state.debug_mode) {
			console.log("[DEBUG] " + msg);
		}
	}
};


(function() {
	NApi._.Linfo("NApi " + NApi.info.VERSION);
	if (NApi.state.debug_mode) {
		NApi._.Linfo("debug-mode");
	}

	NApi._.load_js("../lib/napi/dict.js");
	NApi._.load_js("../lib/napi/helper.js");
})();

