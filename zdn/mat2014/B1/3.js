(function(){
	
	var c=sluchch(10,100);
	var a=sluchch(100,999);
	var b=sluchch(10,100);
	
	var ship = sklonlxkand(chaslib.sets.ships.iz());

	NAtask.setTask({
		text : ship.ie.toZagl()+' перевозит '+a+' пассажиров и '+b+' членов экипажа. '+
		'В целях безопасности на '+ship.pe+
		' размещены спасательные шлюпки, каждая из которых вмещает '+c+' человек. '+
		'Какое наименьшее количество шлюпок должно быть на '+ship.pe+'?',
		answers : ((a+b)/c).ceil(),
		authors: ['Николай Авдеев', 'dev-null', 'Суматохина Александра'],
	});
})();
//Обзад 26617
