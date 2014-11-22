/** @namespace NApi.task
 * Параметры задания
 */
NApi.task = {
	/** @namespace NApi.task._
	 * Функционал, используемый только внутри модуля NApi.task
	 * @private
	 */
	_ : {},

	/** @class NApi.task.Task
	 * Задание
	 * @property {String} text Текст задания
	 * @property {String} analys Текст разбора задания
	 * @property {Array} answers Правильные ответы
	 * @property {Array} wrong_answers Неправильные ответы
	 * @property {Array} tags Теги
	 * @property {Function} check_answer Функция проверки ответа
	 * @property {Function} draw Функция отрисовки
	 *
	 * @constructor NApi.task.Task
	 * @param {String} text текст задания
	 * @param {String} analys текс разбора задания
	 * @param {Array} answers правильные ответы
	 * @param {Array} wrong_answers неправильные ответы
	 * @param {Array} tags теги
	 * @param {Function} check_answer функция проверки ответа
	 * @param {Function} draw функция отрисовки
	 */
	Task : function(text, analys, answers, wrong_answers, tags, check_answer, draw) {
		return {
			text : text || "",
			analys : analys || "",
			answers : answers || [],
			wrong_answers : wrong_answers || [],
			tags : tags || [],
			check_answer : check_answer || undefined,
			draw : draw || undefined
		}
	},

	/** @function NApi.task.set_current_task
	 * Установить задание
	 * @param {String} text текст задания
	 * @param {String} analys текс разбора задания
	 * @param {Array} answers правильные ответы
	 * @param {Array} wrong_answers неправильные ответы
	 * @param {Array} tags теги
	 * @param {Function} check_answer функция проверки ответа
	 * @param {Function} draw функция отрисовки
	 */
	set_task : function(text, analys, answers, wrong_answers, tags, check_answer, draw) {
		window.vopr.podg();

		window.vopr.txt = text;
		window.vopr.rsh = analys;
		window.vopr.ver = answers;
		window.vopr.nev = wrong_answers;
		if (check_answer) {
			window.vopr.vrn = check_answer;
		}
		if (draw) {
			window.vopr.dey = draw;
		}

		if (tags) {
			for (var t in tags) {
				window.vopr.kat[tags[t]] = 0;
			}
		}
	}
}


/**
 * Алиас на NApi.task
 */
var Ntask = NApi.task;

