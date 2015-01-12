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
			NApi._.Lwarn("Результат проверки вопроса:\n\t" + voprcheck);
		}
	},
	/** @function NApi.task.setCountableTask
	 * Установить задание на движке расчётных задач
	 * @param {Object[]} o основной массив величин
	 * @param {String} o[].vel: название величины
	 * @param {Number} o[].rod: род существительного
		0: мужской
		1: женский
		2: средний
		3: только во множественном числе
	 * @param {String} o[].bkv: буква, которой обозначается величина. Если её нет, не упоминается.
	 * @param {String|Number} o[].zna: значение величины
	 * @param {String} o[].nmn: размерность величины. Опять же, если не указано - лесом.
	 * @param {Number|Boolean} o[].nah: можно ли требовать найти величину
	 * @param {String} o[].pre: префикс, то есть то, что пишется перед названием величины
	 * @param {String} o[].utv: альтернативное величине утвердительное высказывание
	 * @param {String} o[].vpr: альтернативный вопрос
	 * @param {String|Number} o[].vin: величина в винительном падеже. Если равна 1, то именительный и винительный падежи совпадают. Если не определена, то конструкции, где нужен в. п., избегаются.
	 */
	setCountableTask : function(o) {
		NAtask.setTask(svVel(o));
	},
	/** @function NApi.task.setCountableTaskWithPrefix
	 * Установить задание на движке расчётных задач
	 * @param {String} pre то, что пишется в вопросе перед задачей
	 * @param {Object[]} o основной массив величин
	 * @param {String} o[].vel: название величины
	 * @param {Number} o[].rod: род существительного
		0: мужской
		1: женский
		2: средний
		3: только во множественном числе
	 * @param {String} o[].bkv: буква, которой обозначается величина. Если её нет, не упоминается.
	 * @param {String|Number} o[].zna: значение величины
	 * @param {String} o[].nmn: размерность величины. Опять же, если не указано - лесом.
	 * @param {Number|Boolean} o[].nah: можно ли требовать найти величину
	 * @param {String} o[].pre: префикс, то есть то, что пишется перед названием величины
	 * @param {String} o[].utv: альтернативное величине утвердительное высказывание
	 * @param {String} o[].vpr: альтернативный вопрос
	 * @param {String|Number} o[].vin: величина в винительном падеже. Если равна 1, то именительный и винительный падежи совпадают. Если не определена, то конструкции, где нужен в. п., избегаются.
	 */
	setCountableTaskWithPrefix : function(pre,o) {
		var tmpObject=svVel(o);
		tmpObject.text=pre+tmpObject.text;
		NAtask.setTask(tmpObject);
	},
}

