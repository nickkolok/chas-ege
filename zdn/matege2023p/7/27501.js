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
				Y[i] = Y[i - 1] + sl(2, 10).pm();
			} while (Y[i].abs() > 5 || Y[i] == 0);
		}
		let spline = new Spline(X, Y);
		let extremum = [];
		let number = sl(-7, 7);

		for (let i = minX; i < maxX; i += 0.1) {
			genAssert(f(i).abs() < 8, 'Слишком большой горбик');
			if (f(i) < f(i - 0.1) && f(i) < f(i + 0.1) || (f(i) > f(i - 0.1) && f(i) > f(i + 0.1))) {
				extremum.push(f(i));
			}
			if (extremum.length)
				genAssert((number - extremum[extremum.length - 1]).abs() > 1, 'Слишком близко к линии');

			if (extremum.length >= 2)
				genAssert((extremum[extremum.length - 2] - extremum[extremum.length - 1]).abs() > 1, 'Горбики слишком близко');
		}
		let root = [];
		let step = 0.01;
		for (let i = minX + step; i < maxX; i += step)
			if ((f(i) >= number && f(i + step) <= number) || (f(i) <= number && f(i + step) >= number))
				root.push([i, f(i)]);

		genAssert(extremum.length > 2, 'Минимумов недостаточно');
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
			text: 'На рисунке изображен график производной функции $f(x)$, определенной на интервале $(' + minX + '; ' +
				maxX +
				')$. ' +
				'Найдите количество точек, ' +
				'в которых касательная к графику функции $f(x)$ параллельна прямой $y=' + (number + 'x+' + sl(0, 20, 0.1).ts(1))
				.plusminus().replace('0x+', '') +
				'$ или совпадает с ней.',
			answers: root.length,
			analys: 'Ответом является количество пересечений с прямой $y=' + number + '$.',
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
//SugarHedgehog
/*27501 6407 8795 8799 512487 512497 519508 519534 525371 6409 6419 6433 6435 
8551 8553 8555 8557 8559 8561 8563 8565 8567 8569 8571 8573 8575 8577 8579 8581 
8583 8585 8587 8589 8591 8593 8595 8597 8599 8601 8603 8605 8607 8609 8611 8613 
8615 8617 8619 8621 8623 8625 8627 8629 8631 8633 8635 8637 8639 8641 8643 8645 
8647 8649 8651 8653 8655 8657 8659 8661 8663 8665 8667 8669 8671 8673 8675 8677 
8679 8681 8683 8685 8687 8689 8691 8693 8695 8697 8699 8701 8703 8705 8707 8709 
8711 8713 8715 8717 8719 8721 8723 8725 8727 8729 8731 8733 8735 8737 8739 8741 
8743 8745 8747 8749 8751 8753 8755 8757 8759 8761 8763 8765 8767 8769 8771 8773 
8775 8777 8779 8781 8783 8785 8787 8789 8791 8793 8797 520900 562930 562975*/
