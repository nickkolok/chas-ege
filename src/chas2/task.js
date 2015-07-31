"use strict";

/** @namespace chas2.task
 * Параметры задания
 */
chas2.task = {
	/** @namespace chas2.task._
	 * Функционал, используемый только внутри модуля chas2.task
	 * @private
	 */
	_ : {
		/** @function chas2.task.validateTask
		 * Проверить корректность объекта-задания
		 * @param {String} text текст задания
		 * @param {String} analys текст разбора задания
		 * @param {String|Number|String[]|Number[]} answers правильные ответы
		 * @param {String|Number|String[]|Number[]} wrongAnswers неправильные ответы
		 * @param {String[]} tags теги
		 * @param {Function} checkAnswer функция проверки ответа
		 * @param {Function} draw функция отрисовки
		 */
		validateTask : function(o) {
			if (NLib.getTypeOf(o.text) != "[object String]") {
				throw TypeError("Параметр text должен быть строкой");
			}

			if (NLib.getTypeOf(o.analys) != "[object String]") {
				throw TypeError("Параметр analys должен быть строкой");
			}

			if (o.checkAnswer != undefined && NLib.getTypeOf(o.checkAnswer) != "[object Function]") {
				throw TypeError("Параметр checkAnswer должен быть функцией или отсутствовать");
			}

			if (o.draw != undefined && NLib.getTypeOf(o.draw) != "[object Function]") {
				throw TypeError("Параметр draw должен быть функцией или отсутствовать");
			}

			if (o.tags != undefined && NLib.getTypeOf(o.tags) != "[object Object]") {
				throw TypeError("Параметр tags должен быть массивом строк или отсутствовать");
			}
			if (o.tags) { 
				//Следующий цикл сомнителен: for-in разве не всегда возвращает строки?
				for (var t in o.tags) {
					if (NLib.getTypeOf(t) != "[object String]") {
						throw TypeError("Параметр tags (массив) должен содержать только строки");
					}
				}
			}		
		},


		/** @function chas2.task.normalizeTask
		 * Привести объект-задани к нормальному виду
		 * @param {String} text текст задания
		 * @param {String} analys текст разбора задания
		 * @param {String|Number|String[]|Number[]} answers правильные ответы
		 * @param {String|Number|String[]|Number[]} wrongAnswers неправильные ответы
		 * @param {String[]} tags теги
		 * @param {Function} checkAnswer функция проверки ответа
		 * @param {Function} draw функция отрисовки
		 */
		normalizeTask : function(o) {
			o.text = o.text || "";
			o.analys = o.analys || "";
			o.answers = NLib.toStringsArray(o.answers || []);
			o.wrongAnswers = NLib.toStringsArray(o.wrongAnswers || []);
		},
	
	},


	
	
	/** @function chas2.task.setTask
	 * Установить задание
	 * @param {String} text текст задания
	 * @param {String} analys текст разбора задания
	 * @param {String|Number|String[]|Number[]} answers правильные ответы
	 * @param {String|Number|String[]|Number[]} wrongAnswers неправильные ответы
	 * @param {String[]} tags теги
	 * @param {Function} checkAnswer функция проверки ответа
	 * @param {Function} draw функция отрисовки
	 */
	setTask : function(o) {
		chas2.task._.normalizeTask(o);
		chas2.task._.validateTask(o);

		window.vopr.podg();
		window.vopr.txt = o.text;
		window.vopr.rsh = o.analys;
		window.vopr.ver = o.answers;
		window.vopr.nev = o.wrongAnswers;
		if (o.checkAnswer) {
			window.vopr.vrn = o.checkAnswer;
		}
		if (o.draw) {
			window.vopr.dey = o.draw;
		}
		
		window.vopr.kat.importFrom(o.tags);

		var voprcheck = dvig.validateVopr();
		if (voprcheck) {
			chas2._.Lwarn("Результат проверки вопроса:\n\t" + voprcheck);
		}
	},

	/** @function chas2.task.getTask
	 * Получить задание - то же, что setTask, только наоборот
	 */
	getTask : function() {
		var o = {
			text : window.vopr.txt,
			analys : window.vopr.rsh,
			answers : window.vopr.ver,
			wrongAnswers : window.vopr.nev,
			checkAnswer : window.vopr.vrn,
			draw : window.vopr.dey,
			tags : {},
		};
		chas2.task._.normalizeTask(o);
		chas2.task._.validateTask(o);

		o.tags.importFrom(window.vopr.kat);

		var voprcheck = dvig.validateVopr();
		if (voprcheck) {
			chas2._.Lwarn("Результат проверки вопроса:\n\t" + voprcheck);
		}
		return o;
	},

	/** @function chas2.task.setCountableTask
	 * Установить задание на движке расчётных задач
	 * @param {Object[]} mainList основной массив величин
	 * @param {String} mainList[].vel: название величины
	 * @param {Number} mainList[].rod: род существительного
		0: мужской
		1: женский
		2: средний
		3: только во множественном числе
	 * @param {String} mainList[].bkv: буква, которой обозначается величина. Если её нет, не упоминается.
	 * @param {String|Number} mainList[].zna: значение величины
	 * @param {String} mainList[].nmn: размерность величины. Опять же, если не указано - лесом.
	 * @param {Number|Boolean} mainList[].nah: можно ли требовать найти величину
	 * @param {String} mainList[].pre: префикс, то есть то, что пишется перед названием величины
	 * @param {String} mainList[].utv: альтернативное величине утвердительное высказывание
	 * @param {String} mainList[].vpr: альтернативный вопрос
	 * @param {String|Number} mainList[].vin: величина в винительном падеже. Если равна 1, то именительный и винительный падежи совпадают. Если не определена, то конструкции, где нужен в. п., избегаются.
	 * @param {Object} options: дополнительные опции
	 * @param {String} options.preambula то, что пишется в вопросе перед задачей
	 * @param {Object} taskOptions: дополнительные опции, передаваемые setTask
	 */
	setCountableTask : function(mainList,options,taskOptions) {
		var tmpObject=svVel(mainList);
		if(options){
			if(options.preambula){
				tmpObject.text=options.preambula+tmpObject.text;
			}
		}
		tmpObject.importFrom(taskOptions);
		chas2.task.setTask(tmpObject);
	},


	/** @function NApi.task.setTwoStatementTask
	 * Составить задание о двух утверждениях 
	 * @param {String|Object[]} stA первое утверждение (или массив утверждений)
	 * @param {Boolean} trueA истинность первого утверждения
	 * @param {String} stB второе утверждение
	 * @param {Boolean} trueB истинность второго утверждения
	 * @param {String|String[]} pre префикс задания
	 */
	 setTwoStatementTask : function(stA, trueA, stB, trueB, pre){
		if(stA.isArray){
			var two=stA.iz(2);
			chas2.task.setTwoStatementTask(two[0][0],two[0][1],two[1][0],two[1][1],trueA);
			return;
		}
		if(!pre){
			pre=[[
					"Какое утверждение является истинным?",
					"Какое утверждение верно?",
				],[
					"Какое утверждение не является истинным?",
					"Какое утверждение является ложным?",
					"Какое утверждение неверно?",
				]];
		}
		if(pre.isArray && pre[1] && sl1()){
			if(pre[1].isArray){
				pre=pre[1].iz();
			}else{
				pre=pre[1];
			}	
			trueA =! trueA;
			trueB =! trueB;
		} else if(pre.isArray){
			if(pre[0].isArray)
					pre=pre[0].iz();
			else
				pre=pre[0];
		}
		var wrongAnswers=[
			"Ни А, ни Б",
			"Только Б",
			"Только А",
			"А и Б",
		];
		var answers = wrongAnswers.splice(2*trueA+trueB,1);
		var br="<br/>";
		var text=pre+br+br+"А) "+stA+br+"Б) "+stB+br+br;
		chas2.task.setTask({
			text:text,
			answers:answers,
			wrongAnswers:wrongAnswers,
		});
		AtoB();
	},


	/** @function chas2.task.replaceCodeInText
	 * Заменить специальный код на пояснения
	 * @param {String} code код
	 * @param {String|String[]} explanations пояснения
	 */
	replaceCodeInText : function(code, explanations){
		vopr.txt=vopr.txt.replaceCode(code,explanations[i]);
	},
	
	
	modifiers : {
		/** @function chas2.task.modifiers.addJqplot
		 * Добавить график с применением jqplot
		 * Нет, можно, конечно, и в лоб, но зачем?
		 * @param {Array} dataArray массив, передаваемый jqplot согласно его документации (второй параметр вызова $.jqplot)
		 * @param {Array} options опции, передаваемые jqplot согласно его документации (третий параметр вызова $.jqplot)
		 * @param {String} height высота иллюстрации в единицах CSS либо пикселях
		 * @param {String} width ширина иллюстрации в единицах CSS либо пикселях
		 */
		addJqplot : function(m){
			var o = chas2.task.getTask();
			var randomDivId = 'jqplotTarget'+sl(1000000);
			var height = m.height || '320px';
			var width = m.width || 'auto';
			(typeof(height) == 'string') || (height = height + 'px');
			(typeof(width) == 'string') || (width = width + 'px');
			o.text = '<div id="' + randomDivId + '" style="text-align:center;height:' + height + ';width:' + width +
				'" data-html-differentiator="' + Math.random() + '"></div>' + o.text;
			var previousDraw=o.draw;
			o.draw=function(){
				//Замыкание же!
				previousDraw();
				$.jqplot(randomDivId, m.dataArray, m.options);
			};
			chas2.task.setTask(o);
		},
		
		
		/** @function chas2.task.modifiers.variativeABC
		 * Перемешать буквы латинского алфавита в заданиях, например, на геометрию 
		 */
		variativeABC : (function(){
			var alph='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
			return function(){
				var alph2=alph.slice().shuffle();
				chas2.task.setTask(
					mapRecursive(
						chas2.task.getTask(),
						function(str){
							return (''+str).cepZamena(alph,alph2);
						}
					)
				);
			};
		})(),
		
	},
}

