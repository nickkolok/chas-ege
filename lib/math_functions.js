function findExtremumsOfFunction(func, minX, maxX, step, boundaryPointIsMax, boundaryPointIsMin) {
	//Возвращает объект с полями minP, maxP, где каждый массив с координатами минимумов функции и максмимумов соответсвенно
	//func - функция типа func(x)
	//minX,maxX - границы поиска экстремумов функции
	//step - шаг
	//boundaryPointIsMax - необходимо ли включить границы в максимумы
	//boundaryPointIsMin - необходимо ли включить границы в минимумы

	boundaryPointIsMax = boundaryPointIsMax || false;
	boundaryPointIsMin = boundaryPointIsMin || false;

	let funcMin=func(minX);
	let funcMax=func(maxX);

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

	let funcNext = func(minX + 2*step);
	let funcI = func(minX + step);
	let funcPrevious = func(minX);

	for (let i = minX + step; i < maxX; i += step){

		if (funcI < funcPrevious && funcI < funcNext)
			minimums.push([i, funcI]);
		if (funcI > funcPrevious && funcI > funcNext)
			maximums.push([i, funcI]);

		funcPrevious=funcI;
		funcI=funcNext;
		funcNext=func(i + 2*step);
	}

	return {
		minP: minimums,
		maxP: maximums
	};
}

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
