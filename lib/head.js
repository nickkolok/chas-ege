
var svinta=(!(document.location.href.search('file:')));

//var tmp_domain=document.domain;
//document.domain="vk.com";
//var tloc=top.location.href;
//var izvk=/*window.location.href.match('https://') && */tloc.match('vk.com');
//var izvk=false;
//if(!izvk)
//	document.domain=tmp_domain;
var izvk=!!location.href.match('api.vk.com');


document.write('<meta charset="UTF-8"/>');//Не работает. Хотел бы я знать, почему.
window.chas={};
window.chas.version='20130726212637';
window.chas.avtor='Николай Авдеев';

function addstyle(name){
	document.write('<link rel="stylesheet" type="text/css" href="'+name+'?'+window.chas.version+'"/>');
	console.log('Таблица стилей '+name+' добавлена');
}

function addscript(scriptname,onl){
	document.write('<script charset="utf-8" src="'+scriptname+'"onload="console.log(\'Скрипт по адресу '+scriptname+' загружен\');'+onl+'"></script>');
	console.log('Скрипт по адресу '+scriptname+' добавлен');
}

document.write('<link rel="shortcut icon" href="../css/mathvsu.ico"/>');//В оффлайн-режиме в хроме не работает. Причём ни скриптом, ни если прямым текстом прописать.
document.write('<link rel="icon" href="../css/mathvsu.ico"/>');

if(svinta){
	addstyle('../ext/anyslider/css/anythingslider.css');
	addstyle('../ext/anyslider/css/theme-minimalist-square.css');
	addstyle("../css/browser.css");
	addstyle("../css/menu.css");
	addstyle("../css/main.css");
	addstyle("../ext/fonts/stylesheet.css");
	addstyle("../ext/keyboard/keyboard.css");
}else{
	addstyle("../css/chas-ui.css");
}

addstyle('../ext/jqplot/jquery.jqplot.css');

console.log('head.js отработал');

window.chas.version="20130811104720"
window.chas.version="20130811111001"
window.chas.version="20130811111321"
window.chas.version="20130811111536"
