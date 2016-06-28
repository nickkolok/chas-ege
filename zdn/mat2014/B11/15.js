(function() {
	'use strict';
	/*Исходный текст задачи:
	Найдите значение выражения $({{\\log }_{2}}16)\\cdot ({{\\log
	}_{6}}36)$.
	*/
	var L1 = sluchch(2, 4),
		L2 = sluchch(2, 4),
		Osn1 = sluchch(2, 6),
		Osn2 = sluchch(2, 6);

	chas2.task.setTask({
		text: 'Найдите значение выражения $({{\\log }_{'+Osn1+
'}}'+Osn1
.pow(L1)+')\\cdot ({{\\log }_{'+Osn2+'}}'+Osn2 .pow(L2)+')$.',
		answers: [ (L1*L2).ts(),
		],
		tags: {
			'log': 1,
			'prz': 0,
			'drs': 0,
			'tri': 0,
		},
	});

})();
//Источник задания.  Открытый банк заданий № 26843
//DjUsagi
