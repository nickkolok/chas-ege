let indexObject = [0, 1, 2, 3];
let indexMass = [0, 1, 2, 3];
indexObject.shuffle();
indexMass.shuffle();
let massWord = 'масса';
let massMg;
let massG;
let massKg;
let massT;
let verySmallObject = ['таблетки лекарства', 'комара', 'мухи', 'божьей коровки', 'капли воды', 'иголки', 'пуговицы'];
let smallObject = ['монеты', 'малины', 'клубники', 'вилки', 'яйца', 'ножниц', 'птицы', 'компьютерной мыши', 'картофеля'];
let mediumObject = ['коляски', 'собаки', 'кресла', 'холодильника', 'человека', 'шкафа'];
let bigObject = ['машины', 'морского ската', 'бегемота', 'носорога', 'индийского слона', 'касатки', 'грузовика',
	'африканского слона', 'автобуса'
];

let sluchIndexVerySmallObject = sluchch(0, verySmallObject.length - 1);
let sluchIndexSmallObject = sluchch(0, smallObject.length - 1);
let sluchIndexMediumObject = sluchch(0, mediumObject.length - 1);
let sluchIndexBigObject = sluchch(0, bigObject.length - 1);

massMg = (sluchIndexVerySmallObject + 1) * sluchch(10, 20);
massG = Math.pow(sluchIndexSmallObject + 2, 2) + sluchch(1, 9);
massKg = (sluchIndexMediumObject + 1) * sluchch(10, 15);
massT = (sluchIndexBigObject + 1) + (sluchch(0, 0.9, 0.1));

let arrayObjects = [verySmallObject[sluchIndexVerySmallObject], smallObject[sluchIndexSmallObject], mediumObject[sluchIndexMediumObject], bigObject[sluchIndexBigObject]];
let arraySluchObjects = indexMass.map(index => arrayObjects[index]);

let arrayAnswer = [];
for (let i = 0; i < 4; i++) {
	for (let j = 0; j < 4; j++) {
		if (indexMass[i] == indexObject[j]) {
			arrayAnswer[i] = j;
		}
	}
}

arrayAnswer = arrayAnswer.map(value => value + 1);

let arrayMass = [massMg + ' мг', massG + ' г', massKg + ' кг', massT + ' т'];

let answer = 'A) ' + arrayAnswer[0] + ' B) ' + arrayAnswer[1] + ' C) ' + arrayAnswer[2] + ' D) ' + arrayAnswer[3]

NAtask.setTask({
	text: ' ' + ' A) ' + massWord + ' ' + arraySluchObjects[0] + ' B) ' + massWord + ' ' + arraySluchObjects[1] + ' C) ' + massWord + ' ' + arraySluchObjects[2] +
		' D) ' + massWord + ' ' +arraySluchObjects[3] + '$$ $$' +
		'1) ' + ' ' + arrayMass[indexObject[0]] + ' 2) ' + ' ' + arrayMass[indexObject[1]] + ' 3) ' + 
		' ' + arrayMass[indexObject[2]] + ' 4) ' + ' ' + arrayMass[indexObject[3]],
	answers: answer,
});

//506352
