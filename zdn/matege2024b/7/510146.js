(function () {
    'use strict';
    retryWhileError(function () {
        /* На графике изображена зависимость цены акции компании от времени. На вертикальной оси отмечена цена в рублях за штуку, на горизонтальной – рабочие дни месяца. */

        function convert(p) {
            return minY + p * stepY;
        }

        function answAboutMax(intervals, answ) {
            let maxIndex = findMaxInIntervals(intervals, price);
            let wasMax = intervals.map((_, i) => i === maxIndex);
            addUniqueAnsw(wasMax, answ, `цена достигла максимума за весь период с ${monthDays[0]} по ${monthDays[11]} ${monthView}`);
        }

        function answAboutNonMoreP(intervals, answ, threshold) {
            let wasNonMore = intervals.map(interval => isNotMore(interval, threshold));
            addUniqueAnsw(wasNonMore, answ, `цена акции не поднималась выше ${convert(threshold)} рублей за штуку`);
        }

        function answAboutNonLessP(intervals, answ, threshold) {
            let wasNonLess = intervals.map(interval => isNotLess(interval, threshold));
            addUniqueAnsw(wasNonLess, answ, `цена акции не опускалась ниже ${convert(threshold)} рублей за штуку`);
        }

        function answAboutIncreasing(intervals, answ) {
            let wasIncreasing = intervals.map(interval => isIncreasing(interval));
            addUniqueAnsw(wasIncreasing, answ, 'цена акции ежедневно росла');
        }

        function answAboutDecreasing(intervals, answ) {
            let wasDecreasing = intervals.map(interval => isDecreasing(interval));
            addUniqueAnsw(wasDecreasing, answ, 'цена акции ежедневно снижалась');
        }

        function answAboutConst(intervals, answ) {
            let wasConst = intervals.map(interval => constValueByFirst(interval));
            addUniqueAnsw(wasConst, answ, 'цена акции не менялась');
        }

        function answAboutMaxDeltaI(intervals, answ) {
            let incr = intervals.map(int => {
                if (isIncreasing(int)) {
                    return int.maxE() - int.minE();
                } else {
                    return 0;
                }
            });

            let maxEI = incr.maxE();
            let wasMaxDeltaI = intervals.map((_, i) => incr[i] === maxEI);
            addUniqueAnsw(wasMaxDeltaI, answ, 'наибольшее увеличение цены за весь период');
        }

        function answAboutMaxDeltaD(intervals, answ) {
            let decr = intervals.map(int => {
                if (isDecreasing(int)) {
                    return int.maxE() - int.minE();
                } else {
                    return 0;
                }
            });

            let maxED = decr.maxE();
            let wasMaxDeltaD = intervals.map((_, i) => decr[i] === maxED);
            addUniqueAnsw(wasMaxDeltaD, answ, 'наибольшее падение цены за весь период');
        }

        function answAboutMaxDeltaIDay(intervals, answ) {
            let incr = intervals.map(interval => {
                    let delta = [];
                    for (let i = 1; i < interval.length; i++) {
                        delta.push(interval[i] - interval[i - 1]);
                    }
                    return delta.maxE();
            });

            let maxEI = incr.maxE();
            let wasMaxDeltaIDay = intervals.map((_, i) => incr[i] === maxEI);
            addUniqueAnsw(wasMaxDeltaIDay, answ, 'наибольший рост цены за день торгов');
        }

        function answAboutMaxDeltaDDay(intervals, answ) {
            let decr = intervals.map(interval => {
                    let delta = [];
                    for (let i = 1; i < interval.length; i++) {
                        delta.push(interval[i - 1] - interval[i]);
                    }
                    return delta.maxE();
            });

            let maxED = decr.maxE();
            let wasMaxDeltaDDay = intervals.map((_, i) => decr[i] === maxED);
            addUniqueAnsw(wasMaxDeltaDDay, answ, 'наибольшее падение цены за день торгов');
        }
        
        function answAboutMaxDelta(intervals, answ) {
            let interval = intervals.map(int => {
                return (int.maxE() - int.minE()).abs();
            });

            let maxE = interval.maxE();
            let wasMaxDelta = intervals.map((_, i) => interval[i] === maxE);
            addUniqueAnsw(wasMaxDelta, answ, 'наибольшее изменение цены за весь период');
        }
        
        function answAboutMinDeltas(intervals, answ) {
            let deltaMin = intervals.map(interval => {
                let delta = [];
                for (let i = 1; i < interval.length; i++) {
                    delta.push((interval[i - 1] - interval[i]).abs());
                }
                return delta.sum();
            });
            
            let minE = deltaMin.minE();
            if (minE === 0)
                return;           
            
            let wasMinDeltas = intervals.map((_, i) => deltaMin[i] === minE);
            addUniqueAnsw(wasMinDeltas, answ, 'минимальное колебание цены акций');
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
        let month = sl(11);
        let monthView = sklonlxkand(om.months[month]).re;
        let startDay = sl(1, 14);

        let monthDays = getWeekdays(year, month, startDay);
        genAssert(monthDays.length >= 12, "Недостаточно рабочих дней в месяце");

        let time = [0].zapMonot(12, 0, 1, 1); // шкала дней
        let price = [sl(0, 8, 0.5)]; // шкала цены
        let count = 0;

        for (; price.length <= time.length;) {
            let interI = ((time.length / (sl(3, 8, 0.5))).floor());
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
                expr: `${monthDays[i * 3]}-${monthDays[i * 3 + 2]} ${monthView}`,
                solution: []
            };
        });

        let aAboutNonIncrOrDecr = sl1();
        let aAboutIncrOrDecr = sl1();
        let aAboutDelta = sl1();

        let LessP = sl(3, 5);
        let MoreP = slKrome(LessP, 4, 7);

            if (aAboutIncrOrDecr) {
                // добавляем ответ про повышение цены
                answAboutIncreasing(intervals, listOfIntervals);
            } else {
                // добавляем ответ про понижение цены
                answAboutDecreasing(intervals, listOfIntervals);
            }
            // добавляем ответ про цена акции не менялась
            answAboutConst(intervals, listOfIntervals);
            if (aAboutNonIncrOrDecr) {
                // добавляем ответ про цена была не более
                answAboutNonMoreP(intervals, listOfIntervals, MoreP);
            } else {
                // добавляем ответ про цена была не менее
                answAboutNonLessP(intervals, listOfIntervals, LessP);
            }

        // добавляем ответ про максимальную цена
        answAboutMax(intervals, listOfIntervals);

        if (aAboutDelta) {
            answAboutMaxDelta(intervals, listOfIntervals);
        } else {
            answAboutMaxDeltaI(intervals, listOfIntervals);
            answAboutMaxDeltaD(intervals, listOfIntervals);
        }

        if (sl1()) {
            answAboutMaxDeltaIDay(intervals, listOfIntervals);
        } else {
            answAboutMaxDeltaDDay(intervals, listOfIntervals);
        }
        
        answAboutMinDeltas(intervals, listOfIntervals);

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
                labelsX: monthDays,
                minY,
                maxY,
                arrowLengthX: 10.5,
                arrowLengthY: 8.7,
            });

            ctx.translate(30, 30 * 9);
            ctx.scale(30, -30);
            ctx.lineWidth = 2 / 30;

            for (let i = 0; i < time.length; i++) {
                ctx.drawFilledCircle(time[i], price[i], 3 / 30);
                if (i < time.length - 1)
                    ctx.drawLine(time[i], price[i], time[i + 1], price[i + 1]);
            }
        };

        NAtask.setCorrespondenceTask({
            text: `На рисунке показана цена акции компании на момент закрытия биржевых торгов во все рабочие дни в период с ${monthDays[0]} по ${monthDays[11]} ${monthView} ${year} года. По горизонтали указываются числа месяца, по вертикали – цена акции в рублях за штуку. Для наглядности точки соединены линией.`,
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь рисунком, поставьте в соответствие каждому из указанных периодов времени характеристику изменения цены акции в этот период.',
            analys:listView.join('<br/>')
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 600,
            paint: paint1,
        });
    }, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510146
