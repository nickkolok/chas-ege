Object.prototype.clone=function(){'use strict';
	return clone(this);
}

Object.prototype.isObject=true;

for(var chto in Object.prototype)
	Object.defineProperty(Object.prototype, chto, {enumerable: false});
