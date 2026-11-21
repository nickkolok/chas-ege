(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	retryWhileError(function() {
		const maxX = sl(0, 10);
		const minX = maxX - sl(8, 10);
		const {func} = createSpline({
			type: 'function', minX, maxX, minY: -7, maxY: 7,
			stepForX: 2, stepForY: 0.5,
			numberOfExtremes: {min: 3, max: 8},
		});
		const slope = sl(-7, 7);
		const values = extremumsY(func, minX, maxX, 0.01);
		values.forEach(value => genAssert(Math.abs(value - slope) > 0.7, 'Экстремум слишком близко к прямой'));
		const roots = findIntersectionPoints(func, slope, minX, maxX, 0.01)
			.filter(x => x > minX && x < maxX);
		const line = (slope.ts() + 'x+' + sl(0, 20, 0.1).ts()).plusminus();
		NAtask.setTask({
			text: 'На рисунке изображён график производной функции $f(x)$, определённой на интервале $(' +
				minX + '; ' + maxX + ')$. Найдите количество точек, в которых касательная к графику функции ' +
				'$f(x)$ параллельна прямой $y=' + line + '$ или совпадает с ней.',
			answers: roots.length,
			analys: 'Ответом является количество пересечений графика производной с прямой $y=' + slope + '$ внутри указанного интервала.',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 500, height: 400,
			paint: paintSpline({func, minX, maxX, minY: -9, maxY: 9, width: 500, height: 400,
				markedPoints: {type: 'number'}}),
		});
	}, 10000);
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

