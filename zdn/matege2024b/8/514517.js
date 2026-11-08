(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '514517';
		let preference = ['numbersOfTrue1', 'numbersOfTrue2', 'numberOfTrue', 'numbersOfFalse1', 'numbersOfFalse2', 'numberOfFalse'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let flag = rand == 2 || rand == 5;
		let trueOrFalse = Number(rand > 2);

		let location = sklonlxkand(['школа', 'университет', 'дом', 'колледж', 'больница', 'полиция', 'мэрия'].iz());
		let trees = sklonlxkand(['дуб', 'клён', 'тополь', 'ясень', 'каштан', 'рябина', 'берёза', 'осина', 'сосна', 'ель', 'липа', 'ива', 'ольха', 'пихта',].iz(3));

		function adjShort(tree) {
			return tree.rod === 0 ? 'ий' : 'ая';
		}
		function adjGen(tree) {
			return tree.rod === 0 ? 'его' : 'ей';
		}

		let high = sl(3, 9);
		let highDiff = high - 2;
		let n = sl(flag ? 2 : sl1(), 3);
		let m = flag ? 1 : 4 - n;

		let correct = [];
		// Простые сравнения (A > B, C > B, C > A)
		const comparisons = [
			{ from: 0, to: 1 },
			{ from: 2, to: 1 },
			{ from: 2, to: 0 }
		];
		comparisons.forEach(pair => {
			correct.push(
				trees[pair.from].ie.toZagl() + ', растущ' + adjShort(trees[pair.from]) + ' во дворе ' + location.re +
				', выше ' + trees[pair.to].re + ', растущ' + adjGen(trees[pair.to]) + ' там же.'
			);
		});
		// Обратные формулировки (B < A и т.д.)
		const reverseComparisons = [
			{ from: 1, to: 0 },
			{ from: 1, to: 2 },
			{ from: 0, to: 2 }
		];
		reverseComparisons.forEach(pair => {
			correct.push(
				trees[pair.from].ie.toZagl() + ', растущ' + adjShort(trees[pair.from]) + ' во дворе ' + location.re +
				', ниже ' + trees[pair.to].re + ', растущ' + adjGen(trees[pair.to]) + ' там же.'
			);
		});
		//Верные следствия
		correct.push(
			'Любое дерево, помимо указанных, которое выше ' + trees[2].re + ', растущ' + adjGen(trees[2]) + ' во дворе ' + location.re +
			', также выше ' + trees[0].re + ' и ' + trees[1].re + '.',
			'Любое дерево, помимо указанных, которое ниже ' + trees[1].re + ', растущ' + adjGen(trees[1]) + ' во дворе ' + location.re +
			', также ниже ' + trees[0].re + ' и ' + trees[2].re + '.',
			'Среди указанных деревьев не найдётся двух одной высоты.'
		);

		let wrong = [];
		// Ложные сравнения (A > C, B > A, B > C)
		let falseComparisons = [
			{ from: 0, to: 2 },
			{ from: 1, to: 0 },
			{ from: 1, to: 2 }
		];
		falseComparisons.forEach(pair => {
			wrong.push(
				trees[pair.from].ie.toZagl() + ', растущ' + adjShort(trees[pair.from]) + ' во дворе ' + location.re +
				', выше ' + trees[pair.to].re + ', растущ' + adjGen(trees[pair.to]) + ' там же.'
			);
		});
		// Ложные следствия
		wrong.push(
			'Среди указанных деревьев найдётся два одной высоты.',
			'Любое дерево, помимо указанных, которое выше ' + trees[0].re + ', растущ' + adjGen(trees[0]) + ' во дворе ' + location.re +
			', также выше ' + trees[2].re + '.',
			'Любое дерево, помимо указанных, которое ниже ' + trees[2].re + ', растущ' + adjGen(trees[2]) + ' во дворе ' + location.re +
			', также ниже ' + trees[1].re + '.'
		);

		chas2.task.setTask({
			text: 'Во дворе ' + location.re + ' растут всего три дерева: ' + trees[0].ie + ', ' + trees[1].ie + ', ' + trees[2].ie + '. ' +
				trees[0].ie.toZagl() + ' выше ' + trees[1].re + ' на ' + chislitlx(highDiff,'метр','v$') + ', но ниже ' + trees[2].re + ' на ' + chislitlx(high,'метр','v$') + '.' +
				' Выберите одно или несколько утверждений, которые ' + ['верны', 'неверны'][trueOrFalse] + ' при указанных условиях. ' +
				' В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов.' +
				' Если ответов несколько, записывайте их номера в порядке возрастания.',
			answers: trueOrFalse ? wrong : correct,
			wrongAnswers: trueOrFalse ? correct : wrong,
			preference: preference,
		});
		AtoB2(n, m);
	}, 1000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=514517
