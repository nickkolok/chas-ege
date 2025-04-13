(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let firstCountries = sl(3, 9, 1);
        let secondCountries = sl(3, 9, 1);
        
        let otherCountriesFirst = firstCountries - 1;
        let otherCountriesSecond = secondCountries - 1;

        let numberWords = ['три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
        let previousNumberWords = ['две', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь'];

        let firstCountriesWord = lx[numberWords[firstCountries - 3]].i;
        let secondCountriesWord = lx[numberWords[secondCountries - 3]].r;

        let firstOtherCountriesWord = lx[previousNumberWords[firstCountries - 3]].t;
        let secondOtherCountriesWord = lx[previousNumberWords[secondCountries - 3]].t;

        let contract = ['о дружбе', 'во избежание двойного налогообложения', 'о безвизовом режиме', 'об экологической среде', 'по гуманитарным вопросам',
            'по вопросам безопасности'].iz();

        let result = firstCountries * otherCountriesSecond + secondCountries * otherCountriesFirst;

        genAssert(result.kratno(2), "количество подписей должно быть кратно двум");

        NAtask.setTask({
            text: 'Из ' + '$' + (firstCountries + secondCountries) + '$' + ' стран ' + firstCountriesWord + ' подписали договор ' +
                contract + ' ровно с ' + secondOtherCountriesWord + ' другими странами, ' +
                'а каждая из оставшихся ' + secondCountriesWord + ' — ровно с ' + firstOtherCountriesWord + '. ' +
                'Сколько всего было подписано договоров?',
            answers: result / 2,
        });
    });
})();
//https://mathb-ege.sdamgia.ru/problem?id=514913
//zer00player
