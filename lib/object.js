'use strict';

Object.prototype.clone=function(){
/**Рекурсивно клонирует объект.*/
	return clone(this);
}

Object.prototype.makeAllPropertiesNotEnumerable=function(){
/**Сделать все свойства объекта неперечислимыми.*/
	for(var chto in this)
		Object.defineProperty(this, chto, {enumerable: false});
}

Object.prototype.cloneNonRecursive=function(){
/**Нерекурсивно клонирует объект.*/
	var a={};
	for(var chto in this)
		a[chto]=this[chto];
	return a;
}

Object.prototype.addToGlobal=function(glname,p1){
/**Добавляет все перечислимые свойства объекта в глобальную переменную и, если p1, то делает их в объекте неперечислимыми.*/
	if(window[glname]===undefined)
		window[glname]={};
	for(var chto in this){
		window[glname][chto]=this[chto];
		if(p1)
			Object.defineProperty(this, chto, {enumerable: false});
	}
	return this;
}

Object.prototype.importFrom=function(p1){
/**Импортировать все свойства p1 в данный объект*/
	if(p1)
		for(var chto in p1)
			this[chto]=p1[chto];
}

Object.prototype.isObject=true;

Object.prototype.addToGlobal('docsObject',1);
