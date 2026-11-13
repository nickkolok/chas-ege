(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = "349100";
        let preference = ['A', 'B', 'C']; // из какой вершины проведена медиана
        let variant = getSelectedPreferenceFromList(key, preference);

        let letters = om.latbukv.slice(0, 4);
        let sideDano = letters.slice(0, 3);
        let centralPoint = sideDano.splice(variant, 1)[0];
        let pointMedian = letters[3];

        // Сторона, к которой проведена медиана, и сама медиана задаются напрямую:
        // медиана в этой задаче — лишнее данное, годится любая длина.
        // Ограничение на отношение длин — только ради читаемого чертежа.
        let valueDano = sl(4, 60);
        let medianLength = sl(3, 60);
        genAssert(medianLength.mzhd(valueDano / 4, valueDano * 3 / 2), 'Медиана несоразмерна стороне — плохой чертёж');

        // Середина стороны M — в начале координат, сторона горизонтальна,
        // вершина, из которой проведена медиана, — на расстоянии medianLength от M
        let phi = sl(40, 140) * Math.PI / 180;
        let medianVertex = { x: medianLength * Math.cos(phi), y: medianLength * Math.sin(phi) };
        let sideEnds = [{ x: -valueDano / 2, y: 0 }, { x: valueDano / 2, y: 0 }];
        let vertices = sideEnds.slice();
        vertices.splice(variant, 0, medianVertex); // вершины A, B, C по порядку
        vertices.push({ x: 0, y: 0 }); // середина стороны

        let connectionMatrix = [
            [1],
            [1, 1],
            [0, 1, 2].map((i) => Number(i === variant)),
        ];

        // По вертикали центрируем: autoScale масштабирует относительно начала координат
        let points = autoScale(vertices.map((p) => ({ x: p.x, y: p.y - medianVertex.y / 2 })));

        let pointsSide = points.slice(0, 3);
        pointsSide.splice(variant, 1);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(points, connectionMatrix);

            ctx.strokeStyle = om.primaryBrandColors[1];
            ctx.strokeInMiddleOfSegment(pointsSide[0].x, pointsSide[0].y, points[3].x, points[3].y, 10);
            ctx.strokeInMiddleOfSegment(pointsSide[1].x, pointsSide[1].y, points[3].x, points[3].y, 10);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            // Вершина, из которой проведена медиана, — сверху, подпись над ней; остальные точки — на нижней стороне
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x - 6, -elem.y + ((i === variant) ? -8 : 25)));
        };

        NAtask.setTask({
            text: `В треугольнике $ABC$ известно, что ${[
                `$${sideDano.shuffleJoin()}=${valueDano}$`,
                `$${[centralPoint, pointMedian].shuffleJoin()}$ — медиана`,
                `$${[centralPoint, pointMedian].shuffleJoin()}=${medianLength.ts()}$`
            ].shuffleJoin(', ')}. Найдите $${[sideDano.iz(), pointMedian].shuffleJoin()}$.`,
            answers: valueDano / 2,
            preference: preference,
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.variativeABC(letters);

        NAtask.modifiers.allDecimalsToStandard(/*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 1000);

})();
//349100 349189 349535 349595 349711 350268 350500 350845 350876 351315 351812 352760 370473 392117 401533 401773 401811 401891 402288 402457 402688 402710 402978 403263 403849
