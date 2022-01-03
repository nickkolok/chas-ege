CanvasRenderingContext2D.prototype.drawСoordPlane = function (w, h, kl, text, mash) {
    kl.hor *= mash;
    kl.ver *= mash;
    let width = (w / 2) % (kl.hor);
    let height = (h / 2) % (kl.ver);
    this.lineWidth = 0.5;
    this.setkaVer2(w, h, kl.hor, kl.ver, 1);
    this.translate(w / 2 - width, h / 2 - height);
    //стрелки
    this.lineWidth = 1.5;
    this.drawArrow(0, h / 2 + height - 10, 0, -h / 2 + height + 10);
    this.drawArrow(-w / 2 + width + 10, 0, w / 2 + width - 10, 0);
    this.font = "12px liberation_sans";
    this.fillText('x', w / 2 + width - 20, 15);
    this.fillText('y', -15, -h / 2 + height + 20);
    //единичные отрезки
    this.font = "12px liberation_sans";
    this.fillText('0', -10, 12);
    this.drawLine(kl.hor, 5, kl.hor, -5);
    this.drawLine(-5, -kl.ver, 5, -kl.ver);
    this.font = '' + (text.sh1 || 12) + 'px liberation_sans';
    this.fillText(text.x1, kl.hor, 15);
    this.font = '' + (text.sh2 || 12) + 'px liberation_sans';
    this.fillText(text.y1, -15, -kl.ver);
};
CanvasRenderingContext2D.prototype.setkaVer2 = function (h, w, hor, ver, mash) {
    hor *= mash;
    ver *= mash;
    for (let i = 0; i < w; i += hor)
        this.drawLine(i, 0, i, w);
    for (let i = 0; i < h; i += ver)
        this.drawLine(0, i, h, i);
};
retryWhileUndefined(function () {
    NAinfo.requireApiVersion(0, 2);

    function kxb(k, b, x) {
        return k * x + b;
    }

    function f1(x) {
        return kxb(k1, b1, x);
    }

    function f2(x) {
        return kxb(k2, b2, x);
    }
    let k1 = sluchch(0.1, 20, 0.2);
    let k2 = slKrome(k1, k1 + 0.2, 10, 0.2);
    let b1 = sluchch(0, 10).pm();
    let b2 = sluchch(0, 10).pm();
    let px = (b2 - b1) / (k1 - k2);
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
        ct.drawСoordPlane(300, 300, {
            hor: 1,
            ver: 1
        }, {
            x1: '1',
            y1: '1'
        }, 20);
        //график
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
        //	analys: '$f(x)=' + (a + '\ ' + trigfuncs + 'x+' + b).replace('+0', '').plusminus() + '$',
    });
    chas2.task.modifiers.addCanvasIllustration({
        width: 300,
        height: 300,
        paint: paint1,
    });
    return true;
}, 100000);
//509197 509213
