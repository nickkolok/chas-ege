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



let a = sluchch(1, 15);
let b = sluchch(2, 4);
let n = sluchch(4, 23);
var arr = ['Петя', 'Вася', 'Миша', 'Олег', 'Федя', 'Руслан', 'Саша', 'Игорь', 'Артур', 'Толя', 'Борис', 'Гриша', 'Женя'];
var rand = Math.floor(Math.random() * arr.length);

let progression = new ArithmeticProgression(a, b);

NAtask.setTask({
	text: sklonlxkand(arr[rand]).de + ' надо решить ' + chislitlx(progression.summa(n), 'задача', 'v') +  
		'. Он решает на одно и то же количество задач больше по сравнению с предыдущим днем.' +
		' Известно, что за первый день ' + arr[rand] + ' решил ' + chislitlx(a, 'задача', 'v') +
		'. Определите, сколько задач решил ' + arr[rand] + ' в последний день,' +  
		' если со всеми задачами он справился за ' + chislitlx(n, 'день') + '.',

	answers: progression.member(n),
});
//Сергей Алендарь
