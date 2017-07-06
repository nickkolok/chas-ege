(function() {

NAinfo.requireApiVersion(0, 2);

var v1 = sl1();
var right = ['cin >> a >> b;','cout << a << b;'];

chas2.task.setTask({
	text: 'Как правильно ' +
		[
			'ввести с клавиатуры',
			'вывести на экран',
		][v1] +
		' значения двух переменных <b>a</b> и <b>b</b>:<br/>',
	answers:  [
		right[v1],
	],
	wrongAnswers: [
		right[1-v1],
		'cin >> a, b;',
		'cin >> a && b;',
		'cin >> a & b;',
		'cin >> a >> b >> endl;',
		'cin << a, b;',
		'cin(a, b);',
		'cin{a, b};',
		'cin[a, b];',
		'cin&lt;a, b&gt;;',
		'cin << a && b;',
		'cin << a & b;',
		'cin << a << b << endl;',
		'a ' + ['<<','>>'].iz() + ' ' + ['cin','cout'].iz() + ['<<','>>'].iz() + ' b;',
		'cout >> a, b;',
		'cout >> a && b;',
		'cout >> a & b;',
		'cout >> a >> b >> endl;',
		'cout << a, b;',
		'cout << a && b;',
		'cout << a & b;',
		'cout << a << b << endl;',
	],
});
AtoB();

})();

