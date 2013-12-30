RegExp.prototype.isRegExp=true;

var docsRegExp;
if(!docsRegExp)
	docsRegExp={};

for(var chto in RegExp.prototype){
	docsRegExp[chto]=RegExp.prototype[chto];
	Object.defineProperty(RegExp.prototype, chto, {enumerable: false});
}
