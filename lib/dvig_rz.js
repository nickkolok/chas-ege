'use strict';
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
	nev: неверный вариант ответа (для А-части)
*/

	//Проверка на наличие nah вообще (да, случалось!)
	for(var i3=0,flNah=0;i3<a.length;i3++){
		if(a[i3].nah){
			flNah=1;
			break;
		}
	}
	if(!flNah)
		throw new Error("Движок расчётных задач: ни одну из переданных величин нельзя требовать найти (ошибка nah)");
	
	var b=a.slice();
	b.shuffle();
	for(;!b[0].nah;b.shuffle()){};
	var rez='';//Сюда будет записан результат
	var c=b[0];
	for(var i1=b.length-1;i1>0;i1--)
		b[i1]=nazvVel(b[i1]);
	
	b.splice(0,1);
	var d=sluchch(1,[b.length,3].minE());
	var f=[c.zna];//В этом массиве будут фразы.
	f.wrongAnswers=c.nev;
	f[1]=voprVel(c,sosiskaVel(b.splice(0,d)));
	for(;b.length;){
		var st=b.splice(0,1);
		var sk=sosiskaVel(b.splice(0,sluchch(2)));
		f.push((om.utochn.iz()+st+(sk?om.utochn2.iz()+sk:'')+'. ').plusminus().toZagl());
	}
	
	//Поддержка передачи результата напрямую в NAtask.setTask()
	var tempArrayForText=f.slice();
	tempArrayForText.splice(0,1);
	f.answers=f[0];
	f.text=tempArrayForText.shuffle().soed();
//		Сомнительная идея =/
//	for(var i2=0;i2<a.length;i2++){
//		if(a[i2].nev!=undefined)
//			f.wrongAnswers=f.wrongAnswers.concat(a[i2].nev);
//		if(a[i2].zna!=f[0])
//			f.wrongAnswers.push(a[i2].zna);
//	}
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
	return rez;
}

function sosiskaVel(a){
	if(!a.length)
		return '';

	for(var rez=''+a.splice(0,1);a.length;)
		rez+=om.utochn2.iz()+a.splice(0,1);

	return rez;
}

function voprVel(a,t1){
	var rez='';
	if(t1!==undefined)
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
			+t1+'. '
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

function linearCountableTask(a){
//Полулинейная задача
//Параметры почти те же
//	txt - утверждающий текст

	var alen=a.length;
	var askable=[];
	var i;
	for(i=0;i<alen;i++){
		if(a[i].isString){
			a[i]={txt:a[i]};
		}else if(a[i].zna){
			askable.push(i);
		}
	}
	var objectToAsk=a.splice(askable.iz(),1)[0];
	alen--;
	var text="";
	for(i=0;i<alen;i++){
		text+=a[i].txt; //Будут проблемы с пробелами =(
	}
	text+=voprVel(objectToAsk);
	return {
		text:text,
		answers:objectToAsk.zna,
	};
}
//}}
