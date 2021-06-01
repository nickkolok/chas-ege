(function() {'use strict';
	NAinfo.requireApiVersion(0, 0);
	let side = 'M';
	let middle = ['AB', 'CD'].iz();
	//TODO:рассмотреть случай с серединой на стороне BC
	let answer = sluchch(5, 69);
	let S = 4 * answer;
	NAtask.setTask({
		text: 'Площадь параллелограмма ABCD равна ' + S + '. Точка ' + side + ' - середина стороны ' + middle + '. Найдите площадь треугольника AD' + side + '',
		answers: answer,
	});
	NAtask.modifiers.variativeABC();//расставляем случайные буквы
})();
//Обр.задания 319157
//Антипова Татьяна
