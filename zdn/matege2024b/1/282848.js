
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let personPayment = sl(1000, 5000, 1000);
        let dopPriceInPennies = sl(10, 90, 10);
        let priceInRuble = sl(25, 70, 1);
        let numberOfLiters = sl(20, 70, 1);

        let pricePerLiter = (priceInRuble + dopPriceInPennies / 100).toFixed(1);
        pricePerLiter = parseFloat(pricePerLiter);
        let paymentForPurchase = pricePerLiter * numberOfLiters;
        genAssert(personPayment > paymentForPurchase, "У клиента должно хватать денег на оплату");

        let change = personPayment - paymentForPurchase;
        let changeRubles = Math.floor(change);
        let changePennies = Math.round((change - changeRubles) * 100);

        if (changePennies === 100) {
            changeRubles++;
            changePennies = 0;
        }

        let nameOfPerson = om.maleNames.iz();
        let gasStationName = ['ФастОйл', 'Лукойл', 'Топлайн', 'Standart oil', 'Понедельник начинается в субботу', 'Трудно быть дальнобойщиком', 'Shell', 'ГазON', 'Кафе у уставшего таксиста', 'Сплин', 'Дайте бензин(!)', 'Пикник на обочине'].iz();

        NAtask.setTask({
            text:
                'На автозаправке «' + gasStationName + '» ' + nameOfPerson + ' отдал кассиру ' + chislitlx(personPayment, 'рубль', '$') +
                ' и попросил залить бензин до полного бака. ' +
                'Цена бензина ' + priceInRuble + ' руб. ' + dopPriceInPennies + ' коп. за литр. ' +
                'Сдачи клиент получил ' + changeRubles + 'руб. и ' + changePennies + ' коп. ' +
                'Сколько литров бензина было залито в бак?',
            answers: numberOfLiters,
        });

    }, 100);
})();

//https://ege.sdamgia.ru/test?likes=282848
//zer00player


