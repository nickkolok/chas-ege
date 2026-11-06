(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		
		let key = "513740";
		
		let preference = ['diagonal', 'perimeter'];
		let rand = getSelectedPreferenceFromList(key, preference);

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

		NAtask.setTask({
			text: `В параллелограмме $ABCD$ диагонали являются биссектрисами его углов`,
			questions: [[{
				text: `, $AB=${side}$, $AC=${diagonalAC}$. Найдите $BD$.`,
				answers: diagonalBD,
			}, {
				text: ` и равны $${diagonalAC}$ и $${diagonalBD}$. Найдите периметр параллелограмма $ABCD$.`,
				answers: 4 * side,
			}][rand]],
			authors: ['Александра Суматохина'],
			preference:preference,
		});
		NAtask.modifiers.variativeABC();
		NAtask.modifiers.allDecimalsToStandard(true);

	}, 2000);
})();
// https://mathb-ege.sdamgia.ru/test?likes=513740
// https://mathb-ege.sdamgia.ru/problem?id=522678
