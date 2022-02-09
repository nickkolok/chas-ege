retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	var n = sl (10,70);

	var progressions = [
		['натуральных', n*(n+1)/2],
		['нечётных натуральных', n*n],
		['чётных натуральных', n*(n+1)],
	].iz();

	NAtask.setTask({
		text: 'Найдите сумму первых ' + n + ' ' + progressions[0] + ' чисел.',
		answers: progressions[1],
		//analys: '',
	});

	return true;
}, 100000);
