lx['век'] = {
	ie: 'век',
	re: 'века',
	de: 'веку',
	ve: 'век',
	te: 'веком',
	pe: 'веке',
	im: 'века',
	rm: 'веков',
	dm: 'векам',
	vm: 'века',
	tm: 'веками',
	pm: 'веках',
	rod: 0,
	skl: 1,
	odu: 1,
	sbs: 1,
};
(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let device = [
			[
				['котёл для зелий', 'скипетр', 'шар для предсказаний', 'плащ-невидимка', 'амулет удачи', 'эликсир правды',
					'путеводный клубок', 'перстень с лунным камнем'
				].iz(),
				'новый', 'он'
			],
			[
				['Жаба-говорун', 'волшебная палочка', 'пыльца фей', 'шляпа-секретарь', 'самопишущее перо',
					'бесконечная конфета'
				].iz(), 'новая', 'она'
			],
		].iz();

		let firstPeriod = sl(5, 10);
		let secondPeriod = firstPeriod + sl(1, 10);
		let lengthOfTime = sklonlxkand(['месяц', 'век', 'столетие', 'поколение'].iz());
		let firstProbability = sl(0.5, 0.99, 0.01);
		let secondProbability = sl(0.1, firstProbability - 0.01, 0.01);
		NAtask.setTask({
			text: 'Вероятность того, что ' + device[1] + ' ' + device[0] + ' прослужит больше ' + chislitlx(firstPeriod,
					lengthOfTime) + ', равна ' + firstProbability.ts() + '. ' +
				'Вероятность того, что ' + device[2] + ' прослужит больше ' + chislitlx(secondPeriod, lengthOfTime) +
				', равна ' + secondProbability.ts() + '. ' +
				'Найдите вероятность того, что ' + device[2] + ' прослужит меньше ' + chislitlx(secondPeriod, lengthOfTime) +
				', но больше ' + chislitlx(firstPeriod, lengthOfTime) + '.',
			answers: firstProbability - secondProbability,
			analys: '',
		});
	});
})();
// 320176 509569 320641 514177 549305 320643 320645 320647 320649 320651 320653 320655 320657 320659 320661 320663 320665 320667 320669 320671 320673 320675 320677 320679 320681 320683 320685 320687 320689 320691 320693 320695 320697 320699 320701 320703 320705 320707 320709 320711 320713 320715 320717 320719 320721 320723 320725 320727 320729 320731 320733 320735 320737 320739
//SugarHedgehog
