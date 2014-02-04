'use strict';
if(!_4ege){
(function(){
//Строка JSON
var nastrCopy=nastr.clone();
nastrCopy.upak=undefined;
var strJSON='#'+JSON.stringify(nastrCopy).encodeURIComponent();
var obol=document.location.href.match(/[a-zA-Z0-9]+\.html/)[0]+'?'+Math.random();

//Константы наборов

//Математика ЕГЭ-2013 (да, поддерживается!)
var nastr_mat=nastrCopy.clone();
nastr_mat.nabor={zagol:'../zdn/mat/mat.js'};

//Математика ЕГЭ-2014
var nastr_mat2014=nastrCopy.clone();
nastr_mat2014.nabor={zagol:'../zdn/mat2014/mat2014.js'};

//Тригонометрия
var nastr_tri=nastrCopy.clone();
nastr_tri.nabor={zagol:'../zdn/tri/tri.js'};

//Русский язык ЕГЭ-2014
var nastr_rus2014=nastrCopy.clone();
nastr_rus2014.nabor={zagol:'../zdn/rus2014/rus2014.js'};

//Информатика ЕГЭ-2014
var nastr_inf2014=nastrCopy.clone();
nastr_inf2014.nabor={zagol:'../zdn/inf/inf.js'};

//История: Перегудов
var nastr_istpereg=nastrCopy.clone();
nastr_istpereg.nabor={zagol:'../zdn/istpereg/istpereg.js'};

var target=' target="'+nastr.style.menuLinkTarget+'" ';

function writeMenuInnerLink(href,nazv){
	document.write('	<li class="pureCssMenui0"><a class="pureCssMenui0" href="'+
							href+strJSON+'"'+target+'>'+nazv+'</a></li>');
}
document.write('<div id="menucenter">');
document.write('<ul class="pureCssMenu pureCssMenum">');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="../doc/index.html'+strJSON+'"'+target+'><span>На главную</span></a></li>');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>'+(egeok?'Возможности':'Оболочки')+'</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
document.write('	<ul class="pureCssMenum">');

writeMenuInnerLink('../sh/sluch.html',		'Случайное задание');
writeMenuInnerLink('../sh/pechmat.html',	'Тесты на печать');
writeMenuInnerLink('../sh/polnmat.html',	'Полный тест');
writeMenuInnerLink('../sh/otladka.html',	'Режим отладки шаблона');
writeMenuInnerLink('../sh/katalog.html',	'Каталог заданий набора');

document.write('	</ul>');
document.write('	<!--[if lte IE 6]></td></tr></table></a><![endif]--></li>');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>Предметы</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
document.write('	<ul class="pureCssMenum">');

function predmet(str,nazv){
	document.write('	<li class="pureCssMenui0"><a class="pureCssMenui0" href="'+obol+'#'+JSON.stringify(str).encodeURIComponent()+'"'+target+'>'+nazv+'</a></li>');
};
predmet(nastr_mat2014,'Математика: ЕГЭ-2014');
predmet(nastr_mat,'Математика: ЕГЭ-2013');
predmet(nastr_tri,'Тригонометрия: формулы');
predmet(nastr_istpereg,'История: даты');
predmet(nastr_rus2014,'Русский язык, ЕГЭ: часть');
predmet(nastr_inf2014,'Информатика, ЕГЭ: начало');

document.write('	</ul>');
document.write('	<!--[if lte IE 6]></td></tr></table></a><![endif]--></li>');

document.write('	<li class="pureCssMenui"><a class="pureCssMenui" href="#"><span>Документация</span><!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->');
document.write('	<ul class="pureCssMenum">');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/oprosy.html'+strJSON+'"'+target+'>Опросы и голосования</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/license.html'+strJSON+'"'+target+'>Лицензия</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/razrab.html'	+strJSON+'"'+target+'>Разработчики</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/tech.html'		+strJSON+'"'+target+'>Техническое</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/systreb.html'+strJSON+'"'+target+'>Системные требования</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/skachat.html'+strJSON+'"'+target+'>Скачать программу</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="https://github.com/nickkolok/chas-ege" target="_blank">Проект на github</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/istor.html'+strJSON+'"'+target+'>История выпусков</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/koncepc2.html'+strJSON+'"'+target+'>Концепция</a></li>');
document.write('		<li class="pureCssMenui0"><a class="pureCssMenui0" href="../doc/ssylki.html'+strJSON+'"'+target+'>Ссылки</a></li>');
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
