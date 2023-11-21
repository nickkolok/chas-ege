(function() {
	retryWhileError(function() {

		let v = sl(1, 400);

		let paint1 = function(ctx) {
			ctx.translate(0, 480);
			ctx.scale(10, 10);
			ctx.font = "3px liberation_sans";

			ctx.lineWidth = 2 / 15;


			ctx.drawRightPyramid3({
				edge: 25,
				angle: Math.PI / 8,
				height: -25,
				scale: 10,
			}, [0], [1, 0.7]);
			ctx.translate(0, -48);
			ctx.drawSection([
				[16, 3],
				[24, 31],
				[12, 31]
			]);
		};

		NAtask.setTask({
			text: ' Объём треугольной пирамиды равен $' + v + '$. ' +
				'Через вершину пирамиды и среднюю линию её основания проведена плоскость (см. рисунок). ' +
				'Найдите объём отсечённой треугольной пирамиды.',
			answers: v / 4,
			author: ['Суматохина Александра'],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//27115 75065 75109 75113 514460 75067 75069 75071 75073 75075 75077 75079 75081 75083 75085 75087 75089 75091 75093 75095 75097 75099 75101 75103 75105 75107 75111
