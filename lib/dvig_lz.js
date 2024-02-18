'use strict';

//{{ Новый, даже работающий, парсер линейных задач
let punctuation = [',', '.', ':', ';', '?', '!'];
function splitTextToLexems(text) {
	var lexemArray = text.split(/[!?\[\]' '()°]/);
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
	text = text.replace(/(\d+)(?=[А-ЯЁ])/ig, "$1 "); //Отделяем от слов "прилипшие" числа
	var lexemArray = splitTextToLexems(text);
	console.log(lexemArray);

	var variableList = {};
	lexemArray = variateNumbersWithNouns(lexemArray, variableList);
	lexemArray = variateOtherNumbers(lexemArray, variableList);

	var form2word = {}, array2word = {}, word2array = {};
	createDecorationMaps(lexemArray, form2word, array2word, word2array);

	console.log(form2word);
	console.log(array2word);
	console.log(word2array);

	var decorationList = {};
	replaceDecorations_1word_1topic(lexemArray, form2word, array2word, word2array, decorationList);


	variableList.n00 = 0; // Заготовка для ответа
	let str=joinLexemsToText(lexemArray);
	for(let i=0;i<punctuation.length;i++){
		while(str.includes(' '+punctuation[i]))
		str=str.replace(' '+punctuation[i],punctuation[i]);
	}
	return (
		"(function() { 'use strict'; retryWhileError(function() {\n" +
			"\t/* " + text + " */\n\n" +
			joinVariableList(variableList) + "\n" +
			joinDecorationList(decorationList) + "\n" +
			"\tNAtask.setTask({\n" +
				"\t\ttext: '" + str + "',\n"+
				"\t\tanswers: n00,\n"+
				"\t\tauthors: [''],\n"+
			"\t});\n"+
			"\tNAtask.modifiers.allDecimalsToStandard(/*true*/);\n"+
		"}, 2000);})();\n" +
		"// \n"
	);
}

function joinVariableList(variableList) {
	var code = '';
	for (var variable in variableList) {
		code += '\tvar ' + variable + '=' + variableList[variable] + ';\n';
	}
	return code;
}


function joinDecorationList(decorationList) {
	function genVarString(j){
		return (
			'var ' + decoration + ' = sklonlxkand(decor.' + decorationList[decoration][j] + '.iz()); ' +
			'// ' + JSON.stringify(decor[decorationList[decoration][j]].slice()) +
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
	return code + '\n\t//var   = sklonlxkand([].iz()); // Заготовочка!\n';
}


var chislitlxPossibleForms =
	['ie','re','de','ve','te','pe', 'im','rm','dm','vm','tm','pm', 'r2'];

function variateNumbersWithNouns(lexemArray, variableList) {
	var actualWord = '', actualCase = '';

	function chislitlxCheck(number, word, wordForm) {
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
			var foundWord = newLexemArray[i + 1];
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
	form = form.toLowerCase();
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

function replaceDecorations_1word_1topic(lexemArray, form2word, array2word, word2array, decorationList) {
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
			safepushtodict(decorationList, 's' + decorationCounter, array);
			for (var j = 0; j < lexemArray.length; j++) {
				var form = lexemArray[j];
				if (form2word[form] != word) {
					continue;
				}
				lexemArray[j] =
					"' + s" + decorationCounter + "." + lx_guessWordForm(word, form) +
					".toZagl()".esli(form.toZagl() == form) +
					" +'";
			}
		}
		decorationCounter++;
	}
}


module.exports = {makeTemplateFromPlainText, splitTextToLexems, variateOtherNumbers, joinVariableList };
//}}
