(function () {
	'use strict';

	function GenVec1() {
		let V1V2SumKvadrCoord = ([1, 4, 9, 16, 25, 36].iz());
		DlinaVKvadrate = V1V2SumKvadrCoord;
		let PobCoord = 0;

		if (V1V2SumKvadrCoord == 9) {
			PobCoord = 2;
			V1V2SumKvadrCoord = 1;
		}
		else if (V1V2SumKvadrCoord == 36) {
			PobCoord = 4;
			V1V2SumKvadrCoord = 4;
		}

		let GlavCoord = ([0, 1, 2].iz());

		if (V3 == 'суммы')
			V2[GlavCoord] = V1V2SumKvadrCoord ** (1 / 2) - V1[GlavCoord];
		else
			V2[GlavCoord] = V1V2SumKvadrCoord ** (1 / 2) + V1[GlavCoord];

		for (let i = 0; i < 3; i++) {
			if (i != GlavCoord) {
				if (V3 == 'суммы')
					V2[i] = PobCoord - V1[i];
				else
					V2[i] = PobCoord + V1[i];
			}
		}
	}

	let V1 = [sluchch(-20, 20), sluchch(-20, 20), sluchch(-20, 20)];
	let V2 = [sluchch(-20, 20), sluchch(-20, 20), sluchch(-20, 20)];
	let DlinaVKvadrate = 0;
	let IskVelichZnacheniye = 0;

	let V3 = (['суммы', 'разности'].iz());

	let IskVelichStroka = (['длинну', 'квадрат длины', 'норму', 'квадрат нормы', 'абциссу', 'ординату', 'аппликату'].iz());

	if ((IskVelichStroka == 'длинну') || (IskVelichStroka == 'норму')) {
		GenVec1();
		IskVelichZnacheniye = DlinaVKvadrate ** (1 / 2);
	}
	else if ((IskVelichStroka == 'квадрат длины') || (IskVelichStroka == 'квадрат нормы')) {
		GenVec1();
		IskVelichZnacheniye = DlinaVKvadrate;
	}
	else if (IskVelichStroka == 'абциссу') {
		if (V3 == 'суммы')
			IskVelichZnacheniye = V1[0] + V2[0];
		else
			IskVelichZnacheniye = V1[0] - V2[0];
	}
	else if (IskVelichStroka == 'ординату') {
		if (V3 == 'суммы')
			IskVelichZnacheniye = V1[1] + V2[1];
		else
			IskVelichZnacheniye = V1[1] - V2[1];
	}
	else if (IskVelichStroka == 'аппликату') {
		if (V3 == 'суммы')
			IskVelichZnacheniye = V1[2] + V2[2];
		else
			IskVelichZnacheniye = V1[2] - V2[2];
	}

	NAinfo.requireApiVersion(0, 0);

	NAtask.setTask({
		text: 'Даны 2 вектора в трёхмерном пространстве с координатами ' +
			'(' + V1[0] + ', ' + V1[1] + ', ' + V1[2] + ') и (' + V2[0] + ', ' + V2[1] + ', ' + V2[2] + ').' +
			' Найдите ' + IskVelichStroka + ' ' + V3 + (V3 == 'суммы' ? ' этих векторов.' : ' первого и второго векторов.'),
		answers: IskVelichZnacheniye,
	});

})();
//ZhmishenkoValeriy
