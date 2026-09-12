(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let length = sl(10, 70, 10);
		let height = sl(5, 40, 5);
		let volume = length*length*height;

		NAtask.setTask({
			text: 'В бак, имеющий форму правильной четырёхугольной призмы со стороной основания, равной $' + length + '$ см, налита жидкость. ' +
				'Чтобы измерить объём детали сложной формы, её полностью погружают в эту жидкость. ' +
				'Найдите объём детали, если после её погружения уровень жидкости в баке поднялся на $' + height + '$ см. Ответ дайте в кубических сантиметрах.',
			answers:volume,
		});

		let paint1 = function (ct) {
			// Иллюстрация статична и одинакова для всех вариаций задачи
			ct.lineWidth = 1;
			ct.strokeStyle = 'black';

			let line = function (x1, y1, x2, y2, dotted) {
				ct.setLineDash(dotted ? [5, 3] : []);
				ct.drawLine(x1, y1, x2, y2);
				ct.setLineDash([]);
			};

			// жидкость: передняя грань и правая боковая ниже уровня
			ct.fillStyle = '#cccccc';
			ct.beginPath();
			ct.moveTo(65, 140);
			ct.lineTo(185, 140);
			ct.lineTo(185, 250);
			ct.lineTo(65, 250);
			ct.closePath();
			ct.fill();
			ct.beginPath();
			ct.moveTo(185, 140);
			ct.lineTo(235, 100);
			ct.lineTo(235, 210);
			ct.lineTo(185, 250);
			ct.closePath();
			ct.fill();

			// видимые рёбра бака
			line(65, 90, 185, 90);
			line(185, 90, 185, 250);
			line(185, 250, 65, 250);
			line(65, 250, 65, 90);
			line(65, 90, 115, 50);
			line(115, 50, 235, 50);
			line(235, 50, 185, 90);
			line(235, 50, 235, 210);
			line(235, 210, 185, 250);
			// видимая часть поверхности жидкости
			line(65, 140, 185, 140);
			line(185, 140, 235, 100);
			// невидимые рёбра поверхности жидкости и бака
			line(65, 140, 115, 100, 1);
			line(115, 100, 235, 100, 1);
			line(65, 250, 115, 210, 1);
			line(115, 210, 235, 210, 1);
			line(115, 50, 115, 210, 1);
		};

		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506456
