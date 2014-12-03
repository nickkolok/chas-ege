"use strict";

/** @namespace NApi.task
 * Параметры задания
 */
NApi.task = {
	/** @namespace NApi.task._
	 * Функционал, используемый только внутри модуля NApi.task
	 * @private
	 */
	_ : {},


	/** @function NApi.task.setTask
	 * Установить задание
	 * @param {String} text текст задания
	 * @param {String} analys текс разбора задания
	 * @param {Array} answers правильные ответы
	 * @param {Array} wrongAnswers неправильные ответы
	 * @param {Array} tags теги
	 * @param {Function} checkAnswer функция проверки ответа
	 * @param {Function} draw функция отрисовки
	 */
	setTask : function(o) {
		window.vopr.podg();

		window.vopr.txt = o.text || "";
		window.vopr.rsh = o.analys || "";
		window.vopr.ver = o.answers || [];
		window.vopr.nev = o.wrongAnswers || [];
		if (o.checkAnswer) {
			window.vopr.vrn = checkAnswer;
		}
		if (o.draw) {
			window.vopr.dey = draw;
		}

		if (o.tags) {
			for (var t in o.tags) {
				window.vopr.kat[o.tags[t]] = 0;
			}
		}
	}
}

