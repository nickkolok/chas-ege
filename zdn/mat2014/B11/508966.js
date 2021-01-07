(function() {
	NAinfo.requireApiVersion(0, 0);
	var a = sluchch(2, 10);
	var b = sluchch(0.1, 0.9, 0.1);
	var ans = a*(1-2*Math.pow(b, 2));
	NAtask.setTask({
		text: 'Вычислить значение выражения: $$ {'+a+'}\\cos2\\alpha, если \\sin\\alpha = {'+b.ts()+'}$$',
		answers: ans,
	});
})();
