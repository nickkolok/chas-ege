(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        'use strict';
        let key = "511614";

        let variant = getListedPreference(key, [{
            preference: 'two_boys',
            preferenceValue: 0,
        }, {
            preference: 'two_girl',
            preferenceValue: 1,

        }, {
            preference: 'boy',
            preferenceValue: 2,
        }, {
            preference: 'girl',
            preferenceValue: 3,

        }, {
            preference: 'boy_and_girl',
            preferenceValue: 4,

        }], sl(0, 4));

        let age = sl(0, 2);

        let questiton;
        switch (variant) {
            case 0:
                questiton = 'оба пришедших оказались ' + ['мальчиками', 'юношами', 'мужчинами'][age];
                break;
            case 1:
                questiton = 'обе пришедших оказались ' + ['девочками', 'девушками', 'женщинами'][age];
                break;
            case 2:
                questiton = 'среди пришедших есть хотя бы один ' + ['мальчик', 'юноша', 'мужчина'][age];
                break;
            case 3:
                questiton = 'среди пришедших есть хотя бы одна ' + ['девочка', 'девушка', 'женщина'][age];
                break;
            case 4:
                questiton = 'пришли ' + ['мальчик', 'юноша', 'мужчина'][age] + ' и ' + ['девочка', 'девушка', 'женщина'][age];
                break;
        }

        NAtask.setTask({
            text: `$${sl(1, 28)}$ ${[`апреля`, `июля`, sklonlxkand(om.months.iz()).re][age]} на  ${[`запись в первый класс`, `подачу документов`, `собеседование`][age]} независимо друг от друга пришли
			два будущих ${[`первоклассника`, `студента`, `работника`][age]}. Считая, что приходы ${['мальчика', 'юношы', 'мужчины'][age]} и ${['девочки', 'девушки', 'женщины'][age]}
			равновероятны, найдите вероятность того, что ${questiton}.`,
            answers: [0.25, 0.25, 0.75, 0.75, 0.5][variant],
            authors: ['Суматохина Александра'],
        });
    }, 100);
})();

// 511614 511654 511674 511694
