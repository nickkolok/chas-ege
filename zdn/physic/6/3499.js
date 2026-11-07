(function(){
'use strict';

retryWhileError(function(){
	NAinfo.requireApiVersion(0, 2);
	
	let key = '3499';
	let preference = ['period', 'frequency'];
	let rand = getSelectedPreferenceFromList(key, preference);

	let t = sl(1, 10, 1);
	let nu = [0.2, 0.25, 0.4, 0.5, 1, 2, 2.5, 4, 5, 10, 20].iz();
	let N = Math.round(nu * t * 60);
	let T = 1 / nu;
	
	let t_sec = t * 60;

	let text = 'За ' + t + ' мин. пропеллер вентилятора совершает ' + N + ' оборотов. ';
	let question = '';
	let answer = 0;
	let analys = '';

	if (rand === 0) {
		question += 'Чему равен период вращения лопастей вентилятора? Ответ дайте в секундах.';
		answer = T;
		analys = 'Период вращения находится по формуле $T = \\frac{t}{N}$, где $t$ — время в секундах. ' +
		         'Переведем время в секунды: $t = ' + t + ' \\cdot 60 = ' + t_sec + ' $ с. ' +
		         'Тогда $T = \\frac{' + t_sec + '}{' + N + '} = ' + T.ts() + '$ с.';
	} else {
		question += 'Чему равна частота вращения лопастей вентилятора? Ответ дайте в 1/с.';
		answer = nu;
		analys = 'Частота вращения находится по формуле $\\nu = \\frac{N}{t}$, где $t$ — время в секундах. ' +
		         'Переведем время в секунды: $t = ' + t + ' \\cdot 60 = ' + t_sec + ' $ с. ' +
		         'Тогда $\\nu = \\frac{' + N + '}{' + t_sec + '} = ' + nu.ts() + '$ 1/с.';
	}

	NAtask.setTask({
		text: text + question,
		answers: answer,
		analys: analys,
		preference: preference,
	});
}, 1000);
})();

// https://phys-oge.sdamgia.ru/problem?id=29554
// https://phys-oge.sdamgia.ru/problem?id=29576
// https://github.com/nickkolok/chas-ege/issues/3499
