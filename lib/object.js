
Object.prototype['isObject']=true;

Object.prototype.clone=function(){
	return clone(this);
}

for(var chto in Object.prototype){
	Object.defineProperty(Object.prototype, chto, { enumerable: false });
}
