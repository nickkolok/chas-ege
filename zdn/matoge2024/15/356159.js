(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let letters = om.latbukv.slice(0, 3);

        let key = "356159";
        let preference = ['B', 'A', 'C']; // при какой вершине данный угол
        let variant = getSelectedPreferenceFromList(key, preference);

        // Две стороны и синус угла между ними (несократимая дробь, как в ФИПИ) задаются напрямую,
        // а чертёж строится по ним — так угол на чертеже действительно имеет данный синус
        let sideFirst = sl(3, 25);
        let sideSecond = sl(3, 25);
        let sinDenominator = sl(2, 15);
        let sinNumerator = sl(1, sinDenominator - 1);
        genAssertIrreducible(sinNumerator, sinDenominator, 'Синус — сократимая дробь');
        genAssert(sinNumerator / sinDenominator >= 1 / 4, 'Слишком маленький синус — плохо читаемый чертёж');
        let area = sideFirst * sideSecond * sinNumerator / sinDenominator / 2;
        genAssertZ1000(area, 'Площадь — бесконечная дробь или слишком много знаков после запятой');

        let angleDano = letters.slice(0, 3).permuteCyclic(variant).randomReverse();
        let sides = [angleDano.slice(0, 2), angleDano.slice(1, 3)].map(elem => elem.join(''));

        // Вершина данного угла — в начале координат, первая сторона — вдоль оси x,
        // вторая — под углом с данным синусом (острым или тупым)
        let angle = Math.asin(sinNumerator / sinDenominator);
        if (sl1()) {
            angle = Math.PI - angle;
        }
        let vertexByLetter = {};
        vertexByLetter[angleDano[1]] = { x: 0, y: 0 };
        vertexByLetter[angleDano[0]] = { x: sideFirst, y: 0 };
        vertexByLetter[angleDano[2]] = { x: sideSecond * Math.cos(angle), y: sideSecond * Math.sin(angle) };
        let vertices = letters.map((letter) => vertexByLetter[letter]);

        // Центрируем по габаритам: autoScale масштабирует относительно начала координат
        let xs = vertices.map((p) => p.x);
        let ys = vertices.map((p) => p.y);
        let shiftX = (Math.min(...xs) + Math.max(...xs)) / 2;
        let shiftY = (Math.min(...ys) + Math.max(...ys)) / 2;
        // Поле чуть меньше стандартного — чтобы подписи снаружи вершин не обрезались краем холста
        let points = autoScale(vertices.map((p) => ({ x: p.x - shiftX, y: p.y - shiftY })), undefined, [], {
            startX: -165, finishX: 165, startY: -150, finishY: 150,
        });
        let connectionMatrix = [
            [1],
            [1, 1],
        ];
        // Подписи — снаружи треугольника: от центра тяжести через вершину
        let centroid = { x: points.map((p) => p.x).sum() / 3, y: points.map((p) => p.y).sum() / 3 };

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(points, connectionMatrix);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            points.forEach((elem, i) => {
                let dx = elem.x - centroid.x;
                let dy = elem.y - centroid.y;
                let len = Math.hypot(dx, dy);
                ctx.fillText(letters[i], elem.x + dx / len * 16, -(elem.y + dy / len * 16));
            });
        };

        NAtask.setTask({
            text: `В треугольнике $ABC$ известно, что $${[`${sides[0]}=${sideFirst}`, `${sides[1]}=${sideSecond}`].concat(`\\sin \\angle ${angleDano.join('')} = ${sinNumerator.texfrac(sinDenominator)}`).shuffleJoin('$, $')}$. Найдите площадь треугольника $ABC$.`,
            answers: area,
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
// 356159 356164 356165 356166 356167 356160 356161 356162 356163 356168 401337 401340 401410 401578 402028 402571 402702 402703 404317
