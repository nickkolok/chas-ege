	(function() {
		NAinfo.requireApiVersion(0, 2);
		var trig = ['sin', 'cos', 'tg', 'ctg'].iz();
		var gradus = slKrome(function(x){
			if (trig == 'tg' && Math.abs(x % 180) == 90) return true;
			if (trig == 'ctg' && x % 180 == 0) return true;
			return false;
		}, -900, 900);
		
		var angle_rad = (gradus / 180 * Math.PI)[trig]();
		var otvet = angle_rad['arc' + trig]();
		if (trig == 'ctg' && otvet < 0) {
			otvet += Math.PI;
		}
		
		NAtask.setTask({
		text: 'Найти значение угла (в градусах)' + '  $ \\arc' + trig + '(\\' + trig + '(' + gradus + '^{\\circ}))$',
		answers: otvet / Math.PI * 180,
		});
	})();
