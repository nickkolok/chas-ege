(function() {
	'use strict';

	let angle = sl(2, 189);

	let vertices = [];
	do {
		let a = slLetter(vertices).toUpperCase();
		if (!vertices.includes(a))
			vertices.push(a);
	}
	while (vertices.length < 5);

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
		ctx.strokeStyle = "#809DF2";
		ctx.beginPath();
		ctx.arc(200, 200, 180, 0, 2 * Math.PI);
		ctx.stroke();

		let deltaX = (angle > 90 ? 70 : 140);
		let deltaY = (angle > 90 ? 165 : 111);

		//центральный
		ctx.strokeStyle = ["#D777F2","#F2A2D6"].iz();
		ctx.drawFilledCircle(200, 200, 3);
		ctx.drawLine(200 - deltaX, 200 - deltaY, 200 + deltaX, 200 + deltaY);
		ctx.drawLine(200 - deltaX, 200 + deltaY, 200 + deltaX, 200 - deltaY);

		ctx.drawLine(200 - deltaX, 200 - deltaY, 200 - deltaX, 200 + deltaY);

		ctx.font = "23px liberation_sans";
		ctx.fillText(vertices[0], 200 - deltaX - 10, 200 - deltaY - 15);
		ctx.fillText(vertices[1], 200 + deltaX + 10, 200 + deltaY + 25);

		ctx.fillText(vertices[2], 200 + deltaX, 200 - deltaY - 15);
		ctx.fillText(vertices[3], 200 - deltaX - 10, 200 + deltaY + 25);

		ctx.fillText(vertices[4], 200 - 7, 200 - 25);

	};

	NAtask.setTask({
		text: 'Отрезки $' + vertices.slice(0, 2).shuffle().join('') + '$ и $' + vertices.slice(2, 4).shuffle()
			.join('') + '$ – диаметры окружности с центром $' + vertices[4] +
			'$. Угол $' + subangle2.join('') + '$ равен $' + angle + '^\\circ$. Найдите вписанный угол $' + subangle1.join('') +
			'$. ' +
			'Ответ дайте в градусах.',
		answers: (180 - angle) / 2,
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});

})();
//119 121
