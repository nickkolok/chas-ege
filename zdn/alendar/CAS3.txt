class GeometricProgression {
	constructor(first, factor) {
		this.first = first;
		this.factor = factor;
		this.nmember = 0;

	}

	member(nmember) {
		this.nmember = nmember;
		return this.first * Math.pow(this.factor, this.nmember - 1);
	}

	summa(nmember) {
		this.nmember = nmember;
		if (this.factor < 0) {
			throw new Error("Нельзя найти сумму знакопеременной прогрессии!");
		}
		return (this.first * (Math.pow(this.factor, this.nmember) - 1)) / (this.factor - 1);
	}

	infinitySumma() {
		if (this.factor < 0) {
			throw Error;
		}
		if (this.factor > 1) {
			throw new Error("Прогрессия не является бесконечной!");
		}
		return this.first / (1 - this.factor);
	}

}
let a;
let b;
let n = -1;
let str = prompt('Введите первый член прогрессии.', '');
a = Number(str);
str = prompt('Введите множитель прогрессии.', '');
b = Number(str);
while (n <= 0) {
	str = prompt('Введите номер члена прогрессии. Число должно быть больше нуля!', '');
	n = Number(str);
}

let progress = new GeometricProgression(a, b);

console.log(progress.member(n));
try {
	console.log(progress.summa(n));
	console.log(progress.infinitySumma());
} catch (error) {
	if (error.name == "Error") {
		console.log(error.message);
	} else {
		throw error;
	}
}
