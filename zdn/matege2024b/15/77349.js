(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let months = om.months;
        let firstIndex = sl(0, months.length - 1, 1);
        let secondIndex = (firstIndex + 1) % months.length;
        let thirdIndex = (firstIndex + 2) % months.length;
        let firstMonth = sklonlxkand(months[firstIndex]);
        let secondMonth = sklonlxkand(months[secondIndex]);
        let thirdMonth = sklonlxkand(months[thirdIndex]);

        let food = sklonlxkand(['голубика', 'клубника', 'черника', 'земляника', 'морошка', 'шелковица', 'брусника', 'малина', 'клюква', 'вишня', 'черешня',].iz());

        let randFirst = sl1();
        let randSecond = sl1();

        let moreOrLessSecondMonth = ['дороже', 'дешевле'][randFirst];
        let moreOrLessThirdMonth = ['дороже', 'дешевле'][randSecond];

        let prise = sl(100, 2000, 10);
        let percentSecondMonth = sl(10, 90, 1);
        let percentThirdMonth = sl(10, 90, 1);
        let middlePrise = prise * (1 + [1, -1][randFirst] * 0.01 * percentSecondMonth);
        let finalePrise = middlePrise * (1 + [1, -1][randSecond] * 0.01 * percentThirdMonth);

        genAssertZ1000(finalePrise / 10, 'Число имеет более 2 знаков после запятой');



        NAtask.setTask({
            text:
                'В ' + firstMonth.pe,
            questions: [
                {
                    text: ' один килограмм ' + food.re + ' стоил ' + prise + ' р., ' +
                        'в ' + secondMonth.pe + ' ' + food.ie + ' стала ' + moreOrLessSecondMonth + ' на ' + percentSecondMonth + '%, а в ' + thirdMonth.pe +
                        ' — ' + moreOrLessThirdMonth + ' на ' + percentThirdMonth +
                        '%. Сколько рублей стоил 1 кг ' + food.re + ' после того как стал ' + moreOrLessThirdMonth + ' в ' + thirdMonth.pe,
                    answers: finalePrise,
                },
                {
                    text: ' начали продавать на рынке ' + food.ve + '. В ' + secondMonth.pe + ' ' + food.ie + ' стала ' + moreOrLessSecondMonth + ' на ' +
                        percentSecondMonth + '%, а в ' + thirdMonth.pe + ' — ' + moreOrLessThirdMonth + ' на ' + percentThirdMonth + '%. Цена за 1 кг ' + food.re +
                        ' в ' + thirdMonth.pe + ' стала составлять ' + finalePrise + ' p. Сколько рублей стоил 1 кг ' + food.re + ' в ' + firstMonth.pe,
                    answers: prise,
                },
            ],
            postquestion: '?',
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 1000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=77349
//zer00player

