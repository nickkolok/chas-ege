'use strict';

Array.prototype.pe_inv=function(){
/**Количество инверсий в перестановке, образованной элементами массива.*/
	var perest=0;
	var len=this.length;
	for(var i=0;i<len;i++)
		for(var j=i;j<len;j++)
			if(this[i]>this[j])
				perest++;
	return perest;
}

Array.prototype.pe_txt=function(){
/**Перестановка, образованная элементами массива, в TeX-нотации.*/
	return "$\\left("+this.join(";")+"\\right)$";
}

var docsArray;
if(!docsArray)
	docsArray={};

for(var chto in Array.prototype){
	docsArray[chto]=Array.prototype[chto];
	Object.defineProperty(Array.prototype, chto, { enumerable: false });
}
