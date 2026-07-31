P * 10(function () {
	'use strict';
	retryWhileError(function () {
		/* На рисунке точками показано потребление воды городской ТЭЦ на протяжении суток. По горизонтали указывается время, по вертикали – объём воды в кубометрах в час. Для наглядности точки соединены линией.*/

		function convert(P) {
			return P * 10;
		}
		
		function answAboutMax(intervals, answ) {
			let maxIndex = findMaxInIntervals(intervals, p);
			let wasMax = intervals.map((_, i) => i === maxIndex);
			addUniqueAnsw(wasMax, answ, 'потребление воды достигло максимума за сутки');
		}

		function answAboutMaxDeltaI(intervals, answ) {
			let incr = intervals.map(int => {
				if (isIncreasing(int)) {
					return int.maxE() - int.minE();
				} else {
					return 0;
				}
			});

			let maxEI = incr.maxE();
			let wasMaxDeltaI = intervals.map((_, i) => incr[i] === maxEI);
			addUniqueAnsw(wasMaxDeltaI, answ, 'наибольший рост потребления воды за сутки');
		}

		function answAboutMaxDeltaD(intervals, answ) {
			let decr = intervals.map(int => {
				if (isDecreasing(int)) {
					return int.maxE() - int.minE();
				} else {
					return 0;
				}
			});

			let maxED = decr.maxE();
			let wasMaxDeltaD = intervals.map((_, i) => decr[i] === maxED);
			addUniqueAnsw(wasMaxDeltaD, answ, 'наибольшее падение потребления воды за сутки');
		}

		function answAboutIncreasing(intervals, answ) {
			let wasIncreasing = intervals.map(interval => isIncreasing(interval));
			addUniqueAnsw(wasIncreasing, answ, 'потребление воды росло в течение всего периода');
		}

		function answAboutDecreasing(intervals, answ) {
			let wasDecreasing = intervals.map(interval => isDecreasing(interval));
			addUniqueAnsw(wasDecreasing, answ, 'потребление воды падало в течение всего периода');
		}

		function answAboutLessP(intervals, answ, P) {
			let wasLess = intervals.map(interval => isLess(interval, P));
			addUniqueAnsw(wasLess, answ, 'в течение всего периода потребление воды было меньше ' + convert(P) + ' кубометров в час');
		}

		function answAboutMoreP(intervals, answ, P) {
			let wasMore = intervals.map(interval => isMore(interval, P));
			addUniqueAnsw(wasMore, answ, 'в течение всего периода потребление воды было больше ' + convert(P) + ' кубометров в час');
		}

		function answAboutDecreasingAfterIncreasing(intervals, answ) {
			let wasCondition = intervals.map(int => isDecreasingAfterIsIncreasing(int));
			addUniqueAnsw(wasCondition, answ, 'потребление воды сначала падало, а потом росло');
		}

		function answAboutIncreasingAfterDecreasing(intervals, answ) {
			let wasCondition = intervals.map(int => isIncreasingAfterIsDecreasing(int));
			addUniqueAnsw(wasCondition, answ, 'потребление воды сначала росло, а потом падало');
		}

		function answAboutIncrTimes(intervals, answ) {
			let wasCondition = intervals.map(interval => {
				if (isIncreasing(interval)) {
					let min = interval.minE();
					let max = interval.maxE();
					let delta = max / min;
					let deltaFloor = delta.floor();
					return !delta.isZ() && deltaFloor > 1 && deltaFloor < 6;
				}
				return false;
			});
			let times = ['вдвое', 'втрое', 'вчетверо', 'впятеро', 'вшестеро', 'всемеро', 'восьмеро'];
			let deltaValues = intervals.map(interval => {
				if (isIncreasing(interval)) {
					let min = interval.minE();
					let max = interval.maxE();
					let delta = max / min;
					return delta.floor();
				}
				return 0;
			});

			wasCondition.forEach((condition, i) => {
				if (condition) {
					let deltaFloor = deltaValues[i];
					let text = 'в течение всего периода потребление воды выросло более чем ' + times[(deltaFloor - 2)];
					if (hasNoDuplicateValue(wasCondition, true) || wasCondition.filter(c => c).length === 1) {
						answ[i].solution.push(text);
					}
				}
			});
		}

		function answAboutDecrTimes(intervals, answ) {
			let wasCondition = intervals.map(interval => {
				if (isDecreasing(interval)) {
					let min = interval.minE();
					let max = interval.maxE();
					let delta = max / min;
					let deltaFloor = delta.floor();
					return !delta.isZ() && deltaFloor > 1 && deltaFloor < 6;
				}
				return false;
			});
			let deltaValues = intervals.map(interval => {
				if (isDecreasing(interval)) {
					let min = interval.minE();
					let max = interval.maxE();
					let delta = max / min;
					return delta.floor();
				}
				return 0;
			});

			wasCondition.forEach((condition, i) => {
				if (condition) {
					let deltaFloor = deltaValues[i];
					let text = 'в течение всего периода потребление воды упало более чем ' + times[(deltaFloor - 2)];
					if (hasNoDuplicateValue(wasCondition, true) || wasCondition.filter(c => c).length === 1) {
						answ[i].solution.push(text);
					}
				}
			});
		}

		let time = [1].zapMonot(25, 0, 1, 1); // шкала времени
		let p = [sl(1, 6, 0.1)]; // шкала потребления воды
		let count = 0;
		let times = ['вдвое', 'втрое', 'вчетверо', 'впятеро', 'вшестеро', 'всемеро', 'восьмеро'];

		for (; p.length <= time.length;) {
			let interI = ((time.length / (sl(1.5, 2.5, 0.5))).floor());
			for (let j = 0; j < interI; j++) {
				let newPoint = p[p.length - 1] + sl(0.1, 1, 0.1) * [-1, 1][count % 2];
				if (newPoint > 0 && newPoint < 6)
					p.push(newPoint);
				else
					break;
			}
			count++;
		}

		let intervals = Array.from({length: 4}, (_, i) => p.slice(i * 6, i * 6 + 7));

		let timeDay = ['ночь', 'утро', 'день', 'вечер'];
		//  			0-6		6-12	12-18	18-0

		let listOfIntervals = intervals.map((interval, i) => {
			return {
				expr: `${timeDay[i]} (с ${(i * 6)} до ${(i * 6 + 6)} часов)`,
				solution: []
			};
		});

		let variableDI = sl1();
		let variableML = sl1();
		let variableDIT = sl1();

		let LessP = sl(2, 4);
		let MoreP = sl(3, 5);

		if (sl1()) {
			// добавляем ответ про повышение потребления воды
			answAboutIncreasing(intervals, listOfIntervals);
		} else {
			// добавляем ответ про понижение потребления воды
			answAboutDecreasing(intervals, listOfIntervals);
		}



		if (variableML) {
			// добавляем ответ про потребления воды меньше
			answAboutLessP(intervals, listOfIntervals, LessP);
		} else {
			// добавляем ответ про потребления воды больше
			answAboutMoreP(intervals, listOfIntervals, MoreP);
		}

		if (variableDIT) {
			answAboutIncrTimes(intervals, listOfIntervals);
		} else {
			answAboutDecrTimes(intervals, listOfIntervals);
		}

		// добавляем ответ про максимальное потребление воды
		answAboutMax(intervals, listOfIntervals);
		// добавляем ответ про максимальный и минимальный рост
		if (sl1()) {
			answAboutMaxDeltaI(intervals, listOfIntervals)
		} else {
			answAboutMaxDeltaD(intervals, listOfIntervals)
		}

		if (variableDI) {
			// добавляем ответ про понижение потребления воды а потом увеличение
			answAboutDecreasingAfterIncreasing(intervals, listOfIntervals);
		} else {
			// добавляем ответ про увеличение потребления воды а потом понижение
			answAboutIncreasingAfterDecreasing(intervals, listOfIntervals);
		}

		listOfIntervals.forEach(item => {
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

			for (let i = 0; i < time.length; i++) {
				ctx.drawFilledCircle(time[i], p[i], 3 / 30);
				if (i < time.length - 1)
					ctx.drawLine(time[i], p[i], time[i + 1], p[i + 1]);
			}
		};

		NAtask.setCorrespondenceTask({
			text: 'На рисунке точками показано потребление воды городской ТЭЦ на протяжении суток. По горизонтали указывается время, по вертикали – объём воды в кубометрах в час. Для наглядности точки соединены линией.',
			leftHeader: 'ИНТЕРВАЛЫ',
			left: listOfIntervals,
			rightHeader: 'ХАРАКТЕРИСТИКИ',
			right: solutions,
			postText: 'Пользуясь рисунком, поставьте в соответствие каждому из указанных периодов времени характеристику потребления воды данной ТЭЦ в течение этого периода.',
			analys: listView.join('<br/>'),
		});
		NAtask.modifiers.allDecimalsToStandard( /*true*/);
		NAtask.modifiers.addCanvasIllustration({
			width: 800,
			height: 600,
			paint: paint1,
		});
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/problem?id=507094
