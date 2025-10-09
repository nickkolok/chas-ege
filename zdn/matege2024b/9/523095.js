(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let a = -sl(3, 6);
        let b = slKrome(3, 6);
        let c = sl(-6, 6);
        let d = c + sl(-6, 6);
        let delta = sl(1, 5).pm();
        let points = [
            [c, a],
            [d, a],
            [d + delta, b],
            [c + delta, b],
        ];

        points.forEach(point => genAssert(point[0].abs() < 7 && point[1].abs() < 7), 'Параллелограм вышел за пределы клеток');

        points = points.map((c) => {
            return {
                x: c[0],
                y: c[1]
            };
        });

        const supplementary = {
            shiftCoordinate: false
        };

        let square = new Parallelogram({
            points,
            supplementary
        });

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;
            ctx.lineWidth = 0.5;
            let scale = 30;

            ctx.translate(w / 2, h / 2);
            ctx.regularGrid(scale, scale);
            ctx.scale(scale, -scale);
            ctx.strokeStyle = om.secondaryBrandColors;
            ctx.rotate(sl1() * Math.PI / 2);
            ctx.lineWidth = 4 / scale;
            ctx.drawFigure(square.vertices, square.connectionMatrix);
        };

        NAtask.setTask({
            text: `План местности разбит на клетки. Каждая клетка обозначает квадрат $1 \\text{ м} \\times 1 \\text{ м}$. Найдите площадь участка, выделенного на плане. Ответ дайте в квадратных метрах.`,
            answers: square.area(),
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
//https://mathb-ege.sdamgia.ru/problem?id=523095
