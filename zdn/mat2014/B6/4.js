(function() {


	var a = sluchiz([100, 200, 250, 400, 500, 1000, 2000])[0];
	var b = sluchch(2, 20);
	let key = "4";
	var v1 = getListedPreference(key, [{
		preference: 'not_have_defect',
		preferenceValue: 0,
	}, {
		preference: 'have_defect',
		preferenceValue: 1,
	}], sl1());
	var v2 = sluchch(1);
	var c = (v1 ? b : a - b) / a;
	var d = v2 ? a - b : b;
	var f = sluchch(om.tovary.ie.length - 1);
	var t1 = v1 ? 'имеет дефекты' : 'не имеет дефектов';
	window.vopr.text = 'В среднем из ' + a + ' ' + om.tovary.rm[f] + ', поступивших в продажу, ' +
		d + ' ' + (v2 ? 'не ' : '') + chislit(d, 'имеет', 'имеют', 'имеют') + ' дефект' + (!v2 ? 'ы' : 'ов') +
		'. Найдите вероятность того, что один случайным образом выбранный экземпляр товара ' + t1 + '.';
	window.vopr.correctAnswers = ['' + c.ts()];

	window.vopr.categories['log'] = 0;
	window.vopr.categories['prz'] = 0;
	window.vopr.categories['drs'] = 0;
	window.vopr.categories['tri'] = 0;
})();
