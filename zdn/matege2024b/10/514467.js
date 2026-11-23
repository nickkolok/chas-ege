(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '514467';

        let preference = ['cottage', 'resort'];
        let resort = getSelectedPreferenceFromList(key, preference);
        let B = resort ? sl(3, 9) * 100 : sl(20, 50, 5);
        let A = resort ? sl(B / 100 + 1, 15) * 100 : B + sl(5, 25, 5);
        let object = resort ? 'санатория' : 'дачи';
        let water = resort ? 'моря' : 'реки';

        let text = 'Участок земли для строительства ' + object + ' имеет форму прямоугольника, стороны которого равны $' + A + '$ м и $' + B + '$ м. ' +
	        'Одна из больших сторон участка идёт вдоль ' + water + ', а три остальные стороны нужно огородить забором. ' +
	        'Найдите длину этого забора. Ответ дайте в метрах.';

        let answer = A + 2 * B;

        NAtask.setTask({
	        text: text,
	        analys: 'Вдоль ' + water + ' забор не требуется. Поэтому длина забора равна $' + A + '+2\\cdot' + B + '=' + answer + '$ м.',
	        answers: answer,
	        preference,
        });

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: function (ct) {
                let left = 70;
                let right = 330;
                let top = 100;
                let bottom = 300;

                ct.strokeStyle = om.primaryBrandColors[0];
                ct.fillStyle = om.secondaryBrandColors[0];
                ct.lineWidth = 2;

                // Прямоугольник как в исходном рисунке
                ct.drawLine(left, top, right, top);
                ct.drawLine(right, top, right, bottom);
                ct.drawLine(right, bottom, left, bottom);
                ct.drawLine(left, bottom, left, top);

                ct.font = '16px liberation_sans';

                // Большая сторона — сверху
                ct.textAlign = 'center';
                ct.textBaseline = 'alphabetic';
                ct.fillText(A, (left + right) / 2, top - 10);

                // Малая сторона — слева
                ct.textAlign = 'right';
                ct.textBaseline = 'middle';
                ct.fillText(B, left - 10, (top + bottom) / 2);
            },
        });
    }, 20000);
})();

//https://mathb-ege.sdamgia.ru/problem?id=514467
// 057DF6, 7A5105, 14DE59, E2F338, A5BD0E, 769EB9, F7AACC, 974B66, FB114D, 7475FC, 802B27, 292D5D, 1314AA
