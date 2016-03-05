(function(){'use strict';

var a=sluchch(2,20),
	b=sluchch(0.5,5,0.5),
	c=(a*a*(b*b+1)).koren();

var  tgA='\\tg{A}';
var  tgB='\\tg{B}';
var ctgA='\\ctg{A}';
var ctgB='\\ctg{B}';
var  tg2A='\\tg^2{A}';
var  tg2B='\\tg^2{B}';
var ctg2A='\\ctg^2{A}';
var ctg2B='\\ctg^2{B}';


chas2.task.setCountableTask(
	[
		[
			{vel:'',bkv:[tgA,ctgB].iz(),vin:1,zna:1 .texfrac(b)},
			{vel:'',bkv:[ctgA,tgB].iz(),vin:1,zna:b.ts(),nah:1},
			{vel:'',bkv:[tg2A,ctg2B].iz(),vin:1,zna:1 .texfrac(b*b)},
			{vel:'',bkv:[ctg2A,tg2B].iz(),vin:1,zna:(b*b).ts(),nah:1},
		].iz(),
		{vel:'',bkv:'AB',zna:c,rod:1,vin:1,nah:(b*b+1).isPolnKvadr()},
		{vel:'',bkv:'AC',zna:(a*b).ts(),rod:1,vin:1,nah:1},
		{vel:'',bkv:'BC',zna:a.ts(),rod:1,vin:1,nah:1},
	].sluchiz(3),
	{
		preambula: 'В треугольнике $'+'ABC'.mesh()+'$ угол $C$ равен $90^\\circ$.',
	},
	{
		tags:{tri:1}
	}
);
chas2.task.modifiers.variativeABC();
})();

//Обзад
//Николай Авдеев
