(function () {
    'use strict';
    retryWhileError(function () { /* На рисунке точками показаны ежемесячныеобъёмы продаж обогревателей в магазине бытовой техники. По горизонтали указываются месяцы, по вертикали – количество проданных обогревателей. Для наглядности точки соединены линией.*/

        function convert(P) {
            return P * 20;
        }

        function answAbouMaxMin(intervals, answ) {
            let max = production.maxE();
            let min = production.minE();
            let maxIndex = null;
            let minIndex = null;
            let maxCount = 0;
            let minCount = 0;

            for (let i = 0; i < intervals.length; i++) {
                for (let j = 0; j < intervals[i].length; j++) {
                    if (intervals[i][j] === max) {
                        maxCount++;
                        if (maxCount > 1) {
                            return;
                        }
                        maxIndex = i;
                    }
                }
            }

            for (let i = 0; i < intervals.length; i++) {
                for (let j = 0; j < intervals[i].length; j++) {
                    if (intervals[i][j] === min) {
                        minCount++;
                        if (minCount > 1) {
                            return;
                        }
                        minIndex = i;
                    }
                }
            }

            if (maxIndex)
                answ[maxIndex].solution.push('ежемесячный объём продаж достигает максимума за весь период');

            if (minIndex)
                answ[minIndex].solution.push('ежемесячный объём продаж достигает минимума за весь период');
        }

        function indexConst(interval) {
            let index = [];
            for (let j = 1; j < interval.length; j++) {
                if (interval[j] === interval[j - 1]) {
                    if (index.length)
                        index.push(j, j - 1);
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

        function isNonMore(interval, more) {
            return (interval.filter((int) => int < more)).length == interval.length;
        }

        function answAboutIncreasingNonMore(interval, answ, more) {
            if (isIncreasing(interval) && isNonMore(interval, more)) {
                answ.push('ежемесячный объём продаж рос, но был меньше ' + convert(more) + ' штук');
            }
        }

        function answAboutIncreasingMore(interval, answ, more) {
            if (isDecreasing(interval) && isMore(interval, more)) {
                answ.push('ежемесячный объём продаж рос и был больше ' + convert(more) + ' штук');
            }
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

            if (length(incr, maxEI)) {
                answ[maxI].solution.push('рост объёма продаж более чем на ' + convert(maxEI - 1) + ' штук за период');
            }
        }

        function isLess(interval, less) {
            return interval.filter((int) => int < less).length == interval.length;
        }

        function answAbouLess(interval, answ, less) {
            if (isLess(interval, less) && (isDecreasing(interval) || isIncreasing(interval))) {
                answ.push('ежемесячный объём продаж был меньше ' + convert(less) + ' штук в течение всего периода');
            }
        }

        function isMore(interval, more) {
            return interval.filter((int) => int > more).length == interval.length;
        }

        function answAbouMore(interval, answ, more) {
            if (isMore(interval, more) && (isDecreasing(interval) || isIncreasing(interval))) {
                answ.push('ежемесячный объём продаж был больше ' + convert(more) + ' штук в течение всего периода');
            }
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

            if (length(decr, maxED)) {
                answ[maxD].solution.push('падение объёма продаж более чем на ' + convert(maxED - 1) + ' штук за период');
            }
        }

        function answAboutConst(interval, answ) {
            if (indexConst(interval).length == 3) {
                answ.push('ежемесячный объём продаж не менялся в течение всего периода');
            }
        }

        function answAboutIncreasing(interval, answ) {
            if (isIncreasing(interval)) {
                answ.push('ежемесячный объём продаж рос в течение всего периода');
            }
        }

        function answAboutDecreasing(interval, answ) {
            if (isDecreasing(interval)) {
                answ.push('ежемесячный объём продаж падал в течение всего периода');
            }
        }

        let mounth = om.months.slice().permuteCyclic(1);
        let mounthView = mounth.map(m => m.slice(0, 3));

        let season = ['зима', 'весна', 'лето', 'осень'];

        let t = [0].zapMonot(12, 0, 1, 1); // шкала времени
        let production = [sl(5, 8)]; // шкала продаж
        let count = 1;

        for (; production.length <= t.length || production.length == t.length || count == 100;) {
            let interI = ((t.length / 1.6).floor());
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

        function addAllAnswers(intervals, listOfIntervals) {
            intervals.forEach((interval, i) => {
                const solution = listOfIntervals[i].solution;
                answAboutConst(interval, solution);

                answAboutIncreasing(interval, solution);
                answAboutDecreasing(interval, solution);

                answAbouLess(interval, solution, less);
                answAbouMore(interval, solution, more);

                answAboutIncreasingMore(interval, solution, more);
                answAboutIncreasingNonMore(interval, solution, nonMore);
            });
        }

        // добавляем ответ про максимальный показатель
        answAbouMaxMin(intervals, listOfIntervals);
        answAbouMaxDeltaI(intervals, listOfIntervals);
        answAbouMaxDeltaD(intervals, listOfIntervals);
        addAllAnswers(intervals, listOfIntervals);

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
                labelsX: mounthView,
                minY: 0,
                maxY: 160,
                stepByCeilX: 1,
                arrowLengthX: 10.5,
                arrowLengthY: 8.6,
            });

            ctx.translate(40, 40 * 9);
            ctx.scale(40, -40);
            ctx.lineWidth = 2 / 40;

            for (let i = 0; i < t.length; i++) {
                ctx.drawFilledCircle(t[i], production[i], 3 / 40);
                if (i < t.length - 1)
                    ctx.drawLine(t[i], production[i], t[i + 1], production[i + 1]);
            }

            ctx.scale(1 / 40, -1 / 40);
            ctx.lineWidth = 1;
            ctx.font = "12px serif";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.setLineDash([20, 5]);

            for (let i = 0; i < 4; i++) {
                const point = t[i] * 40 + 40 * 2 * i + 40;
                if (i < 3)
                    ctx.drawLine(point + 60, 30, point + 60, -360)
                ctx.fillText(season[i], point, 40);
            }
        };

        NAtask.setCorrespondenceTask({
            text:
                'На рисунке точками показаны ежемесячны еобъёмы продаж обогревателей в магазине бытовой техники. ' +
                'По горизонтали указываются месяцы, ' +
                'по вертикали – количество проданных обогревателей. ' +
                'Для наглядности точки соединены линией.',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь рисунком, ' +
                'поставьте в соответствие каждому из указанных периодоввремени характеристикупродаж обогревателей.<br/><br/> ВРЕМЕННЫЕ ОТВЕТЫ <br/>' +
                listView.join('<br/>'),
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
