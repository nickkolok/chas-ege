(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '527671';
        let preference = ['find_post', 'find_slide'];
        let rand = getSelectedPreferenceFromList(key, preference);
        let H = sl(20, 40, 1) / 10;
        let h = H / 2;

        NAtask.setTask({
            text: 'Вертикальный столб подпирает детскую горку посередине. Найдите высоту горки, если высота этого столба равна $' + [h,H][rand] + '$ м. Ответ дайте в метрах.',
            answers: [H,h][rand],
            preference: preference,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 20000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=527671
