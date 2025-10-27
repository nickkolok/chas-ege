(function () {
	'use strict';
	retryWhileError(function () {
		/* На рисунке точками показано потребление воды городской ТЭЦ на протяжении суток. По горизонтали указывается время, по вертикали – объём воды в кубометрах в час. Для наглядности точки соединены линией.*/
			
		function answAbouMaxP(intervals, answ) {
			let maxV = p.maxE();
			let maxIndex = null;

			for (let i = 0; i < intervals.length; i++) {
				for (let j = 0; j < intervals[i].length; j++) {
					if (intervals[i][j] === maxV) {
						maxIndex = i;
						break;
					}
				}
				if (maxIndex != null)
					break;
			}

			if (maxIndex)
				answ[maxIndex].solution.push('потребление воды достигло максимума за сутки');
		}

		function answAbouMaxDeltaI(intervals, answ) {
			let incr = intervals.map(int => {
				if (isIncreasing(int)) {
					return int.maxE() - int.minE();
				} else {
					return 0;
				}
			});
			
			let maxEI = incr.maxE();
			let maxI = incr.max();
			
			let length = (inter, value) => inter.filter(item => item === value).length == 1;
			
			if (length(incr, maxEI))
				answ[maxI].solution.push('наибольший рост потребления воды за сутки');						
		}
		
		function answAbouMaxDeltaD(intervals, answ) {

			let decr = intervals.map(int => {
				if (isDecreasing(int)) {
					return int.maxE() - int.minE();
				} else {
					return 0;
				}
			});
			
			let maxED = decr.maxE();
			let maxD = decr.max();
			
			let length = (inter, value) => inter.filter(item => item === value).length == 1;
			
			if (length(decr, maxED))
				answ[maxD].solution.push('наибольшее падение потребления воды за сутки');				
		}

		function isIncreasing(interval) {
			return interval.slice(1).every((current, index) =>
				current > interval[index]
			);
		}

		function isDecreasing(interval) {
			return interval.slice(1).every((current, index) =>
				current < interval[index]
			);
		}

		function answAboutIncreasing(interval, answ) {
			if (isIncreasing(interval)) {
				answ.push('потребление воды росло в течение всего периода');
			}
		}

		function answAboutDecreasing(interval, answ) {
			if (isDecreasing(interval)) {
				answ.push('потребление воды падало в течение всего периода');
			}
		}

		function iLessV(interval, P) {
			return interval.filter((int) => int < P).length == interval.length;
		}

		function answAbouLessP(interval, answ, P) {
			if (iLessV(interval, P)) {
				answ.push('в течение всего периода потребление воды было меньше ' + P * 10 + ' кубометров в час');
			}
		}

		function iMoreV(interval, P) {
			return interval.filter((int) => int > P).length == interval.length;
		}

		function answAbouMoreP(interval, answ, P) {
			if (iMoreV(interval, P)) {
				answ.push('в течение всего периода потребление воды было больше ' + P * 10 + ' кубометров в час');
			}
		}

		function isDecreasingAfterIsIncreasing(interval) {
			let minIndex = interval.min();

			if (minIndex === 0 || minIndex === interval.length - 1) {
				return false;
			}

			for (let i = 1; i <= minIndex; i++) {
				if (interval[i] >= interval[i - 1]) {
					return false;
				}
			}

			for (let i = minIndex + 1; i < interval.length; i++) {
				if (interval[i] <= interval[i - 1]) {
					return false;
				}
			}

			return true;
		}

		function answAboutDecreasingAfterIncreasing(intervals, answ) {

			let rightInter = intervals.map(int => isDecreasingAfterIsIncreasing(int));

			if (!rightInter.hasDubl()) {
				answ[rightInter.indexOf(true)].solution.push('потребление воды сначала падало, а потом росло');
			}
		}

		function isIncreasingAfterIsDecreasing(interval) {
			let maxIndex = interval.max();

			if (maxIndex === 0 || maxIndex === interval.length - 1) {
				return false;
			}

			for (let i = 1; i <= maxIndex; i++) {
				if (interval[i] <= interval[i - 1]) {
					return false;
				}
			}

			for (let i = maxIndex + 1; i < interval.length; i++) {
				if (interval[i] >= interval[i - 1]) {
					return false;
				}
			}

			return true;
		}

		function answAboutIncreasingAfterDecreasing(intervals, answ) {
			let rightInter = intervals.map(int => isIncreasingAfterIsDecreasing(int));

			if (!rightInter.hasDubl()) {
				answ[rightInter.indexOf(true)].solution.push('потребление воды сначала росло, а потом падало');
			}
		}

		function answAboutIncrTimes(interval, answ) {
			if (isIncreasing(interval)) {
				let min = interval.minE();
				let max = interval.maxE();
				let delta = max / min;
				let deltaFlour = delta.floor();
				if (!delta.isZ() && deltaFlour > 1 && deltaFlour < 6) {
					answ.push('в течение всего периода потребление воды выросло более чем ' + times[(deltaFlour - 2)]);
				}
			}
		}

		function answAboutDecrTimes(interval, answ) {
			if (isDecreasing(interval)) {
				let min = interval.minE();
				let max = interval.maxE();
				let delta = max / min;
				let deltaFlour = delta.floor();
				if (!delta.isZ() && deltaFlour > 1 && deltaFlour < 6) {
					answ.push('в течение всего периода потребление воды упало более чем ' + times[(deltaFlour - 2)]);
				}
			}
		}


		let t = [1].zapMonot(25, 0, 1, 1); // шкала времени
		let p = [sl(1, 6, 0.1)]; // шкала потребления воды
		let count = 0;
		let times = ['вдвое', 'втрое', 'вчетверо', 'впятеро', 'вшестеро', 'всемеро', 'восьмеро'];

		for (; p.length <= t.length || p.length == t.length;) {
			let interI = ((t.length / (sl(1.5, 2.5, 0.5))).floor());
			for (let j = 0; j < interI; j++) {
				let newPoint = p[p.length - 1] + sl(0.1, 1, 0.1) * [-1, 1][count % 2];
				if (newPoint > 0 && newPoint < 6)
					p.push(newPoint);
				else
					break;
			}
			count++;
		}

		let intervals = Array.from({
			length: 4
		}, (_, i) =>
			p.slice(i * 6, i * 6 + 7));

		let timeDay = ['ночь', 'утро', 'день', 'вечер'];
		//  			0-6		6-12	12-18	18-0

		let listOfIntervals = intervals.map((interval, i) => {
			return {
				expr: `${timeDay[i]} (с ${(i * 6)} до ${(i * 6 + 6)} часов)`,
				solution: []
			};
		});

		console.log('listOfIntervals', listOfIntervals);

		let varianbleDI = sl1();
		let varianbleML = sl1();
		let varianbleDIT = sl1();

		let LessP = sl(2, 4);
		let MoreP = sl(3, 5);

		function addAllAnswers(intervals, listOfIntervals) {
			intervals.forEach((interval, i) => {
				let solution = listOfIntervals[i].solution;
				// добавляем ответ про повышение потребления воды
				answAboutIncreasing(interval, solution);

				// добавляем ответ про понижение потребления воды
				answAboutDecreasing(interval, solution);

				if (varianbleML) {
					// добавляем ответ про потребления воды меньше
					answAbouLessP(interval, solution, LessP);
				} else {
					// добавляем ответ про потребления воды больше
					answAbouMoreP(interval, solution, MoreP);
				}

				if (varianbleDIT) {
					answAboutIncrTimes(interval, solution);
				} else {
					answAboutDecrTimes(interval, solution);
				}

			});
		}
		// добавляем ответ про максимальное потребление воды
		answAbouMaxP(intervals, listOfIntervals);
		// добавляем ответ про максимальный и минимальный рост
		answAbouMaxDeltaI(intervals, listOfIntervals)
		answAbouMaxDeltaD(intervals, listOfIntervals)
		if (varianbleDI) {
			// добавляем ответ про понижение потребления воды а потом увеличение
			answAboutDecreasingAfterIncreasing(intervals, listOfIntervals);
		} else {
			// добавляем ответ про увеличение потребления воды а потом понижение
			answAboutIncreasingAfterDecreasing(intervals, listOfIntervals);
		}
		addAllAnswers(intervals, listOfIntervals);

		listOfIntervals.forEach(item => {
			console.log(item);
			item.solution = item.solution.iz()
		});

		let solutions = listOfIntervals.map(item => item.solution);
		solutions.forEach(item => genAssertNonempty(item));
		genAssert(!solutions.hasDubl(), 'Дубликаты решений');

		let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);


		let paint1 = function (ctx) {
			ctx.translate(30, 0);
			ctx.drawGridWithArrows({
				gridWidth: 481,
				gridHeight: 301,
				cellWidth: 20,
				cellHeight: 30,
				stepX: 1,
				typeX: 'time',
				stepY: 10,
				maxX: 24,
				maxY: 70,
				stepByCeilX: 3,
				arrowLengthX: 11.5,
				arrowLengthY: 7.8,
				drawArrowX: false,
				drawArrowY: false,
			});

			ctx.translate(20, 30 * 8);
			ctx.scale(20, -30);
			ctx.lineWidth = 2 / 30;

			for (let i = 0; i < t.length; i++) {
				ctx.drawFilledCircle(t[i], p[i], 3 / 30);
				if (i < t.length - 1)
					ctx.drawLine(t[i], p[i], t[i + 1], p[i + 1]);
			}
		};

		NAtask.setCorrespondenceTask({
			text: 'На рисунке точками показано потребление воды городской ТЭЦ на протяжении суток. По горизонтали указывается время, по вертикали – объём воды в кубометрах в час. Для наглядности точки соединены линией.',
			leftHeader: 'ИНТЕРВАЛЫ',
			left: listOfIntervals,
			rightHeader: 'ХАРАКТЕРИСТИКИ',
			right: solutions,
			postText: 'Пользуясь рисунком, поставьте в соответствие каждому из указанных периодов времени характеристику потребления воды данной ТЭЦ в течение этого периода.<br/><br/> ВРЕМЕННЫЕ ОТВЕТЫ <br/>' +
				listView.join('<br/>'),
		});
		NAtask.modifiers.allDecimalsToStandard( /*true*/);
		NAtask.modifiers.addCanvasIllustration({
			width: 800,
			height: 600,
			paint: paint1,
		});
	}, 100);
})();
//https://mathb-ege.sdamgia.ru/problem?id=507094
