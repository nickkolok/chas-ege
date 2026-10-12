(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '506476';
		let preference = ['grani', 'rebra', 'vershiny'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Формулы ниже верны для призм: в каждой вершине сходятся ровно три ребра.
		// angleOffset - поворот призмы для чертежа: подобран так, чтобы ни одна
		// боковая грань не смотрела на зрителя ребром (иначе у края рисунка
		// появляются узкие «щепки»)
		let shapes = [
			{ name: 'деревянного кубика', pos: 'его', F: 6, V: 8, E: 12, n: 4, angleOffset: Math.PI / 4, cube: true },
			{ name: 'деревянной правильной треугольной призмы', pos: 'её', F: 5, V: 6, E: 9, n: 3, angleOffset: -Math.PI / 4 },
			{ name: 'деревянной правильной четырёхугольной призмы', pos: 'её', F: 6, V: 8, E: 12, n: 4, angleOffset: Math.PI / 4 },
			{ name: 'деревянной правильной пятиугольной призмы', pos: 'её', F: 7, V: 10, E: 15, n: 5, angleOffset: -Math.PI / 14 },
			{ name: 'деревянной правильной шестиугольной призмы', pos: 'её', F: 8, V: 12, E: 18, n: 6, angleOffset: -Math.PI / 9 },
		];

		let shape = shapes.iz();

		let answers = [
			shape.F + shape.V,
			shape.E + 3 * shape.V,
			3 * shape.V
		];

		let questionText = ['граней', 'рёбер', 'вершин'][rand];

		let V0 = shape.V, E0 = shape.E, F0 = shape.F;
		let analys = 'У исходного многогранника $' + F0 + '$ граней, $' + E0 + '$ рёбер и $' + V0 + '$ вершин; ' +
			'в каждой вершине сходятся три ребра. Спил вершины заменяет её треугольной гранью: ' + [
				'добавляется по одной грани на каждую вершину, поэтому граней становится $' + F0 + ' + ' + V0 + ' = ' + answers[0] + '$.',
				'исходные рёбра сохраняются (укорачиваются), и у каждой спиленной вершины добавляются три ребра треугольника, ' +
					'поэтому рёбер становится $' + E0 + ' + 3 \\cdot ' + V0 + ' = ' + answers[1] + '$.',
				'вместо каждой вершины появляются три вершины треугольника, поэтому вершин становится $3 \\cdot ' + V0 + ' = ' + answers[2] + '$.',
			][rand] + ' Проверка по формуле Эйлера: $' + answers[2] + ' - ' + answers[1] + ' + ' + answers[0] + ' = 2$.';

		// Рисуем усечённый многогранник: у призмы спилены все вершины
		let paint1 = function (ct) {
			let n = shape.n;
			let R = 40;
			let baseEdge = 2 * R * Math.sin(Math.PI / n);
			// У кубика высота равна стороне основания - это настоящий куб.
			// У правильной четырёхугольной призмы при общей высоте 60 сторона
			// основания выходила 56,6 - на рисунке она была неотличима от кубика,
			// поэтому её высота в полтора раза больше стороны основания
			let H = shape.cube ? baseEdge : (shape.n === 4 ? 1.5 * baseEdge : 60);
			let t = Math.min(0.3 * baseEdge, 0.45 * H); // глубина спила
			let alpha = Math.PI / 6;
			let cA = Math.cos(alpha);
			let sA = Math.sin(alpha);

			let sub = function (p, q) { return { x: p.x - q.x, y: p.y - q.y, z: p.z - q.z }; };
			let add = function (p, q) { return { x: p.x + q.x, y: p.y + q.y, z: p.z + q.z }; };
			let mul = function (p, k) { return { x: p.x * k, y: p.y * k, z: p.z * k }; };
			let dot = function (p, q) { return p.x * q.x + p.y * q.y + p.z * q.z; };
			let norm = function (p) { return mul(p, 1 / Math.sqrt(dot(p, p))); };
			let along = function (p, dir, d) { return add(p, mul(dir, d)); };

			// Вершины исходной призмы и точки спилов
			let V = [], Vp = [], P = {};
			for (let i = 0; i < n; i++) {
				let th = 2 * Math.PI * i / n + shape.angleOffset;
				V.push({ x: R * Math.cos(th), y: 0, z: R * Math.sin(th) });
				Vp.push({ x: R * Math.cos(th), y: H, z: R * Math.sin(th) });
			}
			for (let i = 0; i < n; i++) {
				let ip = (i + 1) % n, im = (i - 1 + n) % n;
				P['A' + i] = along(V[i], norm(sub(V[ip], V[i])), t);
				P['B' + i] = along(V[i], norm(sub(V[im], V[i])), t);
				P['C' + i] = add(V[i], { x: 0, y: t, z: 0 });
				P['a' + i] = along(Vp[i], norm(sub(Vp[ip], Vp[i])), t);
				P['b' + i] = along(Vp[i], norm(sub(Vp[im], Vp[i])), t);
				P['c' + i] = add(Vp[i], { x: 0, y: -t, z: 0 });
			}

			// Грани усечённого многогранника
			let faces = [];
			let bottom = [], top = [];
			for (let i = 0; i < n; i++) {
				bottom.push('A' + i, 'B' + ((i + 1) % n));
				top.push('a' + i, 'b' + ((i + 1) % n));
			}
			faces.push(bottom, top);
			for (let i = 0; i < n; i++) {
				let ip = (i + 1) % n;
				faces.push(['A' + i, 'B' + ip, 'C' + ip, 'c' + ip, 'b' + ip, 'a' + i, 'c' + i, 'C' + i]); // боковая
				faces.push(['A' + i, 'C' + i, 'B' + i]); // спил снизу
				faces.push(['a' + i, 'c' + i, 'b' + i]); // спил сверху
			}

			// Центр многогранника — для ориентации нормалей наружу
			let names = Object.keys(P);
			let center = { x: 0, y: 0, z: 0 };
			names.forEach(function (k) { center = add(center, P[k]); });
			center = mul(center, 1 / names.length);

			// Направление на наблюдателя для нашей проекции
			let view = { x: cA, y: sA, z: -1 };

			let faceVisible = faces.map(function (face) {
				let nrm = crossProduct3D(sub(P[face[1]], P[face[0]]), sub(P[face[2]], P[face[0]]));
				let cent = { x: 0, y: 0, z: 0 };
				face.forEach(function (k) { cent = add(cent, P[k]); });
				cent = mul(cent, 1 / face.length);
				if (dot(nrm, sub(cent, center)) < 0)
					nrm = mul(nrm, -1);
				return dot(nrm, view) > 0;
			});

			// Рёбра и их смежные грани
			let edgeFaces = {};
			faces.forEach(function (face, fi) {
				for (let j = 0; j < face.length; j++) {
					let k1 = face[j], k2 = face[(j + 1) % face.length];
					let key = k1 < k2 ? k1 + '|' + k2 : k2 + '|' + k1;
					(edgeFaces[key] = edgeFaces[key] || []).push(fi);
				}
			});

			// Проекция и автомасштаб: фигура вписывается в холст 400 x 400
			// с полями 30 px и центрируется (раньше стояли жёсткие translate и scale)
			let proj = function (p) {
				return { x: p.x + p.z * cA, y: -(p.y + p.z * sA) };
			};
			let pts = names.map(function (k) { return proj(P[k]); });
			let minX = Math.min(...pts.map((p) => p.x)), maxX = Math.max(...pts.map((p) => p.x));
			let minY = Math.min(...pts.map((p) => p.y)), maxY = Math.max(...pts.map((p) => p.y));
			let scale = Math.min(340 / (maxX - minX), 340 / (maxY - minY));
			ct.translate(200 - scale * (minX + maxX) / 2, 200 - scale * (minY + maxY) / 2);
			ct.scale(scale, scale);
			ct.lineWidth = 2 / scale;
			ct.strokeStyle = om.secondaryBrandColors.iz();

			// Невидимые рёбра не изображаем (как в эталоне)
			Object.keys(edgeFaces).forEach(function (key) {
				let vis = edgeFaces[key].some(function (fi) { return faceVisible[fi]; });
				if (!vis)
					return;
				let kk = key.split('|');
				let p1 = proj(P[kk[0]]), p2 = proj(P[kk[1]]);
				ct.drawLine(p1.x, p1.y, p2.x, p2.y);
			});
		};

		NAtask.setTask({
			// «(см. рис.)» и «(см. рисунок)» - обе формы встречаются у ФИПИ
			text: 'От ' + shape.name + ' отпилили все ' + shape.pos + ' вершины ' + ['(см. рис.)', '(см. рисунок)'].iz() +
				'. Сколько ' + questionText + ' у получившегося многогранника (невидимые рёбра на рисунке не изображены)?',
			answers: answers[rand],
			analys: analys,
			authors: ['Zer00Player', 'chas-ege-selena'],
			preference: [preference],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//506476
//Zer00Player, chas-ege-selena
//https://mathb-ege.sdamgia.ru/test?likes=506476
