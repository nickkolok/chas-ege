(function(){'use strict';

var mas=[//Создаём массив из четырёх массивов...
	['-\\mathrm{ctg~}{a}','\\mathrm{ctg~}{(\\pi - a)}','\\mathrm{tg~}{(\\frac{\\pi}{2} +  a)}','\\mathrm{tg~}{(\\frac{3\\pi}{2} + a)}','\\mathrm{ctg~}{(2\\pi - a})'],
	['-\\mathrm{tg~}{a}','\\mathrm{tg~}{(\\pi - a)}','\\mathrm{ctg~}{(\\frac{\\pi}{2} +  a)}','\\mathrm{ctg~}{(\\frac{3\\pi}{2} + a)}','\\mathrm{tg~}{(2\\pi - a})'],
	['\\mathrm{tg~}{a}','\\mathrm{tg~}{(\\pi + a)}','\\mathrm{ctg~}{(\\frac{\\pi}{2} - a)}','\\mathrm{ctg~}{(\\frac{3\\pi}{2} - a)}'],
	['\\mathrm{ctg~}{a}','\\mathrm{ctg~}{(\\pi + a)}','\\mathrm{tg~}{(\\frac{\\pi}{2} -  a)}','\\mathrm{tg~}{(\\frac{3\\pi}{2} - a)}'],
].shuffle();//... и перемешиваем его.

var ver=mas.splice(0,1)[0]//Отрезаем от него первый элемент - массив с вариантами одной из формул
	.iz(2);//Выбираем из него два варианта.

window.vopr.txt='$'+ver[0]+'=$<br/>';//Первый (нулевой!) из них пишем в условие
window.vopr.ver=[ver[1].ob$()];//Второй (первый!) "оборачиваем" в $ - отделитель формул - и объявляем верным ответом
window.vopr.nev=mas.matrToVect().ob$();//А всё остальное - куски других равенств - объявляем отвтеами неверными.
AtoB();

})();
//Любовь Ерышова, Николай Авдеев
