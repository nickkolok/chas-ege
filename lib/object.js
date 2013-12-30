Object.prototype.clone=function(){'use strict';
	return clone(this);
}

Object.prototype.isObject=true;

var docsObject;
if(!docsObject)
	docsObject={};

for(var chto in Object.prototype){
	docsObject[chto]=Object.prototype[chto];
	Object.defineProperty(Object.prototype, chto, {enumerable: false});
}
