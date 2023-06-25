class GeometricProgression {
	constructor(first, factor) {
		this.first = first;
		this.factor = factor;
		this.nmember = 0;

	}

	member(nmember) {
		this.nmember = nmember;
		return (this.first * Math.pow(this.factor, this.nmember - 1)).toFixed(0);
	}

}

let b1 = sluchch(2, 3);
let a1 = sluchch(2000, 7000, 500);
n1 = sluchch(6, 9);

let b2 = b1 + sluchch(1, 2);
let a2 = a1 + sluchch(500, 3000, 500);
n2 = n1 - sluchch(2, 3);

let progression1 = new GeometricProgression(a1, b1);
let progression2 = new GeometricProgression(a2, b2);

NAtask.setTask({
	text: 'Компания «Альфа» начала инвестировать средства в перспективную отрасль в 2001 году, ' +  
		'имея капитал в размере ' + a1 + ' долларов. ' +
		'Каждый год, начиная с 2002 года, она получала прибыль, которая составляла ' + (b1 - 1) +  
		'00% от капитала предыдущего года. А компания «Бета» начала инвестировать средства в другую отрасль в 200' + n2 +
		' году, имея капитал в размере ' + a2 + ' долларов, и, начиная с 200' + (n2 + 1) +
		' года, ежегодно получала прибыль, составляющую ' + (b2 - 1) + '00% от капитала предыдущего года.' +
		' На сколько долларов капитал одной из компаний был больше капитала другой к концу 200' + n1 +
		' года, если прибыль из оборота не изымалась?',

	answers: Math.abs(progression1.member(n1) - progression2.member(n1 - n2 + 1)),
});
//Сергей Алендарь
