(function() {
    retryWhileError(function() {
        'use strict';
        let angle = slKrome([0, 90, 180, 270], 1, 89);
        let slNumber = sl(2, 99).pm();

        NAtask.setEvaluationTask({
            expr: [slNumber,''].iz()+['tg(' + angle + ')','ctg(' + angle + ')'].shuffle().join('*'),
            authors: ['Алендарь Сергей'],
        });
    }, 10000);
})();
//527976
