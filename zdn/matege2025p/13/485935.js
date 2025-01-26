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
			}]);
		};

		function normalizeEquation(equation) {
			// Приводим к нижнему регистру
			let normalized = equation.toLowerCase();

			// Убираем пробелы
			normalized = normalized.replace(/\s+/g, "");

			// Заменяем 'x^2' на 'x*x'
			normalized = normalized.replace(/x\^2/g, 'x*x');

			return normalized;
		}

		function removeDuplicates(equations) {
			const uniqueEquations = [];
			const seen = new Set();

			equations.forEach(equation => {
				const normalized = normalizeEquation(equation);
				if (!seen.has(normalized)) {
					seen.add(normalized);
					uniqueEquations.push(`$$${equation}$$`);
				}
			});
			return uniqueEquations;
		}
		var l1 = sl1();
		var l = sl(0, 4)
		var chislo = [-1, -0.5, 0, 0.5, 1];
		var abroad = sl(2, 5).pm();
		var sc = ['sin', 'cos'];


		var otvetsin = ['\\frac{\\pi}{2}', '\\frac{\\pi}{6}', '\\pi', '\\frac{5 \\pi}{6}', '\\frac{-\\pi}{2}'];
		var otvetcos = ['', '\\frac{\\pi}{3}', '\\frac{\\pi}{2}', '\\frac{2 \\pi}{3}', '\\pi'];
		var otvet = l1 ? otvetcos : otvetsin;

		var mult1 = math.parse(sc[l1] + '(x) +' + chislo[l]);
		var mult2 = math.parse(sc[l1] + '(x) + ' + abroad);

		var a = String(sl(2, 9));

		var prod = new math.OperatorNode('*', 'multiply', [mult1, mult2]);
		var e2 = math.expandProdSums(prod);
		var e3 = math.simplify(e2);
		var e4 = new math.OperatorNode('*', 'multiply', [math.parse(a), e3]);
		var e5 = math.expandProdSums(e4);
		var e6 = math.simplify(e5);
		var e7 = math.expandProdSums(e6);

		var equations = [
			e7.toTex(),
			e6.toTex(),
			e5.toTex(),
			e4.toTex(),
			e2.toTex()
		];

		var uniqueEquations = removeDuplicates(equations);

		// Примерное значение π
		const piApprox = 3.141592653589793;

		// Определяем функцию для проверки корней
		function checkRootsInInterval(roots, intervalStart, intervalEnd) {
			var validRoots = [];

			roots.forEach(root => {
				if (root.trim() === '') return; // Пропускаем пустые корни

				// Преобразование корня в числовое значение для проверки
				let valueStr = root.replace(/\\frac{([^}]+)}{([^}]+)}/g, '($1/$2)').replace(/\\pi/g, piApprox);

				// Логирование для отладки: выводим преобразованную строку
				console.log(`Преобразованная строка для корня "${root}": ${valueStr}`);

				try {
					// Выполняем вычисление
					var value = eval(valueStr);
				} catch (e) {
					console.error(`Ошибка при вычислении значения для корня "${root}": `, e);
					return; // Если произошла ошибка, пропускаем этот корень
				}

				// Добавление периодичности: проверяем для k = -1, 0, 1
				for (var k = -1; k <= 1; k++) {
					var checkValue = value + (k * piApprox);
					if (checkValue >= intervalStart && checkValue <= intervalEnd) {
						validRoots.push(checkValue);
					}
				}
			});

			return validRoots;
		}

		// Задаем интервал

		let sluchNumberForInterval = [2, 1, 1 / 2, 1 / 3, 1 / 4].iz();
		var intervalStart = -[sluchNumberForInterval * piApprox, sl(-6, 0)].iz();
		var intervalEnd = [sluchNumberForInterval * piApprox, sl(0, 6)].iz();

		// Проверяем корни на принадлежность к отрезку
		var rootsInInterval = checkRootsInInterval(otvet, intervalStart, intervalEnd);




		chas2.task.setTask({
			text: 'А) Решите уравнение: ' + "$$" + e7.toTex() + '=0' + "$$" + 'Б) Укажите корни, принадлежащие отрезку: [' +
				intervalStart + ',' + intervalEnd + ']',
			analys: uniqueEquations +
				'$$x= \\pm' + otvet[l] + '+ \\pi k,\\quad k \\in \\mathbb {Z}' + '$$' + "Корни, попадающие в отрезок: " +
				rootsInInterval,
			answers: sc[l1] + ' + ' + chislo[l] + '=0 ' + sc[l1] + ' + ' + abroad + '=0',
		});

		return true;
	});
})();

//485935

