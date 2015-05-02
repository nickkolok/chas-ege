'use strict';
window.chas={
	maintainer:'Николай Авдеев',
	mode:{},
	design:{
		menuKeeperId:"legacyMenuKeeper",
		sliderKeeperId:"legacySliderKeeper",
	},
	version:"{{version_cache}}",
};

var svinta=!(document.location.href.search('file:'));

var izvk=!!location.href.match('api.vk.com');

if(!svinta && !izvk && !!location.href.match('http://'))
	location.href=location.href.replace('http://','https://');

var egeok=location.href.match('ege-ok.ru')||document.referrer.match('ege-ok.ru');

if(location.href.match('4ege.ru')){
	var _4ege=1;
	chas.mode._4ege=1;
	chas.mode.withoutMenu=1;
}	

function addstyle(name){
	document.write('<link rel="stylesheet" type="text/css" href="'+name+'?'+window.chas.version+'"/>');
	console.log('Таблица стилей '+name+' добавлена');
}

var n="";

function addscript(scriptname,onl){
	if(!svinta){
		var sc=document.createElement('script');
		sc.src=scriptname;
		sc.onload='console.log("Скрипт по адресу '+scriptname+' загружен");';
		document.getElementById("document-write").appendChild(sc);
	}else
		document.write('<script charset="utf-8" src="'+scriptname+'" onload="console.log(\'Скрипт по адресу '+scriptname+' загружен\');'+onl+'"></sc'+n+'ript>');
	console.log('Скрипт по адресу '+scriptname+' добавлен');
}

function addinitjs(){
	if(svinta){
		addscript("../lib/init.js");
	}else{
		document.write(
			'<script charset="utf-8" async src="../lib/init.min.js?'+chas.version+
			'" onload="console.log(\'init.js загружен\');"></sc'+n+'ript>'
		);
		document.write=function(str){
			document.getElementById("document-write").innerHTML+=str;
		};
	}
	chas.initMinLoaded=1;
}

if(svinta){
	addstyle('../ext/anyslider/css/anythingslider.css');
	addstyle('../ext/anyslider/css/theme-minimalist-square.css');
	addstyle("../css/browser.css");
	addstyle("../ext/fonts/stylesheet.css");
	addstyle("../ext/keyboard/keyboard.css");
	addstyle('../ext/jqplot/jquery.jqplot.css');
		addstyle("../css/menu.css");
	if(!window.bootstrapdesign){
		addstyle("../css/main.css");
	}else{
		addstyle("../ext/bootstrap/css/bootstrap.min.css");
	}
}else{
	if(!window.bootstrapdesign){
		addstyle("../css/chas-ui.min.css");
	}else{
		addstyle("../css/chas-ui-bs.min.css");
	}
}

console.log('head.js отработал');
