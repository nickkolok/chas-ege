(function(){'use strict';

var a=sluchch(2,7);

var n;
switch(a){
	case 2:
		n=sluchch(1,13).pm();
		break;
	case 3:
		n=sluchch(1,7).pm();
		break;
	default:
		n=sluchch(1,5).pm();
		break;
}

var x;
var b;
var NOD;
switch(sl(1,4)){
	case 1:
		x=sluchch(1,9,0.1);
		b=slKrome(0,-9,9,0.5);
		NOD = n-b*x%1==0? b.nod(n-b*x) : 1;
		break;
	case 2:
		x=sluchch(1,9,0.25);
		b=slKrome(0,-8,8,4);
		NOD=b.nod(n-b*x);
		break;
	case 3:
		x=sluchch(1,9);
		b=slKrome(0,-9,9);
		NOD=b.nod(n-b*x);
		break;
	case 4:
		x=sluchch(1,9);
		b=[-1,1].iz();
		NOD=1;
		break;
}

var p1 = [
	'\\left('+(1).texrndfrac(a.pow(NOD))+'\\right)^{'+[((-b/NOD).ts()+'x'),((b*x-n)/NOD).ts()].slag0()+'}',
	'{'+a.pow(NOD)+'}^{'+[((b/NOD).ts()+'x'),((n-b*x)/NOD).ts()].slag0()+'}'
];

if([2,4,5].includes(a)){
	p1.push(
		(1/a.pow(NOD)).ts()+'^{'+[((-b/NOD).ts()+'x'),((b*x-n)/NOD).ts()].slag0()+'}'
	);
}

p1=p1.iz();

var p2;
if([2,4,5].includes(a) && n<0 && n>=-3)
	p2=[a.pow(n), (1).texrndfrac(a.pow(-n))].iz();
else if(n<0)
    p2=(1).texrndfrac(a.pow(-n));
else
	p2=a.pow(n);

chas2.task.setEquationTask({
	parts: [p1, p2],
	roots: x,
	enablePartsSubtraction: 1,
	enablePartsExchange: 0,
},
);
})();
//26650,26651,26652,26653,26654,26655,26666,26670,509413,510382,510401,510936
//Белозоров Никита
