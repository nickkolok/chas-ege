	(function() {
		NAinfo.requireApiVersion(0, 2);
		(function() {
     
			NAinfo.requireApiVersion(0, 2);
			var trig = ['sin', 'cos', 'tg', 'ctg'].iz();
			var gradus = sluchch(-900, 900);
			var otvet = (gradus / 180 * Math.PI)[trig]()['arc' + trig]();
			NAtask.setTask({
			text: 'Найти значение угла (в градусах)' + '  $ \\arc' + trig + '(\\' + trig + '(' + gradus + '^{\\circ}))$',
			answers: otvet / Math.PI * 180,
			});
     
		})();
     
	})();

