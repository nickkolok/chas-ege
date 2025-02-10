(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 0);
		var vestab = sluchch(10, 30); //  вес таблетки
		var protsent = sluchch(2, 10); //  процент активного в-ва
		var vozr = sluchch(6, 12); //  возраст
		var doza = sluchch(1, 3, 0.5); //  доза активного в-ва
		var vozrmas = ['трех', 'четырех', 'пяти'].iz(1);
		var vozves = sluchch(3, 6, 0.5);
		var otwet = (vozves * doza) / ((vestab / 100) * protsent);
		genAssert(otwet.isZ(), 'Необходимо целое количество таблеток');
		genAssert(otwet < 10, 'Слишком много таблеток в день');
		NAtask.setTask({
			text: 'Одна таблетка лекарства весит ' + vestab + ' мг и содержит ' + protsent +
				'% активного вещества. Ребёнку в возрасте до ' + vozr + ' месяцев врач прописывает ' + doza +
				' мг активного вещества на каждый килограмм веса в сутки.' +
				' Сколько таблеток этого лекарства следует дать ребёнку в возрасте ' + vozrmas + '  месяцев и весом ' + vozves +
				' кг в течение суток?',
			answers: otwet.ceil(),
		});
	}, 100);
})();
