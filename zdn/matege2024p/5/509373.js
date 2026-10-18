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
		// math.divide поддерживает деление массива на число
		let probs = math.divide(weights, denominator);

		// Расчет матожидания: E(X) = sum(x * p)
		// math.dotMultiply делает поэлементное умножение векторов
		// math.sum суммирует элементы массива
		let EX = math.sum(math.dotMultiply(xVals, probs));

		// Проверки
		genAssertZ1000(EX);
		genAssert(Math.abs(EX) > 0.01, "Матожидание слишком близко к 0");

		// Формирование таблицы
		let rowsX = '<tr><td>Значения $X$</td>';
		let rowsP = '<tr><td>Вероятности</td>';

		for (let i = 0; i < n; i++) {
			rowsX += `<td>${xVals[i].ts()}</td>`;
			rowsP += `<td>${probs[i].ts()}</td>`;
		}
		rowsX += '</tr>';
		rowsP += '</tr>';

		let tableHtml = `
			<table border="1" style="border-collapse: collapse; text-align: center; margin: 15px auto;">
				${rowsX}
				${rowsP}
			</table>`.replace(/<td>/g, '<td style="padding: 5px 10px; min-width: 60px;">');

		// Создаем массив строк вида "x * p"
		let terms = math.dotMultiply(xVals, probs).map((val, idx) => 
			`(${xVals[idx].ts()}) \\cdot ${probs[idx].ts()}`
		);

		NAtask.setTask({
			text: `В таблице показано распределение случайной величины $X$. Найдите $E(X)$ — математическое ожидание этой случайной величины.` +
				  `<br/>${tableHtml}`,
			answers: EX,
			analys: `Математическое ожидание дискретной случайной величины вычисляется как сумма произведений значений на их вероятности: $E(X) = \\sum x_i \\cdot p_i$.` +
					(`<br/>$E(X) = ${terms.join(' + ')} = ${EX.ts()}$.`).ts()
		});

		NAtask.modifiers.allDecimalsToStandard(true);
	});
})();
//509373
