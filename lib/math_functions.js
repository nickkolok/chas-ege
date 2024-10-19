function brent(func, lowerBound, upperBound, tolerance = 1e-7, maxIterations = 1000) {
    let fLower = func(lowerBound), fUpper = func(upperBound);

    if (fLower * fUpper >= 0) throw new Error("Function must have different signs at lowerBound and upperBound");

    let previousBound = lowerBound, fPrevious = fLower;
    let intervalWidth = upperBound - lowerBound, lastStep = intervalWidth;

    for (let iteration = 0; iteration < maxIterations; iteration++) {
        if (Math.abs(fUpper) > Math.abs(fPrevious)) {
            [lowerBound, upperBound, fLower, fUpper] = [upperBound, lowerBound, fUpper, fLower];
        }

        let toleranceEffective = 2 * Number.EPSILON * Math.abs(upperBound) + tolerance;
        let midpoint = 0.5 * (previousBound - upperBound);

        if (Math.abs(midpoint) <= toleranceEffective || fUpper === 0) return upperBound;

        let step, denominator;
        if (Math.abs(lastStep) >= toleranceEffective && Math.abs(fLower) > Math.abs(fUpper)) {
            if (lowerBound !== previousBound) {
                let ratioPrevious = fUpper / fPrevious, ratioLower = fUpper / fLower, ratioCombined = fLower / fPrevious;
                step = ratioLower * (2 * midpoint * ratioPrevious * (ratioPrevious - ratioCombined) - (upperBound - lowerBound) * (ratioPrevious - 1));
                denominator = (ratioPrevious - 1) * (ratioCombined - 1) * (ratioLower - 1);
            } else {
                step = 2 * midpoint * fUpper / (fLower - fUpper);
                denominator = 1;
            }

            if (step > 0) denominator = -denominator;
            step = Math.abs(step);

            if (2 * step >= Math.abs(lastStep * denominator) || step >= Math.abs(3 * midpoint * denominator - toleranceEffective * denominator)) {
                step = midpoint;
                denominator = 1;
            }
        } else {
            step = midpoint;
            denominator = 1;
        }

        lastStep = intervalWidth;
        intervalWidth = step / denominator;
        lowerBound = upperBound;
        fLower = fUpper;

        upperBound += Math.abs(intervalWidth) > toleranceEffective ? intervalWidth : Math.sign(midpoint) * toleranceEffective;
        fUpper = func(upperBound);

        if (fUpper * fPrevious > 0) {
            previousBound = lowerBound;
            fPrevious = fLower;
        }
    }
    throw new Error("Превышено максимальное количество итераций");
}
function isCloseToInteger(value, tolerance) {
    return Math.abs(value - Math.round(value)) <= tolerance;
}
function findRoots(func, minX, maxX, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    let roots = [];
    let current = minX;

    while (current < maxX) {
        let next = Math.min(current + stepSize, maxX);

        let fCurrent = func(current);
        let fNext = func(next);

        if (fCurrent * fNext <= 0) {
            try {
                let root = brent(func, current, next, tolerance, maxIterations);
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
function intPoints(func, o) {
    if (o.step === undefined) {
        o.minX = Math.ceil(o.minX);
        o.maxX = Math.floor(o.maxX);
        o.step = 1;
    }
    let XY = [];
    for (let i = o.minX; i < o.maxX; i += o.step) {
        let funcValue = func(i);
        if (Number.isInteger(funcValue) && funcValue <= o.maxY && funcValue >= o.minY) {
            XY.push([i, funcValue]);
        }
    }
    return XY;
}

function intPointsWithTolerance(func, o) {
    if (o.step === undefined) {
        o.minX = Math.ceil(o.minX);
        o.maxX = Math.floor(o.maxX);
        o.step = 1;
    }
    let XY = [];
    for (let i = o.minX; i <= o.maxX; i += o.step) {
        let funcValue = func(i);
        if (isCloseToInteger(funcValue, o.tolerance) && funcValue <= o.maxY && funcValue >= o.minY) {
            XY.push([i, funcValue]);
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
function findPointsInIntervals(points, interval, includeMinX = false, includeMaxX = false) {
    const [start, end] = interval;
    return points.filter(point =>
        (includeMinX ? point >= start : point > start) &&
        (includeMaxX ? point <= end : point < end)
    );
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
function findAllExtremumsOfFunctionSort(func, minX, maxX, step = 0.001, boundaryPointIsMax = false, boundaryPointIsMin = false) {
    let extremums = findExtremumsOfFunction(func, minX, maxX, step, boundaryPointIsMax, boundaryPointIsMin);
    let allExtremums = [...extremums.minP, ...extremums.maxP].sort((a, b) => a[0] - b[0]);

    return allExtremums;
}

function findIntExtremumsOfFunction(func, minX, maxX, toleranceValue = 0.2, step = 0.001, boundaryPointIsMax = false, boundaryPointIsMin = false) {
    let extremums = findExtremumsOfFunction(func, minX, maxX, step, boundaryPointIsMax, boundaryPointIsMin);
    let minimumsInt = [];
    let maximumsInt = [];

    extremums.minP.forEach(extremum => {
        if (isCloseToInteger(extremum[0], toleranceValue)) {
            minimumsInt.push([extremum[0], extremum[1]]);
        }
    });

    extremums.maxP.forEach(extremum => {
        if (isCloseToInteger(extremum[0], toleranceValue)) {
            maximumsInt.push([extremum[0], extremum[1]]);
        }
    });

    return {
        minP: minimumsInt,
        maxP: maximumsInt
    };
}

function extremumsX(func, minX, maxX, step = 0.001, boundaryPointIsMax = false, boundaryPointIsMin = false) {
    return findAllExtremumsOfFunctionSort(func, minX, maxX, step, boundaryPointIsMax, boundaryPointIsMin).map(extremum => extremum[0]);
}
function extremumsY(func, minX, maxX, step = 0.001, boundaryPointIsMax = false, boundaryPointIsMin = false) {
    return findAllExtremumsOfFunctionSort(func, minX, maxX, step, boundaryPointIsMax, boundaryPointIsMin).map(extremum => extremum[1]);
}

function transformExtremumsToIntervals(func, minX, maxX, endSegmentIsNotExtremum = false) {
    let allExtremumsX = extremumsX(func, minX, maxX);
    let intExtremums = allExtremumsX.map(elem => elem.round());
    let maximums = maximumsX(func, minX, maxX)
    let minimums = minimumsX(func, minX, maxX)

    let intIntervalsMinimums = [];
    let intIntervalsMaximums = [];

    allExtremumsX.forEach((extremum, i) => {
        let leftEnd, rightEnd;

        switch (i) {
            case 0:
                leftEnd = minX + 1;
                rightEnd = Math.round(allExtremumsX[i + 1] - 1);
                break;
            case allExtremumsX.length - 1:
                leftEnd = Math.round(allExtremumsX[i - 1] + 1);
                rightEnd = maxX - 1;
                break;
            default:
                leftEnd = Math.round(allExtremumsX[i] + 1);
                rightEnd = Math.round(allExtremumsX[i + 1] - 1);
        }

        if (endSegmentIsNotExtremum) {
            if (intExtremums.includes(leftEnd) && extremumsX(func, (leftEnd + 1), rightEnd).length > 0) {
                leftEnd += 1;
            }
            if (intExtremums.includes(rightEnd) && extremumsX(func, leftEnd, (rightEnd - 1)).length > 0) {
                rightEnd -= 1;
            }
        }

        if (leftEnd != rightEnd) {
            if (maximums.includes(extremum)) {
                intIntervalsMaximums.push({ leftEnd, ext: extremum, rightEnd });
            }
            if (minimums.includes(extremum)) {
                intIntervalsMinimums.push({ leftEnd, ext: extremum, rightEnd });
            }
        }
    });

    return { intIntervalsMinimums, intIntervalsMaximums };
}

function findMinimums(func, minX, maxX) {
    let extremums = findExtremumsOfFunction(func, minX, maxX);
    let minimums = extremums.minP;

    return minimums;
}

function findMaximums(func, minX, maxX) {
    let extremums = findExtremumsOfFunction(func, minX, maxX);
    let maximums = extremums.maxP;

    return maximums;
}

function minimumsX(func, minX, maxX) {
    return findMinimums(func, minX, maxX).map(point => point[0]);
}

function maximumsX(func, minX, maxX) {
    return findMaximums(func, minX, maxX).map(point => point[0]);
}
//интервалы убывания и возрастания
function findIntervalsOfIncreaseAndDecrease(func, minX, maxX) {
    let allExtremums = findAllExtremumsOfFunctionSort(func, minX, maxX)
    let increasingIntervals = [];
    let decreasingIntervals = [];

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
    let intervals = findIntervalsOfIncreaseAndDecrease(func, minX, maxX);
    let decreasingIntervals = intervals.decreasingIntervals;

    return decreasingIntervals;
}
//интервалы возрастания
function findIncreasingIntervals(func, minX, maxX, step = 0.001, tolerance = 1e-7, maxIterations = 1000) {
    let intervals = findIntervalsOfIncreaseAndDecrease(func, minX, maxX);
    let increasingIntervals = intervals.increasingIntervals;

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
function findDecreasingIntegerPoints(func, minX, maxX, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    let decreasingIntervals = findDecreasingIntervals(func, minX, maxX, stepSize, tolerance, maxIterations);
    let decreasingIntegerPoints = [];

    for (let interval of decreasingIntervals) {
        let points = findIntegerPointsInInterval(interval, minX, maxX);
        decreasingIntegerPoints.push(...points);
    }

    return decreasingIntegerPoints;
}
//целые точки на интервалах возрастания
function findIncreasingIntegerPoints(func, minX, maxX, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    let increasingIntervals = findIncreasingIntervals(func, minX, maxX, stepSize, tolerance, maxIterations);
    let increasingIntegerPoints = [];

    for (let interval of increasingIntervals) {
        let points = findIntegerPointsInInterval(interval, minX, maxX);
        increasingIntegerPoints.push(...points);
    }

    return increasingIntegerPoints;
}
//интервалы отрицательные и положительные
function findPositiveAndNegativeIntervals(func, minX, maxX, includeMinX = false, includeMaxX = false) {
    let roots = findRoots(func, minX, maxX); // Calculate roots internally

    let positiveIntervals = [];
    let negativeIntervals = [];
    let prevX = includeMinX ? minX : (Number.isInteger(minX) ? minX + 1 : minX);
    let prevSign = func(prevX) > 0 ? 1 : -1;

    for (let i = 0; i < roots.length; i++) {
        let root = roots[i];
        let x = includeMaxX && i === roots.length - 1 ? maxX : root;
        let sign = func(x) > 0 ? 1 : -1;

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
    let roots = findRoots(func, minX, maxX, step, tolerance, maxIterations);
    let intervals = findPositiveAndNegativeIntervals(func, minX, maxX, roots, false, false);
    let negativeIntervals = intervals.negativeIntervals;

    return negativeIntervals;
}
//интервалы положительные
function findPositiveIntervals(func, minX, maxX, step = 0.001, tolerance = 1e-7, maxIterations = 1000) {
    let roots = findRoots(func, minX, maxX, step, tolerance, maxIterations);
    let intervals = findPositiveAndNegativeIntervals(func, minX, maxX, roots, false, false);
    let positiveIntervals = intervals.positiveIntervals;

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
function findNegativeIntegerPoints(func, minX, maxX, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    let roots = findRoots(func, minX, maxX, stepSize, tolerance, maxIterations);
    let intervals = findPositiveAndNegativeIntervals(func, minX, maxX, roots, false, false);
    let points = findPositiveAndNegativePoints(intervals, minX, maxX);

    return points.negativePoints;
}
function findPositiveIntegerPoints(func, minX, maxX, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    let roots = findRoots(func, minX, maxX, stepSize, tolerance, maxIterations);

    let intervals = findPositiveAndNegativeIntervals(func, minX, maxX, roots, false, false);
    let points = findPositiveAndNegativePoints(intervals, minX, maxX);

    return points.positivePoints;
}

function addRoots(X, Y, rootsIsInteger) {
    let newX = X.slice();
    let newY = Y.slice();
    let rootX;
    for (let i = 1; i < Y.length; i++) {
        if ((Y[i] >= 0 && Y[i - 1] < 0) || (Y[i] < 0 && Y[i - 1] >= 0)) {
            rootX = (X[i - 1] + 0.5 * (X[i] - X[i - 1])).round();
            rootX += (rootsIsInteger.int) ? 0 : rootsIsInteger.tolerance.pm();
            newX.splice(i, 0, rootX);
            newY.splice(i, 0, 0);
        }
    }
    let sortedData = newX.map((value, index) => ({ x: value, y: newY[index] })).sort((a, b) => a.x - b.x);
    newX = sortedData.map(data => data.x);
    newY = sortedData.map(data => data.y);


    return { X: newX, Y: newY };
}

function createSpline({ type, minX, maxX, minY, maxY, stepForX = 1, stepForY = 1, extremumsIsInteger = { int: 'no_matter', tolerance: 0.2 }, rootsIsInteger = { int: 'no_matter', tolerance: 0.2 },
    minimumDifferenceBetweenExtremes = 1, numberOfExtremes = { min: 0, max: 1000 }, numberOfRoots = { min: 0, max: 1000 }, monotoneFunction = false,
}) {
    let X = [];
    let Y = [];

    let maxMin = sl1();

    for (let i = minX; i <= maxX; i += stepForX * 0.5) {
        X.push(i);
    }

    Y.push(slKrome(0, minY + 0.1, maxY - 0.1, stepForY));
    for (let i = 1; i < X.length; i++) {
        let sigh = monotoneFunction ? (-1).pow(maxMin) : (-1).pow(i + maxMin);
        let deltaY = sl(minY - Y[i - 1] + 0.1, maxY - Y[i - 1] - 0.1, stepForY)
        let y = Y[i - 1] + sigh * deltaY;
        Y.push(0.5 * y, y, 0.5 * y);
    }
    Y = Y.slice(0, X.length);

    ({ X, Y } = addRoots(X, Y, rootsIsInteger, stepForX));

    let spline = new Spline(X, Y);
    let func = (x) => spline.at(x);
    let painFunc;
    switch (type) {
        case 'derivative':
            painFunc = (x) => 1000 * (spline.at(x + 0.001) - spline.at(x - 0.001));
            break;
        case 'function':
        default:
            painFunc = (x) => spline.at(x);
            break;
    }

    genAssert(painFunc(maxX) < maxY && painFunc(maxX) > minY, 'Функция вышла за пределы сетки с правого конца');
    genAssert(painFunc(minX) < maxY && painFunc(minX) > minY, 'Функция вышла за пределы сетки с левого конца');
    genAssert(painFunc(maxX).abs() > 0.5, 'Функция заканчивается нулём');
    genAssert(painFunc(minX).abs() > 0.5, 'Функция начинается нулём');

    let extX = extremumsX(painFunc, minX, maxX);
    genAssert(extX.length >= numberOfExtremes.min, 'Минимальное количество экстремумов ' + numberOfExtremes.min);
    genAssert(extX.length <= numberOfExtremes.max, 'Максимальное количество экстремумов ' + numberOfExtremes.max);
    extX.forEach((elem) => genAssert((elem - minX).abs() > 1, 'Экстремум слишком близко к левому концу по x'));
    extX.forEach((elem) => genAssert((elem - maxX).abs() > 1, 'Экстремум слишком близко к правому концу по x'));

    switch (extremumsIsInteger.int) {
        case 'yes':
            extX.forEach((elem) => {
                genAssert(isCloseToInteger(elem, extremumsIsInteger.tolerance), 'Значение экстремума отличается от целого числа более чем на ' + extremumsIsInteger.tolerance);
            });
            break;
        case 'no':
            extX.forEach((elem) => {
                genAssert(!isCloseToInteger(elem, extremumsIsInteger.tolerance), 'Значение экстремума отличается от целого числа менее чем на на ' + extremumsIsInteger.tolerance);
            });
        case 'no_matter':
        default:
            break;
    }

    let extY = extremumsY(painFunc, minX, maxX);
    extY.forEach((elem) => genAssert(elem < maxY, 'Функция вышла за пределы сетки сверху'));
    extY.forEach((elem) => genAssert(elem > minY, 'Функция вышла за пределы сетки снизу'));
    extY.forEach((elem) => genAssert(elem.abs() > 0.5, 'Экстремум слишком близко к оси Ox'));
    for (let index = 1; index < extY.length; index++) {
        genAssert(Math.abs(extY[index] - extY[index - 1]) > minimumDifferenceBetweenExtremes,
            'Разница между соседними экстремумами меньше, чем ' + minimumDifferenceBetweenExtremes);
    };

    genAssert((extY[0] - painFunc(minX)).abs() > minimumDifferenceBetweenExtremes, 'Экстремум слишком близко к левому концу по y');
    genAssert((extY[extY.length - 1] - painFunc(maxX)).abs() > minimumDifferenceBetweenExtremes, 'Экстремум слишком близко к правому концу по y')

    let rootF = findRoots(painFunc, minX, maxX);
    genAssert(rootF.length >= numberOfRoots.min, 'Минимальное количество корней ' + numberOfRoots.min)
    genAssert(rootF.length <= numberOfRoots.max, 'Максимальное количество корней ' + numberOfRoots.max)

    switch (rootsIsInteger.int) {
        case 'yes':
            rootF.forEach((elem) => {
                genAssert(isCloseToInteger(elem, rootsIsInteger.tolerance), 'Значение корня отличается от целого числа более чем на ' + rootsIsInteger.tolerance);
            });
            break;
        case 'no':
            rootF.forEach((elem) => {
                genAssert(!isCloseToInteger(elem, rootsIsInteger.tolerance), 'Значение корня отличается от целого числа менее чем на на ' + rootsIsInteger.tolerance);
            });
        case 'no_matter':
        default:
            break;
    }

    genAssertGraphIntersectsPointWithNeighborhood(painFunc, 1.1, -0.3, 0.2);
    genAssertGraphIntersectsPointWithNeighborhood(painFunc, -0.5, 1.1, 0.2);
    genAssertGraphIntersectsPointWithNeighborhood(painFunc, -0.3, -0.3, 0.2);
    genAssertGraphIntersectsPointWithNeighborhood(painFunc, maxX, -0.3, 0.2);
    genAssertGraphIntersectsPointWithNeighborhood(painFunc, minX, -0.3, 0.2);

    return { func, painFunc };
};

function paintSpline({ func, minX, maxX, minY, maxY, points = [], step = 0.01, scale = 20, height = 400, width = 500, font = "14px liberation_sans", lineWidth = 0.1, lineDash = [4, 2], singleSegmentX = 1, singleSegmentY = 1,
    markedPoints = {
        type: ['symbol', 'number'].iz(),
        fontMarkedPoints: "16px liberation_sans",
        lineWidthMarkedPoints: 0.1,
    }, definedOnInterval = true },) {
    return function (ctx) {
        ctx.drawCoordinatePlane(width, height, {
            hor: singleSegmentX,
            ver: singleSegmentY
        }, {
            x1: '1',
            y1: '1',
            sh1: 13
        }, scale);
        ctx.font = font;
        if (definedOnInterval) {
            ctx.drawLine(scale * maxX, 5, scale * maxX, -5);
            ctx.drawLine(scale * minX, 5, scale * minX, -5);
            if (maxX != 0 && maxX != 1) ctx.fillText(maxX, scale * maxX, 15);
            if (minX != 0 && minX != 1) ctx.fillText(minX, scale * minX - 13, 15);
        }
        ctx.scale(scale, -scale);
        ctx.lineWidth = lineWidth;
        graph9AdrawFunction(ctx, func, {
            minX: minX,
            maxX: maxX,
            minY: minY,
            maxY: maxY,
            step: step,
        });
        if (definedOnInterval) {
            graph9AmarkCircles(ctx, [
                [maxX, func(maxX)],
                [minX, func(minX)]
            ], 2, 0.2);
            ctx.fillStyle = "white";
            graph9AmarkCircles(ctx, [
                [maxX, func(maxX)],
                [minX, func(minX)]
            ], 2, 0.1);
        }

        ctx.scale(1 / scale, -1 / scale);
        ctx.fillStyle = "black";

        if (points.length > 0) {
            paintMarkedPoints(ctx, points, func, {
                scale: scale,
                font: font,
                lineDash: lineDash,
                circleRadius: 2,
            }, markedPoints)
        }
    };
}

function paintMarkedPoints(ctx, points, func, options, markedPoints) {
    const { scale = 20, lineDash = [4, 2], circleRadius = 2 } = options;
    const { type = ['symbol', 'number'].iz(), fontMarkedPoints = "16px liberation_sans", lineWidthMarkedPoints = 0.12 } = markedPoints;
    points.forEach((point, index) => {
        const x = point;
        const y = func(point);
        const xOffset = y < 0 ? 0 : -0.5
        const yOffset = y < 0 ? -0.15 : 0.6;

        ctx.font = fontMarkedPoints;
        switch (type) {
            case 'number':
                ctx.fillText(x.ts(), (x + xOffset) * scale, yOffset * scale);
                break;
            case 'symbol':
                ctx.fillText('x' + (index + 1).toSubscript(), (x + xOffset) * scale, yOffset * scale);
                break;
        }

        ctx.strokeStyle = om.primaryBrandColors.iz();
        ctx.setLineDash(lineDash);
        ctx.lineWidth = lineWidthMarkedPoints * scale;
        ctx.drawLine(x * scale, 0, x * scale, -y * scale);

        ctx.drawFilledCircle(x * scale, 0, circleRadius);
        ctx.strokeStyle = 'black';
    });
}

function getRandomSubSegment(minX, maxX, stepX) {
    let randomLength = sl(stepX, maxX - minX);
    let start = sl(minX, maxX - randomLength);

    return [start, start + randomLength];
}

Number.prototype.toSubscript = function () {
    const subscriptDigits = {
        '0': '₀',
        '1': '₁',
        '2': '₂',
        '3': '₃',
        '4': '₄',
        '5': '₅',
        '6': '₆',
        '7': '₇',
        '8': '₈',
        '9': '₉'
    };

    return this.toString().replace(/\d/g, function (match) {
        return subscriptDigits[match];
    });
};

function isDistinctByTolerance(array, tolerance) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (Math.abs(array[i] - array[j]) < tolerance) {
                return false;
            }
        }
    }
    return true;
}

function findIntersectionPoints(func, constValue, minX, maxX, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    let intersectionPoints = [];
    let current = minX;

    while (current < maxX) {
        let next = current + stepSize;
        if (next > maxX) next = maxX;

        let fCurrent = func(current);
        let fNext = func(next);

        if ((fCurrent - constValue) * (fNext - constValue) <= 0) {
            try {
                let root = brent(x => func(x) - constValue, current, next, tolerance, maxIterations);
                intersectionPoints.push(root);
            } catch (error) {
                console.error(`Failed to find intersection point in the interval [${current}, ${next}]: ${error.message}`);
            }
        }
        current = next;
    }

    return intersectionPoints;
}

try {
    global.brent = module.exports.brent = brent;
    global.isCloseToInteger = module.exports.isCloseToInteger = isCloseToInteger;
    global.findRoots = module.exports.findRoots = findRoots;
    global.intPoints = module.exports.intPoints = intPoints;
    global.intPointsWithTolerance = module.exports.intPointsWithTolerance = intPointsWithTolerance;
    global.findIntegerPointsInInterval = module.exports.findIntegerPointsInInterval = findIntegerPointsInInterval;
    global.findPointsInIntervals = module.exports.findPointsInIntervals = findPointsInIntervals;
    global.findExtremumsOfFunction = module.exports.findExtremumsOfFunction = findExtremumsOfFunction;
    global.findAllExtremumsOfFunctionSort = module.exports.findAllExtremumsOfFunctionSort = findAllExtremumsOfFunctionSort;
    global.findIntExtremumsOfFunction = module.exports.findIntExtremumsOfFunction = findIntExtremumsOfFunction;
    global.extremumsX = module.exports.extremumsX = extremumsX;
    global.transformExtremumsToIntervals = module.exports.transformExtremumsToIntervals = transformExtremumsToIntervals;
    global.filterIntervalsWithIntExtremums = module.exports.filterIntervalsWithIntExtremums = filterIntervalsWithIntExtremums;
    global.extremumsY = module.exports.extremumsY = extremumsY;
    global.findMinimums = module.exports.findMinimums = findMinimums;
    global.findMaximums = module.exports.findMaximums = findMaximums;
    global.minimumsX = module.exports.minimumsX = minimumsX;
    global.findMaximums = module.exports.maximumsX = maximumsX;
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
    global.createSpline = module.exports.createSpline = createSpline;
    global.paintSpline = module.exports.paintSpline = paintSpline;
    global.paintMarkedPoints = module.exports.paintMarkedPoints = paintMarkedPoints;
    global.getRandomSubSegment = module.exports.getRandomSubSegment = getRandomSubSegment;
    global.isDistinctByTolerance = module.exports.isDistinctByTolerance = isDistinctByTolerance;
    global.findIntersectionPoints = module.exports.findIntersectionPoints = findIntersectionPoints;
} catch (e) { }
