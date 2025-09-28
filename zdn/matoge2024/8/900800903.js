(function() {
    retryWhileError(function() {
        'use strict';

        let num_sqrt_x = sl(2, 50);
        let num_sqrt_y = sl(2, 50);
        let den_coef = sl(5, 100).pm();

        NAtask.setEvaluationTask({
            expr: ['','-'].iz() + '(' + [num_sqrt_x + ' sqrt(x) ', num_sqrt_y + ' sqrt(y) '].shuffle().join('*') + '/(' + den_coef + ' sqrt(x y)))',
            variables: {x: sl(2, 9), y: sl(2, 9)},
            rulesBeforePrinting: [
                { l: 'n1*sqrt(n2)*n3*sqrt(n4)', r: 'n1 sqrt(n2)*n3 sqrt(n4)' },
            ],
            authors: ['Алендарь Сергей'],
        });
    }, 1000);
})();
//900800903
