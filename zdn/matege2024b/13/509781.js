(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Пифагорова тройка: один катет — расстояние от оси до сечения,
		// другой — половина хорды основания, гипотенуза — радиус основания.
		// Перебираем все тройки (не только примитивные) с гипотенузой до 30:
		// у ФИПИ (1DD343, 3BC472, 67A05C) радиусы от 5 до 29, в том числе
		// тройка 20, 21, 29, которой нет в om.pifagtr.
		let triples = [];
		for (let x = 1; x < 30; x++) {
			for (let y = 1; y < 30; y++) {
				let z = Math.sqrt(x * x + y * y);
				if (z <= 30 && z.isAlmostInteger()) {
					triples.push([x, y, Math.round(z)]);
				}
			}
		}
		// В тройке [x, y, z] x — расстояние до оси, y — половина хорды
		let triple = triples.iz();
		let radius = triple[2];
		let distance = triple[0];
		let halfChord = triple[1];
		let chord = 2 * halfChord;
		// Образующая от четверти радиуса до трёх с половиной радиусов: так достижимы
		// все наборы ФИПИ (самый плоский цилиндр — 25 и 7, самый высокий — 5 и 17),
		// а чертёж не вырождается ни в «блин», ни в «иглу» (md/task_geometry.md).
		// Образующие у ФИПИ не больше 19.
		let generator = sl(Math.max(2, Math.ceil(radius / 4)), Math.min(20, Math.floor(3.5 * radius)));
		let square = chord * generator;

		// Используем класс Cylinder для хранения параметров
		let cylinder = new Cylinder({ radius: radius, height: generator });

		// Формулировки ФИПИ: 1DD343, 3BC472, 67A05C
		let distanceText = [
			'удалено от неё на расстояние, равное',
			'расположено от неё на расстоянии, равном',
			'удалено от оси на расстояние, равное',
		].iz();

		NAtask.setTask({
			text:
				'Радиус основания цилиндра равен $' + cylinder.radius + '$, а его образующая равна $' + cylinder.height + '$. ' +
				'Сечение, параллельное оси цилиндра, ' + distanceText + ' $' + distance + '$. ' +
				'Найдите площадь этого сечения.',
			analys:
				'Сечение цилиндра плоскостью, параллельной оси, — прямоугольник, ' +
				'стороны которого равны образующей $' + cylinder.height + '$ и хорде основания. ' +
				'Расстояние от оси до хорды равно $' + distance + '$, ' +
				'поэтому половина хорды равна $\\sqrt{' + cylinder.radius + '^2-' + distance + '^2}=' + halfChord + '$, ' +
				'а вся хорда равна $' + chord + '$. ' +
				'Площадь сечения равна $' + chord + '\\cdot' + cylinder.height + '=' + square + '$.',
			answers: square,
			authors: ['chas-ege-selena', 'Zer00Player'],
		});

		// Чертёж - как в образце задачи: цилиндр видно спереди-сверху, сечение
		// повёрнуто к зрителю наискосок (одна его вертикальная сторона спереди,
		// другая сзади), расстояние от оси до сечения - перпендикуляр к середине
		// хорды на верхнем основании (с отметкой прямого угла) и такой же
		// пунктир на нижнем, середины хорд соединены пунктиром.
		// Модель: ось цилиндра вертикальна, точка основания задаётся углом t на
		// окружности; sin(t) > 0 - задняя половина, sin(t) < 0 - передняя.
		let flat = 0.3; // сплюснутость эллипсов оснований
		// Нормаль к хорде - влево и немного вперёд (как в образце); при таком
		// направлении сечение не смотрит на зрителя ни ребром, ни «в лоб»
		let phi = Math.PI + 0.4;
		let halfAngle = Math.acos(distance / cylinder.radius); // полуугол дуги хорды

		let paint = function (ct) {
			let w = 400;
			let h = 320;
			let r = cylinder.radius;
			let H = cylinder.height;
			let scale = Math.min((w - 40) / (2 * r), (h - 40) / (H + 2 * flat * r));
			let cx = w / 2;
			let yTop = (h - H * scale) / 2;
			let yBottom = yTop + H * scale;

			// Проекция точки основания: angle - угол на окружности, rho - расстояние
			// от оси (в единицах задачи), y0 - экранная высота основания
			let onBase = function (angle, rho, y0) {
				return {
					x: cx + rho * Math.cos(angle) * scale,
					y: y0 - flat * rho * Math.sin(angle) * scale,
				};
			};
			let line = function (p, q, dashed) {
				ct.setLineDash(dashed ? [6, 4] : []);
				ct.drawLine(p.x, p.y, q.x, q.y);
				ct.setLineDash([]);
			};

			let rx = r * scale;
			let ry = flat * r * scale;
			ct.lineWidth = 2;
			ct.strokeStyle = om.secondaryBrandColors.iz();

			// Концы хорды и середина хорды на обоих основаниях
			let a1 = phi - halfAngle;
			let a2 = phi + halfAngle;
			let top1 = onBase(a1, r, yTop), top2 = onBase(a2, r, yTop);
			let bot1 = onBase(a1, r, yBottom), bot2 = onBase(a2, r, yBottom);
			let midTop = onBase(phi, distance, yTop), midBottom = onBase(phi, distance, yBottom);
			let centerTop = { x: cx, y: yTop }, centerBottom = { x: cx, y: yBottom };

			// Сечение - залитый прямоугольник
			ct.drawSection([[top1.x, top1.y], [top2.x, top2.y], [bot2.x, bot2.y], [bot1.x, bot1.y]],
				om.transparentBrandColors.iz());

			// Цилиндр: верхнее основание видно целиком, у нижнего задняя половина
			// невидима; контурные образующие
			ct.drawEllipse(cx, yTop, rx, ry);
			ct.drawEllipse(cx, yBottom, rx, ry, 0, 0, Math.PI);
			ct.setLineDash([6, 4]);
			ct.drawEllipse(cx, yBottom, rx, ry, 0, Math.PI, 2 * Math.PI);
			ct.setLineDash([]);
			ct.drawLine(cx - rx, yTop, cx - rx, yBottom);
			ct.drawLine(cx + rx, yTop, cx + rx, yBottom);

			// Стороны сечения: хорда верхнего основания видна, нижнего - нет;
			// боковая сторона видна, если лежит на передней половине поверхности
			line(top1, top2, false);
			line(bot1, bot2, true);
			line(top1, bot1, Math.sin(a1) > 0);
			line(top2, bot2, Math.sin(a2) > 0);

			// Ось, расстояние от оси до сечения на обоих основаниях
			// и отрезок, соединяющий середины хорд
			line(centerTop, centerBottom, true);
			line(centerTop, midTop, false);
			line(centerBottom, midBottom, true);
			line(midTop, midBottom, true);

			// Прямой угол между перпендикуляром и хордой на верхнем основании
			// Сторона отметки - 12 px, но не больше половины перпендикуляра и полухорды
			let mark = Math.min(12 / scale, 0.5 * distance, 0.5 * halfChord);
			let toAxis = function (k) { // точка на перпендикуляре от середины к оси
				return onBase(phi, distance - k, yTop);
			};
			let alongChord = function (p, k) { // сдвиг вдоль хорды к концу top2
				return { x: p.x + (top2.x - midTop.x) * k / halfChord, y: p.y + (top2.y - midTop.y) * k / halfChord };
			};
			let m1 = toAxis(mark);
			let m2 = alongChord(m1, mark);
			let m3 = alongChord(midTop, mark);
			ct.lineWidth = 1.5;
			line(m1, m2, false);
			line(m2, m3, false);
		};

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 320,
			paint: paint,
		});
	}, 1000);
})();
//509781
//chas-ege-selena, Zer00Player
//https://mathb-ege.sdamgia.ru/problem?id=509781
