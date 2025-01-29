(function(){'use strict';

var n=[2,4,5,8].iz();
var m=slKrome(n,2,9);
var p=sluchch(1,2);

var c;
var x;
var NOD;
switch(sl(1,3)){
	case 1:
        c=sluchch(1,9).pm();
		x=slKrome([(c/n).ts()],1,9,0.1).pm();
        NOD=1;
		break;
	case 2:
		c=[-10,10].iz();
		x=slKrome([(c/n).ts()],1,9,0.1).pm();
		NOD = c.nod((n-c*x).ts());
		break;
	case 3:
		c=sluchch(1,9).pm();
		x=sluchch(1,9).pm();
		NOD = c.nod((n-c*x).ts());
		break;
}
if(NOD%10==0)
	NOD/=10;

//console.log('c = '+c+'   '+(n-c*x));
//console.log('m = '+m+'   n = '+n);

var p1=[
		'{'+m.pow(NOD)+'}^{'+[((c/NOD).ts()+'x').esli(c),((p-c*x)/NOD).ts()].slag0()+'}',
		'\\left(\\frac{1}{'+m.pow(NOD)+'}\\right)^{'+[((-c/NOD).ts()+'x').esli(c), ((c*x-p)/NOD).ts()].slag0()+'}'
		].iz();
var p2=[
        '{'+n.pow(NOD)+'}^{'+[((c/NOD).ts()+'x').esli(c),((p-c*x)/NOD).ts()].slag0()+'}',
        '\\left(\\frac{1}{'+n.pow(NOD)+'}\\right)^{'+[((-c/NOD).ts()+'x').esli(c), ((c*x-p)/NOD).ts()].slag0()+'}'
    ].iz();


chas2.task.setEquationTask({
	parts: [p1, (m/n).pow(p).ts()+'\\cdot'+p2],
	roots: x,
	enablePartsSubtraction: 1,
	enablePartsExchange: 0,
},
);
})();

//77379
//Белозоров Никита
