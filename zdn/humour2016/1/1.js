//
//	1. Сборник задач для подготовки к ЕГЭ стоит 250 рублей. У двоечника Васи
//	Головоластного есть 700 рублей. Сколько абсолютно одинаковых сборников
//	обнаружит Вася дома, если купит, не глядя, столько сборников, на сколько
//	хватит денег?
//

(function(){'use strict';
NAinfo.requireApiVersion(0, 0);

var cost = sl(150,250,10);
var n = sl(3,9);
var nal = cost * n + sl(10,100,10);

NAtask.setTask({
	text: 'Сборник задач для подготовки к ЕГЭ стоит ' + cost + ' рублей. У двоечника ' +
	'Васи Головоластного есть ' + nal + ' рублей. Сколько абсолютно одинаковых сборников ' +
	'обнаружит Вася дома, если купит, не глядя, столько сборников, на сколько хватит денег?',
	answers: n,
});

})();

//
//	Юмористически набор, №1
//	https://bitbucket.org/chas-ege-team/chas-ege/issues/55/
//	hripunov
//

