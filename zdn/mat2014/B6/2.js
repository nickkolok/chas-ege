(function() {

	var b = sl(2, 3);
	var a = 0;
	for (let i = 0; i < b; i++){
		a += sl(1, 6);
	}

	NAtask.setTask({
		text: 'В случайном эксперименте бросают ' + b + ' игральные кости. ' +
			'Найдите вероятность того, что в сумме выпадет ' + chislitlx(a, 'очко') + '.',
		answers: om.igrkosti[b][a] / (6).pow(b),
	});

	NAtask.modifiers.roundUpTo(-2); //модификатор округления ответа

	window.vopr.kat['log'] = 0;
	window.vopr.kat['prz'] = 0;
	window.vopr.kat['drs'] = 0;
	window.vopr.kat['tri'] = 0;
})();
//fixed by SugarHedgehog
//508769 508770 508771 508772 508773 508774 508775 508776 508777 508778 508779
