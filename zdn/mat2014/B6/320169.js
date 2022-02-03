(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 0);
	let kol = [[4,'четырёх'],[5, `пяти`],[8, `восьми`]].iz();
	let chislo=kol.pop();
	let k = sluchch(1, kol-1);
	let person1 = [`Петя`, `Коля`, `Вася`, `Ваня`, `Никита`, `Арсений`, `Антон`, `Яков`,
		`Рома`, `Олег`, `Кирилл`, `Данил`, `Даниил`, `Арик`, `Ярик`, `Фома`, `Дима`, `Артём`, `Матвей`, `Максим`, `Игорь`,
	].iz(k);
	let person2 = [`Алёна`, `Вика`, `Арина`, `Маша`, `Лена`, `Оля`, `Катя`, `Марина`, `Аня`, `Наташа`,
		`Ирина`, `Настя`, `Ирма`, `Кристина`, `Ира`, `Мила`, `Тома`, `Любовь`, `Вера`, `Надежда`, `Снежана`,
	].iz(kol - k);
	let persons = person1.concat(person2).shuffle();
	let uslov = [`${persons.iz()}`, `девочка`, `мальчик`, ].iz();
	let must = `должен`;
	if (person2.includes(uslov) || uslov == `девочка`)
		must = `должна`;
	let answ;
	switch (uslov) {
	case (`мальчик`):
		answ = k / kol;
		break;
	case (`девочка`):
		answ = (kol - k) / kol;
		break;
	default:
		answ = 1 / kol;
		break;
	}
	if (sl1()) {
		uslov = `не ` + uslov;
		answ = 1 - answ;
	}
	let children = ``;
	for (let i = 0; i < kol - 1; i++) {
		children += persons[i];
		if (i != kol - 2)
			children += `, `;
		else
			children += ` `;
	}
	children += `и ` + persons[kol - 1];
	NAtask.setTask({
		text: `${children} бросили жребий - кому начинать игру. Найдите вероятность того, что начинать игру ${must} будет ${uslov}.`,
		answers: answ,
		analys: `Жребий начать игру может выпасть каждому из ${chislo} детей. Вероятность того, что это будет ${uslov}, равна ${answ}.`,
	});

})();
// 320169,320335,320343
