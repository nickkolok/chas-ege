(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let probability = sl(0.1, 0.9, 0.01);
		let antiProbability = 1 - probability;
		let probabilityInQuestion=sl(0.1,0.9,0.01);
		let power=0;
		do{power++;}while(1-(antiProbability).pow(power)<probabilityInQuestion);
		genAssert(power!=0&&power!=1, 'Кривой ответ');
		genAssertZ1000((1-(antiProbability).pow(power))*100000, 'Кривой ответ');
		NAtask.setTask({
			text: 'Стрелок в тире стреляет по мишени до тех пор, пока не поразит её. ' +
				'Известно, что он попадает в цель с вероятностью '+probability.ts()+' при каждом отдельном выстреле. ' +
				'Какое наименьшее количество патронов нужно дать стрелку, ' +
				'чтобы он поразил цель с вероятностью не менее '+probabilityInQuestion.ts()+'.',
			answers: power,
			analys: '',
		});
	});
})();
// 508830 508831 508832 508833 508834 508835 508836 508837 508838 508839
//SugarHedgehog
