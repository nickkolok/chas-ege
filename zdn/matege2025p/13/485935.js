(function() {
	retryWhileError(function() {
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

			//ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
			function normalizeEquation(equation) {
				let normalized = equation.toLowerCase();
				normalized = normalized.replace(/\s+/g, "");
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

			const checkSign = (member) => member < 0 ? '' : member > 0 ? '+' : '';
			const checkSign2 = (member) => member < 0 ? '-' : '';
			const checkOne = (member) => member == 1 ? '' : member;

			//ФУНКЦИИ ДЛЯ РАБОТЫ С ДРОБЯМИ
			function gcd(a, b) {
				a = Math.abs(a);
				b = Math.abs(b);
				while (b !== 0) {
					let t = b;
					b = a % b;
					a = t;
				}
				return a;
			}

			// Преобразует десятичное число в обыкновенную дробь (без π)
			function toFraction(value, maxDenom = 20) {
				if (Math.abs(value) < 1e-9) return '0';
				if (Number.isInteger(value)) return value.toString();

				let bestNum = 0,
					bestDen = 1,
					bestError = Math.abs(value);
				for (let den = 1; den <= maxDenom; den++) {
					let num = Math.round(value * den);
					let error = Math.abs(value - num / den);
					if (error < bestError) {
						bestError = error;
						bestNum = num;
						bestDen = den;
					}
				}
				let divisor = gcd(bestNum, bestDen);
				bestNum /= divisor;
				bestDen /= divisor;

				if (bestDen === 1) return bestNum.toString();
				return checkSign2(bestNum) + '\\frac{' + Math.abs(bestNum) + '}{' + bestDen + '}';
			}

			// Преобразует число, гарантированно равное рациональному кратному π, в строку с π
			function toPiFraction(value) {
				let ratio = value / Math.PI;
				// Пытаемся подобрать знаменатель из {1,2,3,4,6}
				let bestNum = 0,
					bestDen = 1,
					bestError = Math.abs(ratio);
				let denCandidates = [1, 2, 3, 4, 6];
				for (let den of denCandidates) {
					let num = Math.round(ratio * den);
					let error = Math.abs(ratio - num / den);
					if (error < bestError) {
						bestError = error;
						bestNum = num;
						bestDen = den;
					}
				}
				if (bestError > 1e-5) {
					return value.toFixed(4) + '\\pi';
				}
				// Сокращаем дробь
				let divisor = gcd(bestNum, bestDen);
				let num = bestNum / divisor;
				let den = bestDen / divisor;
				let sign = num < 0 ? '-' : '';
				let absNum = Math.abs(num);
				if (den === 1) {
					if (absNum === 0) return '0';
					if (absNum === 1) return sign + '\\pi';
					if (absNum === 2) return sign + '2\\pi';
					return sign + absNum + '\\pi';
				}
				return sign + '\\frac{' + checkOne(absNum) + '\\pi}{' + den + '}';
			}

			//ФУНКЦИИ ДЛЯ РАБОТЫ С КОРНЯМИ
			function getRootExpressions(funcType, values) {
				let expressions = [];
				values.forEach(val => {
					if (Math.abs(val) > 1) return;
					if (funcType === 'sin') {
						let arcExpr = `asin(${val})`;
						expressions.push(`${arcExpr} + 2*pi*k`);
						expressions.push(`pi - ${arcExpr} + 2*pi*k`);
					} else {
						let arcExpr = `acos(${val})`;
						expressions.push(`${arcExpr} + 2*pi*k`);
						expressions.push(`-${arcExpr} + 2*pi*k`);
					}
				});
				return expressions;
			}

			function findRootsInInterval(rootExpressions, intervalStart, intervalEnd) {
				let roots = [];
				rootExpressions.forEach(expr => {
					let val0;
					try {
						val0 = math.evaluate(expr.replace(/k/g, '0'));
					} catch (e) {
						val0 = 0;
					}
					let period = 2 * Math.PI;
					let kMin = Math.floor((intervalStart - val0) / period) - 2;
					let kMax = Math.ceil((intervalEnd - val0) / period) + 2;
					for (let k = kMin; k <= kMax; k++) {
						let exprWithK = expr.replace(/k/g, `(${k})`);
						try {
							let value = math.evaluate(exprWithK);
							if (value >= intervalStart - 1e-10 && value <= intervalEnd + 1e-10) {
								roots.push(value);
							}
						} catch (e) {}
					}
				});
				roots = [...new Set(roots.map(r => parseFloat(r.toFixed(10))))];
				roots.sort((a, b) => a - b);
				return roots;
			}

			function formatRootsList(roots) {
				if (roots.length === 0) throw new Error("Нет корней в интервале, перегенерируем");
				return roots.map(root => toPiFraction(root)).join(', ');
			}

			//ОСНОВНАЯ ГЕНЕРАЦИЯ
			var l1 = sl1(); // 0 - sin, 1 - cos
			var l = sl(0, 3);
			var chislo = [-1, -0.5, 0.5, 1];
			var abroad = sl(2, 5).pm();
			var sc = ['sin', 'cos'];

			// Формируем уравнение
			var mult1 = math.parse(sc[l1] + '(x)' + checkSign(chislo[l]) + chislo[l]);
			var mult2 = math.parse(sc[l1] + '(x)' + checkSign(abroad) + abroad);
			var a = String(sl(2, 9));

			var prod = new math.OperatorNode('*', 'multiply', [mult1, mult2]);
			var e2 = math.expandProdSums(prod);
			var e3 = math.simplify(e2);
			var e4 = new math.OperatorNode('*', 'multiply', [math.parse(a), e3]);
			var e5 = math.expandProdSums(e4);
			var e6 = math.simplify(e5);
			var e7 = math.expandProdSums(e6);
			var finalExpr = math.simplify(e7);

			var equations = [
				finalExpr.toTex(),
				e7.toTex(),
				e6.toTex(),
				e5.toTex(),
				e4.toTex(),
				e3.toTex(),
				e2.toTex(),
				prod.toTex()
			];
			var uniqueEquations = removeDuplicates(equations);

			//ГЕНЕРАЦИЯ ИНТЕРВАЛА
			let slPi = sl1(); // 0 - с π, 1 - без π
			let denominator = sl(1, 6);
			let interval = sl(-6, -1);
			var intervalStartNum = interval * (1 / denominator);
			var intervalEndNum = slKrome(0, intervalStartNum + 2, intervalStartNum + 5);

			genAssert(intervalEndNum > intervalStartNum, 'Правый конец больше левого');

			let radStart = intervalStartNum * (slPi ? 1 : Math.PI);
			let radEnd = intervalEndNum * (slPi ? 1 : Math.PI);

			//ПОИСК КОРНЕЙ
			let rootValues = [-chislo[l], -abroad];
			let rootExpressions = getRootExpressions(sc[l1], rootValues);
			let rootsInInterval = findRootsInInterval(rootExpressions, radStart, radEnd);
			let formattedRoots = formatRootsList(rootsInInterval);

			//ФОРМАТИРОВАНИЕ ГРАНИЦ ИНТЕРВАЛА
			let startStr, endStr;
			if (slPi) {
				startStr = toFraction(intervalStartNum);
				endStr = toFraction(intervalEndNum);
			} else {
				let formatBound = (val) => {
					if (Math.abs(val) < 1e-9) return '0';
					if (Number.isInteger(val)) {
						if (val === 1) return '\\pi';
						if (val === -1) return '-\\pi';
						return val + '\\pi';
					}
					let numerator = Math.round(val * denominator);
					let divisor = gcd(Math.abs(numerator), denominator);
					numerator /= divisor;
					let den = denominator / divisor;
					if (den === 1) {
						if (numerator === 1) return '\\pi';
						if (numerator === -1) return '-\\pi';
						return numerator + '\\pi';
					}
					return checkSign2(numerator) + '\\frac{' + checkOne(Math.abs(numerator)) + '\\pi}{' + den + '}';
				};
				startStr = formatBound(intervalStartNum);
				endStr = formatBound(intervalEndNum);
			}

			//ФОРМИРОВАНИЕ ОТВЕТА
			let answerText = '';
			let val1 = -chislo[l];
			let val2 = -abroad;

			if (Math.abs(val1) > 1 && Math.abs(val2) > 1) {
				throw new Error("Нет корней в интервале, перегенерируем");
			} else {
				let solutions = [];
				[val1, val2].forEach(val => {
					if (Math.abs(val) <= 1) {
						if (sc[l1] === 'sin') {
							let arc = Math.asin(val);
							let arcFormatted = toPiFraction(arc);
							if (arcFormatted == 0) {
								solutions.push(`x = 2\\pi k`);
							} else {
								solutions.push(`x = ${arcFormatted} + 2\\pi k`);
								solutions.push(`x = \\pi ${checkSign(val)} ${arcFormatted} + 2\\pi k`);
							}
						} else {
							let arc = Math.acos(val);
							let arcFormatted = toPiFraction(arc);
							if (arcFormatted == 0) {
								solutions.push(`x = 2\\pi k`);
							} else {
								solutions.push(`x = ${arcFormatted} + 2\\pi k`);
								solutions.push(`x = -${arcFormatted} + 2\\pi k`);
							}
						}
					}
				});
				answerText = solutions.join(';\\quad ');
			}

			//ФУНКЦИЯ ДЛЯ ПРЕОБРАЗОВАНИЯ В ФОРМАТ ВВОДА
			function toInputFormat(latexRoot) {
				if (latexRoot === '0') return '0';
				let result = latexRoot
					.replace(/\\frac\{([^}]+)\}\{([^}]+)\}\\pi/g, '($1/$2)*pi')
					.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1/$2)')
					.replace(/\\pi/g, 'pi')
					.replace(/\*/g, '')
					.replace(/\s/g, '');
				if (result.startsWith('(') && result.endsWith(')')) {
					result = result.slice(1, -1);
				}
				return result;
			}

			// Преобразуем корни в формат для ввода
			let inputRoots = rootsInInterval.map(root => toInputFormat(toPiFraction(root))).join(', ');

			chas2.task.setTask({
				text: 'А) Решите уравнение: $$' + finalExpr.toTex() + '=0$$ Б) Укажите корни, принадлежащие отрезку: $$[' +
					startStr + '; ' + endStr + ']$$' +
					'(Ответ введите в виде: ' + '0, -(pi/2), 5pi/6' + ')',
				analys: 'Решение: ' + uniqueEquations.join('') +
					'\n\n$$' + answerText + '$$' +
					'\n\nКорни, попадающие в отрезок: $$' + formattedRoots + '$$',
				answers: inputRoots,
			});

			return true;
		});
	}, 10000);
})();
//485935
