
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let personPayment = sl(1000, 5000, 1000);
        let dopPriceInPennies = sl(10, 90, 10);
        let priceInRuble = sl(25, 70, 1);
        let numberOfLiters = sl(20, 70, 1);

        let paymentForPurchase = (priceInRuble + dopPriceInPennies / 100) * numberOfLiters;
        genAssert(personPayment > paymentForPurchase, "У клиента должно хватать денег на оплату");

        let nameOfPerson = om.maleNames.iz();
        let gasStationName = ['Опытный Гонщик', 'Лукойл', 'НеГаз', 'Дальнобойщик', 'Верный выбор', 'Big Boss', 'Shell', 'ГазON', 'AvtoFood'].iz();

        NAtask.setTask({
            text:
                'На автозаправке «' + gasStationName + '» ' + nameOfPerson + ' отдал кассиру ' + chislitlx(personPayment, 'рубль', '$') +
                ' и залил в бак ' + chislitlx(numberOfLiters, 'литр', '$') +
                ' бензина по цене ' + '$' + priceInRuble + '$' + ' руб. и ' + '$' + dopPriceInPennies + '$' + ' коп. за литр. ' +
                'Сколько рублей сдачи он должен получить у кассира?',
            answers: (personPayment - paymentForPurchase),
        });

    }, 100);
})();

//https://ege.sdamgia.ru/test?likes=282847
//zer00player


