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

		// Рисуем усечённый многогранник: у призмы спилены все вершины
		let paint1 = function (ct) {
			ct.translate(200, 248);
			ct.scale(1.6, 1.6);
			ct.lineWidth = 2 / 1.6;
			ct.strokeStyle = om.secondaryBrandColors.iz();

			let n = shape.n;
			let R = 40;
			let H = 60;
			let baseEdge = 2 * R * Math.sin(Math.PI / n);
			let t = Math.min(0.3 * baseEdge, 0.45 * H); // глубина спила
			let alpha = Math.PI / 6;
			let cA = Math.cos(alpha);
			let sA = Math.sin(alpha);

			let sub = function (p, q) { return { x: p.x - q.x, y: p.y - q.y, z: p.z - q.z }; };
			let add = function (p, q) { return { x: p.x + q.x, y: p.y + q.y, z: p.z + q.z }; };
			let mul = function (p, k) { return { x: p.x * k, y: p.y * k, z: p.z * k }; };
			let dot = function (p, q) { return p.x * q.x + p.y * q.y + p.z * q.z; };
			let cross = function (p, q) {
				return { x: p.y * q.z - p.z * q.y, y: p.z * q.x - p.x * q.z, z: p.x * q.y - p.y * q.x };
			};
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
				let nrm = cross(sub(P[face[1]], P[face[0]]), sub(P[face[2]], P[face[0]]));
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

			// Невидимые рёбра не изображаем (как в эталоне)
			Object.keys(edgeFaces).forEach(function (key) {
				let vis = edgeFaces[key].some(function (fi) { return faceVisible[fi]; });
				if (!vis)
					return;
				let kk = key.split('|');
				let p1 = P[kk[0]], p2 = P[kk[1]];
				ct.beginPath();
				ct.moveTo(p1.x + p1.z * cA, -(p1.y + p1.z * sA));
				ct.lineTo(p2.x + p2.z * cA, -(p2.y + p2.z * sA));
				ct.stroke();
			});
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
