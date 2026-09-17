(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let k = sl(2, 5);
		let H = sl(2, 20);
		let h = H * k * k;
		let k_word = (k === 2 || k === 3 || k === 4) ? "раза" : "раз";

		let paintCylinder = function (ct) {
			let cx = 120;
			let topY = 50;
			let bottomY = 200;
			let radiusX = 60;
			let radiusY = 15;
			let waterY = 140;
			
			ct.lineWidth = 2;
			ct.strokeStyle = '#000';
			
			// Верхний эллипс (открытый верх)
			ct.beginPath();
			ct.ellipse(cx, topY, radiusX, radiusY, 0, 0, Math.PI * 2);
			ct.stroke();
			
			// Боковые линии
			ct.beginPath();
			ct.moveTo(cx - radiusX, topY);
			ct.lineTo(cx - radiusX, bottomY);
			ct.moveTo(cx + radiusX, topY);
			ct.lineTo(cx + radiusX, bottomY);
			ct.stroke();
			
			// Нижний эллипс (задняя часть дна)
			ct.beginPath();
			ct.ellipse(cx, bottomY, radiusX, radiusY, 0, Math.PI, 0);
			ct.stroke();
			
			// Уровень воды (пунктирный эллипс)
			ct.beginPath();
			ct.ellipse(cx, waterY, radiusX, radiusY, 0, 0, Math.PI * 2);
			ct.setLineDash([5, 3]);
			ct.stroke();
			ct.setLineDash([]);
			
			// Заливка воды
			ct.beginPath();
			ct.moveTo(cx - radiusX, waterY);
			ct.lineTo(cx - radiusX, bottomY);
			ct.ellipse(cx, bottomY, radiusX, radiusY, 0, Math.PI, 0, true);
			ct.lineTo(cx + radiusX, waterY);
			ct.ellipse(cx, waterY, radiusX, radiusY, 0, 0, Math.PI * 2, true);
			ct.fillStyle = 'rgba(173, 216, 230, 0.6)';
			ct.fill();
			
			// Стрелка с обозначением h
			let arrowX = cx + radiusX + 30;
			ct.lineWidth = 2;
			ct.strokeStyle = '#000';
			
			// Вертикальная линия стрелки
			ct.beginPath();
			ct.moveTo(arrowX, topY);
			ct.lineTo(arrowX, waterY);
			ct.stroke();
			
			// Стрелка вверх
			ct.beginPath();
			ct.moveTo(arrowX - 5, topY + 8);
			ct.lineTo(arrowX, topY);
			ct.lineTo(arrowX + 5, topY + 8);
			ct.stroke();
			
			// Стрелка вниз
			ct.beginPath();
			ct.moveTo(arrowX - 5, waterY - 8);
			ct.lineTo(arrowX, waterY);
			ct.lineTo(arrowX + 5, waterY - 8);
			ct.stroke();
			
			// Буква h
			ct.fillStyle = '#000';
			ct.font = '20px sans-serif';
			ct.fillText('h', arrowX + 10, (topY + waterY) / 2 + 7);
		};

		NAtask.setTask({
			text: 'Вода в сосуде цилиндрической формы находится на уровне $h = ' + h + '$ см. На каком уровне окажется вода, если её перелить в другой цилиндрический сосуд, у которого радиус основания в $' + k + '$ ' + k_word + ' больше, чем у данного? Ответ дайте в сантиметрах.',
			answers: H,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 300,
			paint: paintCylinder,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/problem?id=511443
