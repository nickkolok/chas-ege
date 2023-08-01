(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let bun = [[['батской булочка','рулет','батон','хлеб'].iz(),500], [['краковской бублик', 'маффин', 'кренделе', 'круассан',
			'пампушка', 'пита', 'пончик', 'рогалик',  'сайка', 'сдоба', 'сметанник',  'слойка'].iz(), 100]
		].iz();
		let bottomWeight=bun.pop();
		bottomWeight=sl(bottomWeight,bottomWeight*sl(1.5,3,0.1));
		let topWeight=bottomWeight+sl(10,100);
		bun=sklonlxkand(bun[0]);
		let firstProbability = sl(0.5, 0.99, 0.01);
		let secondProbability = sl(0.1, firstProbability - 0.1, 0.01);
		NAtask.setTask({
			text: 'При выпечке '+bun.re+' производится контрольное взвешивание свежего изделия. ' +
				'Известно, что вероятность того, что масса окажется меньше '+topWeight+' г, равна ' + firstProbability.ts() + '. ' +
				'Вероятность того, что масса окажется больше '+bottomWeight+' г, равна ' + secondProbability.ts() + '. ' +
				'Найдите вероятность того, что масса буханки больше '+bottomWeight+' г, но меньше '+topWeight+' г.',
			answers: firstProbability - secondProbability,
			analys: '',
		});
	});
})();
//201 ФИПИ
//SugarHedgehog
