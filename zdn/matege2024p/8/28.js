(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}
		NAinfo.requireApiVersion(0, 2);
		let maxX = sl(0, 7);
		let minX = -sl(1, 7);
		let X = [];
		let Y = [];
		for (let i = minX; i <= maxX; i += sl(2, 4))
			X.push(i);
		Y.push(sl(1, 5).pm());
		for (let i = 1; i < X.length; i++) {
			Y[i] = (i % 2) ? sl(1, 4) : -sl(1, 4);
		}

		let spline = new Spline(X, Y);
		genAssert(f(maxX).abs() < 5, 'Экстремум за пределами сетки');

		genAssertGraphIntersectsPointWithNeighborhood(f, 1.1, -0.3, 0.2);
		genAssertGraphIntersectsPointWithNeighborhood(f, -0.5, 1.1, 0.2);
		genAssertGraphIntersectsPointWithNeighborhood(f, maxX, -0.3, 0.2);
		genAssertGraphIntersectsPointWithNeighborhood(f, minX, -0.3, 0.2);

		let extremums = findExtremumsOfFunction(f, minX, maxX, 0.1);
		let extremumsAll = extremums.minP.concat(extremums.maxP);
		genAssert(extremumsAll.length > 1, 'Экстремумов недостаточно');
		
		let extremumForAnsw = extremumsAll.filter((elem) => elem[0].isAlmostInteger() && elem[1].isAlmostInteger());
		genAssert(extremumForAnsw.length > 1, 'Экстремумов подходящих для вопроса нет');

		let extremumsX = extremumsAll.T()[0].sortNumericArr();
		let extremumsY = extremumsAll.T()[1];

		extremumsX.forEach((elem) => genAssert((elem - minX).abs() > 0.5), 'Экстремум слишком близко к левому концу');
		extremumsX.forEach((elem) => genAssert((elem - maxX).abs() > 0.5), 'Экстремум слишком близко к правому концу');
		extremumsY.forEach((elem) => genAssert(elem.abs() < 5), 'Экстремум за пределами сетки');

		extremumForAnsw = extremumForAnsw.iz();

		let segmentMax,segmentMin;
		do{
			segmentMax = sl(extremumForAnsw[0]+1,maxX);
			segmentMin = sl(minX, extremumForAnsw[0]-1);
		}while(extremumsX.kolvoMzhd(segmentMin,segmentMax, true)!=1);

		let paint1 = function(ctx) {
			let scale = 30;
			let h = 400;
			let w = 500;
			ctx.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, scale);

			ctx.font = "12px liberation_sans";
			ctx.drawLine(scale * maxX, 5, scale * maxX, -5);
			ctx.drawLine(scale * minX, 5, scale * minX, -5);
			if (maxX != 0 && maxX != 1)
				ctx.fillText(maxX, scale * maxX, 15);
			if (minX != 0 && minX != 1)
				ctx.fillText(minX, scale * minX, 15);
			ctx.scale(scale, -scale);
			ctx.lineWidth = 0.1;

			graph9AdrawFunction(ctx, f, {
				minX: minX,
				maxX: maxX,
				minY: -5.5,
				maxY: 5.5,
				step: 0.01
			});

			graph9AmarkCircles(ctx, [
				[maxX, f(maxX)],
				[minX, f(minX)],
			], 4, 0.2);
			ctx.fillStyle = "white";
			graph9AmarkCircles(ctx, [
				[maxX, f(maxX)],
				[minX, f(minX)],
			], 2, 0.1);
		};
		NAtask.setTask({
			text: 'На рисунке изображен график функции $y = f(x)$, определенной на интервале $(' + minX + '; ' + maxX +
				')$. Найдите ' + ['корень уравнения $f\'(x)=0$', 'точку в которой ' + ['$f\'(x)=0$', ['$f\'(x)$',
					'производная $f(x)$'
				].iz() + ' равна $0$'].iz()].iz() + ' на отрезке ' + '$[' + segmentMin.ts() + ';' + segmentMax.ts() + ']$.',
			answers: extremumForAnsw[0],
			analys: 'Всего точек экстремума: ' + extremumsAll.length + '<br>' +
				extremumsAll.map((elem) => '$(' + elem[0].toFixedLess(2) + ';' + elem[1].toFixedLess(2) + ')$').join(' ').replace(
					'-0', '0'),
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	}, 4000);
})();
//28 по Ширяевой
