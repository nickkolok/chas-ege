(function () {
    'use strict';
    retryWhileError(function () { /* На рисунке точками показан прирост населения Китая в период с 2004 по 2013 год. По горизонтали указывается год, по вертикали –прирост населения в процентах (увеличение численности населения относительно прошлого года). Для наглядности точки соединены линией */

        function convert(value) {
            return 0.47 + value * 0.02 + '%';
        }

        function answAbouMin(intervals, answ) {
            let minV = values.minE();
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
                answ[minIndex].solution.push('прирост населения достиг минимума');
        }

        function answAbouMax(intervals, answ) {
            let maxV = values.maxE();
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
                answ[maxIndex].solution.push('прирост населения достиг максимума');
        }

        function isMore(interval, values) {
            return (interval.filter((int) => int > values)).length == interval.length;
        }

        function isLess(interval, values) {
            return interval.filter((int) => int < values).length == interval.length;
        }

        function answAbouMoreButLess(interval, answ, more, less) {
            if (isLess(interval, less) && isMore(interval, more)) {
                answ.push('прирост населения находился в пределах от ' + convert(more) + ' до ' + convert(less));
            }
        }

        function answAbouMore(interval, answ, more) {
            if (isMore(interval, more)) {
                answ.push('прирост населения оставался выше ' + convert(more));
            }
        }

        function answAbouLess(interval, answ, less) {
            if (isLess(interval, less)) {
                answ.push('прирост населения оставался ниже ' + convert(less));
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
                answ.push('прирост населения увеличивался');
            }
        }

        function answAboutDecreasing(interval, answ) {
            if (isDecreasing(interval)) {
                answ.push('прирост населения уменьшался');
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

            if (length(decr, maxED))
                answ[maxD].solution.push('наибольшее падение прироста населения за один год');
        }

        function wasConstV(interval) {
            let length = 0;
            for (let j = 1; j < interval.length; j++) {
                if (interval[j] === interval[j - 1] && interval[j - 1] !== 0) {
                    length++;
                }
            }

            return length > 0;
        }

        function answAboutDecreasingAndWasConst(interval, answ) {
            if (isDecreasing(interval) && wasConstV(interval)) {
                answ.push('падение прироста остановилось');
            }
        }

        let time = [0].zapMonot(10, 0, 1, 1); // шкала времени
        let values = [sl(4, 7)]; // шкала прироста
        let count = 1;

        for (; values.length <= time.length;) {
            let interI = ((time.length / 1.2).floor());
            for (let j = 0; j < interI; j++) {
                let lastProduction = values[values.length - 1];
                let newProduction = lastProduction + ([1, 1, 1, 0].iz() ? (sl(0.5, 1, 0.5) * (-1).pow(count % 2)) : 0);
                if (newProduction >= 1 && newProduction <= 7)
                    values.push(newProduction);
            }
            count++;
        }
        values = values.slice(0, time.length)

        let beginYear = sl1();

        let intervals = Array.from({
            length: 4
        }, (_, i) =>
            values.slice(i * 2 + beginYear, i * 2 + 3 + beginYear));

        console.log(values);
        console.log(intervals);


        let listOfIntervals = intervals.map((interval, i) => {
            return {
                expr: `${2004 + i * 2 + beginYear}-${2004 + i * 2 + 2 + beginYear}`,
                solution: []
            };
        });

        let aAboutIncrOrDecr = sl1();

        let less1 = sl(2, 4);
        let more1 = slKrome(less1, 3, 6);

        let less2 = slKrome([less1, more1], 2, 4);
        let more2 = slKrome([less1, more1, less2], 3, 6);

        function addAllAnswers(intervals, listOfIntervals) {
            intervals.forEach((interval, i) => {
                const solution = listOfIntervals[i].solution;
                if (aAboutIncrOrDecr) {
                    // добавляем ответ про повышение прироста
                    answAboutIncreasing(interval, solution);
                    answAbouMore(interval, solution, more1);

                } else {
                    // добавляем ответ про понижение прироста
                    answAbouLess(interval, solution, less1);
                    answAboutDecreasing(interval, solution);
                }
                answAboutDecreasingAndWasConst(interval, solution);
                answAbouMoreButLess(interval, solution, more2, less2);
            });
        }

        // добавляем ответ про минимальный показатель
        answAbouMin(intervals, listOfIntervals);
        answAbouMax(intervals, listOfIntervals);
        if (aAboutIncrOrDecr)
            answAbouMaxDeltaD(intervals, listOfIntervals);
        addAllAnswers(intervals, listOfIntervals);

        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            ctx.drawGridWithArrows({
                gridWidth: 570,
                gridHeight: 340,
                cellWidth: 60,
                cellHeight: 20,
                stepX: 1,
                stepY: 0.01,
                minX: 2004,
                maxX: 2013,
                minY: 0.47,
                maxY: 0.62,
                stepByCeilY: 2,
                arrowLengthX: 8.5,
                arrowLengthY: 14.8,
            });

            ctx.translate(60, 20 * 15);
            ctx.scale(60, -40);
            ctx.lineWidth = 2 / 40;

            for (let i = 0; i < time.length; i++) {
                ctx.drawFilledCircle(time[i], values[i], 3 / 40);
                if (i < time.length - 1)
                    ctx.drawLine(time[i], values[i], time[i + 1], values[i + 1]);
            }
        };

        NAtask.setCorrespondenceTask({
            text: 'На рисунке точками показан прирост населения Китая в период с 2004 по 2013 год. По горизонтали указывается год, по вертикали – прирост населения в процентах (увеличение численности населения относительно прошлого года). Для наглядности точки соединены линией',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь рисунком, поставьте в соответствие каждому из указанных периодов времени характеристику прироста населения Китая в этот период.<br/><br/> ВРЕМЕННЫЕ ОТВЕТЫ <br/>' +
                listView.join('<br/>'),
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 600,
            paint: paint1,
        });
    }, 500);
})();
// https://mathb-ege.sdamgia.ru/problem?id=509659
