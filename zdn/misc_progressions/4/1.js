retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	var a1 = sl(-10,10);
	var d = sl(1,10).pm();


	var m = slKrome(7,20);
	var t = slKrome([m,m+1,m-1],7,20);


	NAtask.setTask({
		text: 'Дана арифметическая прогрессия, для которой $a_{'+m+'} = ' + (a1+d*(m-1)) + '$, $a_{'+t+'} = ' + (a1+d*(t-1)) + '$. Найдите разность арифметической прогрессии $d$.',
		answers: d,
		//analys: '',
	});

	return true;
}, 100000);
