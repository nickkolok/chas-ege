(function () {
    'use strict';
    retryWhileError(function () {

        let first = sl(10, 30);
        let second = slKrome(first, 10, 30);
        let total = first + second;
        let targetColor = sl1();

        let probability = [first, second][targetColor] / total;
        let colors = om.trickyColors.iz(2);
        let colorsFirstPart = colors.map(elem => elem.replace('ый', 'ых').replace('ий', 'их'));
        let colorsSecondPart = colors[targetColor].replace('ый', 'ым').replace('ий', 'им');

        genAssertZ1000(probability);

        NAtask.setTask({
            text: 'Под классной доской в лотке лежат $' + first + '$ ' + colorsFirstPart[0] + ' и $' + second + '$ ' + colorsFirstPart[1] + ' маркера для доски. ' +
                'Из лотка берут случайный маркер. Найдите вероятность того, что он окажется ' + colorsSecondPart + '.',
            answers: probability,
        });
    }, 100);
})();
//16727664
//Открытый банк заданий FF3E70
