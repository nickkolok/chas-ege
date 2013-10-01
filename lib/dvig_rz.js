//Блок из функций, которые обеспечивают движок расчётных задач
//{{

function svVel(a){
/*Массив a состоит из элементов-объектов следующей структуры:
	vel: название величины
	rod: род существительного
		0: мужской
		1: женский
		2: средний
		3: только во множественном числе
	bkv: буква, которой обозначается величина. Если её нет, не упоминается.
	zna: значение величины
	nmn: размерность величины. Опять же, если не указано - лесом.
	nah: можно ли требовать найти величину
	pre: префикс, то есть то, что пишется перед названием величины
	utv: альтернативное величине утвердительное высказывание
	vpr: альтернативный вопрос
	vin: величина в винительном падеже. Если равна 1, то именительный и винительный падежи совпадают. Если не определена, то конструкции, где нужен в. п., избегаются.
*/
	var b=a.slice();
	b.shuffle();
	for(;!b[0].nah;b.shuffle());
	var rez='';//Сюда будет записан результат
	var c=b[0];
	for(var i1=b.length-1;i1>0;i1--)
		b[i1]=nazvVel(b[i1]);
	
	b.splice(0,1);
	var d=sluchch(1,[b.length,3].minE());
	var f=[c.zna];//В этом массиве будут фразы.
	f[1]=voprVel(c,sosiskaVel(b.splice(0,d)));
	for(;b.length;){
		var st=b.splice(0,1);
		var sk=sosiskaVel(b.splice(0,sluchch(2)));
		f.push((om.utochn.iz()+st+(sk?om.utochn2.iz()+sk:'')+'. ').plusminus().toZagl());
	}
	return f;
}

function nazvVel(a){
	if(a.utv)
		return a.utv;
	if(!a.rod)
		a.rod=0;
	
	var rez=(
		a.vel+' '+
		(a.bkv?
			'$'+a.bkv+'=':
			[om.ravno,om.sostavl].iz()[a.rod]+' '
		)+
		(a.pre?
			a.pre:
			''
		)+
		a.zna+
		(a.nmn?
			(a.bkv?
			'~':
			' '
			)
			+a.nmn:
			''
		)+
		(a.bkv?
			'$':
			''
		)
	);
//	console.log(rez);
	return rez;
}

function sosiskaVel(a){
	if(!a.length)
		return '';

	for(var rez=''+a.splice(0,1);a.length;)
		rez+=om.utochn2.iz()+a.splice(0,1);

	console.log(rez);
	return rez;
}

function voprVel(a,t1){
	var rez='';
	t1=t1.trim();
	t1=t1?', если '+t1:'';
	a.rod=a.rod?a.rod:0;
	if(a.vpr){
		rez=a.vpr.toZagl()+t1+'? '+
		(
		!!a.nmn?
		['ответ',otvdayte.iz()].shuffle().join(' ').toZagl()+' в '+a.nmn+'.':
		''		
		);
		return rez;
	}
	var bkv=(' $'+a.bkv+'$').esli(a.bkv);
	var rez=[
			'Чему '+om.ravno[a.rod]+' '+a.vel+bkv+t1+'? '+
			(
				a.nmn?
				'Ответ выразите в '+a.nmn+'.'.esli(a.nmn.posl()!='.')+' ':
				''
			)
		,
			'Чему '+om.ravno[a.rod]+' '+a.vel+bkv+
			(
				a.nmn?
				', '+lx['выраженный'].i[a.rod]+' в '+a.nmn:
				''
			)+
			t1+'? '
		,
			'Сколько '+(a.nmn+' ').esli(a.nmn)+om.sostavl[a.rod]+' '+a.vel+bkv+t1+'? '
		,
	];
	if(a.vin==1)
		a.vin=a.vel;
	
	if(a.vin){
		rez.push(
			om.otvnaydite.iz().toZagl()+' '+a.vin+bkv+
			(
				a.nmn?
				', '+lx['выраженный'].v[a.rod]+'в '+a.nmn:
				''
			)
			+t1+'.'
		);
		rez.push(
			om.otvnaydite.iz().toZagl()+' '+a.vin+bkv+t1+'. '+
			(
				a.nmn?
				'Ответ выразите в '+a.nmn+'. ':
				''
			)
		);
	}
	return rez.iz();
}

//}}
