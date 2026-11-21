(function() {
	NAinfo.requireApiVersion(0, 0);
	var a = sl(1,50).pm();
	var b = sluchch(0.1, 0.9, 0.1);
	var ans = a*(2*Math.pow(b, 2) - 1);
	NAtask.setTask({
		text: 'Вычислить значение выражения: $$ '+a+'\\cos2\\alpha\\mbox{, если }\\cos\\alpha = '+b+'$$',
		answers: ans.ts(),
	});
	NAtask.modifiers.allDecimalsToStandard(true);
})();
