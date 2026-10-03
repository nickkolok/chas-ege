(function(){
	'use strict';
	retryWhileError(function(){
		NAinfo.requireApiVersion(0,2);
		
		let L = sl(4, 7);
		let d = sl(2, 3);
		let D = [12, 15, 18, 22, 25, 44].iz();
		
		let lengthWord = ['четырёхзначное','пятизначное','шестизначное','семизначное'][L - 4];
		
		let validNumbers = [];
		function dfs(currentDigits){
			if (currentDigits.length === L){
				let n = parseInt(currentDigits.join(''));
				if (n % D === 0){
					validNumbers.push(n);
				}
				return;
			}
			let last = currentDigits[currentDigits.length - 1];
			let nexts = [last - d, last + d];
			for (let nxt of nexts){
				if (nxt >= 0 && nxt <= 9){
					dfs(currentDigits.concat([nxt]));
				}
			}
		}
		for (let start = 1; start <= 9; start++){
			dfs([start]);
		}
		
		genAssert(validNumbers.length > 0, 'Нет решений для сгенерированных параметров');
		
		NAtask.setTask({
			text: 'Найдите ' + lengthWord + ' число, кратное $' + D + '$, любые две соседние цифры которого отличаются на $' + d + '$. В ответе укажите какое-нибудь одно такое число.',
			answers: validNumbers,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//509684, 509724, 510925, 510972, 511932, 511952, 513786, 513806, 525241, 532218, 532245, 532267, 535947
//https://mathb-ege.sdamgia.ru/problem?id=513744
//zer00player