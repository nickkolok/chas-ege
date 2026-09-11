(function () {
    'use strict';
    retryWhileError(function () { 
        /* 'На рисунке точками показаны ежемесячные объёмы продаж холодильников в магазине бытовой техники. По горизонтали указываются месяцы, по вертикали – количество проданных холодильников. Для наглядности точки соединены линией.' */

        function convert(P) {
            return P * 100 + 100;
        }

        function answAboutMax(intervals, answ) {
            let maxIndex = findMaxInIntervals(intervals, production);
            let wasMax = intervals.map((_, i) => i === maxIndex);
            addUniqueAnsw(wasMax, answ, 'ежемесячный объём продаж достигает максимума за весь период');
        }
        
        function answAboutConst(intervals, answ) {
            let wasConst = intervals.map(interval => {
                let indexes = indexConst(interval);
                return indexes.length === 3;
            });
            let wasConstTwoFirst = intervals.map(interval => {
                let indexes = indexConst(interval);
                return indexes.length === 2 && indexes.includes(0);
            });
            let wasConstTwoLast = intervals.map(interval => {
                let indexes = indexConst(interval);
                return indexes.length === 2 && !indexes.includes(0);
            });

            if (sl1()) {
                addUniqueAnsw(wasConstTwoFirst, answ, 'продажи за первый и второй месяцы периода совпадают');
            } else {
                addUniqueAnsw(wasConstTwoLast, answ, 'продажи за второй и третий месяцы периода совпадают');
            }
            addUniqueAnsw(wasConst, answ, 'все три месяца периода объём продаж был одинаковым');
        }

        function answAboutMoreInMounth(intervals, answ, month, MoreP) {
            let wasMore = intervals.map(interval => interval[month] > MoreP);
            let monthNames = ['первый', 'второй', 'последний'];
            addUniqueAnsw(wasMore, answ, 'за ' + monthNames[month] + ' месяц периода было продано больше ' + convert(MoreP) + ' холодильников');
        }

        function answAboutLessInMounth(intervals, answ, month, LessP) {
            let wasLess = intervals.map(interval => interval[month] < LessP);
            let monthNames = ['первый', 'второй', 'последний'];
            addUniqueAnsw(wasLess, answ, 'за ' + monthNames[month] + ' месяц периода было продано меньше ' + convert(LessP) + ' холодильников');
        }

        function answAboutSlowRise(intervals, answ) {
            let wasSlowRise = intervals.map((interval) => {
                if (isIncreasing(interval)) {
                    let delta = [];
                    for (let i = 1; i < interval.length; i++) {
                        delta.push(interval[i] - interval[i - 1]);
                    }
                    return delta.every(d => d < 0.5);
                } else {
                    return false;
                }
            });
            addUniqueAnsw(wasSlowRise, answ, 'объём продаж медленно рос в течение периода');
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
            addUniqueAnsw(wasMaxDeltaI, answ, 'за этот период ежемесячный объём продаж увеличился на ' + convert(maxEI - 1) + ' холодильников');
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
            addUniqueAnsw(wasMaxDeltaD, answ, 'за этот период ежемесячный объём продаж уменьшился на ' + convert(maxED - 1) + ' холодильников');
        }

        let month = om.months;
        let monthView = month.map(m => m.slice(0, 3));

        let time = [0].zapMonot(12, 0, 1, 1); // шкала времени
        let production = [sl(2, 5)]; // шкала продаж
        let count = 1;

        for (; production.length <= time.length && count < 100;) {
            let interI = ((time.length / 3).floor());
            for (let j = 0; j < interI; j++) {
                let lastProduction = production[production.length - 1];
                let newProduction = [0, 0, 0, 1].iz() ? lastProduction : lastProduction + (sl(0.5, 1.5, 0.5) * (-1).pow(count % 2));
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
                expr: `${month[i * 3]}-${month[i * 3 + 2]}`,
                solution: []
            };
        });

        let lessP = sl(2, 3);
        let moreP = slKrome(lessP, 3, 5);
        let lessM = sl(2);
        let moreM = slKrome(lessM, 0, 2);

        answAboutConst(intervals, listOfIntervals);
        answAboutLessInMounth(intervals, listOfIntervals, lessM, lessP);
        answAboutMoreInMounth(intervals, listOfIntervals, moreM, moreP);

        // добавляем ответ про максимальный показатель
        answAboutMax(intervals, listOfIntervals, production);
        answAboutMaxDeltaI(intervals, listOfIntervals);
        answAboutMaxDeltaD(intervals, listOfIntervals);
        answAboutSlowRise(intervals, listOfIntervals);

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
                labelsX: monthView,
                minY: 100,
                maxY: 700,
                stepByCeilX: 1,
                arrowLengthX: 10.5,
                arrowLengthY: 6.9,
            });

            ctx.translate(40, 40 * 7);
            ctx.scale(40, -40);
            ctx.lineWidth = 2 / 40;

            for (let i = 0; i < time.length; i++) {
                ctx.drawFilledCircle(time[i], production[i], 3 / 40);
                if (i < time.length - 1)
                    ctx.drawLine(time[i], production[i], time[i + 1], production[i + 1]);
            }
        };

        NAtask.setCorrespondenceTask({
            text: 'На рисунке точками показаны ежемесячные объёмы продаж холодильников в магазине бытовой техники. По горизонтали указываются месяцы, по вертикали – количество проданных холодильников. Для наглядности точки соединены линией.',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь рисунком, поставьте в соответствие каждому из указанных периодов времени характеристику продаж холодильников.',
            analys:listView.join('<br/>'),
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 400,
            paint: paint1,
        });
    }, 2000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=509639
