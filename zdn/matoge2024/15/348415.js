(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = "348415";
        let variant = getListedPreference(key, [{
            preference: 'hypotenuse',
            preferenceValue: 0,
        }, {
            preference: 'area',
            preferenceValue: 1,
        },{
            preference: 'catheter',
            preferenceValue: 2,
        }], sl(0,2));

        let triangle = new Triangle({
            lengths: {
                lengthBC: sl(3, 20),
                lengthCA: sl(3, 20),
            },
            angles: {
                angle: Math.PI / 2,
            },
        });

        genAssert(![triangle.lengthAB, triangle.lengthBC, triangle.lengthCA].hasDubl(), 'Все стороны треугольника должны быть разными');
        genAssertZ1000(triangle.lengthAB, 'Гипотенуза не целая');

        let dano = [
            ['катеты', [triangle.lengthCA, triangle.lengthBC]],
            ['катет и гипотенуза', [triangle.lengthCA, triangle.lengthAB]]
        ][variant<2?0:1];

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
            ctx.arcBetweenSegments([points[0].x, points[0].y, points[2].x, points[2].y, points[1].x, points[1].y], 20);
        };

        NAtask.setTask({
            text: `${[`Катеты прямоугольного треугольника`, `В прямоугольном треугольнике`][variant<2?0:1]} 
			${dano[0]} равны $${dano[1].join('$ и $')}$${` соответственно`.esli(variant<2?0:1)}.
			Найдите `,
            questions: [
                [{
                    text: `гипотенузу`,
                    answer: triangle.lengthAB,
                }, {
                    text: `площадь`,
                    answer: triangle.area,
                },{
                    text: `другой катет`,
                    answer: triangle.lengthBC,
                },][variant]
            ],
            postquestion: ` этого треугольника.`,
            authors: ['Александра Суматохина'],
        });

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 1000);

})();
// 348415 349868 350165 350527 350678 351084 351845 352089 352318 352995 353488 401243 401998 402213 402476 402578 402846 403273 403438 403575 403981 404272
// 348419 348430 348873 349799 350228 350389 350544 350592 351612 351985 352943 353168 400974 401313 401941 402256 402381 402493 402522 403157 403359 403949 404093
