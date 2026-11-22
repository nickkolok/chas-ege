'use strict';

/**
 * Хелперы для задач на математическое ожидание по заданному распределению:
 * среднее взвешенное, таблица распределения и TeX-запись вычисления.
 * Вынесено из шаблонов zdn/misc_mathexphype2026/1 (ревью PR #3288).
 */

function weightedMean(values, weights){
/**Среднее взвешенное: sum(values[i]*weights[i]) / sum(weights[i]).
Массивы должны быть одинаковой длины, сумма весов - положительной.
weightedMean([1, 2, 5], [10, 20, 30]) = (1*10 + 2*20 + 5*30) / 60*/
	var num = 0, den = 0;
	for(var i = 0; i < values.length; i++){
		num += values[i]*weights[i];
		den += weights[i];
	}
	return num/den;
}

function distributionTable(values, counts, valueHeader, countHeader){
/**HTML-таблица распределения: строка значений (th) и строка количеств (td).
Числа форматируются в русской локали (разделитель тысяч, десятичная запятая).
distributionTable([1, 2], [10, 20], 'Номинал', 'Количество')*/
	var vStr = values.map(function(x){ return x.toLocaleString('ru-RU'); });
	var cStr = counts.map(function(x){ return x.toLocaleString('ru-RU'); });
	var y = [valueHeader].concat(vStr).tr('th');
	var z = [[countHeader].concat(cStr).tr()];
	return (y + z.soed()).vTabl();
}

function expectationFormulaTex(values, counts){
/**TeX-запись вычисления матожидания по распределению:
M(X) = v0 \cdot \frac{c0}{N} + ... = среднее взвешенное.
Значения, количества и N - в русской локали; итог - сырое число
(десятичную запятую поставит NAtask.modifiers.allDecimalsToStandard).
Обрамяющие $$ не добавляются.*/
	var total = counts.sum();
	var tStr = total.toLocaleString('ru-RU');
	var terms = values.map(function(v, i){
		return v.toLocaleString('ru-RU') + ' \\cdot ' + counts[i].toLocaleString('ru-RU').texfrac(tStr);
	});
	return 'M(X) = ' + terms.join(' + ') + ' = ' + weightedMean(values, counts);
}

try{
	global.weightedMean = module.exports.weightedMean = weightedMean;
	global.distributionTable = module.exports.distributionTable = distributionTable;
	global.expectationFormulaTex = module.exports.expectationFormulaTex = expectationFormulaTex;
}catch(e){}
