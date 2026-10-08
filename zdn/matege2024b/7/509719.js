(function () {
    'use strict';
    retryWhileError(function () {
        /* На графике изображена зависимость частоты пульса гимнаста от времени в течение и после его выступления в вольных упражнениях. На горизонтальной оси отмечено время (в минутах), прошедшее с начала выступления гимнаста, на вертикальной оси – частота пульса (в ударах в минуту). */

        function convert(value) {
            return value * 20 + 40 + ' уд./мин.';
        }

        function isIncreasing(arr) {
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i] >= arr[i + 1] - 1e-9) return false;
            }
            return true;
        }

        function isDecreasing(arr) {
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i] <= arr[i + 1] + 1e-9) return false;
            }
            return true;
        }

        function isNotLess(arr, val) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] < val - 1e-7) return false;
            }
            return true;
        }

        function isNotMore(arr, val) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] > val + 1e-7) return false;
            }
            return true;
        }

        function isDecreasingAfterIsIncreasing(arr) {
            let peak = -1;
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i] >= arr[i + 1] - 1e-9) {
                    peak = i;
                    break;
                }
            }
            if (peak === -1 || peak === 0) return false;
            for (let i = peak; i < arr.length - 1; i++) {
                if (arr[i] <= arr[i + 1] + 1e-9) return false;
            }
            return true;
        }

        function isIncreasingAfterIsDecreasing(arr) {
            let valley = -1;
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i] <= arr[i + 1] + 1e-9) {
                    valley = i;
                    break;
                }
            }
            if (valley === -1 || valley === 0) return false;
            for (let i = valley; i < arr.length - 1; i++) {
                if (arr[i] >= arr[i + 1] - 1e-9) return false;
            }
            return true;
        }

        function findMaximums(func, minX, maxX) {
            let maxVal = -Infinity;
            let step = 0.1;
            for (let x = minX; x <= maxX; x += step) {
                let y = func(x);
                if (y > maxVal) maxVal = y;
            }
            return [[0, maxVal]];
        }

        function findMaxInIntervals(intervals) {
            let maxVal = -Infinity;
            let maxIndex = -1;
            for (let i = 0; i < intervals.length; i++) {
                let localMax = intervals[i].maxE();
                if (localMax > maxVal) {
                    maxVal = localMax;
                    maxIndex = i;
                }
            }
            return maxIndex;
        }

        function addUniqueAnsw(was, answ, text) {
            for (let i = 0; i < was.length; i++) {
                if (was[i]) {
                    if (!answ[i].solution.includes(text)) {
                        answ[i].solution.push(text);
                    }
                }
            }
        }

        function answAboutMax(intervals, answ) {
            let max1 = findMaximums(func, 0, 4)[0][1];
            let max2 = findMaximums(func, 4, 8)[0][1];
            if (Math.abs(max1 - max2) > 0.5) {
                let maxIndex = findMaxInIntervals(intervals);
                let wasMax = intervals.map((_, i) => i === maxIndex);
                addUniqueAnsw(wasMax, answ, 'частота пульса достигла максимума за всё время выступления и после него');
            }
        }

        function answAboutNonLess(intervals, answ, value) {
            let wasNonLess = intervals.map(interval => isNotLess(interval, value));
            addUniqueAnsw(wasNonLess, answ, 'частота пульса была не ниже ' + convert(value));
        }

        function answAboutNonMore(intervals, answ, value) {
            let wasNonMore = intervals.map(interval => isNotMore(interval, value));
            addUniqueAnsw(wasNonMore, answ, 'частота пульса была не выше ' + convert(value));
        }

        function answAboutIncreasing(intervals, answ) {
            let wasIncreasing = intervals.map(interval => isIncreasing(interval));
            addUniqueAnsw(wasIncreasing, answ, 'частота пульса росла на всём интервале');
        }

        function answAboutDecreasing(intervals, answ) {
            let wasDecreasing = intervals.map(interval => isDecreasing(interval));
            addUniqueAnsw(wasDecreasing, answ, 'частота пульса падала на всём интервале');
        }

        function answAboutDecreasingDroppedBelow(intervals, answ, below) {
            let wasDecreasing = intervals.map(interval => isDecreasing(interval) && interval.some(value => value < below - 1e-7));
            addUniqueAnsw(wasDecreasing, answ, 'частота пульса упала ниже ' + convert(below));
        }

        function answAboutDecreasingDroppedBelowN(intervals, answ, belowN) {
            let wasDecreasing = intervals.map(interval => isDecreasing(interval) && interval.some(value => value <= belowN + 1e-7));
            addUniqueAnsw(wasDecreasing, answ, 'частота пульса упала до ' + convert(belowN));
        }

        function answAboutIncreasingNonLess(intervals, answ, more) {
            let wasCondition = intervals.map(interval => isIncreasing(interval) && isNotLess(interval, more));
            addUniqueAnsw(wasCondition, answ, 'частота пульса росла на всём интервале и была не ниже ' + convert(more));
        }

        function answAboutMaxMinDelta(intervals, answ) {
            let deltaP = intervals.map(int => int[int.length - 1] - int[0]);

            let maxEI = deltaP.maxE();
            let minED = deltaP.minE();

            let wasMaxRise = intervals.map((_, i) => Math.abs(deltaP[i] - maxEI) < 1e-7);
            let wasMinFall = intervals.map((_, i) => Math.abs(deltaP[i] - minED) < 1e-7);

            if (sl1()) {
                addUniqueAnsw(wasMaxRise, answ, ' наибольший рост частоты пульса');
            } else {
                addUniqueAnsw(wasMinFall, answ, 'наибольшее падение частоты пульса');
            }
        }

        function answAboutDecreasingAfterIncreasing(intervals, answ) {
            let wasCondition = intervals.map(int => isDecreasingAfterIsIncreasing(int));
            addUniqueAnsw(wasCondition, answ, 'частота пульса сначала падала, а затем росла');
        }

        function answAboutIncreasingAfterDecreasing(intervals, answ) {
            let wasCondition = intervals.map(int => isIncreasingAfterIsDecreasing(int));
            addUniqueAnsw(wasCondition, answ, 'частота пульса сначала росла, а затем падала');
        }

        let time = [0].zapMonot(9, 0, 1, 1);
        
        // Генерируем значения пульса так, чтобы были разные характеристики
        let value = [sl(1, 3, 0.5)];
        for (let i = 1; i < time.length; i++) {
            let nextVal = value[i - 1] + sl(-1.5, 1.5, 0.5);
            let tries = 0;
            while (!nextVal.mzhd(1, 5, true)) {
                if (nextVal < 1) nextVal += 0.5;
                if (nextVal > 5) nextVal -= 0.5;
                tries++;
                if (tries > 20) {
                    nextVal = value[i - 1];
                    break;
                }
            }
            value.push(nextVal);
        }

        let func = (x) => {
            for (let i = 0; i < time.length - 1; i++) {
                if (x >= time[i] && x <= time[i + 1]) {
                    let ratio = (x - time[i]) / (time[i + 1] - time[i]);
                    return value[i] + (value[i + 1] - value[i]) * ratio;
                }
            }
            return value[value.length - 1];
        };

        let intervals = Array.from({
            length: 4
        }, (_, i) => {
            let start = i * 2;
            let end = i * 2 + 2;
            let step = 0.1;
            let points = Math.floor((end - start) / step) + 1;
            return Array.from({
                length: points
            }, (_, j) =>
                func(start + j * step)
            );
        });

        let listOfIntervals = Array.from({
            length: 4
        }, (_, i) => {
            let startTime = i * 2;
            let endTime = startTime + 2;
            return {
                expr: startTime + '-' + endTime + ' мин.',
                solution: [],
            };
        });

        let lessV = sl(1, 2);
        let moreV = sl(3, 4);
        let below = slKrome(lessV, 1, 2);

        answAboutMax(intervals, listOfIntervals);
        answAboutNonMore(intervals, listOfIntervals, moreV);
        answAboutNonLess(intervals, listOfIntervals, lessV);
        answAboutIncreasing(intervals, listOfIntervals);
        answAboutDecreasing(intervals, listOfIntervals);
        answAboutIncreasingNonLess(intervals, listOfIntervals, lessV);
        answAboutMaxMinDelta(intervals, listOfIntervals);
        answAboutDecreasingAfterIncreasing(intervals, listOfIntervals);
        answAboutIncreasingAfterDecreasing(intervals, listOfIntervals);
        answAboutDecreasingDroppedBelow(intervals, listOfIntervals, below);
        answAboutDecreasingDroppedBelowN(intervals, listOfIntervals, below);

        listOfIntervals.forEach(item => {
            genAssertNonempty(item.solution, 'Решение не найдено для интервала');
        });

        let solutions = [];
        let items = listOfIntervals.map((item, index) => ({item, index}));
        let success = false;
        for (let attempt = 0; attempt < 10; attempt++) {
            let tempItems = items.slice();
            tempItems.shuffle();
            let tempUsed = new Set();
            let tempSolutions = new Array(4);
            let canAssign = true;
            for (let obj of tempItems) {
                let avail = obj.item.solution.filter(s => !tempUsed.has(s));
                if (avail.length === 0) {
                    canAssign = false;
                    break;
                }
                let chosen = avail.iz();
                tempSolutions[obj.index] = chosen;
                tempUsed.add(chosen);
                obj.item.solution = chosen;
            }
            if (canAssign) {
                success = true;
                solutions = tempSolutions;
                break;
            }
        }
        genAssert(success, 'Не удалось подобрать уникальные решения');

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            ctx.drawGridWithArrows({
                gridWidth: 341,
                gridHeight: 320,
                cellWidth: 40,
                cellHeight: 40,
                stepX: 1,
                stepY: 20,
                maxX: 8,
                minY: 40,
                maxY: 140,
                stepByCeilX: 1,
                arrowLengthX: 7.5,
                arrowLengthY: 5.9,
            });

            ctx.translate(40, 40 * 6);
            ctx.scale(40, -40);
            ctx.lineWidth = 2 / 40;

            let step = 0.1;
            for (let i = 0; i < time.length - 1; i += step) {
                ctx.drawLine(i, func(i), i + step, func(i + step));
            }
        };

        NAtask.setCorrespondenceTask({
            text: 'На графике изображена зависимость частоты пульса гимнаста от времени в течение и после его выступления в вольных упражнениях. На горизонтальной оси отмечено время (в минутах), прошедшее с начала выступления гимнаста, на вертикальной оси – частота пульса (в ударах в минуту).',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь графиком, поставьте в соответствие каждому интервалу времени характеристику пульса гимнаста на этом интервале.',
            analys: listView.join('<br/>'),
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 400,
            paint: paint1,
        });
    }, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=509719
