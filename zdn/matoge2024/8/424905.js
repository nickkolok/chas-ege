(function() {
    retryWhileError(function() {
        'use strict';
        
        NAtask.setEvaluationTask({
            expr: ['(a^' + sl(2, 9).pm() + ')^' + sl(2, 9).pm(), 'a^' + sl(2, 81).pm()].shuffle().join('/'),
            variables: {a: sl(2, 9)},
            authors: ['Алендарь Сергей'],
        });
    }, 1000);
})();
//424905
