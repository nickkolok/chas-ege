(function(){'use strict';

	var troyka=om.pifagtr.iz();
	var u=sluchch(1,10);
	var a=troyka[0]*u;
	var b=troyka[1]*u;
	var c=troyka[2]*u;
	var h=sluchch(1,10);

	chas2.task.setCountableTask(
		[
			{vel:'меньший из катетов основания',zna:a,rod:0,nah:1},
			{vel:'больший катет основания',zna:b,rod:0,nah:1},
			{vel:'боковые рёбра призмы',zna:h,rod:3,nah:0,pre:'$\\frac{',nmn:'}{\\pi}$'},
			{vel:'объём описанного около этой призмы цилиндра',zna:(c*c*h/4).ts(),rod:0,nah:1},
		]
	),
		{
		preambula: 'В основании прямой призмы лежит прямоугольный треугольник.  ',
		};
})();
