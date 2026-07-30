(function () {
    'use strict';
    retryWhileError(function () { 
        /* На рисунке точками показаны ежемесячные объёмы продаж обогревателей в магазине бытовой техники. По горизонтали указываются месяцы, по вертикали – количество проданных обогревателей. Для наглядности точки соединены линией.*/

        function convert(P) {
            return P * 20;
        }

        function answAboutMaxMin(intervals, answ) {
            let maxIndex = findMaxInIntervals(intervals, production);
            let minIndex = findMinInIntervals(intervals, production);
            
            let wasMax = intervals.map((_, i) => i === maxIndex);
            let wasMin = intervals.map((_, i) => i === minIndex);
            
            if(sl1())
                addUniqueAnsw(wasMax, answ, 'ежемесячный объём продаж достигает максимума за весь период');
            if(sl1())
                addUniqueAnsw(wasMin, answ, 'ежемесячный объём продаж достигает минимума за весь период');
        }

        function answAboutIncreasingLess(intervals, answ, more) {
            let wasCondition = intervals.map(interval => isIncreasing(interval) && isLess(interval, more));
            addUniqueAnsw(wasCondition, answ, 'ежемесячный объём продаж рос, но был меньше ' + convert(more) + ' штук');
        }

        function answAboutIncreasingMore(intervals, answ, more) {
            let wasCondition = intervals.map(interval => isIncreasing(interval) && isMore(interval, more));
            addUniqueAnsw(wasCondition, answ, 'ежемесячный объём продаж рос и был больше ' + convert(more) + ' штук');
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
            addUniqueAnsw(wasMaxDeltaI, answ, 'рост объёма продаж более чем на ' + convert(maxEI - 1) + ' штук за период');
        }

        function answAboutLess(intervals, answ, less) {
            let wasCondition = intervals.map(interval => isLess(interval, less) && (isDecreasing(interval) || isIncreasing(interval)));
            addUniqueAnsw(wasCondition, answ, 'ежемесячный объём продаж был меньше ' + convert(less) + ' штук в течение всего периода');
        }

        function answAboutMore(intervals, answ, more) {
            let wasCondition = intervals.map(interval => isMore(interval, more) && (isDecreasing(interval) || isIncreasing(interval)));
            addUniqueAnsw(wasCondition, answ, 'ежемесячный объём продаж был больше ' + convert(more) + ' штук в течение всего периода');
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
            addUniqueAnsw(wasMaxDeltaD, answ, 'падение объёма продаж более чем на ' + convert(maxED - 1) + ' штук за период');
        }

        function answAboutConst(intervals, answ) {
            let wasConst = intervals.map(interval => indexConst(interval).length == 3);
            addUniqueAnsw(wasConst, answ, 'ежемесячный объём продаж не менялся в течение всего периода');
        }

        function answAboutIncreasing(intervals, answ) {
            let wasIncreasing = intervals.map(interval => isIncreasing(interval));
            addUniqueAnsw(wasIncreasing, answ, 'ежемесячный объём продаж рос в течение всего периода');
        }

        function answAboutDecreasing(intervals, answ) {
            let wasDecreasing = intervals.map(interval => isDecreasing(interval));
            addUniqueAnsw(wasDecreasing, answ, 'ежемесячный объём продаж падал в течение всего периода');
        }

        let month = om.months.slice().permuteCyclic(1);
        let monthView = month.map(m => m.slice(0, 3));

        let season = ['зима', 'весна', 'лето', 'осень'];

        let time = [0].zapMonot(12, 0, 1, 1); // шкала времени
        let production = [sl(5, 8)]; // шкала продаж
        let count = 1;

        for (; production.length <= time.length || count == 100;) {
            let interI = ((time.length / 1.6).floor());
            for (let j = 0; j < interI; j++) {
                let lastProduction = production[production.length - 1];
                let newProduction = sl1() ? lastProduction : lastProduction + (sl(0.5, 1.5, 0.1) * (-1).pow(count % 2));
                if (newProduction > 1 && newProduction <= 8)
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
                expr: `${season[i]}`,
                solution: []
            };
        });

        let less = sl(2, 4);
        let more = sl(4, 6);
        let nonMore = slKrome(less, 2, 4);
        
        answAboutConst(intervals, listOfIntervals);
        if (sl1()) {
            answAboutIncreasing(intervals, listOfIntervals);
        } else {
            answAboutDecreasing(intervals, listOfIntervals);
        }
        
        answAboutIncreasingMore(intervals, listOfIntervals, more);
        answAboutIncreasingLess(intervals, listOfIntervals, nonMore);
        
        answAboutLess(intervals, listOfIntervals, less);
        answAboutMore(intervals, listOfIntervals, more);
        
        // добавляем ответ про максимальный показатель
        answAboutMaxMin(intervals, listOfIntervals);
        answAboutMaxDeltaI(intervals, listOfIntervals);
        answAboutMaxDeltaD(intervals, listOfIntervals);

        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            ctx.translate(0, -10);
            ctx.drawGridWithArrows({
                gridWidth: 460,
                gridHeight: 440,
                cellWidth: 40,
                cellHeight: 40,
                stepX: 1,
                stepY: 20,
                typeX: 'custom',
                labelsX: monthView,
                minY: 0,
                maxY: 160,
                stepByCeilX: 1,
                arrowLengthX: 10.5,
                arrowLengthY: 8.6,
            });

            ctx.translate(40, 40 * 9);
            ctx.scale(40, -40);
            ctx.lineWidth = 2 / 40;

            for (let i = 0; i < time.length; i++) {
                ctx.drawFilledCircle(time[i], production[i], 3 / 40);
                if (i < time.length - 1)
                    ctx.drawLine(time[i], production[i], time[i + 1], production[i + 1]);
            }

            ctx.scale(1 / 40, -1 / 40);
            ctx.lineWidth = 1;
            ctx.font = "12px serif";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.setLineDash([20, 5]);

            for (let i = 0; i < 4; i++) {
                const point = time[i] * 40 + 40 * 2 * i + 40;
                if (i < 3)
                    ctx.drawLine(point + 60, 30, point + 60, -360)
                ctx.fillText(season[i], point, 40);
            }
        };

        NAtask.setCorrespondenceTask({
            text:
                'На рисунке точками показаны ежемесячные объёмы продаж обогревателей в магазине бытовой техники. ' +
                'По горизонтали указываются месяцы, ' +
                'по вертикали – количество проданных обогревателей. ' +
                'Для наглядности точки соединены линией.',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь рисунком, ' +
                'поставьте в соответствие каждому из указанных периодов времени характеристику продаж обогревателей.',
            analys: listView.join('<br/>'),
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 400,
            paint: paint1,
        });
    }, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510205
