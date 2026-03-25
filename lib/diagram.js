// Функции проверки поведения данных
function isIncreasing(interval) {
    if (interval.length < 2)
        return false;
    return interval.every((val, i) => i === 0 || val > interval[i - 1]);
}

function isDecreasing(interval) {
    if (interval.length < 2)
        return false;
    return interval.every((val, i) => i === 0 || val < interval[i - 1]);
}

function isNonIncreasing(interval) {
    if (interval.length < 2)
        return true;
    return interval.every((val, i) => i === 0 || val <= interval[i - 1]);
}

function isNonDecreasing(interval) {
    if (interval.length < 2)
        return true;
    return interval.every((val, i) => i === 0 || val >= interval[i - 1]);
}

// Функции проверки диапазона значений
function isMore(interval, value) {
    return interval.length > 0 && interval.every(item => item > value);
}

function isLess(interval, value) {
    return interval.length > 0 && interval.every(item => item < value);
}

function isNonMore(interval, value) {
    return interval.length > 0 && interval.every(item => item <= value);
}

function isNonLess(interval, value) {
    return interval.length > 0 && interval.every(item => item >= value);
}

// Функции для поиска экстремумов в интервалах
function findMaxInIntervals(intervals, values) {
    if (!intervals.length || !values.length)
        return null;

    const globalMax = math.max(values);
    const maxIndices = [];

    intervals.forEach((interval, i) => {
        if (interval.some(val => math.equal(val, globalMax))) {
            maxIndices.push(i);
        }
    });

    return maxIndices.length === 1 ? maxIndices[0] : null;
}

function findMinInIntervals(intervals, values) {
    if (!intervals.length || !values.length)
        return null;

    const globalMin = math.min(values);
    const minIndices = [];

    intervals.forEach((interval, i) => {
        if (interval.some(val => math.equal(val, globalMin))) {
            minIndices.push(i);
        }
    });

    return minIndices.length === 1 ? minIndices[0] : null;
}

// Функции для анализа нулевых интервалов (остановок)
function lengthOfZeroInterval(interval) {
    if (!interval.length)
        return 0;

    let maxZeros = 0;
    let currentZeros = 0;

    interval.forEach(val => {
        if (math.equal(val, 0)) {
            currentZeros++;
            maxZeros = Math.max(maxZeros, currentZeros);
        } else {
            currentZeros = 0;
        }
    });

    return maxZeros;
}

// Функции для проверки постоянства значений
function wasConst(interval) {
    if (interval.length < 2)
        return false;
    return interval.some((val, i) => i > 0 && math.equal(val, interval[i - 1]) && !math.equal(val, 0));
}

function lengthConst(interval) {
    if (interval.length < 2)
        return 0;

    let maxLength = 1;
    let currentLength = 1;

    for (let i = 1; i < interval.length; i++) {
        if (math.equal(interval[i], interval[i - 1]) && !math.equal(interval[i], 0)) {
            currentLength++;
            maxLength = Math.max(maxLength, currentLength);
        } else {
            currentLength = 1;
        }
    }

    return maxLength;
}

function constValueByFirst(interval) {
    if (interval.length < 2)
        return true;
    const first = interval[0];
    return interval.every(val => math.equal(val, first));
}

// Функции для проверки сложного поведения 
function isIncreasingAfterIsDecreasing(interval) {
    if (interval.length < 3)
        return false;

    let inflectionPoint = -1;

    // Находим точку перегиба (последний максимум перед убыванием)
    for (let i = 1; i < interval.length - 1; i++) {
        if (interval[i] > interval[i - 1] && interval[i] > interval[i + 1]) {
            inflectionPoint = i;
            break;
        }
    }

    if (inflectionPoint === -1)
        return false;

    // Проверяем возрастание до точки перегиба
    const increasingPart = interval.slice(0, inflectionPoint + 1);
    const isIncreasingValid = isIncreasing(increasingPart) || (inflectionPoint > 0 && isNonDecreasing(increasingPart));

    // Проверяем убывание после точки перегиба
    const decreasingPart = interval.slice(inflectionPoint);
    const isDecreasingValid = isDecreasing(decreasingPart) || isNonIncreasing(decreasingPart);

    return isIncreasingValid && isDecreasingValid;
}

function isDecreasingAfterIsIncreasing(interval) {
    if (interval.length < 3) return false;

    let inflectionPoint = -1;

    // Находим точку перегиба (последний минимум перед возрастанием)
    for (let i = 1; i < interval.length - 1; i++) {
        if (interval[i] < interval[i - 1] && interval[i] < interval[i + 1]) {
            inflectionPoint = i;
            break;
        }
    }

    if (inflectionPoint === -1) return false;

    // Проверяем убывание до точки перегиба
    const decreasingPart = interval.slice(0, inflectionPoint + 1);
    const isDecreasingValid = isDecreasing(decreasingPart) || (inflectionPoint > 0 && isNonIncreasing(decreasingPart));

    // Проверяем возрастание после точки перегиба
    const increasingPart = interval.slice(inflectionPoint);
    const isIncreasingValid = isIncreasing(increasingPart) || isNonDecreasing(increasingPart);

    return isDecreasingValid && isIncreasingValid;
}

// Специальная функция для анализа остановки после убывания
function isDecreasingAfterZero(interval) {
    if (interval.length < 2)
        return false;

    const minIndex = interval.indexOf(math.min(interval));
    const minValue = interval[minIndex];

    if (minIndex === 0 || !math.equal(minValue, 0)) {
        return false;
    }

    // Проверяем убывание до нуля
    const beforeZero = interval.slice(0, minIndex + 1);
    if (!isNonIncreasing(beforeZero))
        return false;

    // Проверяем, что после нуля все значения тоже нули
    const afterZero = interval.slice(minIndex);
    return afterZero.every(val => math.equal(val, 0));
}

// Вспомогательные функции для работы с уникальными значениями
function noHasDublValue(array, value) {
    const firstIndex = array.findIndex(item => math.equal(item, value));
    return firstIndex !== -1 && array.findLastIndex(item => math.equal(item, value)) === firstIndex;
}

function addUniqueAnsw(conditions, answ, text) {
    const trueIndices = conditions
        .map((cond, i) => cond ? i : -1)
        .filter(i => i !== -1);

    if (trueIndices.length === 1) {
        answ[trueIndices[0]].solution.push(text);
    }
}

// Функция для поиска индексов постоянных значений
function indexConst(interval) {
    const indices = new Set();

    for (let i = 1; i < interval.length; i++) {
        if (math.equal(interval[i], interval[i - 1])) {
            indices.add(i).add(i - 1);
        }
    }

    return Array.from(indices).sort((a, b) => a - b);
}
