(function () {
    'use strict';
    retryWhileError(function () {
        /* На графике изображена зависимость скорости погружения батискафа от времени. На вертикальной оси отмечена скорость в м/с, на горизонтальной – время в секундах, прошедшее с начала погружения. */

        function answAboutStop(intervals, answ, variable) {
            let wasStop = intervals.map(interval => lengthOfZeroInterval(interval) > 1);
            let index = wasStop.indexOf(true);
            let stopTexts = [
                'батискаф остановился ровно на ' + chislitlx((lengthOfZeroInterval(intervals[index]) - 1) * 15, 'секунда', 'value'),
                'батискаф ровно ' + chislitlx((lengthOfZeroInterval(intervals[index]) - 1) * 15, 'секунда', 'value') + ' оставался на одной глубине',
                'в течение ' + chislitlx((lengthOfZeroInterval(intervals[index]) - 1) * 15, 'секунда', 'value') + ' подряд батискаф оставался на одной глубине'
            ];
            if (hasNoDuplicateValue(wasStop, true)) {
                answ[index].solution.push(stopTexts[variable]);
            }
        }

        function answAboutMax(intervals, answ) {
            let maxIndex = findMaxInIntervals(intervals, value);
            let wasMax = intervals.map((_, i) => i === maxIndex);
            addUniqueAnsw(wasMax, answ, 'скорость погружения впервые достигла максимума за всё время погружения');
        }

        function answAboutNonMore(intervals, answ, V) {
            let wasNonMore = intervals.map(interval => isNotMore(interval, V));
            addUniqueAnsw(wasNonMore, answ, 'скорость погружения не больше ' + V * 0.1 + ' м/с на всём интервале');
        }

        function answAboutNonLess(intervals, answ, V) {
            let wasNonLess = intervals.map(interval => isNotLess(interval, V));
            addUniqueAnsw(wasNonLess, answ, 'скорость погружения не меньше ' + V * 0.1 + ' м/с на всём интервале');
        }

        function answAboutIncreasing(intervals, answ) {
            let wasIncreasing = intervals.map(interval => isIncreasing(interval));
            addUniqueAnsw(wasIncreasing, answ, 'скорость погружения постоянно росла');
        }

        function answAboutDecreasing(intervals, answ) {
            let wasDecreasing = intervals.map(interval => isDecreasing(interval));
            addUniqueAnsw(wasDecreasing, answ, 'скорость погружения постоянно падала');
        }

        function answAboutNonDecreasingAndWasConst(intervals, answ) {
            let wasCondition = intervals.map(interval => isNonIncreasing(interval) && wasConst(interval));
            addUniqueAnsw(wasCondition, answ, 'скорость погружения не увеличивалась на всём интервале, но батискаф не останавливался');
        }

        function answAboutNonIncreasing(intervals, answ, variable) {
            let wasNonIncreasing = intervals.map(interval => isNonIncreasing(interval));
            let nonIncreasingTexts = [
                'скорость погружения не ' + ['увеличивалась', 'росла'].iz() + ' на всём интервале',
                'погружение производилось без ускорения на всём интервале'
            ];
            addUniqueAnsw(wasNonIncreasing, answ, nonIncreasingTexts[variable]);
        }

        function answAboutNonDecreasing(intervals, answ, variable) {
            let wasNonDecreasing = intervals.map(interval => isNonDecreasing(interval));
            let nonDecreasingTexts = [
                'скорость погружения не уменьшалась на всём интервале',
                'погружение производилось без замедления на всём интервале'
            ];
            addUniqueAnsw(wasNonDecreasing, answ, nonDecreasingTexts[variable]);
        }

        function answAboutDecreasingAfterZero(intervals, answ) {
            let wasCondition = intervals.map(interval => isDecreasingAfterZero(interval));
            let length = intervals.map(interval => (lengthOfZeroInterval(interval) - 1) * 15);
            let secTexts = intervals.map((_, i) => {
                let sec = chislitlx(length[i], 'секунда', 'value');
                if (length[i] == 4) sec = 'минуту';
                if (length[i] == 2 && sl1()) sec = 'полминуты';
                return sec;
            });

            wasCondition.forEach((condition, i) => {
                if (condition) {
                    let text = 'скорость погружения уменьшалась, а затем произошла остановка на ' + secTexts[i];
                    if (hasNoDuplicateValue(wasCondition, true) || wasCondition.filter(c => c).length === 1) {
                        answ[i].solution.push(text);
                    }
                }
            });
        }

        function answAboutConstNSec(intervals, answ) {
            let wasConst = intervals.map(interval => lengthConst(interval) > 1);
            let constTexts = intervals.map(interval => 'батискаф ' + chislitlx(lengthConst(interval) * 15, 'секунда') + ' погружался с постоянной ненулевой скоростью');

            wasConst.forEach((condition, i) => {
                if (condition) {
                    if (hasNoDuplicateValue(wasConst, true) || wasConst.filter(c => c).length === 1) {
                        answ[i].solution.push(constTexts[i]);
                    }
                }
            });
        }

        let time = [0].zapMonot(22, 0, 1, 1); // шкала времени
        let value = [0]; // шкала скорости

        for (; value.length <= time.length || value.length == time.length;) {
            let interI = (time.length / sl(2, 3).floor());
            for (let j = 0; j < interI; j++) {
                value.push([sl(1, 5), value[value.length - 1]][Number([0, 0, 0, 1].iz() && value[value.length - 1] != 0)]);
            }

            let interD = sl(2, 3);
            if (value.length + interD !== time.length)
                for (let j = 0; j < interD; j++) {
                    value.push(0);
                }
        }

        let beginTime = sl(4);

        let intervals = Array.from({
            length: 4
        }, (_, i) =>
            value.slice(beginTime + i * 4, beginTime + i * 4 + 5));

        let listOfIntervals = intervals.map((interval, i) => {
            return {
                expr: (beginTime + i * 4) * 15 + '-' + (beginTime + i * 4 + 4) * 15 + 'c',
                solution: []
            };
        });

        let variable = sl1();
        let variableForStop = sl(2);
        let aAboutIncrOrDecr = sl1();
        let aAboutNonDecr = sl1();

        let lessV = sl(1, 2);
        let moreV = sl(2, 3);

        // добавляем ответ про остановку
        answAboutStop(intervals, listOfIntervals, variableForStop);
        if (aAboutIncrOrDecr) {
            // добавляем ответ про повышение скорости
            answAboutIncreasing(intervals, listOfIntervals);
        } else {
            // добавляем ответ про понижение скорости
            answAboutDecreasing(intervals, listOfIntervals);
        }

        if (aAboutNonDecr) {
            // добавляем ответ про не понижение скорости
            answAboutNonDecreasing(intervals, listOfIntervals, variable);
        } else {
            // добавляем ответ про не понижение скорости и не остановку на интервале
            // добавляем ответ про не повышение скорости
            answAboutNonIncreasing(intervals, listOfIntervals, variable);
            answAboutNonDecreasingAndWasConst(intervals, listOfIntervals);
        }
        // добавляем ответ про скорость была не более
        answAboutNonMore(intervals, listOfIntervals, moreV);
        // добавляем ответ про скорость была не менее
        answAboutNonLess(intervals, listOfIntervals, lessV);
        // добавляем ответ про постоянную скорость ровно n секунд
        answAboutConstNSec(intervals, listOfIntervals);
        // добавляем ответ про понижение скорости и остановку на n
        answAboutDecreasingAfterZero(intervals, listOfIntervals);

        // добавляем ответ про максимальную скорость
        answAboutMax(intervals, listOfIntervals);

        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            ctx.drawGridWithArrows({
                gridWidth: 645,
                gridHeight: 240,
                cellWidth: 30,
                cellHeight: 30,
                stepX: 15,
                stepY: 0.1,
                maxX: 300,
                maxY: 0.5,
                stepByCeilX: 4,
                arrowLengthX: 20.5,
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
            text: 'На графике изображена зависимость скорости погружения батискафа от времени. ' +
                'На вертикальной оси отмечена скорость в м/с, ' +
                'на горизонтальной – время в секундах, ' +
                'прошедшее с начала погружения.',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь графиком, поставьте в соответствие каждому интервалу времени характеристику погружения батискафа на этом интервале.',
            analys:listView.join('<br/>'),
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 600,
            paint: paint1,
        });
    }, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510730

