(function() {
    retryWhileError(function() {
        'use strict';

        let num_sqrt_x = sl(2, 50).pm();
        let num_sqrt_y = sl(2, 50).pm();
        let den_coef = sl(5, 100).pm();

        NAtask.setEvaluationTask({
            expr: [num_sqrt_x + '*sqrt(x)', num_sqrt_y + '*sqrt(y)'].shuffle().join('*') + '/(' + den_coef + '*sqrt(x '+'y))',
            variables: {x: sl(2, 9), y: sl(2, 9)},
            authors: ['Алендарь Сергей'],
        });
    }, 1000);
})();
//900800903
