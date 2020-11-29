(function(){
	NAinfo.requireApiVersion(0, 0);
	var base = slKrome([1], 0.1, 100, 0.1);
	var c = sluchch(2, 20);
	var argpower = [1, 2, 4].iz()
	var b = c.pow(argpower);
	var logbase = '\\log_{'+base.ts()+'}';
	var sqrtpower = [2,4,5,10,20,25,100].iz();
	var sqrttex = '\\sqrt' +
		(sqrtpower == 2 ? '' : '['+sqrtpower+']') +
		'{'+c+'}';


	NAtask.setTask({
		text: 'Найдите значение выражения $$' +
			'\\frac{' + logbase + sqrttex + '}{' + logbase + '{' + b + '}}' +
			'.$$',
		answers: (1/sqrtpower/argpower).ts(),
	},{
		tags: {
			log:1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26896
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258
