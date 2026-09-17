(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = "525541";
		let preferenceSolid = ['cube', 'tetrahedron', 'prism'];
		let preferenceQuestion = ['ribs', 'vertices', 'facets'];
		let preferenceSize = ['larger', 'smaller'];

		let solid    = getSelectedPreferenceFromList(key, preferenceSolid);
		let question = getSelectedPreferenceFromList(key, preferenceQuestion);
		let size     = getSelectedPreferenceFromList(key, preferenceSize);

		let solidNames = {
			cube: 'куб',
			tetrahedron: 'тетраэдр',
			prism: 'правильную треугольную призму'
		};

		let questionWords = {
			ribs: 'рёбер',
			vertices: 'вершин',
			facets: 'граней'
		};

		let sizeWords = {
			larger: 'большим',
			smaller: 'меньшим'
		};

		let data = {
			cube: {
				larger:  { ribs: 15, vertices: 10, facets: 7 },
				smaller: { ribs:  9, vertices:  6, facets: 5 }
			},
			tetrahedron: {
				larger:  { ribs: 9, vertices: 6, facets: 5 },
				smaller: { ribs: 6, vertices: 4, facets: 4 }
			},
			prism: {
				larger:  { ribs: 12, vertices: 8, facets: 6 },
				smaller: { ribs:  9, vertices: 6, facets: 5 }
			}
		};

		NAtask.setTask({
			text: 'Плоскость, проходящая через точки A, B и C (см. рисунок), ' +
			      'разбивает ' + solidNames[solid] + ' на два многогранника. ' +
			      'Сколько ' + questionWords[question] +
			      ' у получившегося многогранника с ' + sizeWords[size] + ' числом вершин?',
			answers: data[solid][size][question],
			preference: [preferenceSolid, preferenceQuestion, preferenceSize],
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=525541 (куб)
// https://mathb-ege.sdamgia.ru/problem?id=514887 (тетраэдр)
// https://mathb-ege.sdamgia.ru/problem?id=506396 (призма)
