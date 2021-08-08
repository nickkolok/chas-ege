//РАБОТАЕТ
//49. Задание 4 № 320200
//На фабрике керамической посуды 10% произведённых тарелок имеют дефект.
//При контроле качества продукции выявляется 80% дефектных тарелок.
//Остальные тарелки поступают в продажу. Найдите вероятность того,
//что случайно выбранная при покупке тарелка не имеет дефектов. Результат округлите до сотых.

(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 0);
	var mesto = ['фабрике', 'фабрике мягких игрушек', 'фабрике керамической посуды', 'заводе', 'производстве', 'производстве дверных ручек'].iz();
	var deistvie;	//=['выпущенных','изготовленных','произведенных'].iz();
	var predmet;	//=sklonlxkand(['сумка','ручка','батарейка','лампочка','игрушка','кружка'].iz());
	if (mesto == 'фабрике керамической посуды') {
		deistvie = 'произведенных';
		predmet = sklonlxkand(['тарелка', 'кружка'].iz());
	}
	else if (mesto == 'фабрике мягких игрушек') {
		deistvie = ['выпущенных', 'изготовленных'].iz();
		predmet = sklonlxkand('игрушка');
	}
	else if (mesto == 'фабрике') {
		deistvie = ['изготовленных', 'произведенных'].iz();
		predmet = sklonlxkand('сумка');
	}
	else if (mesto == 'производстве дверных ручек') {
		deistvie = ['выпущенных', 'изготовленных'].iz();
		predmet = sklonlxkand('ручка');
	}
	else if ((mesto == 'заводе') || (mesto == 'производстве')) {
		deistvie = ['выпущенных', 'изготовленных'].iz();
		predmet = sklonlxkand(['батарейка', 'лампочка',].iz());
	}
	var nayti = ['без дефектов', 'не имеет дефектов', 'с дефектами'].iz();
	var def1;
	var ver;
	var answers;
	var answers1;

	def1 = sluchch(10, 30,);
	ver = sluchch(50, 90);
	answers1 = ((1 - def1 / 100) / ((1 - def1 / 100) + (1 - ver / 100) * def1 / 100)).toFixed(3);//до тысячных
	if (nayti == 'с дефектами')
		answers = 1 - answers1;
	else
		answers = answers1;

	NAtask.setTask({
		text: 'На ' + mesto + ' ' + def1 + '% ' + deistvie + ' ' + predmet.rm + ' имеют дефект. ' +
			'При контроле качества продукции выявляется ' + ver + '% дефектных ' + predmet.rm + '. ' +
			'Остальные ' + predmet.im + ' поступают в продажу. Найдите вероятность того, ' +
			'что случайно выбранная при покупке ' + predmet.ie + ' ' + nayti + '. Результат округлите до сотых.',

		answers,

	});
})();
