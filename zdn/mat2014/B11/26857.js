(function(){
	NAinfo.requireApiVersion(0, 0);
	var c = sluchch(2, 10);
	var b = sluchch(2, 20);
	var y = sluchch(1, 10);
	var x = '\\log_{\\sqrt'+( c != 2 ? '['+c+']' : '')+'{'+b+'}}'+
		'{'+b+'}' + ( y == 1 ? '' : '^{'+y+'}');
	NAtask.setTask({
		text: 'Найдите значение выражения $$'+x+'$$',
		answers: c*y,
	},{
		tags: {
			log:1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26857
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258
