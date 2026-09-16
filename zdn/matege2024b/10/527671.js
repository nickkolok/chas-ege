(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '527671';
        let preference = ['find_post', 'find_slide'];
        let rand = getSelectedPreferenceFromList(key, preference);

        // Высота горки H от 2.0 до 4.0 м с шагом 0.1 (включая 2.5 м из оригинала)
        let H = sl(20, 40, 1) / 10;
        // Высота столба h = H / 2 (будет с шагом 0.05, например, 1.25)
        let h = H / 2;
        
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
