(function(){

	var t=sl(om.eda.length-1);
	var c=sl(1,10);
	var a=sl(3,9);
	var b=sl(1,9);
	
	NAtask.setTask({
		text : om.eda[t].toZagl()+' стоит '+chislitlx(a,'рубль')+' '+b+'0 копеек. '+
		'Какое наибольшее число '+sklonlxkand(om.eda[t]).rm+' можно купить на '+c+'0 рублей?',
		answers : (c*100/(10*a+b)).floor().ts(),
	});
})();
//Обзад 26616
