(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let placeOfRest = ['пансионате', 'санатории', 'здравнице', 'курортном доме', 'отеле', 'гостинице', 'доме отдыха'].iz();
        let whoIsRest = ['дети', 'взрослые', 'пенсионеры', 'подростки'].iz();
        let rand = sl(0, 6);
        let theShareOfVacationers = ['Половина', 'Четверть', 'Одна пятая', 'Десятая часть', 'Двадцатая часть', 'Одна двадцать пятая', 'Пятидесятая'][rand]
        let theShareOfVacationersInNumbers = [0.5, 0.25, 0.2, 0.1, 0.05, 0.04, 0.02][rand]

        NAtask.setTask({
            text:
                theShareOfVacationers + ' всех отдыхающих в ' + placeOfRest + ' — ' + whoIsRest + '. Какой процент от всех отдыхающих составляют ' + whoIsRest + '?',
            answers: 100 * theShareOfVacationersInNumbers,
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=509768
//zer00player
