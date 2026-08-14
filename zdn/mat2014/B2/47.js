	(function() {
		NAinfo.requireApiVersion(0, 2);
		var trig = ['sin', 'cos', 'tg', 'ctg'].iz();
		var gradus = slKrome(function(x){
			if (trig == 'tg' && Math.abs(x % 180) == 90) return true;
			if (trig == 'ctg' && x % 180 == 0) return true;
			return false;
		}, -900, 900);
		var otvet = (gradus / 180 * Math.PI)[trig]()['arc' + trig]();
		NAtask.setTask({
		text: 'Найти значение угла (в градусах)' + '  $ \\arc' + trig + '(\\' + trig + '(' + gradus + '^{\\circ}))$',
		answers: otvet / Math.PI * 180,
		});
	})();
