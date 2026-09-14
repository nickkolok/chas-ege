(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(10, 50, 1);

		let paint1 = function (ct) {
			ct.translate(120, 60);
			ct.scale(20, 20);
			ct.lineWidth = 2 / 20;
			let cubeEdge = 12;

			ct.drawParallelepiped({
				width: cubeEdge,
				height: cubeEdge,
				depth: cubeEdge / 2.5,
				angle: 40,
				strokeStyle: om.secondaryBrandColors,
			}, [0, 3, 4], false, [0.5, 0.2]);
		};

		NAtask.setTask({
			text: 'Ящик, имеющий форму куба с ребром $' + a + '$ см без одной грани, ' +
			'нужно покрасить со всех сторон снаружи. Найдите площадь поверхности, которую необходимо покрасить. Ответ дайте в квадратных сантиметрах.',
			answers: 5 * a * a,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=525376
