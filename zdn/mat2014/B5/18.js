(function(){'use strict';

var sides = om.pifagtr.iz();
var factor = sl(1,10);

var sideL = sides[0] * factor;
var sideG = sides[1] * factor;
var diag  = sides[2] * factor;
var area  = sideL * sideG;
var perim = 2 * (sideL + sideG);

/*
Найдите площадь прямоугольника, диагональ которого равна 13, а одна из сторон равна 5.
*/

chas2.task.setCountableTask(
	[
		[
			{vel: 'меньшая из сторон'+'<replace1/>', zna:sideL,  rod:1,vin:'меньшую из сторон'+'<replace1/>',nah:1},
			{vel: 'большая из сторон'+'<replace1/>', zna:sideG,  rod:1,vin:'большую из сторон'+'<replace1/>',nah:1},
		],
		[
			{vel: 'одна из сторон'+'<replace1/>', zna:[sideG,sideL].iz(),  rod:1,vin:'одну из сторон'+'<replace1/>',nah:0},
		],
	].iz().concat([
		{vel: 'площадь'    + '<replace1/>', zna:area,  rod:1,vin:1,nah:1},
		{vel: 'периметр'   + '<replace1/>', zna:perim, rod:0,vin:1,nah:1},
		{vel: 'диагональ'  + '<replace1/>', zna:diag, rod:1,vin:1,nah:1},
	]).sluchiz(3)
);

window.vopr.txt = window.vopr.txt.replace('<replace1/>',' прямоугольника');
window.vopr.txt = window.vopr.txt.replace(/([А-ЯЁа-яё]+)<replace1\/>/,'его $1');
window.vopr.txt = window.vopr.txt.replace('<replace1/>','');

})();
// РешуЕГЭ https://ege.sdamgia.ru/problem?id=516248
// Николай Авдеев
// TODO: 27602 и, возможно, 27607, 27811, 27830, 27832
