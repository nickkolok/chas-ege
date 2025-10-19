const createObjectsWithWeights = (objects) =>
	objects.map(([name, ...sluchArgs]) => [name, sluchch(...sluchArgs)]);

let verySmallObjects = createObjectsWithWeights([
	['пылинки', 1, 5],
	['песчинки', 1, 10],
	['таблетки лекарства', 300, 500],
	['комара', 15, 50],
	['мухи', 25, 70],
	['божьей коровки', 35, 90],
	['капли воды', 10, 100],
	['иголки', 70, 150],
	['пуговицы', 100, 300],
	['пчелы', 150, 350],
	['шмеля', 200, 500]
]).sort((a, b) => a[1] - b[1]);

let smallObjects = createObjectsWithWeights([
	['апельсина', 120, 180],
	['груши', 150, 250], 
	['монеты', 5, 10],
	['малины', 15, 30],
	['клубники', 20, 50],
	['вилки', 50, 80],
	['яйца', 50, 70],
	['ножниц', 100, 200],
	['птицы', 150, 900],
	['компьютерной мыши', 85, 150],
	['картофеля', 150, 350],
	['яблока', 150, 250],
	['помидора', 150, 250],
	['моркови', 50, 150],
	['огурца', 100, 300]
]).sort((a, b) => a[1] - b[1]); 

let mediumObjects = createObjectsWithWeights([
	['коровы', 400, 600], 
	['капусты', 1, 3],
	['курицы', 1, 5],
	['домашней кошки', 3, 11],
	['коляски', 10, 20],
	['коробки с книгами', 5, 30],
	['собаки', 3, 30],
	['телевизора', 10, 50],
	['стиральной машины', 50, 90],
	['скамейки', 30, 150],
	['кресла', 10, 40],
	['холодильника', 45, 200],
	['человека', 45, 120],
	['книжного шкафа', 55, 110]
]).sort((a, b) => a[1] - b[1]);

let bigObjects = createObjectsWithWeights([
	['машины', 1, 2, 0.1],
	['фонарного столба', 1, 3, 0.1],
	['бегемота', 1.5, 3.5, 0.1],
	['трактора', 1, 3.5, 0.1],
	['носорога', 0.8, 2, 0.1],
	['индийского слона', 3.5, 5.5, 0.1],
	['касатки', 3, 6, 0.1],
	['грузовика', 3, 8, 0.1],
	['бульдозера', 6, 15, 0.1],
	['африканского слона', 4, 6.5, 0.1],
	['автобуса', 5, 15, 0.1],
	['фуры', 15, 25, 0.1],
	['гусеничного трактора', 3, 10, 0.1],
	['танка', 15, 60, 0.1],
	['синего кита', 70, 150, 0.1],
	['самолёта', 15, 550, 0.1]
]).sort((a, b) => a[1] - b[1]);

let indexObject = [0, 1, 2, 3];
let indexWeight = [0, 1, 2, 3];
indexObject.shuffle();
indexWeight.shuffle();
let sluchMassG = 0;
let sluchMassKg = 0;

let sluchIndexVerySmallObject = sluchch(0, verySmallObjects.length - 1);
let sluchIndexSmallObject = sluchch(0, smallObjects.length - 1);
let sluchIndexMediumObject = sluchch(0, mediumObjects.length - 1);
let sluchIndexBigObject = sluchch(0, bigObjects.length - 1);

let weightMg = verySmallObjects[sluchIndexVerySmallObject][1];
let weightG = smallObjects[sluchIndexSmallObject][1];
let weightKg = mediumObjects[sluchIndexMediumObject][1];
let weightT = bigObjects[sluchIndexBigObject][1];

let newSluchIndexSmallObject = smallObjects.length - 1 - sl(0,2);
let newSluchIndexMediumObject = mediumObjects.length - 1 - sl(0,2);

if(sluchIndexSmallObject<2 && sl(0,1)){
	weightMg = smallObjects[newSluchIndexSmallObject][1];
	sluchMassG = 1;
}

if(sluchIndexMediumObject<2 && sl(0,1)){
	weightT = mediumObjects[newSluchIndexMediumObject][1];
	sluchMassKg = 1;
}

let arrayObjects = [
	[verySmallObjects[sluchIndexVerySmallObject][0],smallObjects[newSluchIndexSmallObject][0]][sluchMassG],
	smallObjects[sluchIndexSmallObject][0],
	mediumObjects[sluchIndexMediumObject][0],
	[bigObjects[sluchIndexBigObject][0],mediumObjects[newSluchIndexMediumObject][0]][sluchMassKg]
];

let arraySluchObjects = indexWeight.map(index => arrayObjects[index]);
let arrayWeight = [
	weightMg + [' мг', ' г'][sluchMassG],
	weightG + ' г',
	weightKg + ' кг',
	weightT.ts() + [' т', ' кг'][sluchMassKg]
];

let left = arraySluchObjects.map((obj, i) => ({
	expr: `масса ${obj}`,
	solution: arrayWeight[indexWeight[i]]
}));

let right = indexObject.map(i => arrayWeight[i]);

NAtask.setCorrespondenceTask({
	text: `Установите соответствие между величинами и их возможными значениями: к каждому элементу первого столбца подберите соответствующий элемент из второго столбца.`,
	leftHeader: 'Величины',
	rightHeader: 'Значения',
	left,
	right,
	postText: '',
	autoLaTeXLeft: false,
	autoLaTeXRight: false
});
//506352
