(function () {
    'use strict';
    retryWhileError(function () { /* На графике изображена зависимость скорости движения легкового автомобиля от времени. На вертикальной оси отмечена скоростьлегкового автомобиля в км/ч, на горизонтальной – время в секундах, прошедшее с начала движения автомобиля. */

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

        function answAboutStop(interval, answ) {
            if (lengthOfZeroInterval(interval) > 1)
                answ.push('автомобиль сделал остановку на ' + chislitlx((lengthOfZeroInterval(interval) - 1) * 15, 'секунда', 'v'));
        }

        function answAbouMaxV(intervals, answ) {
            let maxV = v.maxE();
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
                answ[maxIndex].solution.push('скорость автомобиля достигла максимума за всё время движения');
        }

        function isNonMoreV(interval, V) {
            return (interval.filter((int) => int < V)).length == interval.length;
        }

        function answAbouNonIncreasingNonMoreV(interval, answ, V) {
            if (isNonIncreasing(interval) && isNonMoreV(interval, V)) {
                answ.push('скорость автомобиля не увеличивалась и не превышала ' + V * 20 + ' км/ч');
            }
        }

        function isNonLessV(interval, V) {
            return interval.filter((int) => int > V).length == interval.length;
        }

        function answAbouNonDecreasingNonLessV(interval, answ, V) {
            if (isNonDecreasing(interval) && isNonLessV(interval, V)) {
                answ.push('скорость автомобиля не уменьшалась и не была менее ' + V * 20 + ' км/ч');
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
                answ.push('скорость автомобиля постоянно увеличивалась');
            }
        }

        function answAboutDecreasing(interval, answ) {
            if (isDecreasing(interval)) {
                answ.push('скорость автомобиля постоянно уменьшалась');
            }
        }

        function answAboutNonIncreasingAndWasConst(interval, answ) {
            if (isNonIncreasing(interval) && wasConstV(interval)) {
                answ.push('автомобиль не увеличивал скорость на всём интервале и некоторое время ехал с постоянной скоростью');
            }
        }

        function answAboutNonDecreasingAndWasConst(interval, answ) {
            if (isNonDecreasing(interval) && wasConstV(interval)) {
                answ.push('автомобиль не уменьшал скорость на всём интервале и некоторое время ехал с постоянной скоростью');
            }
        }

        function answAboutNonIncreasing(interval, answ) {
            if (isNonIncreasing(interval)) {
                answ.push('автомобиль не увеличивал скорость на всём интервале');
            }
        }

        function answAboutNonDecreasing(interval, answ) {
            if (isNonDecreasing(interval)) {
                answ.push('автомобиль не уменьшал скорость на всём интервале');
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
                answ.push('скорость автомобиля сначала уменьшалась, а потом увеличивалась');
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
                answ.push('скорость автомобиля сначала увеличивалась, а потом уменьшалась');
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
            for (let j = 1; j < interval.length; j++) {
                if (interval[j] === interval[j - 1] && interval[j - 1] !== 0) {
                    length++;
                }
            }
            return length;
        }

        function answAbouConstVNSec(interval, answ) {
            let length = lengthConstV(interval);
            if (length > 1)
                answ.push('автомобиль ровно ' + chislitlx(length * 15, 'секунда') + ' ехал с постоянной скоростью');
        }

        function answAbouConstVMoreNSec(interval, answ) {
            let length = lengthConstV(interval);
            if (length > 2)
                answ.push('автомобиль более ' + chislitlx((length - 1) * 15, 'секунда', 'r') + ' ехал с постоянной скоростью');
        }

        let t = [0].zapMonot(11, 0, 1, 1); // шкала времени
        let v = [0]; // шкала скорости

        for (; v.length <= t.length || v.length == t.length;) {
            let interI = (t.length / sl(2, 4).floor());
            for (let j = 0; j < interI; j++) {
                if (v.length + 1 == t.length) {
                    v.push(0);
                    break;
                }
                v.push([sl(1, 4), v[v.length - 1]][Number(sl1() && v[v.length - 1] != 0)]);
            }

            let interD = sl(2, 3);
            if (v.length + interD !== t.length)
                for (let j = 0; j < interD; j++) {
                    v.push(0);
                }
        }
        genAssert(v[9] != 0, 'Предпоследняя точка 0');
        v = v.slice(0, 11);

        let beginTime = sl1();

        let intervals = Array.from({
            length: 4
        }, (_, i) =>
            v.slice(beginTime + i * 2, beginTime + i * 2 + 3));

        let listOfIntervals = intervals.map((interval, i) => {
            return {
                expr: (beginTime + i * 2) * 15 + '-' + (beginTime + i * 2 + 2) * 15 + 'c',
                solution: []
            };
        });

        let aAboutIncrOrDecr = sl1();
        let aAboutNonIncr = sl1();
        let aAboutNonDecr = sl1();
        let aIncrAfterDecr = sl1();
        let aLessVMoreV = sl1();
        let aAbouConst = sl1();

        let lessV = sl(1, 2);
        let moreV = sl(2, 3);

        function addAllAnswers(intervals, listOfIntervals) {
            intervals.forEach((interval, i) => {
                const solution = listOfIntervals[i].solution;
                // добавляем ответ про остановку
                answAboutStop(interval, solution);
                if (aAboutIncrOrDecr) {
                    // добавляем ответ про повышение скорости
                    answAboutIncreasing(interval, solution);
                } else {
                    // добавляем ответ про понижение скорости
                    answAboutDecreasing(interval, solution);
                }
                if (aAboutNonIncr) {
                    // добавляем ответ про не повышение скорости
                    answAboutNonIncreasing(interval, solution);
                } else {
                    // добавляем ответ про не повышение скорости и сохранении скорости некоторое время
                    answAboutNonIncreasingAndWasConst(interval, solution);
                }
                if (aAboutNonDecr) {
                    // добавляем ответ про не понижение скорости
                    answAboutNonDecreasing(interval, solution);
                } else {
                    // добавляем ответ про не понижение скорости и сохранении скорости некоторое время
                    answAboutNonDecreasingAndWasConst(interval, solution);
                }
                if (aIncrAfterDecr) {
                    // добавляем ответ про понижение скорости а потом увеличение
                    answAboutDecreasingAfterIncreasing(interval, solution);
                } else {
                    // добавляем ответ про увеличение скорости а потом понижение
                    answAboutIncreasingAfterDecreasing(interval, solution);
                }
                if (aLessVMoreV) {
                    // добавляем ответ про скорость не повышалась и была не более n км/ч
                    answAbouNonIncreasingNonMoreV(interval, solution, moreV);
                } else {
                    // добавляем ответ про скорость не понижалась и была не менее n км/ч
                    answAbouNonDecreasingNonLessV(interval, solution, lessV);
                }
                if (aAbouConst) {
                    // добавляем ответ про постоянную скорость ровно n секунд
                    answAbouConstVNSec(interval, solution);
                } else {
                    // добавляем ответ про постоянную скорость более n секунд
                    answAbouConstVMoreNSec(interval, solution);
                }
            });
        }

        // добавляем ответ про максимальную скорость
        answAbouMaxV(intervals, listOfIntervals);
        addAllAnswers(intervals, listOfIntervals);

        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        console.log(listOfIntervals);

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            ctx.drawGridWithArrows({
                gridWidth: 640,
                gridHeight: 420,
                cellWidth: 60,
                cellHeight: 60,
                stepX: 15,
                stepY: 20,
                maxX: 260,
                maxY: 80,
                stepByCeilX: 1,
                arrowLengthX: 9.5,
                arrowLengthY: 4.8,
            });

            ctx.translate(60, 60 * 5);
            ctx.scale(60, -60);
            ctx.lineWidth = 2 / 60;

            for (let i = 0; i < t.length - 1; i++) {
                ctx.drawLine(t[i], v[i], t[i + 1], v[i + 1]);
            }
        };

        NAtask.setCorrespondenceTask({
            text: 'На графике изображена зависимость скорости движения легкового автомобиля от времени. ' +
                'На вертикальной оси отмечена скорость легкового автомобиля в км/ч, ' +
                'на горизонтальной – время в секундах, ' +
                'прошедшее с начала движения автомобиля.',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь графиком, поставьте в соответствие каждому интервалу времени характеристику движения автомобиля на этом интервале.<br/><br/> ВРЕМЕННЫЕ ОТВЕТЫ <br/>' +
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
// https://mathb-ege.sdamgia.ru/problem?id=506397
