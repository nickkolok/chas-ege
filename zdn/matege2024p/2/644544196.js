(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let lenAC = sl(1, 100);
		let lenCB = sl(1, 100);

		NAtask.setTask({
			text: 'В прямоугольном треугольнике $ABC$ с прямым углом C известно, что $AC = ' + lenAC.texsqrt(sl1()) +
				'$, $CB = ' + lenCB.texsqrt(sl1()) +
				'$. Найдите длину разности векторов $\\vec{CA}$ и $\\vec{CB}$.',
			answers: (lenAC + lenCB).sqrt(),
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.variativeABC();
	}, 1000);
})();
