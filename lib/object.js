'use strict';

Object.prototype.clone=function(){
	return clone(this);
}

Object.prototype.makeAllPropertiesNotEnumerable=function(){
/**Сделать все свойства объекта неперечислимыми.*/
for(var chto in this)
	Object.defineProperty(this, chto, {enumerable: false});
}

Object.prototype.isObject=true;

var docsObject;
if(!docsObject)
	docsObject={};

for(var chto in Object.prototype){
	docsObject[chto]=Object.prototype[chto];
	Object.defineProperty(Object.prototype, chto, {enumerable: false});
}
