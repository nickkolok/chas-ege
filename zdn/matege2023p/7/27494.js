(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}
		NAinfo.requireApiVersion(0, 2);
		let maxX = sl(8, 10);
		let minX = maxX - sl(8, 15);
		let subMaxX = maxX - sl(1, 4);
		let subMinX = minX + sl(1, 4);
		let X = [];
		let Y = [];
		for (let i = minX; i <= maxX; i += sl(1.3, 4, 0.9))
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
				extremum.push([i, f(i)]);
			}
			if (extremum.length > 0)
				genAssert(extremum[extremum.length - 1][1].abs().round() != 0, 'слишком непонятный экстремум');
		}
		genAssert(extremum.length > 2, 'Экстремумов недостаточно');

		let minimun = [];
		let maximum = [];
		for (let i = subMinX + 0.1; i < subMaxX; i += 0.1) {
			if (f(i - 0.1) < 0 && f(i) > 0)
				minimun.push(i);
			if (f(i - 0.1) > 0 && f(i) < 0)
				maximum.push(i);
		}

		let condition = [
			['максимума', maximum.length],
			['минимума', minimun.length]
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
				ct.fillText(maxX, 20 * maxX - 5, 15);
			if (minX != 0 && minX != 1)
				ct.fillText(minX, 20 * minX - 10, 15);
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
			text: 'На рисунке изображен график производной функции $f(x)$, определенной на интервале $(' + minX + ';' +
				maxX + ')$. ' +
				'Найдите количество точек ' + condition[0] + ' функции $f(x)$ на отрезке $[' + subMinX + ';' + subMaxX +
				']$. ',
			answers: condition[1],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
//27494 7801 7807 8037 8045 509990 520652 520693 7817 7823 7841 7849 7855 7865 
//7877 7879 7881 7897 7907 7909 7919 7921 7939 7943 7947 7949 7967 7969 7975 8001 
//8005 8009 8015 8025 8027 8031 8035 8041 27495 7803 7809 8049 500910 7821 7825 7829 
//7833 7835 7839 7843 7847 7851 7859 7861 7869 7873 7875 7885 7891 7893 7895 7899 7901 
//7911 7913 7915 7925 7929 7935 7941 7945 7951 7955 7959 7971 7977 7979 7985 7987 7991 
//7997 7999 8013 8017 8029
