(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let letters = latbukv.slice(0, 4).concat('O');

        let par = new Parallelogram({
            lengths: {
                lengthAB: sl(1, 50),
                lengthBC: sl(1, 50),
            },
            angles: {
                angle: {
                    angleA: [60, 120].iz(),
                },
                angleInDegree: true,
            },
            supplementary: {
                calculateDiagonals: true
            }
        });

        genAssertZ1000(par.lengthDiagonalAC.pow(2));
        genAssertZ1000(par.lengthDiagonalBD);

        let answ = par.pointD.distanceTo(new Point(0, 0))[0];
        genAssertZ1000(answ);

        par.connectVerticesInConnectionMatrix([
            [0, 2],
            [1, 3]
        ]);

        let points = autoScale(par.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, par.connectionMatrix);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            ctx.fillText(letters.slice(-1), 0, 0);
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < points.length / 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `Диагонали $AC$ и $BD$ параллелограмма $ABCD$ пересекаются в точке $O$, $AC = ${par.lengthDiagonalAC.pow(2).texsqrt(1)}$, $BD =${par.lengthDiagonalBD.pow(2).texsqrt(1)}$, $AB = ${par.lengthAB}$. Найдите $DO$.`,
            answers: answ,
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.variativeABC(letters);
        NAtask.modifiers.allDecimalsToStandard(true);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 2000);
})();
// https://oge.sdamgia.ru/problem?id=392876
