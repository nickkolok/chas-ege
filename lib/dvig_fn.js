'use strict';
//Движок от В14

//a - объект с параметрами. Так сказать, питонический подход.
//slag - массив со слагаемыми в виде строк. Наверное, можно и числа, но лучше не надо.
//minx - точка минимума					//Если одно из них не указано, попросту не спрашиваем
//miny - значение в точке минимума		//
//maxx - точка максимума				//
//maxy - значение в точке максимума		//
//cnst - принудительно указать константу. Если 0 - то ясно, не упоминать.
//prnz - начало промежутка				//
//prkz - конец промежутка				//Если одного нет, то луч. Если обоих, то вся ОДЗ
//prnb - открытое начало промежутка				
//prkb - открытый конец промежутка				
//chet - чётная функция
//nech - нечётная функция

function fn_promezh(a){
	if(a.prnz)
		a.prnz=a.prnz.ts().plusminus();
	if(a.prkz)
		a.prkz=a.prkz.ts().plusminus();
	//Если границ промежутка нет, то это числовая прямая.
	if(a.prnz==undefined && a.prkz==undefined)
		return {
			nazv:'',
			text:'$(-\\infty;\\infty)$',
		}
	
	if(a.prnz==undefined && a.prkb)
		return{
			nazv:'открытый луч',
			text:'$(-\\infty;'+a.prkz.ts()+')$',
		}
	
	if(a.prkz==undefined && a.prnb)
		return{
			nazv:'открытый луч',
			text:'$('+a.prnz.ts()+';\\infty)$',
		}
	
	if(a.prnz==undefined)
		return{
			nazv:'луч',
			text:'$(-\\infty;'+a.prkz.ts()+']$',
		}
	
	if(a.prkz==undefined)
		return{
			nazv:'луч',
			text:'$['+a.prnz.ts()+';\\infty)$',
		}
	
	if(a.prkb&&a.prkz)
		return{
			nazv:'интервал',
			text:'$('+a.prnz.ts()+';'+a.prkz.ts()+')$',
		}
	
	if(a.prkb)
		return{
			nazv:'полуинтервал',
			text:'$['+a.prnz.ts()+';'+a.prkz.ts()+')$',
		}
	
	if(a.prnb)
		return{
			nazv:'полуинтервал',
			text:'$('+a.prnz.ts()+';'+a.prkz.ts()+']$',
		}
	
	return{
		nazv:'отрезок',
		text:'$['+a.prnz.ts()+';'+a.prkz.ts()+']$',
	}
}

function fn_na(a){
	var b=fn_promezh(a);
	if(!b.nazv)
		return '';
	return ' на '+lx[b.nazv].pe+' '+b.text;
}

function fn_formul(a){
	var txt=[];
	var otv=[];
	if(a.minx!=undefined){
		txt.push('точка минимума');
		otv.push(a.minx);
	}
	if(a.maxx!=undefined){
		txt.push('точка максимума');
		otv.push(a.maxx);
	}
	if(a.miny!=undefined){
		txt.push('наименьшее значение');
		otv.push(a.miny);
	}
	if(a.maxy!=undefined){
		txt.push('наибольшее значение');
		otv.push(a.maxy);
	}
	var vpr=[txt,otv].T().iz();
	return {
		txt: (om.otvnaydite.iz().toZagl()+' '+lx[vpr[0]].ve+
			' функции $y = '+a.slag.slag()+'$'+fn_na(a)).plusminus(),
		ver: vpr[1].plusminus(),
	}
}

function fn_maxminxObmen(a){
	//Меняем местами минимум и максимум
	var buf=a.minx;
	a.minx=a.maxx;
	a.maxx=buf;
}

function fn_maxminxMinus(a){
	a.maxx=fn_minus(a.maxx);
	a.minx=fn_minus(a.minx);
}

function fn_promezhMinus(a){
	//Меняем местами границы интервала и дописываем минус
	var buf=a.prnz;
	a.prnz=fn_minus(a.prkz);
	a.prkz=fn_minus(buf);

	buf=a.prnb;
	a.prnb=a.prkb;
	a.prkb=buf;
}

function fn_maxminyMinusObmen(a){
	//Меняем местами наибольшее и наименьшее значения
	var buf=a.miny;
	a.miny=fn_minus(a.maxy);
	a.maxy=fn_minus(buf);
}

function fn_minus(b){
	if(b)
		return '-'+b.ts();
	return b;
}

function fn_plusminus(a){
	if(sl1()){
		//Меняем местами минимум и максимум
		fn_maxminxObmen(a);
		//Меняем местами наибольшее и наименьшее значения
		fn_maxminyMinusObmen(a);
		a.slag=a.slag.addPrefix('-');
	}
}

function fn_const(a){
	if( (a.cnst!=0) && (!a.maxy||a.maxy.isNumber) && (!a.miny||a.miny.isNumber) )	{
		if(a.cnst==undefined)
			a.cnst=sl(-99,99);
		if(a.cnst.isNumber){
			a.slag.push(a.cnst);
			if(a.maxy!=undefined)
				a.maxy+=a.cnst;
			if(a.miny!=undefined)
				a.miny+=a.cnst;
		}
	}
}

function fn_chet(a){
	if(sl1()){
		fn_maxminxMinus(a);
		fn_promezhMinus(a);
	}
}

function fn_nech(a){
	if(sl1()){
		fn_maxminxObmen(a);
		fn_maxminxMinus(a);
		fn_promezhMinus(a);
		fn_maxminyMinusObmen(a);
	}
}

function fn_zadan(a){
	if(a.nech)
		fn_nech(a);
	else if(a.chet)
		fn_chet(a);
	fn_const(a);
	fn_plusminus(a);
	return fn_formul(a);
}

//А это - неудачная, тупиковая ветка, но она таки используется

function fn_txt(nai,f,n,k,nb,kb){
	return (
		om.otvnaydite.iz().toZagl()+' '+nai+' функции $y = '+f+'$ на промежутке $'+(nb?'(':'[')+n+';'+k+(kb?')':']')+'$.'
	).plusminus();
}	

