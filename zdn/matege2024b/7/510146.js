(function () {
    'use strict';
    retryWhileError(function () {
        /* На графике изображена зависимость цены погружения батискафа от времени. На вертикальной оси отмечена цена в м/с, нагоризонтальной – время в секундах, прошедшее с начала погружения. */

        function convert(p) {
            return minY + p * stepY;
        }

        function answAbouMaxV(intervals, answ) {
            let maxV = price.maxE();
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
                answ[maxIndex].solution.push(`цена достигла максимума за весь период с ${mounthDays[0]} по ${mounthDays[11]} ${mounthView}`);
        }

        function isNonMoreP(interval, price) {
            return (interval.filter((int) => int < price)).length == interval.length;
        }

        function answAbouNonMoreP(interval, answ, price) {
            if (isNonMoreP(interval, price)) {
                answ.push(`цена акции не поднималась выше ${convert(price)} рублей за штуку`);
            }
        }

        function isNonLessP(interval, price) {
            return interval.filter((int) => int > price).length == interval.length;
        }

        function answAbouNonLessP(interval, answ, price) {
            if (isNonLessP(interval, price)) {
                answ.push(`цена акции не опускалась ниже ${convert(price)} рублей за штуку`);
            }
        }

        function isIncreasing(interval) {
            return interval.slice(1).every((current, index) =>
                current > interval[index]
            );
        }

        function isDecreasing(interval) {
            return interval.slice(1).every((current, index) =>
                current < interval[index]
            );
        }

        function answAboutIncreasing(interval, answ) {
            if (isIncreasing(interval)) {
                answ.push('цена акции ежедневно росла');
            }
        }

        function answAboutDecreasing(interval, answ) {
            if (isDecreasing(interval)) {
                answ.push('цена акции ежедневно снижалась');
            }
        }

        function answAboutConst(interval, answ) {
            if (constPrice(interval)) {
                answ.push('цена акции не менялась');
            }
        }

        function constPrice(interval) {
            let start = interval[0];
            return interval.slice(1).every(p => p == start)
        }

        function answAbouMaxDeltaI(intervals, answ) {
            let incr = intervals.map(int => {
                if (isIncreasing(int)) {
                    return int.maxE() - int.minE();
                } else {
                    return 0;
                }
            });

            let maxEI = incr.maxE();
            let maxI = incr.max();

            let length = (inter, value) => inter.filter(item => item === value).length == 1;

            if (length(incr, maxEI))
                answ[maxI].solution.push('наибольшее увеличение цены за весь период');
        }

        function answAbouMaxDeltaD(intervals, answ) {

            let decr = intervals.map(int => {
                if (isDecreasing(int)) {
                    return int.maxE() - int.minE();
                } else {
                    return 0;
                }
            });

            let maxED = decr.maxE();
            let maxD = decr.max();

            let length = (inter, value) => inter.filter(item => item === value).length == 1;

            if (length(decr, maxED))
                answ[maxD].solution.push('наибольшее падение цены за весь период');
        }

        function answAbouMaxDeltaIDay(intervals, answ) {
            let incr = intervals.map(interval => {
                if (isIncreasing(interval)) {
                    let delta = [];
                    for (let i = 1; i < interval.length; i++) {
                        delta.push(interval[i] - interval[i - 1]);
                    }
                    return delta.maxE();
                } else {
                    return 0;
                }
            });

            let maxEI = incr.maxE();
            let maxI = incr.max();

            let length = (inter, value) => inter.filter(item => item === value).length == 1;

            if (length(incr, maxEI))
                answ[maxI].solution.push('наибольшее рост цены за день торгов');
        }

        function answAbouMaxDeltaDDay(intervals, answ) {
            let decr = intervals.map(interval => {
                if (isDecreasing(interval)) {
                    let delta = [];
                    for (let i = 1; i < interval.length; i++) {
                        delta.push(interval[i - 1] - interval[i]);
                    }
                    return delta.maxE();
                } else {
                    return 0;
                }
            });

            let maxED = decr.maxE();
            let maxD = decr.max();

            let length = (inter, value) => inter.filter(item => item === value).length == 1;

            if (length(decr, maxED))
                answ[maxD].solution.push('наибольшее падение цены за день торгов');
        }
        
        function answAbouMaxDelta(intervals, answ) {
            let interval = intervals.map(int => {
                return (int.maxE() - int.minE()).abs();
            });

            let maxE = interval.maxE();
            let max = interval.max();

            let length = (inter, value) => inter.filter(item => item === value).length == 1;

            if (length(interval, maxE))
                answ[max].solution.push('наибольшее изменение цены за весь период');
        }
        
        function answAboutMinDeltas(intervals, answ) {
            let deltaMin = intervals.map(interval => {
                let delta = [];
                for (let i = 1; i < interval.length; i++) {
                    delta.push((interval[i - 1] - interval[i]).abs());
                }
                console.log(delta);
                return delta.sum()
            });
            
            console.log(deltaMin);

            let minE = deltaMin.minE();
            let min = deltaMin.min();

            let length = (inter, value) => inter.filter(item => item === value).length == 1;

            if (length(deltaMin, minE))
                answ[min].solution.push('минимальное колебание цены акций');
        }

        function getWeekdays(year = 2012, month = 9, startFrom = 1, count = 11,) {
            const result = [];
            const date = new Date(year, month, startFrom);

            while (date.getMonth() === month && result.length <= count) {
                const dayOfWeek = date.getDay();
                const day = date.getDate();

                if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                    result.push(day);
                }

                date.setDate(day + 1);
            }

            return result;
        }

        let minY = sl(50, 200) * 10;
        let stepY = [20, 50].iz();
        let maxY = minY + stepY * 8;

        let year = 2000 + sl(0, 24);
        let mounth = sl(11);
        let mounthView = sklonlxkand(om.months[mounth]).re;
        let startDay = sl(1, 14);

        let mounthDays = getWeekdays(year, mounth, startDay);

        let t = [0].zapMonot(12, 0, 1, 1); // шкала дней
        let price = [sl(0, 8, 0.5)]; // шкала цены
        let count = 0;

        for (; price.length <= t.length || price.length == t.length;) {
            let interI = ((t.length / (sl(3, 8, 0.5))).floor());
            for (let j = 0; j < interI; j++) {
                let lastPrice = price[price.length - 1];
                let newPrice = lastPrice + ([1, 1, 1, 0].iz() ? sl(0.1, 3, 0.1) * (-1).pow(count % 2) : 0);
                if (newPrice > 1 && newPrice < 8)
                    price.push(newPrice);
                else
                    break;
            }
            count++;
        }

        let intervals = Array.from({
            length: 4
        }, (_, i) =>
            price.slice(i * 3, i * 3 + 3));

        let listOfIntervals = intervals.map((interval, i) => {
            return {
                expr: `${mounthDays[i * 3]}-${mounthDays[i * 3 + 2]} ${mounthView}`,
                solution: []
            };
        });

        let aAboutNonIncrOrDecr = sl1();
        let aAboutIncrOrDecr = sl1();
        let aAboutDelta = sl1();

        let LessP = sl(3, 5);
        let MoreP = slKrome(LessP, 4, 7);

        function addAllAnswers(intervals, listOfIntervals) {
            intervals.forEach((interval, i) => {
                const solution = listOfIntervals[i].solution;
                if (aAboutIncrOrDecr) {
                    // добавляем ответ про повышение цены
                    answAboutIncreasing(interval, solution);
                } else {
                    // добавляем ответ про понижение цены
                    answAboutDecreasing(interval, solution);
                }
                // добавляем ответ про цена акции не менялась
                answAboutConst(interval, solution);
                if (aAboutNonIncrOrDecr) {
                    // добавляем ответ про цена была не более
                    answAbouNonMoreP(interval, solution, MoreP);
                } else {
                    // добавляем ответ про цена была не менее
                    answAbouNonLessP(interval, solution, LessP);
                }
            });
        }

        // добавляем ответ про максимальную цена
        answAbouMaxV(intervals, listOfIntervals);

        if (aAboutDelta) {
            answAbouMaxDelta(intervals, listOfIntervals);
        } else {
            answAbouMaxDeltaI(intervals, listOfIntervals);
            answAbouMaxDeltaD(intervals, listOfIntervals);
        }



        answAbouMaxDeltaIDay(intervals, listOfIntervals);
        answAbouMaxDeltaDDay(intervals, listOfIntervals);
        answAboutMinDeltas(intervals, listOfIntervals);
        addAllAnswers(intervals, listOfIntervals);

        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            ctx.translate(15, 0);
            ctx.drawGridWithArrows({
                gridWidth: 341,
                gridHeight: 331,
                cellWidth: 30,
                cellHeight: 30,
                stepY,
                typeX: 'custom',
                labelsX: mounthDays,
                minY,
                maxY,
                arrowLengthX: 10.5,
                arrowLengthY: 8.7,
            });

            ctx.translate(30, 30 * 9);
            ctx.scale(30, -30);
            ctx.lineWidth = 2 / 30;

            for (let i = 0; i < t.length; i++) {
                ctx.drawFilledCircle(t[i], price[i], 3 / 30);
                if (i < t.length - 1)
                    ctx.drawLine(t[i], price[i], t[i + 1], price[i + 1]);
            }
        };

        NAtask.setCorrespondenceTask({
            text: `На рисунке показана цена акции компании на момент закрытия биржевых торгов во все рабочие дни в период с ${mounthDays[0]} по ${mounthDays[11]} ${mounthView} ${year} года. По горизонтали указываются числа месяца, по вертикали – цена акции в рублях за штуку. Для наглядности точки соединены линией.`,
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь рисунком, поставьте в соответствие каждому из указанных периодов времени характеристику изменения цены акции в этот период.<br/><br/> ВРЕМЕННЫЕ ОТВЕТЫ <br/>' +
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
// https://mathb-ege.sdamgia.ru/problem?id=510146
