(function() {
	var all_sports, rus_sports, answ, is_rus;
	do {
		all_sports = sluchch(100, 900, 2);
		rus_sports = sluchch(10, all_sports - 50);
		is_rus = ['', 'не '].iz();
		answ = is_rus === '' ? (rus_sports - 1) / all_sports : (all_sports - rus_sports) / all_sports;
	} while (answ.ts().length > 4)
	var name = om.imenaj.ie.iz();
	var game = om.sportparn.pe.iz();
	var country = om.strany.re.iz();
	window.vopr.txt = 'Перед началом первого тура чемпионата по ' + game +
		' участниц разбивают на игровые пары случайным образом ' +
		'с помощью жребия. Всего в чемпионате участвует ' + chislitM(all_sports, 'спортсменка', 'спортсменки', 'спортсменок') +
		', среди которых ' + chislitM(rus_sports, 'участница', 'участницы', 'участниц') + ' из ' + country + ', ' +
		'в том числе ' + name + '. Найдите вероятность того, что в первом туре ' + name +
		' будет играть с какой-либо спортсменкой ' + is_rus + 'из ' + country + '.';
	window.vopr.ver = [answ];
	window.vopr.kat['log'] = 0;
	window.vopr.kat['prz'] = 0;
	window.vopr.kat['drs'] = 0;
	window.vopr.kat['tri'] = 0;
})();
//fixed by Aisse-258
