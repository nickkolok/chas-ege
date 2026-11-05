(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '507527';
        let preference = ['rhombus', 'tiltedSquare', 'tiltedRectangle'];
        let preference2 = ['cellSizeIsOne', 'cellSizeIsNotOne'];
        let shape = getSelectedPreferenceFromList(key, preference);
        let cellSize = getSelectedPreferenceFromList(key, preference2) ? sl(2, 10) : 1;
        let points;
        if (shape === 0) {
            let a = sl(1, 6);
            let b = slKrome(a, 1, 6);
            points = [[0, b], [a, 0], [0, -b], [-a, 0]];
        } else {
            let a = sl(1, 3);
            let b = sl(1, 3);
            let ratio = shape === 1 ? 1 : 2;
            points = [[0, 0], [a, b], [a - ratio * b, b + ratio * a], [-ratio * b, ratio * a]];
            let centerX = Math.floor((a - ratio * b) / 2);
            let centerY = Math.floor((b + ratio * a) / 2);
            points = points.map(([x, y]) => [x - centerX, y - centerY]);
        }

        points = points.map((c) => {
            return {
                x: c[0],
                y: c[1]
            };
        });

        const supplementary = {
            shiftCoordinate: false
        };

        let Shape = shape === 0 ? Rhombus : Rectangle;
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
            ctx.rotate(sl1() * Math.PI / 2);
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
//https://mathb-ege.sdamgia.ru/problem?id=507527
// 63EEF6, 886A9A, E1FF17, 42FAFA, C85651, 8F2B9C, 98B98A, 69774C, 7D247F, 1560B5, C5E3B7, E11923, FF12D3, B0A6DA, E200D7, 1B7EC2, D750CA, 4D1F90, 3FC16C, 5AEB36, E50959, 5F0B61
