
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let personPayment = sl(1000, 5000, 1000);
        let dopPriceInKopeiki = sl(10, 90, 10);
        let priceInRuble = sl(25, 70, 1);
        let numberOfLiters = sl(20, 70, 1);

        let paymentForPurchase = (priceInRuble + dopPriceInKopeiki / 100) * numberOfLiters;
        genAssert(personPayment > paymentForPurchase, "У клиента должно хватать денег на оплату");

        let change = personPayment - paymentForPurchase;
        let changeRubles = Math.floor(change);
        let changeKopeiki = Math.round((change - changeRubles) * 100);

        if (changeKopeiki === 100) {
            changeRubles++;
            changeKopeiki = 0;
        }

        let nameOfPerson = om.maleNames.iz();
        let gasStationName = ['ФастОйл', 'Лукойл', 'Топлайн', 'Standart oil', 'Понедельник начинается в субботу', 'Трудно быть дальнобойщиком', 'Shell',
            'ГазON', 'Кафе у уставшего таксиста', 'Сплин', 'Дайте бензин(!)', 'Пикник на обочине'].iz();

        let changeText = 'Сдачи клиент получил ' + '$' + changeRubles + '$' + ' руб.';
        if (changeKopeiki > 0) {
            changeText += ' и ' + '$' + changeKopeiki + '$' + ' коп.';
        }

        NAtask.setTask({
            text:
                'На автозаправке «' + gasStationName + '» ' + nameOfPerson + ' отдал кассиру ' + chislitlx(personPayment, 'рубль', '$') +
                ' и попросил залить бензин до полного бака. ' +
                'Цена бензина ' + '$' + priceInRuble + '$' + ' руб. ' + '$' + dopPriceInKopeiki + '$' + ' коп. за литр. ' +
                changeText + ' ' + 'Сколько литров бензина было залито в бак?',
            answers: numberOfLiters,
        });

    }, 100);
})();

//https://ege.sdamgia.ru/test?likes=282848
//zer00player


