
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let personPayment = sl(1500, 6000, 500);
        let dopPriceInPennies = sl(10, 90, 10);
        let priceInRuble = sl(25, 70, 1);
        let numberOfLiters = sl(20, 70, 1);
        let drinkPrice = sl(20, 200, 1);

        let paymentForPurchase = (priceInRuble + dopPriceInPennies / 100) * numberOfLiters + drinkPrice;
        genAssert(personPayment > paymentForPurchase, "У клиента должно хватать денег на оплату");
        let change = personPayment - paymentForPurchase;

        let nameOfPerson = om.maleNames.iz();
        let gasStationName = ['ФастОйл', 'Лукойл', 'Топлайн', 'Standart oil', 'Понедельник начинается в субботу', 'Трудно быть дальнобойщиком', 'Shell', 'ГазON', 'Кафе у уставшего таксиста', 'Сплин', 'Дайте бензин(!)', 'Пикник на обочине'].iz();
        let drinkName = ['воды', 'сока', 'чай', 'кофе', 'квас', 'лимонад', 'энергетик', 'компот', 'кумыс', 'колу'].iz();
        NAtask.setTask({
            text:
                'На бензоколонке «' + gasStationName + '» один литр бензина стоит ' + priceInRuble + ' руб. ' + dopPriceInPennies + ' коп. ' +
                nameOfPerson + ' залил в бак ' + chislitlx(numberOfLiters, 'литр') + ' бензина и купил ' + drinkName + ' за ' + chislitlx(drinkPrice, 'рубль') + '. ' +
                'Сколько рублей сдачи он получит с ' + chislitlx(personPayment, 'рубль') + '?',
            answers: change,
        });

    }, 100);
})();

//https://ege.sdamgia.ru/problem?id=323516
//zer00player


