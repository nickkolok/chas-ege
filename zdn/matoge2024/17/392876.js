(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let letters = latbukv.slice(0, 4).concat('O');

        // Как в ФИПИ: диагонали AC < BD — чётные (AC от 6 до 26, BD от 12 до 30), сторона AB целая,
        // ответ DO = BD/2 целый. AB — сторона треугольника ABO со сторонами AC/2 и BD/2.
        let diagonalAC = sl(6, 30, 2);
        let diagonalBD = sl(diagonalAC + 2, 40, 2);
        let sideAB = sl((diagonalBD - diagonalAC) / 2 + 1, (diagonalAC + diagonalBD) / 2 - 1);
        // Вторая сторона — по сумме квадратов диагоналей, угол A — по теореме косинусов для BD
        let sideAD = ((diagonalAC ** 2 + diagonalBD ** 2) / 2 - sideAB ** 2).sqrt();
        let cosA = (sideAB ** 2 + sideAD ** 2 - diagonalBD ** 2) / (2 * sideAB * sideAD);

        let par = new Parallelogram({
            lengths: {
                lengthAB: sideAB,
                lengthBC: sideAD,
            },
            angles: {
                angle: {
                    angleA: cosA.acos(),
                },
            },
            supplementary: {
                calculateDiagonals: true
            }
        });
        genAssert(par.lengthDiagonalAC.isAlmostEqual(diagonalAC, 1e-9) && par.lengthDiagonalBD.isAlmostEqual(diagonalBD, 1e-9),
            'Диагонали параллелограмма не совпали с заданными');

        let answ = diagonalBD / 2;

        par.connectVerticesInConnectionMatrix([
            [0, 2],
            [1, 3]
        ]);

        let points = autoScale(par.vertices);

        let paint1 = function (ctx) {
            ctx.translateToCenter();

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(points, par.connectionMatrix);

            ctx.signVertices(points, letters.slice(0, 4));
            ctx.scale(1, -1);
            ctx.font = '20px liberation_sans';
            ctx.fillText(letters[4], par.diagonalIntersectionPoint.x, -par.diagonalIntersectionPoint.y);
        };

        NAtask.setTask({
            text: `Диагонали $AC$ и $BD$ параллелограмма $ABCD$ пересекаются в точке $O$, $AC = ${diagonalAC}$, $BD = ${diagonalBD}$, $AB = ${sideAB}$. Найдите $DO$.`,
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
// ФИПИ F77141 EF6511 8D3F15 F609D2 F499CB 99F180 FF47FC 5CB1D4 111C58 2E3469
