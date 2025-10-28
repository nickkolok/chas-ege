(function () {
    'use strict';
    retryWhileError(function () { /* 'На рисунке точками показаны ежемесячные объёмы продаж холодильников в магазине бытовой техники. По горизонтали указываются месяцы, по вертикали – количество проданных холодильников. Для наглядности точки соединены линией.' */
        
        function convert(P){
            return P*100 + 100;
        }

        function answAbouMaxV(intervals, answ) {
            let maxV = production.maxE();
            let maxIndex = null;
            let maxCount = 0;

            for (let i = 0; i < intervals.length; i++) {
                for (let j = 0; j < intervals[i].length; j++) {
                    if (intervals[i][j] === maxV) {
                        maxCount++;
                        if (maxCount > 1) {
                            return;
                        }
                        maxIndex = i;
                    }
                }
            }

            if (maxIndex)
                answ[maxIndex].solution.push('ежемесячный объём продаж достигает максимума за весь период');
        }
        
        function indexConst(interval) {
            let index = [];
            for (let j = 1; j < interval.length; j++) {
                if (interval[j] === interval[j - 1]) {
                    if(index.length)
                        index.push(j, j-1);
                    else 
                        index.push(j);
                }
            }
            return index;
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
			
			if (length(incr, maxEI)){
				answ[maxI].solution.push('за этот период ежемесячный объём продаж увеличился на '+convert(maxEI)+' холодильников');
                answ[maxI].solution.push('наибольший рост ежемесячного объёма продаж');					}	
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
			
			if (length(decr, maxED)){
                answ[maxD].solution.push('за этот период ежемесячный объём продаж уменьшился на '+convert(maxED)+' холодильников');
				answ[maxD].solution.push('наибольшее падение ежемесячного объёма продаж');}
		}
        
        function answAboutConst(interval, answ) {
            let indexes = indexConst(interval)
            switch(indexes.length){
                case 3: 
                    answ.push('все три месяца периода объём продаж был одинаковым');
                    break;
                case 2: 
                    if(indexes.includes(0)){
                        answ.push('продажи за первый и второй месяцы периода совпадают');
                    } else {
                        answ.push('продажи за второй и третий месяцы периода совпадают');
                    }
                break;
            }
        }

        function answAbouMoreInMounth(interval, answ, mounth, MoreP) {
            if (interval[mounth] > MoreP ) {
                answ.push('за '+['первый', 'второй', 'последний'][mounth]+' месяц периода было продано больше ' + convert(MoreP) + ' холодильников');
            }
        }

        function answAbouLessInMounth(interval, answ, mounth, LessP) {
             if (interval[mounth] < LessP ) {
                answ.push('за '+['первый', 'второй', 'последний'][mounth]+' месяц периода было продано меньше ' + convert(LessP) + ' холодильников');
            }
        }
        
        function answAboutSlowRise(intervals, answ) {
            let rightInervals = intervals.map((interval) => {
                let delta = [];
                if (isIncreasing(interval)) {
                    for (let i = 1; i < interval.length; i++) {
                        delta.push(interval[i] - interval[i - 1]);
                    }
                    return delta.every(d=> d<0.5);
                } else
                    return 0;
            });

            let length = (inter, value) => inter.filter(item => item === value).length == 1;

            if (length(rightInervals, true)) {
                answ[rightInervals.indexOf(true)].solution.push('объём добычи медленно рос в течение периода')
            }
        }

        let mounth = om.months;
        let mounthView = mounth.map(m=>m.slice(0,3));

        let t = [0].zapMonot(12, 0, 1, 1); // шкала времени
        let production = [sl(2,5)]; // шкала продаж
        let count = 1;

        for (; production.length <= t.length || production.length == t.length || count==100;) {
            let interI = ((t.length / 3).floor());
            for (let j = 0; j < interI; j++) {
                let lastProduction = production[production.length - 1];
                let newProduction = [0, 0, 0 , 1].iz() ? lastProduction : lastProduction + (sl(0.5, 1.5, 0.5) * (-1).pow(count % 2));
                if (newProduction > 1 && newProduction <= 6)
                    production.push(newProduction);
            }
            count++;
        }

        let intervals = Array.from({
            length: 4
        }, (_, i) =>
            production.slice(i * 3, i * 3 + 3));
            
        let listOfIntervals = intervals.map((interval, i) => {
            return {
                expr: `${mounth[i * 3]}-${mounth[i * 3 + 2]}`,
                solution: []
            };
        });

        let lessP = sl(2, 3);
        let moreP = slKrome(lessP, 3, 5);
        let lessM = sl(2);
        let moreM = slKrome(lessM, 0, 2);

        function addAllAnswers(intervals, listOfIntervals) {
            intervals.forEach((interval, i) => {
                const solution = listOfIntervals[i].solution;
                answAboutConst(interval, solution);
                
                answAbouLessInMounth(interval, solution, lessM, lessP);
                
                answAbouMoreInMounth(interval, solution, moreM, moreP);
    
            });
        }

        // добавляем ответ про максимальный показатель
        answAbouMaxV(intervals, listOfIntervals);
        answAbouMaxDeltaI(intervals, listOfIntervals);
        answAbouMaxDeltaD(intervals, listOfIntervals);
        answAboutSlowRise(intervals, listOfIntervals);
        addAllAnswers(intervals, listOfIntervals);

        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            ctx.drawGridWithArrows({
                gridWidth: 460,
                gridHeight: 360,
                cellWidth: 40,
                cellHeight: 40,
                stepX: 1,
                stepY: 100,
                typeX: 'custom',
                labelsX: mounthView,
                minY: 100,
                maxY: 700,
                stepByCeilX: 1,
                arrowLengthX: 10.5,
                arrowLengthY: 6.9,
            });

            ctx.translate(40, 40 * 7);
            ctx.scale(40, -40);
            ctx.lineWidth = 2 / 40;

            for (let i = 0; i < t.length; i++) {
                ctx.drawFilledCircle(t[i], production[i], 3 / 40);
                if (i < t.length - 1)
                    ctx.drawLine(t[i], production[i], t[i + 1], production[i + 1]);
            }
        };

        NAtask.setCorrespondenceTask({
            text: 'На рисунке точками показаны ежемесячные объёмы продаж холодильников в магазине бытовой техники. По горизонтали указываются месяцы, по вертикали – количество проданных холодильников. Для наглядности точки соединены линией.',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь рисунком, поставьте в соответствие каждому из указанных периодов времени характеристику продаж холодильников.<br/><br/> ВРЕМЕННЫЕ ОТВЕТЫ <br/>' +
                listView.join('<br/>'),
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 400,
            paint: paint1,
        });
    }, 20);
})();
// https://mathb-ege.sdamgia.ru/problem?id=509639
