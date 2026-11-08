(function () {
    'use strict';
    retryWhileError(function () {

        let cars = sl(3, 15);
        let cities = slKrome(cars, 3, 15);
        let total = cars + cities;
        let targetPuzzle = sl1();

        let probability = [cars, cities][targetPuzzle] / total;
        genAssertZ1000(probability);
        let nameChild = sklonlxkand(om.childMaleNames.iz());
        let kids = sklonlxkand(['школьник', 'ребёнок', 'ученик', 'первоклашка', 'второклашка', 'третьеклашка'].iz());
        let item = sklonlxkand(['пазл', 'пенал', 'карандаш', 'портфель', 'ластик','дневник', 'раскраска'].iz());
        let pictureView = sklonlxkand(['город', 'пейзаж', 'гора', 'озёро', 'замок'].iz());
        let pictureWithOutView = sklonlxkand(['машина', 'птица', 'звезда'].iz());

        NAtask.setTask({
            text: 'Родительский комитет закупил ' + chislitlx(total, item, '$') + ' для подарков ' + kids.dm + ', ' +
                'из них $' + cars + '$ с '+pictureWithOutView.tm+' и $' + cities + '$ с видами ' + pictureView.rm+'. ' +
                'Подарки распределяются случайным образом между ' + chislitlx(total, kids, 't$') + ', среди которых есть ' + nameChild.ie + '. ' +
                'Найдите вероятность того, что ' + nameChild.de + ' достанется ' + item.ie+ ' с ' + [pictureWithOutView.te, 'видом ' + pictureView.re][targetPuzzle] + '.',
            answers: probability,
        });
    }, 100);
})();
//14271994
//Открытый банк заданий D9C5FA
