(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '11736';
        let preference = ['sin_CAD', 'tg_CAB', 'tg_CAD'];

        let rand = getSelectedPreferenceFromList(key, preference);

        let letters = latbukv.slice(0, 4);
        // Синус: стороны и диагональ — пифагорова тройка, катеты в любом порядке,
        // как в ФИПИ (ответы 0,6; 0,8; 0,28; 0,96, тройки и с множителем: 12, 16, 20)
        let [a, b] = genPifag(50).slice(0, 2).shuffle();
        let area = a * b;
        if (rand) {
            // Тангенс CAB = BC/AB = BC²/S при данной BC — в ФИПИ та же задача с другими буквами
            // (тангенс CAD по площади и стороне AB): данная сторона от 4 до 15, площадь целая,
            // тангенс от 0,1 до 0,9, не больше трёх знаков. Вторая сторона может быть
            // не целой: у 16844F площадь 300 и AB = 9
            let tg = sl(0.1, 0.9, 0.005);
            b = sl(4, 20);
            // Тангенс CAD = AB/BC = S/BC² при данной BC — группа ФИПИ «тангенс угла CAD
            // по площади и стороне BC»: BC от 8 до 55, тангенс от 0,16 до 0,85
            if (rand == 2) {
                b = sl(5, 60);
            }
            area = (rand == 1) ? b * b / tg : tg * b * b;
            genAssertAlmostInteger(area, 'Площадь не целая');
            area = area.round();
            a = area / b;
        }

        let rect = new Rectangle({
            lengths: {
                lengthAB: a,
                lengthBC: b
            }
        });

        let angleCAD = new Angle(rect.pointC, rect.pointA, rect.pointD).angleInRadians;
        let angleCAB = new Angle(rect.pointC, rect.pointA, rect.pointB).angleInRadians;

        let answ = [angleCAD.sin(), angleCAB.tg(), angleCAD.tg()][rand];

        genAssertZ1000(answ);

        rect.connectVerticesInConnectionMatrix([0, 2]);

        let points = autoScale(rect.vertices);

        let paint1 = function (ctx) {

            ctx.translateToCenter();

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(points, rect.connectionMatrix);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `Площадь прямоугольника $ABCD$ равна $${area}$, ${[`$AB=${a}$`, `сторона $BC=${b}$`, `сторона $BC=${b}$`][rand]}. Найдите ${[`синус`, `тангенс`, `тангенс`][rand]} угла $${[`CAD`, `CAB`, `CAD`][rand]}$.`,
            answers: answ,
            authors: ['Александра Суматохина'],
            preference: preference,
        });

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });

        NAtask.modifiers.allDecimalsToStandard(true);
    }, 2000);
})();
// https://base.mathege.ru/clones/?position=16&parent=11736
// https://base.mathege.ru/clones/?position=16&parent=11820
