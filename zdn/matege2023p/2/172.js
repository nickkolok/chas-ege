(function() {
	lx['образующая'].ie = 'образующая';
	lx['образующая'].re = 'образующей';
	lx['образующая'].ve = 'образующую';
	lx['образующая'].im = 'образующие';
	lx['образующая'].rod = 1;
	lx['образующая'].odu = 0;

	lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
	lx_declareClarifiedPhrase('радиус', 'основания');
	lx_declareClarifiedPhrase('площадь', 'основания');
	lx_declareClarifiedPhrase('длина', 'окружности основания');
	retryWhileError(function() {
		let measurements = [
			[
				[{
					name: 'радиус основания',
					power: 1,
				}, {
					name: 'длина окружности основания',
					power: 1,
				}, ].iz(), {
					name: 'объём',
					power: 2,
				}, {
					name: 'высоты',
					wordToClarify: true,
				},
			],
			[
				[{
					name: 'радиус основания',
					power: 1,
				}, {
					name: 'длина окружности основания',
					power: 1,
				}, ].iz(), {
					name: 'площадь основания',
					power: 2,
				}
			],
			[
				[{
					name: 'площади оснований',
					wordToClarify: true,
				}, {
					name: 'радиусы оснований',
					wordToClarify: true,
				}].iz(), [{
					name: 'высота',
					power: 1,
				}, {
					name: 'образующая',
					power: 1,
				}, ].iz(), {
					name: 'объём',
					power: 1,
				}
			]
			[
				[{
					name: 'радиус основания',
					power: 1,
				}, {
					name: 'длина окружности основания',
					power: 1,
				}, {
					name: 'площадь основания',
					power: 2
				}, ].iz(), {
					name: 'площадь боковой поверхности',
					power: 1,
				}, {
					name: 'образующие',
					wordToClarify: true,
				}
			],
			[
				[{
					name: 'радиусы оснований',
					wordToClarify: true,
				}, {
					name: 'длины окружностей основания',
					wordToClarify: true,
				}, {
					name: 'площади оснований',
					wordToClarify: true,
				}, ].iz(), {
					name: 'площадь боковой поверхности',
					power: 1,
				}, {
					name: 'образующая',
					power: 1,
				}
			]
		].iz();

		let copy = measurements.map((num) => num);
		let paint1 = function(ctx) {
			ctx.translate(-50, 40);
			ctx.strokeStyle = "#809DF2";
			ctx.lineWidth = 2;
			//конус побольше
			//образующие
			ctx.drawLine(60, 200, 150, 10);
			ctx.drawLine(240, 200, 150, 10);
			//эллипс
			ctx.ellipse(150, 200, 20, 90, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(150, 200, 20, 90, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();

			ctx.strokeStyle = ["#D777F2", "#F2A2D6"].iz();
			for (let i = 0; i < copy.length; i++) {
				//радиус
				if (copy[i].name.ie == 'радиус основания')
					ctx.drawLine(150, 200, 240, 200);
				//высота
				if (copy[i].name.ie == 'высота')
					ctx.drawLine(150, 200, 150, 10);
			}

			//конус поменьше	
			ctx.strokeStyle = "#809DF2";
			ctx.setLineDash([0, 0]);
			ctx.translate(200, 0);
			//образующие
			ctx.drawLine(60, 200, 150, 50);
			ctx.drawLine(240, 200, 150, 50);
			//эллипс
			ctx.ellipse(150, 200, 10, 90, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(150, 200, 10, 90, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();

			ctx.strokeStyle = ["#D777F2", "#F2A2D6"].iz();
			for (let i = 0; i < copy.length; i++) {
				//радиус
				if (copy[i].name.ie == 'радиус основания')
					ctx.drawLine(150, 200, 240, 200);
				//высота
				if (copy[i].name.ie == 'высота')
					ctx.drawLine(150, 200, 150, 50);
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
			authors: ['Суматохина Александра'],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 10000);
})();
//172
