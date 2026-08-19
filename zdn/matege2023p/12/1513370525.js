retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	var n = sl(5,11);
	var S = sl(50,950,10);
	var a = sl(10,S/(n+1)).okrugldo(10);
	var k = sl(2,n-3);
	var r = sl(2,20);

	var checkday = sl(5,25);


	var V = 0;
	for (var i = 1; i <= k; i++) {
		V +=  (1+r/100) * (S-(i-1)*a) - (S-i*a);
	}
	V += (S-k*a)*(1+r/100) - a * (n-(k+1));
	for (var i = k+2; i <= n; i++) {
		V +=  (1+r/100) * a*(n-(i-1)) - a*(n-i);
	}



	if(!(V*1000).isZ()){
		return; // Плохой ответ
	}

	var unknown = [
		['S',S,'Какую сумму планируется взять в кредит?'],
		['r',r,'Найдите $r$.'],
		['V',V,'Найдите общую сумму выплат после полного погашения кредита.'],
		//['V', V-S, 'Сколько тыс. рублей составит переплата?'],
	];

	unknown = unknown.iz();


	var monthNumber = sl(0,11);

	//alert(n + ' ' + monthNumber + ' ' +window.mesiacy.re[monthNumber]+ ' ' + ((n+monthNumber)%12));
	var plans = ['планирует','собирается','хочет','собирает большую стопку документов, чтобы'].iz();
	var text =
		[
			''+checkday+'-го '+window.mesiacy.re[monthNumber]+' планируется взять кредит в банке на сумму ',
			window.profesj.ie.iz().toZagl() + ' ' +window.imenaj.ie.iz() + ' ' + plans + ' ' +checkday+'-го '+window.mesiacy.re[monthNumber]+' взять кредит в банке на сумму ',
		].iz()+
		(unknown[0]=='S'?'$S$':S.ts()) +' тыс. рублей на '+
		(unknown[0]=='n'?'$n$ месяцев': chislitlx(n,'месяц','v'))+
		[
			'. Условия его возврата таковы:',
			' на следующих условиях:'
		].iz()+
		'<br/>'+
		'— 1-го числа каждого месяца долг возрастает на '+(unknown[0]=='r'?'$r\\%$':r+'%')+' по сравнению с концом предыдущего месяца;'+
		'<br/>'+
		'— со 2-го по '+(checkday-1)+'-е число каждого месяца необходимо выплатить часть долга;'+
		'<br/>'+
		'— '+checkday+'-го числа каждого месяца с 1-го по '+k+'-й и с '+(k+2)+'-го по '+n+'-й месяц долг должен быть на '+a.ts()+' тыс. руб. меньше долга на '+checkday+'-е число предыдущего месяца;'+
		'<br/>'+
		'— к '+checkday+'-му '+window.mesiacy.re[(n+monthNumber)%12]+' долг должен быть полностью погашен.'+
		'<br/>';
	if (unknown[0]!='V'){
		text += 'Общая сумма выплат составит '+ V.ts() + ' тыс. рублей. ';
	}
	text += unknown[2];

	NAtask.setTask({
		text,
		answers: unknown[1],
		//analys: '';
	});
	return true;
}, 1000000);
//?
