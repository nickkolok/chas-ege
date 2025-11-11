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

		let high = sl(2, 5);
		let n = sl(flag ? 2 : sl1(), 3);
		let m = flag ? 1 : 4 - n;

		let text = 'Во дворе ' + location.re + ' растут всего три дерева: ' + trees[0].ie + ', ' + trees[1].ie + ', ' + trees[2].ie + '. ' +
			trees[0].ie.toZagl() + ' выше ' + trees[1].re + ' на $1$ метр, но ниже ' + trees[2].re + ' на $' + high + '$ метра.' +
			' Выберите одно или несколько утверждений, которые ' + ['верны', 'неверны'][trueOrFalse] + ' при указанных условиях. ' +
			' В ответе запишите номера выбранных утверждений без пробелов, запятых и других дополнительных символов.' +
			' Если ответов несколько, записывайте их номера в порядке возрастания.';
		text += '<br>';

		let correct = [
			//Список (на самом деле массив) правильных утверждений
			'Среди указанных деревьев не найдётся двух одной высоты.',
			trees[0].ie.toZagl() + ', растущ' + adjShort(trees[0]) + ' во дворе ' + location.re + ', выше ' + trees[1].re + ', растущ' + adjGen(trees[1]) + ' там же.',
			trees[2].ie.toZagl() + ', растущ' + adjShort(trees[2]) + ' во дворе ' + location.re + ', выше ' + trees[1].re + ', растущ' + adjGen(trees[1]) + ' там же.',
			trees[2].ie.toZagl() + ', растущ' + adjShort(trees[2]) + ' во дворе ' + location.re + ', выше ' + trees[0].re + ', растущ' + adjGen(trees[0]) + ' там же.',
			trees[1].ie.toZagl() + ', растущ' + adjShort(trees[1]) + ' во дворе ' + location.re + ', ниже ' + trees[0].re + ', растущ' + adjGen(trees[0]) + ' там же.',
			trees[1].ie.toZagl() + ', растущ' + adjShort(trees[1]) + ' во дворе ' + location.re + ', ниже ' + trees[2].re + ', растущ' + adjGen(trees[2]) + ' там же.',
			trees[0].ie.toZagl() + ', растущ' + adjShort(trees[0]) + ' во дворе ' + location.re + ', ниже ' + trees[2].re + ', растущ' + adjGen(trees[2]) + ' там же.',
			'Любое дерево, помимо указанных, которое ниже ' + trees[1].re + ', растущ' + adjGen(trees[1]) + ' во дворе ' + location.re + ', также ниже ' + trees[0].re + ', растущ' + adjGen(trees[0]) + ' там же.',
			'Любое дерево, помимо указанных, которое ниже ' + trees[1].re + ', растущ' + adjGen(trees[1]) + ' во дворе ' + location.re + ', также ниже ' + trees[2].re + ', растущ' + adjGen(trees[2]) + ' там же.',
			'Любое дерево, помимо указанных, которое ниже ' + trees[0].re + ', растущ' + adjGen(trees[0]) + ' во дворе ' + location.re + ', также ниже ' + trees[2].re + ', растущ' + adjGen(trees[2]) + ' там же.',
			'Любое дерево, помимо указанных, которое выше ' + trees[2].re + ', растущ' + adjGen(trees[2]) + ' во дворе ' + location.re + ', также выше ' + trees[0].re + ', растущ' + adjGen(trees[0]) + ' там же.',
			'Любое дерево, помимо указанных, которое выше ' + trees[2].re + ', растущ' + adjGen(trees[2]) + ' во дворе ' + location.re + ', также выше ' + trees[1].re + ', растущ' + adjGen(trees[1]) + ' там же.',
			'Любое дерево, помимо указанных, которое выше ' + trees[0].re + ', растущ' + adjGen(trees[0]) + ' во дворе ' + location.re + ', также выше ' + trees[1].re + ', растущ' + adjGen(trees[1]) + ' там же.',
		];

		let wrong = [
			'Среди указанных деревьев найдётся два одной высоты.',
			trees[0].ie.toZagl() + ', растущ' + adjShort(trees[0]) + ' во дворе ' + location.re + ', выше ' + trees[2].re + ', растущ' + adjGen(trees[2]) + ' там же.',
			trees[1].ie.toZagl() + ', растущ' + adjShort(trees[1]) + ' во дворе ' + location.re + ', выше ' + trees[2].re + ', растущ' + adjGen(trees[2]) + ' там же.',
			trees[1].ie.toZagl() + ', растущ' + adjShort(trees[1]) + ' во дворе ' + location.re + ', выше ' + trees[0].re + ', растущ' + adjGen(trees[0]) + ' там же.',
			trees[2].ie.toZagl() + ', растущ' + adjShort(trees[2]) + ' во дворе ' + location.re + ', ниже ' + trees[0].re + ', растущ' + adjGen(trees[0]) + ' там же.',
			trees[2].ie.toZagl() + ', растущ' + adjShort(trees[2]) + ' во дворе ' + location.re + ', ниже ' + trees[0].re + ', растущ' + adjGen(trees[0]) + ' там же.',
			trees[0].ie.toZagl() + ', растущ' + adjShort(trees[0]) + ' во дворе ' + location.re + ', ниже ' + trees[1].re + ', растущ' + adjGen(trees[1]) + ' там же.',
			'Любое дерево, помимо указанных, которое ниже ' + trees[0].re + ', растущ' + adjGen(trees[0]) + ' во дворе ' + location.re + ', также ниже ' + trees[1].re + ', растущ' + adjGen(trees[1]) + ' там же.',
			'Любое дерево, помимо указанных, которое ниже ' + trees[2].re + ', растущ' + adjGen(trees[2]) + ' во дворе ' + location.re + ', также ниже ' + trees[1].re + ', растущ' + adjGen(trees[1]) + ' там же.',
			'Любое дерево, помимо указанных, которое ниже ' + trees[2].re + ', растущ' + adjGen(trees[2]) + ' во дворе ' + location.re + ', также ниже ' + trees[0].re + ', растущ' + adjGen(trees[0]) + ' там же.',
			'Любое дерево, помимо указанных, которое выше ' + trees[0].re + ', растущ' + adjGen(trees[0]) + ' во дворе ' + location.re + ', также выше ' + trees[2].re + ', растущ' + adjGen(trees[2]) + ' там же.',
			'Любое дерево, помимо указанных, которое выше ' + trees[1].re + ', растущ' + adjGen(trees[1]) + ' во дворе ' + location.re + ', также выше ' + trees[2].re + ', растущ' + adjGen(trees[2]) + ' там же.',
			'Любое дерево, помимо указанных, которое выше ' + trees[1].re + ', растущ' + adjGen(trees[1]) + ' во дворе ' + location.re + ', также выше ' + trees[0].re + ', растущ' + adjGen(trees[0]) + ' там же.',
		]; //Внимание: после последнего элемента тоже ставится запятая. Её можно и не ставить, но так удобнее.

		chas2.task.setTask({
			text: text,
			answers: trueOrFalse ? wrong : correct,
			wrongAnswers: trueOrFalse ? correct : wrong,
			preference: preference,
		});
		AtoB2(n, m);
	}, 1000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=514517
