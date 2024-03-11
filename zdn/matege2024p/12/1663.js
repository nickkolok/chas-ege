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

		var mult1 = math.parse('cos(x)' + znak + '+1/2');
		var mult2 = math.parse('cos(x)' + znak + '+2');
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
			l: '(cos(n1))^2',
			r: '1-(sin(n1))^2'
		}]);
		var e10 = math.simplify(e9, [{
			r: 'n1*n3 - n2*n3',
			l: '(n1-n2)*n3'
		}]);
		var e11 = math.simplify(e10);
		if (sl(0, 1)) {
			var e12 = math.simplify(e11, [{
				l: 'cos(n1)',
				r: 'sin(n1+ pi/2)'
			}]);
		} else {
			var e12 = e11;
		}
		if (sl(0, 1)) {
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
			answers: 'cosx' + znak + '1/2=0 cosx' + znak + '2=0',
		});
		return true;
	});
})();
//1163

