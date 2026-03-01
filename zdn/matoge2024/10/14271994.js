(function () {
    'use strict';
    retryWhileError(function () {

        let cars = sl(3, 15);
        let cities = sl(3, 15);
        let total = cars + cities;
        let targetPuzzle = sl1();

        let probability = [cars, cities][targetPuzzle] / total;
        genAssertZ1000(probability);
        let puzzleType = ['с машиной', 'с видом города'][targetPuzzle];
        let nameChild = om.childMaleNames.iz();        

        NAtask.setTask({
            text: 'Родительский комитет закупил $' + total + '$ пазлов для подарков детям, ' +
                'из них $' + cars + '$ с машинами и $' + cities + '$ с видами городов. ' +
                'Подарки распределяются случайным образом между $' + total + '$ детьми, среди которых есть ' + nameChild + '. ' +
                'Найдите вероятность того, что ' + sklonlxkand(nameChild).de + ' достанется пазл ' + puzzleType + '.',
            answers: probability,
        });
    }, 100);
})();
//14271994
//Открытый банк заданий D9C5FA
