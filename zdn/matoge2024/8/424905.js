(function() {
    retryWhileError(function() {
        'use strict';
        
        NAtask.setEvaluationTask({
            expr: '(a^' + sl(1, 9).pm() + ')^' + sl(1, 9).pm() + '/a^' + sl(1, 81).pm(),
            variables: {a: sl(2, 5)},
            authors: ['Алендарь Сергей'],
        });
    }, 1000);
})();
//424905
