(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = "369728";
        let preference = ['frac', 'square', 'advancedFrac'];
        let rand = getListedPreference(key, preference.map((pref, index) => ({
            preference: pref,
            preferenceValue: index
        })), sl(preference.length - 1));

        let randMinus = [-1, 1].iz();
        let section = ['отрезку', 'промежутку'].iz();

        let countDrob = sl(3, 12);
        let denominator = sl(2, 25);
        let numerator = sl(1, denominator - 1);
        let numDrob = countDrob * denominator + numerator;
        let valueDrob = (numDrob / denominator) * randMinus;
        let correctDrob = (randMinus * numDrob).texfrac(denominator);

        let countSqrt = sl(5, 25);
        let numSqrt = countSqrt.sqr() + denominator;
        let valueSqrt = numSqrt.sqrt();

        genAssert(!numSqrt.isPolnKvadr(), "корень не должен быть полным квадратом ");

        let correctSqrt = '\\sqrt{' + numSqrt + '}';

        let value = [valueDrob, valueSqrt, valueDrob][rand];
        let correctExpr = [correctDrob, correctSqrt, correctDrob][rand];
        let floor = Math.floor(value);
        let intervalText = `[${floor}; ${floor + 1}]`;

        let wrongAnswers = [];
        let ifFracAdvanced = '';

        if (rand === 0 || rand === 2) { //дробь

            let usedNumerators = [numDrob];
            let variants = [{ val: valueDrob, expr: correctDrob }];

            while (variants.length < 4) {
                let delta = sl(1, 4).pm();
                let newCount = countDrob + delta;
                if (newCount < 1) {
                    continue
                };

                let fakeNumerator = newCount * denominator + numerator;
                if (usedNumerators.includes(fakeNumerator)) {
                    continue
                };
                usedNumerators.push(fakeNumerator);

                let val = fakeNumerator / denominator;
                if (randMinus === -1) {
                    val *= -1
                };
                if (val >= floor && val <= floor + 1) {
                    continue
                };

                let expr = (randMinus * fakeNumerator).texfrac(denominator);
                variants.push({ val, expr });
            }
            variants.shuffle();
            correctExpr = correctDrob;
            wrongAnswers = variants.filter(v => v.expr !== correctDrob).map(v => v.expr);

            if (rand === 2) {
                ifFracAdvanced = variants.map(x => '$' + x.expr + '$').join(', ') + ' ';
            }
        } else if (rand === 1) { // корни
            let usedSqrts = [numSqrt];
            while (wrongAnswers.length < 3) {
                let offset = sl(1, 10).pm();

                let fakeRoot = (countSqrt + offset).sqr() + sl(1, 10);
                if (fakeRoot <= 0 || usedSqrts.includes(fakeRoot)) {
                    continue
                };

                let val = fakeRoot.sqrt();
                if (val >= floor && val <= floor + 1) {
                    continue
                };

                usedSqrts.push(fakeRoot);
                wrongAnswers.push(`\\sqrt{${fakeRoot}}`);
            }
        }
        let dataName = ['имеющихся', 'данных', ''][rand];

        NAtask.setTask({
            text: 'Какое из ' + dataName + ' чисел ' + ifFracAdvanced + 'принадлежит ' + section + ' ${' + intervalText + '}$? В ответе укажите номер правильного варианта.',
            answers: correctExpr,
            wrongAnswers: wrongAnswers,
            preference: preference,
        });

        AtoB(3, { autoLaTeX: true });
    }, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=369728
//https://oge.sdamgia.ru/test?likes=337389
