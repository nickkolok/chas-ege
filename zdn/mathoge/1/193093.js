retryWhileError(function () {
    NAinfo.requireApiVersion(0, 2);

    function f(x) {
        return x * x / a + b * x + c;
    }

    let ai = [];
    let bi = [];
    let ci = [];
    for (let i = 0; i < 4; i++) {
        ai.push(slKrome(ai, 1, 5).pm());
        bi.push(sl(0, 5).pm());
        ci.push(sl(0, 5).pm());
    }

    let points = [];
    let x0 = [];
    let y0 = [];
    let a, b, c;
    let answers = [];
    for (let i = 0; i < 4; i++) {
        a = ai[i];
        b = bi[i];
        c = ci[i];
        points[i] = intPoints(f, {
            minX: -5,
            maxX: 6,
            minY: -5.5,
            maxY: 5.5
        });
        genAssert(points[i].length > 3, 'мало точек');
        x0.push(-b * a / 2);
        genAssert(x0[i].isZ());
        genAssert(x0[i].abs() < 6);

        y0.push(f(x0[i]));
        genAssert(y0[i].abs() < 6);
        genAssert(y0[i].isZ());

        answers.push((a + 'x^2+' + b + 'x+' + c).plusminus());
    }
    let answ = sl(0, 3);



    let paint1 = function (ct) {
        let h = 300;
        let w = 300;
        //Оси координат
        for (let i = 0; i < 4; i++) {
            if (i)
                ct.translate(200, -h / 2 + 10);
            ct.drawCoordinatePlane(w, h, {
                hor: 1,
                ver: 1
            }, {
                x1: '1',
                y1: '1',
                sh1: 13,
            }, 20);

            ct.lineWidth = 0.1;
            ct.scale(20, -20);
            //График

            a = ai[i];
            b = bi[i];
            c = ci[i];
            graph9AdrawFunction(ct, f, {
                minX: -6.5,
                maxX: 6.5,
                minY: -7,
                maxY: 5.7,
                step: 0.05,
            });
            graph9AmarkCircles(ct, [[0, f(0)], [x0[i], y0[i]]], 3, 0.15);
            ct.scale(1 / 20, -1 / 20);
            ct.font = "19px liberation_sans"; a
            ct.fillText(i + 1 + ')', 130, 130);
        }


    };
    NAtask.setTask({
        text: 'На одном из рисунков изображен график функции $f(x)=' + answers[answ].replace('+0x', '').replace('+0', '') +
            '$. Укажите номер этого рисунка.',
        answers: answ + 1,
    });
    chas2.task.modifiers.addCanvasIllustration({
        width: 3000,
        height: 320,
        paint: paint1,
    });
},
    100000);
//193093 200515 201145 193094 193095 193096 199705 199735 199765 199795 199825 199855 199885 199915 199945 199975 200005 200035 200065 200095 200125 200155 200185 200215 200245 200275 200305 200335 200365 200395 200425 200455 200485 200545 200575 200605 200635 200665 200695 200725 200755 200785 200815 200845 200875 200905 200935 200965 200995 201025 201055 201085 201115 201175 201205
