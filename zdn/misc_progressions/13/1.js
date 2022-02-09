retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	var b1 = sl(2,9).pm();
	var q = sl(0.2,0.6,0.1);

	var n = sl(3,7);

	NAtask.setTask({
		text: 'Дана геометрическая прогрессия, для которой $b_1 = ' + b1 + '$, $q=' + q + '$. Найдите $S_{'+n+'}$.',
		answers: b1*(q.pow(n)-1)/(q-1),
		//analys: '',
	});

	return true;
}, 100000);
