retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	var b1 = sl(2,29).pm();
	var q = 1-1/[2,4,5,10].iz();

	var n = sl(3,7);

	NAtask.setTask({
		text: 'Чему равен знаменатель бесконечной геометрической прогрессии, если $b_1 = ' + b1 + '$ и сумма всех её членов $S=' + (b1/(1-q)).ts(1) + '$?',
		answers: q,
		//analys: '',
	});

	return true;
}, 100000);
