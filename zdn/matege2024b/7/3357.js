(function () {
    'use strict';
    retryWhileError(function () { /* На графике изображена зависимость скорости движения рейсового автобуса от времени. На вертикальной оси отмечена скорость автобуса в км/ч, на горизонтальной – время в минутах, прошедшее с началадвижения автобуса. */

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
                answ.push('автобус сделал остановку длительностью ' + chislitlx(lengthOfZeroInterval(interval) - 1, 'минута'));
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
                answ[maxIndex].solution.push('скорость автобуса достигла максимума за всё время движения');
        }

        function answAbouNonLessV(interval, answ, V) {
            if ((interval.filter((int) => int > V).length == interval.length)) {
                answ.push('скорость автобуса была не меньше ' + V * 20 + ' км/ч на всём интервале');
            }
        }

        function answAbouNonMoreV(interval, answ, V) {
            if ((interval.filter((int) => int < V)).length == interval.length) {
                answ.push('скорость автобуса была не больше ' + V * 20 + ' км/ч на всём интервале');
            }
        }

        function isNonIncreasing(interval) {
            return interval.slice(1).every((current, index) =>
                current <= interval[index]
            );
        }

        function isNonDecreasing(interval) {
            return interval.slice(1).every((current, index) =>
                current >= interval[index]
            );
        }

        function answAboutNonIncreasing(interval, answ) {
            if (isNonIncreasing(interval)) {
                answ.push('автобус не увеличивал скорость на всём интервале');
            }
        }

        function answAboutNonDecreasing(interval, answ) {
            if (isNonDecreasing(interval)) {
                answ.push('автобус не уменьшал скорость на всём интервале');
            }
        }

        function answAbouConstV(intervals, answ) {
            let length = 0;

            for (let i = 0; i < intervals.length; i++) {
                for (let j = 1; j < intervals[i].length; j++) {
                    if (intervals[i][j] === intervals[i][j - 1] && intervals[i][j - 1]!==0) {
                        length++;
                    }
                }
                if(length>2)
                    answ[i].solution.push(chislitlx(length, 'минута') + ' автобус двигался с постоянной ненулевой скоростью');
                length = 0;
            }
        }

        let t = [0].zapMonot(25, 0, 1, 1); // шкала времени
        let v = [0]; // шкала скорости

        for (; v.length <= t.length || v.length == t.length;) {
            let interI = sl(2, (t.length / sl(3, 4)).floor());
            for (let j = 0; j < interI; j++) {
                if (v.length + 1 == t.length) {
                    v.push(0);
                    break;
                }
                v.push([sl(1, 5), v[v.length - 1]][Number(sl1() && v[v.length - 1] != 0)]);
            }

            let interD = sl(2, 3);
            for (let j = 0; j < interD; j++) {
                v.push(0);
            }
        }
        v = v.slice(0, 25);

        let beginTime = sl(0, 4);

        let intervals = Array.from({ length: 4 }, (_, i) =>
            v.slice(beginTime + i * 4, beginTime + i * 4 + 5));

        let listOfIntervals = [{
            expr: beginTime + '-' + (beginTime + 4) + ' мин.',
            solution: [],
        }, {
            expr: (beginTime + 4) + '-' + (beginTime + 8) + ' мин.',
            solution: [],
        }, {
            expr: (beginTime + 8) + '-' + (beginTime + 12) + ' мин.',
            solution: [],
        }, {
            expr: (beginTime + 12) + '-' + (beginTime + 16) + ' мин.',
            solution: [],
        },];

        // добавляем ответы про остановку
        intervals.forEach((interval, i) => { answAboutStop(interval, listOfIntervals[i].solution); });

        // добавляем ответ про максимальную скорость
        answAbouMaxV(intervals, listOfIntervals);

        // добавляем ответы про скорость не менее
        let lessV = sl(1, 2);
        intervals.forEach((interval, i) => { answAbouNonLessV(interval, listOfIntervals[i].solution, lessV); });

        // добавляем ответы про скорость не более
        let moreV = sl(3, 4);
        intervals.forEach((interval, i) => { answAbouNonMoreV(interval, listOfIntervals[i].solution, moreV); });

        // добавляем ответы про не повышение скорости
        intervals.forEach((interval, i) => { answAboutNonIncreasing(interval, listOfIntervals[i].solution); });
        // добавляем ответы про не понижение скорости
        intervals.forEach((interval, i) => { answAboutNonDecreasing(interval, listOfIntervals[i].solution); });
        
        // добавляем ответы про постоянную скорость
        answAbouConstV(intervals, listOfIntervals);

        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');
        console.log(solutions, listOfIntervals);

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

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

            for (let i = 0; i < t.length - 1; i++) {
                ctx.drawLine(t[i], v[i], t[i + 1], v[i + 1]);
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
            postText: 'Пользуясь графиком, поставьте в соответствие каждому интервалу времени характеристику движения автобуса на этом интервале.<br/><br/> ВРЕМЕННЫЕ ответы <br/>' + listView.join('<br/>'),
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 400,
            paint: paint1,
        });
    }, 100);
})();
// https://ege314.ru/14-analiz-grafikov-i-diagramm/reshenie-3357/
