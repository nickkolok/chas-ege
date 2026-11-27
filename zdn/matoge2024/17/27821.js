(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '27821';
        // В ФИПИ спрашивают только больший из отрезков; меньший — расширение шаблона
        let preferenceSegment = ['larger', 'smaller'];
        let rand = getSelectedPreferenceFromList(key, preferenceSegment);

        let side = sl(10, 20);
        const baseRange = [1, 20];
        let a = sl(...baseRange);

        const trp = new Trapezoid({
            lengths: {
                lengthAB: a,
                lengthBC: side,
                lengthCD: slKrome(a, ...baseRange),
                lengthDA: side,
            },
            supplementary: {
                calculateHeights: true,
            }
        });
        let bases = [trp.lengthAB, trp.lengthCD];
        let answ = (rand ? bases.minE() : bases.maxE()) / 2;

        trp.addVertexToConnectionMatrix([trp.segmentBC.middle(), trp.segmentDA.middle()], 'E');
        trp.connectVerticesInConnectionMatrix(
            [
                [0, 2],
                [4, 5]
            ]
        );

        // Поле уже холста на 40 px с каждой стороны: подписи вершин стоят в 18 px
        // от вершины наружу и иначе обрезаются краем холста
        let points = autoScale(trp.vertices, undefined, [], {startX: -160, finishX: 160, startY: -160, finishY: 160});
        let letters = latbukv.slice(0, 4);

        let preferenceLetters = ['noLetters', 'withLetters'];
        let randLetters = getSelectedPreferenceFromList(key, preferenceLetters);

        let paint1 = function (ctx) {
            ctx.translateToCenter();

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(points, trp.connectionMatrix);

            if (randLetters == 1) {
                ctx.scale(1, -1);
                ctx.font = '20px liberation_sans';
                points.slice(0, 4).forEach((elem, i) => {
                    let label = labelPositionAwayFrom(elem, { x: 0, y: 0 }, 18);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(letters[i], label.x, -label.y);
                });
            }
        };

        NAtask.setTask({
            text: `Основания трапеции равны $${trp.lengthAB}$ и $${trp.lengthCD}$. Найдите ${[`больший`, `меньший`][rand]} из отрезков, на которые делит среднюю линию этой трапеции одна из её диагоналей.`,
            answers: answ,
            authors: ['Александра Суматохина'],
            preference: [preferenceSegment, preferenceLetters]
        });
        NAtask.modifiers.allDecimalsToStandard(true);
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });


    }, 2000);
})();
// https://ege.sdamgia.ru/problem?id=27821
// ФИПИ 146E47 8131F5 7C9C1D A11227 1C57C9 6F74CD 5ECD98 C432E5 98EEE4 8F7CEA
