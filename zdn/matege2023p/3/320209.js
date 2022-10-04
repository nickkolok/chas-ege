//57. Задание 4 № 320209
//Механические часы с двенадцатичасовым циферблатом в какой-то момент сломались и перестали идти.
//Найдите вероятность того, что часовая стрелка остановилась, достигнув отметки 10, но не дойдя до отметки 1.

(function () {
    'use strict';
    NAinfo.requireApiVersion(0, 0);
    var delenie1 = sluchch(1, 12);
    var delenie1_minute = sluchch(1, 12);
    var razn = [3, 6].iz();
    var razn_minute = [3, 6].iz();
    var delenie2;
    var delenie2_minute;

    if (delenie1 + razn > 12)
        delenie2 = delenie1 + razn - 12;
    else
        delenie2 = delenie1 + razn;

    if (delenie1_minute + razn > 12)
        delenie2_minute = delenie1_minute + razn_minute - 12;
    else
        delenie2_minute = delenie1_minute + razn_minute;

    NAtask.setTask({

        text: 'Механические часы с двенадцатичасовым циферблатом в какой-то момент сломались и перестали идти. ' +
            'Найдите вероятность того, что часовая стрелка остановилась, достигнув отметки ' + delenie1 + ', но не дойдя до отметки ' + delenie2 + ' ' +
            'а секундная стрелка остановилась, достигнув отметки ' + delenie1_minute + ', но не дойдя до отметки ' + delenie2_minute + '.',

        answers: (razn / 12) * (razn_minute / 12),
    });
})();