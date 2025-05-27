(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let numRand = sl(0.1, 0.7, 0.05);
        let a = sl(3, 19, 1) + numRand;

        let paint1 = function (ct) {
            let points = [];

            for (let i = 0; i <= 20; i++) {
                points.push({
                    value: i,
                    mark: 'line',
                    label: (i === 0 || i === 1) ? i.toString() : ("" + i).esli(i <= 1),
                    labelPos: 'underAxis'
                });
            }

            points.push({
                value: a,
                mark: 'dot',
                label: 'a',
                labelPos: 'overAxis'
            });

            coordAxis_drawAuto(ct, { points });

        };

        // Генерация верных и ложных выражений
        function generateExpressionPairs(a, count) {
            let used = new Set();
            let pairs = [];

            while (pairs.length < count) {
                let n = sluchch(1, 20, 1);
                if (Math.abs(n - a) < 1 || used.has(n)) {
                    continue
                };
                used.add(n);

                let useAfirst = [true, false].iz();
                let val = useAfirst ? a - n : n - a;

                let [znak, znakOpp] = val > 0 ? [">0", "<0"] : ["<0", ">0"];
                let exprTrue = useAfirst ? `a-${n}${znak}` : `${n}-a${znak}`;
                let exprFalse = useAfirst ? `a-${n}${znakOpp}` : `${n}-a${znakOpp}`;

                pairs.push([exprTrue, exprFalse]);
            }
            return pairs;
        }
        let rand = sl1();
        let correctOrNot = ['', 'не'][rand];
        let pairs = generateExpressionPairs(a, 3);
        let correct = pairs.T()[0];
        let wrong = pairs.T()[1];

        NAtask.setTask({
            text: 'На координатной прямой отмечено число $a$. Какое из утверждений для этого числа является ' + correctOrNot + 'верным?',
            answers: [correct, wrong][rand],
            wrongAnswers: [wrong, correct][rand]
        });
        AtoB(3);

        chas2.task.modifiers.addCanvasIllustration({
            width: 400,
            height: 100,
            paint: paint1,
        });
    }, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=311418
