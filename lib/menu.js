'use strict';
if(!_4ege){
(function(){
//Константы наборов
var nabor_mat='#nabor&nZad=14&adres=../zdn/mat/&name=';
var nabor_mat2014='';
var nabor_tri='#nabor&nZad=4&adres=../zdn/tri/&name=tri&prefix=E&kat=';
var nabor_rus2014='#nabor&nZad=6&adres=../zdn/rus2014/&name=rus2014&prefix=G&kat=';
var nabor_inf2014='#nabor&nZad=1&adres=../zdn/inf/&name=inf2014&prefix=A&kat=';
var nabor_istpereg='#nabor&nZad=5&adres=../zdn/istpereg/&name=istpereg&kat=';

document.write('<div id="menucenter">');
document.write('<ul class="pureCssMenu pureCssMenum">');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="../doc/index.html" target="_blank"><span>На главную</span></a></li>');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>'+(egeok?'Возможности':'Оболочки')+'</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
document.write('	<ul class="pureCssMenum">');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../sh/sluch.html'+strNabor+'" target="_blank">Случайное задание</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../sh/pechmat.html'+strNabor+'" target="_blank">Тесты на печать</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../sh/polnmat.html'+strNabor+'" target="_blank">Полный тест</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../sh/otladka.html" target="_blank">Режим отладки шаблона</a></li>');
document.write('	</ul>');
document.write('	<!--[if lte IE 6]></td></tr></table></a><![endif]--></li>');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>Предметы</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
document.write('	<ul class="pureCssMenum">');

function predmet(str,nazv){'use_strict';
	document.write('	<li class="pureCssMenui0"><a class="pureCssMenui0" href="'+str+'" target="_blank">'+nazv+'</a></li>');
};
predmet(nabor_mat2014,'Математика: ЕГЭ-2014');
predmet(nabor_mat,'Математика: ЕГЭ-2013');
predmet(nabor_tri,'Тригонометрия: формулы');
predmet(nabor_istpereg,'История: даты');
predmet(nabor_rus2014,'Русский язык, ЕГЭ: часть');
predmet(nabor_inf2014,'Информатика, ЕГЭ: начало');

document.write('	</ul>');
document.write('	<!--[if lte IE 6]></td></tr></table></a><![endif]--></li>');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>Документация</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
document.write('	<ul class="pureCssMenum">');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/oprosy.html" target="_blank">Опросы и голосования</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/license.html" target="_blank">Лицензия</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/razrab.html" target="_blank">Разработчики</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/tech.html" target="_blank">Техническое</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/systreb.html" target="_blank">Системные требования</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/skachat.html" target="_blank">Скачать программу</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="https://github.com/nickkolok/chas-ege" target="_blank">Проект на github</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/istor.html" target="_blank">История выпусков</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/koncepc2.html" target="_blank">Концепция</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/ssylki.html" target="_blank">Ссылки</a></li>');
document.write('	</ul>');
document.write('	<!--[if lte IE 6]></td></tr></table></a><![endif]--></li>');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>Мы ВКонтакте</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
document.write('	<ul class="pureCssMenum">');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="https://vk.com/app3634828" target="_blank">Приложение</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="https://vk.com/chasege" target="_blank">Группа</a></li>');

if(izvk)
	document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="#" onclick="VK.callMethod(\'showInviteBox\')">Пригласить друзей</a></li>');

document.write('	</ul>');
document.write('	<!--[if lte IE 6]></td></tr></table></a><![endif]--></li>');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="https://www.math.vsu.ru" target="_blank">Сайт Математического факультета ВГУ</a></li>');

document.write('</ul>');
document.write('</div>');
console.log('menu.js отработал');
})();
}else{
	document.write('<center><a href="https://www.math.vsu.ru/chas-ege/doc/index.html" target="blank">"Час ЕГЭ"</a> разработан при <a href="https://www.math.vsu.ru/" target="blank">Математическом факультете ВГУ</a>.</center>');
}
