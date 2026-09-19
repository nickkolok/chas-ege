(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = 'A0DE71';

        let triples = [
            {x: 3, y: 4, L: 5},
            {x: 4, y: 3, L: 5},
            {x: 5, y: 12, L: 13},
            {x: 12, y: 5, L: 13},
            {x: 6, y: 8, L: 10},
            {x: 8, y: 6, L: 10},
            {x: 8, y: 15, L: 17},
            {x: 15, y: 8, L: 17},
            {x: 9, y: 12, L: 15},
            {x: 12, y: 9, L: 15},
            {x: 15, y: 20, L: 25},
            {x: 20, y: 15, L: 25},
            {x: 7, y: 24, L: 25},
            {x: 24, y: 7, L: 25},
            {x: 10, y: 24, L: 26},
            {x: 24, y: 10, L: 26},
            {x: 20, y: 21, L: 29},
            {x: 21, y: 20, L: 29},
        ];
        
        let triple = triples.iz();
        let x = triple.x;
        let y = triple.y;
        let L = triple.L;
        
        let minH = sl(1, 20 - y);
        let maxH = minH + y;
        
        let h1 = minH;
        let h2 = maxH;
        
        if (sl(0, 1)) {
            let temp = h1;
            h1 = h2;
            h2 = temp;
        }
        
        let taskText = 'Между зданиями завода и склада, находящимися друг от друга на расстоянии ' + x + ' м, ' +
                       'для подачи материалов и готовых изделий установлен уличный автоматический транспортёр. ' +
                       'Края креплений транспортёра находятся на высоте ' + h1 + ' м и ' + h2 + ' м от земли. ' +
                       'Найдите длину транспортёра. Ответ дайте в метрах.';
                       
        NAtask.setTask({
            text: taskText,
            answers: L,
        });
    }, 20000);
})();
