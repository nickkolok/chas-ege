(function() {
	retryWhileUndefined(function() {
		'use strict';

		math.expandProdSums = function(expr) {
			return math.simplify(expr, [{
				r: 'n1*n3 + n2*n3',
				l: '(n1+n2)*n3'
			}, {
				r: 'n1*n3 - n2*n3',
				l: '(n1-n2)*n3'
			}, ]);
		}
		var v = sl1();
		var znak = (v ? '+' : '-');
		var l1 = sl1();
		var l2 = (l1 + 1) % 2;
		var l3 = sl(0, 2);
		var sc = ['sin', 'cos'];
		var pm = ['', '-'];
		var mass = [pm[l1] + sc[l2] + '(n1+ pi/2)', pm[l2] + sc[l2] + '(n1+ 3pi/2)'];

		var mult1 = math.parse(sc[l1] + '(x)' + znak + '1/2');
		var mult2 = math.parse(sc[l1] + '(x)' + znak + '2');
		var a = sl(2, 9);
		var b = sl(1, 9);
		a = String(a);
		b = String(b);

		var prod = new math.OperatorNode('*', 'multiply', [mult1, mult2]);
		var e2 = math.simplify(prod, [{
			r: 'n1*n3 + n2*n3',
			l: '(n1+n2)*n3'
		}]);
		var e3 = math.simplify(e2);
		var e4 = new math.OperatorNode('*', 'multiply', [math.parse(a), e3]);
		var e5 = math.simplify(e4, [{
			r: 'n1*n3 + n2*n3',
			l: '(n1+n2)*n3'
		}]);
		var e6 = math.simplify(e5);
		var e7 = math.simplify(e6, [{
			r: 'n1*n3 + n2*n3',
			l: '(n1+n2)*n3'
		}]);
		var e8 = math.simplifyCore(e7);
		var e9 = math.simplify(e8, [{
			l: '(' + sc[l1] + '(n1))^2',
			r: '1' + pm[l1] + '(' + sc[l2] + '(n1))^2'
		}]);
		var e10 = math.simplify(e9, [{
			r: 'n1*n3 - n2*n3',
			l: '(n1-n2)*n3'
		}]);
		var e11 = math.simplify(e10);
		if (sl1()) {
			var e12 = math.simplify(e11, [{
				l: sc[l1] + '(n1)',
				r: mass[l2],
			}]);
		} else {
			var e12 = e11;
		}
		if (sl1()) {
			var e13 = new math.OperatorNode('*', 'multiply', [math.parse(b), e12]);
		} else {
			var e13 = e12;
		}
		var e14 = math.expandProdSums(e13);
		var e15 = math.simplify(e14);

		chas2.task.setTask({
			text: "$$" +
				e15.toTex() + '=0' +
				"$$",
			analys: '$$' + e11.toTex() + '$$' +
				'$$' + e9.toTex() + '$$' +
				'$$' + e7.toTex() + '$$' +
				'$$' + e5.toTex() + '$$' +
				'$$' + e3.toTex() + '$$' +
				'$$Ответ: \\quad \\' + sc[l1] + ' x' + znak + '\\frac{1}{2}=0 \\quad \\' + sc[l1] + ' x' + znak +
				'2=0$$',
			answers: sc[l1] + znak + '1/2=0 ' + sc[l1] + znak + '2=0',
		});
		return true;
	});
})();
//1163

