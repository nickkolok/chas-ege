retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	var a1 = sl(-10,10);
	var d = sl(1,10).pm();

	var n = sl(7,20);

	NAtask.setTask({
		text: 'Дана арифметическая прогрессия, для которой $a_1 = ' + a1 + '$, $d=' + d + '$. Найдите $a_{'+n+'}$.',
		answers: a1+d*(n-1),
		//analys: '',
	});

	return true;
}, 100000);
