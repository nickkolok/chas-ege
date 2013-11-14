(function(){'use_strict';
//Константы наборов
var nabor_mat='#nabor&nZad=14&adres=../zdn/mat/&name=';
var nabor_mat2014='';
var nabor_tri='#nabor&nZad=4&adres=../zdn/tri/&name=tri&prefix=E';
var nabor_istpereg='#nabor&nZad=5&adres=../zdn/istpereg/&name=istpereg';

document.write('<div id="menucenter">');
document.write('<ul class="pureCssMenu pureCssMenum">');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>Оболочки</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
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

document.write('	</ul>');
document.write('	<!--[if lte IE 6]></td></tr></table></a><![endif]--></li>');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>Документация</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
document.write('	<ul class="pureCssMenum">');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/oprosy.html" target="_blank">Опосы и голосования</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/license.html" target="_blank">Лицензия</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/razrab.html" target="_blank">Разработчики</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/spec.html" target="_blank">Структура</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/systreb.html" target="_blank">Системные требования</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/skachat.html" target="_blank">Скачать программу</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="https://github.com/nickkolok/chas-ege" target="_blank">Проект на github</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/istor.html" target="_blank">История выпусков</a></li>');
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
