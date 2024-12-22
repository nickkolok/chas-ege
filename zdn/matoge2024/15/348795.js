(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = "348795";
        let variant = getListedPreference(key, [{
            preference: 'find_median',
            preferenceValue: 0,
        }, {
            preference: 'find_bisector',
            preferenceValue: 1,
        }, {
            preference: 'find_height',
            preferenceValue: 2,
        }, {
            preference: 'find_side_from_median',
            preferenceValue: 3,
        }, {
            preference: 'find_side_from_bisector',
            preferenceValue: 4,
        }, {
            preference: 'find_side_from_height',
            preferenceValue: 5,
        }], sl(0, 5));

        let side = sl(5, 20) * ((variant < 3) ? (3).sqrt() : 1);

        let triangle = new Triangle({
            lengths: {
                lengthAB: side,
                lengthBC: side,
                lengthCA: side,
            },
            supplementary: {
                calculateHeights: true,
            }
        });

        let randomLine = sl(0, 2);

        triangle.addVertex([triangle.heightEndPointA, triangle.heightEndPointB, triangle.heightEndPointC][randomLine], ['A', 'B', 'C'][randomLine]);

        let height = [triangle.heightALength, triangle.heightBLength, triangle.heightCLength][randomLine];
        genAssertZ1000(height.pow(2) / 100);

        let points = autoScale(triangle.vertices);
        let pointToLine = points.slice(0, 3);
        let pointForAngleAndMarked = pointToLine.splice(randomLine, 1)[0];

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, triangle.connectionMatrix);

            ctx.strokeStyle = om.primaryBrandColors.iz();
            switch (variant % 3) {
                case 0:
                    ctx.strokeInMiddleOfSegment(pointToLine[0].x, pointToLine[0].y, points[3].x, points[3].y, 7);
                    ctx.strokeInMiddleOfSegment(pointToLine[1].x, pointToLine[1].y, points[3].x, points[3].y, 7);
                    break;
                case 1:
                    ctx.arcBetweenSegments([pointToLine[0].x, pointToLine[0].y, pointForAngleAndMarked.x, pointForAngleAndMarked.y, points[3].x, points[3].y], 30);
                    ctx.arcBetweenSegments([pointToLine[1].x, pointToLine[1].y, pointForAngleAndMarked.x, pointForAngleAndMarked.y, points[3].x, points[3].y], 35);
                    break;
                case 2:
                    ctx.arcBetweenSegments([pointForAngleAndMarked.x, pointForAngleAndMarked.y, points[3].x, points[3].y, pointToLine[0].x, pointToLine[0].y], 15, true);
                    break;
            }
        };

        NAtask.setTask({
            text: `${[`Медиана`, `Биссектриса`, `Высота`, `Сторона`][(variant < 3) ? 3 : (variant % 3)]} 
            равностороннего треугольника равна $${[side, height][(variant < 3) ? 0 : 1].pow(2).texsqrt(true)}$.
			Найдите `,
            questions: [
                [{
                    text: 'медиану',
                    answers: height,
                }, {
                    text: 'биссектрису',
                    answers: height,
                }, {
                    text: 'высоту',
                    answers: height,
                }, {
                    text: 'сторону',
                    answers: side,
                }][(variant < 3) ? variant : 3]
            ],
            postquestion: ` этого треугольника.`,
            authors: ['Александра Суматохина'],
        });

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 2000);

})();
// 348795 349227 349645 352131 401255 401564 401849 403461
// 348399 350010 349414 350510 357055 357057 400948 401670 402099 402463
// 349350 349471 349830 352249 401636 401715 401963 403530
// 339389 348642 348819 349524 349579 349671 350250 352003 352867 353087 353155 353277 353440 392955 339441 339766 339844 339889 339891 339936 339945 339972 340124 340172 340205 340211 340252 340292 340301 401142 401273 401766 401798 401864 402275 403375 404034
