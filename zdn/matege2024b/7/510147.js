(function () {
    'use strict';
    retryWhileError(function () { 
        /* На рисунке точками показана среднесуточная температура воздуха в Москве в январе 2011 года. По горизонтали указываются числа месяца, по вертикали  — температура в градусах Цельсия. Для наглядности точки соединены линией. */

        function convert(value) {
            return (value - yOffset) + '${}^{\\circ} C$';
        }

        function wasLengthConstValue(interval) {
            let maxLength = 0;
            let currentLength = 0;
            for (let i = 0; i < interval.length; i++) {
                if (interval[i] !== 0 && i > 0 && interval[i] === interval[i - 1]) {
                    currentLength++;
                } else {
                    currentLength = interval[i] === 0 ? 0 : 1;
                }
                maxLength = Math.max(maxLength, currentLength);
            }
            return maxLength;
        }

        function answAboutConstN(intervals, answ) {
            let lengthConsts = intervals.map(interval => wasLengthConstValue(interval));
            let maxLength = lengthConsts.maxE();
            let wasConstN = intervals.map((_, i) => lengthConsts[i] === maxLength && (maxLength === 4 || maxLength === 5));
            let constTexts = intervals.map((_, i) => {
                let days = ['четыре дня', 'пять дней'][lengthConsts[i] - 4];
                return days + ' подряд среднесуточная температура принимала одно и то же значение';
            });
            
            wasConstN.forEach((condition, i) => {
                if (condition) {
                    if (hasNoDuplicateValue(lengthConsts, maxLength)) {
                        answ[i].solution.push(constTexts[i]);
                    }
                }
            });
        }

        function answAboutMin(intervals, answ) {
            let minIndex = findMinInIntervals(intervals, values);
            let wasMin = intervals.map((_, i) => i === minIndex);
            addUniqueAnsw(wasMin, answ, 'среднесуточная температура достигла месячного минимума');
        }

        function answAboutMax(intervals, answ) {
            let maxIndex = findMaxInIntervals(intervals, values);
            let wasMax = intervals.map((_, i) => i === maxIndex);
            addUniqueAnsw(wasMax, answ, 'среднесуточная температура достигла месячного максимума');
        }

        function answAboutMoreButLess(intervals, answ, more, less) {
            let wasCondition = intervals.map(interval => isLess(interval, less) && isMore(interval, more));
            addUniqueAnsw(wasCondition, answ, 'температура находилась в пределах от ' + convert(more) + ' до ' + convert(less));
        }

        function answAboutMore(intervals, answ, more) {
            let wasMore = intervals.map(interval => isMore(interval, more));
            addUniqueAnsw(wasMore, answ, 'среднесуточная температура оставалась выше ' + convert(more));
        }

        function answAboutLess(intervals, answ, less) {
            let wasLess = intervals.map(interval => isLess(interval, less));
            addUniqueAnsw(wasLess, answ, 'среднесуточная температура не превышала ' + convert(less));
        }

        function answAboutNonIncreasing(intervals, answ) {
            let wasNonIncreasing = intervals.map(interval => isNonIncreasing(interval));
            addUniqueAnsw(wasNonIncreasing, answ, 'среднесуточная температура не повышалась в течение периода');
        }

        function answAboutNonDecreasing(intervals, answ) {
            let wasNonDecreasing = intervals.map(interval => isNonDecreasing(interval));
            addUniqueAnsw(wasNonDecreasing, answ, 'среднесуточная температура не снижалась в течение периода');
        }

        function answAboutIncrDescr(intervals, answ) {
            let isNonIncreasingFirst = intervals.map(interval => {
                let first = interval.slice(0, 3);
                return isNonIncreasing(first);
            });
            if (sl1())
                addUniqueAnsw(isNonIncreasingFirst, answ, 'в первые три дня периода среднесуточная температура не повышалась');

            let isNonDecreasingFirst = intervals.map(interval => {
                let first = interval.slice(0, 3);
                return isNonDecreasing(first);
            });
            if (sl1())
                addUniqueAnsw(isNonDecreasingFirst, answ, 'в первые три дня периода среднесуточная температура не понижалась');

            let isNonIncreasingSecond = intervals.map(interval => {
                let second = interval.slice(3);
                return isNonIncreasing(second);
            });
            if (sl1())
                addUniqueAnsw(isNonIncreasingSecond, answ, 'в оставшиеся четыре дня периода среднесуточная температура не повышалась');

            let isNonDecreasingSecond = intervals.map(interval => {
                let second = interval.slice(3);
                return isNonDecreasing(second);
            });
            if (sl1())
                addUniqueAnsw(isNonDecreasingSecond, answ, 'в оставшиеся четыре дня периода среднесуточная температура не понижалась');
        }

        function answAboutWasConstAtEnd(intervals, answ) {
            let wasConst = intervals.map(interval => {
                return interval[5] == interval[6] && interval[5] == interval[4];
            });
            addUniqueAnsw(wasConst, answ, 'в конце периода среднесуточная температура не менялась');
        }

        function answAboutIncreasingAtEnd(intervals, answ) {
            let wasIncr = intervals.map(interval => {
                return isIncreasing(interval.slice(4)) || isIncreasing(interval.slice(5));
            });
            addUniqueAnsw(wasIncr, answ, 'в конце периода наблюдался рост среднесуточной температуры');
        }

        function answAboutDecreasingAtEnd(intervals, answ) {
            let wasDecr = intervals.map(interval => {
                return isDecreasing(interval.slice(4)) || isDecreasing(interval.slice(5));
            });
            addUniqueAnsw(wasDecr, answ, 'в конце периода наблюдалось падение среднесуточной температуры');
        }

        let rand = sl1();
        let yOffset = [16, 0][rand];
        let randCity = sl1();
        let time = [0].zapMonot(31, 0, 1, 1);
        let values = [sl(18)];
        let count = sl1();
        let attempts = 0;

        for (; values.length < time.length;) {
            if (++attempts > 1000) {
                throw new Error('Генерация ряда температур не сходится');
            }
            let interI = ((time.length / sl(5, 7)).floor());
            for (let j = 0; j < interI; j++) {
                let lastProduction = values[values.length - 1];
                let newProduction = lastProduction + ([1, 1, 1, 0].iz() ? (sl(1, 3) * (-1).pow(count % 2)) : 0);
                if (newProduction >= 1 && newProduction <= 18) {
                    values.push(newProduction);
                }
            }
            count++;
        }
        values = values.slice(0, time.length);

        let beginDay = sl(3);
        let intervals = Array.from({
            length: 4
        }, (_, i) =>
            values.slice(i * 7 + beginDay, i * 7 + 7 + beginDay));

        let listOfIntervals = intervals.map((interval, i) => {
            return {
                expr: `${i * 7 + 1 + beginDay}-${i * 7 + 7 + beginDay}`,
                solution: []
            };
        });

        let less1 = sl(9, 15);
        let more1 = slKrome(less1, 2, 9);
        let less2 = slKrome([less1, more1], 9, 15);
        let more2 = slKrome([less1, more1, less2], 2, 9);

        if (sl1())
            answAboutIncrDescr(intervals, listOfIntervals);
        if (sl1()) {
            answAboutNonIncreasing(intervals, listOfIntervals);
        } else {
            answAboutNonDecreasing(intervals, listOfIntervals);
        }
        if (sl1()) {
            answAboutMore(intervals, listOfIntervals, more1);
        } else {
            answAboutLess(intervals, listOfIntervals, less1);
        }
        if (sl1()) {
            answAboutIncreasingAtEnd(intervals, listOfIntervals);
        } else {
            answAboutDecreasingAtEnd(intervals, listOfIntervals);
        }
    
        answAboutMin(intervals, listOfIntervals);
        answAboutMax(intervals, listOfIntervals);
        answAboutMoreButLess(intervals, listOfIntervals, more2, less2);
        answAboutWasConstAtEnd(intervals, listOfIntervals);
        answAboutConstN(intervals, listOfIntervals);

        listOfIntervals.forEach(item => item.solution = item.solution.iz());
        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            ctx.translate(15, 0);
            ctx.drawGridWithArrows({
                gridWidth: 475,
                gridHeight: 330,
                cellWidth: 15,
                cellHeight: 15,
                stepX: 1,
                stepY: 1,
                minX: 1,
                maxX: 32,
                minY: [-16, 0][rand],
                maxY: [2, 18][rand],
                stepByCeilX: 2,
                stepByCeilY: 2,
                arrowLengthX: 30.5,
                arrowLengthY: 19.8,
            });

            ctx.font = "14px serif";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('t,°C', -3, 10);

            ctx.translate(15, 20 * 15);
            ctx.scale(15, -15);
            ctx.lineWidth = 2 / 15;

            for (let i = 0; i < time.length; i++) {
                let plotValue = values[i] - yOffset;
                ctx.drawFilledCircle(time[i], plotValue, 3 / 17);
                if (i < time.length - 1)
                    ctx.drawLine(time[i], plotValue, time[i + 1], values[i + 1] - yOffset);
            }
        };

        NAtask.setCorrespondenceTask({
            text: `На рисунке точками показана среднесуточная температура воздуха в ${['Москве', 'Челябинске'][randCity]} в ${['январе', 'марте'][rand]} ${2000 + sl(25)} года. По горизонтали указываются числа месяца, по вертикали – температура в градусах Цельсия. Для наглядности точки соединены линией. Границы периодов времени показаны штриховыми линиями.`,
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь рисунком, поставьте в соответствие каждому из указанных периодов времени характеристику изменения температуры.',
            analys: listView.join('<br/>'),
        });
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 600,
            paint: paint1,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 500);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510147
