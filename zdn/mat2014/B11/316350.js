(function() {
	NAinfo.requireApiVersion(0, 0);
	var a;
	do {
		a = sluchch(-50, 50);
	} while (a === 0);
	var b = sluchch(0.1, 0.9, 0.1);
	var ans = a*(2*Math.pow(b, 2) - 1);
	NAtask.setTask({
		text: 'Вычислить значение выражения: $$ {'+a+'}\\cos2\\alpha\\mbox{, если }\\cos\\alpha = {'+b.ts()+'}$$',
		answers: ans.ts(),
	});
})();
