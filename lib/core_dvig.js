'use strict';
//{{Движок
var dvig={};
dvig.ping=chas.mode.svinta?100:500;
dvig.startxt='1';
dvig.flObn=0;
dvig.dgn=1;
dvig.log="";//Отдельный лог движка

dvig.validateVopr=function(){
	var rez='';
	for(var pole in vopr){
		var t=hasErrors(vopr[pole],vopr.kat.bdr);
		if(t)
			rez+=pole+" : "+t+'; ';
	}
	if(vopr.nev.hasElemStrict(''))
		rez+='nev: пустой вариант; ';
	if(vopr.ver.hasElemStrict(''))
		rez+='ver: пустой вариант; ';
	if(vopr.nev.hasDubl())
		rez+='nev: повторяющиеся варианты; ';
	var masOtv=vopr.ver.sortDelDubl().concat(vopr.nev.sortDelDubl());
	if(masOtv.hasDubl())
		rez+='варианты ответа, верные и не верные одновременно; ';

	return rez;
}

dvig.obnov=function(cb,kat,nom){'use strict';//cb - функция, вызываемая, когда вопрос успешно обновился
	if(dvig.flObn)
		return;
	if((window.vopr.txt!=0)&&(dvig.startxt!=window.vopr.txt)){
		dvig.startxt=window.vopr.txt;
		clearInterval(dvig.intervZapros);
		clearInterval(dvig.intervZadan);
		if(!sootvKat() || vopr.err){
			dvig.zadan(cb,kat);
			return;
		}
		var t=dvig.validateVopr();
		if(t){
			console.log(t+'\n\r');
			if(vopr.dgn && dvig.dgn){
				dvig.zadan(cb,kat);
				return;
			}
		}
		dvig.flObn=1;
		cb(window.vopr.clone());
	}else
		setTimeout('dvig.obnov('+cb+','+kat+','+nom+');',100);
}

dvig.zapros=function(cb,kat,nom){'use strict';
//Упорно пытается составить конкретное задание конкретной категории
	if(dvig.flObn)
		return;
	if(kat === undefined)
		kat=kategory;
	if(nom === undefined)
		nom=nomer;
	vopr.dop.nomer=nom;
	console.log('Составляется задание '+nom+' категории '+kat);
	clearInterval(dvig.intervZapros);
	try{
		//let oldText = window.vopr.txt;
		console.log(window.vopr.txt);
		console.log('Trying to generate...');

		do{
			nabor.upak[dvig.getzadname(kat)][nom]();
			console.log(window.vopr.txt);
		}while(window.vopr.txt == dvig.startxt);

		console.log('Generated!');
		console.log(window.vopr.txt);
		setTimeout(function(){
			dvig.obnov(cb,kat,nom)
		},0);
	}catch(e){
		zagr(nabor.adres+dvig.getzadname(kat)+'/'+nomer+'.js');
		setTimeout('dvig.obnov('+cb+','+kat+','+nom+');',dvig.ping);
		dvig.intervZapros=setTimeout('dvig.zapros('+cb+','+kat+','+nomer+');',dvig.ping*4);
	}
}

dvig.zadan=function(cb,kat,nom,ekz){'use strict';
	dvig.flObn=0;
	dvig.startxt=window.vopr.txt;
	vopr.podg();
	vopr.dop={prefix:nabor.prefix,kategory:kat,nomer:nom,ekz:ekz,};
	clearInterval(dvig.intervZadan);
	clearInterval(dvig.intervZapros);
	if(nom !== undefined)
		return dvig.zapros(cb,kat,nom);
	try{
		nabor.upak[dvig.getzadname(kat)][nabor.scheduler]();
		dvig.zapros(cb,kat,nomer);
	}catch(e){
		dvig.log+="Отсутствует или повреждён main (или другой scheduler) для "+kat+"\n\r";
		try{
			dvig.zapros(cb,kat,nomer=Object.keys(nabor.upak[dvig.getzadname(kat)]).iz());
		}catch(e2){
			zagr(nabor.adres+dvig.getzadname(kat)+'/'+nabor.scheduler+'.js');
			//TODO: refactor strings to functions!
			dvig.intervZapros=setTimeout('dvig.zapros('+cb+','+kat+','+nomer+');',dvig.ping);
			dvig.intervZadan =setTimeout('dvig.zadan ('+cb+','+kat+');',dvig.ping*8)
		}
	}
}

dvig.getzadname=function(kat){
	return nabor.altz[kat]?nabor.altz[kat]:nabor.prefix+kat;
}
//}}Движок

console.log('core_dvig.js отработал');
