(function () {
	'use strict';
	retryWhileError(function () {
		/* На рисунке точками показано атмосферное давление в некотором городе на протяжении трёх суток с 4 по 6 апреля 2013 года. В течение суток давление измеряется 4 раза: в 0:00, в 6:00, в 12:00 и в 18:00.По горизонтали указывается время и дата, по вертикали – давление в миллиметрах ртутного столба. Для наглядности точки соединены линиями.*/

		function convert(P) {
			return 752 + P * 2 + ' мм рт. ст.';
		}

		function answAboutMax(intervals, answ) {
			let maxIndex = findMaxInIntervals(intervals, value);
			let wasMax = intervals.map((_, i) => i === maxIndex);
			addUniqueAnsw(wasMax, answ, 'давление достигло ' + convert(value.maxE()));
		}

		function answAboutMaxMinDelta(intervals, answ) {
			let deltaP = intervals.map(int => int[1] - int[0]);

			let incr = deltaP.filter(item => item > 0);
			let decr = deltaP.filter(item => item < 0);

			let minEI = incr.minE();
			let maxEI = incr.maxE();
			let minED = decr.minE();
			let maxED = decr.maxE();

			let wasMinRise = intervals.map((_, i) => deltaP[i] === minEI);
			let wasMaxRise = intervals.map((_, i) => deltaP[i] === maxEI);
			let wasMinFall = intervals.map((_, i) => deltaP[i] === minED);
			let wasMaxFall = intervals.map((_, i) => deltaP[i] === maxED);

			if (sl1()) {
				addUniqueAnsw(wasMinRise, answ, 'наименьший рост давления');
			} else {
				addUniqueAnsw(wasMaxRise, answ, 'наибольший рост давления');
			}

			if (sl1()) {
				addUniqueAnsw(wasMinFall, answ, 'наибольшее падение давления');
			} else {
				addUniqueAnsw(wasMaxFall, answ, 'наименьшее падение давления');
			}
		}

		function answAboutNonMore(intervals, answ, more) {
			let wasNonMore = intervals.map(interval => isNotMore(interval, more));
			addUniqueAnsw(wasNonMore, answ, 'давление не превышало ' + convert(more));
		}

		function answAboutNonLess(intervals, answ, less) {
			let wasNonLess = intervals.map(interval => isNotLess(interval, less));
			addUniqueAnsw(wasNonLess, answ, 'давление не было ниже ' + convert(less));
		}

		function answAboutIncreasing(intervals, answ) {
			let wasIncreasing = intervals.map(interval => isIncreasing(interval));
			addUniqueAnsw(wasIncreasing, answ, 'давление выросло');
		}

		function answAboutDecreasing(intervals, answ) {
			let wasDecreasing = intervals.map(interval => isDecreasing(interval));
			addUniqueAnsw(wasDecreasing, answ, 'давление упало');
		}

		function answAboutIncreasingNonMore(intervals, answ, more) {
			let wasCondition = intervals.map(interval => isIncreasing(interval) && isNotLess(interval, more));
			addUniqueAnsw(wasCondition, answ, 'давление росло, но не превышало ' + convert(more));
		}

		function answAboutDecreasingNonLess(intervals, answ, less) {
			let wasCondition = intervals.map(interval => isDecreasing(interval) && isNotMore(interval, less));
			addUniqueAnsw(wasCondition, answ, 'давление упало, но осталось больше ' + convert(less));
		}

		function answAboutConstP(intervals, answ) {
			let wasConst = intervals.map(interval => constValueByFirst(interval));
			addUniqueAnsw(wasConst, answ, 'давление не изменилось');
		}

		function answAboutConstNotLess(intervals, answ, less) {
			let wasCondition = intervals.map(interval => constValueByFirst(interval) && isNotLess(interval, less));
			addUniqueAnsw(wasCondition, answ, 'давление не изменилось и было выше ' + convert(less));
		}

		function answAboutConstNotMore(intervals, answ, more) {
			let wasCondition = intervals.map(interval => constValueByFirst(interval) && isNotMore(interval, more));
			addUniqueAnsw(wasCondition, answ, 'давление не изменилось и было ниже ' + convert(more));
		}

		let month = sklonlxkand(om.months.iz()).re;
		let beginDay = sl(1, 20);

		let time = [1].zapMonot(13, 0, 1, 1); // шкала времени
		let value = [sl(0, 7, 0.5)]; // шкала давления

		for (; value.length <= time.length;) {
			let interI = (time.length / sl(2, 8)).floor();
			for (let j = 0; j < interI; j++) {
				value.push([sl(0, 7, 0.5), value[value.length - 1]][Number([0, 0, 0, 1].iz() && value[value.length - 1] != 0)]);
			}
		}

		let intervalsTime = Array.from({ length: time.length - 1 }, (_, i) =>
			time.slice(i, i + 2)
		);

		let intervals2 = Array.from({ length: 3 }, (_, i) =>
			intervalsTime.slice(i * 4, i * 4 + 4).iz(2)
		);

		intervalsTime = intervals2.flat().iz(4);

		let intervals = intervalsTime.map(intT => [value[intT[0]], value[intT[1]]]);

		let timeDay = ['ночь', 'утро', 'день', 'вечер'];
		//  			0-6		6-12	12-18	18-0

		let listOfIntervals = intervalsTime.map((interval, i) => {
			return {
				expr: `${timeDay[interval[0] % 4]} ${Math.floor(interval[0] / 4) + 1 + beginDay} ${month} (с ${(interval[0] * 6) % 24} до ${(interval[1] * 6) % 24} часов)`,
				solution: [],
			};
		});

		let LessP1 = sl(0, 7);
		let LessP2 = sl(0, 7);
		let MoreP1 = sl(0, 7);
		let MoreP2 = sl(0, 7);


		if (sl1()) {
			// добавляем ответ про повышение давления
			answAboutIncreasing(intervals, listOfIntervals);
		} else {
			// добавляем ответ про понижение давления
			answAboutDecreasing(intervals, listOfIntervals);
		}

		if (sl1()) {
			// добавляем ответ про повышение давления но меньше
			answAboutIncreasingNonMore(intervals, listOfIntervals, MoreP1);
		} else {
			// добавляем ответ про понижение давления но больше
			answAboutDecreasingNonLess(intervals, listOfIntervals, LessP1);
		}

		if (sl1()) {
			// добавляем ответ про давление было не более
			answAboutNonMore(intervals, listOfIntervals, MoreP2);
		} else {
			// добавляем ответ про давление было не менее
			answAboutNonLess(intervals, listOfIntervals, LessP2);
		}

		if (sl1()) {
			// добавляем ответ про давление не изменилось
			answAboutConstP(intervals, listOfIntervals);
		} else {
			//давление не изменилось и было ниже
			answAboutConstNotMore(intervals, listOfIntervals, MoreP1);
			//давление не изменилось и было выше
			answAboutConstNotLess(intervals, listOfIntervals, LessP1);
		}

		// добавляем ответ про максимальное давление
		answAboutMax(intervals, listOfIntervals);
		// добавляем ответ про максимальный и минимальный рост
		answAboutMaxMinDelta(intervals, listOfIntervals);

		listOfIntervals.forEach(item => item.solution = item.solution.iz());

		let solutions = listOfIntervals.map(item => item.solution);
		solutions.forEach(item => genAssertNonempty(item));
		genAssert(!solutions.hasDubl(), 'Дубликаты решений');

		let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);


		let paint1 = function (ctx) {
			ctx.drawGridWithArrows({
				gridWidth: 500,
				gridHeight: 300,
				cellWidth: 40,
				cellHeight: 30,
				stepX: 6,
				typeX: 'time',
				cycleTime: true,
				stepY: 2,
				maxX: 72,
				minY: 752,
				maxY: 766,
				stepByCeilX: 1,
				arrowLengthX: 11.5,
				arrowLengthY: 7.8,
			});

			ctx.translate(40, 30 * 8);
			ctx.scale(40, -30);
			ctx.lineWidth = 2 / 30;

			for (let i = 0; i < time.length; i++) {
				ctx.drawFilledCircle(time[i], value[i], 3 / 30);
				if (i < time.length - 1)
					ctx.drawLine(time[i], value[i], time[i + 1], value[i + 1]);
			}

			ctx.scale(1 / 40, -1 / 30);
			ctx.font = "12px serif";
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			for (let i = 0; i < 3; i++) {
				ctx.fillText((i + 1 + beginDay) + ' ' + month, 80 + 160 * i, 40);
			}
		};

		NAtask.setCorrespondenceTask({
			text: 'На рисунке точками показано атмосферное давление в некотором городе на протяжении трёх суток с ' + (beginDay + 1) + ' по ' + (beginDay + 3) + ' ' + month + ' 20' + sl(10, 25) + ' года. ' +
				'В течение суток давление измеряется 4 раза: в 0:00, в 6:00, в 12:00 и в 18:00. ' +
				'По горизонтали указывается время и дата, по вертикали – давление в миллиметрах ртутного столба. ' +
				'Для наглядности точки соединены линиями.',
			leftHeader: 'ИНТЕРВАЛЫ',
			left: listOfIntervals,
			rightHeader: 'ХАРАКТЕРИСТИКИ',
			right: solutions,
			postText: 'Пользуясь рисунком, поставьте в соответствие каждому из указанных периодов времени характеристику атмосферного давления в этом городе в течение этого периода.',
			analys:listView.join('<br/>'),
		});
		NAtask.modifiers.allDecimalsToStandard( /*true*/);
		NAtask.modifiers.addCanvasIllustration({
			width: 800,
			height: 600,
			paint: paint1,
		});
	}, 100);
})();
//https://mathb-ege.sdamgia.ru/problem?id=506497
