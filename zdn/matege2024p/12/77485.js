(function() {
    retryWhileError(function() {
        'use strict';
        let a = sl(1, 45); 
        let b = a + 2;
        let sign = [' ', '-'].iz();
        let r1 = sl(0.5, 5, 0.5);
        let r2 = sl(0.5, 5, 0.5);
        
        let offset = slKrome([-1, -0.5, 0.5, 1], 0);
        let center = -b + offset;
       
        let leftEnd = (center - r1).toFixed(1);
        let rightEnd = (center + r2).toFixed(1);
        
        NAtask.setMinimaxFunctionTask({
            expr: sign + '(' + ['x', b].shuffle().join('+') + ')^2*e^(' + '-' + [a,'x'].shuffle().join('-')+')',
            leftEnd: leftEnd,
            rightEnd: rightEnd,
            forbiddenAnswers: [0, '-0'],
            primaryStep: 0.01,
            secondaryStep: 0.0001,
            authors: ['Алендарь Сергей'],
        });
    }, 10000);
})();
//77485
