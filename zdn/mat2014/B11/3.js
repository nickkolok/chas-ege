(function() {

var m=sluchch(1,37);
var n=sluchch(1,m-1);

var a=m*m-n*n;
var b=2*m*n;
var c=m*m+n*n;
var d='-';
var f;
var g;
var h;
var v=sluchch(1,3);
switch(v){
	case 1:{
		h=a;
		f=c;
		g=b;
		break;
	}
	case 2:{
		h=b;
		f=c;
		g=a;
		break;
	}
	case 3:{
		d='+';
		h=c;
		f=a;
		g=b;
		break;
	}
	
}
window.vopr.txt='Найдите значение выражения $$\\sqrt{'+f+'^{2}'+d+g+'{^2}}$$';
window.vopr.ver=[''+h];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
