(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Пифагорова тройка [a, b, c]: один катет — расстояние от оси до сечения,
		// другой — половина хорды основания, гипотенуза — радиус основания
		let triple = genPifag();
		let radius = triple[2];
		let distance = triple[sl1() ? 0 : 1];
		let halfChord = (distance === triple[0]) ? triple[1] : triple[0];
		let chord = 2 * halfChord;
		let generator = sl(3, 18);
		let square = chord * generator;

		NAtask.setTask({
			text:
				'Радиус основания цилиндра равен $' + radius + '$, а его образующая равна $' + generator + '$. ' +
				'Сечение, параллельное оси цилиндра, удалено от неё на расстояние, равное $' + distance + '$. ' +
				'Найдите площадь этого сечения.',
			analys:
				'Сечение цилиндра плоскостью, параллельной оси, — прямоугольник, ' +
				'стороны которого равны образующей $' + generator + '$ и хорде основания. ' +
				'Расстояние от оси до хорды равно $' + distance + '$, ' +
				'поэтому половина хорды равна $\\sqrt{' + radius + '^2-' + distance + '^2}=' + halfChord + '$, ' +
				'а вся хорда равна $' + chord + '$. ' +
				'Площадь сечения равна $' + chord + '\\cdot' + generator + '=' + square + '$.',
			answers: square,
			authors: ['chas-ege-selena'],
		});

		// --- Чертёж: цилиндр с сечением, параллельным оси ---
		let N = 48; // число точек на окружность основания
		let flatten = 0.35; // сплюснутость эллипса основания
		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 1,
			rotationX: Math.acos(-flatten),
			rotationY: 0,
			rotationZ: 0,
		};

		let pts3D = [];
		for (let z of [generator, 0])
			for (let i = 0; i < N; i++) {
				let t = 2 * Math.PI * i / N;
				pts3D.push({
					x: radius * Math.cos(t),
					y: radius * Math.sin(t),
					z: z,
				});
			}

		let iSil = pts3D.length; // силуэтные образующие
		pts3D.push(
			{ x: -radius, y: 0, z: 0 },
			{ x: -radius, y: 0, z: generator },
			{ x: radius, y: 0, z: generator },
			{ x: radius, y: 0, z: 0 }
		);
		let iAxis = pts3D.length; // ось цилиндра
		pts3D.push(
			{ x: 0, y: 0, z: 0 },
			{ x: 0, y: 0, z: generator }
		);
		let iDist = pts3D.length; // расстояние от оси до плоскости сечения
		pts3D.push(
			{ x: 0, y: 0, z: generator / 2 },
			{ x: 0, y: distance, z: generator / 2 }
		);
		let iSec = pts3D.length; // вершины сечения
		pts3D.push(
			{ x: -halfChord, y: distance, z: 0 },
			{ x: halfChord, y: distance, z: 0 },
			{ x: halfChord, y: distance, z: generator },
			{ x: -halfChord, y: distance, z: generator }
		);

		let pts = autoScale(pts3D, camera);

		let paint = function (ctx) {
			ctx.translate(200, 200);
			ctx.scale(1, -1);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors[0];

			let polyline = function (from, to, close) {
				ctx.beginPath();
				ctx.moveTo(pts[from].x, pts[from].y);
				for (let i = from + 1; i <= to; i++)
					ctx.lineTo(pts[i].x, pts[i].y);
				if (close)
					ctx.closePath();
				ctx.stroke();
			};
			let segment = function (a, b) {
				ctx.drawLine(pts[a].x, pts[a].y, pts[b].x, pts[b].y);
			};

			// сечение — заштрихованный прямоугольник
			ctx.drawSection([iSec, iSec + 1, iSec + 2, iSec + 3].map((i) => [pts[i].x, pts[i].y]), om.transparentBrandColors[0]);

			// верхнее основание целиком и ближняя (видимая) половина нижнего
			polyline(0, N - 1, true);
			polyline(N, N + N / 2, false);
			// дальняя половина нижнего основания, ось и расстояние до сечения — пунктиром
			ctx.setLineDash([5, 2]);
			polyline(N + N / 2, 2 * N - 1, false);
			segment(iAxis, iAxis + 1);
			segment(iDist, iDist + 1);
			ctx.setLineDash([]);

			// силуэтные образующие и контур сечения
			segment(iSil, iSil + 1);
			segment(iSil + 2, iSil + 3);
			segment(iSec, iSec + 1);
			segment(iSec + 1, iSec + 2);
			segment(iSec + 2, iSec + 3);
			segment(iSec + 3, iSec);
		};

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint,
		});
	}, 100);
})();
//https://mathb-ege.sdamgia.ru/problem?id=509781
//chas-ege-selena
