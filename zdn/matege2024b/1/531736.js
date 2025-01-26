(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);


        let useGigabytes = Math.random() < 0.5;
        let useMbyteMinutes = !useGigabytes && Math.random() < 0.5;

        if (useGigabytes) {

            let firstMinutesForGbyte = sl(5, 30, 1);
            let secondMinutesForGbyte = sl(10, 60, 1);
            let ratioToGbyte = parseFloat((Math.random() * (0.5 - 0.1) + 0.1).toFixed(1));
            let firstGbyte = parseFloat((firstMinutesForGbyte * ratioToGbyte).toFixed(1));
            let secondGbyte = parseFloat((secondMinutesForGbyte * ratioToGbyte).toFixed(1));

            genAssert(firstMinutesForGbyte !== secondMinutesForGbyte, "Время скачивания не должно совпадать");

            NAtask.setTask({
                text:
                    'Файл размером ' + chislitlx(firstGbyte, 'Гбайт', '$') + ' скачался за ' + chislitlx(firstMinutesForGbyte, 'минута', 'v$') +
                    '(скорость загрузки считайте постоянной).' +
                    'За сколько минут скачается файл размером ' + chislitlx(secondGbyte, 'Гбайт', '$') + ', если скорость загрузки останется прежней?',
                answers: secondMinutesForGbyte,
            });
        } else if (useMbyteMinutes) {

            let firstMinutesForMbyte = sl(5, 30, 1);
            let secondMinutesForMbyte = sl(10, 60, 1);
            let ratioToMbyte = sl(20, 750, 1);
            let firstMbyte = firstMinutesForMbyte * ratioToMbyte;
            let secondMbyte = secondMinutesForMbyte * ratioToMbyte;

            genAssert(firstMinutesForMbyte !== secondMinutesForMbyte, "Время скачивания не должно совпадать");

            NAtask.setTask({
                text:
                    'Файл размером ' + chislitlx(firstMbyte, 'Мбайт', '$') + ' скачался за ' + chislitlx(firstMinutesForMbyte, 'минута', 'v$') +
                    '(скорость загрузки считайте постоянной).' +
                    'За сколько минут скачается файл размером ' + chislitlx(secondMbyte, 'Мбайт', '$') + ', если скорость загрузки останется прежней?',
                answers: secondMinutesForMbyte,
            });
        } else {

            let firstSeconds = sl(30, 120, 1);
            let secondSeconds = sl(50, 300, 1);
            let ratioToMbyte = sl(2, 12, 1);
            let firstMbyte = firstSeconds * ratioToMbyte;
            let secondMbyte = secondSeconds * ratioToMbyte;

            genAssert(firstSeconds !== secondSeconds, "Время скачивания не должно совпадать");

            NAtask.setTask({
                text:
                    'Файл размером ' + chislitlx(firstMbyte, 'Мбайт', '$') + ' скачался за ' + chislitlx(firstSeconds, 'секунда', 'v$') +
                    '(скорость загрузки считайте постоянной).' +
                    'За сколько секунд скачается файл размером ' + chislitlx(secondMbyte, 'Мбайт', '$') + ', если скорость загрузки останется прежней?',
                answers: secondSeconds,
            });
        }
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=531736
//zer00player
