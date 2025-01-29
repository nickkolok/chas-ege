retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	var b1 = sl(2,9).pm();
	var q = sl(2,10).pm();

	var n = sl(4,8,2);
	var m = slKrome([n],3,8);

	NAtask.setTask({
		text: 'Дана геометрическая прогрессия, для которой $b_1 = ' + b1 + '$, $b_{'+n+'}=' + b1*q.pow(n-1) + '$. Найдите $b_{'+m+'}$.',
		answers: b1*q.pow(m-1),
		//analys: '',
	});

	return true;
}, 100000);
