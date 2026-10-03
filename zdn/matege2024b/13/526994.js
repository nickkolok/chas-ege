(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		function simplifySqrt(n) {
			let k = 1;
			for (let i = 2; i * i <= n; i++) {
				while (n % (i * i) === 0) {
					k *= i;
					n /= (i * i);
				}
			}
			return [k, n];
		}

		function sqrtLatex(n) {
			let pair = simplifySqrt(n);
			let k = pair[0];
			let m = pair[1];
			if (m === 1) {
				return '' + k;
			}
			if (k === 1) {
				return '\\sqrt{' + m + '}';
			}
			return k + '\\sqrt{' + m + '}';
		}

		let key = '526994';
		let preference = ['two_legs', 'leg_and_hypotenuse'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Верхняя граница первого катета зависит от варианта
		let aMax = [20, 15][rand];

		let a = sl(3, aMax);
		let b = sl(3, 20);
		// Хотя бы один катет чётный - тогда объём заведомо целый
		if ((a * b) % 2 !== 0) {
			b += 1;
		}
		// Ограничиваем отношение размеров, чтобы чертёж был читаемым
		if (b > 3 * a || a > 3 * b) {
			throw new Error('bad ratio');
		}
		let h = sl(Math.max(2, Math.ceil(Math.max(a, b) / 3)), Math.min(12, 3 * Math.min(a, b)));

		// Призма с прямоугольным треугольником в основании
		let prism = new RectangularPrismWithRightAngledTriangleAtBase({
			height: h,
			sideA: a,
			sideB: b,
		});

		// Площадь и объём считаем напрямую, без формулы Герона: без погрешностей плавающей точки
		let S = Math.round(a * b / 2);
		let V = Math.round(S * h);

		// Гипотенуза нужна только второму варианту, но считаем один раз
		let c2 = a * a + b * b;
		let cLatex = sqrtLatex(c2);

		let textOptions = [
			`В основании прямой призмы лежит прямоугольный треугольник, катеты которого равны $${[a, b].shuffle().join('$ и $')}$. `,
			`В основании прямой призмы лежит прямоугольный треугольник, один из катетов которого равен $${a}$, а гипотенуза равна $${cLatex}$. `,
		];
		let analysOptions = [
			`Площадь прямоугольного треугольника равна половине произведения катетов: $S = \\frac{${a} \\cdot ${b}}{2} = ${S}$. `,
			`По теореме Пифагора второй катет равен $\\sqrt{${cLatex}^2 - ${a}^2} = \\sqrt{${c2} - ${a * a}} = \\sqrt{${b * b}} = ${b}$. Площадь основания: $S = \\frac{${a} \\cdot ${b}}{2} = ${S}$. `,
		];

		let text = textOptions[rand] + `Найдите объём призмы, если её высота равна $${h}$.`;
		let analys = analysOptions[rand] + `Объём призмы: $V = S \\cdot h = ${S} \\cdot ${h} = ${V}$.`;

		let paint1 = function(ctx) {
			let vertices = prism.verticesOfFigure;
			let connectionMatrix = prism.connectionMatrix;

			// Настройка камеры для проекции
			let camera = {
				x: 0,
				y: 0,
				z: 0,
				rotationX: 0.3,
				rotationY: 0.5,
				rotationZ: 0,
				scale: 15,
			};

			// Проецируем 3D-вершины на 2D
			let points2D = vertices.map(function(v) {
				return project3DTo2D(v, camera);
			});

			// Автомасштабирование
			let xs = points2D.map(function(p) {
				return p.x;
			});
			let ys = points2D.map(function(p) {
				return p.y;
			});
			let centerX = (Math.min(...xs) + Math.max(...xs)) / 2;
			let centerY = (Math.min(...ys) + Math.max(...ys)) / 2;
			let scale = Math.min(
				360 / (Math.max(...xs) - Math.min(...xs)),
				360 / (Math.max(...ys) - Math.min(...ys))
			);

			ctx.translate(200, 200);
			ctx.scale(scale, -scale);
			ctx.translate(-centerX, -centerY);

			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.lineWidth = 2 / scale;

			// Рисуем фигуру по матрице смежности
			ctx.drawFigure(points2D, connectionMatrix);

			// Отметка прямого угла при вершине 0 основания
			let t = 0.15 * Math.min(a, b);
			let v0 = vertices[0];
			let v1 = vertices[1];
			let v2 = vertices[2];

			let len1 = Math.sqrt((v1.x - v0.x) ** 2 + (v1.y - v0.y) ** 2);
			let len2 = Math.sqrt((v2.x - v0.x) ** 2 + (v2.y - v0.y) ** 2);
			let dir1 = {
				x: (v1.x - v0.x) / len1,
				y: (v1.y - v0.y) / len1,
				z: v0.z,
			};
			let dir2 = {
				x: (v2.x - v0.x) / len2,
				y: (v2.y - v0.y) / len2,
				z: v0.z,
			};

			let q1 = project3DTo2D({
				x: v0.x + t * dir1.x,
				y: v0.y + t * dir1.y,
				z: v0.z,
			}, camera);
			let q2 = project3DTo2D({
				x: v0.x + t * dir1.x + t * dir2.x,
				y: v0.y + t * dir1.y + t * dir2.y,
				z: v0.z,
			}, camera);
			let q3 = project3DTo2D({
				x: v0.x + t * dir2.x,
				y: v0.y + t * dir2.y,
				z: v0.z,
			}, camera);

			ctx.drawLine(q1.x, q1.y, q2.x, q2.y);
			ctx.drawLine(q2.x, q2.y, q3.x, q3.y);
		};

		NAtask.setTask({
			text: text,
			analys: analys,
			answers: V,
			authors: ['Селена'],
			preference: preference,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
// 526994 https://mathb-ege.sdamgia.ru/problem?id=526994
