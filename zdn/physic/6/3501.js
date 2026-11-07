(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let variants = [
			{dirR: 1, rText: '2', dirV: 1, vText: '2', resultVerb: 'увеличилось', resultN: 2},
			{dirR: 1, rText: '2', dirV: -1, vText: '2', resultVerb: 'уменьшилось', resultN: 8},
			{dirR: -1, rText: '2', dirV: 1, vText: '2', resultVerb: 'увеличилось', resultN: 8},
			{dirR: -1, rText: '2', dirV: -1, vText: '2', resultVerb: 'уменьшилось', resultN: 2},

			{dirR: 1, rText: '3', dirV: 1, vText: '3', resultVerb: 'увеличилось', resultN: 3},
			{dirR: 1, rText: '3', dirV: -1, vText: '3', resultVerb: 'уменьшилось', resultN: 27},
			{dirR: -1, rText: '3', dirV: 1, vText: '3', resultVerb: 'увеличилось', resultN: 27},
			{dirR: -1, rText: '3', dirV: -1, vText: '3', resultVerb: 'уменьшилось', resultN: 3},

			{dirR: 1, rText: '4', dirV: 1, vText: '4', resultVerb: 'увеличилось', resultN: 4},
			{dirR: -1, rText: '4', dirV: -1, vText: '4', resultVerb: 'уменьшилось', resultN: 4},
			{dirR: 1, rText: '2', dirV: 1, vText: '4', resultVerb: 'увеличилось', resultN: 8},
			{dirR: -1, rText: '2', dirV: -1, vText: '4', resultVerb: 'уменьшилось', resultN: 8},

			{dirR: 1, rText: '4', dirV: 1, vText: '\sqrt{2}', resultVerb: 'уменьшилось', resultN: 2},
			{dirR: -1, rText: '4', dirV: -1, vText: '\sqrt{2}', resultVerb: 'увеличилось', resultN: 2},

			{dirR: 1, rText: '5', dirV: 1, vText: '5', resultVerb: 'увеличилось', resultN: 5},
			{dirR: -1, rText: '5', dirV: -1, vText: '5', resultVerb: 'уменьшилось', resultN: 5},
		];

		let v = variants.iz();

		let rVerb = v.dirR == 1 ? 'увеличили' : 'уменьшили';
		let vVerb = v.dirV == 1 ? 'увеличили' : 'уменьшили';
		let conjunction = v.dirR == v.dirV ? ', тоже ' : ', а ';

		let text = 'Радиус окружности, по которой движется тело, ' + rVerb + ' в $' + v.rText + '$ раз(а)' +
			conjunction + 'линейную скорость тела ' + vVerb + ' в $' + v.vText + '$ раз(а). ' +
			'Во сколько раз ' + v.resultVerb + ' центростремительное ускорение тела?';

		let v2_text = v.vText.includes('\sqrt') ? v.vText.split('{')[1].split('}')[0] : '$' + v.vText + '^2$';
		
		let rAction = v.dirR == 1 ? 'увеличении' : 'уменьшении';
		let rEffect = v.dirR == 1 ? 'уменьшается' : 'увеличивается';
		let vAction = v.dirV == 1 ? 'увеличении' : 'уменьшении';
		let vEffect = v.dirV == 1 ? 'увеличивается' : 'уменьшается';

		let analys = 'Центростремительное ускорение тела вычисляется по формуле $a = \frac{v^2}{R}$. ' +
			'При ' + rAction + ' радиуса в $' + v.rText + '$ раз(а) ускорение ' + rEffect + ' в $' + v.rText + '$ раз(а). ' +
			'При ' + vAction + ' скорости в $' + v.vText + '$ раз(а) квадрат скорости, а значит и ускорение, ' + vEffect + ' в $' + v2_text + '$ раз(а). ' +
			'Таким образом, итоговое изменение ускорения составляет $' + v.resultN + '$ раз(а).';

		NAtask.setTask({
			text: text,
			answers: v.resultN,
			analys: analys,
		});
	}, 1000);
})();
