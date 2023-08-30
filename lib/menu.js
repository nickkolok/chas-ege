'use strict';

function _getMenuModel(genJson, nastrCopy, obol) {
	//Математика ЕГЭ-2013
	var nastr_mat2013 = nastrCopy.clone();
	nastr_mat2013.nabor = { zagol:'../zdn/mat/mat.js' };

	//Математика ЕГЭ-2014
	var nastr_mat2014 = nastrCopy.clone();
	nastr_mat2014.nabor = { zagol:'../zdn/mat2014/mat2014.js' };

	//Математика ЕГЭ-2015 профильный
	var nastr_matege2015p=nastrCopy.clone();
	nastr_matege2015p.nabor={zagol:'../zdn/matege2015p/matege2015p.js'};

	//Математика ЕГЭ-2016 профильный
	var nastr_matege2016p=nastrCopy.clone();
	nastr_matege2016p.nabor={zagol:'../zdn/matege2016p/matege2016p.js'};

	//Математика ЕГЭ-2023 профильный
	var nastr_matege2023p=nastrCopy.clone();
	nastr_matege2023p.nabor={zagol:'../zdn/matege2023p/matege2023p.js'};

	//Математика ЕГЭ-2024 профильный
	var nastr_matege2024p=nastrCopy.clone();
	nastr_matege2024p.nabor={zagol:'../zdn/matege2024p/matege2024p.js'};

	//Тригонометрия
	var nastr_tri = nastrCopy.clone();
	nastr_tri.nabor = { zagol:'../zdn/tri/tri.js' };

	//Русский язык ЕГЭ-2014
	var nastr_rus2014 = nastrCopy.clone();
	nastr_rus2014.nabor = { zagol:'../zdn/rus2014/rus2014.js' };

	//Информатика ЕГЭ-2014
	var nastr_inf2014 = nastrCopy.clone();
	nastr_inf2014.nabor = { zagol:'../zdn/inf/inf.js' };

	//История: Перегудов
	var nastr_istpereg = nastrCopy.clone();
	nastr_istpereg.nabor = { zagol:'../zdn/istpereg/istpereg.js' };

	return {
		"На главную": "../doc/index.html" + genJson(null),
		"Тесты": {
			"По предметам": {
				"Математика: ЕГЭ-2024 (профильный)": obol + genJson(nastr_matege2024p),
				"Математика: ЕГЭ-2023 (профильный)": obol + genJson(nastr_matege2023p),
				"Математика: ЕГЭ-2016-2020 (профильный)": obol + genJson(nastr_matege2016p),
				"Математика: ЕГЭ-2015 (профильный)": obol + genJson(nastr_matege2015p),
				"Математика: ЕГЭ-2014": obol + genJson(nastr_mat2014),
				"Математика: ЕГЭ-2013": obol + genJson(nastr_mat2013),
				"Тригонометрия: формулы": obol + genJson(nastr_tri),
				"История: даты": obol + genJson(nastr_istpereg),
				"Русский язык, ЕГЭ: часть": obol + genJson(nastr_rus2014),
				"Информатика, ЕГЭ: начало": obol + genJson(nastr_inf2014)
			},
			"Случайное задание": "../sh/sluch.html" + genJson(null),
			"Каталог заданий набора": "../sh/katalog.html" + genJson(null),
			"Полный тест": "../sh/polnmat.html" + genJson(null),
			"Тесты на печать": "../sh/pechmat.html" + genJson(null),
		},
		"Прочее": {
			"Разработчикам": {
				"Техническое": "../doc/tech.html" + genJson(null),
				"Режим отладки шаблона": "../sh/otladka.html" + genJson(null),
			},
			"Скачивание": {
				"Системные требования": "../doc/systreb.html" + genJson(null),
				"Скачать": "../doc/skachat.html" + genJson(null),
				"Репозиторий на GitHub": "https://github.com/nickkolok/chas-ege",
			},
			"Информация": {
				"Лицензии": "../doc/license.html" + genJson(null),
				"Разработчики": "../doc/razrab.html" + genJson(null),
				"История выпусков": "../doc/istor.html" + genJson(null),
				"Концепция": "../doc/koncepc2.html" + genJson(null),
				"Ссылки": "../doc/ssylki.html" + genJson(null),
			},
			"Опросы и голосования": "../doc/oprosy.html" + genJson(null),
		},
		"Мы ВКонтакте": {
			"Приложение": "https://vk.com/app3634828",
			"Группа": "https://vk.com/chasege",
		},
		"Сайт Математического факультета ВГУ": "https://www.math.vsu.ru"
	};
}

////
//// Are you really wanna get deeper?
////
	
function generateNormalMenu() {
	var menustring="";
	var nastrCopy = nastr.clone();
	delete nastrCopy.nabor.upak;
	var obol = document.location.href.match(/[a-zA-Z0-9-]+\.html/)[0] + "?" + Math.random();
	var target = " target=\""+nastr.style.menuLinkTarget+"\" ";
	function genJsonerator(n) {
		return '#' + JSON.stringify( n==null ? nastrCopy : n ).encodeURIComponent();
	}
	function writeMenuItem(title, href) {
		menustring+=("<li class=\"pureCssMenui\"><a class=\"pureCssMenui0\" href=\"" + href + "\"" + target + ">"
		               + title + "</a></li>");
	}
	function writeNodes(nodes) {
		for (var title in nodes) {
			if (typeof nodes[title] == typeof "")
				writeMenuItem(title, nodes[title]);
			else
				writeMenuCategory(title, nodes[title]);
		}
	}
	function writeMenuCategory(title, nodes) {
		menustring+='	<li class="pureCssMenui dropdown">'+
			'<a class="pureCssMenui dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" href="#"><span class="menuitem-span">' +
			title + '<span class="caret"></span></span> </a> ';
		menustring+=("	<!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->");
		menustring+=('	<ul class="pureCssMenum dropdown-menu" role="menu">');
		writeNodes(nodes);
		menustring+=("	</ul>");
		menustring+=("	<!--[if lte IE 6]></td></tr></table></a><![endif]-->");
		menustring+=("	</li>");
	}
	menustring+=("<div id=\"menucenter\">");
	menustring+=('<ul class="pureCssMenu pureCssMenum nav navbar-nav">');
	writeNodes(_getMenuModel(genJsonerator, nastrCopy, obol));
	menustring+=("</ul>");
	menustring+=("</div>");

	console.log("menu.js отработал - сгенерировано обычное меню");
	return menustring;
};

function generateTruncatedMenu(){
	console.log("menu.js отработал - сгенерировано отключенное меню");
	return '<center><u><a href="https://www.math.vsu.ru/chas-ege/doc/index.html" target="blank">Тренажёр "Час ЕГЭ"</a></u> разработан при <u><a href="https://www.math.vsu.ru/" target="blank">Математическом факультете ВГУ</a></u>.</center>';
}

if(!chas.mode.notGenerateAnyMenu){
	document.getElementById(chas.design.menuKeeperId).innerHTML=
		chas.mode.withoutMenu?generateTruncatedMenu():generateNormalMenu();
}
