let indexObject = [0, 1, 2, 3];
let indexMass = [0, 1, 2, 3];
indexObject.shuffle();
indexMass.shuffle();
let massWord = 'масса';
let verySmallObject = [
  ['таблетки лекарства', sluchch(10, 40)],
  ['комара', sluchch(15, 50)],
  ['мухи', sluchch(25, 70)],
  ['божьей коровки', sluchch(35, 90)],
  ['капли воды', sluchch(45, 100)],
  ['иголки', sluchch(70, 150)],
  ['пуговицы', sluchch(100, 300)],
  ['пчелы', sluchch(150, 350)],
  ['шмеля', sluchch(200, 500)]
  ];
let smallObject = [
  ['монеты', sluchch(5, 10)],
  ['малины', sluchch(15, 30)],
  ['клубники', sluchch(20, 50)],
  ['вилки', sluchch(50, 80)],
  ['яйца', sluchch(50, 70)],
  ['ножниц', sluchch(100, 200)],
  ['птицы', sluchch(150, 900)],
  ['компьютерной мыши', sluchch(85, 150)],
  ['картофеля', sluchch(150, 350)],
  ['яблока', sluchch(150, 250)],
  ['помидора', sluchch(150, 250)],
  ['моркови', sluchch(50, 150)],
  ['огурца', sluchch(100, 300)]
  ];
let mediumObject = [
  ['капусты', sluchch(1, 3)],
  ['домашней кошки', sluchch(3, 11)],
  ['коляски', sluchch(10, 20)],
  ['собаки', sluchch(3, 50)],
  ['стиральной машины', sluchch(50, 90)],
  ['телевизора', sluchch(10, 50)],
  ['скамейки', sluchch(30, 150)],
  ['коробки с книгами', sluchch(5, 20)],
  ['кресла', sluchch(10, 40)],
  ['холодильника', sluchch(20, 200)],
  ['человека', sluchch(45, 120)],
  ['книжного шкафа', sluchch(15, 110)]
  ];
let bigObject = [
  ['машины', sluchch(1, 2, 0.1)],
  ['фонарного столба', sluchch(1, 3, 0.1)],
  ['бегемота', sluchch(1.5, 3.5, 0.1)],
  ['трактора', sluchch(1, 3.5, 0.1)],
  ['носорога', sluchch(0.8, 2, 0.1)],
  ['индийского слона', sluchch(3.5, 5.5, 0.1)],
  ['касатки', sluchch(3, 6, 0.1)],
  ['грузовика', sluchch(3, 8, 0.1)],
  ['бульдозера', sluchch(6, 15, 0.1)],
  ['африканского слона', sluchch(4, 6.5, 0.1)],
  ['автобуса', sluchch(5, 15, 0.1)],
  ['фуры', sluchch(15, 25, 0.1)],
  ['гусенечного трактора', sluchch(3, 10, 0.1)],
  ['танка', sluchch(15, 60, 0.1)],
  ['синего кита', sluchch(70, 150, 0.1)],
  ['самолёта', sluchch(15, 550, 0.1)]
];

let sluchIndexVerySmallObject = sluchch(0, verySmallObject.length - 1);
let sluchIndexSmallObject = sluchch(0, smallObject.length - 1);
let sluchIndexMediumObject = sluchch(0, mediumObject.length - 1);
let sluchIndexBigObject = sluchch(0, bigObject.length - 1);

let massMg = verySmallObject[sluchIndexVerySmallObject][1]; 
let massG = smallObject[sluchIndexSmallObject][1];
let massKg = mediumObject[sluchIndexMediumObject][1];
let massT = bigObject[sluchIndexBigObject][1];

let arrayObjects = [verySmallObject[sluchIndexVerySmallObject][0], smallObject[sluchIndexSmallObject][0], mediumObject[sluchIndexMediumObject][0], bigObject[sluchIndexBigObject][0]];
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

