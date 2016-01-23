(function(){

var t=sluchch(0,om.korabli.ie.length-1);
var c=sluchch(10,100);
var a=sluchch(100,999);
var b=sluchch(10,100);

NAtask.setTask({
	text : om.korabli.ie[t].toZagl()+' перевозит '+a+' пассажиров и '+b+' членов экипажа. '+
	'В целях безопасности на '+om.korabli.pe[t]+
	' размещены спасательные шлюпки, каждая из которых вмещает '+c+' человек. '+
	'Какое наименьшее количество шлюпок должно быть на '+om.korabli.pe[t]+'?',
	answers : ((a+b)/c).ceil(),
});
})();
//Обзад 26617
