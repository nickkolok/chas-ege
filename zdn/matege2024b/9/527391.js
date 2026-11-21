(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let nameCityWithLakes = [
			['Нижний Тагил', ['Выйский', 'Черноисточинский']],
			['Коломна', ['Казанский', 'Парковый']],
			['Екатеринбург', ['Верх-Исетский', 'Нижне-Исетский']],
			['Пенза', ['Комсомольский', 'Банный']],
			['Ялта', ['Верхний', 'Нижний']],
			['Липецк', ['Петровский', 'Комсомольский']],
			['Калининград', ['Верхний', 'Нижний']],
			['Чебоксары', ['Заводской', 'Южный']],
			['Уфа', ['Нижегородский', 'Солнечный']],
			['Тюмень', ['Лебяжий', 'Центральный']],
			['Кемерово', ['Комсомольский', 'Рудничный']],
			['Новокузнецк', ['Верхний', 'Заводской']],
			['Магнитогорск', ['Парковый', 'Лесной']],
			['Орск', ['Старый', 'Новый']],
			['Стерлитамак', ['Городской', 'Северный']],
			['Нижнекамск', ['Промышленный', 'Центральный']],
			['Дзержинск', ['Волжский', 'Восточный']],
			['Братск', ['Старый', 'Падунский']],
			['Ангарск', ['Парковый', 'Молодежный']],
			['Благовещенск', ['Городской', 'Утиный']],
			['Южно-Сахалинск', ['Комсомольский', 'Парковый']],
			['Хабаровск', ['Стадионный', 'Пионерский']],
			['Владивосток', ['Спортивный', 'Лесной']],
		].iz();

		const settings = {
			villagePoints: sl(10, 15),
			villageSize: 4.2,
			lakePoints: sl(6, 8),
			lakeCount: [2, nameCityWithLakes[1].length].maxE(),
			minLakeSize: 1,
			maxLakeSize: 4,
			colorFillLake: '#a0d3ff50',
		};


		let mapData = generateMapData(0, 0, settings);
		let lakes = mapData.lakes;
		genAssert(lakes.length > 1, 'Только один пруд');

		let sortedByCenterY = lakes.sort((a, b) => a.center.y - b.center.y);
		genAssert(!sortedByCenterY.map(lake => lake.center.y).hasAlmostDuplicateNumbers(0.5), 'Только один пруд');

		let rand = sl(lakes.length - 1);
		let chooseLake = lakes[rand];
		let answ = chooseLake.polygon.area();
		genAssert((answ - answ.floor() < 0.3) || (answ.ceil() - answ < 0.3), 'Ответ не читаем');

		let paint1 = function(ctx) {
			let height = ctx.canvas.height;
			let width = ctx.canvas.width;
			let scale = 40;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = '#fff';
			ctx.fillRect(0, 0, width, height);
			ctx.strokeStyle = '#888';
			ctx.lineWidth = 0.5;

			ctx.translateToCenter();

			ctx.regularGrid(scale, width / (2 * scale));

			ctx.scale(scale, -scale);
			ctx.lineWidth = 2 / scale;
			drawMapOutlines(ctx, mapData, settings);
			ctx.strokeStyle = 'black';
			ctx.drawLine(3, -4, 4, -4);
			ctx.drawLine(3, -3.9, 3, -4.1);
			ctx.drawLine(4, -3.9, 4, -4.1);

			ctx.scale(1 / scale, -1 / scale);
			ctx.font = "12px serif";
			ctx.fillStyle = 'black';

			lakes.forEach((lake, index) => {
				ctx.fillText('пруд', (lake.center.x) * scale, -lake.center.y * scale - 12);
				ctx.fillText(nameCityWithLakes[1][index], (lake.center.x) * scale, -lake.center.y * scale);
			});

			ctx.fillStyle = 'black';
			ctx.fillText('1 км', 3.5 * scale, 4.3 * scale);

			ctx.font = "bold 20px serif";
			ctx.fillText('г. ' + nameCityWithLakes[0], 0, -4.5 * scale);
		};

		NAtask.setTask({
			text: 'На фрагменте географической карты схематично изображены границы города ' + nameCityWithLakes[0] +
				' и очертания водоёмов (длина стороны квадратной клетки равна 1 км). Оцените приближённо площадь пруда ' +
				nameCityWithLakes[1][rand] + '. Ответ дайте в квадратных километрах с округлением до целого числа.',
			answers: answ.round(),
			analys: '$' + answ.toFixedLess(3) + '$',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 100);
})();

// https://mathb-ege.sdamgia.ru/problem?id=527391
