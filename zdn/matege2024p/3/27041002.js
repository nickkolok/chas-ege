(function() {
	lx_declareClarifiedPhrase('площадь', 'полной поверхности');
	lx_declareClarifiedPhrase('площадь', 'основания');
	lx_declareClarifiedPhrase('диаметр', 'основания');
	lx_declareClarifiedPhrase('диагональ', 'одной из боковых сторон');
	lx_declareClarifiedPhrase('диагональ', 'основания');
	lx_declareClarifiedPhrase('радиус', 'основания');
	lx_declareClarifiedPhrase('сторона', 'основания');
	lx_declareClarifiedPhrase('площадь', ' боковой поверхности');

	lx['радиус основания'] = {
		ve: 'радиус основания',
		rod: 0,
	};

	lx['площадь боковой поверхности'] = {
		ve: 'площадь боковой поверхности',
		rod: 1,
	};

	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);
			let radius = sl(2, 10);
			let height = sl(2, 10);
			let edge = 2 * radius;
			let rand = 0; //sl1();

			let nameCylinder = [ //rand==0
				['радиус основания', radius.pow(2), '', ''],
				['объём', (radius.pow(2) * height).pow(2), ', делённый на $\\pi$', '\\pi'],
				['высота', height.pow(2), '', ''],
			];

			//nameCylinder = nameCylinder.iz(2 - rand);

			let nameParal = [
				[
					['площадь полной поверхности', (2 * (2 * edge * height + edge.pow(2))).pow(2), '', ''],
					['объём', (edge.pow(2) * height).pow(2), '', ''],
					['диагональ', 2 * edge.pow(2) + height.pow(2), '', ''],
					['диагональ одной из боковых сторон', edge.pow(2) + height.pow(2), '', ''],
				][1],
			];

			//nameParal = nameParal.iz(3 - nameCylinder.length);

			let question = [nameCylinder[0][0].toZagl() + ' которого равен $' + nameCylinder[0][1].texsqrt(1) +
					nameCylinder[0][3] +'$. ' + nameParal[0][0].toZagl() + ' параллелепипеда равен $' + nameParal[0][1].texsqrt(1) +
					nameParal[0][3] +'$.' + ' Найдите ' + sklonlxkand(nameCylinder[2][0]).ve + ' цилиндра' + nameCylinder[2][2] +
						'.', nameCylinder[2][1]
					];


					let paint1 = function(ct) {
						ct.scale = (60, 60);
						ct.strokeStyle = ["#D777F2", "#F2A2D6"].iz();
						radius = 140;
						height = 200;
						ct.translate(200, 200);

						ct.lineWidth = 2;
						//цилиндр
						ct.beginPath();
						ct.ellipse(0, -height / 2, radius - 5, 40 - 2, 0, 0, 2 * Math.PI);
						ct.stroke();

						ct.beginPath();
						ct.setLineDash([4, 5]);
						ct.ellipse(0, height / 2, radius - 6, 40 - 4, 0, 0, 2 * Math.PI);
						ct.stroke();


						ct.drawLine(-radius + 5, height / 2, -radius + 5, -height / 2);
						ct.setLineDash([0, 0]);
						ct.drawLine(radius - 5, height / 2, radius - 5, -height / 2);

						ct.translate(-102, -140);
						//паралелепипед
						ct.drawParallelepiped({
							width: radius * 2,
							height: height,
							depth: radius + 15,
							angle: Math.PI / 1.5,
							strokeStyle: "#809DF2",
						}, [0, 3, 4], false, [4, 5]);
					};
					NAtask.setTask({
						text: 'Прямоугольный параллелепипед описан около цилиндра. ' + question[0],
						answers: question[1].sqrt(),
					});
					NAtask.modifiers.multiplyAnswerBySqrt(3);
					NAtask.modifiers.addCanvasIllustration({
						width: 400,
						height: 400,
						paint: paint1,
					});
				},
				1000);

	})();
//27041 4861 71921 71927 4863 4865 4867 4869 27177 71889 71891 71893 71895 71897 71899 71901 71903 71905 71907 71909 71911 71913 71915 71917 71919 71923 71925
