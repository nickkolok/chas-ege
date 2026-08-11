(function () {
    'use strict';
    retryWhileError(function () {
        /* На рисунке точками изображено число родившихся мальчиков и девочек (по отдельности) за каждый календарный месяц 2013 года в городском роддоме. По горизонтали указываются месяцы, по вертикали – число рождений. Для наглядности точки соединены линиями. */

        function answAboutMax(intervals, answ, flag) {
            let maxIndex = findMaxInIntervals(intervals, [valueM, valueW][flag]);
            let genderMax = gender[flag].rm;
            let wasMax = intervals.map((_, i) => i === maxIndex);
            addUniqueAnsw(wasMax, answ, 'рождаемость ' + genderMax + ' достигла максимума за весь год');
        }

        function answAboutMin(intervals, answ, flag) {
            let minIndex = findMinInIntervals(intervals, [valueM, valueW][flag]);
            let genderMin = gender[flag].rm;
            let wasMin = intervals.map((_, i) => i === minIndex);
            addUniqueAnsw(wasMin, answ, 'рождаемость ' + genderMin + ' достигла минимума за весь год');
        }

        function answAboutConst(intervals, answ, flag) {
            let wasConst = intervals.map(interval => {
                let indexes = indexConst(interval);
                return indexes.length === 3;
            });
            let wasConstTwoFirst = intervals.map(interval => {
                let indexes = indexConst(interval);
                return indexes.length === 2 && indexes.includes(0);
            });
            let wasConstTwoLast = intervals.map(interval => {
                let indexes = indexConst(interval);
                return indexes.length === 2 && !indexes.includes(0);
            });

            let genderConst = gender[flag].rm;

            if (sl1()) {
                addUniqueAnsw(wasConstTwoFirst, answ, 'рождаемость ' + genderConst + ' в течение первого и второго месяцев этого периода была одинаковой');
            } else {
                addUniqueAnsw(wasConstTwoLast, answ, 'рождаемость ' + genderConst + ' в течение второго и третьего месяцев этого периода была одинаковой');
            }
            addUniqueAnsw(wasConst, answ, 'рождаемость ' + genderConst + ' в течение всех трёх месяцев была одинаковой');
        }

        function answAboutIncreasing(intervals, answ, flag) {
            let wasIncreasing = intervals.map(interval => isIncreasing(interval));
            let genderI = gender[flag].rm;
            addUniqueAnsw(wasIncreasing, answ, 'в течение этого периода рождаемость ' + genderI + ' только росла');
        }

        function answAboutDecreasing(intervals, answ, flag) {
            let wasDecreasing = intervals.map(interval => isDecreasing(interval));
            let genderD = gender[flag].rm;
            addUniqueAnsw(wasDecreasing, answ, 'в течение этого периода рождаемость ' + genderD + ' только снижалась');
        }

        function answAboutWasMoreOrLess(intervals, answ, flag) {
            let wasMore = intervals[flag].map((interval, i) => interval.every((val, j) => val > intervals[1 - flag][i][j]));

            addUniqueAnsw(wasMore, answ, 'в каждом месяце этого периода ' + gender[flag].rm + ' рождалось больше, чем ' + gender[1 - flag].rm);
        }
        
        function answAboutDeltaMW(intervals, answ, delta) {
            let deltas = intervals[0].map((interval, i) => interval.every((val, j) => (val - intervals[1][i][j]).abs() <= delta));
            
            addUniqueAnsw(deltas, answ, 'в каждый месяц этого периода число рождений девочек и мальчиков различалось не более чем на ' + delta*5);
        }
        
        function answAboutDeltaMWOneMonth(intervals, answ, delta) {
            let deltas = intervals[0].map((interval, i) => {
                let differences = interval.map((val, j) => (val - intervals[1][i][j]).abs());
                let hasSignificant = differences.some(diff => diff >= delta);
                let allSignificant = differences.every(diff => diff >= delta);

                return hasSignificant && !allSignificant;
            });

            addUniqueAnsw(deltas, answ, 'в один из месяцев этого периода число рождений мальчиков и девочек различалось более чем на ' + delta * 5);
        }

        let month = om.months;
        let monthView = month.map(m => m.slice(0, 3));
        let year = sl(2001, 2024);
        let gender = sklonlxkand(['мальчик', 'девочка']);

        let time = [0].zapMonot(12, 0, 1, 1); // шкала времени
        let valueM = [sl(1, 6)]; // шкала рождаемости мальчиков
        let valueW = [slKrome(valueM[0], 1, 6)]; // шкала рождаемости девочек
        let count = sl1();

        for (; valueM.length !== time.length;) {
            let lastValue = valueM[valueM.length - 1];
            let newValue = [0, 0, 0, 0, 1].iz() ? lastValue : lastValue + sl(0.5, 2, 0.3) * (-1).pow(count);
            if (newValue.mzhd(1, 8, true) && sl1())
                valueM.push(newValue);
            else
                count++;
        }

        for (; valueW.length !== time.length;) {
            let lastValue = valueM[valueW.length];
            let newValue = [0, 0, 1].iz() ? lastValue : lastValue + sl(1, 2, 0.3).pm();
            if (newValue.mzhd(1, 8, true) && (newValue - valueM[valueW.length]).abs() > 0.5)
                valueW.push(newValue);
        }

        let intervalsM = Array.from({
            length: 4
        }, (_, i) =>
            valueM.slice(i * 3, i * 3 + 3));

        let intervalsW = Array.from({
            length: 4
        }, (_, i) =>
            valueW.slice(i * 3, i * 3 + 3));

        let listOfIntervals = intervalsM.map((interval, i) => {
            return {
                expr: `${month[i * 3]}-${month[i * 3 + 2]}`,
                solution: ['']
            };
        });

        let intervals = [intervalsM, intervalsW];
        let flagConst = sl1();
        answAboutConst(intervals[flagConst], listOfIntervals, flagConst);
        let flagMax = sl1();
        answAboutMax(intervals[flagMax], listOfIntervals, flagMax);
        let flagMin = sl1();
        answAboutMin(intervals[flagMin], listOfIntervals, flagMin);
        let flagInc = sl1();
        answAboutIncreasing(intervals[flagInc], listOfIntervals, flagInc);
        let flagDec = sl1();
        answAboutDecreasing(intervals[flagDec], listOfIntervals, flagDec);
        let flagML = sl1();
        answAboutWasMoreOrLess(intervals, listOfIntervals, flagML);
        let delta = sl(1,2);
        answAboutDeltaMW(intervals, listOfIntervals, delta);
        let deltaMore = sl(2,3);
        answAboutDeltaMWOneMonth(intervals, listOfIntervals, deltaMore);
        

        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            let scale = 40;
            ctx.drawGridWithArrows({
                gridWidth: 460,
                gridHeight: 440,
                cellWidth: scale,
                cellHeight: scale,
                stepX: 1,
                stepY: 5,
                typeX: 'custom',
                labelsX: monthView,
                minY: 90,
                maxY: 130,
                stepByCeilX: 1,
                arrowLengthX: 10.5,
                arrowLengthY: 8.9,
            });

            ctx.translate(scale, scale * 9);
            ctx.scale(scale, -scale);
            ctx.lineWidth = 2 / scale;

            for (let i = 0; i < time.length; i++) {
                ctx.drawFilledCircle(time[i], valueM[i], 3 / scale);
                if (i < time.length - 1)
                    ctx.drawLine(time[i], valueM[i], time[i + 1], valueM[i + 1]);
            }

            ctx.setLineDash([8 / scale, 5 / scale]);
            for (let i = 0; i < time.length; i++) {
                ctx.drawFilledCircle(time[i], valueW[i], 3 / scale);
                if (i < time.length - 1)
                    ctx.drawLine(time[i], valueW[i], time[i + 1], valueW[i + 1]);
            }
        };

        NAtask.setCorrespondenceTask({
            text: `На рисунке точками изображено число родившихся мальчиков и девочек (по отдельности) за каждый календарный месяц ${year} года в городском роддоме. По горизонтали указываются месяцы, по вертикали – число рождений. Для наглядности точки соединены линиями (пунктирной — девочки, сплошной — мальчики).`,
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь рисунком, поставьте в соответствие каждому из указанных периодов времени характеристику рождаемости в этот период.',
            analys: listView.join('<br/>')
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 400,
            paint: paint1,
        });
    }, 2000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=506337
