(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '169869';
        // Как задан угол ромба: один угол 30°, один угол 150°,
        // сумма двух равных острых (60°) или тупых (300°) углов, разность двух углов (120°)
        let preference1 = ['angle30', 'angle150', 'sumAcute', 'sumObtuse', 'difference'];
        // Прямая задача (по периметру найти площадь) или обратная (по площади найти периметр)
        let preference2 = ['findArea', 'findPerimeter'];
        let randAngle = getSelectedPreferenceFromList(key, preference1);
        let randFind = getSelectedPreferenceFromList(key, preference2);
        let angleCondition = [
            `один из углов равен $30^\\circ$`,
            `один из углов равен $150^\\circ$`,
            `сумма двух его углов равна $60^\\circ$`,
            `сумма двух его углов равна $300^\\circ$`,
            `разность двух его углов равна $120^\\circ$`,
        ][randAngle];

        let side = sl(1, 50);
        let rhombus = new Rhombus({
            length: side,
            angles: {
                angle: {
                    angleA: [30, 150].iz()
                },
                angleInDegree: true,
            },
        });

        let points = autoScale(rhombus.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, rhombus.connectionMatrix);

        };

        NAtask.setTask({
            text: [
                `Периметр ромба равен $${4 * side}$, а ${angleCondition}. Найдите площадь этого ромба.`,
                `Площадь ромба равна $${side * side / 2}$, а ${angleCondition}. Найдите периметр этого ромба.`,
            ][randFind],
            answers: [side * side / 2, 4 * side][randFind],
            authors: ['Александра Суматохина'],
            preference: [preference1, preference2],
        });
        NAtask.modifiers.allDecimalsToStandard(true);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });

    }, 2000);
})();
// https://oge.sdamgia.ru/test?likes=169869
