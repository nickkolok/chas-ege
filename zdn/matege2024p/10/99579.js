class ArithmeticProgression {
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

let a = sluchch(8, 30);
let b = sluchch(2, 4);
let n = sluchch(4, 11);
let progression = new ArithmeticProgression(a, b);
let q = a + progression.member(n);

NAtask.setTask({
	text: ' Бригада маляров красит забор длиной ' + chislitlx(progression.summa(n), 'метр') +
		' , ежедневно увеличивая норму покраски на одно и то же число метров.' +
		' Известно, что за первый и последний день в сумме бригада покрасила ' + chislitlx(q, 'метр') + ' забора. ' +
		' Определите, сколько дней бригада маляров красила весь забор.
	text: sklonlxkand(arr[rand]).de + ' надо решить ' + chislitlx(progression.summa(n), 'задача', 'v') +  
		'. Он решает на одно и то же количество задач больше по сравнению с предыдущим днем.' +
		' Известно, что за первый день ' + arr[rand] + ' решил ' + chislitlx(a, 'задача', 'v') +
		'. Определите, сколько задач решил ' + arr[rand] + ' в последний день,' +  
		' если со всеми задачами он справился за ' + chislitlx(n, 'день') + '.', ',
	answers: n,
});
