//Движок от В14

function fn_txt(nai,f,n,k,nb,kb){
	return (
		om.otvnaydite.iz().toZagl()+' '+nai+' функции $y = '+f+'$ на промежутке $'+(nb?'(':'[')+(-1).pina(4)+';'+(1).pina(4)+(kb?')':']')+'$.'
	).plusminus();
}	

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
	//Если границ промежутка нет, то это числовая прямая.
	if(a.prnz==undefined && a.prkz==undefined){
		return {
			nazv:'',
			text:'$(-\\infty;\\infty)$',
		}
	}
	if(a.prnz==undefined && a.prkb){
		return{
			nazv:'открытый луч',
			text:'$(-\\infty;'+prkz.ts()+')$',
		}
	}
	if(a.prkz==undefined && a.prnb){
		return{
			nazv:'открытый луч',
			text:'$('+prnz.ts()+';\\infty)$',
		}
	}
	if(a.prnz==undefined){
		return{
			nazv:'луч',
			text:'$(-\\infty;'+prkz.ts()+']$',
		}
	}
	if(a.prkz==undefined){
		return{
			nazv:'луч',
			text:'$['+prnz.ts()+';\\infty)$',
		}
	}
	if(a.prkb&&a.prkz){
		return{
			nazv:'интервал',
			text:'$('+prnz.ts()+';'+prkz.ts()+')$',
		}
	}
	if(a.prkb){
		return{
			nazv:'полуинтервал',
			text:'$['+prnz.ts()+';'+prkz.ts()+')$',
		}
	}
	if(a.prnb){
		return{
			nazv:'полуинтервал',
			text:'$('+prnz.ts()+';'+prkz.ts()+']$',
		}
	}
		return{
			nazv:'отрезок',
			text:'$['+prnz.ts()+';'+prkz.ts()+']$',
		}
}

function fn_na(a){
	var b=fn_promezh(a);
	if(!b.nazv){
		return '';
	}
	return ' на '+lx[b.nazv].pe+' '+b.text;
}

function fn_formul(a){
	var txt=[];
	var otv=[];
	if(a.minx){
		txt.push('точку минимума');
		otv.push(a.minx);
	}
	if(a.minx){
		txt.push('точку минимума');
		otv.push(a.minx);
	}
	if(a.minx){
		txt.push('точку минимума');
		otv.push(a.minx);
	}
	if(a.minx){
		txt.push('точку минимума');
		otv.push(a.minx);
	}
}

function fn_maxminxObmen(a){
		var buf;
		//Меняем местами минимум и максимум
		buf=a.minx;
		a.minx=a.maxx;
		a.maxx=buf;
}

function fn_maxminxMinus(a){
	a.maxx='-'+a.maxx;
	a.minx='-'+a.minx;
}

function fn_promezhMinus(a){
		var buf;
		//Меняем местами границы интервала и дописываем минус
		buf=a.prnz;
		a.prnz='-'+a.prkz;
		a.prkz='-'+buf;

		buf=a.prnb;
		a.prnb=a.prkb;
		a.prkb=buf;
}

function fn_maxminyMinusObmen(a){
		var buf;
		//Меняем местами наибольшее и наименьшее значения
		buf=a.miny;
		a.miny='-'+a.maxy;
		a.maxy='-'+buf;
	
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
	if( (!a.maxy||a.maxy.isNumber) &&  (!a.miny||a.miny.isNumber) )	{
		if(a.cnst!=0){
			if(a.cnst==undefined){
				a.cnst=sl(-99,99);
			}else
			if(a.cnst.isNumber){
				a.slag.push(a.cnst);
				if(a.maxy!=undefined)
					a.maxy+=c;
				if(a.miny!=undefined)
					a.miny+=c;
			}
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
		fn_maxminxMinus(a);
		fn_promezhMinus(a);
		fn_maxminxObmen(a);
		fn_maxminyMinusObmen(a);
	}
}


