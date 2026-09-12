(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(10, 70, 10);
		let h = sl(5, 40, 5);

		NAtask.setTask({
			text: 'В бак, имеющий форму правильной четырёхугольной призмы со стороной основания, равной $' + a + '$ см, налита жидкость. ' +
				  'Чтобы измерить объём детали сложной формы, её полностью погружают в эту жидкость. ' +
				  'Найдите объём детали, если после её погружения уровень жидкости в баке поднялся на $' + h + '$ см. Ответ дайте в кубических сантиметрах.',
			answers: a * a * h,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=506456
