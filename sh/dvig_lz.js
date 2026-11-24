'use strict';

//{{ Новый, даже работающий, парсер линейных задач
let punctuation = [',', '.', ':', ';', '?', '!', '(', ')', '[', ']'];
function splitTextToLexems(text) {
	var lexemArray = text.split(/[' '°]/);
	//отделение от слов символов пунктуации
	for (let i = 0; i < lexemArray.length; i++) {
		if (lexemArray[i].length > 1 && punctuation.includes(lexemArray[i].slice(-1))) {
			//замена [..[слово,]..] на [..[слово],[,]..]
			lexemArray.splice(i, 1, lexemArray[i].substr(0, lexemArray[i].length - 1), lexemArray[i].slice(-1))
		}
	}
	return lexemArray;
}

function joinLexemsToText(lexemArray){
	var text = lexemArray[0];
	for (let i = 1; i < lexemArray.length; i++) {
		text +=	' '.esli(lexemArray[i-1] && lexemArray[i]) + lexemArray[i];
	}
	return text;
}

function rejoinTwowordDecorations(lexemArray) {
	for (let array in decor) {
		for (let word of decor[array]) {
			let numberOfWords = word.split(" ").length;
			if (numberOfWords < 2) {
				continue;
			}
			for (let i = 0; i < lexemArray.length - 1; i++) {
				let twoword = lexemArray.slice(i, i + numberOfWords).join(' ');
				let form = lx_guessWordForm(word, twoword);
				if (!form) {
					continue;
				}
				lexemArray[i] = twoword;
				lexemArray.splice(i + 1, numberOfWords - 1);
			}
		}
	}
}

function variateHourMinuteNumbers(lexemArray, variableList) {
	for (var i = 0; i < lexemArray.length; i++) {
		if (/^\d{1,2}\:\d\d/.test(lexemArray[i])) {
			var numbers = lexemArray[i].split(':');
			var minutes = 60 * numbers[0] + 1 * numbers[1];
			variableList['minutes' + i] = 'sl(' + 30 + ', ' + minutes + ', ' + '30)';
			lexemArray[i] = "' + minutes" + i + ".toDvoet() + '";
		}
	}
	return lexemArray;
}


function variateOtherNumbers(lexemArray, variableList) {
//TODO: человекопонятные названия переменных на основе ближайших слов, если не заняты
	for (var i = 0; i < lexemArray.length; i++) {
		if (lexemArray[i].isNumeric()) {
			variableList['n' + i] = 'sl(' + 1 + ', ' + lexemArray[i].replace(',', '.') + ', ' + '1)';
			lexemArray[i]="' + n"+i+" + '";
		}
	}
	return lexemArray;
}

function makeTemplateFromPlainText(text) {
	text = text.replace(/­/g, ""); //Убиваем мягкий перенос
	text = text.replace(/\n/g, ""); //Убиваем перенос
	text = text.replace(/\s+/g, " "); //Все пробелы - один пробел!
	text = text.replace(/(\d+)(?=[А-ЯЁ\-])/ig, "$1 "); //Отделяем от слов "прилипшие" числа

	// Полностью ликвидируем дефисы
	// TODO: вообще так быть не должно, можно продолбать всякие шапки-невидимки
	// Но пока выгоды осязаемы, а издержки только гипотетические
	text = text.replace(/([а-яё])-([а-яё])/g, "$1$2"); //Отделяем от слов "прилипшие" числа

	var lexemArray = splitTextToLexems(text);
	rejoinTwowordDecorations(lexemArray);
	console.log(lexemArray);

	var needsVariativeABC = /\s[A-Z]+\s/.test(text);

	var variableList = {};
	lexemArray = variateNumbersWithNouns(lexemArray, variableList);
	lexemArray = variateHourMinuteNumbers(lexemArray, variableList);
	lexemArray = variateOtherNumbers(lexemArray, variableList);

	var form2word = {}, array2word = {}, word2array = {};
	createDecorationMaps(lexemArray, form2word, array2word, word2array);

	console.log(form2word);
	console.log(array2word);
	console.log(word2array);

	var decorationList = {};
	replaceDecorationsSoloWords(lexemArray, form2word, array2word, word2array, decorationList);
	replaceDecorationsMultipleWords(lexemArray, form2word, array2word, word2array, decorationList);


	variableList.n00 = 0; // Заготовка для ответа
	let str=joinLexemsToText(lexemArray);
	for(let i=0;i<punctuation.length;i++){
		while(str.includes(' '+punctuation[i]))
		str=str.replace(' '+punctuation[i],punctuation[i]);
	}

	// Режем строку по границе предложений / фраз
	str = str.replace(/([а-яё'][\.])\s([А-ЯЁ][а-яё])/g, "$1 '+\n\t\t\t'$2");
	str = str.replace(/([а-яё'][\,])\s([а-яё])/g, "$1 '+\n\t\t\t'$2");

	return (
		"(function() { 'use strict'; retryWhileError(function() {\n" +
			"\t/* " + text + " */\n\n" +
			joinVariableList(variableList) + "\n" +
			"\t//genAssert(,''); //Заготовочка!\n" +
			"\t//genAssertZ1000(,''); //Заготовочка!\n" +
			"\n" +
			joinDecorationList(decorationList, array2word) + "\n" +
			"\tNAtask.setTask({\n" +
				"\t\ttext:\n"+
				"\t\t\t'" + str + "',\n"+
				"\t\tanswers: n00,\n"+
				"\t\tauthors: [''],\n"+
			"\t});\n"+
			"\tNAtask.modifiers.allDecimalsToStandard(/*true*/);\n"+
			"\tNAtask.modifiers.variativeABC();\n".esli(needsVariativeABC)+
		"}, 2000);})();\n" +
		"// РешуЕГЭ: \n" +
		"// \n"
	);
}

function joinVariableList(variableList) {
	var code = '';
	for (var variable in variableList) {
		code += '\tlet ' + variable + '=' + variableList[variable] + ';\n';
	}
	return code;
}


function joinDecorationList(decorationList, array2word) {
	function genVarString(j){
		var topic = decorationList[decoration][j];
		var noDeclension = (decor[topic].declensionType === 'none');
		return (
			'let ' + decoration + ' = ' +
			'sklonlxkand('.esli(!noDeclension) +
			'decor.' + topic + '.iz(' +
			('' + array2word[topic].length).esli(array2word[topic].length > 1) +
			')'.esli(!noDeclension) +
			'); ' +
			'// ' + JSON.stringify(decor[topic].slice()) +
			'\n'
		);
	}

	var code = '';
	for (var decoration in decorationList) {
		code += '\t' + genVarString(0);
		for (var i = 1; i < decorationList[decoration].length; i++){
			code += '\t//' + genVarString(i);
		}
	}
	return code + '\n\t//let   = sklonlxkand([].iz()); // Заготовочка!\n';
}


var chislitlxPossibleForms =
	['ie','re','de','ve','te','pe', 'im','rm','dm','vm','tm','pm', 'r2'];

function variateNumbersWithNouns(lexemArray, variableList) {
	var actualWord = '', actualCase = '';

	function chislitlxCheck(number, word, wordForm) {
		wordForm = wordForm.replace('-','');//Гасим паразитный перенос
		for (var p of ['','i','r','d','v','t','p']){
			if (chislitlx(number, word, p) == number + ' ' + wordForm) {
				actualWord = word;
				actualCase = p;
				return true;
			}
		}
		return false;
	}


	var newLexemArray = lexemArray.slice();
	for (var i = 0; i < newLexemArray.length; i++) {
		if (
			newLexemArray[i].isNumeric() // Число
		&&
			/[а-яё\-]{3,}/i.test(newLexemArray[i + 1]) // Слово
		) {
			//TODO: человекопонятные названия переменных на основе ближайших слов, если не заняты

			//Гасим паразитный перенос;
			//TODO: шапка-невидимка
			var foundWord = newLexemArray[i + 1].replace('-','');
			var foundNumber = newLexemArray[i];
			actualWord = '';
			actualCase = '';

			for (var word in lx){
				for (var form of chislitlxPossibleForms) {
					if(lx[word][form] == foundWord) {
						chislitlxCheck(foundNumber, word, foundWord);
						break;
					}
				}
			}

			for (var j = foundWord.length; j && !actualWord; j--) {
				if (chislitlxCheck(foundNumber, foundWord.substr(0, j), foundWord)) {
					break;
				}
				//TODO: отслеживать реальное наличие в lx. Или наоборот?
				//TODO: поиск по всему lx
			}
			if (actualWord) {
				//Нашли подходящее слово
				variableList['n' + i] = 'sl(' + 1 + ', ' + newLexemArray[i] + ', 1)';
				newLexemArray.splice(i, 2,
					"' + chislitlx(n" + i + ", '",
					"", // Показываем, что при конкатенации пробел не нужен
					actualWord,
					"",
					("', '" + actualCase).esli(actualCase) + "') + '",
				);
			}
		}
	}
	return newLexemArray;
}

function safepushtodict(obj,prop,item) {
	if (!obj[prop]) {
		obj[prop] = [];
	}
	obj[prop].push(item);
	obj[prop] = obj[prop].sortDelDubl();
}

function lx_guessWordForm(word, form) {
	form = form.toLowerCase().replace('-','');//Гасим паразитный перенос
	var obj = sklonlxkand(word);
	for (var prop of chislitlxPossibleForms) {
		if (String(obj[prop]).toLowerCase() == form) {
			return prop;
		}
	}
}

function createDecorationMaps(lexemArray, form2word, array2word, word2array){
	for (var form of lexemArray) {
		for (var topic in decor) {
			for (var word of decor[topic]) {
				if (lx_guessWordForm(word, form)) {
					form2word[form] = word;
					safepushtodict(array2word, topic, word);
					safepushtodict(word2array, word, topic);
					break;
				}
			}
		}
	}
}

function replaceDecorationsSoloWords(lexemArray, form2word, array2word, word2array, decorationList) {
	var decorationCounter = 10; // Будем бунтарями!
	for (var word in word2array) {
		for (var array of word2array[word]){
			console.log('Considering ' + array);

			if (array2word[array].length !== 1){
				console.log(array, array2word[array]);
				// Встретилось больше, чем одно слово из этого массива декораций
				continue;
			}

			console.log(word, array);

			var variableName = 'the_' + word2array[word][0];
			safepushtodict(decorationList, variableName, array);
			for (var j = 0; j < lexemArray.length; j++) {
				var form = lexemArray[j];
				if (form2word[form] != word) {
					continue;
				}
				lexemArray[j] =
					"' + " + variableName +
					("." + lx_guessWordForm(word, form)).esli(decor[array].declensionType !== 'none') +
					".toZagl()".esli(form.toZagl() == form) +
					" +'";
			}
		}
		decorationCounter++;
	}
}

/* TODO!
function pruneMultipleWords(array2word, word2array){
	// Назовём кратностью массива количество слов в нём.
	// Если слово не просто в нескольких массивах,
	// а в нескольких массивах в разной кратностью,
	// то его нужно оставить только в массиве в наибольшей кратностью
	// (TODO: комменты с остальными массивами?)
	for (var word in word2array) {
		if (word2array[word].length == 1) {
			// То и нечего огород городить!
			continue;
		}
		var maxlength = 0;
		var maxarray = '';
		for (var array of word2array[word]){
			if(array2word[array].length > maxlength){
				maxlength = array2word[array].length;
				maxarray  = array;
			}
		}
	}

}
*/

function replaceDecorationsMultipleWords(lexemArray, form2word, array2word, word2array, decorationList) {
	var decorationCounter = 10; // Будем бунтарями!
	for (var array in array2word){
		console.log('Considering ' + array);
		if (array2word[array].length <= 1){
			console.log(array, array2word[array], "Только одно слово - пропускаем!");
			// Встретилось только одно слово из этого массива декораций
			// (или не встретилось вообще, но тогда непонятно, как но туда попало)
			continue;
		}
		for (var i = 0; i < array2word[array].length; i++) {
			var word = array2word[array][i];

			console.log(word, array);
			var variableName = 'the_' + word2array[word][0];
			safepushtodict(decorationList, variableName, array);
			for (var j = 0; j < lexemArray.length; j++) {
				var form = lexemArray[j];
				if (form2word[form] != word) {
					continue;
				}
				lexemArray[j] =
					"' + " + variableName + "[" + i + "]." + lx_guessWordForm(word, form) +
					".toZagl()".esli(form.toZagl() == form) +
					" +'";
			}
		}
		decorationCounter++;
	}
}


try{
	module.exports = {makeTemplateFromPlainText, splitTextToLexems, variateOtherNumbers, joinVariableList };
}catch(e){
	// Не нода, а в браузере.
	// Что ж теперь, с ошибкой падать?
}
//}}
