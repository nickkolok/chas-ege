(function() {
    retryWhileError(function() {
        'use strict';
        let x = sl(1, 10);
        let y = sl(2, 10);
        let divider = sl(5, 13);
        let dividendA = sl(1, 81) + divider;
        let dividendB = slKrome(dividendA, divider+1, 81);
        genAssertIrreducible(dividendA, divider, 'Дробь должна быть несократима');
        genAssertIrreducible(dividendB, divider, 'Дробь должна быть несократима');

        // Вычисляем компоненты для mixed
        let wholeA = Math.floor(dividendA / divider);
        let numA = dividendA % divider;
        let denA = divider;

        let wholeB = Math.floor(dividendB / divider);
        let numB = dividendB % divider;
        let denB = divider;

        NAtask.setEvaluationTask({
            expr: 'sqrt(' + x * x + '*a^2' + ['+', '-'].iz() +
                2 * x * y + '*a*b' + '+' + y * y + '*b^2)',
            variables: {
                a: ['mixed(' + wholeA + ',' + numA + ',' + denA + ')',wholeA, numA + '/' + denA].iz(),
                b: ['mixed(' + wholeB + ',' + numB + ',' + denB + ')',wholeB, numB + '/' + denB].iz(),
            },
            authors: ['Алендарь Сергей'],
        });
    }, 10000);
})();
//412197

