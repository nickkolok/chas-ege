(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = "349100";
        let variant = getListedPreference(key, [{
            preference: 'A',
            preferenceValue: 0,
        }, {
            preference: 'B',
            preferenceValue: 1,
        }, {
            preference: 'C',
            preferenceValue: 2,
        }], sl(0, 2));

        let letters = latbukv.slice(0, 4);
        let sideDano = letters.slice(0, 3);
        let centralPoint = sideDano.splice(variant, 1)[0];
        let pointMedian = letters[3];

        let triangle = new Triangle({
            lengths: {
                lengthAB: sl(5, 10),
                lengthBC: sl(5, 10),
                lengthCA: sl(5, 10),
            },
            supplementary: {
                calculateMedians: true,
            }
        });
        genAssert(![triangle.lengthAB, triangle.lengthBC, triangle.lengthCA].hasDubl(), 'Все стороны треугольника должны быть разными');

        let medianLength = [triangle.medianALength, triangle.medianBLength, triangle.medianCLength][variant];
        let valueDano = [triangle.lengthBC, triangle.lengthCA, triangle.lengthAB][variant];
        genAssertZ1000(medianLength / 10);

        triangle.addVertex([triangle.medianEndPointA, triangle.medianEndPointB, triangle.medianEndPointC][variant], ['A', 'B', 'C'][variant]);

        let points = autoScale(triangle.vertices);

        let pointsSide = points.slice(0, 3);
        pointsSide.splice(variant, 1)[0];

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, triangle.connectionMatrix);

            ctx.strokeStyle = om.primaryBrandColors[1];
            ctx.strokeInMiddleOfSegment(pointsSide[0].x, pointsSide[0].y, points[3].x, points[3].y, 10);
            ctx.strokeInMiddleOfSegment(pointsSide[1].x, pointsSide[1].y, points[3].x, points[3].y, 10);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < points.length / 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `В треугольнике $ABC$ известно, что ${[
                `$${sideDano.shuffleJoin()}=${valueDano}$`,
                `$${[centralPoint, pointMedian].shuffleJoin()}$ – медиана`,
                `$${[centralPoint, pointMedian].shuffleJoin()}=${medianLength.ts()}$`
            ].shuffleJoin(', ')}. Найдите $${[sideDano.iz(), pointMedian].shuffleJoin()}$.`,
            answers: valueDano / 2,
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.variativeABC(letters);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 1000);

})();
//349100 349189 349535 349595 349711 350268 350500 350845 350876 351315 351812 352760 370473 392117 401533 401773 401811 401891 402288 402457 402688 402710 402978 403263 403849
