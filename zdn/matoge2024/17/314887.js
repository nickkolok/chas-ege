(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let a = sl(2, 50);
        let b = slKrome(a, 2, 50);
        let side = (a - b).abs() / Math.sqrt(2);
        genAssert(side > [a, b].maxE() * 0.2, 'Трапеция слишком плоская');

        const trp = new Trapezoid({
            lengths: {
                lengthAB: a,
                lengthBC: side,
                lengthCD: b,
                lengthDA: side,
            },
            supplementary: {
                calculateHeights: true,
            }
        });
        genAssert(trp.lengthHeightACD.isAlmostInteger(), 'Высота не целая');

        let points = autoScale(trp.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(points, trp.connectionMatrix);

            // Как на чертеже ФИПИ: угол 45° отмечен у левого конца большего основания,
            // длины оснований подписаны снаружи трапеции
            let bases = [[points[0], points[1], trp.lengthAB], [points[2], points[3], trp.lengthCD]];
            if (trp.lengthAB < trp.lengthCD) {
                bases.reverse();
            }
            let longBase = bases[0];
            let shortBase = bases[1];
            let left = longBase[0].x < longBase[1].x ? longBase[0] : longBase[1];
            let right = left == longBase[0] ? longBase[1] : longBase[0];
            let legEnd = [shortBase[0], shortBase[1]].sort((p1, p2) => p1.x - p2.x)[0];

            ctx.strokeStyle = om.primaryBrandColors.iz();
            ctx.arcBetweenSegments([right.x, right.y, left.x, left.y, legEnd.x, legEnd.y], 30);

            ctx.scale(1, -1);
            ctx.fillStyle = om.secondaryBrandColors.iz();
            ctx.font = "20px liberation_sans";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            let up = Math.sign(shortBase[0].y - longBase[0].y);
            ctx.fillText('45°', left.x + 55, -(left.y + up * 14));
            bases.forEach(([p1, p2, length], i) => {
                let outside = (i == 0 ? -up : up) * 18;
                ctx.fillText(length, (p1.x + p2.x) / 2, -((p1.y + p2.y) / 2 + outside));
            });
        };

        NAtask.setTask({
            text: `В равнобедренной трапеции основания равны $${trp.lengthAB}$ и $${trp.lengthCD}$, а один из углов между боковой стороной и основанием равен $45^\\circ$. Найдите площадь этой трапеции.`,
            answers: trp.area(),
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.allDecimalsToStandard(true);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });

    }, 2000);
})();
// https://oge.sdamgia.ru/problem?id=314887
