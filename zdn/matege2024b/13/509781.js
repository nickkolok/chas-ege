(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Пифагорова тройка [a, b, c]: один катет — расстояние от оси до сечения,
		// другой — половина хорды основания, гипотенуза — радиус основания
		let triple = genPifag();
		let radius = triple[2];
		// Радиус ограничен, чтобы числа в условии оставались подъёмными,
		// а чертёж - крупным относительно подписей
		genAssert(radius <= 20, 'Радиус основания не должен превышать 20, иначе числа в условии громоздкие');
		let distance = triple[sl1() ? 0 : 1];
		let halfChord = (distance === triple[0]) ? triple[1] : triple[0];
		let chord = 2 * halfChord;
		// Образующая привязана к радиусу: при независимой генерации цилиндр
		// вырождался в «блин» (радиус до 100 при образующей до 18), и сечение
		// сливалось с основаниями. Коридор [r, 2r] даёт читаемый цилиндр,
		// а все пропорции чертежа остаются истинными (md/task_geometry.md).
		let generator = sl(radius, 2 * radius);
		let square = chord * generator;

		// Используем класс Cylinder для хранения параметров
		let cylinder = new Cylinder({ radius: radius, height: generator });

		NAtask.setTask({
			text:
				'Радиус основания цилиндра равен $' + cylinder.radius + '$, а его образующая равна $' + cylinder.height + '$. ' +
				'Сечение, параллельное оси цилиндра, удалено от неё на расстояние, равное $' + distance + '$. ' +
				'Найдите площадь этого сечения.',
			analys:
				'Сечение цилиндра плоскостью, параллельной оси, — прямоугольник, ' +
				'стороны которого равны образующей $' + cylinder.height + '$ и хорде основания. ' +
				'Расстояние от оси до хорды равно $' + distance + '$, ' +
				'поэтому половина хорды равна $\\sqrt{' + cylinder.radius + '^2-' + distance + '^2}=' + halfChord + '$, ' +
				'а вся хорда равна $' + chord + '$. ' +
				'Площадь сечения равна $' + chord + '\\cdot' + cylinder.height + '=' + square + '$.',
			answers: square,
			authors: ['chas-ege-selena'],
		});

		let paint = function (ct) {
			let scale = Math.min(120 / cylinder.radius, 120 / cylinder.height);
			let r = cylinder.radius * scale;
			let H = cylinder.height * scale;
			let ry = 0.3 * r;
			
			ct.translate(150, 150 + ry / 2);
			ct.lineWidth = 2;
			ct.strokeStyle = om.secondaryBrandColors.iz();
			
			let yProjOffset = ry * distance / cylinder.radius;
			let a = halfChord * scale;
			
			// 1. Невидимая (задняя) часть нижнего основания
			ct.setLineDash([6, 4]);
			ct.drawEllipse(0, H / 2, r, ry, 0, Math.PI, 2 * Math.PI);
			
			// 2. Ось цилиндра (невидимая внутри)
			ct.drawLine(0, -H / 2, 0, H / 2);
			
			// 3. Сечение (полупрозрачный прямоугольник)
			let rectPoints = [
				[-a, H / 2 + yProjOffset],
				[a, H / 2 + yProjOffset],
				[a, -H / 2 + yProjOffset],
				[-a, -H / 2 + yProjOffset]
			];
			ct.setLineDash([]);
			ct.drawSection(rectPoints, om.transparentBrandColors.iz());
			
			// Контур сечения
			ct.beginPath();
			ct.moveTo(rectPoints[0][0], rectPoints[0][1]);
			for (let i = 1; i < rectPoints.length; i++) {
				ct.lineTo(rectPoints[i][0], rectPoints[i][1]);
			}
			ct.closePath();
			ct.stroke();
			
			// 4. Видимая (передняя) часть нижнего основания
			ct.drawEllipse(0, H / 2, r, ry, 0, 0, Math.PI);
			
			// 5. Верхнее основание (видимо целиком)
			ct.drawEllipse(0, -H / 2, r, ry);
			
			// 6. Силуэтные образующие
			ct.drawLine(-r, -H / 2, -r, H / 2);
			ct.drawLine(r, -H / 2, r, H / 2);
			
			// 7. Расстояние от оси до сечения (на верхнем основании)
			ct.drawLine(0, -H / 2, 0, -H / 2 + yProjOffset);
			
			// Засечки для обозначения расстояния
			let tickSize = 5;
			ct.drawLine(-tickSize, -H / 2, tickSize, -H / 2);
			ct.drawLine(-tickSize, -H / 2 + yProjOffset, tickSize, -H / 2 + yProjOffset);
		};

		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint,
		});
	}, 100);
})();
//509781
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/problem?id=509781