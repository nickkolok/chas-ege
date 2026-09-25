(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		/**
		 * Числовая прямая с отмеченной закрашенной точкой и заштрихованным лучом (inline SVG).
		 * @param {Number} tochka координата отмеченной точки
		 * @param {Boolean} napravo заштрихован ли луч вправо от точки
		 */
		function chislovayaPryamaya(tochka, napravo) {
			let width = 230;
			let height = 52;
			let axisY = 26;
			let left = 10;
			let right = width - 26;
			let px = (left + right) / 2 + 6;

			let hatch = '';
			let hatchStart = napravo ? px : left + 2;
			let hatchEnd = napravo ? right - 6 : px;
			for (let x = hatchStart; x <= hatchEnd; x += 5) {
				hatch +=
					'<line x1="' + x + '" y1="' + (axisY - 1) +
					'" x2="' + (x + 6) + '" y2="' + (axisY - 9) +
					'" stroke="black" stroke-width="1"/>';
			}

			return '<svg width="' + width + '" height="' + height + '" xmlns="http://www.w3.org/2000/svg">' +
				'<line x1="' + left + '" y1="' + axisY + '" x2="' + right + '" y2="' + axisY + '" stroke="black" stroke-width="1.5"/>' +
				'<polygon points="' + right + ',' + (axisY - 4) + ' ' + (right + 10) + ',' + axisY + ' ' + right + ',' + (axisY + 4) + '" fill="black"/>' +
				hatch +
				'<circle cx="' + px + '" cy="' + axisY + '" r="3.5" fill="black"/>' +
				'<text x="' + px + '" y="' + (axisY + 18) + '" font-size="15" text-anchor="middle" font-family="serif">' + tochka + '</text>' +
				'<text x="' + (right + 4) + '" y="' + (axisY + 18) + '" font-size="15" font-style="italic" font-family="serif">x</text>' +
				'</svg>';
		}

		let n = slKrome(0, -3, 3);
		let valueTex = n > 0 ? '' + (2).pow(n) : 'frac{1}{' + (2).pow(-n) + '}';

		let variants = [
			{ base: '0,5', sign: 'geq', tochka: -n, napravo: false },
			{ base: '2', sign: 'geq', tochka: n, napravo: true },
			{ base: '0,5', sign: 'leq', tochka: -n, napravo: true },
			{ base: '2', sign: 'leq', tochka: n, napravo: false },
		];

		let left = [];
		let right = [];
		for (let variant of variants) {
			let solution = chislovayaPryamaya(variant.tochka, variant.napravo);
			left.push({
				expr: '$' + variant.base + '^x \\' + variant.sign + ' ' + valueTex + '$',
				solution: solution,
			});
			right.push(solution);
		}
		genAssert(!right.hasDubl(), 'Дубликаты решений');

		NAtask.setCorrespondenceTask({
			text: 'Каждому из четырёх неравенств в левом столбце соответствует его решение в правом столбце. Установите соответствие между неравенствами и их решениями.',
			leftHeader: 'НЕРАВЕНСТВА',
			left: left,
			rightHeader: 'РЕШЕНИЯ',
			right: right,
			postText: 'Напишите по порядку букв цифры каждого решения.',
		});
	}, 20000);
})();