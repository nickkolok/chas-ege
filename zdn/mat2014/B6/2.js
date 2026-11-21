(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let b = sl(2, 3);
		let a = 0;
		for (let i = 0; i < b; i++)
			a += sl(1, 6);
		NAtask.setTask({
			text: 'В случайном эксперименте бросают ' + b + ' игральные кости. ' +
				'Найдите вероятность того, что в сумме выпадет ' + chislitlx(a, 'очко') + '.',
			answers: om.igrkosti[b][a] / (6).pow(b),
			analys: '',
		});
		NAtask.modifiers.roundUpTo(-2); //модификатор округления ответа
	});
})();
//fixed by SugarHedgehog
//282853 283441 283461 283465 283443 283445 283447 283449 283451 283453 283455 283457 283459 283463
