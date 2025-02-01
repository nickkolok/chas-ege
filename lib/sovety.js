'use strict';
window.sovety=[
'<div class="alert alert-warning">Это – <span class="badge">beta-версия</span> тренажёра.<br/>При нахождении ошибок, просьба сообщать о них на <a href="https://bitbucket.org/chas-ege-team/chas-ege/issues">багтрекере</a>.</div>',
'Все замечания и предложения отправляйте<br/>на адрес nickkolok@mail.ru',
'Программа "Час ЕГЭ" корректно работает<br/>только в <a href="../doc/systreb.html" target="_blank">поддерживаемых браузерах</a>.',
'В тренажёре иногда используются статистические данные,<br/>например, о погоде или ценах. Эти данные являются<br/>автоматически сгенерированными, а <i>не</i> реальными.',
//'<br/>16.05.2014 в 15-00 в ауд. 430 Главного корпуса ВГУ состоится<br/>бесплатная лекция проф. Глушко, главы экзаменационной <br/>комиссии по математике. Приглашаются все желающие!',
'Математический факультет ВГУ - это <br/>высококвалифицированный профессорско-преподавательский <br/> состав и увлекательная студенческая жизнь.',
'Математический факультет ВГУ - это <br/>отличная профессиональная подготовка <br/>для работы в различных сферах деятельности.',
'Математический факультет ВГУ - это <br/>увлекательная студенческая жизнь и весёлый,<br/>доброжелательный, жизнерадостный коллектив.',
//'Если Вам близка математика, Вы хотите стать специалистом, <br/>владеющим современными информационными технологиями и<br/> технологиями математического моделирования<br/>– ждем Вас на математическом факультете!',
//'Вы можете <a href="../doc/oprosy.html"  target="blank">проголосовать</a> за то, <br/>что будет добавлено в "Час ЕГЭ"<br/>в ближайшем еженедельном выпуске.',
'"Час ЕГЭ" содержит задания ЕГЭ по математике от 1 до 14 - <br/>в соответствии КИМ тестовой части<br/>профильного уровня ЕГЭ-2020.',
'Набор заданий тренажёра "Час ЕГЭ" по математике <br/>основан на <a href="http://mathege.ru/" target="_blank">Открытом банке заданий</a>,<br/>но не повторяет его в точности.',
//'<br/>9 февраля, в воскресенье, в 10:00, Математический<br/>факультет проводит день открытых дверей<br/>в Главном корпусе ВГУ (Университетская пл., 1), ауд. 435',
//'Дорогие старшеклассники! Вы можете попробовать свои силы<br/>на бесплатном пробном ЕГЭ по математике (с оценкой от экспертов),<br/>а также посетить бесплатные консультации, которые ведут<br/>преподаватели математического факультета. <a href="https://www.math.vsu.ru/index.php?option=com_content&view=article&id=49:%D0%BF%D1%80%D0%BE%D0%B1%D0%BD%D1%8B%D0%B9-%D0%B5%D0%B3%D1%8D-%D0%B8-%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D0%B8-%D0%B4%D0%BB%D1%8F-%D0%B0%D0%B1%D0%B8%D1%82%D1%83%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%BE%D0%B2&catid=11:abiturientu&Itemid=101">Подробнее...</a>',
].shuffle();
function fixHeight(){
	//TODO: отрефакторить!
	var br = [];
	for (var i = 0; i < window.sovety.length; i++) {
		var pos = -1;
		br[i] = 0;
		// Ищем сколько раз встречается "<br/>"" в каждом элементе window.sovety и записываем значения в массив br
		while ( ((pos = window.sovety[i].indexOf('<br/>', pos+1)) != -1)) {
			br[i]++;
		}
	}
	// Ищем максимальное кол-во "<br/>"
	var max = Math.max.apply(0, br);
	// Меняем высоту #inf в зависимости от строк в самом длинном совете
	$(function(){
			$('#inf').css({height:(24 * (max + 1))});
	});
}
function informer(){
	var i;
	var rez="";
	rez+=('<div id="inf">');
	rez+=('<ul id="sovety">');
	for(i=0;i<window.sovety.length;i++){
		rez+=('<li><div class="lisov">');
		rez+=(window.sovety[i]);
		rez+=('</div></li>');
	}
	rez+=('</ul>');
	rez+=('</div>');
	document.getElementById(chas.design.sliderKeeperId).innerHTML=rez;
	$(function(){'use strict';
		$('#sovety').anythingSlider({
			forwardText         : "&gt;",
			backText         	: "&lt;",
			hashTags			:false,
//			expand				:true,
			startPanel			:1,
			theme				:'minimalist-square',
			buildNavigation		:false,
			buildStartStop		:false,
			resizeContents  	:false,
			enableKeyboard		:false,
			autoPlay			:true,
			delay				:10000,
		});
	});
}
if(!chas.mode.withoutSlider){
	fixHeight();
	informer();
}

function generateCarousel(targetElement){
	var indicators="";
	var messages="";
	for(var i=0;i<sovety.length;i++){
		indicators+='<li data-target="#advert" style="border-color:#2c3e50;background-color:#ecf0f1;" data-slide-to="'+
			i+'"'+' class="active"'.esli(!i)+'></li>';
		//TODO: стилям место в CSS
		messages+='<div class="'+'active '.esli(!i)+'item" style="height: 350px !important;font-size: 16px;text-align:center;">'+
		sovety[i].replace(/<br\/*>/g,' ')+
		'</div>'
	}

	$(targetElement).html(
		'<ol class="carousel-indicators">'+
			indicators+
		'</ol>'+
		'<div class="carousel-inner">'+
			messages+
		'</div>'
	);
}

console.log("sovety.js отработал");
