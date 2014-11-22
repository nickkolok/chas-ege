NApi._.Linfo("NApi.task");

/** @namespace NApi.task
 * Параметры задания
 */
NApi.task = {
	/** @namespace NApi.task._
	 * Функционал, используемый только внутри модуля NApi.task
	 * @private
	 */
	_ : {
		current_task : undefined
	},

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
	 * Установить текущее задание
	 * @param {NApi.task.Task} task задание
	 */
	set_current_task : function(task) {
		NApi.task._.current_task = task;

		window.vopr.podg();

		if (task != undefined) {
			window.vopr.txt = task.text;
			window.vopr.rsh = task.analys;
			window.vopr.ver = task.answers;
			window.vopr.nev = task.wrong_answers;
			if (task.check_answer != undefined) {
				window.vopr.vrn = task.check_answer;
			}
			if (task.draw != undefined) {
				window.vopr.dey = task.draw;
			}

			for (var t in task.tags) {
				window.vopr[task.tags[t]] = 0;
			}
		}
	},

	/** @function NApi.task.get_current_task
	 * @return текущее задание
	 */
	get_current_task : function() {
		return NApi.task._.current_task;
	}
}

