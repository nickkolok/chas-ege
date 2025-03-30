(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let contract = ['о дружбе', 'о избежании двойного налогообложения', 'о безвизовом режиме', 'об экологической среде', 'по гуманитарным вопросам',
            'по вопросам безопасности'].iz();

        let firstCountries = sl(3, 9, 1);
        let secondCountries = sl(3, 9, 1);
        let otherCountriesFirst = firstCountries - 1;
        let otherCountriesSecond = secondCountries - 1;
        let result = firstCountries * otherCountriesSecond + secondCountries * otherCountriesFirst;

        genAssert(result.kratno(2), "количество подписей должно быть кратно двум")
        NAtask.setTask({
            text: 'Из ' + '$' + (firstCountries + secondCountries) + '$' + ' стран ' + '$' + firstCountries + '$' + ' подписали договор ' +
                contract + ' ровно с ' + '$' + otherCountriesSecond + '$' + ' другими странами, ' +
                'а каждая из оставшихся ' + '$' + secondCountries + '$' + ' — ровно с ' + '$' + otherCountriesFirst + '$' + '. ' +
                'Сколько всего было подписано договоров?',
            answers: result / 2,
        });
    });
})();
//https://mathb-ege.sdamgia.ru/problem?id=514913
//zer00player
