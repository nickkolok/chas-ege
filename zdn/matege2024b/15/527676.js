(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let months = om.months;
        let firstMonth = sklonlxkand(months.iz());

        let dishes = sklonlxkand(['чайник', 'молочник', 'половник', 'соусник', 'горшок', 'кофейник', 'кувшин', 'салатник', 'супник'].iz());

        let randFirst = sl1();
        let randSecond = sl1();

        let moreOrLessFirst = ['дороже', 'дешевле'][randFirst];
        let moreOrLessSecond = ['дороже', 'дешевле'][randSecond];

        let prise = sl(1000, 5000, 100);
        let percentFirst = sl(10, 50, 1);
        let percentSecond = sl(10, 50, 1);
        let middlePrise = prise * (1 + [1, -1][randFirst] * 0.01 * percentFirst);
        let finalePrise = middlePrise * (1 + [1, -1][randSecond] * 0.01 * percentSecond);

        genAssertZ1000(finalePrise / 10, 'Число имеет более 2 знаков после запятой');



        NAtask.setTask({
            text:
                'За ' + firstMonth.ie + ' магазин дважды изменял цену на ' + dishes.ie + ': ',
            questions: [
                {
                    text: 'в первый раз на ' + percentFirst + '%  стал ' + moreOrLessFirst + ', ' +
                        'во второй — на ' + percentSecond + '% ' + moreOrLessSecond + '. ' +
                        'Сколько рублей стал стоить ' + dishes.ie + ' после второго изменения цены, если в начале ' + firstMonth.re + ' он стоил ' + prise + ' p.',
                    answers: finalePrise,
                },
                {
                    text: 'в первый раз на ' + percentFirst + '%  стал ' + moreOrLessFirst + ', ' +
                        'во второй — на ' + percentSecond + '% ' + moreOrLessSecond + '. ' +
                        'Сколько рублей стоил ' + dishes.ie + ' в начале ' + firstMonth.re + ', если после второго изменения цены ' +
                        ' он стал стоить ' + finalePrise + ' p.',
                    answers: prise,
                },
            ],
            postquestion: '?',
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 1000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=527676
//zer00player
