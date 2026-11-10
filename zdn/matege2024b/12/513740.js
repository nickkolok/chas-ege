(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '513740';

		// Что найти: вторую диагональ по стороне и диагонали или периметр по двум диагоналям;
		// в задаче на периметр параллелограмм назван буквами или нет (в ФИПИ есть все три варианта),
		// в задаче на диагональ буквы нужны всегда
		let preference1 = ['diagonal', 'perimeterWithLetters', 'perimeterWithoutLetters'];
		// Как сказано о диагоналях: «являются биссектрисами его углов» или «делят его углы пополам» (в ФИПИ есть обе)
		let preference2 = ['bisectors', 'halves'];
		let rand = getSelectedPreferenceFromList(key, preference1);
		let randProperty = getSelectedPreferenceFromList(key, preference2);

		// Параллелограмм, диагонали которого — биссектрисы углов, — ромб. Его диагонали
		// перпендикулярны и делятся пополам, так что половины диагоналей и сторона образуют
		// пифагорову тройку k(m² − n², 2mn, m² + n²); все данные и ответ целые, как в ФИПИ.
		let m = sl(2, 7);
		let n = sl(1, m - 1);
		genAssertIrreducible(m, n, 'Тройка не примитивная');
		genAssert((m - n) % 2 === 1, 'Тройка не примитивная');
		let k = sl(1, 13);
		let side = k * (m * m + n * n);
		genAssert(side <= 65, 'Слишком большая сторона');
		let halves = [k * (m * m - n * n), k * 2 * m * n].shuffle();
		let diagonalAC = 2 * halves[0];
		let diagonalBD = 2 * halves[1];

		let property = ['являются биссектрисами его углов', 'делят его углы пополам'][randProperty];
		let name = (rand == 2) ? '' : ' $ABCD$';

		NAtask.setTask({
			text: `В параллелограмме${name} диагонали ${property}`,
			questions: [[{
				text: `, $AB=${side}$, $AC=${diagonalAC}$. Найдите $BD$.`,
				answers: diagonalBD,
			}, {
				text: ` и равны $${diagonalAC}$ и $${diagonalBD}$. Найдите периметр параллелограмма${name}.`,
				answers: 4 * side,
			}][Math.min(rand, 1)]],
			authors: ['Александра Суматохина'],
			preference: [preference1, preference2],
		});
		NAtask.modifiers.variativeABC();
		NAtask.modifiers.allDecimalsToStandard(true);

	}, 2000);
})();
// https://mathb-ege.sdamgia.ru/test?likes=513740
// https://mathb-ege.sdamgia.ru/problem?id=522678
