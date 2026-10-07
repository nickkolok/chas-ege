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

		// Используем класс Cylinder для хранения параметров
		let cylinder = new Cylinder({ radius: radius, height: generator });

		NAtask.setTask({
			text:
				'Радиус основания цилиндра равен $' + cylinder.radius + '$, а его образующая равна $' + cylinder.height + '$. ' +
				'Сечение, параллельное оси цилиндра, удалено от неё на расстояние, равное $' + distance + '$. ' +
				'Найдите площадь этого сечения.',
			analys:
				'Сечение цилиндра плоскостью, параллельной оси, — прямоугольник, ' +
				'стороны которого равны образующей $' + cylinder.height + '$ и хорде основания. ' +
				'Расстояние от оси до хорды равно $' + distance + '$, ' +
				'поэтому половина хорды равна $\\sqrt{' + cylinder.radius + '^2-' + distance + '^2}=' + halfChord + '$, ' +
				'а вся хорда равна $' + chord + '$. ' +
				'Площадь сечения равна $' + chord + '\\cdot' + cylinder.height + '=' + square + '$.',
			answers: square,
			authors: ['chas-ege-selena'],
		});

		// --- Чертёж: цилиндр с сечением, параллельным оси ---
		// Класс Cylinder не предоставляет метод verticesOfFigure, поэтому строим точки вручную
		let N = 48; // число точек на окружность основания
		let flatten = 0.35; // сплюснутость эллипса основания (отношение малой оси к большой)
		
		// Параметры камеры: смотрим немного сверху под углом
		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 1,
			rotationX: Math.PI / 2 - Math.acos(flatten), // угол наклона сверху
			rotationY: 0,
			rotationZ: 0,
		};

		let pts3D = [];
		
		// Генерируем точки оснований: сначала нижнее (z=0), потом верхнее (z=height)
		// Точки идут против часовой стрелки, если смотреть сверху
		for (let z of [0, cylinder.height]) {
			for (let i = 0; i < N; i++) {
				let t = 2 * Math.PI * i / N;
				pts3D.push({
					x: cylinder.radius * Math.cos(t),
					y: cylinder.radius * Math.sin(t),
					z: z,
				});
			}
		}

		let iSil = pts3D.length; // индексы силуэтных образующих (крайние слева и справа)
		pts3D.push(
			{ x: -cylinder.radius, y: 0, z: 0 },
			{ x: -cylinder.radius, y: 0, z: cylinder.height },
			{ x: cylinder.radius, y: 0, z: cylinder.height },
			{ x: cylinder.radius, y: 0, z: 0 }
		);
		
		let iAxis = pts3D.length; // ось цилиндра
		pts3D.push(
			{ x: 0, y: 0, z: 0 },
			{ x: 0, y: 0, z: cylinder.height }
		);
		
		let iDist = pts3D.length; // расстояние от оси до плоскости сечения
		pts3D.push(
			{ x: 0, y: 0, z: cylinder.height / 2 },
			{ x: 0, y: distance, z: cylinder.height / 2 }
		);
		
		let iSec = pts3D.length; // вершины сечения (прямоугольник)
		pts3D.push(
			{ x: -halfChord, y: distance, z: 0 },
			{ x: halfChord, y: distance, z: 0 },
			{ x: halfChord, y: distance, z: cylinder.height },
			{ x: -halfChord, y: distance, z: cylinder.height }
		);

		let pts = autoScale(pts3D, camera);

		let paint = function (ctx) {
			ctx.translate(200, 200);
			ctx.scale(1, -1); // инвертируем Y для правильной ориентации
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

			// Сечение — заштрихованный прямоугольник
			ctx.drawSection([iSec, iSec + 1, iSec + 2, iSec + 3].map((i) => [pts[i].x, pts[i].y]), om.transparentBrandColors[0]);

			// Верхнее основание (z=height) рисуем целиком — оно полностью видимо
			polyline(N, 2 * N - 1, true);
			
			// Нижнее основание (z=0): ближняя половина сплошная, дальняя пунктиром
			// При camera.rotationX > 0 видимая часть — это точки с y > 0 (первая половина)
			polyline(0, N / 2 - 1, false); // ближняя половина (видимая)
			
			// Дальняя половина нижнего основания, ось и расстояние до сечения — пунктиром
			ctx.setLineDash([5, 2]);
			polyline(N / 2, N - 1, false); // дальняя половина (невидимая)
			segment(iAxis, iAxis + 1);
			segment(iDist, iDist + 1);
			ctx.setLineDash([]);

			// Силуэтные образующие (крайние слева и справа)
			segment(iSil, iSil + 1);     // левая образующая
			segment(iSil + 2, iSil + 3); // правая образующая
			
			// Контур сечения
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
