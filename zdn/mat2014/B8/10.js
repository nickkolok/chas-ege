(function(){'use strict';

var c=sluchch(2,10),
	d=sluchch(0.1,0.9,0.1),
	a=c*d,
	b=(c*c-a*a).koren();

var  sinA='\\sin{A}';
var  sinB='\\sin{B}';
var  cosA='\\cos{A}';
var  cosB='\\cos{B}';
var  sin2A='\\sin^2{A}';
var  sin2B='\\sin^2{B}';
var  cos2A='\\cos^2{A}';
var  cos2B='\\cos^2{B}';

var g=1-d*d;

NAtask.setCountableTask(
	[
		[
			{vel:'',bkv:[sinA,cosB].iz(),vin:1,zna:d.ts(),nah:1},
			{vel:'',bkv:[sin2A,cos2B].iz(),vin:1,zna:(d*d).ts(),nah:1},
			{vel:'',bkv:[sin2B,cos2A].iz(),vin:1,zna:g.ts(),nah:1},
			{vel:'',bkv:[sinB,cosA].iz(),vin:1,zna:g.koren(),nah:g.isPolnKvadr()},
		].iz(),
		{vel:'',bkv:'AB',zna:c.ts(),rod:1,vin:1,nah:1},
		{vel:'',bkv:'AC',zna:b,rod:1,vin:1,nah:0},
		{vel:'',bkv:'BC',zna:a.ts(),rod:1,vin:1,nah:1},
	].sluchiz(3),
	{
		preambula: 'В треугольнике $'+'ABC'.mesh()+'$ угол $C$ равен $90^\\circ$. ',
	},
	{
		tags: {'tri':1,},
	}
);
chas2.task.modifiers.variativeABC();

})();
//Обзад
//Николай Авдеев
