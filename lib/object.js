'use strict';

Object.prototype.clone=function(){
/**Рекурсивно клонирует объект.*/
	var temp = {};
	for(var key in this)
		if(this[key] === undefined)
			temp[key]=undefined;
		else if(this[key] instanceof Array)
			temp[key]=this[key].slice();
		else if(this[key] instanceof Object)
			temp[key] = this[key].clone();
		else
			temp[key] = this[key];
	return temp;


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
	if(typeof(window) === 'undefined'){
		var window={};
	}
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

Object.prototype.importNonExistingFrom=function(p1){
/**Импортировать все недостающие свойства p1 в данный объект*/
	if(p1)
		for(var chto in p1)
			if(!(chto in this))
				this[chto]=p1[chto];
}

Object.prototype.NaNtoUndefined=function(r){
	for(var chto in this){
		if(this[chto]!==undefined && this[chto].isNumber && isNaN(this[chto])){
			this[chto]=undefined;
		}else if(r && this[chto].isObject){
			this[chto].NaNtoUndefined();
		}
	}
}

Object.prototype.deleteSimilarProperties=function(diff){
	for(var prop in this){
		if(diff[prop]){
			if(diff[prop]==this[prop]){
				delete this[prop];
			}else if(this[prop].isObject || this[prop].isArray){
				if(diff[prop].isObject || diff[prop].isArray){
					this[prop].deleteSimilarProperties(diff[prop]);
				}
			}
		}
	}
}

Object.prototype.isObject=true;

Object.prototype.addToGlobal('docsObject',1);
