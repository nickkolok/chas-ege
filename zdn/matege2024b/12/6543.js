(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = "6543";
        let preference = ['CMA', 'DMB'];
        let rand = getListedPreference(key, preference.map((pref, index) => ({
            preference: pref,
            preferenceValue: index
        })), sl(preference.length - 1));

        let letters = latbukv.slice(0, 4).concat('M');
        let radius = 160;

        let angleCMB = slKrome(90, 30, 160);
        let angleDMC = 0.5 * angleCMB;
        let angleCMA = 180 - angleCMB;

        let connectionMatrix = [[0], [0], [0], [1, 1, 1, 1]];

        let points = [
            { x: -radius, y: 0 },
            { x: radius, y: 0 },
            calculateEndpointLineAtAngle(0, 0, angleCMB * Math.PI / 180, radius),
            calculateEndpointLineAtAngle(0, 0, 0.5 * angleCMB * Math.PI / 180, radius),
            { x: 0, y: 0 },   //M
        ];

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, connectionMatrix);

            ctx.strokeStyle = om.primaryBrandColors.iz();
            ctx.arcBetweenSegments([points[1].x, points[1].y, points[4].x, points[4].y, points[3].x, points[3].y], 20);
            ctx.arcBetweenSegments([points[2].x, points[2].y, points[4].x, points[4].y, points[3].x, points[3].y], 30);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i == 3 || i == 2) ? -15 : 25)));
        };

        NAtask.setTask({
            text: `На прямой $AB$ взята точка $M$. Луч $MD$ – биссектриса угла $CMB$. Известно, что $\\angle ${[[`DMC`, angleDMC], [`CMA`, angleCMA]][rand].join(`=`)}^\\circ$. Найдите величину угла $${['CMA', 'DMB'][rand]}$. Ответ дайте в градусах.`,
            answers: [angleCMA, angleDMC][rand],
            authors: ['Александра Суматохина'],
            preference: preference,
        });
        NAtask.modifiers.variativeABC(letters);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 2000);
    NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://base.mathege.ru/clones/?position=16&parent=6543
