(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '506476';
		let preference = ['grani', 'rebra', 'vershiny'];
		let rand = getSelectedPreferenceFromList(key, preference);
		
		let shapes = [
			{ name: 'деревянного кубика', pos: 'его', F: 6, V: 8, E: 12, n: 4, angleOffset: Math.PI / 4 },
			{ name: 'деревянной правильной треугольной призмы', pos: 'её', F: 5, V: 6, E: 9, n: 3, angleOffset: 0 },
			{ name: 'деревянной правильной четырёхугольной призмы', pos: 'её', F: 6, V: 8, E: 12, n: 4, angleOffset: Math.PI / 4 },
			{ name: 'деревянной правильной пятиугольной призмы', pos: 'её', F: 7, V: 10, E: 15, n: 5, angleOffset: 0 },
			{ name: 'деревянной правильной шестиугольной призмы', pos: 'её', F: 8, V: 12, E: 18, n: 6, angleOffset: 0 },
		];
		
		let shape = shapes.iz();
		
		let answers = [
			shape.F + shape.V,
			shape.E + 3 * shape.V,
			3 * shape.V
		];
		
		let questionText = ['граней', 'рёбер', 'вершин'][rand];
		
		let paint1 = function (ct) {
			ct.translate(200, 260);
			ct.scale(1.5, 1.5);
			ct.lineWidth = 2 / 1.5;
			ct.strokeStyle = om.secondaryBrandColors.iz();
			
			let R = 40;
			let H = 60;
			
			let alpha = Math.PI / 6;
			let cosA = Math.cos(alpha);
			let sinA = Math.sin(alpha);
			
			let points2D = [];
			for(let i=0; i<shape.n; i++) {
				let ang = 2 * Math.PI * i / shape.n + shape.angleOffset;
				let x = R * Math.cos(ang);
				let z = R * Math.sin(ang);
				points2D.push({ x: x + z * cosA, y: - z * sinA });
				points2D.push({ x: x + z * cosA, y: -H - z * sinA });
			}
			
			let faceVisible = [];
			for(let i=0; i<shape.n; i++) {
				let midAng = 2 * Math.PI * (i + 0.5) / shape.n + shape.angleOffset;
				let dot = Math.cos(midAng) * 1 + Math.sin(midAng) * 0.5;
				faceVisible.push(dot > 0);
			}
			
			let drawEdge = function(p1, p2, visible) {
				if (!visible) {
					ct.setLineDash([5, 5]);
				} else {
					ct.setLineDash([]);
				}
				ct.beginPath();
				ct.moveTo(points2D[p1].x, points2D[p1].y);
				ct.lineTo(points2D[p2].x, points2D[p2].y);
				ct.stroke();
			};
			
			for(let i=0; i<shape.n; i++) {
				let next = (i + 1) % shape.n;
				drawEdge(i * 2, next * 2, faceVisible[i]);
				drawEdge(i * 2 + 1, next * 2 + 1, true);
				let leftFace = faceVisible[(i - 1 + shape.n) % shape.n];
				let rightFace = faceVisible[i];
				drawEdge(i * 2, i * 2 + 1, leftFace || rightFace);
			}
			ct.setLineDash([]);
		};

		NAtask.setTask({
			text: 'От ' + shape.name + ' отпилили все ' + shape.pos + ' вершины (см. рис.). Сколько ' + questionText + ' у получившегося многогранника (невидимые рёбра на рисунке не изображены)?',
			answers: answers[rand],
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506476
