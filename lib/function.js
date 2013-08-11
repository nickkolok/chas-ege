Function.prototype.isFunction=true;

for(var chto in Function.prototype){
	Object.defineProperty(Function.prototype, chto, { enumerable: false });
}
