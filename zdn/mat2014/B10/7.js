(function() {

	var a = sluchch(2, 9);
	var b = sluchch(2, 9);
	var h = sluchch(2, 9);

	var figur = ['прямоугольный треугольник', 'прямоугольник', 'ромб'];
	var vFigur = sluchch(2);
	var koefPl = [0.5, 1, 0.5];
	var nazvOtr = ['второй катет', 'вторая сторона', 'вторая диагональ'];
	var nazvOtrV = ['второй катет', 'вторую сторону', 'вторую диагональ'];
	var nazvOtrRod = [0, 1, 1];

	chas2.task.setCountableTask([{
		vel: nazvOtr[vFigur] + ' основания',
		zna: b,
		nah: 1,
		rod: nazvOtrRod[vFigur],
		vin: nazvOtrV[vFigur],
	}, {
		vel: 'высота призмы',
		zna: h,
		nah: 1,
		rod: 1,
		vin: 'высоту пирамиды',
	}, {
		vel: 'объём призмы',
		zna: a * b * h * koefPl[vFigur],
		nah: 1,
		rod: 0,
		vin: 1
	}, {
		vel: ['первый катет', 'первая сторона', 'первая диагональ'][vFigur],
		zna: a,
		rod: nazvOtrRod[vFigur],
	}, ], {
		preambula: 'Основанием призмы является  ' + figur[vFigur] + '. ',
	});
})();
//Обзад ... 27148 27151
