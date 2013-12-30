'use strict';

Function.prototype.toStr=function(){
/**Возвращает код функции в виде строки*/
	return ''+this;
}

Function.prototype.telo=function(){
/**Возвращает тело функции в виде строки*/
	return this.toStr().replace(/}$/,'').replace(/^function \(.*\){/,'');
}

Function.prototype.zagl=function(){
/**Возвращает заголовок функции в виде строки*/
	return /^function \(.*\)/.exec(this.toStr())[0];
}

Function.prototype.attr=function(){
/**Возвращает список параметров функции в виде строки*/
	return this.zagl().replace(/^function /,'');
}

Function.prototype.codeComment=function(){
/**Возвращает первый документационный комментарий внутри функции - такой, как этот.*/
	try{
	return /\/\*\*.*\*\//.
		exec(this.toStr())[0].
		replace(/^\/\*\*/,'').
		replace(/\*\/$/,'');
	}catch(e){
		return '';
	}
}

var docsFunction={};

Function.prototype.isFunction=true;

for(var chto in Function.prototype){
	docsFunction[chto]=Function.prototype[chto];
	Object.defineProperty(Function.prototype, chto, { enumerable: false });
}
