RegExp.prototype.isRegExp=true;

for(var chto in RegExp.prototype)
	Object.defineProperty(RegExp.prototype, chto, { enumerable: false });

