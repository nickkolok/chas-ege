(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let ratio = sl(2, 27);

		let name = ['ребро', 'высота', ['площадь боковой поверхности', 'площадь грани',
			'полная площадь поверхности'].iz(), 'объём'];
		let name1=name.iz(2);
		let nameView = sklonlxkand(name1);
		let number = [
			[0,            ratio, ratio.pow(2), ratio.pow(3)],
			[ratio,        0, ratio.pow(2), ratio.pow(3)],
			[ratio.sqrt(), ratio.sqrt(), 0, 0.0001],
			[Math.cbrt(ratio), 0.0001, 0.0001, 0.0001, 0]
		];
		let answ = number[name.indexOf(name1[0])][name.indexOf(name1[1])];

		genAssert((answ * 100).isZ() && answ, 'плохой ответ');

		let paint1 = function(ct) {
			ct.translate(10, 20);
			ct.scale(10, -10);
			ct.lineWidth = 2 / 15;
			let edgeOfBase = 10;
			ct.rightPyramid3({
				edge: 17,
				angle: Math.PI / 8,
				height: 11,
			}, [1], [0.5, 0.2], name.includes('высота'), name.includes('апофема'));
		};
		NAtask.setTask({
			text: 'Во сколько раз увеличится ' + nameView[1].ie + ' правильного тетраэдра, ' +
				'если его ' + nameView[0].ve.replace('сторона','сторону').replace('основанию','основания') + ' увеличится в ' + chislitlx(ratio, 'раз') + '?',

			answers: answ,
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 240,
			height: 240,
			paint: paint1,
		});
	}, 10000);

})();
