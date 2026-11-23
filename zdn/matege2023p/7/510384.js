(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	retryWhileError(function() {
		const slope = sl(0.5, 2, 0.5).pm();
		const intercept = sl(-2, 2);
		const touchX = slKrome(0, -2, 2);
		const tangent = x => slope * x + intercept;
		const touchY = tangent(touchX);
		const curvature = sl(0.1, 0.3, 0.1).pm();
		const func = x => tangent(x) + curvature * (x - touchX).sqr();
		const points = [touchX - 2, touchX + 2].map(x => [x, tangent(x)]);
		genAssert(points.every(point => Math.abs(point[1]) <= 7), 'Точки касательной вне сетки');
		genAssert(Math.abs(touchY) > 0.5, 'Точка касания слишком близка к оси абсцисс');
		const letter = slLetter(['x', 'y']);
		const bounds = {minX: -10, maxX: 10, minY: -9, maxY: 9};
		const width = 500, height = 400, scale = 20;
		const paintGraph = paintSpline({func, ...bounds, width, height, scale, definedOnInterval: false});
		NAtask.setTask({
			text: 'На рисунке изображены график функции $y=f(x)$ и касательная к нему в точке с абсциссой $' +
				letter + '$. Найдите значение производной функции $f(x)$ в точке $' + letter + '$.',
			answers: slope,
			analys: 'Значение производной в точке касания равно угловому коэффициенту касательной $y=' +
				(slope.ts() + 'x' + ('+' + intercept.ts()).esli(intercept)).plusminus() + '$.',
		});
		NAtask.modifiers.addCanvasIllustration({
			width, height,
			paint: function(ctx) {
				paintGraph(ctx);
				ctx.save();
				ctx.scale(scale, -scale);
				ctx.lineWidth = 0.1;
				graph9AdrawFunction(ctx, tangent, {...bounds, step: 0.01});
				ctx.fillStyle = 'green';
				graph9AmarkCircles(ctx, points, 2, 0.15);
				ctx.strokeStyle = 'green';
				ctx.setLineDash([0.5, 0.2]);
				ctx.drawLine(touchX, touchY, touchX, 0);
				ctx.restore();
				ctx.font = '15px liberation_sans';
				ctx.fillText(letter, scale * touchX + 10, touchY > 0 ? 16 : -10);
			},
		});
	}, 1000);
})();
//SugarHedgehog
// 27506 510384 510403 9051 9627 505145 505166 517153 520489 
// 520509 549322 630091 9057 9059 9065 9067 9069 9071 9073 9077 
// 9081 9085 9089 9097 9109 9113 9115 9121 9123 9129 9133 9141 
// 9143 9145 9149 9161 9163 9167 9169 9171 9183 9193 9195 9199 
// 9205 9211 9215 9217 9219 9225 9237 9241 9249 9257 9261 9273 
// 9275 9283 9285 9289 9293 9295 9297 9303 9305 9307 9315 9321 
// 9325 9329 9331 9335 9337 9343 9345 9353 9355 9357 9361 9375 
// 9381 9383 9391 9393 9409 9413 9417 9425 9429 9431 9435 9445 
// 9447 9453 9455 9463 9467 9469 9473 9479 9483 9487 9489 9491 
// 9497 9501 9505 9519 9527 9533 9537 9549 9553 9565 9569 9573 
// 9585 9591 9595 9597 9607 9609 9611 9613 9615 9617 9619 9621 
// 9623 9625 9631 9635

