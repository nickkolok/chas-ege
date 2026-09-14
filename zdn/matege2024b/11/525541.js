(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		NAtask.setTask({
			text: 'Плоскость, проходящая через точки A, B и C (см. рисунок), разбивает куб на два многогранника. Сколько рёбер у получившегося многогранника с меньшим числом вершин?',
			answers: 6,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=525541
