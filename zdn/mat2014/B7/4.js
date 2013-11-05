(function() {

var a=sluchch(2,9);
var f=sluchch(2,4);
var d=a.pow(f);
var b=sluchch(1,9).pm();
var x=sluchch(1,9).pm();
var c=f-b*x;
var v=sluchch(1,4);
var m='';
switch(v){
	case 1:{
		m=''+a+'^{'+b+'x+'+c+'}='+d;
		break;
	}
	case 2:{
		m='\\left(\\frac{1}{'+a+'}\\right)^{'+b+'x+'+c+'}=\\frac{1}{'+d+'}';
		break;
	}
	case 3:{
		m='\\left(\\frac{1}{'+a+'}\\right)^{'+(b*(-1))+'x+'+(c*(-1))+'}='+d;
		break;
	}
	case 4:{
		m='{'+a+'}^{'+(b*(-1))+'x+'+(c*(-1))+'}=\\frac{1}{'+d+'}';
		break;
	}
}

window.vopr.txt=('Найдите корень уравнения $$'+m+'$$').plusminus();
window.vopr.ver=[''+x];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
