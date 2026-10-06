(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let widthRatio, heightRatio, volumeRatio;
		do {
			widthRatio = sl(2, 6);   // во сколько раз вторая коробка шире первой
			heightRatio = sl(15, 60) / 10;  // во сколько раз первая коробка выше второй (1.5 – 6.0)
			volumeRatio = (widthRatio * widthRatio) / heightRatio;  // V2 / V1
		} while (Math.round(volumeRatio * 10) !== volumeRatio * 10 || volumeRatio > 20);

		// Склонение слова «раз» в зависимости от числительного
		let razForm = function(number) {
			if (number % 1 !== 0) return 'раза';  // дробные: 1.5 раза, 2.5 раза
			let intValue = Math.floor(number);
			let lastDigit = intValue % 10;
			let lastTwoDigits = intValue % 100;
			if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'раз';
			if (lastDigit === 1) return 'раз';
			if (lastDigit >= 2 && lastDigit <= 4) return 'раза';
			return 'раз';
		};

		let taskText = 'Даны две коробки, имеющие форму правильной четырёхугольной призмы, стоящей на основании. Первая коробка в {heightRatio} {heightRaz} выше второй, а вторая в {widthRatio} {widthRaz} шире первой. Во сколько раз объём второй коробки больше объёма первой?';
		taskText = taskText
			.replace('{heightRatio}', heightRatio)
			.replace('{heightRaz}', razForm(heightRatio))
			.replace('{widthRatio}', widthRatio)
			.replace('{widthRaz}', razForm(widthRatio));

		// Функция рисования двух коробок
		let paintBoxes = function (ct) {
			ct.translate(40, 30);
			ct.scale(20, 20);
			ct.lineWidth = 2 / 20;

			// Первая коробка — высокая и узкая (слева)
			ct.drawParallelepiped({
				width: 3,
				height: 9,
				depth: 3,
				angle: 30,
				strokeStyle: om.primaryBrandColors,
			}, [0, 0, 0], false, [0.5, 0.3]);

			// Смещаем контекст для второй коробки: правее и вниз
			ct.save();
			ct.translate(7, 3);  // сдвиг вправо на 18 и вниз на 4 единицы

			// Вторая коробка — низкая и широкая (справа)
			ct.drawParallelepiped({
				width: 8,
				height: 3,
				depth: 8,
				angle: 30,
				strokeStyle: om.primaryBrandColors,
			}, [0, 0, 0], false, [0.5, 0.3]);

			ct.restore();
		};

		NAtask.setTask({
			text: taskText,
			answers: volumeRatio,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 300,
			paint: paintBoxes,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=523577
