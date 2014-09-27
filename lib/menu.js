'use strict';

function _get_menu_model(json_gen, nastr_copy, obol) {
	//Математика ЕГЭ-2013
	var nastr_mat2013 = nastr_copy.clone();
	nastr_mat2013.nabor = { zagol:'../zdn/mat/mat.js' };

	//Математика ЕГЭ-2014
	var nastr_mat2014 = nastr_copy.clone();
	nastr_mat2014.nabor = { zagol:'../zdn/mat2014/mat2014.js' };

	//Тригонометрия
	var nastr_tri = nastr_copy.clone();
	nastr_tri.nabor = { zagol:'../zdn/tri/tri.js' };

	//Русский язык ЕГЭ-2014
	var nastr_rus2014 = nastr_copy.clone();
	nastr_rus2014.nabor = { zagol:'../zdn/rus2014/rus2014.js' };

	//Информатика ЕГЭ-2014
	var nastr_inf2014 = nastr_copy.clone();
	nastr_inf2014.nabor = { zagol:'../zdn/inf/inf.js' };

	//История: Перегудов
	var nastr_istpereg = nastr_copy.clone();
	nastr_istpereg.nabor = { zagol:'../zdn/istpereg/istpereg.js' };

	return {
		"На главную": "../doc/index.html" + json_gen(null),
		"Тесты": {
			"По предметам": {
				"Математика: ЕГЭ-2014": obol + json_gen(nastr_mat2013),
				"Математика: ЕГЭ-2013": obol + json_gen(nastr_mat2014),
				"Тригонометрия: формулы": obol + json_gen(nastr_tri),
				"История: даты": obol + json_gen(nastr_istpereg),
				"Русский язык, ЕГЭ: часть": obol + json_gen(nastr_rus2014),
				"Информатика, ЕГЭ: начало": obol + json_gen(nastr_inf2014)
			},
			"Случайное задание": "../sh/sluch.html" + json_gen(null),
			"Каталог заданий набора": "../sh/katalog.html" + json_gen(null),
			"Полный тест": "../sh/polnmat.html" + json_gen(null),
			"Тесты на печать": "../sh/pechmat.html" + json_gen(null),
		},
		"Прочее": {
			"Разработчикам": {
				"Техническое": "../doc/tech.html" + json_gen(null),
				"Режим отладки шаблона": "../sh/otladka.html" + json_gen(null),
			},
			"Скачивание": {
				"Системные требования": "../doc/systreb.html" + json_gen(null),
				"Скачать": "../doc/skachat.html" + json_gen(null),
				"Репозиторий на GitHub": "https://github.com/nickkolok/chas-ege",
			},
			"Информация": {
				"Лицензии": "../doc/license.html" + json_gen(null),
				"Разработчики": "../doc/razrab.html" + json_gen(null),
				"История выпусков": "../doc/istor.html" + json_gen(null),
				"Концепция": "../doc/koncepc2.html" + json_gen(null),
				"Ссылки": "../doc/ssylki.html" + json_gen(null),
			},
			"Опросы и голосования": "../doc/oprosy.html" + json_gen(null),
		},
		"Мы ВКонтакте": {
			"Приложение": "https://vk.com/app3634828",
			"Группа": "https://vk.com/chasege",
		},
		"Сайт Математического факультета ВГУ": "https://www.math.vsu.ru"
	};
}


////
//// Are you realy wanna get deeper?
////

if(!_4ege) {
	(function() {
		var nastr_copy = nastr.clone();
		nastr_copy.upak = undefined;
		var obol = document.location.href.match(/[a-zA-Z0-9]+\.html/)[0] + '?' + Math.random();
		var target=' target="'+nastr.style.menuLinkTarget+'" ';

		function json_generator(n) {
			var options = n
			if (n == null)
				options = nastr_copy;

			return '#' + JSON.stringify(n).encodeURIComponent();

		}

		function write_menu_item(title, href) {
			document.write("<li class=\"pureCssMenui\"><a class=\"pureCssMenui0\" href=\"" + href + "\"" + target +
			               ">" + title + '</a></li>');
		}

		function write_nodes(nodes) {
			for (var title in nodes) {
				console.log(title);
				if (typeof nodes[title] == typeof "")
					write_menu_item(title, nodes[title])
				else
					write_menu_category(title, nodes[title])
			}
		}

		function write_menu_category(title, nodes) {
			document.write("	<li class=\"pureCssMenui\"><a class=\"pureCssMenui\" href=\"#\"><span>" + title + "</span>");
			document.write("	<!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->");
			document.write("	<ul class=\"pureCssMenum\">");

			write_nodes(nodes);

			document.write("	</ul>");
			document.write("	<!--[if lte IE 6]></td></tr></table></a><![endif]-->");
			document.write("	</li>");
		}

		document.write('<div id="menucenter">');
		document.write('<ul class="pureCssMenu pureCssMenum">');
		write_nodes(_get_menu_model(json_generator, nastr_copy, obol));
		document.write('</ul>');
		document.write('</div>');

		console.log('menu.js отработал');
	})();
} else {
	document.write('<center><a href="https://www.math.vsu.ru/chas-ege/doc/index.html" target="blank">"Час ЕГЭ"</a> разработан при <a href="https://www.math.vsu.ru/" target="blank">Математическом факультете ВГУ</a>.</center>');
}

