(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let letters = latbukv.slice(0, 3);

        let key = "356079";
        let variant = getListedPreference(key, [{
            preference: 'sinA',
            preferenceValue: 0,
        }, {
            preference: 'cosA',
            preferenceValue: 1,
        }, {
            preference: 'tgA',
            preferenceValue: 2,
        }, {
            preference: 'ctgA',
            preferenceValue: 3,
        }, {
            preference: 'sinC',
            preferenceValue: 4,
        }, {
            preference: 'cosC',
            preferenceValue: 5,
        }, {
            preference: 'tgC',
            preferenceValue: 6,
        }, {
            preference: 'ctgC',
            preferenceValue: 7,
        }], sl(0, 7));

        let triangle = new Triangle({
            lengths: {
                lengthAB: sl(5, 20),
                lengthBC: sl(5, 20),
            },
            angles: {
                angle: Math.PI / 2,
            },
        });
        genAssert(![triangle.lengthAB, triangle.lengthBC, triangle.lengthCA].hasDubl(),
            'Все стороны треугольника должны быть разными');

        let find = ['sin', 'cos', 'tg', 'ctg'][variant % 4] + ' ' + ['A', 'C'][variant < 4 ? 0 : 1];
        let sides;

        switch (true) {
            case [0, 5].includes(variant):
                sides = ['BC', 'CA'];
                break;
            case [1, 4].includes(variant):
                sides = ['AB', 'CA'];
                break;
            case [2, 3, 6, 7].includes(variant):
                sides = ['AB', 'BC'];
                break;
        }

        sides = sides.map(side => {
            switch (side) {
                case 'AB':
                    return `$${side}=${triangle.lengthAB}$`;
                case 'BC':
                    return `$${side}=${triangle.lengthBC}$`;
                case 'CA':
                    return `$${side}=${triangle.lengthCA}$`;
            }
        });

        let answer = [triangle.sinA, triangle.cosA, triangle.tgA, triangle.ctgA, triangle.sinC, triangle.cosC, triangle.tgC, triangle.ctgC][variant];
        genAssertZ1000(answer);

        let points = autoScale(triangle.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, triangle.connectionMatrix);

            ctx.strokeStyle = om.primaryBrandColors.iz();
            ctx.arcBetweenSegments([points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y], 20);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < points.length / 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `В треугольнике $ABC$ угол $B$ равен $90^{\\circ}$, ${sides.shuffleJoin(', ')}. Найдите $\\${find}$.`,
            answers: answer,
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.variativeABC(letters);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 2000);

})();
// 356079 356089 356099 356080 356081 356082 356083 356084 356085 356086 356087 356088 356090 356091 356092 356093 356094 356095 356096 356097 356098 356100 356101 356102 356103 356104 356105 356106 356107 356108 401010 401041 401078 401173 401269 401495 401597 401702 402079 402111 402122 402255 402400 402536 402938 403005 403158 403161 403196 403334 404286
