(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(1,29);//время наполнения (разница)
		let x = sl(a+1,100);//время наполнения 2й трубы (ответ)
		let b = x*(x+a)/(2*x+a);//время заполнения (вместе)
		genAssert(b.isZ(),'Время слишком дробное: '+b);

		let tub_naz = sklonlxkand(['труба','шланг','насос'].iz());
		let napoln = {v:sl(0,2),
			ed:['заполняет','опустошает','наполняет'],
			mn:['заполняют','опустошают','наполняют']
		};
		let rez = sklonlxkand(['резервуар','бассейн','бак','цистерна','бойлер','ёмкость','бочка'].iz());
		let v=sl1();
		let tub_num=['перв'+['ый','ая','ое','ые'][tub_naz.rod],'втор'+['ой','ая','ое','ые'][tub_naz.rod]];
		let dol=[['медленнее','дольше'].iz(),'быстрее'];

		NAtask.setTask({
			text: tub_num[v].toZagl()+' '+tub_naz.ie+' '+napoln.ed[napoln.v]+' '+rez.ve+' на '+chislitlx(a, 'минута','r')+' '+dol[v]+', чем '+tub_num[1-v]+'. '+
				['об'+['а','е','а',''][tub_naz.rod]+' '+tub_naz.re,'работая одновременно,'].shuffle().join(', ').toZagl().replace(',,',',')+' '+
				napoln.mn[napoln.v] + ' эт'+['от','у','о','ти'][rez.rod] +' же '+rez.ve+' за '+chislitlx(b, 'минута','r')+'. '+
				'За сколько минут '+napoln.ed[napoln.v]+' эт'+['от','у','о','ти'][rez.rod] +' '+rez.ve+' од'+['ин','на','но','ни'][tub_naz.rod] +
				' втор'+['ой','ая','ое','ые'][tub_naz.rod]+' '+tub_naz.ie+'?',
			answers:  x,
			authors: ['Aisse-258']
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000000);
})();

/*РешуЕГЭ: 99619: 119153 513622 514184 119077
    119079 119081 119083 119085 119087 119089
    119091 119093 119095 119097 119099 119101
    119103 119105 119107 119109 119111 119113
    119115 119117 119119 119121 119123 119125
    119127 119129 119131 119133 119135 119137
    119139 119141 119143 119145 119147 119149
    119151*/

