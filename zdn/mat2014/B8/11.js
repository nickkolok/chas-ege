(function() {
	'use strict';

	var t2 = ['центральный', 'вписанный'];
	var t3 = ['больше', 'меньше'];
	var t4 = ['вписанного', 'центрального'];
	var v1 = sl1();
	var vpis = sl(1, 89);

	let paint1 = function(ctx) {
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(200, 200, 180, 0, 2 * Math.PI);
		ctx.stroke();

		//центральный
		ctx.drawLine(200, 200, 320, 335);
		ctx.drawLine(200, 200, 80, 335);

		//вписанный
		ctx.drawLine(320, 335, 150, 25);
		ctx.drawLine(80, 335, 150, 25);
	};

	NAtask.setTask({
		text: 'Найдите ' + t2[v1] + ' угол $ABC$, если он на $' + vpis +
			'^\\circ$ ' + t3[v1] + ' ' + t4[v1] + ' угла $ADC$, опирающегося на ту же дугу. Ответ дайте в градусах.',
		answers: v1 ? vpis : vpis * 2,
	});
	NAtask.modifiers.variativeABC();
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});

})();
//Обзад 245393
//Николай Авдеев
//refactoring by SugarHedgehog
//TODO: достать как-то из оболочки буквы и прилипить на рисунок
