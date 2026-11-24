(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '513082';

        let variants = [{
            shortArm: 3,
            longArm: 6,
            rise: 1.5,
            fall: 3
        }, {
            shortArm: 4,
            longArm: 6,
            rise: 1,
            fall: 1.5
        }, {
            shortArm: 1,
            longArm: 3,
            rise: 0.5,
            fall: 1.5
        }, {
            shortArm: 2,
            longArm: 7,
            rise: 1,
            fall: 3.5
        },

        {
            shortArm: 2,
            longArm: 4,
            rise: 1,
            fall: 2
        }, {
            shortArm: 3,
            longArm: 9,
            rise: 1,
            fall: 3
        }, {
            shortArm: 4,
            longArm: 8,
            rise: 1.5,
            fall: 3
        }, {
            shortArm: 5,
            longArm: 10,
            rise: 1,
            fall: 2
        }, {
            shortArm: 4,
            longArm: 10,
            rise: 1,
            fall: 2.5
        }, {
            shortArm: 5,
            longArm: 8,
            rise: 2.5,
            fall: 4
        },
        ];

        let t = variants.iz();

        // =====================================================
        // ГЕОМЕТРИЯ РИСУНКА — ПРИБЛИЗИТЕЛЬНАЯ, НО СТАБИЛЬНАЯ
        // =====================================================

        let groundY = 285;

        let pivotX = 145;
        let pivotY = 185;

        let wellLeft = 290;
        let wellRight = 350;
        let wellBottom = 325;

        let angle = 15 * Math.PI / 180;

        // Длинное плечо делаем почти фиксированным по пикселям,
        // чтобы конец всегда был над колодцем.
        let longPx = 175;
        let k = longPx / t.longArm;
        let shortPx = t.shortArm * k;

        let leftX = pivotX - shortPx * Math.cos(angle);
        let leftY = pivotY + shortPx * Math.sin(angle);

        let rightX = pivotX + longPx * Math.cos(angle);
        let rightY = pivotY - longPx * Math.sin(angle);

        let ropeX = rightX;
        let bucketTopY = groundY - 38;

        let shortMidX = (leftX + pivotX) / 2;
        let shortMidY = (leftY + pivotY) / 2;

        let longMidX = (pivotX + rightX) / 2;
        let longMidY = (pivotY + rightY) / 2;

        let paint1 = function (ct) {
            let primaryColor = om.primaryBrandColors[0];
            let secondaryColor = om.secondaryBrandColors[0];

            ct.strokeStyle = primaryColor;
            ct.fillStyle = primaryColor;
            ct.lineWidth = 2;

            // Журавль
            ct.drawLine(leftX, leftY, rightX, rightY);

            // Опора
            ct.drawLine(pivotX, pivotY, pivotX, groundY);
            ct.drawLine(pivotX - 18, groundY, pivotX + 18, groundY);

            // Земля
            ct.drawLine(40, groundY, wellLeft, groundY);
            ct.drawLine(wellRight, groundY, 365, groundY);

            // Колодец
            ct.drawLine(wellLeft, groundY, wellLeft, wellBottom);
            ct.drawLine(wellLeft, wellBottom, wellRight, wellBottom);
            ct.drawLine(wellRight, wellBottom, wellRight, groundY);

            // Верёвка
            ct.drawLine(ropeX, rightY, ropeX, bucketTopY);

            // Ведро
            ct.drawLine(ropeX - 11, bucketTopY, ropeX + 11, bucketTopY);
            ct.drawLine(ropeX + 11, bucketTopY, ropeX + 8, bucketTopY + 22);
            ct.drawLine(ropeX + 8, bucketTopY + 22, ropeX - 8, bucketTopY + 22);
            ct.drawLine(ropeX - 8, bucketTopY + 22, ropeX - 11, bucketTopY);

            // Точка опоры
            ct.fillKrug(pivotX, pivotY, 4);

            // Подписи
            ct.fillStyle = secondaryColor;
            ct.font = '16px liberation_sans';
            ct.textAlign = 'center';
            ct.textBaseline = 'bottom';

            ct.save();
            ct.translate(shortMidX, shortMidY);
            ct.rotate(-angle);
            ct.fillText(t.shortArm + ' м', 0, -8);
            ct.restore();

            ct.save();
            ct.translate(longMidX, longMidY);
            ct.rotate(-angle);
            ct.fillText(t.longArm + ' м', 0, -8);
            ct.restore();
        };

        NAtask.setTask({
            text: `На рисунке изображён колодец с «журавлём». Короткое плечо имеет длину ${t.shortArm} м, а длинное плечо – ${t.longArm} м. На сколько метров опустится конец длинного плеча, когда конец короткого поднимется на ${t.rise.ts()} м?`,
            analys: `Вертикальные перемещения концов «журавля» пропорциональны длинам его плеч. Поэтому $\\frac{x}{${t.rise.ts()}}=\\frac{${t.longArm}}{${t.shortArm}}$. Отсюда $x=\\frac{${t.rise.ts()}\\cdot${t.longArm}}{${t.shortArm}}=${t.fall.ts()}$ м.`,
            answers: t.fall,
        });

        NAtask.modifiers.allDecimalsToStandard();

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });

    }, 20000);
})();

// https://mathb-ege.sdamgia.ru/test?likes=513082
