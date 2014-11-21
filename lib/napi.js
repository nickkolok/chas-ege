(function() {
	console.log("NApi Initialization...");

	window._NApi_instance = {};
	var NApi = window._NApi_instance;

	// Информация о API
	function g_info() {
		NApi.info.VERSION = "InDev";
	}

	// Информация о состоянии
	function g_state(nai) {
		NApi.state.debug_mode = true; // TODO: debug_mode не должен быть по умолчанию
	}

	// Системное (используемое только в самом API) логирование
	function s_log() {
		NApi._.Linfo = function(s) {
			console.log("[NApi][info] " + s);
		};
		NApi._.Lmsg = function(s) {
			console.log("[NApi][msg] " + s);
		};
		NApi._.Lwarn = function(s) {
			console.log("[NApi][WARN] " + s);
		};
		NApi._.Lerr = function(s) {
			console.log("[NApi][ERROR] " + s);
		};
		NApi._.Ldebug = function(s) {
			if (NApi.state.debug_mode) {
				console.log("[NApi][DEBUG] " + s);
			}
		};
	}

	// Логирование
	function g_log() {
		NApi._.Linfo = function(s) {
			console.log("[info] " + s);
		};
		NApi._.Lmsg = function(s) {
			console.log("[msg] " + s);
		};
		NApi._.Lwarn = function(s) {
			console.log("[WARN] " + s);
		};
		NApi._.Lerr = function(s) {
			console.log("[ERROR] " + s);
		};
		NApi._.Ldebug = function(s) {
			if (NApi.state.debug_mode) {
				console.log("[DEBUG] " + s);
			}
		};
	}

	// Задания
	function g_task() {
		NApi.task.reset = function() {
			NApi.task.text = "";
			NApi.task.analys = "";
			NApi.task.answers = [];
			NApi.task.wrong_answers = [];
			NApi.task.tags = [];
			NApi.task.check_answer = [];
			NApi.task.draw = function() {};
		};
		NApi.task.reset();
	}

	NApi._ = {};
	NApi.state = {};
	NApi.info = {};
	NApi.task = {};

	g_info();
	g_state();
	s_log();
	g_log();
	g_task();

	if (NApi.state.debug_mode) {
		NApi._.Linfo("NApi " + NApi.info.VERSION + " debug-mode");
	} else {
		NApi._.Linfo("NApi " + NApi.info.VERSION);
	}

	NApi._.Linfo("Initialized!");
})();


function get_NApi() {
	if (window._NApi_instance != undefined) {
		return window._NApi_instance;
	} else {
		console.log("[NApi] Has not been initialized");
		return undefined;
	}
}

