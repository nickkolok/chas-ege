(function() {
	lx_declareClarifiedPhrase('площадь','поверхности');

	NAtask.setDilationTask({
		measurements: [
			{
				name: 'ребро',
				primary: true,
				power: 1,
			},
			{
				name: 'объём',
				power: 3,
			},
			{
				name: 'площадь поверхности',
				power: 2,
			},
		].iz(2),
		figureName: 'куб',
		dilationCoefficient: sl(2,10),
		authors: ['Николай Авдеев'],
	});
})();
//27168
