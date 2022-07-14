(function() {
	retryWhileError(function() {
		'use strict';

		var v = sl1();
		var d = v ? '+' : '-';
		var znak = v ? 1 : (-1);

		var a = sluchch(2, 3);
		var b;
		if (a === 2) {
			b = znak * sluchch(4, 64, 8).pm();
		} else {
			b = sluchch(15, 69, 27);
		}

		var y = sluchch(1, 3);
		var c = sluchch(1, 3);
		var t = -znak * (12 + b) / a.pow(c);
		var u = sluchch(1, 4);
		var z = y * a.pow(c) + u;

		var x = (t * a.pow(c) - b) / (z.plusminus() - y.plusminus() * a.pow(c));
		genAssertZ1000(x, "Корень очень нецелый");

		var x1 = -b.plusminus() / z;
		var x2 = -t.plusminus() / y;
		genAssertZ1000(x1, "Корень очень нецелый");
		genAssertZ1000(x2, "Корень очень нецелый");
		genAssert(x > -b.plusminus() / z, "Корень не попадает в ОДЗ");
		genAssert(x > -t.plusminus() / y, "Корень не попадает в ОДЗ");

		var ans = x1;
		var ans1;
		var q = b;
		var j = z;

		if (x2 > x1) {
			ans = x2;
			q = t;
			j = y;
		}

		if (ans.isZ()) { //Дробная часть для смешанного числа
			ans1 = ' ';
		} else {
			ans = Math.trunc(ans);
			ans1 = '\\frac{' + (q.abs() % j) + '}{' + j + '}';
			if (ans === 0) {
				if (-q.plusminus() < 0) {
					ans = '-';
				} else ans = ' ';
			}
		}

		chas2.task.setAdditiveEquationTask({
			parts: ['-\\log_{' + a + '}{(' + [b.plusminus(), z + 'x'].slag() + ')}', '\\log_{' + a + '}{(' + [t.plusminus(),
				y + 'x'
			].slag() + ')}', c],
			roots: x,
			enablePartsSubtraction: [1, 0],
		}, {
			tags: {
				log: 1,
			},
			analys: 'Решение:' +
				'$$\\log_{' + a + '}{(' + b.plusminus() + '+' + z + 'x' + ')}=' + '\\log_{' + a + '}{(' + t.plusminus() + '+' +
				y + 'x' + ')}+{' + c + '}$$' +
				'$${' + c + '} =\\log_{' + a + '}{' + a + '^' + c + '},\\ \\log_{a}{b}+' + '\\log_{a}{c}=' +
				'\\log_{a}{bc} \\ \\Rightarrow\\ \\log_{' + a + '}{(' + t.plusminus() + '+' + y + 'x' + ')}+\\log_{' + a +
				'}{' + a.pow(c) +
				'}=\\log_{' + a + '}{((' + t.plusminus() + '+' + y + 'x' + ')}\\cdot' + '{' + a.pow(c) +
				')} \\ \\Rightarrow$$' +
				'$$\\Rightarrow\\ \\begin{cases} {' + b.plusminus() + '+' + z + 'x' + '>0} \\\\ {' + t.plusminus() + '+' + y +
				'x' +
				'>0}\\\\ {(' + b.plusminus() + '+' + z + 'x' + ') = (' + t.plusminus() + '+' + y + 'x' + ')}\\cdot' + a.pow(c) +
				'\\end{cases}\\Rightarrow \\begin{cases} {' + z + 'x>' + (-b.plusminus()) + '} \\\\ {' + y + 'x>' + (-t.plusminus()) +
				'}\\\\{' + b.plusminus() + '+' + z + 'x' + ' = ' + t.plusminus() * a.pow(c) + '+' + y * a.pow(c) + 'x' +
				'}\\end{cases}\\Rightarrow \\begin{cases} x>\\frac{' + (-b.plusminus()) + '}{' + z + '}' +
				'\\\\~\\\\ x>\\frac{' + (-t.plusminus()) + '}{' + y + '}\\\\~\\\\ {' + (-y * a.pow(c) + z).plusminus() +
				'x=' + (t * a.pow(c) - b) + '}\\end{cases}\\Rightarrow' +
				'\\begin{cases} x>' + ans + ' ' + ans1 + '\\\\~\\\\ x={' + (t * a.pow(c) - b) / ((-y * a.pow(c) + z).plusminus()) +
				'}\\end{cases}$$' +

				'Ответ: $x=' + (t * a.pow(c) - b) / ((-y * a.pow(c) + z).plusminus())+'.' + '$',
		});
	});
})();
//77381
//Сергей Алендарь
