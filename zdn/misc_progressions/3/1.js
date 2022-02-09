retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	var a1 = sl(-10,10);
	var d = sl(1,10).pm();

	var n = sl(7,20);
	var m = slKrome([n],7,20);
	var t = slKrome([n,m],7,20);


	NAtask.setTask({
		text: 'Дана арифметическая прогрессия, для которой $a_{'+m+'} = ' + (a1+d*(m-1)) + '$, $a_{'+t+'} = ' + (a1+d*(t-1)) + '$. Найдите $a_{'+n+'}$.',
		answers: a1+d*(n-1),
		//analys: '',
	});

	return true;
}, 100000);
