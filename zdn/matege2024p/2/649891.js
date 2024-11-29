(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letter = window.smallLatinLetters.iz(2);

		let coordA = generateMatrix(1, 2, 1, 13).iz();
		let coordB = generateMatrix(1, 2, 1, 13).iz();

		NAtask.setTask({
			text: 'Даны векторы $\\vec{' + letter[0] + '}('+coordA.join('; ')+')$ и $\\vec{' +
				letter[1] + '}('+coordB.join('; ')+')$. Найдите скалярное произведение $\\vec{' + letter[0] + '}\\cdot\\vec{' +
				letter[1] + '}$.',
			answers: coordA[0] * coordB[0] + coordA[1] * coordB[1],
			analys: '',
		});
	}, 1000);
})();
// 649891 649895
