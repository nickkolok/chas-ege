(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 0);
	let side = 'M';
	let lowSide = 'AD';
	let middle = ['AB', 'CD', 'BC', 'AD'].iz();
	let answer = sluchch(5, 69);
	let S = 4 * answer;
	if (middle == 'BC' || middle == 'AD') {
		S = 2 * answer;
		if (middle == 'AD')
			lowSide = 'BC';
	}
	let paint1 = function(ctx) {
		ctx.lineWidth = 2;
		ctx.drawLine(100, 80, 350, 80);
		ctx.drawLine(10, 320, 270, 320);
		ctx.drawLine(100, 80, 10, 320);
		ctx.drawLine(270, 320, 350, 80);

		ctx.drawLine(10, 320, 310, 200);

		ctx.lineWidth = 1;
		ctx.drawLine(300 + 15, 150, 320 + 10, 160);
		ctx.drawLine(270 + 15, 250, 290 + 10, 260);

	};

	NAtask.setTask({
		text: 'Площадь параллелограмма $ABCD$ равна ' + S + '. Точка $' + side + '$ – середина стороны $' + middle +
			'$. Найдите площадь треугольника $' + lowSide + side + '$.',
		answers: answer,
	});
	NAtask.modifiers.variativeABC(); //расставляем случайные буквы
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
})();
//Обр.задания 319157
//Антипова Татьяна
