(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let numRand = sl(0.1, 0.7, 0.05);
        let a = sl(3, 19, 1) + numRand;

        let paint1 = function (ct) {
            coordAxis_drawAuto(ct, {
                min: -1,
                max: 21,
                points: [
                    { value: -1, mark: "nothing" },
                    { value: 21, mark: "nothing" },
                    ...Array.from({ length: 21 }, (_, i) => ({
                        value: i,
                        mark: "line",
                        label: (i === 0 || i === 1) ? i : "", // только 0 и 1 подписаны
                        labelPos: "underAxis"
                    })),
                    { value: a, mark: "dot", label: "a", labelPos: "overAxis" }
                ],
                width: 700,
                height: 100,
                margin: 20
            });
        };

        let usedN = new Set();
        let correct = [];
        let wrong = [];
        //3 верных
        while (correct.length < 3) {
            let n = sl(1, 20);
            if (usedN.has(n) || (n - a).abs() < 0.5) {
                continue
            };
            usedN.add(n);

            let useAfirst = sl1();
            let diff = useAfirst ? a - n : n - a;
            let znak = diff > 0 ? '>0' : '<0';
            let expr = useAfirst ? `a-${n}${znak}` : `${n}-a${znak}`;
            correct.push(expr);
        }
        //3 неверных
        while (wrong.length < 3 && usedN.size < 20) {
            let n = sl(1, 20);
            if (usedN.has(n)) {
                continue
            };
            usedN.add(n);

            let useAfirst = sl1();
            let diff = useAfirst ? a - n : n - a;
            let znak = diff > 0 ? '<0' : '>0';
            let expr = useAfirst ? `a-${n}${znak}` : `${n}-a${znak}`;
            wrong.push(expr);
        }
        let rand = sl1();
        let correctOrNot = ['', 'не'][rand];

        NAtask.setTask({
            text: 'На координатной прямой отмечено число $a$. Какое из утверждений для этого числа является ' + correctOrNot + 'верным?',
            answers: [correct, wrong][rand],
            wrongAnswers: [wrong, correct][rand]
        });
        AtoB(3);

        chas2.task.modifiers.addCanvasIllustration({
            width: 700,
            height: 100,
            paint: paint1,
        });
    }, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=311418
