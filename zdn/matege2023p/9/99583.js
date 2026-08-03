(function() {
	NAinfo.requireApiVersion(0, 2);

	let a = sluchch(2, 10);
	let b = sluchch(2, 4);
	let n = sluchch(10, 24);
	let n2 = n - sluchch(5, 7);

	let progression = new ArithmeticProgression(a, b);

	NAtask.setTask({
		text: 'Грузовик перевозит партию щебня массой ' + chislitlx(progression.sum(n), 'тонна') + 
		', ежедневно увеличивая норму перевозки на одно и то же число тонн. ' +
		'Известно, что за первый день было перевезено ' + chislitlx(a, 'тонна') + ' щебня. ' +
		'Определите, сколько тонн щебня было перевезено на ' + om.porchisl[n2].i[0] + 
		' день, если вся работа была выполнена за ' + chislitlx(n, 'день') + '.',
		answers: progression.member(n2),
		authors: ['Сергей Алендарь', 'Александра Суматохина'],
	});
})();
