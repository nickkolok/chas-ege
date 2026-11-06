(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}
		NAinfo.requireApiVersion(0, 2);
		let maxX = sl(5, 10);
		let minX = maxX - sl(10, 15);
		let X = [];
		let Y = [];
		for (let i = minX; i <= maxX; i += sl(0.5, 4, 0.1))
			X.push(i);
		Y.push(sl(1, 6).pm());
		for (let i = 1; i < X.length; i++) {
			do {
				Y[i] = Y[i - 1] + sl(2, 10).pm();
			} while (Y[i].abs() > 5 || Y[i] == 0);
		}
		let spline = new Spline(X, Y);
		let extremum = [];

		for (let i = minX; i < maxX; i += 0.1) {
			genAssert(f(i).abs() < 8, 'Слишком большой горбик');
			if (f(i) < f(i - 0.1) && f(i) < f(i + 0.1) || (f(i) > f(i - 0.1) && f(i) > f(i + 0.1))) {
				extremum.push(f(i));
			}
		}
		genAssert(extremum.length > 2, 'Максимумов недостаточно');

		let funcAscendingPoints = [];
		let funcDescendingPoints = [];
		for (let i = minX + 1; i < maxX; i++) {
			if (f(i) > 0) {
				genAssert(f(i).abs() > 1.5, 'Точка слишком близко к 0');
				funcAscendingPoints.push(i);
			}
			if (f(i) < 0) {
				genAssert(f(i).abs() > 1.5, 'Точка слишком близко к 0');
				funcDescendingPoints.push(i);
			}
		}
		let condition = [
			['возрастания', funcAscendingPoints],
			['убывания', funcDescendingPoints]
		].iz();
		let answ = [
			['сумму', condition[1].sum()],
			['произведение', condition[1].production()],
			['количество', condition[1].length]
		].iz();
		let paint1 = function(ct) {
			let h = 380;
			let w = 500;
			ct.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, 20);
			ct.font = "12px liberation_sans";
			ct.drawLine(20 * maxX, 5, 20 * maxX, -5);
			ct.drawLine(20 * minX, 5, 20 * minX, -5);
			if (maxX != 0 && maxX != 1)
				ct.fillText(maxX, 20 * maxX, 15);
			if (minX != 0 && minX != 1)
				ct.fillText(minX, 20 * minX - 13, 15);
			ct.scale(20, -20);
			ct.lineWidth = 0.15;

			graph9AdrawFunction(ct, f, {
				minX: minX,
				maxX: maxX,
				minY: -9,
				maxY: 9,
				step: 0.01
			});
			graph9AmarkCircles(ct, [
				[maxX, f(maxX)],
				[minX, f(minX)]
			], 2, 0.2);
			ct.fillStyle = "white";
			graph9AmarkCircles(ct, [
				[maxX, f(maxX)],
				[minX, f(minX)]
			], 2, 0.1);
		};
		NAtask.setTask({
			text: 'На рисунке изображен график производной функции $f(x)$, определенной на интервале$(' + minX + '; ' +
				maxX + ')$. ' +
				'Найдите промежутки ' + condition[0] +
				' функции $f(x)$. В ответе укажите ' + answ[0] + ' целых точек, входящих в эти промежутки.',
			answers: answ[1],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
//SugarHedgehog
//6429 8299 27497 6431 8051 8053 8055 8061 8063 8065 8071 8075 8077 8079 8087 
//8091 8093 8101 8103 8105 8107 8113 8115 8119 8125 8127 8131 8133 8137 8143 
//8149 8151 8155 8163 8171 8179 8181 8185 8187 8189 8193 8195 8201 8207 8209 
//8211 8213 8225 8227 8231 8235 8237 8241 8245 8247 8251 8253 8255 8257 8259 
//8263 8267 8269 8271 8273 8283 8287 8291 8293
