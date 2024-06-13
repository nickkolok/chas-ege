	(function() {
		'use strict';
		NAinfo.requireApiVersion(0, 2);
		var vipudkniki = sluchch(1000, 10000, 100);
		var nomer = sluchch(1, 20, 2);
		var procent = sluchch(1, 90);
		var pravilnoreshivshili = (vipudkniki / 100)* procent;
		NAtask.setTask({
		text: 'Задачу №' + nomer + ' правильно решили ' + pravilnoreshivshili + ' человек, что составляет ' + procent +
                            '% от выпускников города. Сколько всего выпускников в этом городе? ',
		answers: vipudkniki,
		});
	})();

