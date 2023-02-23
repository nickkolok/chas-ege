(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}
		NAinfo.requireApiVersion(0, 2);
		let maxX = sl(0, 10);
		let minX = maxX - sl(8, 10);
		let X = [];
		let Y = [];
		for (let i = minX; i <= maxX; i += sl(0.5, 4, 0.1))
			X.push(i);
		Y.push(sl(1, 6).pm());
		for (let i = 1; i < X.length; i++) {
			do {
				Y[i] = Y[i - 1] + sl(2, 6).pm();
			} while (Y[i].abs() > 5 || Y[i] == 0);
		}
		let spline = new Spline(X, Y);
		let extremum = [];
		let number = 0;

		for (let i = minX; i < maxX; i += 0.1) {
			genAssert(f(i).abs() < 8, 'Слишком большой горбик');
			if (f(i) < f(i - 0.1) && f(i) < f(i + 0.1) || (f(i) > f(i - 0.1) && f(i) > f(i + 0.1))) {
				extremum.push(f(i));
			}
			if (extremum.length)
				genAssert((number - extremum[extremum.length - 1]).abs() > 1, 'Слишком близко к линии');

		}
		genAssert(extremum.length > 1, 'Минимумов недостаточно');

		let root = [];
		let step = 0.01;
		for (let i = minX + step; i < maxX - step; i += step)
			if ((f(i) >= number && f(i + step) <= number) || (f(i) <= number && f(i + step) >= number)) {
				genAssert((i.round().abs() - i.abs()).abs() < 0.1, 'Кривые корни');
				root.push(i.round());
			}

		genAssert(root.length <= 2, 'Слишком много корней');
		genAssert(root.length > 0, 'Слишком много корней');


		let condition = '';
		root = root.iz();
		if (f(root[0]) > f(root[0] + 0.1) && f(root[0]) < f(root[0] - 0.1))
			condition = 'наименьшее';
		else
			condition = 'наибольшее';

		let paint1 = function(ct) {
			let h = 380;
			let w = 500;
			ct.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, 20);

			ct.font = "12px liberation_sans";
			ct.drawLine(20 * maxX, 5, 20 * maxX, -5);
			ct.drawLine(20 * minX, 5, 20 * minX, -5);

			if (maxX != 0 && maxX != 1)
				ct.fillText(maxX, 20 * maxX, 15);

			if (minX != 0 && minX != 1)
				ct.fillText(minX, 20 * minX - 13, 15);

			ct.scale(20, -20);
			ct.lineWidth = 0.15;

			graph9AdrawFunction(ct, f, {
				minX: minX,
				maxX: maxX,
				minY: -9,
				maxY: 9,
				step: 0.01
			});

			graph9AmarkCircles(ct, [
				[maxX, f(maxX)],
				[minX, f(minX)]
			], 2, 0.2);
			ct.fillStyle = "white";
			graph9AmarkCircles(ct, [
				[maxX, f(maxX)],
				[minX, f(minX)]
			], 2, 0.1);
		};
		NAtask.setTask({
			text: 'На рисунке изображён график $y=f\'(x)$ — производной функции $f(x)$, определенной на интервале $(' +
				minX + ';' + maxX + ')$. ' +
				'В какой точке отрезка $[' + [root, slKrome([root, maxX, minX], maxX, minX)].sortNumeric().join('; ') +
				']$ функция $f(x)$ принимает ' + condition + ' значение?',
			answers: root,
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
//SugarHedgehog
/*27492 27491 6413 6415 27493 508383 509395 513421 513440 548259 561723 561764 
628360 628478 7551 7553 7555 7563 7565 7567 7569 7571 7573 7575 7577 7579 7583 
7585 7589 7597 7599 7609 7611 7619 7627 7631 7641 7643 7645 7649 7657 7659 7663 
7665 7669 7673 7679 7687 7689 7691 7695 7697 7699 7711 7715 7717 7719 7725 7727 
7731 7733 7737 7739 7743 7745 7747 7751 7757 7759 7767 7773 7779 7781 7783 7785 
7791 7793 7797 7799  6403 6405 7787 7789 7795 504233 505442 6411 6425 7557 7559 
7561 7581 7587 7591 7593 7595 7601 7603 7605 7607 7613 7615 7617 7621 7623 7625 
7629 7633 7635 7637 7639 7647 7651 7653 7655 7661 7667 7671 7675 7677 7681 7683 
7685 7693 7701 7703 7705 7707 7709 7713 7721 7723 7729 7735 7741 7749 7753 7755 
7761 7763 7765 7769 7771 7775 7777*/
