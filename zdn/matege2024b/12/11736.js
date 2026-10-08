(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '11736';
        let preference = ['sin_CAD', 'tg_CAB'];

        let rand = getListedPreference(key, preference.map((pref, index) => ({
            preference: pref,
            preferenceValue: index
        })), sl(preference.length - 1));

        let letters = latbukv.slice(0, 4);
        let a = sl(5, 20);

        let rect = new Rectangle({
            lengths: {
                lengthAB: a,
                lengthBC: slKrome(a, 5, 20)
            }
        });

        let angleCAD = new Angle(rect.pointC, rect.pointA, rect.pointD).angleInRadians;
        let angleCAB = new Angle(rect.pointC, rect.pointA, rect.pointB).angleInRadians;

        let answ = [angleCAD.sin(), angleCAB.tg()][rand];

        genAssertZ1000(answ * 1000);

        rect.connectVerticesInConnectionMatrix([0, 2]);

        let points = autoScale(rect.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, rect.connectionMatrix);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `Площадь прямоугольника $ABCD$ равна $${rect.area()}$, $${[[`AB`, rect.lengthAB], [`BC`, rect.lengthBC]][rand].join(`=`)}$. Найдите ${[`синус`, `тангенс`][rand]} угла $${[`CAD`, `CAB`][rand]}$.`,
            answers: answ,
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
// https://base.mathege.ru/clones/?position=16&parent=11736
// https://base.mathege.ru/clones/?position=16&parent=11820
