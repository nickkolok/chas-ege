(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let a = sl(1, 4);
        let b = slKrome(a, 1, 4);

        let firstPoints = [
            [-a, -b],
            [a, -b],
            [a, b],
            [-a, b],
        ];

        firstPoints = firstPoints.map((point) => {
            return {
                x: point[0],
                y: point[1]
            };
        });
        
        let c = sl(0, a);
        let d = -slKrome(c, 0, a - 1);

        let secondPoints = [
            [d, b + 1],
            [c, b + 1],
            [c, b],
            [d, b],
        ];

        secondPoints = secondPoints.map((point) => {
            return {
                x: point[0],
                y: point[1]
            };
        });

        const supplementary = {
            shiftCoordinate: false
        };

        let firstRect = new Rectangle({
            points: firstPoints,
            supplementary
        });

        let secondRect = new Rectangle({
            points: secondPoints,
            supplementary
        });

        firstRect.addVertexToConnectionMatrix(secondRect.pointC, 'E');
        firstRect.connectVerticesInConnectionMatrix([2, 4]);
        firstRect.addVertexToConnectionMatrix(secondRect.pointD, 'E');
        firstRect.connectVerticesInConnectionMatrix([3, 5]);

        secondRect.connectionMatrix[2][2] = 0;
        firstRect.connectionMatrix[2][2] = 0;

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;
            ctx.lineWidth = 0.5;
            let scale = 30;

            ctx.translate(w / 2, h / 2);
            ctx.regularGrid(scale, scale);
            ctx.scale(scale, -scale);
            ctx.strokeStyle = om.secondaryBrandColors;
            ctx.rotate(sl(0, 3) * Math.PI / 2);
            ctx.lineWidth = 4 / scale;
            ctx.drawFigure(firstRect.vertices, firstRect.connectionMatrix);
            ctx.drawFigure(secondRect.vertices, secondRect.connectionMatrix);
        };

        NAtask.setTask({
            text: `План местности разбит на клетки. Каждая клетка обозначает квадрат $1 \\text{ м} \\times 1 \\text{ м}$. Найдите площадь участка, выделенного на плане. Ответ дайте в квадратных метрах.`,
            answers: firstRect.area() + secondRect.area(),
            authors: ['Александра Суматохина'],
        });

        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 1000);

})();
//https://mathb-ege.sdamgia.ru/problem?id=510130
