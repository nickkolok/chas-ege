(function () {
    'use strict';
    retryWhileError(function () {
        /* На графике изображена зависимость температуры от времени в процессе разогрева двигателя легкового автомобиля. На горизонтальной оси отмечено время в минутах, прошедшее с момента запуска двигателя, на вертикальной оси – температура двигателя в градусах Цельсия. */

        function convert(value) {
            return value * 10 + '${}^{\\circ} C$';
        }

        function answAboutNonLess(intervals, answ, value) {
            let wasNonLess = intervals.map(interval => isNotLess(interval, value));
            addUniqueAnsw(wasNonLess, answ, 'температура была не ниже ' + convert(value) + ' на всём интервале');
        }

        function answAboutNonMore(intervals, answ, value) {
            let wasNonMore = intervals.map(interval => isNotMore(interval, value));
            addUniqueAnsw(wasNonMore, answ, 'температура не превышала ' + convert(value));
        }

        function answAboutMore(intervals, answ, value) {
            let wasNonMore = intervals.map(interval => isMore(interval, value));
            addUniqueAnsw(wasNonMore, answ, 'температура была выше ' + convert(value) + ' на всём интервале');
        }

        function answAboutLess(intervals, answ, value) {
            let wasNonMore = intervals.map(interval => isMore(interval, value));
            addUniqueAnsw(wasNonMore, answ, 'температура была ниже ' + convert(value) + ' на всём интервале');
        }

        function answAboutIncreasing(intervals, answ) {
            let wasIncreasing = intervals.map(interval => isIncreasing(interval));
            addUniqueAnsw(wasIncreasing, answ, 'температура росла');
        }

        function answAboutIncreasingDeltaLess(intervals, answ) {
            let wasIncreasing = intervals.map(interval => isIncreasing(interval));

            let index = wasIncreasing.indexOf(true);
            let delta = intervals.map(interval => interval.maxE() - interval.minE() + 0.1);
            let text = intervals.map((interval, i) => 'температура росла, и её прирост составил менее ' + convert(delta[i].ceil()));

            if (hasNoDuplicateValue(wasIncreasing, true) && delta[index].ceil() > 0) {
                answ[index].solution.push(text[index]);
            }
        }

        function answAboutDecreasing(intervals, answ) {
            let wasDecreasing = intervals.map(interval => isDecreasing(interval));
            addUniqueAnsw(wasDecreasing, answ, 'температура ' + ['падала', 'уменьшалась'].iz());
        }

        function answAboutIncreasingMore(intervals, answ, more) {
            let wasCondition = intervals.map(interval => isIncreasing(interval) && isMore(interval, more));
            addUniqueAnsw(wasCondition, answ, 'температура росла и на всём интервале была выше ' + convert(more));
        }

        function answAboutIncreasingWasN(intervals, answ, less) {
            let wasCondition = intervals.map(interval => isIncreasing(interval) && interval.some(int => int == less) &&
                interval.every(int => int <= less));
            addUniqueAnsw(wasCondition, answ, 'температура росла и на этом интервале достигла ' + convert(less));
        }

        function answAboutMaxMinDelta(intervals, answ) {
            let deltaP = intervals.map(int => int[int.length - 1] - int[0]);

            let maxEI = deltaP.maxE();
            let minEI = deltaP.minE();
            let maxED = deltaP.maxE();
            let minED = deltaP.minE();

            let wasMaxRise = intervals.map((_, i) => deltaP[i] === maxEI);
            let wasMinRise = intervals.map((_, i) => deltaP[i] === minEI);
            let wasMaxFall = intervals.map((_, i) => deltaP[i] === maxED);
            let wasMinFall = intervals.map((_, i) => deltaP[i] === minED);

            if (sl1()) {
                addUniqueAnsw(wasMaxRise, answ, 'самый быстрый рост температуры');
            } else {
                addUniqueAnsw(wasMinRise, answ, 'самый медленный рост температуры');
            }

            if (sl1()) {
                addUniqueAnsw(wasMaxFall, answ, 'самое быстрое падение температуры');
            } else {
                addUniqueAnsw(wasMinFall, answ, 'самое медленное падение температуры');
            }
        }

        function answAboutMoreButLess(intervals, answ, more, less) {
            let wasCondition = intervals.map(interval => isLess(interval, less) && isMore(interval, more));
            addUniqueAnsw(wasCondition, answ, 'температура находилась в пределах от ' + convert(more) + ' до ' + convert(
                less));
        }

        let time = [0].zapMonot(10, 0, 1, 1); // шкала времени
        let value = [sl(0, 1, 0.1), sl(2, 3, 0.1)]; // шкала температуры
        let count = 0;

        let extrindex = sl(5, 8);

        for (; value.length != time.length;) {
            let currentValue = value[value.length - 1] + [sl(0.5, 1, 0.1), -sl(0.1, 0.8, 0.1)][count];
            genAssert(currentValue.mzhd(1, 8, true), 'График вышел за пределы сетки');
            value.push(currentValue);
            if (value.length == extrindex)
                count++;
        }

        let splineI = new Spline(time.slice(0, extrindex), value.slice(0, extrindex));
        let funcI = (x) => splineI.at(x);

        let splineD = new Spline(time.slice(extrindex - 1, 10), value.slice(extrindex - 1, 10));
        let funcD = (x) => splineD.at(x);

        let rangeIntervals = [];
        for (let i = 0; i < 3; i++)
            rangeIntervals.push(sl(1, 3));
        rangeIntervals.push(10 - rangeIntervals.sum());

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
                if (currentTime <= extrindex) {
                    return funcI(currentTime);
                } else {
                    return funcD(currentTime);
                }
            });
        });

        let listOfIntervals = Array.from({
            length: 4
        }, (_, i) => {
            let startTime = rangeIntervals.slice(0, i).sum();
            let endTime = startTime + rangeIntervals[i];
            return {
                expr: startTime + '-' + endTime + ' мин.',
                solution: [],
            };
        });

        let [less1, less2, less3, less4] = arrayOfUniqueValues(4, 1, 4);
        let [more1, more2, more3, more4] = arrayOfUniqueValues(4, 4, 7);

        answAboutIncreasing(intervals, listOfIntervals);
        answAboutDecreasing(intervals, listOfIntervals);
        answAboutMaxMinDelta(intervals, listOfIntervals);

        if (sl1())
            answAboutLess(intervals, listOfIntervals, less4);
        else
            answAboutNonMore(intervals, listOfIntervals, more1);

        if (sl1())
            answAboutMore(intervals, listOfIntervals, more4);
        else
            answAboutNonLess(intervals, listOfIntervals, less1);


        answAboutIncreasingMore(intervals, listOfIntervals, more2);
        answAboutIncreasingWasN(intervals, listOfIntervals, less2);
        answAboutMoreButLess(intervals, listOfIntervals, more4, less4);
        answAboutIncreasingDeltaLess(intervals, listOfIntervals);

        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            ctx.drawGridWithArrows({
                gridWidth: 420,
                gridHeight: 440,
                cellWidth: 40,
                cellHeight: 40,
                stepX: 1,
                stepY: 10,
                maxX: 10,
                minY: 0,
                maxY: 80,
                stepByCeilX: 1,
                arrowLengthX: 9.5,
                arrowLengthY: 8.9,
            });

            ctx.translate(40, 40 * 9);
            ctx.scale(40, -40);
            ctx.lineWidth = 2 / 40;

            let step = 0.1;
            for (let i = 0; i < extrindex - 1 - step * 0.5; i += step) {
                ctx.drawLine(i, funcI(i), i + step, funcI(i + step));
            }

            for (let i = extrindex - 1; i < 10 - step; i += step) {
                ctx.drawLine(i, funcD(i), i + step, funcD(i + step));
            }
        };

        NAtask.setCorrespondenceTask({
            text: 'На графике изображена зависимость температуры от времени в процессе разогрева двигателя легкового автомобиля. На горизонтальной оси отмечено время в минутах, прошедшее с момента запуска двигателя, на вертикальной оси – температура двигателя в градусах Цельсия.',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь графиком, поставьте в соответствие каждому интервалу времени характеристику температуры на этом интервале.',
            analys:listView.join('<br/>')
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 400,
            paint: paint1,
        });
    }, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=506258
