function brent(func, lowerBound, upperBound, tolerance = 1e-7, maxIterations = 1000) {
    // Значения функции на концах интервала
    let fLower = func(lowerBound), fUpper = func(upperBound);

    // Проверка, что функция имеет разные знаки на концах интервала
    if (fLower * fUpper >= 0) throw new Error("Функция должна иметь разные знаки на концах интервала lowerBound и upperBound");

    // Инициализация переменных
    let previousBound = lowerBound, fPrevious = fLower;
    let intervalWidth = upperBound - lowerBound, lastStep = intervalWidth;

    // Основной цикл
    for (let iteration = 0; iteration < maxIterations; iteration++) {

        // Перестановка границ, чтобы fUpper было ближе к корню (по модулю)
        if (Math.abs(fUpper) > Math.abs(fPrevious)) {
            [lowerBound, upperBound, fLower, fUpper] = [upperBound, lowerBound, fUpper, fLower];
        }

        // Допустимая точность и половина текущего интервала
        let toleranceEffective = 2 * Number.EPSILON * Math.abs(upperBound) + tolerance;
        let midpoint = 0.5 * (previousBound - upperBound);

        // Проверка на достижение необходимой точности
        if (Math.abs(midpoint) <= toleranceEffective || fUpper === 0) return upperBound;

        let step, denominator;
        // Попытка интерполяции, если она возможна
        if (Math.abs(lastStep) >= toleranceEffective && Math.abs(fLower) > Math.abs(fUpper)) {
            if (lowerBound !== previousBound) { // Параболическая интерполяция
                let ratioPrevious = fUpper / fPrevious, ratioLower = fUpper / fLower, ratioCombined = fLower / fPrevious;
                step = ratioLower * (2 * midpoint * ratioPrevious * (ratioPrevious - ratioCombined) - (upperBound - lowerBound) * (ratioPrevious - 1));
                denominator = (ratioPrevious - 1) * (ratioCombined - 1) * (ratioLower - 1);
            } else { // Метод секущих
                step = 2 * midpoint * fUpper / (fLower - fUpper);
                denominator = 1;
            }

            // Проверка на правильность направления шага
            if (step > 0) denominator = -denominator;
            step = Math.abs(step);

            // Проверка разумности интерполяции, если нет - используем бисекцию
            if (2 * step >= Math.abs(lastStep * denominator) || step >= Math.abs(3 * midpoint * denominator - toleranceEffective * denominator)) {
                step = midpoint;
                denominator = 1; // Переход к методу бисекции
            }
        } else {
            // Если интерполяция невозможна, используем бисекцию
            step = midpoint;
            denominator = 1;
        }

        // Обновляем переменные для следующей итерации
        lastStep = intervalWidth;
        intervalWidth = step / denominator;
        lowerBound = upperBound;
        fLower = fUpper;

        // Выбираем новое значение upperBound для приближения корня
        upperBound += Math.abs(intervalWidth) > toleranceEffective ? intervalWidth : Math.sign(midpoint) * toleranceEffective;
        fUpper = func(upperBound);

        // Если знаки функции на концах интервала совпадают, обновляем границу previousBound
        if (fUpper * fPrevious > 0) {
            previousBound = lowerBound;
            fPrevious = fLower;
        }
    }

    // Исключение, если не удалось найти корень за maxIterations итераций
    throw new Error("Превышено максимальное количество итераций");
}
function roots(f, intervalStart, intervalEnd, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    const roots = [];
    let current = intervalStart;

    // Проход по интервалу с шагом stepSize
    while (current < intervalEnd) {
        let next = current + stepSize;
        if (next > intervalEnd) next = intervalEnd; // Обработка последнего шага

        // Проверяем, есть ли смена знака на подотрезке [current, next]
        let fCurrent = f(current);
        let fNext = f(next);

        if (fCurrent * fNext <= 0) {
            // Если есть смена знака, значит, есть корень в этом интервале
            try {
                let root = brent(f, current, next, tolerance, maxIterations);
                // Добавляем корень, если его ещё нет в списке (во избежание дублирования)
                if (!roots.some(r => Math.abs(r - root) < tolerance)) {
                    roots.push(root);
                }
            } catch (error) {
                console.error(`Не удалось найти корень на интервале [${current}, ${next}]: ${error.message}`);
            }
        }
        current = next;
    }

    return roots;
}
function intPoints(f, o) {
    if (o.step === undefined) {
        o.minX = o.minX.ceil();
        o.maxX = o.maxX.floor();
        o.step = 1;
    }
    let XY = [];
    for (let i = o.minX; i < o.maxX; i += o.step) {
        if (f(i).isZ() && f(i) <= o.maxY && f(i) >= o.minY) {
            XY.push([i, f(i)]);
        }
    }
    return XY;
}
function findIntegerPointsInInterval(interval, minX, maxX, includeMinX = false, includeMaxX = false) {
    let points = [];
    let start = Math.max(Math.ceil(interval[0]), minX);
    let end = Math.min(Math.floor(interval[1]), maxX);

    for (let i = start; i <= end; i++) {
        points.push(i);
    }

    // Убираем minX из найденных точек, если includeMinX = false
    if (!includeMinX && Number.isInteger(minX)) {
        points = points.filter(point => point !== minX);
    }

    // Убираем maxX из найденных точек, если includeMaxX = false
    if (!includeMaxX && Number.isInteger(maxX)) {
        points = points.filter(point => point !== maxX);
    }

    return points;
}
//экстремумы
function findExtremumsOfFunction(func, minX, maxX, step = 0.001, boundaryPointIsMax = false, boundaryPointIsMin = false) {
    //Возвращает объект с полями minP, maxP, где каждый массив с координатами минимумов функции и максмимумов соответсвенно
    //func - функция типа func(x)
    //minX,maxX - границы поиска экстремумов функции
    //step - шаг
    //boundaryPointIsMax - необходимо ли включить границы в максимумы
    //boundaryPointIsMin - необходимо ли включить границы в минимумы

    let funcMin = func(minX);
    let funcMax = func(maxX);

    let maximums = [];
    if (boundaryPointIsMax) {
        if (funcMin > func(minX + step))
            maximums.push([minX, funcMin]);
        if (funcMax > func(maxX - step))
            maximums.push([maxX, funcMax]);
    }

    let minimums = [];
    if (boundaryPointIsMin) {
        if (funcMin < func(minX + step))
            minimums.push([minX, funcMin]);
        if (funcMax < func(maxX - step))
            minimums.push([maxX, funcMax]);
    }

    let funcNext = func(minX + 2 * step);
    let funcI = func(minX + step);
    let funcPrevious = func(minX);

    for (let i = minX + step; i < maxX; i += step) {

        if (funcI < funcPrevious && funcI < funcNext)
            minimums.push([i, funcI]);
        if (funcI > funcPrevious && funcI > funcNext)
            maximums.push([i, funcI]);

        funcPrevious = funcI;
        funcI = funcNext;
        funcNext = func(i + 2 * step);
    }

    return {
        minP: minimums,
        maxP: maximums
    };
}
//интервалы убывания и возрастания
function findIntervalsOfIncreaseAndDecrease(func, minX, maxX, extremums) {
    let increasingIntervals = [];
    let decreasingIntervals = [];

    // Сортируем экстремумы по x
    let allExtremums = [...extremums.minP, ...extremums.maxP].sort((a, b) => a[0] - b[0]);

    // Добавляем границы в список экстремумов
    allExtremums.unshift([minX, func(minX)]);
    allExtremums.push([maxX, func(maxX)]);

    // Проходим по всем экстремумам и определяем интервалы
    for (let i = 0; i < allExtremums.length - 1; i++) {
        let x1 = allExtremums[i][0];
        let x2 = allExtremums[i + 1][0];
        let y1 = allExtremums[i][1];
        let y2 = allExtremums[i + 1][1];

        if (y1 < y2) {
            increasingIntervals.push([x1, x2]);
        } else {
            decreasingIntervals.push([x1, x2]);
        }
    }

    return {
        increasingIntervals: increasingIntervals,
        decreasingIntervals: decreasingIntervals
    };
}
//интервалы убывания
function findDecreasingIntervals(func, minX, maxX, step = 0.001, tolerance = 1e-7, maxIterations = 1000) {
    const extremums = findExtremumsOfFunction(func, minX, maxX, step, false, false);
    const intervals = findIntervalsOfIncreaseAndDecrease(func, minX, maxX, extremums);
    const decreasingIntervals = intervals.decreasingIntervals;

    return decreasingIntervals;
}
//интервалы возрастания
function findIncreasingIntervals(func, minX, maxX, step = 0.001, tolerance = 1e-7, maxIterations = 1000) {
    const extremums = findExtremumsOfFunction(func, minX, maxX, step, false, false);
    const intervals = findIntervalsOfIncreaseAndDecrease(func, minX, maxX, extremums);
    const increasingIntervals = intervals.increasingIntervals;

    return increasingIntervals;
}
//целые точки на интервалах убывания и возрастания
function findIncreasingAndDecreasingPoints(intervals, minX, maxX, includeMinX = false, includeMaxX = false) {
    let increasingPoints = [];
    let decreasingPoints = [];

    // Проходим по всем интервалам возрастания и добавляем целые точки в increasingPoints
    for (let interval of intervals.increasingIntervals) {
        let points = findIntegerPointsInInterval(interval, minX, maxX, includeMinX, includeMaxX);
        increasingPoints.push(...points);
    }

    // Проходим по всем интервалам убывания и добавляем целые точки в decreasingPoints
    for (let interval of intervals.decreasingIntervals) {
        let points = findIntegerPointsInInterval(interval, minX, maxX, includeMinX, includeMaxX);
        decreasingPoints.push(...points);
    }

    return {
        increasingPoints: increasingPoints,
        decreasingPoints: decreasingPoints
    };
}
//целые точки на интервалах убывания
function findDecreasingIntegerPoints(func, intervalStart, intervalEnd, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    const decreasingIntervals = findDecreasingIntervals(func, intervalStart, intervalEnd, stepSize, tolerance, maxIterations);
    let decreasingIntegerPoints = [];

    for (let interval of decreasingIntervals) {
        let points = findIntegerPointsInInterval(interval, intervalStart, intervalEnd);
        decreasingIntegerPoints.push(...points);
    }

    return decreasingIntegerPoints;
}
//целые точки на интервалах возрастания
function findIncreasingIntegerPoints(func, intervalStart, intervalEnd, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    const increasingIntervals = findIncreasingIntervals(func, intervalStart, intervalEnd, stepSize, tolerance, maxIterations);
    let increasingIntegerPoints = [];

    for (let interval of increasingIntervals) {
        let points = findIntegerPointsInInterval(interval, intervalStart, intervalEnd);
        increasingIntegerPoints.push(...points);
    }

    return increasingIntegerPoints;
}
//интервалы отрицательные и положительные
function findPositiveAndNegativeIntervals(f, minX, maxX, roots, includeMinX = false, includeMaxX = false) {
    let positiveIntervals = [];
    let negativeIntervals = [];
    let prevX = includeMinX ? minX : (Number.isInteger(minX) ? minX + 1 : minX);
    let prevSign = f(prevX) > 0 ? 1 : -1;

    for (let i = 0; i < roots.length; i++) {
        let root = roots[i];
        let x = includeMaxX && i === roots.length - 1 ? maxX : root;
        let sign = f(x) > 0 ? 1 : -1;

        if (sign !== prevSign) {
            positiveIntervals.push([prevX, x]);
            negativeIntervals.push([prevX, x]);
            prevSign = sign;
        }

        prevX = x;
    }

    return { positiveIntervals, negativeIntervals };
}
//интервалы отрицательные
function findNegativeIntervals(func, minX, maxX, step = 0.001, tolerance = 1e-7, maxIterations = 1000) {
    const roots = roots(func, minX, maxX, step, tolerance, maxIterations);
    const intervals = findPositiveAndNegativeIntervals(func, minX, maxX, roots, false, false);
    const negativeIntervals = intervals.negativeIntervals;

    return negativeIntervals;
}
//интервалы положительные
function findPositiveIntervals(func, minX, maxX, step = 0.001, tolerance = 1e-7, maxIterations = 1000) {
    const roots = roots(func, minX, maxX, step, tolerance, maxIterations);
    const intervals = findPositiveAndNegativeIntervals(func, minX, maxX, roots, false, false);
    const positiveIntervals = intervals.positiveIntervals;

    return positiveIntervals;
}

//целые точки на интервалах отрицательных и положительных
function findPositiveAndNegativePoints(intervals, minX, maxX, includeMinX = false, includeMaxX = false) {
    let positivePoints = [];
    let negativePoints = [];

    // Проходим по всем интервалам возрастания и добавляем целые точки в positivePoints
    for (let interval of intervals.positiveIntervals) {
        let points = findIntegerPointsInInterval(interval, minX, maxX, includeMinX, includeMaxX);
        positivePoints.push(...points);
    }

    // Проходим по всем интервалам убывания и добавляем целые точки в negativePoints
    for (let interval of intervals.negativeIntervals) {
        let points = findIntegerPointsInInterval(interval, minX, maxX, includeMinX, includeMaxX);
        negativePoints.push(...points);
    }

    return {
        positivePoints: positivePoints,
        negativePoints: negativePoints
    };
}
//целые точки на интервалах отрицательных
function findNegativeIntegerPoints(func, intervalStart, intervalEnd, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    const roots = roots(func, intervalStart, intervalEnd, stepSize, tolerance, maxIterations);
    const intervals = findPositiveAndNegativeIntervals(func, intervalStart, intervalEnd, roots, false, false);
    const points = findPositiveAndNegativePoints(intervals, intervalStart, intervalEnd);

    return points.negativePoints;
}
//целые точки на интервалах положительных
function findPositiveIntegerPoints(func, intervalStart, intervalEnd, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    const roots = roots(func, intervalStart, intervalEnd, stepSize, tolerance, maxIterations);
    const intervals = findPositiveAndNegativeIntervals(func, intervalStart, intervalEnd, roots, false, false);
    const points = findPositiveAndNegativePoints(intervals, intervalStart, intervalEnd);

    return points.positivePoints;
}

try {
    global.brent = module.exports.brent = brent;
    global.roots = module.exports.roots = roots;
    global.intPoints = module.exports.intPoints = intPoints;
    global.findIntegerPointsInInterval = module.exports.findIntegerPointsInInterval = findIntegerPointsInInterval;
    global.findExtremumsOfFunction = module.exports.findExtremumsOfFunction = findExtremumsOfFunction;
    global.findIntervalsOfIncreaseAndDecrease = module.exports.findIntervalsOfIncreaseAndDecrease = findIntervalsOfIncreaseAndDecrease;
    global.findDecreasingIntervals = module.exports.findDecreasingIntervals = findDecreasingIntervals;
    global.findIncreasingIntervals = module.exports.findIncreasingIntervals = findIncreasingIntervals;
    global.findIncreasingAndDecreasingPoints = module.exports.findIncreasingAndDecreasingPoints = findIncreasingAndDecreasingPoints;
    global.findDecreasingIntegerPoints = module.exports.findDecreasingIntegerPoints = findDecreasingIntegerPoints;
    global.findIncreasingIntegerPoints = module.exports.findIncreasingIntegerPoints = findIncreasingIntegerPoints;
    global.findPositiveAndNegativeIntervals = module.exports.findPositiveAndNegativeIntervals = findPositiveAndNegativeIntervals;
    global.findNegativeIntervals = module.exports.findNegativeIntervals = findNegativeIntervals;
    global.findPositiveIntervals = module.exports.findPositiveIntervals = findPositiveIntervals;
    global.findPositiveAndNegativePoints = module.exports.findPositiveAndNegativePoints = findPositiveAndNegativePoints;
    global.findNegativeIntegerPoints = module.exports.findNegativeIntegerPoints = findNegativeIntegerPoints;
    global.findPositiveIntegerPoints = module.exports.findPositiveIntegerPoints = findPositiveIntegerPoints;
} catch (e) {
}
