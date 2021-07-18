function getPfg(limit) {
	let arr = [];
	let m = 1;
	do {
		m++;
		for (let i = 1; i < m; ++i) {
			arr[0] = m * m - i * i;
			arr[1] = 2 * m * i;
			arr[2] = m * m + i * i;
			if (arr[2] > limit) {
				break;
			}
		}
	} while (arr[2] < limit);
	return arr;
}
(function() {"use strict";
	NAinfo.requireApiVersion(0, 0);
	let random = sluchch(5, 90, 5);
	let arr = getPfg(random);
	let x = sluchch(6, 54, 2);
	let y = 2 * arr[0] + x;

	let alfa = ["синус", "косинус", "тангенс", "котангенс"].iz();
	let value = 0;
	if (alfa == "синус") {
		value = arr[1] / arr[2];
	} else if (alfa == "косинус") {
		value = arr[0] / arr[2];
	} else if (alfa == "тангенс") {
		value = arr[1] / arr[0];
	} else {
		value = arr[0] / arr[1];
	}

	NAtask.setTask({
		text: "Основания равнобедренной трапеции равны " + x + " и " + y + ". " +
			"Боковые стороны равны " + arr[2] + ". " +
			"Найдите " + alfa + " острого угла трапеции.",
		answers: value.toFixedLess(2),
	});
	NAtask.modifiers.roundUpTo(-2); //модификатор округления ответа
})();
//Обр.задания 27439
//Антипова Татьяна
