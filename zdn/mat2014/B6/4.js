(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = window.nomer === 282857 ? '282857' : '4';
		let preference1 = ['notHaveDefectInQuest', 'haveDefectInQuest'];
		let preference2 = ['haveDefect', 'notHaveDefect'];
		let preference3 = ['bags', 'pumps', 'memory', 'keyboards', 'bulbs', 'monitors', 'milk', 'batteries', 'saplings', 'seeds', 'cuttings', 'discs', 'generic'];
		let askBad = getSelectedPreferenceFromList(key, preference1);
		let givenGood = getSelectedPreferenceFromList(key, preference2);
		let context = getSelectedPreferenceFromList(key, preference3);
		let total = [50, 100, 120, 125, 140, 150, 200, 250, 300, 400, 500, 600, 800, 1000, 1200, 1300, 1400, 1500, 1600, 1900, 2000].iz();
		let bad = sl(1, Math.min(200, total - 1));
		let count = givenGood ? total - bad : bad;
		let answer = (askBad ? bad : total - bad) / total;
		genAssertZ1000(answer);
		let text;
		if (context === 0) {
			text = (sl1() ? 'Фабрика выпускает сумки. ' : '') + 'В среднем из ' + total + ' сумок, поступивших в продажу, ' +
				chislitlx(count, 'сумка') +
				(givenGood ? ' не ' : ' ') + chislit(count, 'имеет', 'имеют', 'имеют') + (givenGood ? ' скрытых дефектов' : ' скрытый дефект') +
				'. Найдите вероятность того, что случайно выбранная сумка окажется ' + (askBad ? 'со скрытым дефектом' : 'без скрытого дефекта') + '.';
		} else if (context === 1) {
			text = 'В среднем из ' + total + ' садовых насосов, поступивших в продажу, ' + chislitlx(count, 'насос') +
				(givenGood ? ' не' : '') + ' ' + chislit(count, 'подтекает', 'подтекают', 'подтекают') +
				'. Найдите вероятность того, что один случайно выбранный для контроля насос ' + (askBad ? '' : 'не ') + 'подтекает.';
		} else if (context === 12) {
			let product = sl(om.tovary.ie.length - 1);
			text = 'В среднем из ' + total + ' ' + om.tovary.rm[product] + ', поступивших в продажу, ' + count +
				(givenGood ? ' не ' : ' ') + chislit(count, 'имеет', 'имеют', 'имеют') + ' дефект' + (givenGood ? 'ов' : 'ы') +
				'. Найдите вероятность того, что один случайным образом выбранный экземпляр товара ' + (askBad ? 'имеет дефекты' : 'не имеет дефектов') + '.';
		} else {
			let products = [
				['карт памяти, поступивших в продажу,', 'не работают', 'работают', 'выбранная карта памяти', 'не работает', 'работает'],
				['клавиатур для компьютера', 'неисправны', 'исправны', 'выбранная клавиатура', 'неисправна', 'исправна'],
				['луковиц тюльпанов', 'не прорастают', 'прорастают', 'выбранная луковица', 'не прорастёт', 'прорастёт'],
				['мониторов, поступивших в продажу,', 'не работают', 'работают', 'выбранный монитор', 'не работает', 'работает'],
				['пакетов молока', 'протекают', 'не протекают', 'выбранный пакет молока', 'течёт', 'не течёт'],
				['продающихся батареек', 'разряжены', 'заряжены', 'выбранная батарейка', 'разряжена', 'заряжена'],
				['саженцев крыжовника', 'не приживаются', 'приживаются', 'выбранный саженец крыжовника', 'не приживётся', 'приживётся'],
				['семян фасоли', 'не всходят', 'всходят', 'выбранное семя фасоли', 'не взойдёт', 'взойдёт'],
				['черенков розы', 'не приживаются', 'приживаются', 'выбранный черенок', 'не приживётся', 'приживётся'],
				['чистых компакт-дисков', 'непригодны для записи', 'пригодны для записи', 'выбранный компакт-диск', 'непригоден для записи', 'пригоден для записи'],
			][context - 2];
			genAssert(count % 10 !== 1 || count % 100 === 11);
			text = 'Из ' + total + ' ' + products[0] + ' в среднем ' + count + ' ' + products[givenGood ? 2 : 1] +
				'. Какова вероятность того, что случайно ' + products[3] + ' ' + products[askBad ? 4 : 5] + '?';
		}
		NAtask.setTask({text, answers: answer, preference: [preference1, preference2, preference3]});
	}, 20000);
})();
// ФИПИ: 2AD00F, A80912, 55BE2F, C72A27, 650BAA, 1838C1, 5C69FB, 47B427, 107F28, 4C15D0, F715C3, 9430A7, FE115C, 5878E5, 1EABFF, 1EDA7B, 0E8496, 8A57C1, A36EFD, B45312, 2C189C, 78C48F, 38A680, 302D46, 92D6F4, E858F1, 5A0602, AA860D, 355108, E0EC1F, 5AEE24, 017857, 79A75E, 7975ED, FBFB65, 8D5A67, 00ED8A, DC4F8B, 930448, 4259F0, CB56FF, 70451D, 4A7A32, 9AD837, 574444, FD51E3, 7E2CFB, 40A9B0
