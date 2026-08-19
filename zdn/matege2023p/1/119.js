(function() {
	'use strict';

	let angle = sl(2, 189);

	let vertices = om.latbukv.iz(5);

	let subangle1 = [vertices[4], vertices[0], vertices[3]];
	let subangle2 = [
		[vertices[1], vertices[2]],
		[vertices[0], vertices[3]]
	].iz();
	subangle2.splice(1, 0, vertices[4]);

	if (sl1())
		subangle1 = subangle1.permuteCyclic(2);

	let paint1 = function(ctx) {
		ctx.lineWidth = 2;
		
		ctx.strokeStyle = om.secondaryBrandColors.iz();
		ctx.drawArc(200, 200, 180, 0, 2 * Math.PI);

		let deltaX = (angle > 90 ? 70 : 140);
		let deltaY = (angle > 90 ? 165 : 111);

		//центральный
		ctx.strokeStyle = om.primaryBrandColors.iz();
		
		ctx.drawLine(200 - deltaX, 200 - deltaY, 200 + deltaX, 200 + deltaY);
		ctx.drawLine(200 - deltaX, 200 + deltaY, 200 + deltaX, 200 - deltaY);

		ctx.drawLine(200 - deltaX, 200 - deltaY, 200 - deltaX, 200 + deltaY);
		
		ctx.drawFilledCircle(200, 200, 3);

		ctx.font = "23px liberation_sans";
		ctx.fillText(vertices[0], 200 - deltaX - 10, 200 - deltaY - 15);
		ctx.fillText(vertices[1], 200 + deltaX + 10, 200 + deltaY + 25);

		ctx.fillText(vertices[2], 200 + deltaX, 200 - deltaY - 15);
		ctx.fillText(vertices[3], 200 - deltaX - 10, 200 + deltaY + 25);

		ctx.fillText(vertices[4], 200 - 7, 200 - 25);

	};

	NAtask.setTask({
		text: 'Отрезки $' + [vertices.slice(0, 2).shuffleJoin(),vertices.slice(2, 4).shuffleJoin()].shuffleJoin('$ и $') + '$ – диаметры окружности с центром $' + vertices[4] +
			'$. Угол $' + subangle2.randomReverse().join('') + '$ равен $' + angle + '^\\circ$. Найдите вписанный угол $' + subangle1.randomReverse().join('') +
			'$. Ответ дайте в градусах.',
		answers: (180 - angle) / 2,
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});

})();
//119 121
