(function() {
	lx['образующая'] = {
		ie: 'образующая',
		re: 'образующей',
		de: 'образующей',
		ve: 'образующую',
		te: 'образующей',
		pe: 'образующей',
		im: 'образующие',
		rm: 'образующих',
		dm: 'образующим',
		vm: 'образующие',
		tm: 'образующими',
		pm: 'образующих',
		rod: 1,
		odu: 0,
	};
	lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
	lx_declareClarifiedPhrase('радиус', 'основания');
	lx_declareClarifiedPhrase('площадь', 'основания');
	lx_declareClarifiedPhrase('длина', 'окружности основания');
	retryWhileError(function() {
				const measurement0 = {name: 'радиус основания', power: 1};
		const measurement1 = {name: 'длина окружности основания', power: 1};
		const measurement2 = {name: 'объём', power: 2};
		const measurement3 = {name: 'высоты', wordToClarify: true};
		const measurement4 = {name: 'площадь основания', power: 2};
		const measurement5 = {name: 'площади оснований', wordToClarify: true};
		const measurement6 = {name: 'радиусы оснований', wordToClarify: true};
		const measurement7 = {name: 'высота', power: 1};
		const measurement8 = {name: 'образующая', power: 1};
		const measurement9 = {name: 'объём', power: 1};
		const measurement10 = {name: 'площадь боковой поверхности', power: 1};
		const measurement11 = {name: 'образующие', wordToClarify: true};
		const measurement12 = {name: 'длины окружностей основания', wordToClarify: true};
		let measurements = [
			[
				[measurement0, measurement1, ].iz(), measurement2, measurement3,
			],
			[
				[measurement0, measurement1, ].iz(), measurement4
			],
			[
				[measurement5, measurement6].iz(), [measurement7, measurement8, ].iz(), measurement9
			],
			[
				[measurement0, measurement1, measurement4, ].iz(), measurement10, measurement11
			],
			[
				[measurement6, measurement12, measurement5, ].iz(), measurement10, measurement8
			]
		].iz();

		let copy = measurements.slice();

		let paint1 = function(ctx) {
			ctx.translate(-50, 0);
			ctx.lineWidth = 2;
			//конус побольше
			//образующие
			ctx.drawLine(60, 180, 150, 10);
			ctx.drawLine(240, 180, 150, 10);
			//эллипс
			ctx.drawEllipse(150, 180, 20, 90, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);

			ctx.setLineDash([5, 5]);
			ctx.drawEllipse(150, 180, 20, 90, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);

			ctx.setLineDash([]);
			for (let i = 0; i < copy.length; i++) {
				//радиус
				if (copy[i] === measurement0)
					ctx.drawLine(150, 180, 240, 180);
				//высота
				if (copy[i] === measurement7)
					ctx.drawLine(150, 180, 150, 10);
			}

			//конус поменьше
			ctx.setLineDash([]);
			ctx.translate(200, 0);
			//образующие
			ctx.drawLine(60, 180, 150, 50);
			ctx.drawLine(240, 180, 150, 50);
			//эллипс
			ctx.drawEllipse(150, 180, 10, 90, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);

			ctx.setLineDash([5, 5]);
			ctx.drawEllipse(150, 180, 10, 90, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);

			ctx.setLineDash([]);
			for (let i = 0; i < copy.length; i++) {
				//радиус
				if (copy[i] === measurement0)
					ctx.drawLine(150, 180, 240, 180);
				//высота
				if (copy[i] === measurement7)
					ctx.drawLine(150, 180, 150, 50);
			}
		};

		NAtask.setDilationTask({
			measurements: measurements,
			choosePhrase: 1,
			figureName: 'конус',
			dilationCoefficient: sl(2, 10),
			PS: {
				proposal: [
					[' При этом у обоих конусов '],
					['.']
				],
				verb: 'равны',
			},
			authors: ['Суматохина Ася'],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 400,
			height: 300,
			paint: paint1,
		});
	}, 10000);
})();
//172

