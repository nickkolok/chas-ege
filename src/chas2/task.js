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
	},


	/** @function NApi.task.setCountableTask
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
	 * @param {String} options.pre то, что пишется в вопросе перед задачей
	 */
	setCountableTask : function(mainList,options) {
		var tmpObject=svVel(mainList);
		if(options){
			if(options.preambula){
				tmpObject.text=options.preambula+tmpObject.text;
			}
		}
		NAtask.setTask(tmpObject);
	},


	/** @function NApi.task.variativeABC
	 * Перемешать буквы латинского алфавита в заданиях, например, на геометрию 
	 */
	 //Она же - бывшая dvig.variativeABC, ибо там она не использовалась (не знаю, почему).
	variativeABC : function(){
		var alph='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
		var alph2=alph.slice().shuffle();
		vopr=mapRecursive(vopr,function(str){
			return (''+str).cepZamena(alph,alph2);
		});
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
			NAtask.setTwoStatementTask(two[0][0],two[0][1],two[1][0],two[1][1],trueA);
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
		NAtask.setTask({
			text:text,
			answers:answers,
			wrongAnswers:wrongAnswers,
		});
		AtoB();
	},


	/** @function NApi.task.replaceCodeInText
	 * Заменить специальный код на пояснения
	 * @param {String} code код
	 * @param {String|String[]} explanations пояснения
	 */
	replaceCodeInText : function(code, explanations){
		if(explanations.isString){
			explanations=[explanations];
		}
		var len=explanations.length;
		for(var i=0;i<len;i++){
			vopr.txt=vopr.txt.replace(code,explanations[i]);
			//Внимание: заменяется одно вхождение!
		}
	},
}

