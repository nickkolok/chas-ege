(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '3495';
		// preference: о какой силе спрашиваем
		// 0 - равнодействующая всех сил (вдоль плоскости вниз)
		// 1 - сила тяжести (вертикально вниз)
		// 2 - сила нормальной реакции опоры (перпендикулярно плоскости наружу)
		// 3 - сила трения (вдоль плоскости вверх)
		let preference = ['resultant', 'gravity', 'normal', 'friction'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Угол наклона плоскости к горизонту (в градусах)
		let angleDegrees = sl(20, 45);
		let angleRad = angleDegrees * Math.PI / 180;

		// Случайная перестановка номеров векторов на рисунке
		// Векторы (физический смысл):
		// 0 - перпендикулярно плоскости наружу (нормаль)
		// 1 - вниз вдоль плоскости (равнодействующая)
		// 2 - вертикально вниз (сила тяжести)
		// 3 - вверх вдоль плоскости (трение)
		let vectorLabels = [1, 2, 3, 4].shuffle();
		// vectorLabels[i] - номер, которым на рисунке подписан i-й вектор (физически)

		// Для каждого физического вектора запоминаем, под каким номером он на рисунке
		let normalLabel = vectorLabels[0];    // нормаль
		let resultantLabel = vectorLabels[1]; // равнодействующая
		let gravityLabel = vectorLabels[2];   // сила тяжести
		let frictionLabel = vectorLabels[3];  // трение

		// Правильный ответ в зависимости от preference
		let correctAnswers = [
			resultantLabel,   // равнодействующая - вниз вдоль плоскости
			gravityLabel,     // сила тяжести - вертикально вниз
			normalLabel,      // нормальная реакция - перпендикулярно плоскости
			frictionLabel,    // сила трения - вверх вдоль плоскости
		];
		let answer = correctAnswers[rand];

		// Тексты вопроса
		let questionTexts = [
			'Какому из векторов 1–4 сонаправлена равнодействующая всех сил, действующих на брусок?',
			'Какому из векторов 1–4 сонаправлена сила тяжести, действующая на брусок?',
			'Какому из векторов 1–4 сонаправлена сила нормальной реакции опоры, действующая на брусок?',
			'Какому из векторов 1–4 сонаправлена сила трения, действующая на брусок?',
		];

		// Тексты решения
		let analysTexts = [
			'По второму закону Ньютона равнодействующая всех сил $\\vec{F} = m\\vec{a}$, ' +
			'то есть она сонаправлена с ускорением. ' +
			'Брусок начинает движение из состояния покоя и скользит вниз по наклонной плоскости, ' +
			'значит, ускорение направлено вниз вдоль наклонной плоскости. ' +
			'Следовательно, равнодействующая всех сил сонаправлена с вектором ' + resultantLabel + '.',

			'Сила тяжести всегда направлена вертикально вниз к центру Земли. ' +
			'Следовательно, сила тяжести сонаправлена с вектором ' + gravityLabel + '.',

			'Сила нормальной реакции опоры направлена перпендикулярно поверхности опоры ' +
			'(наклонной плоскости) наружу, от неё. ' +
			'Следовательно, сила нормальной реакции опоры сонаправлена с вектором ' + normalLabel + '.',

			'Брусок скользит вниз по наклонной плоскости. ' +
			'Сила трения скольжения всегда направлена противоположно скорости движения тела, ' +
			'то есть вверх вдоль наклонной плоскости. ' +
			'Следовательно, сила трения сонаправлена с вектором ' + frictionLabel + '.',
		];

		NAtask.setTask({
			text: 'В инерциальной системе отсчёта брусок из состояния покоя начинает скользить ' +
				'с ускорением вниз по наклонной плоскости (см. рисунок). ' +
				questionTexts[rand],
			answers: answer,
			analys: analysTexts[rand],
			authors: ['chas-ege-selena'],
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 350,
			paint: function (ctx) {
				let w = 400;
				let h = 350;

				// Наклонная плоскость (прямоугольный треугольник-клин)
				let baseLeftX = 40;
				let baseLeftY = h - 40;
				let baseRightX = w - 40;
				let baseRightY = h - 40;
				let topX = baseRightX;
				let topY = baseLeftY - (baseRightX - baseLeftX) * Math.tan(angleRad);

				// Ограничение по высоте
				if (topY < 60) {
					topY = 60;
				}

				// Рисуем клин
				ctx.strokeStyle = '#333';
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(baseLeftX, baseLeftY);
				ctx.lineTo(baseRightX, baseRightY);
				ctx.lineTo(topX, topY);
				ctx.closePath();
				ctx.fillStyle = '#ddd';
				ctx.fill();
				ctx.stroke();

				// Штриховка под плоскостью
				ctx.lineWidth = 1;
				ctx.strokeStyle = '#999';
				let hatchStep = 8;
				for (let i = baseLeftX; i < baseRightX; i += hatchStep) {
					ctx.beginPath();
					ctx.moveTo(i, baseLeftY);
					ctx.lineTo(i - hatchStep, baseLeftY + hatchStep);
					ctx.stroke();
				}

				// Обозначение угла наклона
				ctx.strokeStyle = '#333';
				ctx.lineWidth = 1.5;
				ctx.beginPath();
				ctx.arc(baseLeftX, baseLeftY, 35, -Math.PI, -Math.PI + angleRad);
				ctx.stroke();

				// Подпись угла α
				let alphaAngle = -Math.PI + angleRad / 2;
				let alphaX = baseLeftX + 45 * Math.cos(alphaAngle);
				let alphaY = baseLeftY + 45 * Math.sin(alphaAngle);
				ctx.font = '16px serif';
				ctx.fillStyle = '#333';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText('α', alphaX, alphaY);

				// Параметры наклонной плоскости
				let inclineDirX = topX - baseLeftX;
				let inclineDirY = topY - baseLeftY;
				let inclineLen = Math.sqrt(inclineDirX * inclineDirX + inclineDirY * inclineDirY);
				let inclineNormX = inclineDirX / inclineLen;
				let inclineNormY = inclineDirY / inclineLen;

				// Точка на наклонной плоскости, где стоит брусок
				let blockBaseT = 0.5;
				let blockBaseX = baseLeftX + inclineDirX * blockBaseT;
				let blockBaseY = baseLeftY + inclineDirY * blockBaseT;

				// Размеры бруска
				let blockW = 40;
				let blockH = 28;

				// Центр масс бруска (на расстоянии blockH/2 от поверхности)
				// Перпендикуляр наружу от плоскости: (inclineDirY, -inclineDirX) / inclineLen
				let outNormX = inclineDirY / inclineLen;
				let outNormY = -inclineDirX / inclineLen;

				let blockCenterX = blockBaseX + outNormX * (blockH / 2);
				let blockCenterY = blockBaseY + outNormY * (blockH / 2);

				// Рисуем брусок
				ctx.save();
				ctx.translate(blockBaseX, blockBaseY);
				ctx.rotate(-angleRad);
				ctx.fillStyle = '#b8860b';
				ctx.strokeStyle = '#333';
				ctx.lineWidth = 2;
				ctx.fillRect(-blockW / 2, -blockH, blockW, blockH);
				ctx.strokeRect(-blockW / 2, -blockH, blockW, blockH);
				ctx.restore();

				// Рисуем векторы из центра бруска
				let arrowLen = 65;

				function drawVector(fromX, fromY, toX, toY, label, color) {
					ctx.strokeStyle = color;
					ctx.fillStyle = color;
					ctx.lineWidth = 2.5;
					ctx.beginPath();
					ctx.moveTo(fromX, fromY);
					ctx.lineTo(toX, toY);
					ctx.stroke();

					let angle = Math.atan2(toY - fromY, toX - fromX);
					let headLen = 10;
					ctx.beginPath();
					ctx.moveTo(toX, toY);
					ctx.lineTo(
						toX - headLen * Math.cos(angle - Math.PI / 6),
						toY - headLen * Math.sin(angle - Math.PI / 6)
					);
					ctx.lineTo(
						toX - headLen * Math.cos(angle + Math.PI / 6),
						toY - headLen * Math.sin(angle + Math.PI / 6)
					);
					ctx.closePath();
					ctx.fill();

					let labelDist = arrowLen + 15;
					let labelX = fromX + labelDist * Math.cos(angle);
					let labelY = fromY + labelDist * Math.sin(angle);
					ctx.font = 'bold 16px serif';
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillText(label, labelX, labelY);
				}

				// Вектор 0: нормаль (перпендикулярно плоскости наружу)
				let normalEndX = blockCenterX + arrowLen * outNormX;
				let normalEndY = blockCenterY + arrowLen * outNormY;
				drawVector(blockCenterX, blockCenterY, normalEndX, normalEndY, '' + normalLabel, '#0066cc');

				// Вектор 1: вниз по наклонной (равнодействующая)
				let downEndX = blockCenterX - arrowLen * inclineNormX;
				let downEndY = blockCenterY - arrowLen * inclineNormY;
				drawVector(blockCenterX, blockCenterY, downEndX, downEndY, '' + resultantLabel, '#cc0000');

				// Вектор 2: вертикально вниз (сила тяжести)
				let gravityEndX = blockCenterX;
				let gravityEndY = blockCenterY + arrowLen;
				drawVector(blockCenterX, blockCenterY, gravityEndX, gravityEndY, '' + gravityLabel, '#009900');

				// Вектор 3: вверх по наклонной (сила трения)
				let upEndX = blockCenterX + arrowLen * inclineNormX;
				let upEndY = blockCenterY + arrowLen * inclineNormY;
				drawVector(blockCenterX, blockCenterY, upEndX, upEndY, '' + frictionLabel, '#ff8800');
			},
		});
	}, 1000);
})();
// https://phys-oge.sdamgia.ru/problem?id=24910
//chas-ege-selena
