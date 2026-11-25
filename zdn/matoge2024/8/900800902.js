(function() {
    retryWhileError(function() {
        'use strict';

        NAtask.setEvaluationTask({
            expr: 'sqrt(' + '(-a)^' + sl(2, 9).pm() + '(-a)^' + sl(2, 9).pm() + ')',
            variables: {a: sl(2, 9)},
            authors: ['Алендарь Сергей'],
        });
    }, 1000);
})();
//900800902
