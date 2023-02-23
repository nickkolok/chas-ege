(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}
		NAinfo.requireApiVersion(0, 2);
		let maxX = sl(8, 10);
		let minX = maxX - sl(8, 18);
		let subMaxX = maxX - sl(1, 4);
		let subMinX = minX + sl(1, 4);
		let X = [];
		let Y = [];
		for (let i = minX; i <= maxX; i += sl(1, 2))
			if (![subMaxX, subMinX].includes(i))
				X.push(i);
		Y.push(sl(1, 6).pm());
		for (let i = 1; i < X.length; i++) {
			do {
				if (i % 2)
					Y[i] = Y[i - 1] + sl(2, 10).pm();
				else
					Y[i] = 0;
			} while (Y[i].abs() > 5);
		}
		let spline = new Spline(X, Y);
		let extremum = [];

		for (let i = minX; i < maxX; i += 0.1) {
			genAssert(f(i).abs() < 8, 'Слишком большой горбик');
			if (f(i) < f(i - 0.1) && f(i) < f(i + 0.1) || (f(i) > f(i - 0.1) && f(i) > f(i + 0.1))) {
				extremum.push([i, f(i)]);
			}
			if (extremum.length > 0)
				genAssert(extremum[extremum.length - 1][1].abs().round() != 0, 'Слишком непонятный экстремум');
		}
		genAssert(extremum.length > 2, 'Экстремумов недостаточно');

		let root = [];
		let rootView = [];
		for (let i = subMinX; i <= subMaxX; i += 0.001) {
			if (f(i) * f(i - 0.001) < 0) {
				root.push(i);
				rootView.push(i.round());
				genAssert((root[root.length - 1].abs() - rootView[rootView.length - 1].abs()).abs() < 0.1);
			}
		}

		let condition = [];
		if (root.length == 1)
			condition = ['точку', rootView];
		else
			condition = [
				['сумму точек', rootView.sum()],
				['количество точек', rootView.length]
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

			ct.fillStyle = "blue";
		};
		NAtask.setTask({
			text: 'На рисунке изображен график производной функции $f(x)$, определенной на интервале $(' + minX + ';' +
				maxX + ')$. ' +
				'Найдите ' + condition[0] + ' экстремума функции $f(x)$ на отрезке $[' + subMinX +
				';' + subMaxX + ']$.',
			answers: condition[1],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
/*27502 6417 9045 9049 522116 522142 8801 8803 8805 8807 8809 8811 8813 8815 
8817 8819 8821 8823 8825 8827 8829 8831 8833 8835 8837 8839 8841 8843 8845 
8847 8849 8851 8853 8855 8857 8859 8861 8863 8865 8867 8869 8871 8873 8875 
8877 8879 8881 8883 8885 8887 8889 8891 8893 8895 8897 8899 8901 8903 8905 
8907 8909 8911 8913 8915 8917 8919 8921 8923 8925 8927 8929 8931 8933 8935 
8937 8939 8941 8943 8945 8947 8949 8951 8953 8955 8957 8959 8961 8963 8965 
8967 8969 8971 8973 8975 8977 8979 8981 8983 8985 8987 8989 8991 8993 8995 
8997 8999 9001 9003 9005 9007 9009 9011 9013 9015 9017 9019 9021 9023 9025 
9027 9029 9031 9033 9035 9037 9039 9041 9043 9047
*/
