//Прописываем настройки MathJax
document.write('<script type="text/x-mathjax-config">  MathJax.Hub.Config({    tex2jax: {inlineMath: [["$","$"]]}  });</script>');

//Грузим библиотеки chas-lib: либо с винта по одной, либо из сети собранную
//jQuery и MathJax
if(document.location.href.match('file:')){
	addscript('../ext/mathjax/MathJax.js?config=TeX-AMS_HTML-full');
}else{
	addscript('http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full');
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
	addscript('../lib/string.js');
	addscript('../lib/number.js');
	addscript('../lib/canvas.js');
	addscript('../lib/regexp.js');
	addscript('../lib/function.js');
	addscript('../lib/lx.js');
	addscript('../lib/dvig_fn.js');
	addscript('../lib/dvig_rz.js');

	addscript('../lib/menu.js');
	addscript('../lib/browser.js');
	addscript('../lib/osnmas.js');
	addscript('../lib/cache.js');
	addscript('../ext/anyslider/js/jquery.anythingslider.js');
	addscript('../lib/sovety.js');
}else{
	addscript('../lib/chas-uijs.js'+'?'+chas.version);
}

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
	umka=$.jStorage.get('umka');
	if(!umka)
		pustUmka();
}

function pustUmka(){
	umka={
		verno:[].zapslch(0,nZad,0,0,0),
		vsego:[].zapslch(0,nZad,0,0,0),
	}
}

function sbrosUmka(a){
	if(confirm('Вы действительно хотите сбросить статистику? Это действие нельзя отменить')){
		pustUmka();
		a();
		sohrUmka();
	}
}

function sohrUmka(){
	$.jStorage.set('umka',umka);
}

window.nomer=1;

var nZad=14;
var umka;

console.log('init.js отработал');
