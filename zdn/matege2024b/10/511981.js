(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '511981';
        
        let H = sl(1, 23);
        
        let hourOnClock = H % 12;
        if (hourOnClock === 0) hourOnClock = 12;
        
        let angle = Math.min(hourOnClock, 12 - hourOnClock) * 30;
        
        NAtask.setTask({
            text: 'Какой наименьший угол (в градусах) образуют минутная и часовая стрелки часов в ' + H + ':00?',
            answers: angle,
        });
    }, 20000);
})();
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/problem?id=511981
