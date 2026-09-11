(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '11632';
        let preference = ['sin_BAC_by_diagonals', 'sin_ABD_by_side_diagonalBD', 'sin_BAC_by_side_diagonalAC', 'tg_BAC_by_side_diagonalAC', 'tg_BAC_by_area_diagonalAC'];

        let rand = getListedPreference(key, preference.map((pref, index) => ({
            preference: pref,
            preferenceValue: index
        })), sl(preference.length - 1));

        let letters = latbukv.slice(0, 4);
        let d1 = sl(1, 50);
        let d2 = slKrome(d1, 1, 50);
        let side = (d1.pow(2) / 4 + d2.pow(2) / 4).sqrt();

        rhombus = new Rhombus({
            length: [sl(5, 20), side][Number(rand > 2)],
            angles: {
                angle: {
                    angleA: [[1, 2].iz() * Math.PI / 3, Math.atan(d2 / d1)][Number(rand > 2)],
                },
            }
        });

        let angleBAC = new Angle(rhombus.pointB, rhombus.pointA, rhombus.pointC).angleInRadians;
        let angleABD = new Angle(rhombus.pointA, rhombus.pointB, rhombus.pointD).angleInRadians;

        genAssertZ1000([angleBAC.sin(), angleABD.sin(), angleBAC.sin(), angleBAC.tg(), angleBAC.tg()][rand]);

        rhombus.connectVerticesInConnectionMatrix([
            [0, 2],
            [1, 3]
        ]);

        let points = autoScale(rhombus.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, rhombus.connectionMatrix);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i == 1) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `В ромбе $ABCD$ `,
            questions: [
                [{
                    text: `диагональ $AC=${rhombus.lengthDiagonalAC.pow(2).texsqrt(1)}$, диагональ $BD=${rhombus.lengthDiagonalBD.pow(2).texsqrt(1)}$. Найдите синус угла $BAC$.`,
                    answers: angleBAC.sin(),
                }, {
                    text: `известно, что $AB=${rhombus.lengthAB}$, $BD=${rhombus.lengthDiagonalBD.pow(2).texsqrt(1)}$. Найдите синус угла $ABD$.`,
                    answers: angleABD.sin(),
                }, {
                    text: `известно, что $AB=${rhombus.lengthAB}$, $AC=${rhombus.lengthDiagonalAC.pow(2).texsqrt(1)}$. Найдите синус угла $BAC$.`,
                    answers: angleBAC.sin(),
                }, {
                    text: `диагональ $AC=${rhombus.lengthDiagonalAC.pow(2).texsqrt(1)}$, сторона $AB=${rhombus.lengthAB.pow(2).texsqrt(1)}$. Найдите тангенс угла $BAC$.`,
                    answers: angleBAC.tg(),
                }, {
                    text: `диагональ $AC=${rhombus.lengthDiagonalAC.pow(2).texsqrt(1)}$, площадь ромба равна $${rhombus.area()}$. Найдите тангенс угла $BAC$.`,
                    answers: angleBAC.tg(),
                }][rand]
            ],
            authors: ['Александра Суматохина'],
            preference: preference,
        });

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });

    }, 2000);
    NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://base.mathege.ru/clones/?position=16&parent=11632
// https://base.mathege.ru/clones/?position=16&parent=10126
// https://base.mathege.ru/clones/?position=16&parent=11602
// https://base.mathege.ru/clones/?position=16&parent=11622
