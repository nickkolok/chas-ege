(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '325147';
        let preference = ['tile', 'parquet'];
        let rand = getSelectedPreferenceFromList(key, preference);

        let isParquet = rand === 1;
        let aSidePart = sl(5, 30, 5);
        let bSidePart = isParquet ? slKrome(aSidePart, 5, 30, 5) : aSidePart;

        let aCount = sl(Math.ceil(200 / aSidePart), Math.floor((isParquet ? 1000 : 500) / aSidePart));
        let bCount = sl(Math.ceil(200 / bSidePart), Math.floor((isParquet ? 1000 : 500) / bSidePart));
        let aSideFloor = aCount * aSidePart / 100;
        let bSideFloor = bCount * bSidePart / 100;
        let result = aCount * bCount;

        NAtask.setTask({
            text: ['Пол комнаты, имеющей форму прямоугольника со сторонами $' + aSideFloor + '$ м и $' + bSideFloor + '$ м,' +
                ' требуется покрыть паркетом из прямоугольных дощечек со сторонами $' + aSidePart + '$ см и $' + bSidePart + '$ см.' +
                ' Сколько потребуется таких дощечек?',
            'Сколько потребуется кафельных плиток квадратной формы со стороной $' + aSidePart + '$ см,' +
            ' чтобы облицевать ими стену, имеющую форму прямоугольника со сторонами $' + aSideFloor + '$ м и $' + bSideFloor + '$ м?'][1 - rand],
            answers: result,
            preference: preference,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 20000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=325147
// 4C7562, 5556F5, 0C3B1E, AC241E, 78BFD0, 43F754, 7DE1A2, 2948A4, 8A373E, F1BA86, BAD14F, D6D30E, 91A012, 53D257, 418B98, 3E1F9A, 0AC779, DBD950, BD02EC, D893DF
