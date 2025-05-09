(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let a = sl(4.5, 19.5, 0.5);

        let paint1 = function (ct) {
            const w = 400;
            const h = 100;
            ct.translate(0, h / 2);

            //прямая и стрелочка с "х"
            ct.lineWidth = 2;
            ct.strokeStyle = om.primaryBrandColors[0];
            ct.drawArrow(10, 0, w + 10, 0);
            coordAxis_drawMarkPoint(ct, w, "x", "nothing", "onAxis");

            // Засечки от 0 до 20 (без подписей, кроме 0 и 1)
            for (let i = 0; i <= 20; i++) {
                let x = 10 + (w - 20) * (i / 20);
                let label = (i === 0 || i === 1) ? i.toString() : "";
                coordAxis_drawMarkPoint(ct, x, label, "line", "underAxis");
            }
            // Точка a
            coordAxis_drawMarkPoint(ct, 10 + (w - 20) * (a / 20), "a", "dot", "overAxis");
        };

        // Генерация верных и ложных выражений
        function generateExpressionPairs(a, count) {
            let used = new Set();
            let pairs = [];

            while (pairs.length < count) {
                let n = sluchch(1, 20, 1);
                if (Math.abs(n - a) < 1 || used.has(n)) continue;
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
        let correct = pairs.map(p => p[0]);
        let wrong = pairs.map(p => p[1]);

        NAtask.setTask({
            text: 'На координатной прямой отмечено число $a$. Какое из утверждений для этого числа является ' + correctOrNot + 'верным?',
            answers: [correct, wrong][rand],
            wrongAnswers: [wrong, correct][rand]
        });
        AtoB(3);

        chas2.task.modifiers.addCanvasIllustration({
            width: 450,
            height: 100,
            paint: paint1,
        });
    }, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=311418
