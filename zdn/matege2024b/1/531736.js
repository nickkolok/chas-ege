(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);


        let rand = sl(0, 2);
        let timeUnits = sklonlxkand(['минута', 'минута', 'секунда']);
        let dataUnits = ['Гбайт', 'Мбайт', 'Мбайт'];
        let firstTimeFunction = [sl(5, 30, 1), sl(5, 30, 1), sl(30, 120, 1)];
        let secondTimeFunction = [sl(10, 60, 1), sl(10, 60, 1), sl(50, 300, 1)];
        let ratioFunction = [parseFloat((Math.random() * (0.5 - 0.1) + 0.1).toFixed(1)), sl(20, 750, 1), sl(2, 12, 1)];

        let firstTime = firstTimeFunction[rand];
        let secondTime = secondTimeFunction[rand];
        let ratio = ratioFunction[rand];
        let firstData = parseFloat((firstTime * ratio).toFixed(1));
        let secondData = parseFloat((secondTime * ratio).toFixed(1));

        genAssert(firstTime !== secondTime, "Время скачивания не должно совпадать");

        NAtask.setTask({
            text:
                'Файл размером ' + chislitlx(firstData, dataUnits[rand], '$') + ' скачался за ' + chislitlx(firstTime, timeUnits[rand], 'v$') +
                '(скорость загрузки считайте постоянной).' +
                'За сколько ' + timeUnits[rand].rm + ' скачается файл размером ' + chislitlx(secondData, dataUnits[rand], '$') + ', если скорость загрузки останется прежней?',
            answers: secondTime,
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=531736
//zer00player
