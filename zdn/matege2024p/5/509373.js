(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		// Количество значений
		let n = sluchch(3, 6);

		// 1. Генерируем уникальные значения X
		let xVals = arrayOfUniqueValues(n, -10, 10).sortNumeric();

		// 2. Генерируем вероятности через веса
		let denominator = [10, 20, 50].iz();
		
		// Генерируем n-1 случайный вес, оставляя место минимум для 1
		let weights = [];
		let currentSum = 0;
		for (let i = 0; i < n - 1; i++) {
			let maxW = denominator - currentSum - (n - 1 - i);
			if (maxW < 1) maxW = 1;
			let w = sluchch(1, maxW);
			weights.push(w);
			currentSum += w;
		}
		// Последний вес добивает сумму до denominator
		weights.push(denominator - currentSum);
		weights = weights.shuffle();

		// 3. Используем MathJS для нормировки и расчетов
		// Превращаем веса в вероятности: P = weights / sum(weights)
		// toSum нормирует веса так, чтобы сумма вероятностей была равна 1
		let probs = weights.toSum();

		// Расчет матожидания: E(X) = sum(x * p)
		let EX = math.dot(xVals, probs);

		// Проверки
		genAssertZ1000(EX);
		genAssert(Math.abs(EX) > 0.01, "Матожидание слишком близко к 0");

		// Формирование таблицы
		let rowsX = ['Значения $X$', ...xVals.map(x => x.ts())].tr();
		let rowsP = ['Вероятности', ...probs.map(p => p.ts())].tr();

		let tableHtml = `
			<table border="1" style="border-collapse: collapse; text-align: center; margin: 15px auto;">
				${rowsX}
				${rowsP}
			</table>`.replace(/<td>/g, '<td style="padding: 5px 10px; min-width: 60px;">');

		// Создаем массив строк вида "x * p"
		let terms = xVals.map((val, idx) => 
			`(${val.ts()}) \\cdot ${probs[idx].ts()}`
		);

		NAtask.setTask({
			text: `В таблице показано распределение случайной величины $X$. Найдите $E(X)$ — математическое ожидание этой случайной величины.` +
				  `<br/>${tableHtml}`,
			answers: EX,
			analys: `Математическое ожидание дискретной случайной величины вычисляется как сумма произведений значений на их вероятности: $E(X) = \\sum x_i \\cdot p_i$.` +
					`<br/>$E(X) = ${terms.join(' + ')} = ${EX.ts()}$.`
		});

		NAtask.modifiers.allDecimalsToStandard(true);
	});
})();
//509373
