'use strict';
//{{Старые наброски парсера линейных задач

function lz_main(string){
	var vars=[];
	
}

function lz_split(string){
	if(!string)
		return [[]];
	var mas=string.reverse().split(/\s(?=[?!.,:;-])/).reverse().reverseElems();
	var len=mas.length;
	if(mas[len-1]==''){
		mas.length--;
		len--;
	}
	var temp;
	for(var i=0;i<len;){
		if(mas[i]==''){
			mas.splice(i,1);
			len--;
			continue;
		}
		temp=mas[i].match(/[?!.,:;-]+$/)[0];
		mas[i]=mas[i].replace(/[?!.,:;-]/g,'').split(/\s/);
		mas[i].push(temp);
		i++;
	}
	return mas.matrToVect();
}

//}}

//{{ Новый, даже немножко работающий, парсер линейных задач

function makeTemplateFromPlainText(text){
	text=text.replace(/­/g,""); //Убиваем мягкий перенос
	var lexemArray=splitTextToLexems(text);
	//TODO: напихать в хвост массива пустых лексем, чтоб не падало
	console.log(lexemArray);
	var variableList={};
	lexemArray=variateNumbersWithNouns(lexemArray,variableList);
	lexemArray=variateOtherNumbers(lexemArray,variableList);
	return "(function() {\n"+joinVariableList(variableList)+"\nNAtask.setTask({\n\ttext:'"+lexemArray.join("")+"',\n\tanswers:,\n});\n})();\n";
}

function splitTextToLexems(text){
	var lexemArray=[];
	//TODO: всё-таки разбить на категории
	var lexemRegExp=/([0-9\.,]+)|([А-Яа-яЁё\-]+)|([\.!?,:;'"-]+)|([A-Za-z]+)|([^A-Za-zА-Яа-яЁё0-9\.!?,:;'"-]+)/;
	while(text.length){
		var currentLexem=text.match(lexemRegExp)[0];
		text=text.substr(currentLexem.length);
		lexemArray.push(currentLexem);
	}
	return lexemArray;
}

function variateOtherNumbers(lexemArray,variableList){
	var newLexemArray=[];
	for(var i=0, len=lexemArray.length; i<len; i++){
		if(lexemArray[i].isNumeric()){
			//TODO: человекопонятные названия переменных на основе ближайших слов, если не заняты
			newLexemArray=newLexemArray.concat(splitTextToLexems("'+n"+i+"+'"));
			variableList['n'+i]='sluchch('+lexemArray[i]+','+lexemArray[i]+','+'1)';
		}else{
			newLexemArray.push(lexemArray[i]);
		}
	}
	return newLexemArray;
}

function variateNumbersWithNouns(lexemArray,variableList){
	var newLexemArray=[];
	for(var i=0, len=lexemArray.length; i<len; i++){
		if(lexemArray[i].isNumeric() && lexemArray[i+1].isSpace() && lexemArray[i+2].isCyrillicWord()){
			//TODO: человекопонятные названия переменных на основе ближайших слов, если не заняты
			var foundWord=lexemArray[i+2];
			var foundNumber=1*lexemArray[i];
			var actualWord='';
			for(var j=foundWord.length; j && !actualWord; j--){
				//TODO: отслеживать реальное наличие в lx. Или наоборот?
				if(chislitlx(foundNumber,foundWord.substr(0,j)) == foundNumber+' '+foundWord){
					actualWord=foundWord.substr(0,j);
					break;
				}
				//TODO: поиск по всему lx
			}
			if(actualWord){
				//Нашли подходящее слово
				variableList['n'+i]='sluchch('+lexemArray[i]+','+lexemArray[i]+','+'1)';
				newLexemArray=newLexemArray.concat(splitTextToLexems("'+chislitlx(n"+i+",'"+actualWord+"')+'"));
				i+=2; //А что зря цикл гонять?
			}else{
				newLexemArray=newLexemArray.concat([lexemArray[i],lexemArray[i+1],lexemArray[i+2]]);
			}
		}else{
			newLexemArray.push(lexemArray[i]);
		}
	}
	return newLexemArray;
}

function joinVariableList(variableList){
	var code='';
	for(var variable in variableList){
		code+='var '+variable+'='+variableList[variable]+';\n';
	}
	return code;
}

//}}
