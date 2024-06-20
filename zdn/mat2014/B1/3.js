(function(){

	var t=sluchch(0,chaslib.sets.ships.length-1);
	var c=sluchch(10,100);
	var a=sluchch(100,999);
	var b=sluchch(10,100);

	NAtask.setTask({
		text : chaslib.sets.ships[t].toZagl()+' перевозит '+a+' пассажиров и '+b+' членов экипажа. '+
		'В целях безопасности на '+chaslib.sets.shipsPrepositional[t]+
		' размещены спасательные шлюпки, каждая из которых вмещает '+c+' человек. '+
		'Какое наименьшее количество шлюпок должно быть на '+chaslib.sets.shipsPrepositional[t]+'?',
		answers : ((a+b)/c).ceil(),
	});
})();
//Обзад 26617
