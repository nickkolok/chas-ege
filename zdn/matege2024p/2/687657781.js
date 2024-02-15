(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let answ = sl(1, 30);
		NAtask.setTask({
			text: 'В треугольнике $ABC$ известно, что стороны $AB$ и $BC$ равны $' + answ +
				'$, а  $\\angle{BAC}$ равен $30^\\circ$. ' +
				'Найдите длину суммы векторов $\\overrightarrow{BA}$ и $\\overrightarrow{BC}$.',
			answers: answ,
		});
		NAtask.modifiers.variativeABC();
	}, 1000);
})();
