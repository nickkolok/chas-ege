(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '511981';

		let H = sl(1, 23);

		let hourOnClock = H % 12;
		if (hourOnClock === 0)
			hourOnClock = 12;

		let angle = Math.min(hourOnClock, 12 - hourOnClock) * 30;

		NAtask.setTask({
			text: 'Какой наименьший угол (в градусах) образуют минутная и часовая стрелки часов в $' + H + ':00$?',
			answers: angle,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 220,
			height: 220,
			belowText: true,
			paint: function (ct) {
				let cx = 110;
				let cy = 110;
				let R = 100;

				ct.fillStyle = 'white';
				ct.fillRect(0, 0, 220, 220);

				// Циферблат
				ct.strokeStyle = 'black';
				ct.lineWidth = 2;
				ct.beginPath();
				ct.arc(cx, cy, R, 0, 2 * Math.PI);
				ct.stroke();

				// Цифры 1–12 по кругу
				ct.fillStyle = 'black';
				ct.font = '17px serif';
				ct.textAlign = 'center';
				ct.textBaseline = 'middle';
				for (let i = 1; i <= 12; i++) {
					let t = i * Math.PI / 6;
					ct.fillText('' + i, cx + (R - 17) * Math.sin(t), cy - (R - 17) * Math.cos(t));
				}

				// Стрелка с наконечником: hour — деление, length — длина, width — толщина
				let drawHand = function (hour, length, width) {
					let t = hour * Math.PI / 6;
					let sx = Math.sin(t);
					let cs = Math.cos(t);
					let x = cx + length * sx;
					let y = cy - length * cs;
					ct.lineWidth = width;
					ct.beginPath();
					ct.moveTo(cx, cy);
					ct.lineTo(x, y);
					ct.stroke();
					// наконечник (два «усика»)
					let dx = -sx;
					let dy = cs;
					let phi = 0.45;
					let barb = 9;
					for (let s of [1, -1]) {
						let rx = dx * Math.cos(phi) - dy * Math.sin(phi) * s;
						let ry = dx * Math.sin(phi) * s + dy * Math.cos(phi);
						ct.beginPath();
						ct.moveTo(x, y);
						ct.lineTo(x + barb * rx, y + barb * ry);
						ct.stroke();
					}
				};

				drawHand(12, R - 24, 2);          // минутная стрелка (всегда на 12)
				drawHand(hourOnClock, R - 46, 3); // часовая стрелка

				// точка в центре
				ct.fillStyle = 'black';
				ct.beginPath();
				ct.arc(cx, cy, 3, 0, 2 * Math.PI);
				ct.fill();
			},
		});
	}, 20000);
})();
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/problem?id=511981
