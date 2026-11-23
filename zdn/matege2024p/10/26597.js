(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = "26597";
		let preference = ['first_hose', 'second_hose'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let A = sl(30, 900);//объем резервуара (базовый)
		let b = sl(1, [A / 30, 29].minE(), 0.01);//объем (разница)
		let x = sl(b + 1, 100, 0.01);//объем (ответ)
		let n = (A * b) / (x * (x + b));//время заполнения (разница)
		genAssertZ1000(n, 'Время слишком дробное: ' + n);

		let liquid = sklonlxkand(['вода', 'жидкость'].iz());
		let tub_naz = sklonlxkand(['труба', 'шланг'].iz());
		let prop = ['пропускает', 'прокачивает'].iz();
		let rez = sklonlxkand(['резервуар', 'бассейн', 'бак', 'цистерна', 'бойлер', 'ёмкость'].iz());
		let v1 = sl1();
		let tub_num = ['перв' + ['ый', 'ая', 'ое', 'ые'][tub_naz.rod], 'втор' + ['ой', 'ая', 'ое', 'ые'][tub_naz.rod]];
		let dol = [[['медленнее', 'дольше'].iz(), 'меньше'], ['быстрее', 'больше']];
		let esli = [', если известно, что ', ', если '].iz();
		let ono = ['он' + ['', 'а', 'о', 'и'][tub_naz.rod]];

		NAtask.setTask({
			text: tub_num[rand].toZagl() + ' ' + tub_naz.ie + ' ' + prop + ' на ' + chislitlx(b, 'литр', 'v') + ' в минуту ' + dol[rand][1] + ', чем ' + tub_num[1 - rand] + '. ' +
				'Сколько литров ' + liquid.re + ' в минуту ' + prop + ' ' + tub_num[1 - v1] + ' ' + tub_naz.ie + esli + rez.ve + ' объёмом ' + chislitlx(A, 'литр', 'r') + ' ' +
				[ono + ' ' + ['заполняет', 'опустошает'].iz() + ' на ' + chislitlx(n, 'минута', 'v') + ' ' + dol[1 - v1][0] + ', чем ' + tub_num[v1] + ' ' + tub_naz.ie + '?',
				' ' + tub_num[v1] + ' ' + tub_naz.ie + ' ' + ['заполняет', 'опустошает'].iz() + ' на ' + chislitlx(n, 'минута', 'v') + ' ' + dol[v1][0] + '?'].iz(),
			answers: v1 == 1 ? x : x + b,
			authors: ['Aisse-258'],
			preference: preference,
		});
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000000);
})();

/*РешуЕГЭ: 26597: 5881 5883 39863 39867
	509657 642406 5885 5887 5889 5891
	5893 5895 39801 39803 39805 39807
	39809 39811 39813 39815 39817 39819
	39821 39823 39825 39827 39829 39831
	39833 39835 39837 39839 39841 39843
	39845 39847 39849 39851 39853 39855
	39857 39859 39861 39865 642477 642547
	642617 642687*/
