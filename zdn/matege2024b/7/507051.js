(function () {
    'use strict';
    retryWhileError(function () {
        /* На графике изображена зависимость крутящего момента двигателя от числа оборотов в минуту. На горизонтальной оси отмечено число оборотов в минуту, на вертикальной оси – крутящий момент в Н⋅м. */

        function convert(value) {
            return value * 20 + ' Н$\\cdot$м';
        }

        function answAboutNonLess(intervals, answ, value) {
            let wasNonLess = intervals.map(interval => isNotLess(interval, value));
            addUniqueAnsw(wasNonLess, answ, 'крутящий момент был не ниже ' + convert(value) + ' на всём интервале');
        }

        function answAboutNonMore(intervals, answ, value) {
            let wasNonMore = intervals.map(interval => isNotMore(interval, value));
            addUniqueAnsw(wasNonMore, answ, 'крутящий момент не превышает ' + convert(value) + ' на всём интервале');
        }

        function answAboutIncreasing(intervals, answ) {
            let wasIncreasing = intervals.map(interval => isIncreasing(interval));
            addUniqueAnsw(wasIncreasing, answ, 'при увеличении числа оборотов крутящий момент растёт');
        }

        function answAboutDecreasing(intervals, answ) {
            let wasDecreasing = intervals.map(interval => isDecreasing(interval));
            addUniqueAnsw(wasDecreasing, answ, 'при увеличении числа оборотов крутящий момент падает');
        }

        function answAboutIncreasingNonMore(intervals, answ, more) {
            let wasCondition = intervals.map(interval => isIncreasing(interval) && isNotMore(interval, more));
            addUniqueAnsw(wasCondition, answ, 'при увеличении числа оборотов крутящий момент растёт, но не превышает ' +
                convert(more));
        }

        function answAboutDecreasingNonMore(intervals, answ, more) {
            let wasCondition = intervals.map(interval => isDecreasing(interval) && isNotMore(interval, more));
            addUniqueAnsw(wasCondition, answ, 'при увеличении числа оборотов крутящий момент падает, но не превышает ' +
                convert(more));
        }

        function answAboutIncreasingNonLess(intervals, answ, less) {
            let wasCondition = intervals.map(interval => isIncreasing(interval) && isNotLess(interval, less));
            addUniqueAnsw(wasCondition, answ, 'при увеличении числа оборотов крутящий момент растёт, но остаётся больше ' +
                convert(less));
        }

        function answAboutDecreasingNonLess(intervals, answ, less) {
            let wasCondition = intervals.map(interval => isDecreasing(interval) && isNotLess(interval, less));
            addUniqueAnsw(wasCondition, answ, 'при увеличении числа оборотов крутящий момент падает, но остаётся больше ' +
                convert(less));
        }

        function answAboutMaxMinDelta(intervals, answ) {
            let deltaP = intervals.map(int => int[int.length - 1] - int[0]);

            let maxEI = deltaP.maxE();
            let minED = deltaP.minE();

            let wasMaxRise = intervals.map((_, i) => deltaP[i] === maxEI);
            let wasMinFall = intervals.map((_, i) => deltaP[i] === minED);

            if (sl1()) {
                addUniqueAnsw(wasMaxRise, answ, 'при увеличении числа оборотов самый быстрый рост крутящего момента');
            } else {
                addUniqueAnsw(wasMinFall, answ, 'при увеличении числа оборотов самое быстрое падение крутящего момента');
            }
        }

        function answAboutConst(intervals, answ) {
            let wasConst = intervals.map(interval => interval[0] === interval[interval.length - 1]);
            addUniqueAnsw(wasConst, answ, ['крутящий момент не меняется на всём интервале',
                'при увеличении числа оборотов крутящий момент не меняется'
            ].iz());
        }

        let time = [0].zapMonot(13, 0, 1, 1); // шкала оборотов
        let value = [0, sl(0.3, 0.5, 0.1), sl(0.5, 1, 0.1)]; // шкала крутящего момента

        let count = 0;
        let indexConst = null;
        let add = null;

        for (; value.length < time.length - 1;) {
            let interI = sl(2, (time.length / 2).floor());
            for (let j = 0; j < interI; j++) {
                let currentValue = value[value.length - 1] + sl(1, 1.5, 0.1) * (-1).pow(count);
                while (!currentValue.mzhd(1, 7, true)) {
                    if (currentValue < 1) {
                        currentValue += 0.1;
                    }
                    if (currentValue > 5) {
                        currentValue -= 0.1;
                    }
                }
                value.push(currentValue);
            }
            if (count == 0) {
                indexConst = value.length - 1;
                add = sl(2, 4);
                let constArr = Array(add).fill(value[indexConst]);
                value.push(...constArr);
            }
            count++;
        }

        value = value.slice(0, 13);
        value.push(sl(1, 2, 0.5));

        let spline = new Spline(time, value);
        let func = (x) => spline.at(x);

        let rangeIntervals = [];
        for (let i = 0; i < 3; i++)
            rangeIntervals.push(sl(1, 4));
        rangeIntervals.push(12 - rangeIntervals.sum());

        let intervals = Array.from({
            length: 4
        }, (_, i) => {
            let start = rangeIntervals.slice(0, i).sum();
            let end = start + rangeIntervals[i];
            let step = 0.1;
            let points = Math.floor((end - start) / step) + 1;

            return Array.from({
                length: points
            }, (_, j) => {
                let currentTime = start + j * step;
                let valueIndex = time.findIndex(t => t >= currentTime) - 1;
                if (valueIndex >= indexConst && valueIndex < indexConst + add) {
                    return value[valueIndex];
                } else {
                    return func(currentTime);
                }
            });
        });

        let valuesView = intervals.map((intervalArray, i) => {
            if (i === 0) {
                return [...intervalArray];
            } else {
                return intervalArray.slice(1);
            }
        }).flat();

        let listOfIntervals = Array.from({
            length: 4
        }, (_, i) => {
            let startTime = rangeIntervals.slice(0, i).sum();
            let endTime = startTime + rangeIntervals[i];
            return {
                expr: startTime * 500 + '-' + endTime * 500 + ' об./мин.',
                solution: [],
            };
        });

        let [less1, less2, less3] = arrayOfUniqueValues(length, 1, 3);
        let [more1, more2, more3] = arrayOfUniqueValues(length, 4, 6);

        answAboutNonMore(intervals, listOfIntervals, more1);
        answAboutNonLess(intervals, listOfIntervals, less1);
        answAboutIncreasing(intervals, listOfIntervals);
        answAboutDecreasing(intervals, listOfIntervals);
        answAboutMaxMinDelta(intervals, listOfIntervals);
        answAboutIncreasingNonMore(intervals, listOfIntervals, more2);
        answAboutDecreasingNonMore(intervals, listOfIntervals, more3);
        answAboutConst(intervals, listOfIntervals);
        answAboutIncreasingNonLess(intervals, listOfIntervals, less2);
        answAboutDecreasingNonLess(intervals, listOfIntervals, less3);

        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            ctx.drawGridWithArrows({
                gridWidth: 500,
                gridHeight: 400,
                cellWidth: 40,
                cellHeight: 40,
                stepX: 500,
                stepY: 20,
                maxX: 6000,
                minY: 0,
                maxY: 140,
                stepByCeilX: 2,
                arrowLengthX: 11.5,
                arrowLengthY: 7.9,
            });

            ctx.translate(40, 40 * 8);
            ctx.scale(40, -40);
            ctx.lineWidth = 2 / 40;

            for (let i = 0; i < valuesView.length - 1; i++) {
                ctx.drawLine(i * 0.1, valuesView[i], (i + 1) * 0.1, valuesView[i + 1]);
            }
        };

        NAtask.setCorrespondenceTask({
            text: 'На графике изображена зависимость крутящего момента двигателя от числа оборотов в минуту. На горизонтальной оси отмечено число оборотов в минуту, на вертикальной оси – крутящий момент в Н$\\cdot$м.',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь графиком, поставьте в соответствие каждому интервалу числа оборотов в минуту характеристику крутящего момента на этом интервале.',
            analys: listView.join('<br/>')
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 400,
            paint: paint1,
        });
    }, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=507051
