(function() {

var d=sluchch(2,9);
var f=sluchiz([2,4]);
var a=d.pow(f);
var b=sluchch(1,9).pm();
var c=sluchch(1,9).pm();
var x=-1/f-c;
var v=sluchch(1,2);
var m='';
switch(v){
	case 1:{
		m='\\left(\\frac{1}{'+a+'}\\right)^{'+'x+'+c+'}='+d;
		break;
	}
	case 2:{
		m='{'+a+'}^{'+'x+'+c+'}=\\frac{1}{'+d+'}';
		break;
	}
}

window.vopr.txt=('Найдите корень уравнения $$'+m+'$$').plusminus();
window.vopr.ver=[''+x];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=1;
window.vopr.kat['tri']=0;
})();
