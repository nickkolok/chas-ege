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
			const checkZero = (member) => member == 0 ? '' : member;

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

			function toPiFraction(angle) {
				let ratio = angle / Math.PI;
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
				return sign + '\\frac{' + (absNum === 1 ? '' : absNum) + '\\pi}{' + den + '}';
			}

			function isTableAngle(angle) {
				let ratio = angle / Math.PI;
				let denCandidates = [1, 2, 3, 4, 6];
				for (let den of denCandidates) {
					let num = Math.round(ratio * den);
					if (Math.abs(ratio - num / den) < 1e-5) {
						return true;
					}
				}
				return false;
			}

			function angleToAnswer(angle, funcType, value) {
				if (isTableAngle(angle)) {
					return toPiFraction(angle);
				}
				let frac = toFraction(value);
				if (funcType === 'sin') {
					return '\\arcsin\\left(' + frac + '\\right)';
				}
				return '\\arccos\\left(' + frac + '\\right)';
			}

			//ФУНКЦИИ ДЛЯ РАБОТЫ С КОРНЯМИ
			function getRootSymbols(funcType, values) {
				let symbols = [];
				values.forEach(val => {
					if (Math.abs(val) > 1) return;

					let numericBase = (funcType === 'sin') ? Math.asin(val) : Math.acos(val);
					let baseExpr = angleToAnswer(numericBase, funcType, val);

					let expr1 = baseExpr + ' + 2\\pi k';
					let numeric1 = numericBase;
					symbols.push({
						expr: expr1,
						numeric: numeric1,
						period: 2 * Math.PI,
					});

					let expr2, numeric2;
					if (funcType === 'sin') {
						expr2 = '\\pi - ' + baseExpr + ' + 2\\pi k';
						numeric2 = Math.PI - numericBase;
					} else {
						expr2 = '-' + baseExpr + ' + 2\\pi k';
						numeric2 = -numericBase;
					}
					symbols.push({
						value: val,
						expr: expr2,
						numeric: numeric2,
						period: 2 * Math.PI,
						kind: 'shifted'
					});
				});
				return symbols;
			}

			function findRootsWithSymbols(symbols, intervalStart, intervalEnd) {
				let roots = [];
				symbols.forEach(sym => {
					let period = sym.period;
					let kMin = Math.floor((intervalStart - sym.numeric) / period) - 2;
					let kMax = Math.ceil((intervalEnd - sym.numeric) / period) + 2;
					for (let k = kMin; k <= kMax; k++) {
						let numeric = sym.numeric + period * k;
						if (numeric >= intervalStart - 1e-10 && numeric <= intervalEnd + 1e-10) {
							let symbolStr;

							// если итоговый угол табличный — выводим через π
							let tableAngle = isTableAngle(numeric);

							if (tableAngle) {
								symbolStr = toPiFraction(numeric);
							} else {

								let shift = (2 * k) + '\\pi';

								let baseExpr = sym.expr.replace('+ 2\\pi k', '');

								if (k === 0) {

									symbolStr = baseExpr;

								} else {

									if (baseExpr.startsWith('-')) {
										symbolStr = shift + baseExpr;
									} else {
										symbolStr = shift + '+' + baseExpr;
									}

									symbolStr = symbolStr
										.replace(/\+\-/g, '-')
										.replace(/\-\-/g, '+')
										.replace(/^\+/g, '');

									symbolStr = symbolStr.replace(
										/(-?\d+)\\pi\+\\pi/g, (_, n) => (Number(n) + 1) + '\\pi'
									);
								}
							}
							roots.push({
								numeric,
								symbol: symbolStr
							});
						}
					}
				});
				let unique = [];
				let seen = new Set();
				roots.forEach(r => {
					let key = r.numeric.toFixed(10);
					if (!seen.has(key)) {
						seen.add(key);
						unique.push(r);
					}
				});
				unique.sort((a, b) => a.numeric - b.numeric);
				return unique;
			}

			//ОСНОВНАЯ ГЕНЕРАЦИЯ
			var funcType = sl1(); // 0 - sin, 1 - cos
			var arcSinCos = slKrome(0.5, 0.1, 0.9, 0.1).pm();
			var chislo = [-1, -0.5, 0, 0.5, 1, Math.round(arcSinCos * 10) / 10].iz();
			var abroad = sl(2, 5).pm();
			var sc = ['sin', 'cos'];

			var mult1 = math.parse(sc[funcType] + '(x)' + checkSign(chislo) + checkZero(chislo));
			var mult2 = math.parse(sc[funcType] + '(x)' + checkSign(abroad) + abroad);
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
			let slPi = sl1(); 
			let denominator = sl(1, 6);
			let interval = sl(-6, 1);
			var intervalStartNum = interval * (1 / denominator);
			var intervalEndNum = sl(intervalStartNum + 2, intervalStartNum + 5);

			genAssert(intervalEndNum > intervalStartNum, 'Правый конец больше левого');

			let radStart = intervalStartNum * (slPi ? 1 : Math.PI);
			let radEnd = intervalEndNum * (slPi ? 1 : Math.PI);

			//КОРНИ
			let val1 = -chislo;
			let val2 = -abroad;
			let rootValues = [val1, val2];
			let rootSymbols = getRootSymbols(sc[funcType], rootValues);
			let rootsInfo = findRootsWithSymbols(rootSymbols, radStart, radEnd);
			if (rootsInfo.length === 0) throw new Error("Нет корней в интервале, перегенерируем");
			let formattedRoots = rootsInfo.map(r => r.symbol).join(', ');
			formattedRoots = formattedRoots.replace(/-1\\pi/g, '-\\pi').replace(/\b1\\pi/g, '\\pi');

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
			let solutions = [];
			
			[val1, val2].forEach(val => {
				if (Math.abs(val) <= 1) {
					let angle = (sc[funcType] === 'sin') ? Math.asin(val) : Math.acos(val);
					let base = angleToAnswer(angle, sc[funcType], val);

					if (sc[funcType] === 'sin') {

						if (base === '0') {

							solutions.push(`x = 2\\pi k`);

						} else {

							solutions.push(`x = ${base} + 2\\pi k`);

							let secondBase;

							if (isTableAngle(Math.PI - angle)) {
								secondBase = toPiFraction(Math.PI - angle);
							} else {
								secondBase = `\\pi - ${base}`;
							}

							solutions.push(`x = ${secondBase} + 2\\pi k`);

						}

					} else {

						if (base === '0') {

							solutions.push(`x = 2\\pi k`);

						} else {

							solutions.push(`x = ${base} + 2\\pi k`);
							solutions.push(`x = -${base} + 2\\pi k`);

						}

					}
				}
			});
			answerText = solutions.join(';\\quad ');

			function toInputFormat(latexExpr) {
				let result = latexExpr
					.replace(/\\arccos\\left\(/g, 'arccos(')
					.replace(/\\arcsin\\left\(/g, 'arcsin(')
					.replace(/\\right\)/g, ')')
					.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2')
					.replace(/\\pi/g, 'pi')
					.replace(/\s/g, '');
				result = result.replace(/\(([^()]+)\)(?=[+*])/g, '$1');
				return result;
			}

			// Преобразуем корни в формат для ввода
			let inputRoots = rootsInfo.map(r => toInputFormat(r.symbol)).join(', ');
			inputRoots = inputRoots.replace(/-1\\pi/g, '-\\pi').replace(/\b1\\pi/g, '\\pi');

			chas2.task.setTask({
				text: 'А) Решите уравнение: $$' + finalExpr.toTex() + '=0$$ Б) Укажите корни, принадлежащие отрезку: $$\\left[' +
					startStr + '; ' + endStr + '\\right]$$',
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
