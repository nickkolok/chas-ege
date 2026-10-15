(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let uniqueCount = sluchch(3, 4);
		
		// Генерируем сами уникальные значения (от 1 до 9)
		let uniqueValues = arrayOfUniqueValues(uniqueCount, 1, 9);

		// Генерируем случайное количество повторов для каждого элемента (от 1 до 5)
		let xValues = uniqueValues.flatMap(item => {
			return Array(sl(2,5)).fill(item);
		}).shuffle();
		let n = xValues.length;

		// 4. Генерация вероятностей (сумма = 1)
		// Используем знаменатель 10 или 20 для красивых дробей
		let denominator = [10, 20].iz();
		let weights = [];

		for (let i = 0; i < n - 1; i++) {
			weights.push(sl(1, 10));
		}
		let currentSum = weights.sum();
		
		genAssert(denominator - currentSum > 0, 'Вероятностей не хватило');
		weights.push(denominator - currentSum);

		let probs = weights.map(w => w / denominator);

		// 5. Координаты точек внутри прямоугольника
		let coords = [arrayOfUniqueValues(n, -8, 7, 1.5), arrayOfUniqueValues(n, -6, 6)].T();

		// 6. Выбор целевого значения для вопроса
		let targetX = uniqueValues.iz();

		// Считаем вероятность события {X = targetX} суммированием
		let probTarget = 0;
		let terms = []; // Для вывода в решении
		for (let i = 0; i < n; i++) {
			if (xValues[i] === targetX) {
				probTarget += probs[i];
				terms.push(probs[i]);
			}
		}
		
		genAssertZ1000(probTarget);

		let paint = function(ctx) {
			let w = 400;
			let h = 400;

			// Рамка прямоугольника
			ctx.strokeStyle = "black";
			ctx.lineWidth = 1;
			ctx.strokeRect(20, 20, w - 40, h - 40);

			ctx.translate(w / 2, h / 2);
			ctx.scale(20, -20);
			ctx.lineWidth = 0.1;
			
			graph9AmarkCircles(ctx, coords, n, 0.18);

			// Подпись S
			ctx.font = "16px liberation_sans";
			ctx.scale(1 / 20, -1 / 20);
			ctx.fillText('S', w - 50, 30);
			
			// Рисуем точки и подписи
			for (let i = 0; i < n; i++) {
				let x = coords[i][0];
				let y = coords[i][1];

				// Значение X
				ctx.font = "bold 16px liberation_sans";
				ctx.fillText(xValues[i].ts(), x * 20, (-y * 20) - 6);

				// Вероятность
				ctx.font = "13px liberation_sans";
				ctx.fillText(probs[i].ts(), x * 20, (-y * 20) + 16);
			}
		};

		NAtask.setTask({
			text: `На диаграмме Эйлера схематически показан случайный опыт $S$. Точками изображены все элементарные события. Около каждой точки указано значение случайной величины $X$ и вероятность этого элементарного события. Найдите вероятность события $\{X = ${targetX}\}$.`,
			answers: probTarget,
			analys: `Событию $\{X = ${targetX}\}$ благоприятствуют все элементарные исходы, у которых значение случайной величины равно ${targetX}.` +
				`<br/>Так как таких исходов несколько, нужно просуммировать их вероятности:` +
				`<br/>$P(X = ${targetX}) = ${terms.map(t => t.ts()).join(' + ')} = ${probTarget.ts()}$.`
		});

		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint,
		});
	});
})();
//509533
