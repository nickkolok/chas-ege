String.prototype.mesh=function(){
	'use strict';
	var str=this;
	var a=str.length;
	var b=[];
	var i=0;
	for(i=0;i<a;i++){
		b.push(str[i]);
	}
	b.shuffle();
	str=b.join("");
	return str;	
};

String.prototype.dopdo=function(c,n){
	'use strict';
	var str=this;
	for(;str.length<n;str=c+str){
	}
	return str;
};

String.prototype.toZagl=function(){
	'use strict';
	if(this=='')return '';
	var a=this[0].toUpperCase()+''+this.substr(1);//.toLowerCase();
	return a;
};

String.prototype.frac=function(p1){
	'use strict';
	return '\\frac{'+this+'}{'+p1+'}';
}

String.prototype.posl=function(){
	'use strict';
	return this[this.length-1];
};

String.prototype.udalPosl=function(n){
	'use strict';
	if(n==undefined){n=1};
	return this.substr(0,this.length-n);
};

String.prototype.udalPerv=function(n){
	'use strict';
	if(n==undefined){n=1};
	return this.substr(n,this.length-n);
};

String.prototype.toStandart=function(p1){
	'use strict';
	var a=this.replace(/[.]/g,',');
	if(p1){
		a=a.replace(/[,]/,'{,}');
	}
	return a;
};

String.prototype.esli=function(p1){
	'use strict';
	return p1?this:'';
}

String.prototype.vTag=function(p1,p2){
	'use strict';
	return '<'+p1+(' '+p2).esli(p2)+'>'+this+'</'+p1+'>';
}

String.prototype.vTabl=function(p1,p2){
	'use strict';
	return (p1?p1:'<br/><br/>')+this.vTag('table',p2?p2:'style="text-align:center;font:inherit;" border=1');//.vTag('center');
}

String.prototype.ts=String.prototype.toStandart;

String.prototype.reverse = function () {
	'use strict';
	return this.split('').reverse().join('');
};//http://blog.stevenlevithan.com/archives/mimic-lookbehind-javascript //Товарищ очень сильно выручил


String.prototype.plusminus=function(){
	'use strict';
	var a=this;
	for(;a.match(/[+-][+-]/);){
		a=a.replace(/[+][+]/g,'+');
		a=a.replace(/--/g,'+');
		a=a.replace(/[+]-/g,'-');
		a=a.replace(/-[+]/g,'-');
		a=a.replace(/[+]$/g,'');
		a=a.replace(/[{][+]/g,'{');
		a=a.replace(/[+][}]/g,'}');
		a=a.replace(/\(\+/g,'(');
		a=a.replace(/\+\)/g,')');
	}
	a=a.replace(/[+]1(?=[A-Za-zА-Яа-яЁё])/g,'+');
	a=a.replace(/[-]1(?=[A-Za-zА-Яа-яЁё])/g,'-');
	a=a.replace(/[{]1(?=[A-Za-zА-Яа-яЁё])/g,'{');
	a=a.replace(/[}]1(?=[A-Za-zА-Яа-яЁё])/g,'}');
	a=a.replace(/[ ]1(?=[A-Za-zА-Яа-яЁё])/g,' ');
	a=a.replace(/[~]1(?=[A-Za-zА-Яа-яЁё])/g,'~');
	a=a.replace(/[(]1(?=[A-Za-zА-Яа-яЁё])/g,'(');
	a=a.replace(/[)]1(?=[A-Za-zА-Яа-яЁё])/g,')');
	a=a.replace(/[=]1(?=[A-Za-zА-Яа-яЁё])/g,'=');
	a=a.replace(/[;]1(?=[A-Za-zА-Яа-яЁё])/g,';');
	a=a.replace(/\^1(?=[A-Za-zА-Яа-яЁё])/g,'^');
	a=a.replace(/^1(?=[A-Za-zА-Яа-яЁё])/g,'');
	a=a.replace(/^[+]/g,'');
	a=a.reverse();
	a=a.replace(/[.]{2}(?=[A-Za-zА-Яа-яЁё])/g,'.');
	a=a.replace(/[.]{1}[$][.]{1}(?=[A-Za-zА-Яа-яЁё])/g,'.');
	a=a.reverse();
	return a;
};

String.prototype.isString=true;
