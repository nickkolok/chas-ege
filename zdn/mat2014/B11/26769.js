(function() {
	NAinfo.requireApiVersion(0, 0);
	var a = sluchch(1, 50);
	var ans = a;
	var beta = sluchch(1, 50);
	var pi = [180, 360].iz();
	var alpha = pi + beta;
	var f = ['cos', 'sin', 'tg', 'ctg'].iz();
	if ((pi == 180 && f == 'cos') || (pi == 180 && f == 'sin')){
		ans = -a;
	}
	NAtask.setTask({
		text: 'Вычислить значение выражения: $$ \\frac{{'+a+'}\\'+f+'{'+alpha+'}^\\circ}{\\'+f+'{'+beta+'}^\\circ}$$',
		answers: ans,
	});
})();
