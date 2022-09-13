(function(){'use strict';

var a=sluchch(2,7);
var c=slKrome(a,-9,9);

var b;
var d;
var x;
var NOD1;
var NOD2;
switch(sl(1,3)){
	case 1:
		b=slKrome(c,-9,9);
		d=slKrome(b,-9,9);
		x=sluchch(1,9,0.1).pm();
		NOD1 = 1;
		NOD2 = 1;
		break;
	case 2:
		b=[-10,10].iz();
		d=-b;
		x=sluchch(1,9,0.1).pm();
		NOD1 = (c-b).nod((b*x).ts());
		NOD2 = (c-d).nod((d*x).ts());
		break;
	case 3:
		b=slKrome(c,-9,9);
		d=slKrome(b,-9,9);
		x=sluchch(-9,9);
		NOD1 = (c-b).nod(b*x);
		NOD2 = (c-d).nod(d*x);
		break;
}

console.log(NOD1+'   '+NOD2);

var toSmall = NOD1.nod(NOD2);
if(NOD1>7 || NOD2>7){
	NOD1/=toSmall;
	NOD2/=toSmall;
}
if(NOD1>7 || NOD2>7){
	NOD1=1;
	NOD2=1;
}

var p1=[
		'{'+a.pow(NOD1)+'}^{'+[(((c-b)/NOD1).ts()+'x').esli(c-b), (b*x/NOD1).ts()].slag0()+'}',
		'\\left(\\frac{1}{'+a.pow(NOD1)+'}\\right)^{'+[(((b-c)/NOD1).ts()+'x').esli(c-b), (-b*x/NOD1).ts()].slag0()+'}'
		].iz();
var p2=['{'+a.pow(NOD2)+'}^{'+[(((c-d)/NOD2).ts()+'x').esli(c-d),(d*x/NOD2).ts()].slag0()+'}',
		'\\left(\\frac{1}{'+a.pow(NOD2)+'}\\right)^{'+[(((d-c)/NOD2).ts()+'x').esli(d-c), (-d*x/NOD2).ts()].slag0()+'}'
		].iz();

chas2.task.setEquationTask({
	parts: [p1,p2],
	roots: x,
	enablePartsSubtraction: 1,
	enablePartsExchange: 0,
},
);
})();

//26671,77378,510820
//Белозоров Никита
