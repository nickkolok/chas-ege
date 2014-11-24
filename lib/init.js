'use strict';
//Прописываем настройки MathJax

//Грузим библиотеки: либо с винта по одной, либо из сети собранную

chas.libs={
	remoteMathJax:'https://cdn.mathjax.org/mathjax/2.1-latest/',
	 localMathJax:'../ext/mathjax/',
	  fileMathJax:'MathJax.js?config=default',
	remoteJQuery:'https://code.jquery.com/',
	 localJQuery:'../ext/',
	  fileJQuery:'jquery-2.1.0.min.js',
	remoteVK:'https://vk.com/js/api/xd_connection.js?2',
};

//MathJax
document.write('<script type="text/x-mathjax-config">  MathJax.Hub.Config({    tex2jax: {inlineMath: [["$","$"]]}  });</script>');


//То же, но со скриптами интерфейса
if(svinta && !chas.mode.trunc){
	addscript(chas.libs.localJQuery+chas.libs.fileJQuery);
	addscript('../ext/jqplot/jquery.jqplot.min.js');
	addscript('../ext/jqplot/plugins/jqplot.barRenderer.min.js');
	addscript('../ext/jqplot/plugins/jqplot.categoryAxisRenderer.min.js');
	addscript('../ext/anyslider/js/jquery.anythingslider.js');
	addscript('../ext/jstorage.min.js');
	addscript('../ext/keyboard/keyboard.js');
	addscript('../ext/html2canvas.js');

	addscript('../lib/func.js');
	addscript('../lib/func_ui.js');
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
	addscript('../lib/complex.js');
	addscript('../lib/namealias.js');

	addscript('../lib/func_jquery.js');
	addscript('../lib/umka.js');
	addscript('../lib/core_vopr.js');
	addscript('../lib/core_nabor.js');
	addscript('../lib/core_dvig.js');
	addscript('../lib/dvig_fn.js');
	addscript('../lib/dvig_rz.js');
	addscript('../lib/dvig_lz.js');
	addscript('../lib/urljson.js');
	addscript('../lib/style.js');
	addscript('../lib/menu.js');
	addscript('../lib/yametrika.js');
	addscript('../lib/browser.js');
	addscript('../lib/osnmas.js');
	addscript('../lib/cache.js');
	addscript('../lib/jstorage.zapomni.js');
	addscript('../lib/sovety.js');

	// NApi && NLib
	addscript("../lib/nlib/core.js");
	addscript("../lib/napi/core.js");
}else
	addscript('../lib/chas-uijs.min.js'+'?'+chas.version);

if(izvk  && !chas.mode.trunc)
	addscript(chas.libs.remoteVK,'VK.init(function(){}, function(){}, \'5.0\'); ');

document.write('<div id="scripts"></div>');

window.tek={};

function zagr(scriptname,onl){
	tek=document.createElement('script');
	tek.src=scriptname+'?version='+chas.version;
	document.getElementById('scripts').appendChild(tek);
	try{console.log('Скрипт по адресу '+scriptname+' запрошен');}catch(e){}
}

var ogranKat;

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
		zagr(chas.libs.localJQuery+chas.libs.fileJQuery+'?'+Math.random());
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
		zagr(chas.libs.remoteMathJax+chas.libs.fileMathJax);
		zagr(chas.libs. localMathJax+chas.libs.fileMathJax);
		if(pole)
			$('#'+pole).html('Проблемы при обращении к библиотеке отрисовки формул, пытаемся дотянуться...');
		if(fun)
			setTimeout(fun,1000);
		return 0;
	}
}

function galkiKat(elem,prefix){
	var strrez='';
	for(var key in nabor.kat)
		strrez+=
			'<input type="checkbox" id="bez_'+key+'" data-jstorage-id="'+prefix+'-bez_'+key+
			'"/>'+'<label for="bez_'+key+'" >'+nabor.kat[key]+'</label>';
	$(elem).html(strrez);
	$.jStorage.zagrData();
}

function specCounter(str){
	if(svinta)
		return;
	var ifr=document.createElement('iframe');
	ifr.src='../lib/speccounter.html?'+str;
	ifr.style.display='none';
	ifr.style.top='-9999px';
	ifr.style.position='absolute';
	document.body.appendChild(ifr);
}

window.nomer=1;

function sozdKolvoHtml(obol){
	var rez='';
	for(var i=1;i<=nabor.nZad;i++){
		try{
			window.comment='';
			nabor.upak[dvig.getzadname(i)].main();
		}catch(e){}
		if(!nabor.vykl[i]){
			rez+='<tr><td><label for="cB'+i+'" >'+dvig.getzadname(i)+'</label></td>'+
				'<td><input type="text" class="kolvo" value="1" id="cB'+i+
				'" data-jstorage-id="'+obol+'-cB'+i+'-'+nabor.name+'"></td><td>'+
				window.comment+'</td></tr>';
		}else{
			rez+='<tr hidden style="display:none;"><td hidden style="display:none;">'+
				'<input type="text" value="0" id="cB'+i+'"></td></tr>';
		}
	}
	return rez;
}

var flVazhn=0;

function vazhnOn(){
	flVazhn=1;
	allLinksToBlankTarget();
	$('#sovety').data('AnythingSlider').startStop(0);
	$('.arrow.forward').click();
}

function vazhnOff(){
	flVazhn=0;
	restoreLinksTarget();
	$('#sovety').data('AnythingSlider').startStop(1);
	$('.arrow.forward').click();
}


console.log('init.js отработал');
