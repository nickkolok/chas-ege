(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Размеры пирамид - настоящие, как у ФИПИ (471700, 10AFC7, 2D3EB2 и дубли):
		// у пирамиды Хеопса не может быть стороны 180 м и высоты 76 м
		let pyramid = [
			{ name: 'Хефрена', A: 210, H: 136 },
			{ name: 'Снофру', A: 220, H: 104 },
			{ name: 'Хеопса', A: 230, H: 147 },
		].iz();
		let A = pyramid.A;
		let H = pyramid.H;

		// Во сколько раз число метров стороны оригинала больше числа сантиметров
		// стороны копии. У ФИПИ: 2, 4, 5, 8, 10, 20, 40 (сторона копии от 5,5 до 115 см)
		// Подходящие кратности отбираем заранее, а не отбраковкой: иначе пирамида
		// Хеопса (высота 147 нечётная) выпадала бы реже двух других
		let r = [2, 4, 5, 8, 10, 20, 25, 40, 50].filter(function (x) {
			return (A / x * 10).isAlmostInteger() && (H / x * 100).isAlmostInteger();
		}).iz();
		let a = A / r;
		let ans = H / r;
		a = Math.round(a * 10) / 10;
		ans = Math.round(ans * 100) / 100;

		let analys = 'Копия подобна оригиналу, поэтому отношение высоты к стороне основания у них одно и то же: ' +
			'$\\frac{h}{' + a + '} = \\frac{' + H + '}{' + A + '}$, откуда $h = ' + a + ' \\cdot \\frac{' + H + '}{' + A + '} = ' + ans + '$ см.';

		// Статичная иллюстрация: правильная четырёхугольная пирамида,
		// невидимые рёбра (левое и заднее рёбра основания, заднее боковое) — пунктиром
		let paint1 = function (ct) {
			ct.translate(12, 72);
			ct.scale(20, -20);
			ct.lineWidth = 2 / 20;
			ct.drawRightPyramid4({
				edge: 5,
				height: 6.5,
			}, [1, 3, 6], [5 / 20, 2 / 20]);
		};

		NAtask.setTask({
			text: 'Пирамида ' + pyramid.name + ' имеет форму правильной четырёхугольной пирамиды, сторона основания которой равна $' + A +
				'$ м, а высота' + [' — ', ' пирамиды равна '].iz() + '$' + H + '$ м. Сторона основания точной музейной копии этой пирамиды равна $' + a +
				'$ см. Найдите высоту музейной копии. Ответ дайте в сантиметрах.',
			answers: ans,
			analys: analys,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 220,
			height: 190,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/problem?id=510709
