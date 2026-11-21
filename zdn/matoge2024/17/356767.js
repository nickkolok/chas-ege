(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();

        // Как в ФИПИ: стороны и площадь целые, обе высоты S/a и S/b тоже целые,
        // поэтому площадь кратна НОК сторон. Синус острого угла S/(ab) — от 0,2 до 0,9
        // (в ФИПИ от 0,25 до 0,8): параллелограмм не вырождается в отрезок и не похож на прямоугольник
        let a = sl(2, 30);
        let b = slKrome(a, 2, 30);
        let lcm = a * b / a.nod(b);
        let minMultiplier = Math.ceil(0.2 * a * b / lcm);
        let maxMultiplier = Math.floor(0.9 * a * b / lcm);
        genAssert(minMultiplier <= maxMultiplier, 'Нет площади с целыми высотами');
        let area = lcm * sl(minMultiplier, maxMultiplier);

        let par = new Parallelogram({
            lengths: {
                lengthAB: a,
                lengthBC: b,
            },
            angles: {
                angle: {
                    angleA: Math.asin(area / (a * b)),
                },
            },
            supplementary: {
                calculateHeights: true,
            }
        });

        let heights = [par.lengthHeightDAB, par.lengthHeightDBC];
        let height = rand ? heights.minE() : heights.maxE();

        // Высоты из вершины D тупого угла, как на чертеже ФИПИ
        par.addVertexToConnectionMatrix([par.heightDAB.pe, par.heightDBC.pe], 'E');
        par.connectVerticesInConnectionMatrix([
            [3, 4],
            [3, 5]
        ]);

        let points = autoScale(par.vertices);

        let paint1 = function (ctx) {
            let strokeColor = om.secondaryBrandColors.iz();

            ctx.translateToCenter();

            ctx.scale(1, -1);
            ctx.strokeStyle = strokeColor;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, par.connectionMatrix);

            // Основание высоты может попасть на продолжение стороны — тогда продолжение пунктиром.
            // В отметке прямого угла второй точкой на прямой берётся дальний от основания конец стороны
            let distance = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);
            [[4, 0, 1], [5, 1, 2]].forEach(([foot, end1, end2]) => {
                let sideLength = distance(points[end1], points[end2]);
                let near = distance(points[foot], points[end1]) < distance(points[foot], points[end2]) ? end1 : end2;
                let far = near == end1 ? end2 : end1;
                if (distance(points[foot], points[far]) > sideLength + 0.5) {
                    ctx.setLineDash([6, 4]);
                    ctx.drawLine(points[near].x, points[near].y, points[foot].x, points[foot].y);
                    ctx.setLineDash([]);
                }
                ctx.strokeStyle = om.primaryBrandColors[1];
                ctx.arcBetweenSegments([points[3].x, points[3].y, points[foot].x, points[foot].y, points[far].x, points[far].y], 15, true);
                ctx.strokeStyle = strokeColor;
            });
        };

        let sides = [a, b].shuffle();

        NAtask.setTask({
            text: `Площадь параллелограмма равна $${area}$, а две его стороны равны $${sides[0]}$ и $${sides[1]}$. Найдите его высоты. В ответе укажите ${[`большую`, `меньшую`][rand]} высоту.`,
            answers: height,
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
        NAtask.modifiers.allDecimalsToStandard(true);
    }, 2000);
})();
// https://oge.sdamgia.ru/problem?id=356767
