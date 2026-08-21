(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		// 1. Выбираем количество УНИКАЛЬНЫХ значений (3 или 4 типа цифр)
		let uniqueCount = sluchch(3, 4);
		
		// Генерируем сами уникальные значения (от 1 до 9)
		let uniqueValues = arrayOfUniqueValues(uniqueCount, 1, 9);

		// 2. Заполняем массив xValues
		let xValues = uniqueValues.flatMap(item => {
			return Array(sl(2, 8)).fill(item);
		});
		
		let n = xValues.length;

		// Перемешиваем итоговый массив, чтобы одинаковые цифры не стояли рядом
		xValues = xValues.shuffle();

		// 4. Координаты точек внутри прямоугольника
		// Распределяем точки так, чтобы они не накладывались (шаг 1.5 по X)
		let coords = [arrayOfUniqueValues(n, -8, 7, 1.5), arrayOfUniqueValues(n, -6, 6)].T();

		// 5. Выбор целевого значения для вопроса
		let targetX = uniqueValues.iz();

		// 6. Расчет вероятности
		// Так как все элементарные события равновозможны, P = k / n
		let countFavorable = xValues.filter(x => x ==targetX).length;
		let answer = math.divide(countFavorable, n);

		genAssertZ1000(answer);

		let paint = function(ctx) {
			let w = 400;
			let h = 400;

			// Рамка прямоугольника S
			ctx.strokeStyle = "black";
			ctx.lineWidth = 1;
			ctx.strokeRect(20, 20, w - 40, h - 40);

			ctx.translate(w / 2, h / 2);
			ctx.scale(20, -20);
			ctx.lineWidth = 0.1;
			
			// Рисуем точки
			graph9AmarkCircles(ctx, coords, n, 0.18);

			// Подпись S
			ctx.font = "16px liberation_sans";
			ctx.scale(1 / 20, -1 / 20);
			ctx.fillText('S', w - 50, 30);
			
			// Подписываем только значения X (без вероятностей)
			for (let i = 0; i < n; i++) {
				let x = coords[i][0];
				let y = coords[i][1];

				// Значение X (жирным, как в примере задачи)
				ctx.font = "bold 18px liberation_sans";
				// Смещаем чуть выше точки
				ctx.fillText(xValues[i].ts(), x * 20, (-y * 20) - 6);
			}
		};

		NAtask.setTask({
			text: `На диаграмме Эйлера схематически показан случайный опыт $S$, с которым связана случайная величина $X$. Все элементарные события равновозможны, и около каждого указано соответствующее значение случайной величины $X$. Найдите вероятность события $\{X = ${targetX}\}$.`,
			answers: answer,
			analys: `Всего имеется $n = ${n}$ элементарных исходов. Так как все они равновозможны, вероятность каждого равна $\\frac{1}{${n}}$.` +
					`<br/>Событию $\{X = ${targetX}\}$ благоприятствуют исходы, в которых выпало число ${targetX}. Таких исходов ${countFavorable}.` +
					`<br/>Тогда вероятность события равна отношению благоприятных исходов к общему числу исходов: ` +
					`$P(X = ${targetX}) = \\frac{${countFavorable}}{${n}} = ${answer.ts()}$.`
		});

		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint,
		});
	});
})();
//509534
