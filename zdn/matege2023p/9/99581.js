(function() {
	NAinfo.requireApiVersion(0, 2);

	let a = sluchch(1, 15);
	let b = sluchch(2, 4);
	let n = sluchch(4, 23);
	var arr = om.childMaleNames.iz();

	let progression = new ArithmeticProgression(a, b);

	NAtask.setTask({
		text: sklonlxkand(arr).de + ' надо решить ' + chislitlx(progression.sum(n), 'задача', 'v') + 
			'. Он решает на одно и то же количество задач больше по сравнению с предыдущим днем.' +
			' Известно, что за первый день ' + arr + ' решил ' + chislitlx(a, 'задача', 'v') +
			'. Определите, сколько задач решил ' + arr + ' в последний день,' + 
			' если со всеми задачами он справился за ' + chislitlx(n, 'день') + '.',
		answers: progression.member(n),
		authors: ['Сергей Алендарь', 'Александра Суматохина'],
	});
})();
