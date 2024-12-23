(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let letters = latbukv.slice(0, 3);

        let key = "356159";
        let variant = getListedPreference(key, [{
            preference: 'B',
            preferenceValue: 0,
        }, {
            preference: 'A',
            preferenceValue: 1,
        }, {
            preference: 'C',
            preferenceValue: 2,
        }], sl(0, 2));

        variant = 0;

        let triangle = new Triangle({
            lengths: {
                lengthAB: sl(5, 20),
                lengthBC: sl(5, 20),
                lengthCA: sl(5, 20),
            },
            supplementary: {
                calculateHeights: true,
            }
        });
        genAssert(![triangle.lengthCA, triangle.lengthBC].hasDubl(), 'Все стороны треугольника должны быть разными');

        [triangle.angleAInDegrees, triangle.angleBInDegrees, triangle.angleCInDegrees].forEach(angle => genAssert(angle < 90, 'Треугольник не остроугольный'));

        let sinAngle = sl(0.1, 0.9, 0.1);

        let angleDano = letters.slice(0, 3).permuteCyclic(variant).randomReverse();
        let sides = [angleDano.slice(0, 2), angleDano.slice(1, 3)].map(elem => elem.join(''));

        sides = sides.map(side => {
            switch (side) {
                case 'BA':
                case 'AB':
                    return [`${side}=${triangle.lengthAB}`, triangle.lengthAB];
                case 'CB':
                case 'BC':
                    return [`${side}=${triangle.lengthBC}`, triangle.lengthBC];
                case 'CA':
                case 'AC':
                    return [`${side}=${triangle.lengthCA}`, triangle.lengthCA];
            }
        });

        let points = autoScale(triangle.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, triangle.connectionMatrix);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < points.length / 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `В треугольнике $ABC$ известно, что $${[sides[0][0], sides[1][0]].concat(`\\sin \\angle ${angleDano.join('')} = ${sinAngle.texfrac(1)}`).shuffleJoin('$, $')}$. Найдите площадь треугольника $ABC$.`,
            answers: 0.5 * sides[0][1] * sides[1][1] * sinAngle,
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
// 356159 356164 356165 356166 356167 356160 356161 356162 356163 356168 401337 401340 401410 401578 402028 402571 402702 402703 404317
