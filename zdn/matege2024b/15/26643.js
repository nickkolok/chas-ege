(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let counrtyRand = sl(0, 10, 1);
        let country = sklonlxkand(['Россия', 'Франция', 'Германия', 'Мексика', 'Австралия', 'Сингапур', 'Дания', 'Япония', 'Норвегия', 'Канада', 'Китай'][counrtyRand]);
        let name = sklonlxkand([om.maleNames.iz(), om.femaleNames.iz()][rand]);
        let mw = ['', 'а'][rand];
        let inRublesText = (counrtyRand === 0) ? '' : ', в переводе в рубли,';
        let russianVariant = (counrtyRand === 0) ? ' р' : ''

        let percent = [13, 20.5, 29.5, 14, 32, 11.75, 48.5, 22.5, 39.65, 22, 25][counrtyRand];
        let prise = sl(20000, 1000000, 1000);

        let result = prise - prise * percent * 0.01;

        NAtask.setTask({
            text:
                name.ie + ' проживает в ' + country.pe + '. ',
            questions: [
                {
                    text: 'Налог на доходы в этой стране составляет ' + percent + '% от заработной платы. ' +
                        'Заработная плата ' + name.re + inRublesText + ' равна ' + prise + russianVariant + '. ' +
                        'Какую сумму он' + mw + ' получит после вычета налога на доходы?  Ответ дайте в рублях.',
                    answers: result,
                },
                {
                    text: 'Налог на доходы в этой стране составляет ' + percent + '% от заработной платы. ' +
                        'Заработная плата ' + name.re + inRublesText + ' после наловогово вычета равна ' + result + russianVariant + '. ' +
                        'Какую сумму он' + mw + ' получает до вычета налога на доходы? Ответ дайте в рублях.',
                    answers: prise,
                },
                {
                    text: 'Заработная плата ' + name.re + inRublesText + ' равна ' + prise + russianVariant + '. ' +
                        'После наловогово вычета сумма равна ' + result + ' р. ' +
                        'Сколько процентов составляет налог на доходы в этом государстве?',
                    answers: percent,
                },
            ],
            postquestion: '',
        });
    }, 100);
})();
//https://ege.sdamgia.ru/test?likes=26643
//zer00player
