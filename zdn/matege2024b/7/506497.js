(function () {
	'use strict';
	retryWhileError(function () {
		/* На рисунке точками показано атмосферное давление в некотором городе на протяжении трёх суток с 4 по 6 апреля 2013 года. Втечение суток давление измеряется 4 раза: в 0:00, в 6:00, в 12:00 и в 18:00.По горизонтали указывается время и дата, по вертикали – давление вмиллиметрах ртутного столба. Для наглядности точки соединены линиями.*/
		
		function convert(P){
			return 752 + P * 2;
		}
		
		function answAbouMaxP(intervalsP, answ) {
			let maxV = p.maxE();
			let maxIndex = null;

			for (let i = 0; i < intervalsP.length; i++) {
				for (let j = 0; j < intervalsP[i].length; j++) {
					if (intervalsP[i][j] === maxV) {
						maxIndex = i;
						break;
					}
				}
				if (maxIndex != null)
					break;
			}

			if (maxIndex)
				answ[maxIndex].solution.push('давление достигло ' + convert(maxV) + ' мм рт. ст.');
		}

		function answAbouMaxMinDeltaP(intervalsP, answ) {
			let deltaP = intervalsP.map(int => int[1] - int[0]);

			let incr = deltaP.filter(item => item > 0);
			let decr = deltaP.filter(item => item < 0);

			let minEI = incr.minE();
			let minI = deltaP.indexOf(minEI);
			let maxEI = incr.maxE();
			let maxI = deltaP.indexOf(maxEI);

			let minED = decr.minE();
			let minD = deltaP.indexOf(minED);
			let maxED = decr.maxE();
			let maxD = deltaP.indexOf(maxED);

			let length = (inter, value) => inter.filter(item => item === value).length == 1;

			if (length(incr, minEI))
				answ[minI].solution.push('наименьший рост давления');
			if (length(incr, maxI))
				answ[maxI].solution.push('наибольший рост давления');

			if (length(decr, maxED))
				answ[maxD].solution.push('наименьшее падение давления');
			if (length(decr, minED))
				answ[minD].solution.push('наибольшее падение давления');
		}

		function isNonMoreP(interval, moreP) {
			return (interval.filter((int) => int < moreP)).length == interval.length;
		}

		function answAbouNonMoreP(interval, answ, moreP) {
			if (isNonMoreP(interval, moreP)) {
				answ.push('давление не превышало ' + convert(moreP) + ' мм рт. ст.');
			}
		}

		function isNonLessP(interval, lessP) {
			return interval.filter((int) => int > lessP).length == interval.length;
		}

		function answAbouNonLessP(interval, answ, lessP) {
			if (isNonLessP(interval, lessP)) {
				answ.push('давление не было ниже ' + convert(lessP) + ' мм рт. ст.');
			}
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
				answ.push('давление выросло');
			}
		}

		function answAboutDecreasing(interval, answ) {
			if (isDecreasing(interval)) {
				answ.push('давление упало');
			}
		}

		function answAboutIncreasingNonMoreP(interval, answ, moreP) {
			if (isIncreasing(interval) && isNonMoreP(interval, moreP)) {
				answ.push('давление росло, но не превышало ' + convert(moreP) + ' мм рт. ст.');
			}
		}

		function answAboutDecreasingNonLessP(interval, answ, lessP) {
			if (isDecreasing(interval) && isNonLessP(interval, lessP)) {
				answ.push('давление упало, но осталось больше ' + convert(lessP) + ' мм рт. ст.');
			}
		}

		function ConstP(interval) {
			return interval[0] == interval[1];
		}

		function answAbouConstP(interval, answ) {
			if (ConstP(interval))
				answ.push('давление не изменилось');
		}

		function answAbouConstPNotLess(interval, answ, lessP) {
			if (ConstP(interval) && isNonLessP(interval, lessP))
				answ.push('давление не изменилось и было выше ' + convert(lessP) + ' мм рт. ст');
		}

		function answAbouConstPNotMore(interval, answ, moreP) {
			if (ConstP(interval) && isNonMoreP(interval, moreP))
				answ.push('давление не изменилось и было ниже ' + convert(moreP) + ' мм рт. ст');
		}

		let mounth = sklonlxkand(om.months.iz()).re;
		let beginDay = sl(1, 20);

		let t = [1].zapMonot(13, 0, 1, 1); // шкала времени
		let p = [sl(0, 7, 0.5)]; // шкала давления

		for (; p.length <= t.length || p.length == t.length;) {
			let interI = (t.length / sl(2, 8).floor());
			for (let j = 0; j < interI; j++) {
				p.push([sl(0, 7, 0.5), p[p.length - 1]][Number([0, 0, 0, 1].iz() && p[p.length - 1] != 0)]);
			}
		}

		let intervalsTime = Array.from({ length: t.length - 1 }, (_, i) =>
			t.slice(i, i + 2)
		);

		let intervals2 = Array.from({ length: 3 }, (_, i) =>
			intervalsTime.slice(i * 4, i * 4 + 4).iz(2)
		);

		intervalsTime = intervals2.flat().iz(4);

		let intervalsP = intervalsTime.map(intT => [p[intT[0]], p[intT[1]]]);

		let timeDay = ['ночь', 'утро', 'день', 'вечер'];
		//  			0-6		6-12	12-18	18-0

		let listOfIntervals = intervalsTime.map((interval, i) => {
			return {
				expr: `${timeDay[interval[0] % 4]} ${Math.floor(interval[0] / 4) + 1 + beginDay} ${mounth} (с ${(interval[0] * 6) % 24} до ${(interval[1] * 6) % 24} часов)`,
				solution: [],
			};
		});
		let varianbleConst = sl1();

		let LessP1 = sl(0, 7);
		let LessP2 = sl(0, 7);
		let MoreP1 = sl(0, 7);
		let MoreP2 = sl(0, 7);

		function addAllAnswers(intervalsP, listOfIntervals) {
			intervalsP.forEach((interval, i) => {
				const solution = listOfIntervals[i].solution;

				// добавляем ответ про повышение давления
				answAboutIncreasing(interval, solution);
				// добавляем ответ про понижение давления
				answAboutDecreasing(interval, solution);
				// добавляем ответ про повышение давления но меньше
				answAboutIncreasingNonMoreP(interval, solution, MoreP1);
				// добавляем ответ про понижение давления но больше
				answAboutDecreasingNonLessP(interval, solution, LessP1);
				// добавляем ответ про давление было не более
				answAbouNonMoreP(interval, solution, MoreP2);
				// добавляем ответ про давление было не менее
				answAbouNonLessP(interval, solution, LessP2);

				if (varianbleConst) {
					// добавляем ответ про давление не изменилось
					answAbouConstP(interval, solution);
				} else {
					//давление не изменилось и было ниже
					answAbouConstPNotMore(interval, solution, MoreP1);
					//давление не изменилось и было выше
					answAbouConstPNotLess(interval, solution, LessP1);
				}
			});
		}

		// добавляем ответ про максимальное давление
		answAbouMaxP(intervalsP, listOfIntervals);
		// добавляем ответ про максимальный и минимальный рост
		answAbouMaxMinDeltaP(intervalsP, listOfIntervals);
		addAllAnswers(intervalsP, listOfIntervals);

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

			for (let i = 0; i < t.length; i++) {
				ctx.drawFilledCircle(t[i], p[i], 3 / 30);
				if (i < t.length - 1)
					ctx.drawLine(t[i], p[i], t[i + 1], p[i + 1]);
			}

			ctx.scale(1 / 40, -1 / 30);
			ctx.font = "12px serif";
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			for (let i = 0; i < 3; i++) {
				ctx.fillText((i + 1 + beginDay) + ' ' + mounth, 80 + 160 * i, 40);
			}
		};

		NAtask.setCorrespondenceTask({
			text: 'На рисунке точками показано атмосферное давление в некотором городе на протяжении трёх суток с ' + (beginDay + 1) + ' по ' + (beginDay + 3) + ' ' + mounth + ' 20' + sl(10, 25) + ' года. ' +
				'В течение суток давление измеряется 4 раза: в 0:00, в 6:00, в 12:00 и в 18:00. ' +
				'По горизонтали указывается время и дата, по вертикали – давление в миллиметрах ртутного столба. ' +
				'Для наглядности точки соединены линиями.',
			leftHeader: 'ИНТЕРВАЛЫ',
			left: listOfIntervals,
			rightHeader: 'ХАРАКТЕРИСТИКИ',
			right: solutions,
			postText: 'Пользуясь рисунком, поставьте в соответствие каждому из указанных периодов времени характеристику атмосферного давления в этом городе в течение этого периода.<br/><br/> ВРЕМЕННЫЕ ОТВЕТЫ <br/>' +
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
//https://mathb-ege.sdamgia.ru/problem?id=506497
