(function() {
    retryWhileError(function() {
        'use strict';
        
        NAtask.setEvaluationTask({
            expr: ['(a^' + sl(2, 15).pm() + ' * a^' + sl(2, 15).pm() + ')','a^' + sl(2, 25).pm()].shuffle().join('/'),
            variables: {a: sl(sl(2, 7), 9)},
            authors: ['Алендарь Сергей'],
        });
    }, 1000);
})();
//412185 

