
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let firstMonthConsumption = sl(100, 1200, 1);
        let secondMonthConsumption = firstMonthConsumption + sl(1.5, 15, 0.1);

        let dopPriceInKopeki = sl(10, 90, 10);
        let priceInRuble = sl(50, 150, 1);

        let numberOfLiters = secondMonthConsumption - firstMonthConsumption;
        let paymentForPurchase = (priceInRuble + dopPriceInKopeki / 100) * numberOfLiters;

        let months = om.months;
        let firstIndex = sl(0, months.length - 1, 1);
        let secondIndex = (firstIndex + 1) % months.length;
        let firstMonth = months[firstIndex];
        let secondMonth = months[secondIndex];

        let nameOfPerson = om.maleNames.iz();
        let typeOfWater = ['горячей', 'холодной'].iz();

        NAtask.setTask({
            text:
                'В квартире, ' + 'где проживает ' + nameOfPerson +
                ', установлен прибор учёта расхода ' + typeOfWater + ' воды (счётчик). ' + chislitlx(1, firstMonth, 'r$') +
                ' счётчик показывал расход ' + '$' + firstMonthConsumption + '$' + ' куб. м воды, ' +
                'а ' + chislitlx(1, secondMonth, 'r$') + ' — ' + '$' + secondMonthConsumption + '$' + ' куб. м. ' +
                'Какую сумму должен заплатить ' + nameOfPerson + ' за ' + firstMonth + ', ' +
                'если цена одного куб. м. ' + typeOfWater + ' воды составляет ' + '$' + priceInRuble + '$' + ' руб. и ' +
                '$' + dopPriceInKopeki + '$' + ' коп.? Ответ дайте в рублях.',
            answers: paymentForPurchase,
        });

    }, 100);
})();

//https://mathb-ege.sdamgia.ru/test?likes=314867
//zer00player


