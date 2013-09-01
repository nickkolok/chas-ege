window.sovety=[
'Это - экспериментальная, тестовая версия программы.<br/>В ней могут быть ошибки и неполадки.',
'Все замечания и предложения отправляйте<br/>на адрес nickkolok@mail.ru',
'Программа "Час ЕГЭ" корректно работает<br/>только в <a href="../doc/systreb.html" target="_blank">поддерживаемых браузерах</a>.',
'В тренажёре иногда используются статистические данные,<br/>например, о погоде или ценах. Эти данные являются<br/>автоматически сгенерированными и <b>не</b> реальными.',
'Одна из разработчиц "Час ЕГЭ", Настя Червинская, срочно и <br/>бесплатно отдаёт котят в хорошие руки. Связаться с ней<br/> можно <a href="https://vk.com/kitten112007" target="_blank">ВКонтакте</a> или по телефону 8 (951) 5519607',
].shuffle();
function informer(){'use strict';
	var i;
	document.write('<div id="inf">');
	document.write('<ul id="sovety">');
	for(i=0;i<window.sovety.length;i++){
		document.write('<li><div class="lisov">');
		document.write(window.sovety[i]);
		document.write('</div></li>');
	}
	document.write('</ul>');
	document.write('</div>');
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
informer();
