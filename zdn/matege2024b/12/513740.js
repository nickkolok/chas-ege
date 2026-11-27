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
		// пифагорову тройку; все данные и ответ целые, как в ФИПИ (сторона в ФИПИ до 61).
		let [half1, half2, side] = genPifag(65);
		let halves = [half1, half2].shuffle();
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
// ФИПИ 43D94E 7D4C05 C237BD D33CF6 9A8FFB AD6601 E2E57E 5CB4B0 6B0A19 80852C B2C2D0 81A4DB 532F9F D793E1 E44DE0 E16DE5 928233 0F234D 88424C 4BAC05 C1AB7A 8D3A7B F9B7BA 484E2D 4E052E DFD2DB 5D67DC BE8E5B 291B56 8F8C5D 0537CD C0A991 939293 16B3E5 B2D939 61A43E 3FB836
