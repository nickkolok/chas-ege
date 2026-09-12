(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let ans = sl(10, 50, 1);
		let h = ans * 4;

		// Статичная иллюстрация: сосуд с водой и отметка уровня h
		let paint1 = function (ct) {
			let w = 150;    // ширина передней грани, px
			let hgt = 140;  // высота сосуда, px
			let dc = 55;    // смещение глубины по x, px
			let d2 = 35;    // смещение глубины по y, px
			let wy = hgt - 70; // линия воды на передней грани, px

			ct.translate(60, 120);
			ct.lineWidth = 1.5;
			ct.strokeStyle = '#000000';

			// ВОДА: закрашиваем все три видимые части
			ct.fillStyle = '#cccccc';
			// передняя грань столба воды
			ct.fillRect(0, wy, w, hgt - wy);
			// боковая (правая) грань столба воды
			ct.beginPath();
			ct.moveTo(w, wy);
			ct.lineTo(w + dc, wy - d2);
			ct.lineTo(w + dc, hgt - d2);
			ct.lineTo(w, hgt);
			ct.closePath();
			ct.fill();
			// поверхность воды
			ct.beginPath();
			ct.moveTo(0, wy);
			ct.lineTo(w, wy);
			ct.lineTo(w + dc, wy - d2);
			ct.lineTo(dc, wy - d2);
			ct.closePath();
			ct.fill();

			// невидимые рёбра — пунктиром
			ct.setLineDash([5, 4]);
			ct.beginPath();
			ct.moveTo(dc, -d2);      ct.lineTo(dc, hgt - d2);      // заднее левое вертикальное
			ct.moveTo(dc, hgt - d2); ct.lineTo(w + dc, hgt - d2);  // заднее нижнее
			ct.moveTo(0, hgt);       ct.lineTo(dc, hgt - d2);      // левое нижнее ребро глубины
			ct.stroke();
			ct.setLineDash([]);

			// видимый контур сосуда и линии воды
			ct.beginPath();
			ct.rect(0, 0, w, hgt);                            // передняя грань
			ct.moveTo(0, 0);       ct.lineTo(dc, -d2);        // верхнее левое ребро глубины
			ct.moveTo(w, 0);       ct.lineTo(w + dc, -d2);    // верхнее правое ребро глубины
			ct.moveTo(dc, -d2);    ct.lineTo(w + dc, -d2);    // заднее верхнее
			ct.moveTo(w, hgt);     ct.lineTo(w + dc, hgt - d2); // нижнее правое ребро глубины
			ct.moveTo(w + dc, -d2); ct.lineTo(w + dc, hgt - d2); // заднее правое вертикальное
			// линии уровня воды
			ct.moveTo(0, wy);  ct.lineTo(w, wy);              // передняя линия воды
			ct.moveTo(w, wy);  ct.lineTo(w + dc, wy - d2);    // правая линия воды
			ct.moveTo(dc, wy - d2); ct.lineTo(w + dc, wy - d2); // задняя линия воды
			ct.moveTo(0, wy);  ct.lineTo(dc, wy - d2);        // левая линия воды
			ct.stroke();

			// двунаправленная стрелка уровня h
			let ax = w + dc + 18;
			ct.drawArrow(ax, wy, ax, hgt);
			ct.drawArrow(ax, hgt, ax, wy);
			ct.font = 'italic 20px serif';
			ct.fillStyle = '#000000';
			ct.fillText('h', ax + 8, (wy + hgt) / 2 + 7);
		};

		NAtask.setTask({
			text: 'Вода в сосуде, имеющем форму правильной четырёхугольной призмы, находится на уровне $' + h + '$ см. ' +
				'На каком уровне окажется вода, если её перелить в другой сосуд, имеющий форму правильной четырёхугольной призмы, ' +
				'у которого сторона основания вдвое больше, чем у данного? Ответ дайте в сантиметрах.',
			answers: ans,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 300,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//Селена
//https://mathb-ege.sdamgia.ru/test?likes=512461
