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
			lexemArray[i]="'+n"+i+"+'"
			variableList['n' + i] = 'sl(' + 1 + ',' + lexemArray[i].replace(',', '.') + ',' + '1)';
		}
	}
	return lexemArray;
}

function makeTemplateFromPlainText(text) {
	text = text.replace(/­/g, ""); //Убиваем мягкий перенос
	text = text.replace('\n', ""); //Убиваем перенос
	var lexemArray = splitTextToLexems(text);
	console.log(lexemArray);
	var variableList = {};
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
	var newLexemArray = [];
	for (var i = 0, len = lexemArray.length; i < len; i++) {
		if (lexemArray[i].isNumeric()) {
			//TODO: человекопонятные названия переменных на основе ближайших слов, если не заняты
			var foundWord = lexemArray[i + 1];
			var foundNumber = lexemArray[i];
			var actualWord = '';
			for (var j = foundWord.length; j && !actualWord; j--) {
				//TODO: отслеживать реальное наличие в lx. Или наоборот?
				if (foundWord.length > 3)
					if (chislitlx(foundNumber, foundWord.substr(0, j)) == foundNumber + ' ' + foundWord) {
						actualWord = foundWord.substr(0, j);
						break;
					}
				//TODO: поиск по всему lx
			}
			if (actualWord) {
				//Нашли подходящее слово
				variableList['n' + i] = 'sl(' + 1 + ',' + lexemArray[i] + ')';
				newLexemArray = newLexemArray.concat(splitTextToLexems("'+chislitlx(n" + i + ",'" + actualWord + "')+'"));
				i += 2; //А что зря цикл гонять?
			} else {
				newLexemArray = newLexemArray.concat([lexemArray[i]]);
			}
		} else {
			newLexemArray.push(lexemArray[i]);
		}
	}
	return newLexemArray;
}
module.exports = {makeTemplateFromPlainText, splitTextToLexems, variateOtherNumbers, joinVariableList };
//}}
