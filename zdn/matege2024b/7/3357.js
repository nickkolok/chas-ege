(function () {
    'use strict';
    retryWhileError(function () { /* На графике изображена зависимость скорости движения рейсового автобуса от времени. На вертикальной оси отмечена скорость автобуса в км/ч, на горизонтальной – время в минутах, прошедшее с началадвижения автобуса. */


        function answAboutStop(interval, answ) {
            let zerosLength = lengthOfZeroInterval(interval);
            if (zerosLength > 1) {
                answ.push('автобус сделал остановку длительностью ' + chislitlx(zerosLength - 1, 'минута'));
            }
        }

        function answAboutMaxV(intervals, answ) {
            // Получаем все значения скоростей
            let allValues = [];
            intervals.forEach(interval => {
                allValues = allValues.concat(interval);
            });

            let maxIndex = findMaxInIntervals(intervals, allValues);

            if (maxIndex !== null && maxIndex !== undefined) {
                answ[maxIndex].solution.push('скорость автобуса достигла максимума за всё время движения');
            }
        }

        function answAboutNonLessV(interval, answ, V) {
            if (isNonLess(interval, V)) {
                answ.push('скорость автобуса была не меньше ' + V * 20 + ' км/ч на всём интервале');
            }
        }

        function answAboutNonMoreV(interval, answ, V) {
            if (isNonMore(interval, V)) {
                answ.push('скорость автобуса была не больше ' + V * 20 + ' км/ч на всём интервале');
            }
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

        function answAboutConstV(intervals, answ) {
            for (let i = 0; i < intervals.length; i++) {
                let constLength = lengthConst(intervals[i]);
                if (constLength > 2) {
                    answ[i].solution.push(chislitlx(constLength - 1, 'минута') + ' автобус двигался с постоянной ненулевой скоростью');
                }
            }
        }

        // Генерация шкалы времени
        let t = [0].zapMonot(25, 0, 1, 1);
        let v = [0];

        // Генерация шкалы скорости
        while (v.length < t.length) {
            let interI = sl(2, (t.length / sl(3, 4)).floor());
            for (let j = 0; j < interI; j++) {
                if (v.length + 1 === t.length) {
                    v.push(0);
                    break;
                }
                v.push([sl(1, 5), v[v.length - 1]][Number(sl1() && v[v.length - 1] !== 0)]);
            }

            let interD = sl(2, 3);
            for (let j = 0; j < interD; j++) {
                if (v.length < t.length) {
                    v.push(0);
                }
            }
        }
        v = v.slice(0, 25);

        let beginTime = sl(0, 4);

        let intervals = Array.from({ length: 4 }, (_, i) =>
            v.slice(beginTime + i * 4, beginTime + i * 4 + 5)
        );

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
        }];

        // Добавляем ответы про остановку
        intervals.forEach((interval, i) => {
            answAboutStop(interval, listOfIntervals[i].solution);
        });

        // Добавляем ответ про максимальную скорость
        answAboutMaxV(intervals, listOfIntervals);

        // Добавляем ответы про скорость не менее
        let lessV = sl(1, 2);
        intervals.forEach((interval, i) => {
            answAboutNonLessV(interval, listOfIntervals[i].solution, lessV);
        });

        // Добавляем ответы про скорость не более
        let moreV = sl(3, 4);
        intervals.forEach((interval, i) => {
            answAboutNonMoreV(interval, listOfIntervals[i].solution, moreV);
        });

        // Добавляем ответы про не повышение скорости
        intervals.forEach((interval, i) => {
            answAboutNonIncreasing(interval, listOfIntervals[i].solution);
        });

        // Добавляем ответы про не понижение скорости
        intervals.forEach((interval, i) => {
            answAboutNonDecreasing(interval, listOfIntervals[i].solution);
        });

        // Добавляем ответы про постоянную скорость
        answAboutConstV(intervals, listOfIntervals);

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
