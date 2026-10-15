(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        // 1. Генерация параметров выборки
        let n = sluchch(3, 7); // Размер выборки от 3 до 7

        // Генерируем n значений. Чтобы избежать нулевой дисперсии, используем диапазон и шаг 0.1
        // Значения будут вида X.Y
        let sample = arrayOfUniqueValues(n, 0.5, 5, 0.1);

        // 2. Расчет статистик с помощью MathJS
        // Выборочное среднее
        let mean = math.mean(sample);

        // Сумма квадратов отклонений: sum((x - mean)^2)
        let sumSqDiff = math.sum(sample.map(x => math.pow(math.subtract(x, mean), 2)));

        // Несмещенная оценка дисперсии: S^2 = sum / (n - 1)
        let unbiasedVariance = math.divide(sumSqDiff, n - 1);

        // Проверки на адекватность ответа
        genAssertZ1000(unbiasedVariance); // Ответ должен быть разумным числом
        genAssert(unbiasedVariance > 0, "Дисперсия должна быть положительной");

        // 3. Формирование текста условия
        // Форматируем выборку: "1,4; 1,2; ..."
        let sampleStr = sample.map(x => x.ts()).joinLast(', ', ' и ');

        NAtask.setTask({
            text: `Случайная выборка из некоторой генеральной совокупности содержит ${n} значений:<br/>` +
                `<p style="text-align: center;">${sampleStr}.</p><br/>` +
                `По этой выборке найдите несмещённую оценку дисперсии генеральной совокупности.`,
            answers: unbiasedVariance,
            analys: `Несмещённая оценка дисперсии генеральной совокупности вычисляется по формуле:<br/>` +
                `$S^2 = \\frac{1}{n-1} \\sum_{i=1}^{n} (x_i - \\bar{x})^2$,<br/>` +
                `где $n = ${n}$ — объём выборки, $\\bar{x}$ — выборочное среднее.` +
                `<br/><br/>1. Найдем выборочное среднее:<br/>` +
                `$\\bar{x} = \\frac{${sample.map(x => x.ts()).join(' + ')}}{${n}} = ${mean.ts()}$.` +
                `<br/><br/>2. Найдем сумму квадратов отклонений от среднего:<br/>` +
                `$\\sum (x_i - \\bar{x})^2 = ${sample.map(x => `(${x.ts()} - ${mean.ts()})^2`).join(' + ')} = ${sumSqDiff.ts()}$.` +
                `<br/><br/>3. Вычислим несмещённую оценку дисперсии:<br/>` +
                `$S^2 = \\frac{${sumSqDiff.ts()}}{${n}-1} = \\frac{${sumSqDiff.ts()}}{${n - 1}} = ${unbiasedVariance.ts()}$.`
        });

        NAtask.modifiers.allDecimalsToStandard(true);
    });
})();
//509479
