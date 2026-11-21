(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '509441';
        // Предпочтения для количества успешных бросков: 2, 3 или 4
        let preference = ['two_times', 'three_times', 'four_times'];
        let randIndex = getSelectedPreferenceFromList(key, preference);

        // k - количество раз, которое должна выпасть нужная грань
        let k = randIndex + 2;

        // Выбираем случайную грань кубика (от 1 до 6)
        let targetFace = sluchch(1, 6);
        let faceNames = sklonlxkand(['единица', 'двойка', 'тройка', 'четвёрка', 'пятёрка', 'шестёрка'][targetFace - 1]);

        // Математическое ожидание числа испытаний до k успехов: E = k / p = k * 6
        let EX = math.multiply(k, 6);

        genAssertZ1000(EX);

        NAtask.setTask({
            text: `Игральный кубик бросают до тех пор, пока ${faceNames.ie} не выпадет ${chislitlx(k, 'раз')}, не обязательно подряд. Найдите математическое ожидание случайной величины «число сделанных бросков».`,
            answers: EX,
            preference: preference,
            analys: `Пусть случайная величина $X$ — число бросков до того момента, как грань «${targetFace}» выпадет ${['два', 'три', 'четыре'][randIndex]} раза. ` +
                `Вероятность выпадения этой грани при одном броске равна $p = \\frac{1}{6}$.` +
                `<br/>Математическое ожидание числа испытаний до наступления $k$ успехов в схеме Бернулли вычисляется по формуле: $M(X) = \\frac{k}{p}$.` +
                `<br/>В нашем случае $k = ${k}$, следовательно: $M(X) = \\cfrac{${k}}{\\frac{1}{6}} = ${k} \\cdot 6 = ${EX}$.`
        });

        NAtask.modifiers.allDecimalsToStandard(true);
    });
})();
//509441
