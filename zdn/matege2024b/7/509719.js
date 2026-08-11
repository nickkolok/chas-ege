(function () {
    'use strict';
    retryWhileError(function () {
        /* На графике изображена зависимость частоты пульса гимнаста от времени в течение и после его выступления в вольных упражнениях. На горизонтальной оси отмечено время (в минутах), прошедшее с начала выступления гимнаста, на вертикальной оси – частота пульса (в ударах в минуту). */

        function convert(value) {
            return value * 20 + 40 + ' уд./мин.';
        }

        function answAboutMax(intervals, answ, values) {
            let max1 = findMaximums(func, 0, 4)[0][1];
            let max2 = findMaximums(func, 4, 8)[0][1];
            if ((max1 - max2).abs() > 0.5) {
                let maxIndex = findMaxInIntervals(intervals, values);
                let wasMax = intervals.map((_, i) => i === maxIndex);
                addUniqueAnsw(wasMax, answ, 'частота пульса достигла максимума за всё время выступления и после него');
            }
        }

        function answAboutNonLess(intervals, answ, value) {
            let wasNonLess = intervals.map(interval => isNotLess(interval, value));
            addUniqueAnsw(wasNonLess, answ, 'частота пульса была не ниже ' + convert(value));
        }

        function answAboutNonMore(intervals, answ, value) {
            let wasNonMore = intervals.map(interval => isNotMore(interval, value));
            addUniqueAnsw(wasNonMore, answ, 'частота пульса была не выше ' + convert(value));
        }

        function answAboutIncreasing(intervals, answ) {
            let wasIncreasing = intervals.map(interval => isIncreasing(interval));
            addUniqueAnsw(wasIncreasing, answ, 'частота пульса росла на всём интервале');
        }

        function answAboutDecreasing(intervals, answ) {
            let wasDecreasing = intervals.map(interval => isDecreasing(interval));
            addUniqueAnsw(wasDecreasing, answ, 'частота пульса падала на всём интервале');
        }

        function answAboutDecreasingDroppedBelow(intervals, answ, below) {
            let wasDecreasing = intervals.map(interval => !isIncreasing(interval) && interval.some(value => value < below));
            addUniqueAnsw(wasDecreasing, answ, 'частота пульса упала ниже ' + convert(below));
        }

        function answAboutDecreasingDroppedBelowN(intervals, answ, belowN) {
            let wasDecreasing = intervals.map(interval => !isIncreasing(interval) && interval.some(value => value === belowN) && interval.every(value => value >= belowN));
            addUniqueAnsw(wasDecreasing, answ, 'частота пульса упала до ' + convert(belowN));
        }

        function answAboutIncreasingNonLess(intervals, answ, more) {
            let wasCondition = intervals.map(interval => isIncreasing(interval) && isNotLess(interval, more));
            addUniqueAnsw(wasCondition, answ, 'частота пульса росла на всём интервале и была не ниже  ' + convert(more));
        }

        function answAboutMaxMinDelta(intervals, answ) {
            let deltaP = intervals.map(int => int[1] - int[0]);

            let maxEI = deltaP.maxE();
            let minED = deltaP.minE();

            let wasMaxRise = intervals.map((_, i) => deltaP[i] === maxEI);
            let wasMinFall = intervals.map((_, i) => deltaP[i] === minED);

            if (sl1()) {
                addUniqueAnsw(wasMaxRise, answ, ' наибольший рост частоты пульса');
            } else {
                addUniqueAnsw(wasMinFall, answ, 'наибольшее падение частоты пульса');
            }
        }

        function answAboutDecreasingAfterIncreasing(intervals, answ) {
            let wasCondition = intervals.map(int => isDecreasingAfterIsIncreasing(int));
            addUniqueAnsw(wasCondition, answ, 'частота пульса сначала падала, а затем росла');
        }

        function answAboutIncreasingAfterDecreasing(intervals, answ) {
            let wasCondition = intervals.map(int => isIncreasingAfterIsDecreasing(int));
            addUniqueAnsw(wasCondition, answ, 'частота пульса сначала росла, а затем падала');
        }

        let time = [0].zapMonot(9, 0, 1, 1); // шкала времени
        let value = [1, sl(3, 4)]; // шкала пульса

        let count = 0;

        for (; value.length < time.length - 1;) {
            let interI = sl(2, (time.length / 4).floor());
            for (let j = 0; j < interI; j++) {
                let currentValue = value[value.length - 1] + sl(0.1, 2, 0.1) * (-1).pow(count);
                while (!currentValue.mzhd(1, 5, true)) {
                    if (currentValue < 1) {
                        currentValue += 0.1;
                    }
                    if (currentValue > 5) {
                        currentValue -= 0.1;
                    }
                }
                value.push(currentValue);
            }
            count++;
        }

        value = value.slice(0, 8);
        value.push(sl(1, 2, 0.5));

        let spline = new Spline(time, value);
        let func = (x) => spline.at(x);

        let intervals = Array.from({
            length: 4
        }, (_, i) => {
            let start = i * 2;
            let end = i * 2 + 2;
            let step = 0.1;
            let points = Math.floor((end - start) / step) + 1;
            return Array.from({
                length: points
            }, (_, j) =>
                func(start + j * step)
            );
        });

        let listOfIntervals = Array.from({
            length: 4
        }, (_, i) => {
            let startTime = i * 2;
            let endTime = startTime + 2;
            return {
                expr: startTime + '-' + endTime + ' мин.',
                solution: [],
            };
        });

        let lessV = sl(1, 2);
        let moreV = sl(3, 4);
        let below = slKrome(lessV, 1, 2);

        answAboutMax(intervals, listOfIntervals, intervals.flat());
        answAboutNonMore(intervals, listOfIntervals, moreV);
        answAboutNonLess(intervals, listOfIntervals, lessV);
        answAboutIncreasing(intervals, listOfIntervals);
        answAboutDecreasing(intervals, listOfIntervals);
        answAboutIncreasingNonLess(intervals, listOfIntervals, lessV);
        answAboutMaxMinDelta(intervals, listOfIntervals);
        answAboutDecreasingAfterIncreasing(intervals, listOfIntervals);
        answAboutIncreasingAfterDecreasing(intervals, listOfIntervals);
        answAboutDecreasingDroppedBelow(intervals, listOfIntervals, below);
        answAboutDecreasingDroppedBelowN(intervals, listOfIntervals, below);

        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            ctx.drawGridWithArrows({
                gridWidth: 341,
                gridHeight: 320,
                cellWidth: 40,
                cellHeight: 40,
                stepX: 1,
                stepY: 20,
                maxX: 8,
                minY: 40,
                maxY: 140,
                stepByCeilX: 1,
                arrowLengthX: 7.5,
                arrowLengthY: 5.9,
            });

            ctx.translate(40, 40 * 6);
            ctx.scale(40, -40);
            ctx.lineWidth = 2 / 40;

            let step = 0.1;
            for (let i = 0; i < time.length - 1 - step; i += step) {
                ctx.drawLine(i, func(i), i + step, func(i + step));
            }
        };

        NAtask.setCorrespondenceTask({
            text: 'На графике изображена зависимость частоты пульса гимнаста от времени в течение и после его выступления в вольных упражнениях. На горизонтальной оси отмечено время (в минутах), прошедшее с начала выступления гимнаста, на вертикальной оси – частота пульса (в ударах в минуту).',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь графиком, поставьте в соответствие каждому интервалу времени характеристику пульса гимнаста на этом интервале.',
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
// https://mathb-ege.sdamgia.ru/problem?id=509719
