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



let a = sluchch(2, 10);
let b = sluchch(2, 4);
let n = sluchch(10, 24);
let n2 = n - sluchch(5, 7);
var arr = ['Лена', 'Ира', 'Настя', 'Маша', 'Катя', 'Вера', 'Саша', 'Оля', 'Даша', 'Тоня', 'Аня', 'Ира', 'Женя'];
var rand = Math.floor(Math.random() * arr.length);

let progression = new ArithmeticProgression(a, b);

NAtask.setTask({
	text: sklonlxkand(arr[rand]).de +  ' надо подписать ' + chislitlx(progression.summa(n), 'открытка', 'v') +  
		'. Ежедневно она подписывает на одно и то же количество открыток больше по сравнению с предыдущим днем. ' +
		'Известно, что за первый день ' + arr[rand] +  ' подписала ' + chislitlx(a, 'открытка', 'v') +  '. ' +
		'Определите, сколько открыток было подписано за ' + om.porchisl[n2].i[0] +  
		' день, если вся работа была выполнена за ' + chislitlx(n, 'день') +  
		'.',

	answers: progression.member(n2),
});