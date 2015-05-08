"use strict";

/** @namespace chas2.task
 * Параметры задания
 */
chas2.task = {
	/** @namespace chas2.task._
	 * Функционал, используемый только внутри модуля chas2.task
	 * @private
	 */
	_ : {},


	/** @function chas2.task.setTask
	 * Установить задание
	 * @param {String} text текст задания
	 * @param {String} analys текс разбора задания
	 * @param {String|Number|String[]|Number[]} answers правильные ответы
	 * @param {String|Number|String[]|Number[]} wrongAnswers неправильные ответы
	 * @param {String[]} tags теги
	 * @param {Function} checkAnswer функция проверки ответа
	 * @param {Function} draw функция отрисовки
	 */
	setTask : function(o) {
		window.vopr.podg();

		var text = o.text || "";
		var analys = o.analys || "";
		var answers = o.answers || [];
		var wrongAnswers = o.wrongAnswers || [];
		var checkAnswer = o.checkAnswer;
		var draw = o.draw;
		var tags = o.tags;

		if (NLib.getTypeOf(text) != "[object String]") {
			throw TypeError("Параметр text должен быть строкой");
		}

		if (NLib.getTypeOf(analys) != "[object String]") {
			throw TypeError("Параметр analys должен быть строкой");
		}

		if (checkAnswer != undefined && NLib.getTypeOf(checkAnswer) != "[object Function]") {
			throw TypeError("Параметр checkAnswer должен быть функцией или отсутствовать");
		}

		if (draw != undefined && NLib.getTypeOf(draw) != "[object Function]") {
			throw TypeError("Параметр draw должен быть функцией или отсутствовать");
		}

		if (tags != undefined && NLib.getTypeOf(tags) != "[object Array]") {
			throw TypeError("Параметр tags должен быть массивом строк или отсутствовать");
		}
		for (var t in tags) {
			if (NLib.getTypeOf(t) != "[object String]") {
				throw TypeError("Параметр tags (массив) должен содержать только строки");
			}
		}

		answers = NLib.toStringsArray(answers);
		wrongAnswers = NLib.toStringsArray(wrongAnswers);

		window.vopr.txt = text;
		window.vopr.rsh = analys;
		window.vopr.ver = answers;
		window.vopr.nev = wrongAnswers;
		if (checkAnswer) {
			window.vopr.vrn = checkAnswer;
		}
		if (draw) {
			window.vopr.dey = draw;
		}

		if (tags) {
			for (var t in tags) {
				window.vopr.kat[tags[t]] = 0;
			}
		}

		var voprcheck = dvig.validateVopr();
		if (voprcheck) {
			chas2._.Lwarn("Результат проверки вопроса:\n\t" + voprcheck);
		}
	}
}

