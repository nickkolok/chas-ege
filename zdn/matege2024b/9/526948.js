(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '526948';
        let preference = ['obliqueTriangle', 'rightTriangle'];
        let preference2 = ['cellSizeIsOne', 'cellSizeIsNotOne'];
        let rightTriangle = getSelectedPreferenceFromList(key, preference);
        let cellSize = getSelectedPreferenceFromList(key, preference2) ? sl(2, 10) : 1;
        let left = sl(-4, -2);
        let bottom = sl(-4, -2);
        const points = [
            {x: left, y: bottom},
            {x: sl(2, 4), y: rightTriangle ? bottom : sl(-4, -2)},
            {x: rightTriangle ? left : sl(-4, 4), y: sl(2, 4)},
        ];

        const supplementary = {
            shiftCoordinate: false
        };

        let triangle = new Triangle({
            points, supplementary
        });

        if (!rightTriangle) {
            let angles = [triangle.angleAInDegrees, triangle.angleBInDegrees, triangle.angleCInDegrees];
            genAssert(angles.every(angle => Math.abs(90 - angle) > 1e-7), 'Треугольник прямоугольный');
        }

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;
            ctx.lineWidth = 0.5;
            ctx.translate(w / 2, h / 2);
            ctx.regularGrid(40, 5);

            ctx.scale(40, -40);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 3.5 / 40;
            ctx.rotate(Math.PI * sl(5, 20, 5) / 10);
            ctx.drawFigure(triangle.vertices, triangle.connectionMatrix);
        };

        NAtask.setTask({
            text: `План местности разбит на клетки. Каждая клетка обозначает квадрат $${cellSize} \\text{ м} \\times ${cellSize} \\text{ м}$. Найдите площадь участка, выделенного на плане. Ответ дайте в квадратных метрах.`,
            answers: triangle.area() * cellSize * cellSize,
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
//https://mathb-ege.sdamgia.ru/problem?id=526948
// 7AE6F7, 55027F, 2C7ED8, 50E9DC, 9C1693, 3A4036, FBE613, FE0CCC, DA924B, 87824F, 4F1EF4, 0122F2, 5F2E0B, 122BB2, 2FD374, A9F672, 250EB4, 02E61A, 503217, CDAA18, 225ED1, 8BAF18, 0A072F, 582B2F, 529420, 6F712D, 4B025A, E29854, F696C7, D993C1, 5D42CD, 9F3894, 26E6E9, C91AE4, 968EE0, B8236A, 949369, 68506F, 79AB33, DAFE37, DDDB3D, F68688, 57638A, AAEB81, 4B1214, FE24FF, 1190FD, 42597F, 5E22BA, 4A8BED
