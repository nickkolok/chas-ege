'use strict';
//{{Движок
var dvig={};
dvig.ping=svinta?100:500;
dvig.startxt='1';
dvig.flObn=0;
dvig.dgn=1;

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
	if(dvig.flObn)
		return;
	if(kat === undefined)
		kat=kategory;
	if(nom === undefined)
		nom=nomer;
	window.vopr.dop.nomer=nom;
	try{
		console.log('Составляется задание '+nom+' категории '+kat);
		nabor.upak[dvig.getzadname(kat)][nom]();
		setTimeout('dvig.obnov('+cb+','+kat+','+nom+');',0);
	}catch(e){
		zagr(nabor.adres+dvig.getzadname(kat)+'/'+nomer+'.js');
		setTimeout('dvig.obnov('+cb+','+kat+','+nom+');',dvig.ping);
	clearInterval(dvig.intervZapros);
	dvig.intervZapros=setTimeout('dvig.zapros('+cb+','+kat+','+nomer+');',dvig.ping*4);
	}
}

dvig.zadan=function(cb,kat,nom,ekz){'use strict';
	dvig.flObn=0;
	dvig.startxt=window.vopr.txt;
	window.vopr.podg();
	window.vopr.dop={prefix:nabor.prefix,kategory:kat,nomer:nom,ekz:ekz,};
	if(nom !== undefined)
		return dvig.zapros(cb,kat,nom);
	try{
		nabor.upak[dvig.getzadname(kat)].main();
		dvig.zapros(cb,kat,nomer);
	}catch(e){
		zagr(nabor.adres+dvig.getzadname(kat)+'/main.js');
		setTimeout('dvig.zapros('+cb+','+kat+','+nomer+');',dvig.ping);
	clearInterval(dvig.intervZadan);
	dvig.intervZadan=setTimeout('dvig.zadan('+cb+','+kat+');',dvig.ping*8)
	}
}

dvig.getzadname=function(kat){
	return nabor.altz[kat]?nabor.altz[kat]:nabor.prefix+kat;
}

//Она же NApi.task.variativeABC
//Deprecated
//И вообще, непонятно, почему это было в dvig, а не в vopr
//Из моей любви к обратной совместимости - сохранена
dvig.variativeABC=function(){
	var alph='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	var alph2=alph.slice().shuffle();
	vopr=mapRecursive(vopr,function(str){
		return (''+str).cepZamena(alph,alph2);
	});
}
//}}Движок

console.log('core_dvig.js отработал');
