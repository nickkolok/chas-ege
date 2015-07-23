"use strict";

(function() {

//Объявляется основной объект с переменными
//Нет, инпуты мы заводить не будем. Это бред
//Как видно, глобальная область не засоряется
window.chas={
	maintainer:'Николай Авдеев',
	mode:{},
	design:{
		menuKeeperId:"legacyMenuKeeper",
		sliderKeeperId:"legacySliderKeeper",
	},
	//А вот так нужно указывать версию. При подстановке head.js в html оно должно замениться
	version:"{{version_cache}}",
};

//Работаем ли мы локально? От этого зависит порядок загрузки библиотек
chas.mode.svinta = !(document.location.href.search('file:'));

//Мы запущены как приложение VK?
chas.mode.izvk = !!location.href.match('api.vk.com');

//Если не локально и не из VK, но по http, то перескочить на https. Ибо нефиг!
//TODO: выяснить, при чём тут ВК.
if(!chas.mode.svinta && !chas.mode.izvk && !!location.href.match('http://')) {
	location.href=location.href.replace('http://','https://');
}

//Костыли для определения сайта-партнёра. В принципе, можно бы и вынести, если быть уверенным, что ничего не сломается
chas.mode.egeok = location.href.match('ege-ok.ru')||document.referrer.match('ege-ok.ru');

if(location.href.match('4ege.ru')){
	chas.mode._4ege=1;
	chas.mode.withoutMenu=1;
}

//Функция для добавления css
window.addstyle = function(name) {
	document.write("<link rel='stylesheet' type='text/css' href='" + name + "?" + window.chas.version + "'/>");
	console.log("Таблица стилей " + name + " добавлена");
};

//Если эту переменную не завести, минификатор имеет свойство "слеплять" тэг script
var n="";

//Функция для добавления скрипта
window.addscript = function(scriptname,onl) {
	var htmlString = '<script charset="utf-8" src="'+scriptname+'" onload="console.log(\'Скрипт по адресу '+
		scriptname+' загружен\');'+onl+'"></sc'+n+'ript>';
	//Сделать script onload хром не даёт иначе, как через document.write А может, и огнелиса туда же
	//Почему так, я не помню. Но трогать опасно!
//	if(!chas.mode.svinta){
//		var fr=document.createDocumentFragment();
//		sc.src=scriptname;
//		sc.onload='console.log("Скрипт по адресу '+scriptname+' загружен");'+onl;//На самом деле как минимум в Chrome - не пашет
//		document.getElementById("document-write").appendChild(sc);
//	}else
	document.write(htmlString);
	console.log('Скрипт по адресу '+scriptname+' добавлен');
};

//Добавляем init.js
//Если будем его выпиливать, то это блок придётся переработать
window.addinitjs = function() {
	if(chas.mode.svinta){
		addscript("../lib/init.js");
	}else{
		addscript("../lib/init.min.js");
//		document.write(
//			//Внимание, async!
//			'<script charset="utf-8" _async src="../lib/init.min.js?'+chas.version+
//			'" onload="console.log(\'init.js загружен\');"></sc'+n+'ript>'
//		);
		//Подменяем стандартную document.write для обеспечения асинхронности
		//Костыль, но, возможно, нужен для внешних библиотек
//		document.write=function(str){
//			document.getElementById("document-write").innerHTML+=str;
//		};
	}
//	//И весело поднимаем флажок, что init.js загрузился!
	chas.initMinLoaded=1;
};


//Добавляем стили
if(chas.mode.svinta){
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

})();
