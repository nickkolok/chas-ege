(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let x = sl(1, 10).pm();
		let y = slKrome(x.abs(), 1, 10).pm();

		let randAlfabel = sl1();
		let label1 = ['x', 'a'][randAlfabel];
		let label2 = ['y', 'b'][randAlfabel];

		let paint1 = function (ct) {
			coordAxis_prepare(ct);
			const w = ct.__coordAxisW;
			const mid = w / 2;
			const scale = 15;

			coordAxis_drawMarkPoint(ct, mid, "0", "line", "underAxis");
			coordAxis_drawMarkPoint(ct, mid + x * scale, label1, "dot", "overAxis");
			coordAxis_drawMarkPoint(ct, mid + y * scale, label2, "dot", "overAxis");
		};

		// Генерация всех утверждений
		let variants = [
			[`${label1} < ${label2} и |${label1}| < |${label2}|`, x < y && x.abs() < y.abs()],
			[`${label1} < ${label2} и |${label1}| > |${label2}|`, x < y && x.abs() > y.abs()],
			[`${label1} > ${label2} и |${label1}| < |${label2}|`, x > y && x.abs() < y.abs()],
			[`${label1} > ${label2} и |${label1}| > |${label2}|`, x > y && x.abs() > y.abs()],
		];
		let correct = variants.find(v => v[1]);
		let wrongs = variants.filter(v => v !== correct);

		NAtask.setTask({
			text: "На координатной прямой отмечены числа. Какое из следующих утверждений верно?",
			answers: correct[0],
			wrongAnswers: wrongs.map(v => v[0])
		});
		AtoB(3);

		chas2.task.modifiers.addCanvasIllustration({
			width: 450,
			height: 100,
			paint: paint1,
		});
	}, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=317179
