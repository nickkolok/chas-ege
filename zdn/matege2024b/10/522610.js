(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '522610';
        let triples = [
            [3, 4, 5],
            [5, 12, 13],
            [6, 8, 10],
            [8, 15, 17],
            [7, 24, 25],
            [20, 21, 29]
        ];
        let t = triples.iz();
        let rand = sl1();
        let a = t[rand];
        let b = t[1 - rand];
        let c = t[2];

        let target = ['стене', 'окну'].iz();
        let question = target === 'окну' ? 'На какой высоте расположено окно?' : 'На какой высоте находится верхний конец лестницы?';
        
        let text = 'Пожарную лестницу длиной $' + c + '$ м приставили к ' + target + ' дома. Нижний конец лестницы отстоит от стены на $' + a + '$ м. ' + question + ' Ответ дайте в метрах.';
        
        NAtask.setTask({
            text: text,
            answers: b,
        });
    }, 20000);
})();
