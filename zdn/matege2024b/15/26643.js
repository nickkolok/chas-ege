(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let counrtyRand = sl(0, 10, 1);
        let country = sklonlxkand(['Россия', 'Франция', 'Германия', 'Мексика', 'Австралия', 'Сингапур', 'Дания', 'Япония', 'Норвегия', 'Канада', 'Китай'][counrtyRand]);
        let name = sklonlxkand([om.maleNames.iz(), om.femaleNames.iz()][rand]);
        let mw = ['', 'а'][rand];

        let percent = [13, 20.5, 29.5, 14, 32, 11.75, 48.5, 22.5, 39.65, 22, 25][counrtyRand];
        let prise = sl(20000, 1000000, 1000);

        let result = prise - prise * percent * 0.01;

        NAtask.setTask({
            text:
                name.ie + ' проживает в ' + country.pe + '. ',
            questions: [
                {
                    text: 'Налог на доходы в этой стране составляет ' + percent + '% от заработной платы. ' +
                        'Заработная плата ' + name.re + ' в переводе в рубли равна ' + prise + '. ' +
                        'Какую сумму он' + mw + ' получит после вычета налога на доходы',
                    answers: result,
                },
                {
                    text: 'Налог на доходы в этой стране составляет ' + percent + '% от заработной платы. ' +
                        'Заработная плата ' + name.re + ', в переводе в рубли, после наловогово вычета равна ' + result + '. ' +
                        'Какую сумму он' + mw + ' получает до налога на доходы',
                    answers: prise,
                },
                {
                    text: 'Заработная плата ' + name.re + ' в переводе в рубли равна ' + prise + '. ' +
                        'После наловогово вычета сумма равна ' + result + ' р. ' +
                        'Сколько процентов в качестве налога на доходы получает государство этой страны',
                    answers: percent,
                },
            ],
            postquestion: '? Ответ дайте в рублях.',
        });
    }, 100);
})();
//https://ege.sdamgia.ru/test?likes=26643
//zer00player
