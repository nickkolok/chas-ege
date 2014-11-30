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


	/** @function NApi.task.set_task
	 * Установить задание
	 * @param {String} text текст задания
	 * @param {String} analys текс разбора задания
	 * @param {Array} answers правильные ответы
	 * @param {Array} wrong_answers неправильные ответы
	 * @param {Array} tags теги
	 * @param {Function} check_answer функция проверки ответа
	 * @param {Function} draw функция отрисовки
	 */
	set_task : function(o) {
		window.vopr.podg();

		window.vopr.txt = o.text || "";
		window.vopr.rsh = o.analys || "";
		window.vopr.ver = o.answers || [];
		window.vopr.nev = o.wrong_answers || [];
		if (o.check_answer) {
			window.vopr.vrn = check_answer;
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

