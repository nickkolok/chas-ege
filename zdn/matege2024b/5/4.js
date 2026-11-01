(function () { retryWhileError(function() {


	var a = sluchiz([100, 120, 150, 200, 250, 300, 400, 500, 600, 800, 1000, 1200, 1400, 1500, 1600, 2000])[0];
	var b = sluchch(1, Math.min(200, a - 1));
	let key = "4";
	let preference1 = ['notHaveDefectInQuest', 'haveDefectInQuest'];
	let preference2 = ['haveDefect', 'notHaveDefect'];
	let v1 = getSelectedPreferenceFromList(key, preference1);
	let v2 = getSelectedPreferenceFromList(key, preference2);
	var c = (v1 ? b : a - b) / a;
	genAssertZ1000(c);
	var d = v2 ? a - b : b;
	var f = sluchch(om.tovary.ie.length - 1);
	var t1 = v1 ? 'имеет дефекты' : 'не имеет дефектов';
	window.vopr.txt = 'В среднем из ' + a + ' ' + om.tovary.rm[f] + ', поступивших в продажу, ' +
		d + ' ' + (v2 ? 'не ' : '') + chislit(d, 'имеет', 'имеют', 'имеют') + ' дефект' + (!v2 ? 'ы' : 'ов') +
		'. Найдите вероятность того, что один случайным образом выбранный экземпляр товара ' + t1 + '.';
	window.vopr.ver = ['' + c.ts()];
	window.vopr.preference = [preference1, preference2];
	

	window.vopr.kat['log'] = 0;
	window.vopr.kat['prz'] = 0;
	window.vopr.kat['drs'] = 0;
	window.vopr.kat['tri'] = 0;
}, 20000);})();
// Сверка ФИПИ: все исходные коды соответствующих позиций.
// 5.69: 2AD00F, 55BE2F, C72A27, 650BAA, 1838C1
// 5.70: A80912, 5C69FB, 47B427, 107F28, 4C15D0
// 5.85: F715C3
// 5.93: FE115C
// 5.94: 5878E5
// 5.99: 1EABFF
// 5.102: 1EDA7B
// 5.104: 0E8496
// 5.105: 8A57C1
// 5.106: A36EFD, B45312, 2C189C, 78C48F, 38A680, 302D46, 92D6F4, E858F1, 5A0602, AA860D, 355108, E0EC1F, 5AEE24, 017857, 79A75E, 7975ED, FBFB65, 8D5A67, 00ED8A, DC4F8B
// 5.107: 930448, 4259F0, CB56FF, 70451D, 4A7A32, 9AD837
// 5.108: 574444
// 5.117: FD51E3
// 5.118: 7E2CFB
// 5.122: 40A9B0
// 5.124: 9430A7
