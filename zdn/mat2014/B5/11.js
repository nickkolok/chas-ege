(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		var length = sluchch(2, 100);
		let rand = sl1();
		let question = [
			['длину вектора', (3 * length).sqrt()],
			['скалярное произведение', length / 2]
		][rand];
		let answ = question.pop();
		NAtask.setTask({
			text: 'Стороны ' + ['правильного', 'равностороннего', 'равноугольного'].iz() + ' треугольника $ABC$ равны $' +
				length.texsqrt(sl1()) + '$. ' +
				'Найдите ' + question +' $'+ ['\\overrightarrow{AB}', '\\overrightarrow{AC}'].shuffleJoin(['+', '$ и $'][rand])+'$'+'.',
			answers: answ,
			analys: '',
		});
		NAtask.modifiers.multiplyAnswerBySqrt(12);
	}, 1000);
	NAtask.modifiers.variativeABC();
})();
//Гущин 27720
//nadraliev
//Refactoring by SugarHedgehog 
