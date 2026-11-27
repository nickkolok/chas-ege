(function () {
    'use strict';
    retryWhileError(function () {
        /* На рисунке точками показан годовой объём добычи угля в России открытым способом в период с 2001 по 2010 год. По горизонтали указывается год, по вертикали – объём добычи угля в миллионах тонн. Для наглядности точки соединены линиями. */

        let minY = 150, stepY = 25;

        function convert(value) {
            return minY + value * stepY + ' млн т';
        }

        function answAboutMin(intervals, answ) {
            let minIndex = findMinInIntervals(intervals, production);
            let wasMin = intervals.map((_, i) => i === minIndex);
            addUniqueAnsw(wasMin, answ, 'период с минимальным показателем добычи за 10 лет');
        }

        function answAboutMoreButLess(intervals, answ, moreP, lessP) {
            let wasCondition = intervals.map(interval => isLess(interval, lessP) && isMore(interval, moreP));
            addUniqueAnsw(wasCondition, answ, 'годовой объём добычи составлял больше ' + convert(moreP) + ', но меньше ' + convert(lessP));
        }

        function answAboutMore(intervals, answ, moreP) {
            let wasMore = intervals.map(interval => isMore(interval, moreP));
            addUniqueAnsw(wasMore, answ, 'объём добычи ежегодно составлял больше ' + convert(moreP));
        }

        function answAboutLess(intervals, answ, lessP) {
            let wasLess = intervals.map(interval => isLess(interval, lessP));
            addUniqueAnsw(wasLess, answ, 'объём добычи ежегодно составлял меньше ' + convert(lessP));
        }

        function answAboutIncreasing(intervals, answ) {
            let wasIncreasing = intervals.map(interval => isIncreasing(interval));
            addUniqueAnsw(wasIncreasing, answ, 'объём добычи в этот период рос с каждым годом');
        }

        function answAboutDecreasing(intervals, answ) {
            let wasDecreasing = intervals.map(interval => isDecreasing(interval));
            addUniqueAnsw(wasDecreasing, answ, 'объём добычи в этот период падал с каждым годом');
        }

        function getDeltas(interval) {
            if (!isIncreasing(interval)) {
                return null;
            }
            let delta = [];
            for (let i = 1; i < interval.length; i++) {
                delta.push(interval[i] - interval[i - 1]);
            }
            return delta;
        }

        function answAboutSharpRise(intervals, answ) {
            let wasSharpRise = intervals.map((interval) => {
                let delta = getDeltas(interval);
                if (!delta) {
                    return false;
                }
                return delta[1] - delta[0] > 1 && delta[0] < 0.7;
            });
            addUniqueAnsw(wasSharpRise, answ, 'объём добычи в первые два года почти не менялся, а затем значительно вырос');
        }

        function answAboutSlowRise(intervals, answ) {
            let wasSlowRise = intervals.map((interval) => {
                let delta = getDeltas(interval);
                if (!delta) {
                    return false;
                }
                return delta.every(d => d < 0.5);
            });
            addUniqueAnsw(wasSlowRise, answ, 'объём добычи медленно рос в течение периода');
        }

        function answAboutDecreasingAfterIncreasing(intervals, answ) {
            let wasCondition = intervals.map(interval => isDecreasingAfterIsIncreasing(interval));
            addUniqueAnsw(wasCondition, answ, 'в течение периода объём добычи сначала падал, а затем стал расти');
        }

        function answAboutIncreasingAfterDecreasing(intervals, answ) {
            let wasCondition = intervals.map(interval => isIncreasingAfterIsDecreasing(interval));
            addUniqueAnsw(wasCondition, answ, 'в течение периода объём добычи сначала рос, а затем стал падать');
        }

        const year0 = 2001;
        let time = [0].zapMonot(10, 0, 1, 1); // шкала времени
        let production = [sl(2, 4)]; // шкала добычи
        let count = 0;
        let maxAttempts = 100;

        for (; production.length < time.length && count < maxAttempts;) {
            let interI = (time.length / sl(3, 8, 0.5)).floor();
            for (let j = 0; j < interI && production.length < time.length; j++) {
                let lastProduction = production[production.length - 1];
                let newProduction = lastProduction + (sl(0.1, 2, 0.1) * (-1).pow(count % 2));
                if (newProduction > 1 && newProduction <= 4)
                    production.push(newProduction);
                else
                    break;
            }
            count++;
        }

        genAssert(production.length === time.length, 'Не удалось сгенерировать значения объёма добычи');

        let beginYear = sl1();

        let intervalStarts = Array.from({length: 4}, (_, i) => i * 2 + beginYear);
        let intervals = intervalStarts.map(start => production.slice(start, start + 3));

        let listOfIntervals = intervalStarts.map(start => {
            return {
                expr: `${year0 + start}-${year0 + start + 2}`,
                solution: []
            };
        });

        let aAboutIncrOrDecr = sl1();
        let aIncrAfterDecr = sl1();

        let lessP = sl(2, 3);
        let moreP = slKrome(lessP, 1, 2);

        if (aAboutIncrOrDecr) {
            // добавляем ответ про повышение добычи
            answAboutIncreasing(intervals, listOfIntervals);
        } else {
            // добавляем ответ про понижение добычи
            answAboutDecreasing(intervals, listOfIntervals);
        }
        if (aIncrAfterDecr) {
            // добавляем ответ про понижение добычи, а потом увеличение
            answAboutDecreasingAfterIncreasing(intervals, listOfIntervals);
        } else {
            // добавляем ответ про увеличение добычи, а потом понижение
            answAboutIncreasingAfterDecreasing(intervals, listOfIntervals);
        }

        answAboutLess(intervals, listOfIntervals, lessP);
        answAboutMore(intervals, listOfIntervals, moreP);
        answAboutMoreButLess(intervals, listOfIntervals, moreP, lessP);

        // добавляем ответ про минимальный показатель
        answAboutMin(intervals, listOfIntervals);
        answAboutSharpRise(intervals, listOfIntervals);
        answAboutSlowRise(intervals, listOfIntervals);

        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        let listView = listOfIntervals.map(list => list.expr + ': ' + list.solution);

        let paint1 = function (ctx) {
            let cell = 60;
            let origin = ctx.drawGridWithArrows({
                gridWidth: 570,
                gridHeight: 420,
                cellWidth: cell,
                cellHeight: cell,
                stepX: 1,
                stepY: stepY,
                minX: year0,
                maxX: year0 + time.length - 1,
                minY: minY,
                maxY: 250,
                stepByCeilX: 1,
                arrowLengthX: 8.5,
                arrowLengthY: 4.9,
            });

            ctx.translate(origin.originX, origin.originY);
            ctx.scale(cell, -cell);
            ctx.lineWidth = 2 / cell;

            ctx.drawPolyline(time, production, 3 / cell);
        };

        NAtask.setCorrespondenceTask({
            text: 'На рисунке точками показан годовой объём добычи угля в России открытым способом в период с 2001 по 2010 год. По горизонтали указывается год, по вертикали – объём добычи угля в миллионах тонн. Для наглядности точки соединены линиями.',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь рисунком, поставьте в соответствие каждому из указанных периодов времени характеристику добычи угля в этот период.',
            analys: listView.join('<br/>')
        });
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 600,
            paint: paint1,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 2000);
})();
// 510154


