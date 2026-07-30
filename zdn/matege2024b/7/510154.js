(function () {
    'use strict';
    retryWhileError(function () { 
        /* 'На рисунке точками показан годовой объём добычи угля в России открытым способом в период с 2001 по 2010 год. По горизонтали указывается год, по вертикали – объём добычи угля в миллионах тонн. Для наглядности точки соединены линиями.' */
        
        function convert(value){   
            return 150 + value * 25+ ' млн т';
        }

        function answAboutMin(intervals, answ) {
            let minIndex = findMinInIntervals(intervals, production);
            let wasMin = intervals.map((_, i) => i === minIndex);
            addUniqueAnsw(wasMin, answ, 'период с минимальным показателем добычи за 10 лет');
        }

        function answAboutMoreButLess(intervals, answ, MoreP, LessP) {
            let wasCondition = intervals.map(interval => isLess(interval, LessP) && isMore(interval, MoreP));
            addUniqueAnsw(wasCondition, answ, 'годовой объём добычи составлял больше ' + convert(MoreP) + ', но меньше ' + convert(LessP) );
        }

        function answAboutMore(intervals, answ, MoreP) {
            let wasMore = intervals.map(interval => isMore(interval, MoreP));
            addUniqueAnsw(wasMore, answ, 'объём добычи ежегодно составлял больше ' + convert(MoreP));
        }

        function answAboutLess(intervals, answ, LessP) {
            let wasLess = intervals.map(interval => isLess(interval, LessP));
            addUniqueAnsw(wasLess, answ, 'объём добычи ежегодно составлял меньше ' + convert(LessP));
        }

        function answAboutIncreasing(intervals, answ) {
            let wasIncreasing = intervals.map(interval => isIncreasing(interval));
            addUniqueAnsw(wasIncreasing, answ, 'объём добычи в этот период рос с каждым годом');
        }

        function answAboutDecreasing(intervals, answ) {
            let wasDecreasing = intervals.map(interval => isDecreasing(interval));
            addUniqueAnsw(wasDecreasing, answ, 'объём добычи в этот период падал с каждым годом');
        }

        function answAboutSharpRise(intervals, answ) {
            let wasSharpRise = intervals.map((interval) => {
                let delta = [];
                if (isIncreasing(interval)) {
                    for (let i = 1; i < interval.length; i++) {
                        delta.push(interval[i] - interval[i - 1]);
                    }
                    return delta[1] - delta[0] > 1 && delta[0] < 0.7;
                } else {
                    return false;
                }
            });
            addUniqueAnsw(wasSharpRise, answ, 'объём добычи в первые два года почти не менялся, а затем значительно вырос');
        }

        function answAboutSlowRise(intervals, answ) {
            let wasSlowRise = intervals.map((interval) => {
                let delta = [];
                if (isIncreasing(interval)) {
                    for (let i = 1; i < interval.length; i++) {
                        delta.push(interval[i] - interval[i - 1]);
                    }
                    return delta.every(d => d < 0.5);
                } else {
                    return false;
                }
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

        let time = [0].zapMonot(10, 0, 1, 1); // шкала времени
        let production = [sl(0, 4)]; // шкала добычи
        let count = 0;

        for (; production.length <= time.length;) {
            let interI = ((time.length / (sl(3, 8, 0.5))).floor());
            for (let j = 0; j < interI; j++) {
                let lastProduction = production[production.length - 1];
                let newProduction = lastProduction + (sl(0.1, 2, 0.1) * (-1).pow(count % 2));
                if (newProduction > 1 && newProduction <= 4)
                    production.push(newProduction);
                else
                    break;
            }
            count++;
        }
        let beginYear = sl1();

        let intervals = Array.from({
            length: 4
        }, (_, i) =>
            production.slice(i * 2 + beginYear, i * 2 + 3 + beginYear));

        let listOfIntervals = intervals.map((interval, i) => {
            return {
                expr: `${2001 + i * 2 + beginYear}-${2001 + i * 2 + 2 + beginYear}`,
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
            // добавляем ответ про понижение добычи а потом увеличение
            answAboutDecreasingAfterIncreasing(intervals, listOfIntervals);
        } else {
            // добавляем ответ про увеличение добычи а потом понижение
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

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            ctx.drawGridWithArrows({
                gridWidth: 570,
                gridHeight: 420,
                cellWidth: 60,
                cellHeight: 60,
                stepX: 1,
                stepY: 25,
                minX: 2001,
                maxX: 2010,
                minY: 150,
                maxY: 250,
                stepByCeilX: 1,
                arrowLengthX: 8.5,
                arrowLengthY: 4.9,
            });

            ctx.translate(60, 60 * 5);
            ctx.scale(60, -60);
            ctx.lineWidth = 2 / 60;

            for (let i = 0; i < time.length; i++) {
                ctx.drawFilledCircle(time[i], production[i], 3 / 60);
                if (i < time.length - 1)
                    ctx.drawLine(time[i], production[i], time[i + 1], production[i + 1]);
            }
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
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 600,
            paint: paint1,
        });
    }, 2000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510154
