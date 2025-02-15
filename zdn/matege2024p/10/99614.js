(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(1,23.99,0.01);//время выполнения 1го рабочего
		let b = sl(1,23.99,0.01);//время выполнения 2го рабочего
		genAssert(a!=b,'Время выполнения одинаковое: '+a+'='+b);
		let x = a*b/(a+b);//время работы вдвоем
		genAssertZ1000(x,'Время слишком дробное: '+x);

		let rab = sklonlxkand(['рабочий','сотрудник','работник','мастер'].iz());
		let zakaz;
		if (rab.ie.slice(0,4)=='рабо') {
			zakaz = sklonlxkand(['заказ','задание'].iz());
		} else {
			zakaz = sklonlxkand(['заказ','задание','работа'].iz());
		}
		let rab_num=[['Первый','Один'],['второй','другой']];
		let v=sl1();
		let sdel={v:sl(0,3),
			inf_e:['сделать','выполнить','завершить','исполнить'],
			bud_m:['сделают','выполнят','завершат','исполнят']
		};

		NAtask.setTask({
			text: rab_num[0][v]+' '+rab.ie+' может '+sdel.inf_e[sdel.v]+' '+zakaz.ve+' за '+chislitlx(a, 'час','v')+', а '+rab_num[1][v]+' – за '+chislitlx(b, 'час','v')+'. '+
				'За сколько часов '+sdel.bud_m[sdel.v]+' '+zakaz.ve+' оба '+(rab.ie=='рабочий'?rab.rm:rab.re)+', работая '+['вместе','вдвоём','сообща'].iz()+'?',
			answers: x,
			authors: ['Aisse-258']
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 200000);
})();

/*РешуЕГЭ: 99614: 118273 118285 118293 118275
	118277 118279 118281 118283 118287 118289 118291*/
