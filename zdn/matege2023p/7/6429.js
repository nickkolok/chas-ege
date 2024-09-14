(function() {
	retryWhileError(function() {
		'use strict';

		function getIntegerPoints(start, end, includeStart = false, includeEnd = false) {
			// Определяем границы
			let lowerBound = Math.ceil(start) + (!includeStart && Number.isInteger(start) ? 1 : 0);
			let upperBound = Math.floor(end) - (!includeEnd && Number.isInteger(end) ? 1 : 0);

			// Проверяем на пустой диапазон
			if (lowerBound > upperBound) return [];

			// Возвращаем массив целых чисел
			return Array.from({
				length: upperBound - lowerBound + 1
			}, (_, i) => lowerBound + i);
		}

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
		genAssert(f(maxX).abs() < 8, 'Экстремум за пределами сетки');
		genAssertGraphIntersectsPointWithNeighborhood(f, 1.1, -0.3, 0.2);
		genAssertGraphIntersectsPointWithNeighborhood(f, -0.5, 1.1, 0.2);
		genAssertGraphIntersectsPointWithNeighborhood(f, -0.3, -0.3, 0.2);
		genAssertGraphIntersectsPointWithNeighborhood(f, maxX, -0.3, 0.2);
		genAssertGraphIntersectsPointWithNeighborhood(f, minX, -0.3, 0.2);

		let extremums = findExtremumsOfFunction(f, minX, maxX, 0.1);
		let extremumsAll = extremums.minP.concat(extremums.maxP);
		genAssert(extremumsAll.length > 2, 'Максимумов недостаточно');


		let extremumsY = extremumsAll.T()[1];
		extremumsY.forEach((elem) => genAssert(elem.abs() < 5), 'Экстремум за пределами сетки');
		extremumsY.forEach((elem) => genAssert(elem.abs() > 0.5), 'Экстремум слишком близко к Ox');

		let extremumsX = extremumsAll.T()[0].sortNumericArr();
		extremumsX.forEach((elem) => genAssert((elem - minX).abs() > 0.5), 'Экстремум слишком близко к левому концу');
		extremumsX.forEach((elem) => genAssert((elem - maxX).abs() > 0.5), 'Экстремум слишком близко к правому концу');

		let rootsF = roots(f, minX, maxX);
		console.log(rootsF);
		genAssertNonempty(rootsF, 'Нулей нет');
		rootsF.forEach((elem) => genAssert((elem.abs() - elem.abs().floor()).abs() > 0.3,
			'Невозможно определить целую точку, если корень равен ' + elem));

		rootsF.push(maxX - 0.1);
		rootsF.unshift(minX);
		console.log(rootsF);

		let funcAscendingPoints = [];
		let funcDescendingPoints = [];

		for (let i = 1; i < rootsF.length; i++) {
			let segment = getIntegerPoints(rootsF[i - 1], rootsF[i]);
			if (f(0.5*(rootsF[i] - rootsF[i-1])) > 0) { //Нет, это не лишено смысла. График рисуется зеркально
				funcDescendingPoints = funcDescendingPoints.concat(segment);
			} else {
				funcAscendingPoints = funcAscendingPoints.concat(segment);
			}
		}

		genAssertNonempty(funcAscendingPoints, 'Точек возрастания нет');
		genAssertNonempty(funcDescendingPoints, 'Точек убывания нет');

		let condition = [
			['возрастания', funcAscendingPoints],
			['убывания', funcDescendingPoints]
		].iz();

		let paint1 = function(ctx) {
			let h = 380;
			let w = 500;
			ctx.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, 20);
			ctx.font = "12px liberation_sans";
			ctx.drawLine(20 * maxX, 5, 20 * maxX, -5);
			ctx.drawLine(20 * minX, 5, 20 * minX, -5);
			if (maxX != 0 && maxX != 1)
				ctx.fillText(maxX, 20 * maxX, 15);
			if (minX != 0 && minX != 1)
				ctx.fillText(minX, 20 * minX - 13, 15);
			ctx.scale(20, -20);
			ctx.lineWidth = 0.1;

			graph9AdrawFunction(ctx, f, {
				minX: minX,
				maxX: maxX,
				minY: -9,
				maxY: 9,
				step: 0.01
			});
			graph9AmarkCircles(ctx, [
				[maxX, f(maxX)],
				[minX, f(minX)]
			], 2, 0.2);
			ctx.fillStyle = "white";
			graph9AmarkCircles(ctx, [
				[maxX, f(maxX)],
				[minX, f(minX)]
			], 2, 0.1);
		};

		NAtask.setTask({
			text: 'На рисунке изображен график производной функции $f(x)$, определенной на интервале$(' + minX + '; ' +
				maxX + ')$. Найдите промежутки ' + condition[0] + ' функции $f(x)$. В ответе укажите ',
			questions: [{
				text: 'сумму',
				answers: condition[1].sum(),
			}, {
				text: 'произведение',
				answers: condition[1].production(),
			}, {
				text: 'количество',
				answers: condition[1].length,
			}],
			postquestion: ' целых точек, входящих в эти промежутки.',
			analys: 'Точки возрастания: $' + funcAscendingPoints.join(', ') + '$<br>' +
				'Точки убывания: $' + funcDescendingPoints.join(', ') + '$',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	}, 2000);
})();
//SugarHedgehog
//6429 8299 27497 6431 8051 8053 8055 8061 8063 8065 8071 8075 8077 8079 8087 
//8091 8093 8101 8103 8105 8107 8113 8115 8119 8125 8127 8131 8133 8137 8143 
//8149 8151 8155 8163 8171 8179 8181 8185 8187 8189 8193 8195 8201 8207 8209 
//8211 8213 8225 8227 8231 8235 8237 8241 8245 8247 8251 8253 8255 8257 8259 
//8263 8267 8269 8271 8273 8283 8287 8291 8293
