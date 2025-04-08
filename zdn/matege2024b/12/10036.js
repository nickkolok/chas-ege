(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = "10036";
        let preference1 = ['A', 'C'];
        let preference2 = ['catheter', 'hypotenuse'];
        let rand = getListedPreference(key, preference1.map((pref, index) => ({
            preference: pref,
            preferenceValue: index
        })), sl(preference1.length - 1));

        let angleAC = getListedPreference(key, preference2.map((pref, index) => ({
            preference: pref,
            preferenceValue: index
        })), sl(preference2.length - 1));

        let letters = latbukv.slice(0, 3);

        let a = sl(1, 50);
        let sides = [a, a * (3).sqrt()].shuffle();
        let triangle = new Triangle({
            lengths: {
                lengthAB: sides[0],
                lengthBC: sides[1],
            },
            angles: {
                angle: Math.PI / 2,
            },
        });

        let dano = [
            [
                ['BC', triangle.lengthBC],
                ['AB', triangle.lengthAB]
            ].iz(), ['CA', triangle.lengthCA]
        ];
        let name = sklonlxkand([`катет`, `гипотенуза`]);

        genAssertZ1000(dano[1 - rand][1]);

        triangle.addVertexToConnectionMatrix([{ x: triangle.pointA[0].x - triangle.lengthAB * 0.15, y: triangle.pointA[0].y }, { x: triangle.pointC[0].x, y: triangle.pointC[0].y + triangle.lengthBC * 0.15 }][angleAC], ['A', 'C'][angleAC]);

        let points = autoScale(triangle.vertices, {
            x: 0,
            y: 0,
            z: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
        }, triangle.vertices, {
            startX: -180,
            finishX: 120,
            startY: -160,
            finishY: 140,
            step: 0.1,
            maxScale: 100
        });

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, triangle.connectionMatrix);

            ctx.strokeStyle = om.primaryBrandColors.iz();


            if (!angleAC) {
                ctx.arcBetweenSegments([points[2].x, points[2].y, points[0].x, points[0].y, points[3].x, points[3].y], 20);
            } else {
                ctx.arcBetweenSegments([points[3].x, points[3].y, points[2].x, points[2].y, points[0].x, points[0].y], 20);
            }

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.slice(0, points.length - 1).forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `В прямоугольном треугольнике $ABC$ внешний угол при вершине $${['A', 'C'][angleAC]}$ равен $${180 - [triangle.angleAInDegrees, triangle.angleCInDegrees][angleAC]}^\\circ$. 
			${name[rand].ie.toZagl()} $${[dano[rand][0], dano[rand][1].pow(2).texsqrt(true)].join(` =`)}$. Найдите длину ${name[1 - rand].re} $${dano[1 - rand][0]}$.`,
            answers: dano[1 - rand][1],
            authors: ['Александра Суматохина'],
            preference: [preference1, preference2],
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
// https://base.mathege.ru/clones/?position=16&parent=10036
// https://base.mathege.ru/clones/?position=16&parent=11112
// https://base.mathege.ru/clones/?position=16&parent=11152
