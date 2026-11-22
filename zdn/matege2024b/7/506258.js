(function () {
    'use strict';
    retryWhileError(function () {
        /* На графике изображена зависимость температуры от времени в процессе разогрева двигателя легкового автомобиля. На горизонтальной оси отмечено время в минутах, прошедшее с момента запуска двигателя, на вертикальной оси – температура двигателя в градусах Цельсия. */

        let degreesPerUnit = 10; // цена одной клетки по вертикали, °C
        let maxUnits = 8; // высота сетки по вертикали, в клетках

        function convert(value) {
            return value * degreesPerUnit + '${}^{\\circ} C$';
        }

        function answAboutNonLess(intervals, answ, value) {
            let wasNonLess = intervals.map(interval => isNotLess(interval, value));
            addUniqueAnsw(wasNonLess, answ, 'температура была не ниже ' + convert(value) + ' на всём интервале');
        }

        function answAboutNonMore(intervals, answ, value) {
            let wasNonMore = intervals.map(interval => isNotMore(interval, value));
            addUniqueAnsw(wasNonMore, answ, 'температура не превышала ' + convert(value) + ' на всём интервале');
        }

        function answAboutMore(intervals, answ, value) {
            let wasMore = intervals.map(interval => isMore(interval, value));
            addUniqueAnsw(wasMore, answ, 'температура была выше ' + convert(value) + ' на всём интервале');
        }

        function answAboutLess(intervals, answ, value) {
            let wasLess = intervals.map(interval => isLess(interval, value));
            addUniqueAnsw(wasLess, answ, 'температура была ниже ' + convert(value) + ' на всём интервале');
        }

        function answAboutIncreasing(intervals, answ) {
            let wasIncreasing = intervals.map(interval => isIncreasing(interval));
            addUniqueAnsw(wasIncreasing, answ, 'температура росла');
        }

        function answAboutIncreasingDeltaLess(intervals, answ) {
            let wasIncreasing = intervals.map(interval => isIncreasing(interval));

            if (hasNoDuplicateValue(wasIncreasing, true)) {
                let index = wasIncreasing.indexOf(true);
                let interval = intervals[index];
                let upperBound = (interval.at(-1) - interval[0] + 0.1).ceil();
                answ[index].solution.push('температура росла, и её прирост составил менее ' + convert(upperBound));
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
            let wasCondition = intervals.map(interval => isIncreasing(interval) && math.equal(interval.at(-1), less));
            addUniqueAnsw(wasCondition, answ, 'температура росла и на этом интервале достигла ' + convert(less));
        }

        function answAboutMaxMinDelta(intervals, answ) {
            let deltaP = intervals.map(int => (int[int.length - 1] - int[0]) / (int.length - 1));
            let riseDelta = deltaP.filter((_, i) => isIncreasing(intervals[i]));
            let fallDelta = deltaP.filter((_, i) => isDecreasing(intervals[i]));

            let maxEI = riseDelta.maxE();
            let minEI = riseDelta.minE();
            let maxED = fallDelta.maxE();
            let minED = fallDelta.minE();

            let wasMaxRise = intervals.map((interval, i) => isIncreasing(interval) && math.equal(deltaP[i], maxEI));
            let wasMinRise = intervals.map((interval, i) => isIncreasing(interval) && math.equal(deltaP[i], minEI));
            let wasMaxFall = intervals.map((interval, i) => isDecreasing(interval) && math.equal(deltaP[i], maxED));
            let wasMinFall = intervals.map((interval, i) => isDecreasing(interval) && math.equal(deltaP[i], minED));

            if (sl1()) {
                addUniqueAnsw(wasMaxRise, answ, 'самый быстрый рост температуры');
            } else {
                addUniqueAnsw(wasMinRise, answ, 'самый медленный рост температуры');
            }

            if (sl1()) {
                addUniqueAnsw(wasMinFall, answ, 'самое быстрое падение температуры');
            } else {
                addUniqueAnsw(wasMaxFall, answ, 'самое медленное падение температуры');
            }
        }

        function answAboutRange(intervals, answ, lower, upper) {
            let wasCondition = intervals.map(interval => isNotLess(interval, lower) && isNotMore(interval, upper));
            addUniqueAnsw(wasCondition, answ, 'температура находилась в пределах от ' + convert(lower) + ' до ' + convert(upper));
        }

        let duration = 10;
        let time = [0].zapMonot(duration + 1, 0, 1, 1);
        let values = [sl(0, 1, 0.1), sl(2, 3, 0.1)];
        let peakTime = sl(4, 7);
        for (let minute = values.length; minute <= duration; minute++) {
            let delta = minute <= peakTime ? sl(0.5, 1, 0.1) : -sl(0.1, 0.8, 0.1);
            let currentValue = values.at(-1) + delta;
            genAssert(currentValue.mzhd(1, maxUnits, true), 'График вышел за пределы сетки');
            values.push(currentValue);
        }

        let splineI = new Spline(time.slice(0, peakTime + 1), values.slice(0, peakTime + 1));
        let splineD = new Spline(time.slice(peakTime), values.slice(peakTime));
        let temperatureAt = minute => (minute <= peakTime ? splineI : splineD).at(minute);
        let samplesPerMinute = 10;
        let temperatures = Array.from({length: duration * samplesPerMinute + 1}, (_, i) => temperatureAt(i / samplesPerMinute));

        let rangeIntervals = [];
        for (let i = 0; i < 3; i++)
            rangeIntervals.push(sl(1, 3));
        rangeIntervals.push(duration - rangeIntervals.sum());

        let boundaries = [0];
        rangeIntervals.forEach(d => boundaries.push(boundaries.at(-1) + d));

        let intervals = Array.from({
            length: 4
        }, (_, i) => temperatures.slice(boundaries[i] * samplesPerMinute, boundaries[i + 1] * samplesPerMinute + 1));

        let listOfIntervals = Array.from({
            length: 4
        }, (_, i) => ({
            expr: boundaries[i] + '-' + boundaries[i + 1] + ' мин.',
            solution: [],
        }));

        let [less1, less2, lower] = arrayOfUniqueValues(3, 1, 4);
        let [more1, more2, upper] = arrayOfUniqueValues(3, 4, 7);

        answAboutIncreasing(intervals, listOfIntervals);
        answAboutDecreasing(intervals, listOfIntervals);
        answAboutMaxMinDelta(intervals, listOfIntervals);

        if (sl1())
            answAboutLess(intervals, listOfIntervals, lower);
        else
            answAboutNonMore(intervals, listOfIntervals, more1);

        if (sl1())
            answAboutMore(intervals, listOfIntervals, upper);
        else
            answAboutNonLess(intervals, listOfIntervals, less1);

        answAboutIncreasingMore(intervals, listOfIntervals, more2);
        answAboutIncreasingWasN(intervals, listOfIntervals, less2);
        answAboutRange(intervals, listOfIntervals, lower, upper);
        answAboutIncreasingDeltaLess(intervals, listOfIntervals);

        listOfIntervals.forEach(item => genAssertNonempty(item.solution));
        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            let cell = 40; // размер клетки сетки, px
            let gridHeight = 440; // высота сетки, px
            ctx.translate(0, 60);
            ctx.drawGridWithArrows({
                gridWidth: 420,
                gridHeight: gridHeight,
                cellWidth: cell,
                cellHeight: cell,
                stepX: 1,
                stepY: degreesPerUnit,
                maxX: duration,
                minY: 0,
                maxY: maxUnits * degreesPerUnit,
                stepByCeilX: 1,
                arrowLengthX: 9.5,
                arrowLengthY: 8.9,
            });

            ctx.translate(cell, gridHeight - 2 * cell); // начало координат сетки, как в drawGridWithArrows
            ctx.scale(cell, -cell);
            ctx.lineWidth = 2 / cell;

            graph9AdrawFunction(ctx, temperatureAt, {minX: 1 / samplesPerMinute, maxX: duration, step: 1 / samplesPerMinute});
        };

        NAtask.setCorrespondenceTask({
            text: 'На графике изображена зависимость температуры от времени в процессе разогрева двигателя легкового автомобиля. На горизонтальной оси отмечено время в минутах, прошедшее с момента запуска двигателя, на вертикальной оси – температура двигателя в градусах Цельсия.',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь графиком, поставьте в соответствие каждому интервалу времени характеристику температуры на этом интервале.',
            analys: listView.join('<br/>'),
        });
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 460,
            paint: paint1,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=506258
