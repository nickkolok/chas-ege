(function () {
    retryWhileError(function () {
        let par = new Parallelepiped({
            depth: sl(10, 50),
            height: sl(10, 50),
            width: sl(10, 50),
        });

        let letter = ['A', 'B', 'C', 'D', 'D₁', 'A₁', 'B₁', 'C₁',];
        let copyLetter = ['A', 'B', 'C', 'D', 'A_1', 'B_1', 'C_1', 'D_1'];
        let vert;
        if (sl1()) {
            copyLetter = copyLetter.randomReverse();
            vert = [copyLetter.slice(0, 3), copyLetter.slice(4, 7).iz()];
        } else {
            copyLetter.permuteCyclic(sl(0, 6, 2));
            vert = [
                [copyLetter[0], copyLetter[1], copyLetter[4], copyLetter[5]].iz(3), copyLetter.filter((_, i) => ![0, 1, 4, 5].includes(
                    i)).iz()
            ];
        }

        let strok = [5, 4];

        let matrixPar = [
            [strok],
            [0, 1],
            [strok, 0, 1],
            [0, 0, 0, 1],
            [strok, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 0, 1, 0, 1, 0, 1],
        ];

        let camera = {
            x: 0,
            y: 0,
            z: 0,
            scale: 5,

            rotationX: -Math.PI / 2 + Math.PI / 14,
            rotationY: 0,
            rotationZ: 2 * Math.PI / 3,
        };

        let point2DPar = par.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));
        genAssert((point2DPar[0].x - point2DPar[2].x).abs() > 20, 'Сечение не видно');

        autoScale(par.verticesOfFigure, camera, point2DPar, {
            startX: -180,
            finishX: 160,
            startY: -160,
            finishY: 160,
            maxScale: 50,
        });

        point2DPar = par.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));
        genAssert((point2DPar[0].x - point2DPar[2].x).abs() > 20, 'Сечение не видно');

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;
            ctx.translate(h / 2, w / 2);
            ctx.lineWidth = 2;
            ctx.strokeStyle = om.secondaryBrandColors;
            ctx.drawFigure(point2DPar, matrixPar);
            ctx.font = "25px liberation_sans";

            point2DPar.forEach((elem, i) => ctx.fillText(letter[i], elem.x, elem.y + ((i < point2DPar.length / 2) ? 15 : -10)));
        };

        NAinfo.requireApiVersion(0, 2);
        NAtask.setTask({
            text: 'В прямоугольном параллелепипеде $A B C D A_1 B_1 C_1 D_1$ известно, что ' + ['$AB=' + par.width + '$',
            ' $BC=' + par.depth + '$', ' $BB_1=' + par.height + '$'
            ].shuffleJoin(', ') + '. Найдите ',
            questions: [{
                text: 'объём',
                answers: par.volume / 6
            }],
            postquestion: ' многогранника, вершинами которого являются точки $' +
                vert.shuffleJoin('$, $') + '$.',
            analys: '',
            author: ['Суматохина Александра']
        });
        NAtask.modifiers.allDecimalsToStandard(true);
        NAtask.modifiers.assertSaneDecimals();
        NAtask.modifiers.variativeABC(letter);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 100000);
})();
/*
Решу ЕГЭ
 27074 5079
*/
