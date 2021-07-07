(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 0);
	let side = 'M';
	let lowSide = 'AD';
	let middle = ['AB', 'CD', 'BC', 'AD'].iz(); 
	let answer = sluchch(5, 69);
	let S = 4 * answer;
	if (middle == 'BC' || middle == 'AD') {
		S = 2 * answer;
		if (middle == 'AD')
			lowSide = 'BC';
	}
	NAtask.setTask({
		text: 'Площадь параллелограмма ABCD равна ' + S + '. Точка ' + side + ' - середина стороны ' + middle +
			'. Найдите площадь треугольника ' + lowSide + side + '.',
		answers: answer,
	});
	NAtask.modifiers.variativeABC();//расставляем случайные буквы
})();
//Обр.задания 319157
//Антипова Татьяна
