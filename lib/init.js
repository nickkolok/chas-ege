'use strict';
//Прописываем настройки MathJax
document.write('<script type="text/x-mathjax-config">  MathJax.Hub.Config({    tex2jax: {inlineMath: [["$","$"]]}  });</script>');

//Грузим библиотеки chas-lib: либо с винта по одной, либо из сети собранную
//jQuery и MathJax
if(!window.mjConfig)
	window.mjConfig='TeX-AMS_HTML-full';
if(document.location.href.match('file:')){
	addscript('../ext/mathjax/MathJax.js?config='+mjConfig+'&locale=ru');
}else{
//	addscript('//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full');
	addscript('https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config='+mjConfig+'&locale=ru');
	addscript('//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js');
}
addscript('../ext/jquery-1.9.0.js');
addscript('../ext/jqplot/jquery.jqplot.min.js');
addscript('../ext/jqplot/plugins/jqplot.barRenderer.min.js');
addscript('../ext/jqplot/plugins/jqplot.categoryAxisRenderer.min.js');
addscript('../ext/jstorage.min.js');

//То же, но со скриптами интерфейса
if(svinta){
	addscript('../lib/func.js');
	addscript('../lib/object.js');
	addscript('../lib/array.js');
	addscript('../lib/array_mt.js');
	addscript('../lib/array_mp.js');
	addscript('../lib/array_mn.js');
	addscript('../lib/array_pe.js');
	addscript('../lib/string.js');
	addscript('../lib/number.js');
	addscript('../lib/number_math.js');
	addscript('../lib/canvas.js');
	addscript('../lib/regexp.js');
	addscript('../lib/function.js');
	addscript('../lib/lx.js');
	addscript('../lib/lxnar.js');
	addscript('../lib/lxsoch.js');
	addscript('../lib/lxskl.js');
	addscript('../lib/lxchisl.js');
	addscript('../lib/sklon.js');

	addscript('../lib/dvig_fn.js');
	addscript('../lib/dvig_rz.js');
	addscript('../lib/urljson.js');
	addscript('../lib/style.js');
	addscript('../lib/menu.js');
	addscript('../lib/yametrika.js');
	addscript('../lib/browser.js');
	addscript('../lib/osnmas.js');
	addscript('../lib/cache.js');
	addscript('../lib/jstorage.zapomni.js');
	addscript('../ext/anyslider/js/jquery.anythingslider.js');
	addscript('../lib/sovety.js');
}else
	addscript('../lib/chas-uijs.js'+'?'+chas.version);

if(izvk)
	addscript('https://vk.com/js/api/xd_connection.js?2','VK.init(function(){}, function(){}, \'5.0\'); ');

document.write('<div id="scripts"></div>');
window.vopr={};
window.tek={};


window.vopr.vrn_ist=function(kand){
	for(var i2=0;i2<this.ver.length;i2++){
		this.ver[i2]=this.ver[i2].istDataToStd();
		if(this.ver[i2]==kand.istDataToStd())
			return 1;
	}
	return 0;
};

window.vopr.vrn_mat=function(kand){
	for(var i2=0;i2<this.ver.length;i2++)
		if(this.ver[i2].ts()==kand.ts())
			return 1;
	return 0;
};

window.vopr.podg=function(){
	window.vopr.dey=function(){};
	window.vopr.ver=[];
	window.vopr.nev=[];
	window.vopr.txt='';
	window.vopr.rsh='';
	window.vopr.kat=[];
	window.vopr.dgn=1;
	window.vopr.err=0;
	window.vopr.vrn=window.vopr.vrn_mat;
}
window.vopr.podg();

window.vopr.trd=function(){'use strict';
	try{
		window.vopr.dey();
	}catch(e){}
}

function zagr(scriptname,onl){
	tek=document.createElement('script');
	tek.src=scriptname+'?version='+window.chas.version;
	document.getElementById('scripts').appendChild(tek);
	try{console.log('Скрипт по адресу '+scriptname+' запрошен');}catch(e){}
}

function spoiler(){
	$('.spoiler-body').hide();
	$('.spoiler-hide').hide();
	$('.spoiler-show').click(function(){
		$(this).next().toggle();
		$(this).next().next().slideToggle();
		$(this).hide();
	});
	$('.spoiler-hide').click(function(){
		$(this).next().slideToggle();
		$(this).prev().toggle();
		$(this).hide();
	});
}

var ogranKat;
var umka;

function cacheKat(){
	ogranKat={};
	for(var key in nabor.kat)
		if($('#bez_'+key).length && $('#bez_'+key).is(':checked'))
			ogranKat[key]=1;
	return;
}

function sootvKat(){
	for(var key in window.vopr.kat)
		if(window.vopr.kat[key] && (ogranKat && ogranKat[key] || 
			$('#bez_'+key).length && $('#bez_'+key).is(':checked')))
			return 0;
	return 1;
}

function zagrUmka(){
	umka=$.jStorage.get('umka'+nabor.name);
	if(!umka)
		pustUmka();
	for(var i=1;i<=nabor.nZad;i++){
		if(!umka.verno[i])
			umka.verno[i]=0;
		if(!umka.vsego[i])
			umka.vsego[i]=0;
		if(!umka.vremya[i])
			umka.vremya[i]=0;
	}
}

function pustUmka(){
	umka={
		verno:[].zapslch(0,nabor.nZad,0,0,0),
		vsego:[].zapslch(0,nabor.nZad,0,0,0),
		vremya:[].zapslch(0,nabor.nZad,0,0,0),
	}
}

function sbrosUmka(a){
	if(confirm('Вы действительно хотите сбросить статистику? Это действие нельзя отменить')){
		pustUmka();
		sohrUmka();
		if(a && a.isFunction)
			a();
	}
}

function sohrUmka(){
	$.jStorage.set('umka'+nabor.name,umka);
}

function setVKI(){
	VKI_imageURI='../ext/keyboard/keyboard.png';
	VKI_kts='Russian';
	VKI_kt='Russian';
	VKI_size=5;
}

function checkJQuery(fun,pole){
	try{
		!jQuery;//Вызовет ошибку, если jQuery не загружена
		return 1;
	}catch(e){
		zagr('../ext/jquery-1.9.0.js?'+Math.random());
		if(pole)
			document.getElementById(pole).innerHTML='Проблемы с внешней библиотекой JQuery. Устранение неполадок, подождите...';
		if(fun)
			setTimeout(fun,1000);
		return 0;
	}
}

function checkMathJax(fun,pole){
	try{
		!MathJax;//Вызовет ошибку, если MathJax не загружен
		return 1;
	}catch(e){
		zagr('http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full');
		zagr('../ext/mathjax/MathJax.js?config=TeX-AMS_HTML-full');
		if(pole)
			$('#'+pole).html('Проблемы при обращении к библиотеке отрисовки формул, пытаемся дотянуться...');
		if(fun)
			setTimeout(fun,1000);
		return 0;
	}
}

function readNabor(str){
//Строка вида favorgems.ru/sh/sluch.html#nabor&nZad=14&adres=..zdn/mat/
	var a=str.split('#nabor')[1];
	strNabor='##nabor'+a;
	if(a==undefined)
		return;
	var b=a.split('&');
	b.splice(0,1);//Первый элемент - пустой
	b.map(function(p1){
		var c=p1.split('=');
		nabor[c[0]]=c[1];
	});
}

function galkiKat(elem,prefix){
	var strrez='';
	for(var key in nabor.kat)
		strrez+=
			'<input type="checkbox" id="bez_'+key+'" data-jstorage-id="'+prefix+'-bez_'+key+'"/>'+
			'<label for="bez_'+key+'" >'+nabor.kat[key]+'</label>'
	$(elem).html(strrez);
	$.jStorage.zagrData();
}

function allCanvasToBackgroundImage(){
	$('canvas').each(function(){
		this.style.backgroundImage='url('+this.toDataURL()+')';
	});
}

window.nomer=1;

var strNabor='';
var nabor={}; // Глобальная переменная, отвечающая за выбор предмета
nabor.nZad=15;
nabor.adres='../zdn/mat2014/';
nabor.prefix='B';
nabor.name='ege2014';
nabor.kat={
	prz:'Без производной'		,
	log:'Без логарифмов'		,
	tri:'Без тригонометрии'		,
	drs:'Без дробных степеней'	,
};
readNabor(document.location.href);

//{{Движок
var dvig={};
dvig.ping=svinta?100:500;
dvig.startxt='1';
dvig.flObn=0;
dvig.dgn=1;

dvig.validateVopr=function(){
	var rez='';
	for(var pole in vopr){
		var t=hasErrors(vopr[pole]);
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
		nabor.upak[nabor.prefix+kat][nom]();
		setTimeout('dvig.obnov('+cb+','+kat+','+nom+');',0);
	}catch(e){
		zagr(nabor.adres+nabor.prefix+kat+'/'+nomer+'.js');
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
		nabor.upak[nabor.prefix+kat].main();
		dvig.zapros(cb,kat,nomer);
	}catch(e){
		zagr(nabor.adres+nabor.prefix+kat+'/main.js');
		setTimeout('dvig.zapros('+cb+','+kat+','+nomer+');',dvig.ping);
	clearInterval(dvig.intervZadan);
	dvig.intervZadan=setTimeout('dvig.zadan('+cb+','+kat+');',dvig.ping*8)
	}
}
//}}Движок


console.log('init.js отработал');
