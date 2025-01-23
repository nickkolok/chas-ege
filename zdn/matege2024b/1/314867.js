
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let firstMonthConsumption = sl(100, 1200, 1);
        let secondMonthConsumption = firstMonthConsumption + sl(10, 120, 1);

        let numberOfLiters = secondMonthConsumption - firstMonthConsumption;

        function getSequentialMonths() {
            let months = om.months;
            let firstIndex = sl(0, months.length - 1, 1);
            let secondIndex = (firstIndex + 1) % months.length;
            return [months[firstIndex], months[secondIndex]];
        }
        let [firstMonth, secondMonth] = getSequentialMonths();

        let dopPriceInKopeki = sl(10, 90, 10);
        let priceInRuble = sl(50, 150, 1);

        let pricePerLiter = (priceInRuble + dopPriceInKopeki / 100).toFixed(1);
        pricePerLiter = parseFloat(pricePerLiter);
        let paymentForPurchase = pricePerLiter * numberOfLiters;

        let nameOfPerson = om.maleNames.iz();
        let typeOfWater = ['горячей', 'холодной'].iz();

        NAtask.setTask({
            text:
                'В квартире, ' + 'где проживает ' + nameOfPerson +
                ', установлен прибор учёта расхода ' + typeOfWater + ' воды(счётчик). ' + chislitlx(1, firstMonth, 'r$') +
                ' счётчик показывал расход ' + firstMonthConsumption + ' куб.м воды, ' +
                'а ' + chislitlx(1, secondMonth, 'r$') + ' — ' + secondMonthConsumption + ' куб.м. ' +
                'Какую сумму должен заплатить ' + nameOfPerson + ' за ' + firstMonth + ', ' +
                'если цена  1 куб.м. ' + typeOfWater + ' воды составляет ' + priceInRuble + 'руб. и ' + dopPriceInKopeki + 'коп. ? Ответ дайте в рублях.',
            answers: paymentForPurchase,
        });

    }, 100);
})();

//https://mathb-ege.sdamgia.ru/test?likes=314867
//zer00player


