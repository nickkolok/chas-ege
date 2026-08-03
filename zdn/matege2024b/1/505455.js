
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let numberOfPurchases = sl(25, 65, 1);
        let purchasePrice = sl(25, 70, 1);
        let percentageOfBenefit = sl(0.65, 0.95, 0.05);
        let nameOfPerson = sklonlxkand(om.femaleNames.iz());
        let subscriptionPrice = (percentageOfBenefit * purchasePrice * numberOfPurchases).ceil();
        let magazineName = ['Юный Гонщик', 'Искра', 'Икар', 'Секрет Виктории', 'Горожанка', 'Ассоль', 'Леся Здеся', 'Книжный клуб', 'Bonjour', 'Мир настолок', 'Карты и Шифры'].iz();


        NAtask.setTask({
            text:
                'Стоимость полугодовой подписки на журнал «' + magazineName + '» составляет ' + chislitlx(subscriptionPrice, 'рубль', '$') + ', ' +
                'а стоимость одного номера журнала в киоске — ' + chislitlx(purchasePrice, 'рубль', '$') + '. ' +
                'За полгода ' + nameOfPerson.ie + ' купила ' + chislitlx(numberOfPurchases, 'номер', '$') + ' журнала. ' +
                'На сколько рублей меньше она бы потратила, ' +
                'если бы подписалась на журнал?',
            answers: purchasePrice * numberOfPurchases - subscriptionPrice,
        });

    }, 100);
})();

//https://mathb-ege.sdamgia.ru/test?likes=505455
//zer00player


