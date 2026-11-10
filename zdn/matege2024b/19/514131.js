(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let A = sl(1000, 4999);
		let B = 2 * A;
		
		let sA = String(A);
		let sB = String(B);
		
		genAssert(new Set(sA).size === 4, 'A does not have 4 distinct digits');
		genAssert(new Set(sB).size === 4, 'B does not have 4 distinct digits');
		
		let digitsAArray = Array.from(new Set(sA)).sort();
		let digitsA = digitsAArray.join(', ');
		let digitsB = Array.from(new Set(sB)).sort().join(', ');
		
		let validAnswers = [];
		
		for(let i = 0; i < 4; i++){
			for(let j = 0; j < 4; j++){
				if(i === j) continue;
				for(let k = 0; k < 4; k++){
					if(i === k || j === k) continue;
					for(let l = 0; l < 4; l++){
						if(i === l || j === l || k === l) continue;
						let cand = parseInt(digitsAArray[i] + digitsAArray[j] + digitsAArray[k] + digitsAArray[l], 10);
						if(cand >= 1000){
							let candB = 2 * cand;
							if(candB >= 1000 && candB <= 9999){
								let sCandB = String(candB);
								if(new Set(sCandB).size === 4){
									let sCandBSet = Array.from(new Set(sCandB)).sort().join(', ');
									if(sCandBSet === digitsB){
										validAnswers.push(cand);
									}
								}
							}
						}
					}
				}
			}
		}
		
		genAssert(validAnswers.length > 0, 'No valid answers found');
		
		NAtask.setTask({
			text: 'Четырёхзначное число $A$ состоит из цифр ' + digitsA + ', а четырёхзначное число $B$ — из цифр ' + digitsB + '. Известно, что $B = 2A$. Найдите число $A$. В ответе укажите какое-нибудь одно такое число.',
			answers: validAnswers,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=514131
//zer00player
