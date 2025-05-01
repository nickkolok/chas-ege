(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let a = sl(4.5, 19.5, 0.5);

        let paint1 = function (ct) {
            const w = 400;
            const h = 100;
            ct.translate(0, h / 2);

            // Прямая
            ct.strokeStyle = om.primaryBrandColors[0];
            ct.lineWidth = 2;
            ct.drawLine(10, 0, w - 10, 0);


            // Засечки и подписи
            ct.strokeStyle = om.primaryBrandColors[0];
            ct.fillStyle = om.secondaryBrandColors[0];
            ct.lineWidth = 2;
            ct.font = "14px Arial";
            for (let i = 0; i <= 20; i++) {
                let x = 10 + (w - 20) * (i / 20);
                ct.drawLine(x, -5, x, 5);
                if (i <= 1) {
                    ct.fillText(i, x - 7, 20);
                }
            }

            // Стрелка вправо и "x"
            let xArrowStart = 10 + (w - 20);
            ct.strokeStyle = om.primaryBrandColors[0];
            ct.drawArrow(xArrowStart, 0, xArrowStart + 15, 0);
            ct.fillStyle = om.secondaryBrandColors[0];
            ct.font = "14px Arial";
            ct.fillText("x", xArrowStart + 18, 5);

            // Точка a и её подпись
            let aX = 10 + (w - 20) * (a / 20);
            ct.fillStyle = om.secondaryBrandColors[0];
            ct.drawFilledCircle(aX, 0, 4);
            ct.fillStyle = om.secondaryBrandColors[0];
            ct.fillText("a", aX - 5, -10);
        };

        // Генерация утверждений
        function generateStatements(a, wrongCount) {
            let used = new Set();
            let wrAns = [];  
            //ложные
            while (wrAns.length < wrongCount) {
                let n = sluchch(1, 20, 1);
                if (Math.abs(n - a) < 1 || used.has(n)) continue;
                used.add(n);
                let useAfirst = Math.random() < 0.5;
                let exprValue = useAfirst ? a - n : n - a;
                if (exprValue === 0) continue;

                let wrongExpr = useAfirst
                    ? `a-${n}${exprValue > 0 ? "<0" : ">0"}`
                    : `${n}-a${exprValue > 0 ? "<0" : ">0"}`;

                wrAns.push(wrongExpr);
            }
            //верные
            let correct;
            while (true) {
                let n = sluchch(1, 20, 1);
                if (Math.abs(n - a) < 1 || used.has(n)) continue;
                used.add(n);
                let useAfirst = Math.random() < 0.5;
                let exprValue = useAfirst ? a - n : n - a;
                if (exprValue === 0) continue;

                correct = useAfirst
                    ? `a-${n}${exprValue > 0 ? ">0" : "<0"}`
                    : `${n}-a${exprValue > 0 ? ">0" : "<0"}`;
                break;
            }

            return { correct, wrAns };
        }

        let { correct, wrAns } = generateStatements(a, 3);

        NAtask.setTask({
            text: 'На координатной прямой отмечено число $a$. Какое из утверждений для этого числа является верным?',
            answers: correct,
            wrongAnswers: wrAns
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
