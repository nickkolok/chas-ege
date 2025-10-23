(function () {
    'use strict';
    retryWhileError(function () {
        /* На графике изображена зависимость скорости погружения батискафа от времени. На вертикальной оси отмечена скорость в м/с, нагоризонтальной – время в секундах, прошедшее с начала погружения. */

        function lengthOfZeroInterval(arr) {
            let maxZeros = 0;
            let currentZeros = 0;

            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === 0) {
                    currentZeros++;
                    maxZeros = Math.max(maxZeros, currentZeros);
                } else {
                    currentZeros = 0;
                }
            }

            return maxZeros;
        }

        function answAboutStop(interval, answ, variable) {
            let sec = chislitlx((lengthOfZeroInterval(interval) - 1) * 15, 'секунда', 'v');
            if (lengthOfZeroInterval(interval) > 1)
                answ.push(['батискаф остановился ровно на ' + sec,
                'батискаф ровно ' + sec + ' оставался на одной глубине',
                'в течение ' + sec + ' подряд батискаф оставался на одной глубине'
                ][variable]);
        }

        function answAbouMaxV(intervals, answ) {
            let maxV = v.maxE();
            let maxIndex = null;

            for (let i = 0; i < intervals.length; i++) {
                for (let j = 0; j < intervals[i].length; j++) {
                    if (intervals[i][j] === maxV) {
                        maxIndex = i;
                        break;
                    }
                }
                if (maxIndex != null)
                    break;
            }

            if (maxIndex)
                answ[maxIndex].solution.push('скорость погружения впервые достигла максимума за всё время погружения');
        }

        function isNonMoreV(interval, V) {
            return (interval.filter((int) => int < V)).length == interval.length;
        }

        function answAbouNonMoreV(interval, answ, V) {
            if (isNonMoreV(interval, V)) {
                answ.push('скорость погружения не больше ' + V * 0.1 + ' м/с на всём интервале');
            }
        }

        function isNonLessV(interval, V) {
            return interval.filter((int) => int > V).length == interval.length;
        }

        function answAbouNonLessV(interval, answ, V) {
            if (isNonLessV(interval, V)) {
                answ.push('скорость погружения не меньше ' + V * 0.1 + ' м/с на всём интервале');
            }
        }

        function isNonIncreasing(interval) {
            return interval.slice(1).every((current, index) =>
                current <= interval[index]
            );
        }

        function isIncreasing(interval) {
            return interval.slice(1).every((current, index) =>
                current > interval[index]
            );
        }

        function isNonDecreasing(interval) {
            return interval.slice(1).every((current, index) =>
                current >= interval[index]
            );
        }

        function isDecreasing(interval) {
            return interval.slice(1).every((current, index) =>
                current < interval[index]
            );
        }

        function answAboutIncreasing(interval, answ) {
            if (isIncreasing(interval)) {
                answ.push('скорость погружения постоянно росла');
            }
        }

        function answAboutDecreasing(interval, answ) {
            if (isDecreasing(interval)) {
                answ.push('скорость погружения постоянно падала');
            }
        }

        function answAboutNonDecreasingAndWasConst(interval, answ) {
            if (isNonIncreasing(interval) && wasConstV(interval)) {
                answ.push('скорость погружения не увеличивалась на всём интервале, но батискаф не останавливался');
            }
        }

        function answAboutNonIncreasing(interval, answ, variable) {
            if (isNonIncreasing(interval)) {
                answ.push(['скорость погружения не ' + ['увеличивалась', 'росла'].iz() + ' на всём интервале',
                    'погружение производилось без ускорения на всём интервале'
                ][variable]);
            }
        }

        function answAboutNonDecreasing(interval, answ, variable) {
            if (isNonDecreasing(interval)) {
                answ.push(['скорость погружения не уменьшалась на всём интервале',
                    'погружение производилось без замедления на всём интервале'
                ][variable]);
            }
        }

        function isDecreasingAfterZero(interval) {
            let minIndex = interval.min();
            let minValue = interval[minIndex];

            if (minIndex === 0 || minValue != 0) {
                return false;
            }

            for (let i = 1; i <= minIndex; i++) {
                if (interval[i] >= interval[i - 1]) {
                    return false;
                }
            }

            for (let i = minIndex + 1; i < interval.length; i++) {
                if (interval[i] != 0) {
                    return false;
                }
            }

            return true;
        }

        function answAboutDecreasingAfterZero(interval, answ) {
            let length = (lengthOfZeroInterval(interval) - 1) * 15;
            let sec = chislitlx(length, 'секунда', 'v');
            if (length == 4) {
                sec = 'минуту';
            }
            if (length == 2 && sl1()) {
                sec = 'полминуты';
            }
            if (isDecreasingAfterZero(interval)) {
                answ.push('скорость погружения уменьшалась, а затем произошла остановка на ' + sec);
            }
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

        function lengthConstV(interval) {
            let length = 0;
            let constanta = 0;
            for (let j = 1; j < interval.length; j++) {
                if (interval[j] === interval[j - 1] && interval[j - 1] !== 0) {
                    if (constanta == 0)
                        constanta = interval[j];
                    if (constanta == interval[j])
                        length++;
                }
            }
            return length;
        }

        function answAbouConstVNSec(interval, answ) {
            let length = lengthConstV(interval);
            if (length > 1)
                answ.push('батискаф ' + chislitlx(length * 15, 'секунда') + ' погружался с постоянной ненулевой скоростью');
        }

        let t = [0].zapMonot(22, 0, 1, 1); // шкала времени
        let v = [0]; // шкала скорости

        for (; v.length <= t.length || v.length == t.length;) {
            let interI = (t.length / sl(2, 3).floor());
            for (let j = 0; j < interI; j++) {
                v.push([sl(1, 5), v[v.length - 1]][Number([0, 0, 0, 1].iz() && v[v.length - 1] != 0)]);
            }

            let interD = sl(2, 3);
            if (v.length + interD !== t.length)
                for (let j = 0; j < interD; j++) {
                    v.push(0);
                }
        }

        let beginTime = sl(4);

        let intervals = Array.from({
            length: 4
        }, (_, i) =>
            v.slice(beginTime + i * 4, beginTime + i * 4 + 5));

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

        function addAllAnswers(intervals, listOfIntervals) {
            intervals.forEach((interval, i) => {
                const solution = listOfIntervals[i].solution;
                // добавляем ответ про остановку
                answAboutStop(interval, solution, variableForStop);
                if (aAboutIncrOrDecr) {
                    // добавляем ответ про повышение скорости
                    answAboutIncreasing(interval, solution);
                } else {
                    // добавляем ответ про понижение скорости
                    answAboutDecreasing(interval, solution);
                }
                // добавляем ответ про не повышение скорости
                answAboutNonIncreasing(interval, solution, variable);
                if (aAboutNonDecr) {
                    // добавляем ответ про не понижение скорости
                    answAboutNonDecreasing(interval, solution);
                } else {
                    // добавляем ответ про не понижение скорости и не остановку на интервале
                    answAboutNonDecreasingAndWasConst(interval, solution);
                }
                // добавляем ответ про скорость была не более
                answAbouNonMoreV(interval, solution, moreV);
                // добавляем ответ про скорость была не менее
                answAbouNonLessV(interval, solution, lessV);
                // добавляем ответ про постоянную скорость ровно n секунд
                answAbouConstVNSec(interval, solution);
                // добавляем ответ про понижение скорости и остановку на n
                answAboutDecreasingAfterZero(interval, solution)
            });
        }

        // добавляем ответ про максимальную скорость
        answAbouMaxV(intervals, listOfIntervals);
        addAllAnswers(intervals, listOfIntervals);

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
                arrowLengthY: 5.3,
            });

            ctx.translate(30, 30 * 6);
            ctx.scale(30, -30);
            ctx.lineWidth = 2 / 30;

            for (let i = 0; i < t.length - 1; i++) {
                ctx.drawLine(t[i], v[i], t[i + 1], v[i + 1]);
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
            postText: 'Пользуясь графиком, поставьте в соответствие каждому интервалу времени характеристику погружения батискафа на этом интервале.<br/><br/> ВРЕМЕННЫЕ ОТВЕТЫ <br/>' +
                listView.join('<br/>'),
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 600,
            paint: paint1,
        });
    }, 100);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510730
