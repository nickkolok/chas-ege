retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	var k = sl(3,20);
	var n = sl(1, k-1);
	var answ = sl(-100,100);
	var C = 3*answ;

	NAtask.setTask({
		text: 'Для арифметической прогрессии $\{a_n\}$ известно, что $a_{'+(k-n)+'} + a_{'+k+'} + a_{'+(k+n)+'}= ' + C + '$. Найдите $a_{'+k+'}$.',
		answers: answ,
		//analys: '',
	});

	return true;
}, 100000);
