(function () {
    'use strict';
    retryWhileError(function () {
        /* На графике изображена зависимость скорости движения рейсового автобуса от времени. 
           На вертикальной оси отмечена скорость автобуса в км/ч, 
           на горизонтальной – время в минутах, прошедшее с начала движения автобуса. */

        
        function answAboutStop(intervals, answ) {
            let wasStop = intervals.map(interval => lengthOfZeroInterval(interval) > 1);
            let index = wasStop.indexOf(true);

            if (index !== -1 && hasNoDuplicateValue(wasStop, true)) {
                let text = 'автобус сделал остановку длительностью ' +
                    chislitlx(lengthOfZeroInterval(intervals[index]) - 1, 'минута');
                answ[index].solution.push(text);
            }
        }

        function answAboutMax(intervals, answ) {
            let maxIndex = findMaxInIntervals(intervals, value);
            let wasMax = intervals.map((_, i) => i === maxIndex);
            addUniqueAnsw(wasMax, answ, 'скорость автобуса достигла максимума за всё время движения');
        }

        function answAboutNonLess(intervals, answ, V) {
            let wasNonLess = intervals.map(interval => isNotLess(interval, V));
            addUniqueAnsw(wasNonLess, answ, 'скорость автобуса была не меньше ' + V * 20 + ' км/ч на всём интервале');
        }

        function answAboutNonMore(intervals, answ, V) {
            let wasNonMore = intervals.map(interval => isNotMore(interval, V));
            addUniqueAnsw(wasNonMore, answ, 'скорость автобуса была не больше ' + V * 20 + ' км/ч на всём интервале');
        }

        function answAboutNonIncreasing(intervals, answ) {
            let wasNonIncreasing = intervals.map(interval => isNonIncreasing(interval));
            addUniqueAnsw(wasNonIncreasing, answ, 'автобус не увеличивал скорость на всём интервале');
        }

        function answAboutNonDecreasing(intervals, answ) {
            let wasNonDecreasing = intervals.map(interval => isNonDecreasing(interval));
            addUniqueAnsw(wasNonDecreasing, answ, 'автобус не уменьшал скорость на всём интервале');
        }

        function answAboutConst(intervals, answ) {
            let wasConst = intervals.map(interval => lengthConst(interval) > 2);
            let index = wasConst.indexOf(true);

            if (index !== -1 && hasNoDuplicateValue(wasConst, true)) {
                let text = chislitlx(lengthConst(intervals[index]), 'минута') +
                    ' автобус двигался с постоянной ненулевой скоростью';
                answ[index].solution.push(text);
            }
        }

        // Генерация шкалы времени
        let time = [0].zapMonot(25, 0, 1, 1);
        let value = [0];

        while (value.length < time.length) {
            let interI = sl(2, (time.length / sl(3, 4)).floor());
            for (let j = 0; j < interI; j++) {
                if (value.length + 1 === time.length) {
                    value.push(0);
                    break;
                }
                value.push([sl(1, 5), value[value.length - 1]][Number(sl1() && value[value.length - 1] !== 0)]);
            }

            let interD = sl(2, 3);
            for (let j = 0; j < interD; j++) {
                if (value.length < time.length) {
                    value.push(0);
                }
            }
        }
        value = value.slice(0, 25);

        let beginTime = sl(0, 4);

        let intervals = Array.from({ length: 4 }, (_, i) =>
            value.slice(beginTime + i * 4, beginTime + i * 4 + 5));

        let listOfIntervals = Array.from({ length: 4 }, (_, i) => {
            let startTime = beginTime + i * 4;
            let endTime = startTime + 4;
            return {
                expr: startTime + '-' + endTime + ' мин.',
                solution: [],
            };
        });

        let lessV = sl(1, 2);
        let moreV = sl(3, 4);

        answAboutStop(intervals, listOfIntervals);
        answAboutNonLess(intervals, listOfIntervals, lessV);
        answAboutNonMore(intervals, listOfIntervals, moreV);
        answAboutNonIncreasing(intervals, listOfIntervals);
        answAboutNonDecreasing(intervals, listOfIntervals);
        answAboutMax(intervals, listOfIntervals);
        answAboutConst(intervals, listOfIntervals);

        // Убираем дубликаты в решениях
        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        // Отрисовка графика
        let paint1 = function (ctx) {
            ctx.drawGridWithArrows({
                gridWidth: 751,
                gridHeight: 240,
                cellWidth: 30,
                cellHeight: 30,
                stepX: 1,
                stepY: 20,
                maxX: 25,
                maxY: 100,
                stepByCeilX: 2,
                arrowLengthX: 24.5,
                arrowLengthY: 5.8,
            });

            ctx.translate(30, 30 * 6);
            ctx.scale(30, -30);
            ctx.lineWidth = 2 / 30;

            for (let i = 0; i < time.length - 1; i++) {
                ctx.drawLine(time[i], value[i], time[i + 1], value[i + 1]);
            }
        };

        NAtask.setCorrespondenceTask({
            text: 'На графике изображена зависимость скорости движения рейсового автобуса от времени. ' +
                'На вертикальной оси отмечена скорость автобуса в км/ч, ' +
                'на горизонтальной – время в минутах, ' +
                'прошедшее с начала движения автобуса.',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь графиком, поставьте в соответствие каждому интервалу времени характеристику движения автобуса на этом интервале.',
            analys: listView.join(' <br/>'),
        });
        NAtask.modifiers.allDecimalsToStandard();
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 400,
            paint: paint1,
        });
    }, 100);
})();
// https://ege314.ru/14-analiz-grafikov-i-diagramm/reshenie-3357/
