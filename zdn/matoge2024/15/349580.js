(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = "349580";
        let variant = getListedPreference(key, [{
            preference: 'AB',
            preferenceValue: 0,
        }, {
            preference: 'BC',
            preferenceValue: 1,
        }, {
            preference: 'CA',
            preferenceValue: 2,
        }], sl(0, 2));

        let triangle = new Triangle({
            lengths: {
                lengthAB: sl(5, 10),
                lengthBC: sl(5, 10),
                lengthCA: sl(5, 10),
            },
            supplementary: {
                calculateMidlines: true,
            }
        });
        genAssert(![triangle.lengthAB, triangle.lengthBC, triangle.lengthCA].hasDubl(),
            'Все стороны треугольника должны быть разными');
        [triangle.angleAInDegrees, triangle.angleBInDegrees, triangle.angleCInDegrees].forEach(angle => genAssert(angle < 80,
            'Треугольник не остроугольный'));

        triangle.addVertex([triangle.midlinePointsAB, triangle.midlinePointsBC, triangle.midlinePointsCA][variant], 'E');
        triangle.connectVertices([3, 4]);

        let letters = latbukv.slice(0, 5);
        let sidesMidle = letters.slice(0, 3);
        sidesMidle.generatePairs();
        sidesMidle = sidesMidle.map(side => side.shuffleJoin());
        [sidesMidle[1], sidesMidle[2]] = [sidesMidle[2], sidesMidle[1]];
        sidesMidle.splice(variant, 1)[0];
        
        if(variant == 1){
        	sidesMidle = sidesMidle.reverse();
        }

        let points = autoScale(triangle.vertices);

        const nextIndex = (variant + 1) % 3;
        const lastIndex = (variant + 2) % 3;

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, triangle.connectionMatrix);

            ctx.strokeStyle = om.primaryBrandColors.iz();

            ctx.strokeInMiddleOfSegment(points[nextIndex].x, points[nextIndex].y, points[3].x, points[3].y, 7);
            ctx.strokeInMiddleOfSegment(points[lastIndex].x, points[lastIndex].y, points[3].x, points[3].y, 7);

            ctx.strokeInMiddleOfSegment(points[variant].x, points[variant].y, points[4].x, points[4].y, 7, 2);
            ctx.strokeInMiddleOfSegment(points[lastIndex].x, points[lastIndex].y, points[4].x, points[4].y, 7, 2);


            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i > 4) ? 25 : -5)));
        };

        NAtask.setTask({
            text: ` Точки $D$ и $F$ являются серединами сторон $${sidesMidle.join('$ и $')}$ треугольника $ABC$, 
			${[
                    `сторона $AB$ равна $${triangle.lengthAB}$`,
                    `сторона $BC$ равна $${triangle.lengthBC}$`,
                    `сторона $AC$ равна $${triangle.lengthCA}$`
                ].shuffleJoin(', ')}. 
			Найдите $DF$.`,
            answers: [triangle.midlineABLength, triangle.midlineBCLength, triangle.midlineCALength][variant],
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
// 349580 349690 350207 350232 350374 350403 350470 350987 351290 352432 353388 353449 401800 401877 402245 402259 402370 402392 402435 402964 403641 404216 404250
