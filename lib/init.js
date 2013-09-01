//Прописываем настройки MathJax
document.write('<script type="text/x-mathjax-config">  MathJax.Hub.Config({    tex2jax: {inlineMath: [["$","$"]]}  });</script>');

//Грузим библиотеки chas-lib: либо с винта по одной, либо из сети собранную
//jQuery и MathJax
if(document.location.href.match('file:')){
	addscript('../ext/mathjax/MathJax.js?config=TeX-AMS_HTML-full');
}else{
//	addscript('//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full');
	addscript('https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML');
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
	addscript('../lib/array.js');
	addscript('../lib/array_mt.js');
	addscript('../lib/array_mp.js');
	addscript('../lib/array_mn.js');
	addscript('../lib/string.js');
	addscript('../lib/number.js');
	addscript('../lib/number_math.js');
	addscript('../lib/canvas.js');
	addscript('../lib/regexp.js');
	addscript('../lib/function.js');
	addscript('../lib/object.js');
	addscript('../lib/lx.js');
	addscript('../lib/lxsoch.js');
	addscript('../lib/lxskl.js');
	addscript('../lib/sklon.js');
	addscript('../lib/dvig_fn.js');
	addscript('../lib/dvig_rz.js');

	addscript('../lib/menu.js');
	addscript('../lib/browser.js');
	addscript('../lib/osnmas.js');
	addscript('../lib/cache.js');
	addscript('../lib/jquery.jstorage.zapomni.js');
	addscript('../ext/anyslider/js/jquery.anythingslider.js');
	addscript('../lib/sovety.js');
}else
	addscript('../lib/chas-uijs.js'+'?'+chas.version);

if(izvk)
	addscript('https://vk.com/js/api/xd_connection.js?2','VK.init(function(){}, function(){}, \'5.0\'); ');

document.write('<div id="scripts"></div>');
window.vopr={};
window.tek={};

window.vopr.podg=function(){
	window.vopr.dey=function(){};
	window.vopr.ver=[];
	window.vopr.nev=[];
	window.vopr.txt='';
	window.vopr.rsh='Разбор решения этой задачи ещё не подготовлен.';
	window.vopr.kat=[];

	window.vopr.vrn=function(kand){
		for(var i2=0;i2<this.ver.length;i2++)
			if(this.ver[i2].ts()==kand.ts())
				return 1;
		return 0;
	};
	
}
window.vopr.podg();

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

function sootvKat(){
	for(var key in window.vopr.kat)
		if(window.vopr.kat[key] && $('#bez_'+key).length && $('#bez_'+key).is(':checked'))
			return 0;
	return 1;
}

function zagrUmka(){
	umka=$.jStorage.get('umka'+nabor.name);
	if(!umka)
		pustUmka();
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

function readNabor(){
//Строка вида favorgems.ru/sh/sluch.html#nabor&nZad=14&adres='..mat/zdn/'
	var a=document.location.href.split('#nabor')[1];
	if(a==undefined)
		return;
	var b=a.split('&');
	b.splice(0,1);//Первый элемент - пустой
	b.map(function(p1){
		var c=p1.split('=');
		nabor[c[0]]=c[1];
	});
}

function allCanvasToBackgroundImage(){
	$('canvas').each(function(){
		this.style.backgroundImage='url('+this.toDataURL()+')';
	});
}

window.nomer=1;

var nabor={}; // Глобальная переменная, отвечающая за выбор предмета
nabor.nZad=14;
nabor.adres='../zdn/mat/';
nabor.prefix='B';
nabor.name='';
readNabor();

console.log('init.js отработал');
