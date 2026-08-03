(function() {
    retryWhileError(function() {
        'use strict';
        let e1 = sl(1, 30).pm();      
        let e2 = sl(1, 30).pm(); 
        let e3 = sl(5, 50);       

        NAtask.setEvaluationTask({
            expr: 'divideColon(' + [  'a^' + e1 + '*a^' + e2,  'a^' + e3  ].shuffle().join() + ')',
            variables: {a: sl(2, 9)},
            authors: ['Алендарь Сергей'],
        });
    }, 1000);
})();
//900412184
