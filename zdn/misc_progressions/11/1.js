retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	var b1 = sl(2,9).pm();
	var q = sl(2,6).pm();

	var n = sl(3,8);
	var m = slKrome([n],1,8);
	if ((n-m)%2 == 0){
		m++
	}
	var t = slKrome([n,m],2,8);

	NAtask.setTask({
		text: 'Дана геометрическая прогрессия, для которой $b_{' + m + '} = ' + b1*q.pow(m-1) + '$, $b_{'+n+'}=' + b1*q.pow(n-1) + '$. Найдите $b_{'+t+'}$.',
		answers: b1*q.pow(t-1),
		//analys: '',
	});

	return true;
}, 100000);
