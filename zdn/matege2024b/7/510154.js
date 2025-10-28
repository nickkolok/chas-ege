(function () {
    'use strict';
    retryWhileError(function () { /* 'На рисунке точками показан годовой объём добычи угля в России открытым способом в период с 2001 по 2010 год. По горизонтали указывается год, по вертикали – объём добычи угля в миллионах тонн. Для наглядности точки соединены линиями.' */

        function answAbouMinV(intervals, answ) {
            let minV = production.minE();
            let minIndex = null;
            let minCount = 0;

            for (let i = 0; i < intervals.length; i++) {
                for (let j = 0; j < intervals[i].length; j++) {
                    if (intervals[i][j] === minV) {
                        minCount++;
                        if (minCount > 1) {
                            return;
                        }
                        minIndex = i;
                    }
                }
            }

            if (minIndex)
                answ[minIndex].solution.push('период с минимальным показателем добычи за 10 лет');
        }

        function isMoreP(interval, production) {
            return (interval.filter((int) => int > production)).length == interval.length;
        }

        function isLessP(interval, production) {
            return interval.filter((int) => int < production).length == interval.length;
        }

        function answAbouMoreVButLess(interval, answ, MoreP, LessP) {
            if (isLessP(interval, LessP) && isMoreP(interval, MoreP)) {
                answ.push('годовой объём добычи составлял больше ' + (150+MoreP * 25) + ' млн т, но меньше ' + (150+LessP * 25) + ' млн');
            }
        }

        function answAbouMore(interval, answ, MoreP) {
            if (isMoreP(interval, MoreP)) {
                answ.push('объём добычи ежегодно составлял больше ' + (150+MoreP * 25) + ' млн т');
            }
        }

        function answAbouLess(interval, answ, LessP) {
            if (isLessP(interval, LessP)) {
                answ.push('объём добычи ежегодно составлял меньше ' + (150 + LessP * 25) + ' млн т');
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
                answ.push('объём добычи в этот период рос с каждым годом');
            }
        }

        function answAboutDecreasing(interval, answ) {
            if (isDecreasing(interval)) {
                answ.push('объём добычи в этот период падал с каждым годом');
            }
        }

        function answAboutSharpRise(intervals, answ) {
            let rightInervals = intervals.map((interval) => {
                let delta = [];
                if (isIncreasing(interval)) {
                    for (let i = 1; i < interval.length; i++) {
                        delta.push(interval[i] - interval[i - 1]);
                    }
                    return delta[1] - delta[0] > 1 && delta[0] < 0.7;
                } else
                    return 0;
            });

            let length = (inter, value) => inter.filter(item => item === value).length == 1;

            if (length(rightInervals, true)) {
                answ[rightInervals.indexOf(true)].solution.push('объём добычи в первые два года почти не менялся, а затем значительно вырос')
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

        function answAboutDecreasingAfterIncreasing(interval, answ) {
            if (isDecreasingAfterIsIncreasing(interval)) {
                answ.push('в течение периода объём добычи сначала падать, а затем стал расти');
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

        function answAboutIncreasingAfterDecreasing(interval, answ) {
            if (isIncreasingAfterIsDecreasing(interval)) {
                answ.push('в течение периода объём добычи сначала рос, а затем стал падать');
            }
        }

        let t = [0].zapMonot(10, 0, 1, 1); // шкала времени
        let production = [sl(0, 4)]; // шкала добычи
        let count = 0;

        for (; production.length <= t.length || production.length == t.length;) {
            let interI = ((t.length / (sl(3, 8, 0.5))).floor());
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

        function addAllAnswers(intervals, listOfIntervals) {
            intervals.forEach((interval, i) => {
                const solution = listOfIntervals[i].solution;
                if (aAboutIncrOrDecr) {
                    // добавляем ответ про повышение добычи
                    answAboutIncreasing(interval, solution);
                } else {
                    // добавляем ответ про понижение добычи
                    answAboutDecreasing(interval, solution);
                }
                if (aIncrAfterDecr) {
                    // добавляем ответ про понижение добычи а потом увеличение
                    answAboutDecreasingAfterIncreasing(interval, solution);
                } else {
                    // добавляем ответ про увеличение добычи а потом понижение
                    answAboutIncreasingAfterDecreasing(interval, solution);
                }

                answAbouLess(interval, solution);
                answAbouMore(interval, solution);
                answAbouMoreVButLess(interval, solution, moreP, lessP);
            });
        }

        // добавляем ответ про минимальный показатель
        answAbouMinV(intervals, listOfIntervals);
        answAboutSharpRise(intervals, listOfIntervals);
        answAboutSlowRise(intervals, listOfIntervals);
        addAllAnswers(intervals, listOfIntervals);

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

            for (let i = 0; i < t.length; i++) {
                ctx.drawFilledCircle(t[i], production[i], 3 / 60);
                if (i < t.length - 1)
                    ctx.drawLine(t[i], production[i], t[i + 1], production[i + 1]);
            }
        };

        NAtask.setCorrespondenceTask({
            text: 'На рисунке точками показан годовой объём добычи угля в России открытым способом в период с 2001 по 2010 год. По горизонтали указывается год, по вертикали – объём добычи угля в миллионах тонн. Для наглядности точки соединены линиями.',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь рисунком, поставьте в соответствие каждому из указанных периодов времени характеристику добычи угля в этот период.<br/><br/> ВРЕМЕННЫЕ ОТВЕТЫ <br/>' +
                listView.join('<br/>'),
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
