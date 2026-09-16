(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '527671';
        let preference = ['find_post', 'find_slide'];
        let rand = getSelectedPreferenceFromList(key, preference);

        // Высота столба h от 1.0 до 2.0 с шагом 0.1
        let h = sl(10, 20, 1) / 10;
        // Высота горки H = 2 * h
        let H = 2 * h;
        
        let text, result;
        if (rand === 0) {
            text = 'Вертикальный столб подпирает детскую горку посередине. Найдите высоту этого столба, если высота горки равна $' + H + '$ м. Ответ дайте в метрах.';
            result = h;
        } else {
            text = 'Вертикальный столб подпирает детскую горку посередине. Найдите высоту горки, если высота этого столба равна $' + h + '$ м. Ответ дайте в метрах.';
            result = H;
        }

        NAtask.setTask({
            text: text,
            answers: result,
            preference: preference,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 20000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=527671
