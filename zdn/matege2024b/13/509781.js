(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Пифагорова тройка: один катет — расстояние от оси до сечения,
		// другой — половина хорды основания, гипотенуза — радиус основания.
		// Перебираем все тройки (не только примитивные) с гипотенузой до 30:
		// у ФИПИ (1DD343, 3BC472, 67A05C) радиусы от 5 до 29, в том числе
		// тройка 20, 21, 29, которой нет в om.pifagtr.
		let triples = [];
		for (let x = 1; x < 30; x++) {
			for (let y = 1; y < 30; y++) {
				let z = Math.sqrt(x * x + y * y);
				if (z <= 30 && z.isAlmostInteger()) {
					triples.push([x, y, Math.round(z)]);
				}
			}
		}
		// В тройке [x, y, z] x — расстояние до оси, y — половина хорды
		let triple = triples.iz();
		let radius = triple[2];
		let distance = triple[0];
		let halfChord = triple[1];
		let chord = 2 * halfChord;
		// Образующая от четверти радиуса до трёх с половиной радиусов: так достижимы
		// все наборы ФИПИ (самый плоский цилиндр — 25 и 7, самый высокий — 5 и 17),
		// а чертёж не вырождается ни в «блин», ни в «иглу» (md/task_geometry.md).
		// Образующие у ФИПИ не больше 19.
		let generator = sl(Math.max(2, Math.ceil(radius / 4)), Math.min(20, Math.floor(3.5 * radius)));
		let square = chord * generator;

		// Используем класс Cylinder для хранения параметров
		let cylinder = new Cylinder({ radius: radius, height: generator });

		// Формулировки ФИПИ: 1DD343, 3BC472, 67A05C
		let distanceText = [
			'удалено от неё на расстояние, равное',
			'расположено от неё на расстоянии, равном',
			'удалено от оси на расстояние, равное',
		].iz();

		NAtask.setTask({
			text:
				'Радиус основания цилиндра равен $' + cylinder.radius + '$, а его образующая равна $' + cylinder.height + '$. ' +
				'Сечение, параллельное оси цилиндра, ' + distanceText + ' $' + distance + '$. ' +
				'Найдите площадь этого сечения.',
			analys:
				'Сечение цилиндра плоскостью, параллельной оси, — прямоугольник, ' +
				'стороны которого равны образующей $' + cylinder.height + '$ и хорде основания. ' +
				'Расстояние от оси до хорды равно $' + distance + '$, ' +
				'поэтому половина хорды равна $\\sqrt{' + cylinder.radius + '^2-' + distance + '^2}=' + halfChord + '$, ' +
				'а вся хорда равна $' + chord + '$. ' +
				'Площадь сечения равна $' + chord + '\\cdot' + cylinder.height + '=' + square + '$.',
			answers: square,
			authors: ['chas-ege-selena', 'Zer00Player'],
		});

		let paint = function (ct) {
			// Масштаб: цилиндр вместе с эллипсами оснований вписан в 260 x 260
			let scale = Math.min(130 / cylinder.radius, 260 / (cylinder.height + 0.6 * cylinder.radius));
			let r = cylinder.radius * scale;
			let H = cylinder.height * scale;
			let ry = 0.3 * r;

			ct.translate(150, 150);
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
	}, 1000);
})();
//509781
//chas-ege-selena, Zer00Player
//https://mathb-ege.sdamgia.ru/problem?id=509781
