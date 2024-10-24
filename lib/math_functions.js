/**
 * Создает массив чисел в заданном диапазоне с указанным шагом.
 * 
 * @param {number} minX - Начальное значение диапазона.
 * @param {number} maxX - Конечное значение диапазона.
 * @param {number} step - Шаг между числами.
 * @returns {Array} - Массив чисел в указанном диапазоне с заданным шагом.
 */
function fillArray(minX, maxX, step) {
    const array = [];
    for (let i = minX; i <= maxX; i += step) {
        array.push(i);
    }
    return array;
}

//нахождение корней по методу Брента
//https://en.wikipedia.org/wiki/Brent%27s_method
/**
 * Функция brent выполняет оптимизацию одномерной функции методом Брента.
 * 
 * @param {Function} func - Функция, для которой выполняется оптимизация
 * @param {number} lowerBound - Нижняя граница интервала
 * @param {number} upperBound - Верхняя граница интервала
 * @param {number} [tolerance=1e-7] - Допустимая погрешность
 * @param {number} [maxIterations=1000] - Максимальное количество итераций
 * @returns {number} - Оптимальное значение аргумента функции
 */
function brent(func, lowerBound, upperBound, tolerance = 1e-7, maxIterations = 1000) {
    let fLower = func(lowerBound), fUpper = func(upperBound);

    if (fLower * fUpper >= 0){ 
        throw new Error("Function must have different signs at lowerBound and upperBound");
    }

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

            if (step > 0) {
                denominator = -denominator;
            }
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

/**
 * Функция определяет, находится ли значение близко к целому числу с учетом заданного допуска.
 * 
 * @param {number} value - Значение, которое проверяется на близость к целому числу.
 * @param {number} tolerance - Допуск для определения близости к целому числу.
 * @returns {boolean} Возвращает true, если значение близко к целому числу с учетом допуска, иначе false.
 */
function isCloseToInteger(value, tolerance) {
    return Math.abs(value - Math.round(value)) <= tolerance;
}

/**
 * Функция для нахождения корней функции на заданном интервале с использованием метода Брента.
 * 
 * @param {Function} func - Функция, корни которой необходимо найти.
 * @param {number} minX - Минимальное значение интервала.
 * @param {number} maxX - Максимальное значение интервала.
 * @param {number} [stepSize=0.1] - Шаг для разбиения интервала.
 * @param {number} [tolerance=1e-7] - Допустимая погрешность.
 * @param {number} [maxIterations=1000] - Максимальное количество итераций для метода Брента.
 * @returns {Array} - Массив корней функции на заданном интервале.
 */
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

/**
 * Функция intPoints возвращает массив точек (x, y), где y - целое число, соответствующее функции func(x),
 * в заданном диапазоне minX и maxX с шагом step.
 * 
 * @param {Function} func - Функция, для которой ищутся целочисленные точки
 * @param {Object} o - Объект с параметрами:
 *   - minX: number - Минимальное значение x
 *   - maxX: number - Максимальное значение x
 *   - minY: number - Минимальное значение y
 *   - maxY: number - Максимальное значение y
 *   - step: number - Шаг для итерации по x (необязательный, по умолчанию 1)
 * @returns {Array} - Массив точек (x, y), где y - целое число, соответствующее функции func(x)
 */
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

/**
 * Функция возвращает массив точек (x, y), где y близко к целому числу с учетом заданного допуска.
 * 
 * @param {Function} func Функция, для которой ищутся точки
 * @param {Object} o Объект с параметрами:
 *                   - minX: минимальное значение x
 *                   - maxX: максимальное значение x
 *                   - step: шаг между значениями x
 *                   - minY: минимальное значение y
 *                   - maxY: максимальное значение y
 *                   - tolerance: допуск для приближенности к целому числу
 * @returns {Array} Массив точек (x, y), удовлетворяющих условиям
 */
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

/**
 * Находит целочисленные точки в интервале.
 * 
 * @param {Array} interval - Интервал, в котором происходит поиск точек.
 * @param {number} minX - Минимальное значение интервала.
 * @param {number} maxX - Максимальное значение интервала.
 * @param {boolean} includeMinX - Флаг включения minX в найденные точки (по умолчанию false).
 * @param {boolean} includeMaxX - Флаг включения maxX в найденные точки (по умолчанию false).
 * @returns {Array} - Массив целочисленных точек в интервале.
 */
function findIntegerPointsInInterval(interval, minX, maxX, includeMinX = false, includeMaxX = false) {
    let points = fillArray(start, end, 1)
    let start = Math.max(Math.ceil(interval[0]), minX);
    let end = Math.min(Math.floor(interval[1]), maxX);

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

/**
 * Функция фильтрует точки из массива в заданных интервалах.
 * 
 * @param {number[]} points - Массив точек для фильтрации.
 * @param {number[]} interval - Интервал, в котором должны находиться точки.
 * @param {boolean} includeMinX - Флаг включения точек равных минимальному значению интервала.
 * @param {boolean} includeMaxX - Флаг включения точек равных максимальному значению интервала.
 * @returns {number[]} - Отфильтрованный массив точек.
 */
function findPointsInIntervals(points, interval, includeMinX = false, includeMaxX = false) {
    const [start, end] = interval;
    return points.filter(point =>
        (includeMinX ? point >= start : point > start) &&
        (includeMaxX ? point <= end : point < end)
    );
}

/**
 * Возвращает объект с массивами координат минимумов и максимумов функции.
 * 
 * @param {Function} func - Функция типа func(x).
 * @param {number} minX - Начальная граница поиска экстремумов функции.
 * @param {number} maxX - Конечная граница поиска экстремумов функции.
 * @param {number} [step=0.001] - Шаг.
 * @param {boolean} [boundaryPointIsMax=false] - Необходимо ли включить границы в максимумы.
 * @param {boolean} [boundaryPointIsMin=false] - Необходимо ли включить границы в минимумы.
 * @returns {Object} Объект с массивами координат минимумов и максимумов функции.
 */
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
        if (funcMin < func(minX + step)){
            minimums.push([minX, funcMin]);
        }
        if (funcMax < func(maxX - step)){
            minimums.push([maxX, funcMax]);
        }
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

/**
 * Функция находит все экстремумы функции и сортирует их по возрастанию координаты x.
 * 
 * @param {Function} func - Функция типа func(x).
 * @param {number} minX - Начальная граница поиска экстремумов функции.
 * @param {number} maxX - Конечная граница поиска экстремумов функции.
 * @param {number} [step=0.001] - Шаг для поиска экстремумов.
 * @param {boolean} [boundaryPointIsMax=false] - Необходимо ли включить границы в максимумы.
 * @param {boolean} [boundaryPointIsMin=false] - Необходимо ли включить границы в минимумы.
 * @returns {Array<Array<number>>} - Отсортированный массив всех экстремумов функции по возрастанию координаты x.
 */
function findAllExtremumsOfFunctionSort(func, minX, maxX, step = 0.001, boundaryPointIsMax = false, boundaryPointIsMin = false) {
    let extremums = findExtremumsOfFunction(func, minX, maxX, step, boundaryPointIsMax, boundaryPointIsMin);
    let allExtremums = [...extremums.minP, ...extremums.maxP].sort((a, b) => a[0] - b[0]);

    return allExtremums;
}

/**
 * Находит целочисленные экстремумы функции в заданном интервале.
 * 
 * @param {Function} func - Функция типа func(x).
 * @param {number} minX - Нижняя граница интервала.
 * @param {number} maxX - Верхняя граница интервала.
 * @param {number} [toleranceValue=0.2] - Допустимое отклонение для определения близости к целому числу.
 * @param {number} [step=0.001] - Шаг для поиска экстремумов.
 * @param {boolean} [boundaryPointIsMax=false] - Включить ли границы в максимумы.
 * @param {boolean} [boundaryPointIsMin=false] - Включить ли границы в минимумы.
 * @returns {Object} Объект с массивами целочисленных минимумов и максимумов функции.
 */
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

/**
 * Возвращает массив значений x экстремумов функции на заданном интервале.
 *
 * @param {Function} func - Функция, для которой ищутся экстремумы.
 * @param {number} minX - Минимальное значение x на интервале.
 * @param {number} maxX - Максимальное значение x на интервале.
 * @param {number} [step=0.001] - Шаг для поиска экстремумов.
 * @param {boolean} [boundaryPointIsMax=false] - Флаг, указывающий, что граничная точка является максимумом.
 * @param {boolean} [boundaryPointIsMin=false] - Флаг, указывающий, что граничная точка является минимумом.
 * @returns {number[]} - Массив значений x экстремумов функции на заданном интервале.
 */
function extremumsX(func, minX, maxX, step = 0.001, boundaryPointIsMax = false, boundaryPointIsMin = false) {
    return findAllExtremumsOfFunctionSort(func, minX, maxX, step, boundaryPointIsMax, boundaryPointIsMin).map(extremum => extremum[0]);
}

/**
 * Возвращает значения y экстремумов функции на интервале [minX, maxX].
 *
 * @param {Function} func - Функция, для которой ищутся экстремумы.
 * @param {number} minX - Минимальное значение x на интервале.
 * @param {number} maxX - Максимальное значение x на интервале.
 * @param {number} [step=0.001] - Шаг для поиска экстремумов.
 * @param {boolean} [boundaryPointIsMax=false] - Флаг, указывающий, что граничная точка является максимумом.
 * @param {boolean} [boundaryPointIsMin=false] - Флаг, указывающий, что граничная точка является минимумом.
 * @returns {Array<number>} - Массив значений y экстремумов.
 */
function extremumsY(func, minX, maxX, step = 0.001, boundaryPointIsMax = false, boundaryPointIsMin = false) {
    return findAllExtremumsOfFunctionSort(func, minX, maxX, step, boundaryPointIsMax, boundaryPointIsMin).map(extremum => extremum[1]);
}

/**
 * Функция преобразует экстремумы функции в интервалы. 
 * 
 * @param {Function} func - Функция, для которой находятся экстремумы.
 * @param {number} minX - Минимальное значение x.
 * @param {number} maxX - Максимальное значение x.
 * @param {boolean} endSegmentIsNotExtremum - Флаг, указывающий, что конечный сегмент не является экстремумом.
 * @returns {Object} Объект с двумя полями: 
 *   - intIntervalsMinimums: массив объектов с интервалами минимумов функции.
 *   - intIntervalsMaximums: массив объектов с интервалами максимумов функции.
 */
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

/**
 * Функция находит минимумы функции на заданном интервале.
 * 
 * @param {Function} func - Функция, для которой ищутся минимумы.
 * @param {number} minX - Начальная точка интервала.
 * @param {number} maxX - Конечная точка интервала.
 * @returns {Array} - Массив с координатами минимумов функции.
 */
function findMinimums(func, minX, maxX) {
    let extremums = findExtremumsOfFunction(func, minX, maxX);
    let minimums = extremums.minP;

    return minimums;
}

/**
 * Функция находит максимумы функции на заданном интервале.
 * 
 * @param {Function} func - Функция, для которой ищутся максимумы.
 * @param {number} minX - Начальная точка интервала.
 * @param {number} maxX - Конечная точка интервала.
 * @returns {Array} - Массив с координатами точек максимумов функции.
 */
function findMaximums(func, minX, maxX) {
    let extremums = findExtremumsOfFunction(func, minX, maxX);
    let maximums = extremums.maxP;

    return maximums;
}

/**
 * Возвращает массив значений x для точек, являющихся минимумами функции на заданном интервале.
 * 
 * @param {Function} func - Функция, для которой ищутся минимумы.
 * @param {number} minX - Начало интервала.
 * @param {number} maxX - Конец интервала.
 * @returns {Array} - Массив значений x для точек, являющихся минимумами функции.
 */
function minimumsX(func, minX, maxX) {
    return findMinimums(func, minX, maxX).map(point => point[0]);
}

/**
 * Возвращает массив значений x для точек, являющихся максимумами функции на заданном интервале.
 * 
 * @param {Function} func - Функция, для которой ищутся максимумы.
 * @param {number} minX - Минимальное значение x интервала.
 * @param {number} maxX - Максимальное значение x интервала.
 * @returns {Array} - Массив значений x для точек, являющихся максимумами функции.
 */
function maximumsX(func, minX, maxX) {
    return findMaximums(func, minX, maxX).map(point => point[0]);
}

/**
 * Функция находит интервалы возрастания и убывания функции на указанном отрезке.
 * 
 * @param {Function} func - Функция, для которой ищутся интервалы.
 * @param {number} minX - Минимальное значение x на отрезке.
 * @param {number} maxX - Максимальное значение x на отрезке.
 * @returns {Object} - Объект с интервалами возрастания и убывания функции.
 */
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

/**
 * Функция находит интервалы убывания функции на указанном отрезке.
 * 
 * @param {Function} func - Функция, для которой ищутся интервалы убывания.
 * @param {number} minX - Начало отрезка.
 * @param {number} maxX - Конец отрезка.
 * @param {number} [step=0.001] - Шаг для вычисления интервалов.
 * @param {number} [tolerance=1e-7] - Допустимое отклонение.
 * @param {number} [maxIterations=1000] - Максимальное количество итераций.
 * 
 * @returns {Array<Array<number>>} - Массив интервалов убывания функции.
 */
function findDecreasingIntervals(func, minX, maxX) {
    let intervals = findIntervalsOfIncreaseAndDecrease(func, minX, maxX);
    let decreasingIntervals = intervals.decreasingIntervals;

    return decreasingIntervals;
}

/**
 * Функция находит интервалы возрастания функции на указанном отрезке.
 * 
 * @param {Function} func - Функция, для которой ищутся интервалы возрастания.
 * @param {number} minX - Начало отрезка.
 * @param {number} maxX - Конец отрезка.
 * @param {number} [step=0.001] - Шаг для вычисления интервалов.
 * @param {number} [tolerance=1e-7] - Допустимая погрешность.
 * @param {number} [maxIterations=1000] - Максимальное количество итераций.
 * @returns {Array<Array<number>>} - Массив интервалов возрастания функции.
 */
function findIncreasingIntervals(func, minX, maxX) {
    let intervals = findIntervalsOfIncreaseAndDecrease(func, minX, maxX);
    let increasingIntervals = intervals.increasingIntervals;

    return increasingIntervals;
}

/**
 * Функция находит целые точки на интервалах возрастания и убывания функции.
 * 
 * @param {Object} intervals - Объект с интервалами возрастания и убывания функции.
 * @param {number} minX - Минимальное значение X.
 * @param {number} maxX - Максимальное значение X.
 * @param {boolean} includeMinX - Флаг включения minX в результат.
 * @param {boolean} includeMaxX - Флаг включения maxX в результат.
 * @returns {Object} Объект с двумя полями:
 *   - increasingPoints: Массив целых точек на интервалах возрастания.
 *   - decreasingPoints: Массив целых точек на интервалах убывания.
 */
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

/**
 * Функция находит целочисленные точки на интервалах убывания функции.
 * 
 * @param {Function} func - Функция, для которой ищутся точки
 * @param {number} minX - Минимальное значение x
 * @param {number} maxX - Максимальное значение x
 * @param {number} [stepSize=0.1] - Размер шага для поиска интервалов
 * @param {number} [tolerance=1e-7] - Допустимое отклонение
 * @param {number} [maxIterations=1000] - Максимальное количество итераций
 * @returns {Array<number>} Массив целочисленных точек на интервалах убывания функции
 */
function findDecreasingIntegerPoints(func, minX, maxX, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    let decreasingIntervals = findDecreasingIntervals(func, minX, maxX, stepSize, tolerance, maxIterations);
    let decreasingIntegerPoints = [];

    for (let interval of decreasingIntervals) {
        let points = findIntegerPointsInInterval(interval, minX, maxX);
        decreasingIntegerPoints.push(...points);
    }

    return decreasingIntegerPoints;
}

/**
 * Функция находит целочисленные точки на интервалах возрастания функции.
 * 
 * @param {Function} func - Функция, для которой ищутся точки.
 * @param {number} minX - Минимальное значение x.
 * @param {number} maxX - Максимальное значение x.
 * @param {number} [stepSize=0.1] - Размер шага для поиска интервалов.
 * @param {number} [tolerance=1e-7] - Допустимое отклонение.
 * @param {number} [maxIterations=1000] - Максимальное количество итераций.
 * @returns {Array} Массив целочисленных точек на интервалах возрастания функции.
 */
function findIncreasingIntegerPoints(func, minX, maxX, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    let increasingIntervals = findIncreasingIntervals(func, minX, maxX, stepSize, tolerance, maxIterations);
    let increasingIntegerPoints = [];

    for (let interval of increasingIntervals) {
        let points = findIntegerPointsInInterval(interval, minX, maxX);
        increasingIntegerPoints.push(...points);
    }

    return increasingIntegerPoints;
}

/**
 * Функция находит положительные и отрицательные интервалы функции на заданном отрезке.
 * 
 * @param {Function} func - Функция, для которой ищутся интервалы.
 * @param {number} minX - Начало отрезка.
 * @param {number} maxX - Конец отрезка.
 * @param {boolean} includeMinX - Флаг включения начальной точки в интервалы.
 * @param {boolean} includeMaxX - Флаг включения конечной точки в интервалы.
 * @returns {Object} Объект с двумя полями:
 *   - positiveIntervals: массив положительных интервалов
 *   - negativeIntervals: массив отрицательных интервалов
 */
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

/**
 * Находит интервалы, на которых функция отрицательна.
 * 
 * @param {Function} func - Функция, для которой ищутся отрицательные интервалы.
 * @param {number} minX - Минимальное значение x.
 * @param {number} maxX - Максимальное значение x.
 * @param {number} step - Шаг при поиске корней функции (по умолчанию 0.001).
 * @param {number} tolerance - Допустимая погрешность при нахождении корней (по умолчанию 1e-7).
 * @param {number} maxIterations - Максимальное количество итераций при поиске корней (по умолчанию 1000).
 * @returns {Array} - Массив интервалов, на которых функция отрицательна.
 */
function findNegativeIntervals(func, minX, maxX, step = 0.001, tolerance = 1e-7, maxIterations = 1000) {
    let roots = findRoots(func, minX, maxX, step, tolerance, maxIterations);
    let intervals = findPositiveAndNegativeIntervals(func, minX, maxX, roots, false, false);
    let negativeIntervals = intervals.negativeIntervals;

    return negativeIntervals;
}

/**
 * Находит интервалы, на которых функция положительна.
 *
 * @param {Function} func - Функция, для которой ищутся положительные интервалы.
 * @param {number} minX - Начало отрезка.
 * @param {number} maxX - Конец отрезка.
 * @param {number} step - Шаг при поиске корней.
 * @param {number} tolerance - Допустимая погрешность при нахождении корней.
 * @param {number} maxIterations - Максимальное количество итераций при поиске корней.
 * @returns {Array<Array<number>>} - Массив интервалов, на которых функция положительна.
 */
function findPositiveIntervals(func, minX, maxX, step = 0.001, tolerance = 1e-7, maxIterations = 1000) {
    let roots = findRoots(func, minX, maxX, step, tolerance, maxIterations);
    let intervals = findPositiveAndNegativeIntervals(func, minX, maxX, roots, false, false);
    let positiveIntervals = intervals.positiveIntervals;

    return positiveIntervals;
}


/**
 * Функция находит целые точки в заданных интервалах, где функция положительна и отрицательна.
 * 
 * @param {Object} intervals - Объект с интервалами, где функция положительна и отрицательна.
 * @param {number} minX - Минимальное значение X.
 * @param {number} maxX - Максимальное значение X.
 * @param {boolean} includeMinX - Флаг включения minX в результат.
 * @param {boolean} includeMaxX - Флаг включения maxX в результат.
 * @returns {Object} Объект с двумя полями:
 * - positivePoints: массив целых точек из интервалов, где функция положительна
 * - negativePoints: массив целых точек из интервалов, где функция отрицательна
 */
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

/**
 * Находит целочисленные точки функции на заданном интервале, где функция отрицательна.
 * 
 * @param {Function} func - Функция, для которой ищутся точки.
 * @param {number} minX - Минимальное значение x на интервале.
 * @param {number} maxX - Максимальное значение x на интервале.
 * @param {number} [stepSize=0.1] - Шаг для поиска корней.
 * @param {number} [tolerance=1e-7] - Допустимая погрешность.
 * @param {number} [maxIterations=1000] - Максимальное количество итераций для поиска корней.
 * 
 * @returns {Array} - Массив целочисленных точек функции, где функция отрицательна.
 */
function findNegativeIntegerPoints(func, minX, maxX, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    let roots = findRoots(func, minX, maxX, stepSize, tolerance, maxIterations);
    let intervals = findPositiveAndNegativeIntervals(func, minX, maxX, roots, false, false);
    let points = findPositiveAndNegativePoints(intervals, minX, maxX);

    return points.negativePoints;
}

/**
 * Находит целочисленные точки функции на заданном интервале, где функция положительна.
 * 
 * @param {Function} func - Функция, для которой ищутся точки.
 * @param {number} minX - Минимальное значение x на интервале.
 * @param {number} maxX - Максимальное значение x на интервале.
 * @param {number} [stepSize=0.1] - Размер шага для поиска корней.
 * @param {number} [tolerance=1e-7] - Допустимая погрешность при нахождении корней.
 * @param {number} [maxIterations=1000] - Максимальное количество итераций для поиска корней.
 * @returns {Array} - Массив целочисленных точек функции на интервале, где функция положительна.
 */
function findPositiveIntegerPoints(func, minX, maxX, stepSize = 0.1, tolerance = 1e-7, maxIterations = 1000) {
    let roots = findRoots(func, minX, maxX, stepSize, tolerance, maxIterations);

    let intervals = findPositiveAndNegativeIntervals(func, minX, maxX, roots, false, false);
    let points = findPositiveAndNegativePoints(intervals, minX, maxX);

    return points.positivePoints;
}

/**
 * Функция добавляет корни в массив X и Y.
 * 
 * @param {Array} X - Массив значений X.
 * @param {Array} Y - Массив значений Y.
 * @param {Object} rootsIsInteger - Объект, указывающий, являются ли корни целыми числами.
 * @returns {Object} Объект с обновленными массивами X и Y.
 */
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

/**
 * Создает сплайн на основе заданных параметров.
 * 
 * @param {Object} options - Объект с параметрами для создания сплайна.
 * @param {string} options.type - Тип сплайна ('derivative' или 'function').
 * @param {number} options.minX - Минимальное значение по оси X.
 * @param {number} options.maxX - Максимальное значение по оси X.
 * @param {number} options.minY - Минимальное значение по оси Y.
 * @param {number} options.maxY - Максимальное значение по оси Y.
 * @param {number} options.stepForX - Шаг по оси X.
 * @param {number} options.stepForY - Шаг по оси Y.
 * @param {Object} options.extremumsIsInteger - Объект с параметрами для экстремумов.
 * @param {string} options.extremumsIsInteger.int - Флаг, указывающий на целочисленность экстремумов ('yes', 'no' или 'no_matter').
 * @param {number} options.extremumsIsInteger.tolerance - Допустимая погрешность для целочисленности экстремумов.
 * @param {Object} options.rootsIsInteger - Объект с параметрами для корней.
 * @param {string} options.rootsIsInteger.int - Флаг, указывающий на целочисленность корней ('yes', 'no' или 'no_matter').
 * @param {number} options.rootsIsInteger.tolerance - Допустимая погрешность для целочисленности корней.
 * @param {number} options.minimumDifferenceBetweenExtremes - Минимальная разница между экстремумами.
 * @param {Object} options.numberOfExtremes - Объект с минимальным и максимальным количеством экстремумов.
 * @param {number} options.numberOfExtremes.min - Минимальное количество экстремумов.
 * @param {number} options.numberOfExtremes.max - Максимальное количество экстремумов.
 * @param {Object} options.numberOfRoots - Объект с минимальным и максимальным количеством корней.
 * @param {number} options.numberOfRoots.min - Минимальное количество корней.
 * @param {number} options.numberOfRoots.max - Максимальное количество корней.
 * @param {boolean} options.monotoneFunction - Флаг, указывающий на монотонность функции.
 * 
 * @returns {Object} - Объект с функцией и функцией отрисовки сплайна.
 */
function createSpline({ type, minX, maxX, minY, maxY, stepForX = 1, stepForY = 1, extremumsIsInteger = { int: 'no_matter', tolerance: 0.2 }, rootsIsInteger = { int: 'no_matter', tolerance: 0.2 },
    minimumDifferenceBetweenExtremes = 1, numberOfExtremes = { min: 0, max: 1000 }, numberOfRoots = { min: 0, max: 1000 }, monotoneFunction = false,
}) {
    let X = fillArray(minX, maxX, stepForX * 0.5)
    let Y = [slKrome(0, minY + 0.1, maxY - 0.1, stepForY)];

    let maxMin = sl1();

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
    let paintFunc;
    switch (type) {
        case 'derivative':
            paintFunc = (x) => 1000 * (spline.at(x + 0.001) - spline.at(x - 0.001));
            break;
        case 'function':
        default:
            paintFunc = (x) => spline.at(x);
            break;
    }

    genAssert(paintFunc(maxX) < maxY && paintFunc(maxX) > minY, 'Функция вышла за пределы сетки с правого конца');
    genAssert(paintFunc(minX) < maxY && paintFunc(minX) > minY, 'Функция вышла за пределы сетки с левого конца');
    genAssert(paintFunc(maxX).abs() > 0.5, 'Функция заканчивается нулём');
    genAssert(paintFunc(minX).abs() > 0.5, 'Функция начинается нулём');

    let extX = extremumsX(paintFunc, minX, maxX);
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

    let extY = extremumsY(paintFunc, minX, maxX);
    extY.forEach((elem) => genAssert(elem < maxY, 'Функция вышла за пределы сетки сверху'));
    extY.forEach((elem) => genAssert(elem > minY, 'Функция вышла за пределы сетки снизу'));
    extY.forEach((elem) => genAssert(elem.abs() > 0.5, 'Экстремум слишком близко к оси Ox'));
    for (let index = 1; index < extY.length; index++) {
        genAssert(Math.abs(extY[index] - extY[index - 1]) > minimumDifferenceBetweenExtremes, 'Разница между соседними экстремумами меньше, чем ' + minimumDifferenceBetweenExtremes);
    };

    genAssert((extY[0] - paintFunc(minX)).abs() > minimumDifferenceBetweenExtremes, 'Экстремум слишком близко к левому концу по y');
    genAssert((extY[extY.length - 1] - paintFunc(maxX)).abs() > minimumDifferenceBetweenExtremes, 'Экстремум слишком близко к правому концу по y')

    let rootF = findRoots(paintFunc, minX, maxX);
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

    genAssertGraphIntersectsPointWithNeighborhood(paintFunc, 1.1, -0.3, 0.2);
    genAssertGraphIntersectsPointWithNeighborhood(paintFunc, -0.5, 1.1, 0.2);
    genAssertGraphIntersectsPointWithNeighborhood(paintFunc, -0.3, -0.3, 0.2);
    genAssertGraphIntersectsPointWithNeighborhood(paintFunc, maxX, -0.3, 0.2);
    genAssertGraphIntersectsPointWithNeighborhood(paintFunc, minX, -0.3, 0.2);

    return { func, paintFunc };
};

/**
 * Функция paintSpline отрисовывает сплайн функции на графике с заданными параметрами.
 * @param {Object} options - Объект с параметрами для отрисовки сплайна.
 * @param {Function} options.func - Функция, для которой строится сплайн.
 * @param {number} options.minX - Минимальное значение по оси X.
 * @param {number} options.maxX - Максимальное значение по оси X.
 * @param {number} options.minY - Минимальное значение по оси Y.
 * @param {number} options.maxY - Максимальное значение по оси Y.
 * @param {Array} options.points - Массив точек для отметки на графике.
 * @param {number} options.step - Шаг для построения графика.
 * @param {number} options.scale - Масштаб графика.
 * @param {number} options.height - Высота холста.
 * @param {number} options.width - Ширина холста.
 * @param {string} options.font - Шрифт для текста на графике.
 * @param {number} options.lineWidth - Толщина линии графика.
 * @param {Array} options.lineDash - Пунктир для линии графика.
 * @param {number} options.singleSegmentX - Длина сегмента по оси X.
 * @param {number} options.singleSegmentY - Длина сегмента по оси Y.
 * @param {Object} options.markedPoints - Параметры для отмеченных точек на графике.
 * @param {Array} options.markedPoints.type - Тип отмеченных точек.
 * @param {string} options.markedPoints.fontMarkedPoints - Шрифт для отмеченных точек.
 * @param {number} options.markedPoints.lineWidthMarkedPoints - Толщина линии отмеченных точек.
 * @param {boolean} options.definedOnInterval - Флаг, указывающий, определен ли график на интервале.
 * @returns {Function} Функция для отрисовки сплайна на холсте.
 */
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
        graph9AdrawFunction(ctx, func, {minX, maxX, minY, maxY, step,});
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
            paintMarkedPoints(ctx, points, func, {scale, font, lineDash, circleRadius: 2,}, markedPoints)
        }
    };
}

/**
 * Рисует отмеченные точки на контексте холста на основе предоставленной функции и параметров.
 * 
 * @param {CanvasRenderingContext2D} ctx - Контекст холста для рисования.
 * @param {number[]} points - X-координаты точек для отметки.
 * @param {Function} func - Функция для вычисления Y-координат на основе X-координат.
 * @param {Object} options - Объект, содержащий параметры настройки::
 *                           - scale: Масштабный коэффициент для позиционирования (по умолчанию 20).
 *                           - lineDash: Шаблон пунктирных линий (по умолчанию [4, 2]).
 *                           - circleRadius: Радиус круга для отображения отмеченных точек (по умолчанию 2).
 * @param {Object} markedPoints -  markedPoints - Объект, определяющий способ отметки точек:
 *                                - type: Тип отметки ('symbol' или 'number').
 *                                - fontMarkedPoints: Стиль шрифта для отметки (по умолчанию "16px liberation_sans").
 *                                - lineWidthMarkedPoints: Ширина линии для отметки (по умолчанию 0.12).
 */
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

/**
 * Генерирует случайный подотрезок между заданными минимальным и максимальным значениями.
 * 
 * @param {number} minX - Минимальное значение подотрезка.
 * @param {number} maxX - Максимальное значение подотрезка.
 * @param {number} stepX - Шаг для генерации случайной длины подотрезка.
 * @returns {Array} - Массив, содержащий начало и конец случайного подотрезка.
 */
function getRandomSubSegment(minX, maxX, stepX) {
    let randomLength = sl(stepX, maxX - minX);
    let start = sl(minX, maxX - randomLength);

    return [start, start + randomLength];
}

/**
 * Функция проверяет, что все элементы в массиве являются уникальными с учетом заданного допуска.
 * @param {Array} array - Массив элементов для проверки.
 * @param {number} tolerance - Допуск для сравнения элементов.
 * @returns {boolean} - Возвращает true, если все элементы уникальны с учетом допуска, иначе false.
 */
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

/**
 * Функция находит точки пересечения функции с константным значением в указанном интервале.
 * 
 * @param {Function} func - Функция, с которой ищутся точки пересечения.
 * @param {number} constValue - Константное значение, с которым ищутся точки пересечения.
 * @param {number} minX - Минимальное значение x для интервала поиска.
 * @param {number} maxX - Максимальное значение x для интервала поиска.
 * @param {number} [stepSize=0.1] - Шаг для разбиения интервала.
 * @param {number} [tolerance=1e-7] - Допустимая погрешность при нахождении корня уравнения.
 * @param {number} [maxIterations=1000] - Максимальное количество итераций для метода Брента.
 * @returns {Array} - Массив точек пересечения функции с константным значением в указанном интервале.
 */
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
