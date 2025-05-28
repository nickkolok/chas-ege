const createObjectsWithWeights = (objects) =>
	objects.map(([name, ...sluchArgs]) => [name, sluchch(...sluchArgs)]);

let verySmallObjects = createObjectsWithWeights([
	['таблетки \\ лекарства', 10, 40],
	['комара', 15, 50],
	['мухи', 25, 70],
	['божьей \\ коровки', 35, 90],
	['капли \\ воды', 45, 100],
	['иголки', 70, 150],
	['пуговицы', 100, 300],
	['пчелы', 150, 350],
	['шмеля', 200, 500]
]);

let smallObjects = createObjectsWithWeights([
	['монеты', 5, 10],
	['малины', 15, 30],
	['клубники', 20, 50],
	['вилки', 50, 80],
	['яйца', 50, 70],
	['ножниц', 100, 200],
	['птицы', 150, 900],
	['компьютерной \\ мыши', 85, 150],
	['картофеля', 150, 350],
	['яблока', 150, 250],
	['помидора', 150, 250],
	['моркови', 50, 150],
	['огурца', 100, 300]
]);

let mediumObjects = createObjectsWithWeights([
	['капусты', 1, 3],
	['домашней \\ кошки', 3, 11],
	['коляски', 10, 20],
	['коробки \\ с \\ книгами', 5, 20],
	['собаки', 3, 50],
	['телевизора', 10, 50],
	['стиральной \\ машины', 50, 90],
	['скамейки', 30, 150],
	['кресла', 10, 40],
	['холодильника', 40, 200],
	['человека', 45, 120],
	['книжного \\ шкафа', 45, 110]
]);

let bigObjects = createObjectsWithWeights([
	['машины', 1, 2, 0.1],
	['фонарного \\ столба', 1, 3, 0.1],
	['бегемота', 1.5, 3.5, 0.1],
	['трактора', 1, 3.5, 0.1],
	['носорога', 0.8, 2, 0.1],
	['индийского \\ слона', 3.5, 5.5, 0.1],
	['касатки', 3, 6, 0.1],
	['грузовика', 3, 8, 0.1],
	['бульдозера', 6, 15, 0.1],
	['африканского \\ слона', 4, 6.5, 0.1],
	['автобуса', 5, 15, 0.1],
	['фуры', 15, 25, 0.1],
	['гусеничного \\ трактора', 3, 10, 0.1],
	['танка', 15, 60, 0.1],
	['синего \\ кита', 70, 150, 0.1],
	['самолёта', 15, 550, 0.1]
]);

let indexObject = [0, 1, 2, 3];
let indexWeight = [0, 1, 2, 3];
indexObject.shuffle();
indexWeight.shuffle();

let weightWord = 'масса';

let sluchIndexVerySmallObject = sluchch(0, verySmallObjects.length - 1);
let sluchIndexSmallObject = sluchch(0, smallObjects.length - 1);
let sluchIndexMediumObject = sluchch(0, mediumObjects.length - 1);
let sluchIndexBigObject = sluchch(0, bigObjects.length - 1);

let weightMg = verySmallObjects[sluchIndexVerySmallObject][1];
let weightG = smallObjects[sluchIndexSmallObject][1];
let weightKg = mediumObjects[sluchIndexMediumObject][1];
let weightT = bigObjects[sluchIndexBigObject][1];

let arrayObjects = [
	verySmallObjects[sluchIndexVerySmallObject][0],
	smallObjects[sluchIndexSmallObject][0],
	mediumObjects[sluchIndexMediumObject][0],
	bigObjects[sluchIndexBigObject][0]
];

let arraySluchObjects = indexWeight.map(index => arrayObjects[index]);

let arrayAnswer = [];
for (let i = 0; i < 4; i++) {
	arrayAnswer[i] = indexObject.indexOf(indexWeight[i]) + 1;
}

let arrayWeight = [
	weightMg + ' мг',
	weightG + ' г',
	weightKg + ' кг',
	weightT.ts() + ' т'
];

let answer = arrayAnswer[0] + '' + arrayAnswer[1] + '' + arrayAnswer[2] + '' + arrayAnswer[3];

NAtask.setTask({
	text: ` Установите соответствие между величинами и их возможными значениями: ` +
		`к каждому элементу первого столбца подберите соответствующий элемент из второго столбца.` +
		`$$ A) \\ ${weightWord} \\ ${arraySluchObjects[0]} \\\\ B) \\ ${weightWord} \\ ${arraySluchObjects[1]} \\\\ ` +
		`C) \\ ${weightWord} \\ ${arraySluchObjects[2]} \\\\ D) \\ ${weightWord} \\ ${arraySluchObjects[3]} \\\\~\\\\ ` +
		`1) \\ ${arrayWeight[indexObject[0]]} \\\\ 2) \\ ${arrayWeight[indexObject[1]]} \\\\ ` +
		`3) \\ ${arrayWeight[indexObject[2]]} \\\\ 4) \\ ${arrayWeight[indexObject[3]]} $$`,
	answers: answer,
});

//506352
