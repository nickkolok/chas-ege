const createObjectsWithWeights = (objects) =>
	objects.map(([name, weightFunction]) => [name, weightFunction()]);

// Определяем объекты с их весами
let verySmallObjects = createObjectsWithWeights([
	['таблетки лекарства', () => sluchch(10, 40)],
	['комара', () => sluchch(15, 50)],
	['мухи', () => sluchch(25, 70)],
	['божьей коровки', () => sluchch(35, 90)],
	['капли воды', () => sluchch(45, 100)],
	['иголки', () => sluchch(70, 150)],
	['пуговицы', () => sluchch(100, 300)],
	['пчелы', () => sluchch(150, 350)],
	['шмеля', () => sluchch(200, 500)]
]);

let smallObjects = createObjectsWithWeights([
	['монеты', () => sluchch(5, 10)],
	['малины', () => sluchch(15, 30)],
	['клубники', () => sluchch(20, 50)],
	['вилки', () => sluchch(50, 80)],
	['яйца', () => sluchch(50, 70)],
	['ножниц', () => sluchch(100, 200)],
	['птицы', () => sluchch(150, 900)],
	['компьютерной мыши', () => sluchch(85, 150)],
	['картофеля', () => sluchch(150, 350)],
	['яблока', () => sluchch(150, 250)],
	['помидора', () => sluchch(150, 250)],
	['моркови', () => sluchch(50, 150)],
	['огурца', () => sluchch(100, 300)]
]);

let mediumObjects = createObjectsWithWeights([
	['капусты', () => sluchch(1, 3)],
	['домашней кошки', () => sluchch(3, 11)],
	['коляски', () => sluchch(10, 20)],
	['коробки с книгами', () => sluchch(5, 20)],
	['собаки', () => sluchch(3, 50)],
	['телевизора', () => sluchch(10, 50)],
	['стиральной машины', () => sluchch(50, 90)],
	['скамейки', () => sluchch(30, 150)],
	['кресла', () => sluchch(10, 40)],
	['холодильника', () => sluchch(40, 200)],
	['человека', () => sluchch(45, 120)],
	['книжного шкафа', () => sluchch(45, 110)]
]);

let bigObjects = createObjectsWithWeights([
	['машины', () => sluchch(1, 2, 0.1)],
	['фонарного столба', () => sluchch(1, 3, 0.1)],
	['бегемота', () => sluchch(1.5, 3.5, 0.1)],
	['трактора', () => sluchch(1, 3.5, 0.1)],
	['носорога', () => sluchch(0.8, 2, 0.1)],
	['индийского слона', () => sluchch(3.5, 5.5, 0.1)],
	['касатки', () => sluchch(3, 6, 0.1)],
	['грузовика', () => sluchch(3, 8, 0.1)],
	['бульдозера', () => sluchch(6, 15, 0.1)],
	['африканского слона', () => sluchch(4, 6.5, 0.1)],
	['автобуса', () => sluchch(5, 15, 0.1)],
	['фуры', () => sluchch(15, 25, 0.1)],
	['гусеничного трактора', () => sluchch(3, 10, 0.1)],
	['танка', () => sluchch(15, 60, 0.1)],
	['синего кита', () => sluchch(70, 150, 0.1)],
	['самолёта', () => sluchch(15, 550, 0.1)]
]);

// Индексы для случайных объектов
let indexObject = [0, 1, 2, 3];
let indexWeight = [0, 1, 2, 3];
indexObject.shuffle();
indexWeight.shuffle();

let weightWord = 'масса';

// Генерация случайных индексов
let sluchIndexVerySmallObject = sluchch(0, verySmallObjects.length - 1);
let sluchIndexSmallObject = sluchch(0, smallObjects.length - 1);
let sluchIndexMediumObject = sluchch(0, mediumObjects.length - 1);
let sluchIndexBigObject = sluchch(0, bigObjects.length - 1);

// Получение весов
let weightMg = verySmallObjects[sluchIndexVerySmallObject][1];
let weightG = smallObjects[sluchIndexSmallObject][1];
let weightKg = mediumObjects[sluchIndexMediumObject][1];
let weightT = bigObjects[sluchIndexBigObject][1];

// Формируем массивы объектов и весов
let arrayObjects = [
	verySmallObjects[sluchIndexVerySmallObject][0],
	smallObjects[sluchIndexSmallObject][0],
	mediumObjects[sluchIndexMediumObject][0],
	bigObjects[sluchIndexBigObject][0]
];

let arraySluchObjects = indexWeight.map(index => arrayObjects[index]);

// Формируем массив ответов
let arrayAnswer = [];
for (let i = 0; i < 4; i++) {
	arrayAnswer[i] = indexObject.indexOf(indexWeight[i]) + 1;
}

let arrayWeight = [
	weightMg + ' мг',
	weightG + ' г',
	weightKg + ' кг',
	parseFloat((weightT).toFixed(1)) + ' т'
];

let answer = `A) ${arrayAnswer[0]} B) ${arrayAnswer[1]} C) ${arrayAnswer[2]} D) ${arrayAnswer[3]}`;

NAtask.setTask({
	text: ` A) ${weightWord} ${arraySluchObjects[0]} B) ${weightWord} ${arraySluchObjects[1]} ` +
		`C) ${weightWord} ${arraySluchObjects[2]} D) ${weightWord} ${arraySluchObjects[3]} $$ $$ ` +
		`1) ${arrayWeight[indexObject[0]]} 2) ${arrayWeight[indexObject[1]]} ` +
		`3) ${arrayWeight[indexObject[2]]} 4) ${arrayWeight[indexObject[3]]}`,
	answers: answer,
});

//506352

