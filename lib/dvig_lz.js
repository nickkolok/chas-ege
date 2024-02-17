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
			variableList['n' + i] = 'sl(' + 1 + ',' + lexemArray[i].replace(',', '.') + ',' + '1)';
			lexemArray[i]="'+n"+i+"+'";
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
	let str=joinLexemsToText(lexemArray);
	for(let i=0;i<punctuation.length;i++){
		while(str.includes(' '+punctuation[i]))
		str=str.replace(' '+punctuation[i],punctuation[i]);
	}
	return "(function() {\n" + joinVariableList(variableList) + "\nNAtask.setTask({\n\ttext:'" + str + "',\n\tanswers:0,\n});\n})();\n";
}

function joinVariableList(variableList) {
	var code = '';
	for (var variable in variableList) {
		code += 'var ' + variable + '=' + variableList[variable] + ';\n';
	}
	return code;
}

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
	for (var i = 0, len = newLexemArray.length; i < len; i++) {
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
			for (var j = foundWord.length; j && !actualWord; j--) {
				if (chislitlxCheck(foundNumber, foundWord.substr(0, j), foundWord)) {
					break;
				}
				//TODO: отслеживать реальное наличие в lx. Или наоборот?
				//TODO: поиск по всему lx
			}
			if (actualWord) {
				//Нашли подходящее слово
				variableList['n' + i] = 'sl(' + 1 + ',' + newLexemArray[i] + ',1)';
				newLexemArray.splice(i, 2,
					"'+chislitlx(n" + i + ",'",
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
module.exports = {makeTemplateFromPlainText, splitTextToLexems, variateOtherNumbers, joinVariableList };
//}}
