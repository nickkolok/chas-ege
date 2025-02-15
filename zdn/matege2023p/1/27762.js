(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let angle = sl(2, 89);

		let vertices = om.latbukv.iz(6);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			let arc = Math.PI / 2.9;

			ctx.drawLine(10, 355, 390 - 8, 355);

			let ver1 = ctx.drawLineAtAngle(10, 355, -arc, 200 - 25);
			let ver2 = ctx.drawLineAtAngle(390 - 8, 355, Math.PI * 0.95 + arc, 223);

			ctx.drawLineAtAngle(ver2.x, ver2.y, Math.PI * 0.95 + arc, 141);
			let ver3 = ctx.drawLineAtAngle(ver1.x, ver1.y, -arc, 154);

			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.drawLineAtAngle(ver1.x, ver1.y, -arc + Math.PI / 2, 328);
			ctx.drawLineAtAngle(ver2.x, ver2.y, Math.PI * 0.95 + arc - Math.PI / 2, 295);

			ctx.strokeStyle = om.primaryBrandColors[1];
			ctx.arcBetweenSegments([10, 355, ver2.x, ver2.y, 390 - 8, 355, ver1.x, ver1.y], 30);

			//прямые углы
			ctx.arcBetweenSegments([10, 355, ver2.x, ver2.y, ver3.x, ver3.y], 20);
			ctx.arcBetweenSegments([390 - 8, 355, ver1.x, ver1.y, ver3.x, ver3.y], 20);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 150, 70 - 10);
			ctx.fillText(vertices[1], 10 - 5, 370 + 10);
			ctx.fillText(vertices[2], 390 - 20, 370 + 10);

			ctx.fillText(vertices[3], ver2.x + 10, ver2.y);
			ctx.fillText(vertices[4], ver1.x - 20, ver1.y);

			ctx.fillText(vertices[5], 160, 260);
		};

		NAtask.setTask({
			text: 'В треугольнике $' + vertices.slice(0, 3).shuffleJoin() + '$ угол $' + vertices[0] + '$ равен $' +
				angle + '^{\\circ}$, углы $' + [vertices[1], vertices[2]].shuffleJoin('$ и $') + '$ – острые, ' +
				'высоты $' + [[vertices[1], vertices[3]].shuffleJoin(), [vertices[2], vertices[4]].shuffleJoin()].shuffleJoin('$ и $') +
				'$ пересекаются в точке $' + vertices[5] + '$. Найдите угол $' + [vertices[3], vertices[5], vertices[4]].randomReverse().join('') +
				'$. Ответ дайте в градусах.',
			answers: 180 - angle,
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//27762 47265 47267 47269 47271 47273 47275 47277 47279 47281 47283 47285 47287 47289 47291 47293 47295 47297 47299 47301 47303 47305 47307 47309 47311 47313 47315 47317
