(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '506803';
        let preference = ['trapezoid', 'rightTrapezoid', 'rectangle'];
        let preference2 = ['cellSizeIsOne', 'cellSizeIsNotOne'];
        let shape = getSelectedPreferenceFromList(key, preference);
        let cellSize = getSelectedPreferenceFromList(key, preference2) ? sl(2, 10) : 1;
        let a = -sl(0, 6);
        let b = sl(1, 6);
        let bottomLeft = sl(-6, 0);
        let bottomRight = sl(1, 5);
        let topLeft = shape === 0 ? slKrome(bottomLeft, -6, 0) : bottomLeft;
        let topRight = shape === 2 ? bottomRight : slKrome(bottomRight, 1, 5);
        if (shape === 0) {
            genAssert(bottomRight - bottomLeft !== topRight - topLeft, 'Основания трапеции равны');
        }
        let points = [[bottomLeft, a], [bottomRight, a], [topRight, b], [topLeft, b]];

        points = points.map((c) => {
            return {
                x: c[0],
                y: c[1]
            };
        });

        const supplementary = {
            shiftCoordinate: false
        };

        let Shape = shape === 2 ? Rectangle : Trapezoid;
        let figure = new Shape({
            points,
            supplementary
        });

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;
            ctx.lineWidth = 0.5;
            let scale = 30;

            ctx.translate(w / 2, h / 2);
            ctx.regularGrid(scale, 6);
            ctx.scale(scale, -scale);
            ctx.strokeStyle = om.secondaryBrandColors;
            ctx.rotate(sl(0, 3) * Math.PI / 2);
            ctx.lineWidth = 4 / scale;
            ctx.drawFigure(figure.vertices, figure.connectionMatrix);
        };

        NAtask.setTask({
            text: `План местности разбит на клетки. Каждая клетка обозначает квадрат $${cellSize} \\text{ м} \\times ${cellSize} \\text{ м}$. Найдите площадь участка, выделенного на плане. Ответ дайте в квадратных метрах.`,
            answers: figure.area() * cellSize * cellSize,
            authors: ['Александра Суматохина'],
            preference: [preference, preference2],
        });

        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 1000);

})();
//https://mathb-ege.sdamgia.ru/problem?id=506803
// FCBC46, AB1B17, 753C2B, 075BA8, 900FEE, 00A7F6, 29D2CD, 011529, 42FC82, 5A9987, 0FD7F6, 29A9F6, 34FFF0, 12B30E, A9460E, DC1570, 9A6775, B89CBE, 163616, 9BDB1F, 523C27, EDBD2F, BC40D5, 3F9359, F8A9AB, 5DE3A8, 604FC7, 764297, B4AD93, AEFA9E, F373E9, 162BEB, 6CBC63, FF7F39, BF753D, B0183C, 23FE36, 75768B
