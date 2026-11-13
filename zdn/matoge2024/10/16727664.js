(function () {
    'use strict';
    retryWhileError(function () {

        let first = sl(10, 30, 2);
        let second = slKrome(first, 10, 30, 2);
        let total = first + second;
        let targetColor = sl1();

        let probability = [first, second][targetColor] / total;
        let colors = om.trickyColors.iz(2);
        let colorsFirstPart = colors.map(elem => elem.replace('ый', 'ых').replace('ий', 'их').replace('ой', 'ых'));

        let locations = [
            'Под классной доской в лотке',
            'На учительском столе в лотке',
            'В коробке на столе',
            'В пенале у ученика',
            'В ящике письменного стола'
        ];

        let items = [
            {
                genPl: 'маркеров',
                accSg: 'случайный маркер',
                instrSg: 'маркером',
                adjSecond: 'ым',
                pronoun: 'он'
            },
            {
                genPl: 'мелков',
                accSg: 'случайный мелок',
                instrSg: 'мелком',
                adjSecond: 'ым',
                pronoun: 'он'
            },
            {
                genPl: 'карандашей',
                accSg: 'случайный карандаш',
                instrSg: 'карандашом',
                adjSecond: 'ым',
                pronoun: 'он'
            },
            {
                genPl: 'ручек',
                accSg: 'случайную ручку',
                instrSg: 'ручкой',
                adjSecond: 'ой',
                pronoun: 'она'
            },
            {
                genPl: 'фломастеров',
                accSg: 'случайный фломастер',
                instrSg: 'фломастером',
                adjSecond: 'ым',
                pronoun: 'он'
            }
        ];

        let takeActions = [
            'Из них выбирают',
            'Из них берут',
            'Учитель выбирает',
            'Ученик берёт'
        ];

        let loc = locations.iz();
        let item = items.iz();
        let action = takeActions.iz();

        let colorsSecondPart = colors[targetColor];
        if (item.adjSecond === 'ым') {
            colorsSecondPart = colorsSecondPart.replace('ый', 'ым').replace('ий', 'им').replace('ой', 'ым');
        } else if (item.adjSecond === 'ой') {
            colorsSecondPart = colorsSecondPart.replace('ый', 'ой').replace('ий', 'ей').replace('ой', 'ой');
        }

        genAssertZ1000(probability);

        NAtask.setTask({
            text: loc + ' лежат $' + first + '$ ' + colorsFirstPart[0] + ' и $' + second + '$ ' + colorsFirstPart[1] + ' ' + item.genPl + '. ' +
                action + ' ' + item.accSg + '. Найдите вероятность того, что ' + item.pronoun + ' окажется ' + colorsSecondPart + '.',
            answers: probability,
        });
    }, 100);
})();
//16727664
//Открытый банк заданий FF3E70
