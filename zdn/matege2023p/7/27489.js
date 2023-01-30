(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}
		NAinfo.requireApiVersion(0, 2);
		let maxX = sl(0, 10);
		let minX = maxX - sl(8, 10);
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
				extremum.push([i, f(i)]);
			}
			if (extremum.length >= 2)
				genAssert((extremum[extremum.length - 2][1] - extremum[extremum.length - 1][1]).abs() > 1,
					'Горбики слишком близко');
		}
		genAssert((extremum[extremum.length - 1][1] - f(maxX)).abs() > 2, 'Слишком близко к правому концу');
		genAssert((extremum[0][1] - f(minX)).abs() > 2, 'Слишком близко к левому концу');
		genAssert(extremum.length > 2, 'Максимумов недостаточно');
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
				[X[0], X[X.length - 1]],
				[Y[0], Y[Y.length - 1]]
			].T(), 2, 0.2);
			ct.fillStyle = "white";
			graph9AmarkCircles(ct, [
				[X[0], X[X.length - 1]],
				[Y[0], Y[Y.length - 1]]
			].T(), 2, 0.1);
		};
		NAtask.setTask({
			text: 'На рисунке изображен график функции $y = f(x)$, определенной на интервале $(' + minX + '; ' + maxX +
				')$. ' +
				'Найдите количество точек, ' +
				'в которых касательная к графику функции параллельна прямой $y=' + sl(0, 20, 0.1).ts(1) +
				'$ или совпадает с ней.',
			answers: extremum.length,
			analys: 'Точек экстремума: ' + extremum.length,
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
//27489 510938 6401 6421 7321 7325 509436 510918 560131 560650 560724 560773 
//7088 7093 7095 7097 7099 7101 7103 7105 7107 7109 7111 7113 7115 7117 7119 
//7121 7123 7125 7127 7129 7131 7133 7135 7137 7139 7141 7143 7145 7147 7149 
//7151 7153 7155 7157 7159 7161 7163 7165 7167 7169 7171 7173 7175 7177 7179 
//7181 7183 7185 7187 7189 7191 7193 7195 7197 7199 7201 7203 7205 7207 7209 
//7211 7213 7215 7217 7219 7221 7223 7225 7227 7229 7231 7233 7235 7237 7239 
//7241 7243 7245 7247 7249 7251 7253 7255 7257 7259 7261 7263 7265 7267 7269 
//7271 7273 7275 7277 7279 7281 7283 7285 7287 7289 7291 7293 7295 7297 7299 
//7301 7303 7305 7307 7309 7311 7313 7315 7317 7319 7323
