(function(){'use strict';

var a1=om.pifagtr.iz();
var c=sluchch(1,10);
var a=a1[0]*c, b=a1[1]*c, c=a1[2]*c;
var sinA='\\sin{A}='+a.frac(c);
var sinB='\\sin{B}='+b.frac(c);
var cosA='\\cos{A}='+b.frac(c);
var cosB='\\cos{B}='+a.frac(c);
var  tgA='\\tg{A}='+a.frac(b);
var  tgB='\\tg{B}='+b.frac(a);
var ctgA='\\ctg{A}='+b.frac(a);
var ctgB='\\ctg{B}='+a.frac(b);

chas2.task.setCountableTask(
	[
		{utv:'$'+[sinA,sinB,cosA,cosB,tgA,tgB,ctgA,ctgB].iz()+'$'},
		{vel:'',bkv:'AB',zna:c,rod:1,vin:1,nah:1},
		{vel:'',bkv:'AC',zna:b,rod:1,vin:1,nah:1},
		{vel:'',bkv:'BC',zna:a,rod:1,vin:1,nah:1},
	].sluchiz(3),
	{
		preambula: 'В треугольнике $'+'ABC'.mesh()+'$ угол $C$ равен $90^\\circ$. ',
	},{
		tags:{tri:1},
	}
);
chas2.task.modifiers.variativeABC();
})();

//Обзад 
//Николай Авдеев

