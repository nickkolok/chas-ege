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
	let str=lexemArray.join(' ');
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
	var newLexemArray = lexemArray.slice();
	for (var i = 0, len = newLexemArray.length; i < len; i++) {
		if (newLexemArray[i].isNumeric()) {
			//TODO: человекопонятные названия переменных на основе ближайших слов, если не заняты
			var foundWord = newLexemArray[i + 1];
			var foundNumber = newLexemArray[i];
			var actualWord = '', actualCase = '';
			for (var j = foundWord.length; j && !actualWord; j--) {
				//TODO: отслеживать реальное наличие в lx. Или наоборот?
				if (foundWord.length > 3) {
					for (var p of ['','i','r','d','v','t','p']){
						if (chislitlx(foundNumber, foundWord.substr(0, j), p) == foundNumber + ' ' + foundWord) {
							actualWord = foundWord.substr(0, j);
							actualCase = p;
							break;
						}
					}
				}
				if (actualWord){
					break;
				}
				//TODO: поиск по всему lx
			}
			if (actualWord) {
				//Нашли подходящее слово
				variableList['n' + i] = 'sl(' + 1 + ',' + newLexemArray[i] + ',1)';
				newLexemArray.splice(i, 2,
					"'+chislitlx(n" + i + ",'",
					actualWord,
					("', '" + p).esli(actualCase) + "') + '",
				);
			}
		}
	}
	return newLexemArray;
}
module.exports = {makeTemplateFromPlainText, splitTextToLexems, variateOtherNumbers, joinVariableList };
//}}
