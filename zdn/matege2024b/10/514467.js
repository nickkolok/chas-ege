(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '514467';

        let B = sl(3, 9) * 100;
        let A = sl(B / 100 + 1, 15) * 100;
        let object = ['дачи', 'санатория', 'коттеджа', 'маленького рыбацкого домика', 'базы отдыха', 'пионерского лагеря'].iz();
        let water = ['реки', 'моря', 'пруда', 'водохранилища', 'залива', 'бухты', 'пляжа', 'озера', 'затона'].iz();

        let text = 'Участок земли для строительства ' + object + ' имеет форму прямоугольника, стороны которого равны $' + A + '$ м и $' + B + '$ м. ' +
	        'Одна из больших сторон участка идёт вдоль ' + water + ', а три остальные стороны нужно огородить забором. ' +
	        'Найдите длину этого забора. Ответ дайте в метрах.';

        let answer = A + 2 * B;

        NAtask.setTask({
	        text: text,
	        analys: 'Вдоль ' + water + ' забор не требуется. Поэтому длина забора равна $' + A + '+2\\cdot' + B + '=' + answer + '$ м.',
	        answers: answer,
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
