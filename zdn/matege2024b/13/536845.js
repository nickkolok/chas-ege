(function(){
	'use strict';
	retryWhileError(function(){
		NAinfo.requireApiVersion(0, 2);
		let key = '536845';
		let preference = ['findTotalGivenSmall', 'findSmallGivenTotal', 'findTotalGivenFrustum', 'findFrustumGivenTotal'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let n = sl(2, 5);
		let m = sl(1, n - 1);
		let k1 = m;
		let k2 = n - m;

		let X = sl(1, 10);
		let V_small = X * m**3;
		let V_total = X * n**3;
		let V_frustum = V_total - V_small;

		let questionText, answer;
		if (rand == 0) {
			questionText = "Найдите объём данного конуса, если объём конуса, отсечённого проведённой плоскостью, равен " + V_small + ".";
			answer = V_total;
		} else if (rand == 1) {
			questionText = "Найдите объём конуса, отсечённого проведённой плоскостью, если объём данного конуса равен " + V_total + ".";
			answer = V_small;
		} else if (rand == 2) {
			questionText = "Найдите объём данного конуса, если объём усечённого конуса, отсечённого проведённой плоскостью, равен " + V_frustum + ".";
			answer = V_total;
		} else if (rand == 3) {
			questionText = "Найдите объём усечённого конуса, отсечённого проведённой плоскостью, если объём данного конуса равен " + V_total + ".";
			answer = V_frustum;
		}

		let text = "Через точку, делящую высоту конуса в отношении " + k1 + " : " + k2 + ", считая от вершины, проведена плоскость, параллельная основанию. " + questionText;

		NAtask.setTask({
			text: text,
			answers: answer,
			preference: preference,
		});
		
		NAtask.modifiers.allDecimalsToStandard();
	}, 20000);
})();
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/test?likes=536845
