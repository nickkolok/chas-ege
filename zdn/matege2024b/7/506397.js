(function () {
    'use strict';
    retryWhileError(function () {
        /* На графике изображена зависимость скорости движения легкового автомобиля от времени. На вертикальной оси отмечена скорость легкового автомобиля в км/ч, на горизонтальной – время в секундах, прошедшее с начала движения автомобиля. */
       
        function answAboutStop(intervals, answ) {
            let wasStop = intervals.map(interval => lengthOfZeroInterval(interval) > 1);
            
            let index = wasStop.indexOf(true);
            let text = 'автомобиль сделал остановку на ' + chislitlx((lengthOfZeroInterval(intervals[index]) - 1)*15, 'секунда');

            if (noHasDublValue(wasStop, true)) {
                answ[index].solution.push(text);
            }            
        }

        function answAboutMax(intervals, answ) {
            let maxIndex = findMaxInIntervals(intervals, value);
            let wasMax = intervals.map((_, i) => i === maxIndex);
            addUniqueAnsw(wasMax, answ, 'скорость автомобиля достигла максимума за всё время движения');
        }

        function answAboutNonIncreasingNonMoreV(intervals, answ, V) {
            let wasCondition = intervals.map(interval => isNonIncreasing(interval) && isNonMore(interval, V));
            addUniqueAnsw(wasCondition, answ, 'скорость автомобиля не увеличивалась и не превышала ' + V * 20 + ' км/ч');
        }

        function answAboutNonDecreasingNonLessV(intervals, answ, V) {
            let wasCondition = intervals.map(interval => isNonDecreasing(interval) && isNonLess(interval, V));
            addUniqueAnsw(wasCondition, answ, 'скорость автомобиля не уменьшалась и не была менее ' + V * 20 + ' км/ч');
        }

        function answAboutIncreasing(intervals, answ) {
            let wasIncreasing = intervals.map(interval => isIncreasing(interval));
            addUniqueAnsw(wasIncreasing, answ, 'скорость автомобиля постоянно увеличивалась');
        }

        function answAboutDecreasing(intervals, answ) {
            let wasDecreasing = intervals.map(interval => isDecreasing(interval));
            addUniqueAnsw(wasDecreasing, answ, 'скорость автомобиля постоянно уменьшалась');
        }

        function answAboutNonIncreasingAndWasConst(intervals, answ) {
            let wasCondition = intervals.map(interval => isNonIncreasing(interval) && wasConst(interval));
            addUniqueAnsw(wasCondition, answ, 'автомобиль не увеличивал скорость на всём интервале и некоторое время ехал с постоянной скоростью');
        }

        function answAboutNonDecreasingAndWasConst(intervals, answ) {
            let wasCondition = intervals.map(interval => isNonDecreasing(interval) && wasConst(interval));
            addUniqueAnsw(wasCondition, answ, 'автомобиль не уменьшал скорость на всём интервале и некоторое время ехал с постоянной скоростью');
        }

        function answAboutNonIncreasing(intervals, answ) {
            let wasNonIncreasing = intervals.map(interval => isNonIncreasing(interval));
            addUniqueAnsw(wasNonIncreasing, answ, 'автомобиль не увеличивал скорость на всём интервале');
        }

        function answAboutNonDecreasing(intervals, answ) {
            let wasNonDecreasing = intervals.map(interval => isNonDecreasing(interval));
            addUniqueAnsw(wasNonDecreasing, answ, 'автомобиль не уменьшал скорость на всём интервале');
        }

        function answAboutDecreasingAfterIncreasing(intervals, answ) {
            let wasCondition = intervals.map(interval => isDecreasingAfterIsIncreasing(interval));
            addUniqueAnsw(wasCondition, answ, 'скорость автомобиля сначала уменьшалась, а потом увеличивалась');
        }

        function answAboutIncreasingAfterDecreasing(intervals, answ) {
            let wasCondition = intervals.map(interval => isIncreasingAfterIsDecreasing(interval));
            addUniqueAnsw(wasCondition, answ, 'скорость автомобиля сначала увеличивалась, а потом уменьшалась');
        }

        function answAboutConstNSec(intervals, answ) {
            let wasConst = intervals.map(interval => lengthConst(interval) > 1);
            
            let index = wasConst.indexOf(true);
            let text = 'автомобиль ровно ' + chislitlx(lengthOfZeroInterval(intervals[index]) * 15, 'минута'+ ' ехал с постоянной скоростью');

            if (noHasDublValue(wasConst, true)) {
                answ[index].solution.push(text);
            }            
        }

        function answAboutConstMoreNSec(intervals, answ) {
            let wasConst = intervals.map(interval => lengthConst(interval) > 2);
            
            let index = wasConst.indexOf(true);
            let text = 'автомобиль более ' + chislitlx((lengthConst(intervals[index]) - 1) * 15, 'секунда', 'r') + ' ехал с постоянной скоростью';

            if (noHasDublValue(wasConst, true)) {
                answ[index].solution.push(text);
            } 
        }

        let time = [0].zapMonot(11, 0, 1, 1); // шкала времени
        let value = [0]; // шкала скорости

        for (; value.length <= time.length || value.length == time.length;) {
            let interI = (time.length / sl(2, 4).floor());
            for (let j = 0; j < interI; j++) {
                if (value.length + 1 == time.length) {
                    value.push(0);
                    break;
                }
                value.push([sl(1, 4), value[value.length - 1]][Number(sl1() && value[value.length - 1] != 0)]);
            }

            let interD = sl(2, 3);
            if (value.length + interD !== time.length)
                for (let j = 0; j < interD; j++) {
                    value.push(0);
                }
        }
        genAssert(value[9] != 0, 'Предпоследняя точка 0');
        value = value.slice(0, 11);

        let beginTime = sl1();

        let intervals = Array.from({
            length: 4
        }, (_, i) =>
            value.slice(beginTime + i * 2, beginTime + i * 2 + 3));

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
        let aAboutConst = sl1();

        let lessV = sl(1, 2);
        let moreV = sl(2, 3);

        // добавляем ответ про остановку
        answAboutStop(intervals, listOfIntervals);
        if (aAboutIncrOrDecr) {
            // добавляем ответ про повышение скорости
            answAboutIncreasing(intervals, listOfIntervals);
        } else {
            // добавляем ответ про понижение скорости
            answAboutDecreasing(intervals, listOfIntervals);
        }
        if (aAboutNonIncr) {
            // добавляем ответ про не повышение скорости
            answAboutNonIncreasing(intervals, listOfIntervals);
        } else {
            // добавляем ответ про не повышение скорости и сохранении скорости некоторое время
            answAboutNonIncreasingAndWasConst(intervals, listOfIntervals);
        }
        if (aAboutNonDecr) {
            // добавляем ответ про не понижение скорости
            answAboutNonDecreasing(intervals, listOfIntervals);
        } else {
            // добавляем ответ про не понижение скорости и сохранении скорости некоторое время
            answAboutNonDecreasingAndWasConst(intervals, listOfIntervals);
        }
        if (aIncrAfterDecr) {
            // добавляем ответ про понижение скорости а потом увеличение
            answAboutDecreasingAfterIncreasing(intervals, listOfIntervals);
        } else {
            // добавляем ответ про увеличение скорости а потом понижение
            answAboutIncreasingAfterDecreasing(intervals, listOfIntervals);
        }
        if (aLessVMoreV) {
            // добавляем ответ про скорость не повышалась и была не более n км/ч
            answAboutNonIncreasingNonMoreV(intervals, listOfIntervals, moreV);
        } else {
            // добавляем ответ про скорость не понижалась и была не менее n км/ч
            answAboutNonDecreasingNonLessV(intervals, listOfIntervals, lessV);
        }
        if (aAboutConst) {
            // добавляем ответ про постоянную скорость ровно n секунд
            answAboutConstNSec(intervals, listOfIntervals);
        } else {
            // добавляем ответ про постоянную скорость более n секунд
            answAboutConstMoreNSec(intervals, listOfIntervals);
        }

        // добавляем ответ про максимальную скорость
        answAboutMax(intervals, listOfIntervals);

        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

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

            for (let i = 0; i < time.length - 1; i++) {
                ctx.drawLine(time[i], value[i], time[i + 1], value[i + 1]);
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
