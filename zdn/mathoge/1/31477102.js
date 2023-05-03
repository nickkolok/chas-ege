retryWhileError(function () {
    NAinfo.requireApiVersion(0, 2);

    function f(x) {
        return a / (x + c) + b;
    }

    let ai = [];
    let bi = [];
    let ci = [];
    let func = [];
    let funcShuffle = [];
    for (let i = 0; i < 4; i++) {
        ai.push(slKrome(ai, 1, 5, 0.5).pm());
        bi.push(sl(1, 5).pm());
        ci.push(sl(1, 6).pm());

        func.push(('\\frac{' + ai[i] + '}{x+' + ci[i] + '}+' + bi[i]).plusminus());
        funcShuffle[i] =
            func[i].replace('+0x', '').replace('+0', '');
        funcShuffle[i] = func[i];
    }

    funcShuffle.shuffle();

    let points = [];
    let a, b, c;
    let answers = [];
    for (let i = 0; i < 4; i++) {
        answers.push(1 + funcShuffle.indexOf(func[i]));
        a = ai[i];
        b = bi[i];
        c = ci[i];

        points[i] = intPoints(f, {
            minX: -5,
            maxX: 6,
            minY: -5.5,
            maxY: 5.5
        });

        genAssert(points[i].length > 1, 'мало точек');

    }
    for (let i = 0; i < 4; i++)
        funcShuffle[i] = (i + 1) + ') $' + funcShuffle[i] + '$';
    answers.pop();

    let paint1 = function (ct) {
        let h = 300;
        let w = 300;
        //Оси координат
        for (let i = 0; i < 3; i++) {
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

            ct.lineWidth = 0.06;
            if (b) {
                ct.setLineDash([0.5, 0.4]);
                ct.drawLine(-6.5, b, 6.5, b);
                ct.setLineDash([]);
            }

            if (c) {
                ct.setLineDash([0.5, 0.4]);
                ct.drawLine(-c, -7, -c, 6.5);
                ct.setLineDash([]);
            }

            ct.lineWidth = 0.1;

            graph9AdrawFunction(ct, f, {
                minX: -6.5,
                maxX: 6.5,
                minY: -7,
                maxY: 5.7,
                step: 0.01,
            });
            if (f(0).abs() < 6.5)
                graph9AmarkCircles(ct, [
                    [0, f(0)]
                ], 3, 0.15);
            ct.scale(1 / 20, -1 / 20);
            ct.font = "19px liberation_sans";
            ct.fillText(['A', 'B', 'C'][i] + ')', 130, 130);
        }


    };
    NAtask.setTask({
        text: 'Установите соответствие между графиками функций и формулами, которые их задают. ' +
            'Формулы: <br>' + funcShuffle.join('<br>') + '',
        answers: answers.join(''),
    });
    chas2.task.modifiers.addCanvasIllustration({
        width: 3000,
        height: 320,
        paint: paint1,
    });
},
    100000);
//314771 но только про гиперболы
