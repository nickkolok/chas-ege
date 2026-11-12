function brent(func, lowerBound, upperBound, tolerance = 1e-7, maxIterations = 1000) {
    // Обозначения как в классическом алгоритме (zeroin / zbrent):
    // upperBound — текущее приближение (b), lowerBound — предыдущее (a),
    // previousBound — точка c, такая что корень лежит между upperBound и previousBound.
    let fLower = func(lowerBound), fUpper = func(upperBound);

    if (fLower * fUpper >= 0) {
        throw new Error("Function must have different signs at lowerBound and upperBound");
    }

    let previousBound = upperBound, fPrevious = fUpper;
    let intervalWidth = 0, lastStep = 0;

    for (let iteration = 0; iteration < maxIterations; iteration++) {
        // Корень должен оставаться между upperBound и previousBound
        if ((fUpper > 0 && fPrevious > 0) || (fUpper < 0 && fPrevious < 0)) {
            previousBound = lowerBound;
            fPrevious = fLower;
            intervalWidth = lastStep = upperBound - lowerBound;
        }
        // upperBound — лучшее из двух приближений
        if (Math.abs(fPrevious) < Math.abs(fUpper)) {
            lowerBound = upperBound;
            upperBound = previousBound;
            previousBound = lowerBound;
            fLower = fUpper;
            fUpper = fPrevious;
            fPrevious = fLower;
        }

        let toleranceEffective = 2 * Number.EPSILON * Math.abs(upperBound) + tolerance;
        let midpoint = 0.5 * (previousBound - upperBound);

        if (Math.abs(midpoint) <= toleranceEffective || fUpper === 0) return upperBound;

        if (Math.abs(lastStep) >= toleranceEffective && Math.abs(fLower) > Math.abs(fUpper)) {
            // Попытка интерполяции
            let s = fUpper / fLower, p, q;
            if (lowerBound === previousBound) {
                // Метод секущих
                p = 2 * midpoint * s;
                q = 1 - s;
            } else {
                // Обратная квадратичная интерполяция
                let qq = fLower / fPrevious, r = fUpper / fPrevious;
                p = s * (2 * midpoint * qq * (qq - r) - (upperBound - lowerBound) * (r - 1));
                q = (qq - 1) * (r - 1) * (s - 1);
            }
            if (p > 0) q = -q;
            p = Math.abs(p);

            if (2 * p < Math.min(3 * midpoint * q - Math.abs(toleranceEffective * q), Math.abs(lastStep * q))) {
                // Интерполяция принята
                lastStep = intervalWidth;
                intervalWidth = p / q;
            } else {
                // Интерполяция не удалась — бисекция
                intervalWidth = midpoint;
                lastStep = intervalWidth;
            }
        } else {
            // Сходимость слишком медленная — бисекция
            intervalWidth = midpoint;
            lastStep = intervalWidth;
        }

        lowerBound = upperBound;
        fLower = fUpper;
        upperBound += Math.abs(intervalWidth) > toleranceEffective ? intervalWidth : Math.sign(midpoint) * toleranceEffective;
        fUpper = func(upperBound);
    }
    throw new Error("Превышено максимальное количество итераций");
}
function isCloseToInteger(value, tolerance) {
    return Math.abs(value - Math.round(value)) <= tolerance;
}
function findRoots(func, minX, maxX, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    let roots = [];
    let addRoot = (root) => {
        if (!roots.some(r => Math.abs(r - root) < tolerance)) {
            roots.push(root);
        }
    };

    // Узлы сетки считаются по номеру и округляются: при сложении шагов
    // накапливалась ошибка, узел получался равным 0.9999999999999999 вместо 1,
    // и корень, лежащий ровно в узле (в том числе касание оси), терялся.
    const count = Math.max(1, Math.ceil((maxX - minX) / stepSize - 1e-9));
    const nodeAt = k => (k >= count ? maxX : Math.round((minX + k * stepSize) * 1e9) / 1e9);

    let current = minX;
    let fCurrent = func(current);

    for (let k = 1; k <= count; k++) {
        let next = nodeAt(k);
        let fNext = func(next);

        // Если функция обращается в нуль ровно в узле сетки, метод Брента
        // неприменим (ему нужны значения разных знаков на концах), поэтому
        // такой корень добавляется напрямую. Узел next будет проверен
        // на следующем шаге (или после цикла, если это maxX).
        if (fCurrent === 0) {
            addRoot(current);
        } else if (fCurrent * fNext < 0) {
            try {
                addRoot(brent(func, current, next, tolerance, maxIterations));
            } catch (error) {
                console.error(`Не удалось найти корень на интервале [${current}, ${next}]: ${error.message}`);
            }
        }
        current = next;
        fCurrent = fNext;
    }
    if (fCurrent === 0) {
        addRoot(maxX);
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
// Целые точки интервала interval, лежащие между minX и maxX.
// Концы самого интервала по умолчанию входят в ответ: промежутки возрастания
// и убывания принято записывать вместе с точками экстремума. Для строгих
// условий (функция или производная положительна, отрицательна) концы — это
// нули, и их нужно исключить, передав excludeIntervalEnds = true.
// Точки minX и maxX — концы области определения — входят в ответ только
// при includeMinX и includeMaxX.
// Границы обычно найдены численно (2.0000000000000018 вместо 2), поэтому
// граница, отличающаяся от целого числа не более чем на tolerance,
// считается этим целым числом.
function findIntegerPointsInInterval(interval, minX, maxX, includeMinX = false, includeMaxX = false, tolerance = 1e-6, excludeIntervalEnds = false) {
    const snap = value => Math.abs(value - Math.round(value)) <= tolerance ? Math.round(value) : value;
    const left = snap(interval[0]);
    const right = snap(interval[1]);
    minX = snap(minX);
    maxX = snap(maxX);

    let points = [];
    let start = Math.ceil(Math.max(left, minX));
    let end = Math.floor(Math.min(right, maxX));

    for (let i = start; i <= end; i++) {
        let insideDomain = (i > minX || (includeMinX && i === minX)) && (i < maxX || (includeMaxX && i === maxX));
        let insideInterval = i >= left && i <= right;
        if (excludeIntervalEnds) {
            // Конец интервала, совпавший с включённым концом области
            // определения, корнем не является и остаётся в ответе
            let keepLeft = i > left || (includeMinX && i === minX);
            let keepRight = i < right || (includeMaxX && i === maxX);
            insideInterval = insideInterval && keepLeft && keepRight;
        }
        if (insideDomain && insideInterval) {
            points.push(i);
        }
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
    //step - шаг сетки, на которой ищется смена возрастания и убывания
    //boundaryPointIsMax - необходимо ли включить границы в максимумы
    //boundaryPointIsMin - необходимо ли включить границы в минимумы
    //Точки в каждом массиве идут по возрастанию x. Найденный на сетке экстремум
    //уточняется, так что его абсцисса известна намного точнее шага.

    // Узлы вычисляются по номеру, чтобы не накапливалась ошибка сложения,
    // и не выходят за maxX
    const count = Math.max(2, Math.ceil((maxX - minX) / step - 1e-9));
    const xAt = k => (k >= count ? maxX : minX + k * step);

    // Уточнение экстремума на отрезке [left; right] методом золотого сечения.
    // sign = 1 для максимума, -1 для минимума.
    const refineExtremum = (left, right, sign) => {
        const ratio = (Math.sqrt(5) - 1) / 2;
        let x1 = right - ratio * (right - left);
        let x2 = left + ratio * (right - left);
        let f1 = sign * func(x1);
        let f2 = sign * func(x2);
        for (let iteration = 0; iteration < 200 && right - left > 1e-10; iteration++) {
            if (f1 > f2) {
                right = x2;
                x2 = x1;
                f2 = f1;
                x1 = right - ratio * (right - left);
                f1 = sign * func(x1);
            } else if (f1 < f2) {
                left = x1;
                x1 = x2;
                f1 = f2;
                x2 = left + ratio * (right - left);
                f2 = sign * func(x2);
            } else {
                // Значения равны: вершина (или плоский участок) между x1 и x2
                left = x1;
                right = x2;
                x1 = right - ratio * (right - left);
                x2 = left + ratio * (right - left);
                f1 = sign * func(x1);
                f2 = sign * func(x2);
            }
        }
        return (left + right) / 2;
    };

    let funcMin = func(minX);
    let funcMax = func(maxX);

    let maximums = [];
    let minimums = [];

    if (boundaryPointIsMax && funcMin > func(xAt(1)))
        maximums.push([minX, funcMin]);
    if (boundaryPointIsMin && funcMin < func(xAt(1)))
        minimums.push([minX, funcMin]);

    // direction — знак последнего ненулевого приращения функции, anchor — узел
    // перед тем, на котором это приращение получено. Когда знак приращения
    // меняется, экстремум лежит между anchor и текущим узлом. Равные соседние
    // значения (плоская вершина) знак не меняют и экстремум не теряют.
    let previousX = minX;
    let previousY = funcMin;
    let direction = 0;
    let anchor = minX;

    for (let k = 1; k <= count; k++) {
        let x = xAt(k);
        let y = (k === count) ? funcMax : func(x);

        if (!Number.isFinite(y) || !Number.isFinite(previousY)) {
            // Через точку, где функция не определена, экстремум не ищется
            direction = 0;
        } else {
            let currentDirection = Math.sign(y - previousY);
            if (currentDirection !== 0) {
                if (direction !== 0 && currentDirection !== direction) {
                    let extremumX = refineExtremum(anchor, x, direction);
                    (direction > 0 ? maximums : minimums).push([extremumX, func(extremumX)]);
                }
                direction = currentDirection;
                anchor = previousX;
            }
        }

        previousX = x;
        previousY = y;
    }

    if (boundaryPointIsMax && funcMax > func(xAt(count - 1)))
        maximums.push([maxX, funcMax]);
    if (boundaryPointIsMin && funcMax < func(xAt(count - 1)))
        minimums.push([maxX, funcMax]);

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

// Для каждого экстремума строит отрезок [leftEnd; rightEnd] с целыми концами,
// внутри которого лежит этот экстремум и нет других: слева и справа отрезок
// ограничен соседними экстремумами (с отступом не меньше половины единицы),
// а у крайних экстремумов — концами интервала (minX; maxX), которые в отрезок
// не входят. На таком отрезке минимум — точка наименьшего значения функции,
// максимум — наибольшего. Если экстремум внутрь отрезка не попадает, отрезок
// для него не строится.
// При endSegmentIsNotExtremum = true дополнительно требуется, чтобы экстремум,
// округлённый до целого, не совпадал с концом отрезка.
function transformExtremumsToIntervals(func, minX, maxX, endSegmentIsNotExtremum = false) {
    let extremums = findExtremumsOfFunction(func, minX, maxX);
    let allExtremums = [
        ...extremums.minP.map(point => ({ x: point[0], isMinimum: true })),
        ...extremums.maxP.map(point => ({ x: point[0], isMinimum: false })),
    ].sort((a, b) => a.x - b.x);

    let intIntervalsMinimums = [];
    let intIntervalsMaximums = [];

    allExtremums.forEach((extremum, i) => {
        let leftEnd = (i === 0) ? Math.floor(minX) + 1 : Math.round(allExtremums[i - 1].x + 1);
        let rightEnd = (i === allExtremums.length - 1) ? Math.ceil(maxX) - 1 : Math.round(allExtremums[i + 1].x - 1);

        // Экстремум найден численно, поэтому совпадение с концом отрезка
        // проверяется с допуском
        let inside = extremum.x - leftEnd > 1e-6 && rightEnd - extremum.x > 1e-6;
        if (endSegmentIsNotExtremum) {
            let rounded = Math.round(extremum.x);
            inside = inside && leftEnd < rounded && rounded < rightEnd;
        }

        if (inside) {
            let interval = { leftEnd, ext: extremum.x, rightEnd };
            if (extremum.isMinimum) {
                intIntervalsMinimums.push(interval);
            } else {
                intIntervalsMaximums.push(interval);
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
        } else if (y1 > y2) {
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
// Отрезок [minX; maxX] делится корнями на части, знак каждой части берётся
// в её середине (а если там оказался нуль — в соседних пробных точках).
// Корни можно передать четвёртым аргументом, чтобы не искать их повторно;
// иначе они ищутся через findRoots с параметрами по умолчанию.
function findPositiveAndNegativeIntervals(func, minX, maxX, roots) {
    if (!Array.isArray(roots)) {
        roots = findRoots(func, minX, maxX);
    }

    let positiveIntervals = [];
    let negativeIntervals = [];
    let boundaries = [minX, ...roots.filter(root => root > minX && root < maxX).sort((a, b) => a - b), maxX];

    for (let i = 1; i < boundaries.length; i++) {
        let left = boundaries[i - 1];
        let right = boundaries[i];
        let value = 0;
        // Середина может попасть в точку касания оси, не найденную findRoots
        for (let share of [0.5, 0.25, 0.75, 0.125, 0.875]) {
            value = func(left + (right - left) * share);
            if (value !== 0) {
                break;
            }
        }

        if (value > 0) {
            positiveIntervals.push([left, right]);
        } else if (value < 0) {
            negativeIntervals.push([left, right]);
        }
    }

    return { positiveIntervals, negativeIntervals };
}
//интервалы отрицательные
function findNegativeIntervals(func, minX, maxX, step = 0.001, tolerance = 1e-7, maxIterations = 1000) {
    let roots = findRoots(func, minX, maxX, step, tolerance, maxIterations);
    let intervals = findPositiveAndNegativeIntervals(func, minX, maxX, roots);
    let negativeIntervals = intervals.negativeIntervals;

    return negativeIntervals;
}
//интервалы положительные
function findPositiveIntervals(func, minX, maxX, step = 0.001, tolerance = 1e-7, maxIterations = 1000) {
    let roots = findRoots(func, minX, maxX, step, tolerance, maxIterations);
    let intervals = findPositiveAndNegativeIntervals(func, minX, maxX, roots);
    let positiveIntervals = intervals.positiveIntervals;

    return positiveIntervals;
}

//целые точки на интервалах отрицательных и положительных
// Условие строгое: корни, разделяющие интервалы, в ответ не входят
function findPositiveAndNegativePoints(intervals, minX, maxX, includeMinX = false, includeMaxX = false) {
    let positivePoints = [];
    let negativePoints = [];

    // Проходим по всем интервалам возрастания и добавляем целые точки в positivePoints
    for (let interval of intervals.positiveIntervals) {
        let points = findIntegerPointsInInterval(interval, minX, maxX, includeMinX, includeMaxX, undefined, true);
        positivePoints.push(...points);
    }

    // Проходим по всем интервалам убывания и добавляем целые точки в negativePoints
    for (let interval of intervals.negativeIntervals) {
        let points = findIntegerPointsInInterval(interval, minX, maxX, includeMinX, includeMaxX, undefined, true);
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
    let intervals = findPositiveAndNegativeIntervals(func, minX, maxX, roots);
    let points = findPositiveAndNegativePoints(intervals, minX, maxX);

    // Касание оси без смены знака findRoots может не заметить, поэтому знак
    // в самих точках проверяется напрямую
    return points.negativePoints.filter(point => func(point) < 0);
}
function findPositiveIntegerPoints(func, minX, maxX, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    let roots = findRoots(func, minX, maxX, stepSize, tolerance, maxIterations);

    let intervals = findPositiveAndNegativeIntervals(func, minX, maxX, roots);
    let points = findPositiveAndNegativePoints(intervals, minX, maxX);

    return points.positivePoints.filter(point => func(point) > 0);
}

// Добавляет в узлы сплайна (X, Y) корни: между каждыми двумя соседними узлами
// со значениями разных знаков появляется узел с нулевым значением.
//
// Целый корень (по умолчанию) ставится в целую точку между узлами. Если целых
// точек строго между узлами нет, но один из двух узлов сам стоит в целой точке,
// обнуляется этот узел (из двух — тот, где значение меньше по модулю): второй
// узел с той же абсциссой сделал бы сплайн неопределённым. Так бывает при шаге
// узлов 0,5 и 1 (stepForX = 1 и 2), и обнулённым может оказаться любой узел,
// в том числе вершина графика.
//
// При rootsIsInteger.int === 'no' корень ставится в случайную точку между
// узлами, отстоящую от целых точек больше чем на rootsIsInteger.tolerance.
//
// Крайние узлы графика не обнуляются. Если подходящей точки нет, корень
// ставится в середину между узлами.
function addRoots(X, Y, rootsIsInteger) {
    let newX = X.slice();
    let newY = Y.slice();
    let nonInteger = rootsIsInteger && rootsIsInteger.int === 'no';
    let tolerance = (rootsIsInteger && rootsIsInteger.tolerance !== undefined) ? rootsIsInteger.tolerance : 0.2;
    const isInteger = x => Math.abs(x - Math.round(x)) < 1e-9;

    for (let i = 1; i < Y.length; i++) {
        if (!((Y[i] > 0 && Y[i - 1] < 0) || (Y[i] < 0 && Y[i - 1] > 0))) {
            continue;
        }

        let left = X[i - 1];
        let right = X[i];
        let middle = (left + right) / 2;
        let rootX = middle;

        if (nonInteger) {
            // Точки на сетке с шагом 0,05, не слишком близкие ни к узлам, ни к целым
            let margin = Math.min(0.1, (right - left) / 4);
            let candidates = [];
            for (let k = Math.ceil((left + margin) / 0.05 - 1e-9); k * 0.05 <= right - margin + 1e-9; k++) {
                let x = Math.round(k * 5) / 100;
                if (Math.abs(x - Math.round(x)) >= Math.min(tolerance + 0.05, 0.5) - 1e-9) {
                    candidates.push(x);
                }
            }
            if (candidates.length > 0) {
                rootX = candidates.iz();
            } else {
                // Узлы стоят тесно: берётся точка между ними, самая далёкая от целых
                const distance = x => Math.abs(x - Math.round(x));
                for (let k = Math.floor(left / 0.05) + 1; k * 0.05 < right - 1e-9; k++) {
                    let x = Math.round(k * 5) / 100;
                    if (x > left + 1e-9 && distance(x) > distance(rootX)) {
                        rootX = x;
                    }
                }
            }
        } else {
            let inside = [];
            for (let k = Math.floor(left) + 1; k < right - 1e-9; k++) {
                if (k > left + 1e-9) {
                    inside.push(k);
                }
            }
            if (inside.length > 0) {
                // Целая точка между узлами, ближайшая к середине
                rootX = inside.reduce((best, k) => (Math.abs(k - middle) < Math.abs(best - middle) ? k : best));
            } else {
                // Целых точек между узлами нет: обнуляется узел, стоящий в целой точке
                let nodes = [i - 1, i].filter(index => index > 0 && index < Y.length - 1 && isInteger(X[index]));
                if (nodes.length === 2 && Math.abs(newY[nodes[0]]) === Math.abs(newY[nodes[1]])) {
                    // При равных значениях — узел, к которому округляется середина
                    nodes = [Math.abs(Math.round(middle) - X[i - 1]) < 1e-9 ? i - 1 : i];
                }
                if (nodes.length > 0) {
                    let node = nodes.reduce((best, index) => (Math.abs(newY[index]) < Math.abs(newY[best]) ? index : best));
                    newY[node] = 0;
                    continue;
                }
            }
        }

        newX.push(rootX);
        newY.push(0);
    }

    let sortedData = newX.map((value, index) => ({ x: value, y: newY[index] })).sort((a, b) => a.x - b.x);
    newX = sortedData.map(data => data.x);
    newY = sortedData.map(data => data.y);

    return { X: newX, Y: newY };
}

function createSpline({ type, minX, maxX, minY, maxY, stepForX = 3, stepForY = 1, extremumsIsInteger = { int: 'no_matter', tolerance: 0.2 }, rootsIsInteger = { int: 'no_matter', tolerance: 0.2 },
    minimumDifferenceBetweenExtremes = 1, numberOfExtremes = { min: 0, max: 1000 }, numberOfRoots = { min: 0, max: 1000 }, monotoneFunction = false,
}) {
    let X = [];
    let Y = [];

    // Узлы сплайна идут от minX с шагом stepForX / 2 и считаются по номеру,
    // чтобы не накапливалась ошибка сложения. Последний узел всегда стоит
    // в maxX: иначе правее последнего узла сплайн был бы продолжением
    // крайнего куска, никак не связанным со значениями в узлах.
    const nodeStep = stepForX * 0.5;
    for (let k = 0; minX + k * nodeStep < maxX - 0.25 * nodeStep; k++) {
        X.push(minX + k * nodeStep);
    }
    X.push(maxX);

    if (monotoneFunction) {
        // Монотонная функция: значения в узлах идут от одного случайного
        // значения к другому со случайными приращениями одного знака
        let first = slKrome(0, minY + 0.1, maxY - 0.1, stepForY);
        let last = slKrome([0, first], minY + 0.1, maxY - 0.1, stepForY);
        genAssert(Math.abs(last - first) > minimumDifferenceBetweenExtremes, 'Монотонная функция меняется меньше, чем на ' + minimumDifferenceBetweenExtremes);
        let weights = X.map(() => sl(1, 3, 0.1));
        let total = weights.slice(1).reduce((sum, weight) => sum + weight, 0);
        let passed = 0;
        Y = X.map((x, k) => {
            passed += (k === 0) ? 0 : weights[k];
            return first + (last - first) * passed / total;
        });
    } else {
        // Значения в узлах: начальное, затем тройки (y / 2, y, y / 2) вокруг
        // очередной вершины y, выбранной случайно в пределах сетки.
        // Экстремум ближе чем в единице от конца графика всё равно будет
        // отбракован, поэтому внутренние узлы, лежащие так близко к концам,
        // в этой схеме не участвуют: значения в них берутся на прямой между
        // соседними участвующими узлами. При stepForX >= 3 слева таких узлов нет.
        let active = X.map((x, k) => k === 0 || k === X.length - 1 || (x - minX > 1 && maxX - x > 1));
        let values = [slKrome(0, minY + 0.1, maxY - 0.1, stepForY)];
        let activeCount = active.filter(isActive => isActive).length;
        while (values.length < activeCount) {
            let y = sl(minY + 0.1, maxY - 0.1, stepForY);
            values.push(0.5 * y, y, 0.5 * y);
        }
        let used = 0;
        Y = X.map((x, k) => (active[k] ? values[used++] : undefined));
        for (let k = 1; k < X.length - 1; k++) {
            if (!active[k]) {
                let left = k - 1;
                let right = k + 1;
                while (!active[right]) {
                    right++;
                }
                Y[k] = Y[left] + (Y[right] - Y[left]) * (X[k] - X[left]) / (X[right] - X[left]);
            }
        }
    }

    ({ X, Y } = addRoots(X, Y, rootsIsInteger));

    let spline = new Spline(X, Y);
    let func = (x) => spline.at(x);
    let painFunc;
    switch (type) {
        case 'derivative':
            // Рисуется удвоенная производная сплайна (разность делится на 0,001,
            // а не на 0,002). На знаки, нули и экстремумы это не влияет; func
            // при этом — половина первообразной нарисованного графика.
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

    const extremumSearchStep = 0.01;

    if (monotoneFunction) {
        genAssert(extremumsX(func, minX, maxX, extremumSearchStep).length === 0, 'Функция не монотонна');
    }

    // Экстремумы ищутся один раз. Найденный на сетке экстремум уточняется,
    // поэтому сетка может быть реже, чем по умолчанию: соседние экстремумы
    // сплайна не бывают ближе шага узлов.
    let extremums = findAllExtremumsOfFunctionSort(painFunc, minX, maxX, extremumSearchStep);
    let extX = extremums.map(extremum => extremum[0]);
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

    let extY = extremums.map(extremum => extremum[1]);
    extY.forEach((elem) => genAssert(elem < maxY, 'Функция вышла за пределы сетки сверху'));
    extY.forEach((elem) => genAssert(elem > minY, 'Функция вышла за пределы сетки снизу'));
    extY.forEach((elem) => genAssert(elem.abs() > 0.5, 'Экстремум слишком близко к оси Ox'));
    for (let index = 1; index < extY.length; index++) {
        genAssert(Math.abs(extY[index] - extY[index - 1]) > minimumDifferenceBetweenExtremes,
            'Разница между соседними экстремумами меньше, чем ' + minimumDifferenceBetweenExtremes);
    };

    if (extY.length > 0) {
        genAssert((extY[0] - painFunc(minX)).abs() > minimumDifferenceBetweenExtremes, 'Экстремум слишком близко к левому концу по y');
        genAssert((extY[extY.length - 1] - painFunc(maxX)).abs() > minimumDifferenceBetweenExtremes, 'Экстремум слишком близко к правому концу по y')
    }

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
        ctx.setLineDash([]);
    });
}

// Случайный отрезок с целыми концами внутри [minX; maxX] длиной не меньше stepX
function getRandomSubSegment(minX, maxX, stepX) {
    minX = Math.ceil(minX);
    maxX = Math.floor(maxX);
    let minLength = Math.max(1, Math.ceil(stepX));
    if (minLength > maxX - minX) {
        throw new Error('В отрезок [' + minX + ';' + maxX + '] не помещается отрезок длины ' + minLength);
    }

    let randomLength = sl(minLength, maxX - minX);
    let start = sl(minX, maxX - randomLength);

    return [start, start + randomLength];
}

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
    return findRoots(x => func(x) - constValue, minX, maxX, stepSize, tolerance, maxIterations);
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
    global.extremumsY = module.exports.extremumsY = extremumsY;
    global.findMinimums = module.exports.findMinimums = findMinimums;
    global.findMaximums = module.exports.findMaximums = findMaximums;
    global.minimumsX = module.exports.minimumsX = minimumsX;
    global.maximumsX = module.exports.maximumsX = maximumsX;
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
    global.addRoots = module.exports.addRoots = addRoots;
    global.createSpline = module.exports.createSpline = createSpline;
    global.paintSpline = module.exports.paintSpline = paintSpline;
    global.paintMarkedPoints = module.exports.paintMarkedPoints = paintMarkedPoints;
    global.getRandomSubSegment = module.exports.getRandomSubSegment = getRandomSubSegment;
    global.isDistinctByTolerance = module.exports.isDistinctByTolerance = isDistinctByTolerance;
    global.findIntersectionPoints = module.exports.findIntersectionPoints = findIntersectionPoints;
} catch (e) { }
