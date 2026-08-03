(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);


        let rand = sl(0, 2);
        let timeUnits = sklonlxkand(['минута', 'минута', 'секунда'])[rand];
        let dataUnits = ['Гбайт', 'Мбайт', 'Мбайт'][rand];
        let firstTime = [sl(5, 30, 1), sl(5, 30, 1), sl(30, 120, 1)][rand];;
        let secondTime = [sl(10, 60, 1), sl(10, 60, 1), sl(50, 300, 1)][rand];
        let ratio = [sl(0.1, 0.5, 0.1), sl(20, 750, 1), sl(2, 12, 1)][rand];
        let firstData = firstTime * ratio;
        let secondData = secondTime * ratio;

        genAssert(firstTime !== secondTime, "Время скачивания не должно совпадать");

        NAtask.setTask({
            text:
                'Файл размером ' + chislitlx(firstData, dataUnits, '$') + ' скачался за ' + chislitlx(firstTime, timeUnits, 'v$') +
                ' (скорость загрузки считайте постоянной). ' +
                'За сколько ' + timeUnits.rm + ' скачается файл размером ' + chislitlx(secondData, dataUnits, '$') + ', если скорость загрузки останется прежней?',
            answers: secondTime,
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=531736
//zer00player
