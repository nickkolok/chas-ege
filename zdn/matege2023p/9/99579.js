(function() {
	NAinfo.requireApiVersion(0, 2);

	let a = sluchch(8, 30);
	let b = sluchch(2, 4);
	let n = sluchch(4, 11);

	let progression = new ArithmeticProgression(a, b);

	let q = a + progression.member(n);

	NAtask.setTask({
		text: ' Бригада маляров красит забор длиной ' + chislitlx(progression.sum(n), 'метр') +
			', ежедневно увеличивая норму покраски на одно и то же число метров.' +
			' Известно, что за первый и последний день в сумме бригада покрасила ' + chislitlx(q, 'метр') + ' забора. ' +
			' Определите, сколько дней бригада маляров красила весь забор. ',
		answers: n,
		authors: ['Сергей Алендарь', 'Александра Суматохина'],
	});
})();
