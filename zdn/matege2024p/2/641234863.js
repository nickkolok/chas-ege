(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let lenAB = sl(1, 100);

		NAtask.setTask({
			text: 'В равнобедренном прямоугольном треугольнике $ABC$ с прямым углом $C$ известно, что $AB = ' + lenAB.texsqrt(sl1()) +
				'$. Найдите скалярное произведение векторов $\\vec{AB}$ и $\\vec{AC}$.',
			answers: (lenAB/2),
		});
		NAtask.modifiers.variativeABC();
	}, 1000);
})();
