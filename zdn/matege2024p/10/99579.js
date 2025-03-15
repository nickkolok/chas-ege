(function() {
	let firstDay = sl(5, 30);
	let difference = sl(2, 6);
	let days = sl(5, 15);
	let progression = new ArithmeticProgression(firstDay, difference);
	let firstAndLastSum = firstDay + progression.member(days);
	let people = ['маляров', 'рабочих', 'мастеров', 'работников'][sl(0, 3)];
	let group = ['бригада', 'группа', 'команда', 'отряд', 'коллектив'][sl(0, 4)];

	NAtask.setTask({
		text: group.toZagl() + ' ' + people + ' красит забор длиной ' + chislitlx(progression.sum(days), 'метр') +
			' , ежедневно увеличивая норму покраски на одно и то же число метров.' +
			' Известно, что за первый и последний день в сумме ' + group + ' покрасила ' + chislitlx(firstAndLastSum, 'метр') + ' забора. ' +
			' Определите, сколько дней ' + group + ' ' + people + ' красила весь забор.',
		answers: days,
	});
})();

//99579
