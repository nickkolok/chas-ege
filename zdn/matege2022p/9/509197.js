retryWhileUndefined(function () {
    NAinfo.requireApiVersion(0, 2);

    function kxb(k, b, x) {
        return k * x + b;
    }

    function f1(x) {
        return kxb(k1.ch / k1.zn, b1, x);
    }

    function f2(x) {
        return kxb(k2.ch / k2.zn, b2, x);
    }
    let k1 = { ch: sluchch(1, 10), zn: sluchch(1, 10), };
    let k2 = { ch: slKrome(k1.ch, 1, 10), zn: slKrome(k1.zn, 1, 10), };
    k1.ch.pm();
    k2.ch.pm();
    if (k1.ch * k2.zn == k2.ch * k1.zn)
        return;
    let b1 = sluchch(0, 10).pm();
    let b2 = sluchch(0, 10).pm();
    let px = k1.zn * k2.zn * (b2 - b1) / (k1.ch * k2.zn - k2.ch * k1.zn);
    if (!(px * 1000).isZ() || (px.abs() < 6 && px.isZ()))
        return;
    if (!(f1(px) * 1000).isZ() || (f1(px).abs() < 6 && f1(px).isZ()))
        return;
    if (sl1()) {
        find = 'ординату';
        answ = f1(px);
    } else {
        find = 'абсциссу';
        answ = px;
    }
    let p1 = intPoints(f1, {
        minX: -5,
        maxX: 5,
        minY: -6,
        maxY: 5
    });
    if (p1.length < 2)
        return;
    let p2 = intPoints(f2, {
        minX: -5,
        maxX: 5,
        minY: -6,
        maxY: 5
    });
    if (p2.length < 2)
        return;
    let paint1 = function (ct) {
        h = 300;
        //Оси координат
        graph9AdrawAxes_20_300(ct);
        ct.translate(-10, -10);
        //график
        ct.translate(h / 2, h / 2);
        ct.scale(20, -20);
        ct.lineWidth = 0.1;
        graph9AdrawFunction(ct, f1, {
            minX: -6,
            maxX: 7,
            minY: -7,
            maxY: 6,
            step: 0.05,
        });
        graph9AdrawFunction(ct, f2, {
            minX: -6,
            maxX: 7,
            minY: -7,
            maxY: 6,
            step: 0.05,
        });
        //точки
        graph9AmarkCircles(ct, p1, 2, 0.15);
        graph9AmarkCircles(ct, p2, 2, 0.15);
    };
    NAtask.setTask({
        text: 'На рисунке изображёны графики двух линейных функций. Найдите ' + find + ' точки пересечения графиков.',
        answers: answ,
        analys: '$f_1(x)=' + (k1.ch.texfrac(k1.zn) + 'x+' + b1).replace('+0', '').plusminus() + '$<br>' +
            '$f_2(x)=' + (k2.ch.texfrac(k2.zn) + 'x+' + b2).replace('+0', '').plusminus() + '$',
    });
    chas2.task.modifiers.addCanvasIllustration({
        width: 300,
        height: 300,
        paint: paint1,
    });
    return true;
}, 100000);
//509197 509213
