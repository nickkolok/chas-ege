(function() {'use strict';
NAinfo.requireApiVersion(0, 0);
	var speed = sluchch(10, 60);
	var car = sklonlxkand(chaslib.sets.transportation.iz());
	var edizs = chaslib.sets.lengthUnits;

	var edinici = [];

	for (var i = 0; i < edizs.length; i++) {
		if (edizs[i].inMeters > 100)
		edinici.push(edizs[i]);
	}

	var ed = sluchch(0, edinici.length);
	var e = edinici.iz(2);

	var ediz1 = sklonlxkand(e[0].name);
	var ediz2 = sklonlxkand(e[1].name);
	var mtr = e[0].inMeters;
	var mtr1 = e[1].inMeters;

	var x = (mtr / mtr1).okrugldo(0.01);

NAtask.setTask({
	text: 'Спидометр ' + car.re + ' показывает скорость в ' + ediz1.pm + ' в час.' +
	' Какую скорость (в ' + ediz1.pm + ' в час) показывает спидометр, если ' + car.ie + ' движется со скоростью ' +
	chislitlx(speed, ediz2) + ' в час?' +
	' (Считайте, что  ' + chislitlx(1, ediz1) + ' - это ' + chislitlx(x, ediz2) +
	', округлите до целой части.)',

	answers: (speed / x).round(),
});
})();
//Коновалов Игорь
//http://mathege.ru/or/ege/ShowProblem.html?probId=77356
