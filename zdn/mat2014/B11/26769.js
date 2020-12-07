(function() {
	NAinfo.requireApiVersion(0, 0);
	var a = sluchch(1, 50);
	var beta = sluchch(1, 50);
	var alpha = 360 + beta;
	NAtask.setTask({
		text: 'Вычислить значение выражения: $$ \\frac{{'+a+'}\\sin{'+alpha+'}^\\circ}{\\sin{'+beta+'}^\\circ}$$',
		answers: a,
	});
})();
