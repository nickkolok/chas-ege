(function(){

	var a=sluchch(30,99);
	var t1=sluchch(0,om.denned.ie.length-1);
	var b=sluchch(2,5);
	var c=sluchch(1,b);
	var d=sluchch(2*a,999);
	var t2=sklonlxkand(om.eda.concat(om.meltov.ie).iz());
	
	NAtask.setTask({
		text : t2.ie.toZagl()+' стоит '+chislitlx(a,'рубль')+'. '+
			om.denned.pg['в'][t1].toZagl()+' '+om.denned.ve[t1]+' в магазине действует специальное предложение: '+
			'заплатив за '+chislitlx(b,t2)+', покупатель получает '+(b+c)+' ('+c+' - в подарок). '+
			'Сколько '+t2.rm+' можно получить на '+chislitlx(d,'рубль')+ ' '+om.denned.pg['в'][t1]+' '+om.denned.ve[t1]+'?',
		answers : (d/a).floor()+(d/a/b).floor()*c,
	});
})();
//Обзад 26626
