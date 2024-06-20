﻿class ArithmeticProgression {
	constructor(first, difference) {
		this.first = first;
		this.difference = difference;
		this.nmember = 0;

	}

	member(nmember) {
		this.nmember = nmember;
		return this.first + this.difference * (this.nmember - 1);
	}

	summa(nmember) {
		this.nmember = nmember;
		return ((2 * this.first + this.difference * (this.nmember - 1)) / 2) * this.nmember;
	}

}



let a = sluchch(2, 10);
let b = sluchch(2, 4);
let n = sluchch(10, 24);
let n2 = n - sluchch(5, 7);

let progression = new ArithmeticProgression(a, b);

NAtask.setTask({
	text: 'Турист идет из одного города в другой, каждый день проходя больше,' +
		' чем в предыдущий день, на одно и то же расстояние.' +
		' Известно, что за первый день турист прошел ' + chislitlx(a, 'километр') +  '.' +
		' Определите, сколько километров прошел турист за ' + om.porchisl[n2].i[0] +  
		' день, если весь путь он прошел за ' + chislitlx(n, 'день') + ', а расстояние между городами составляет ' +  
		chislitlx(progression.summa(n), 'километр') + '.',

	answers: progression.member(n2),
});
//Сергей Алендарь
