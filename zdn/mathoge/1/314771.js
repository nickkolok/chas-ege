retryWhileError(function() {
    NAinfo.requireApiVersion(0, 2);

    function f(x) {
        switch (v) {
        case 0:
            return a * x * x + b * x + c;
        case 1:
            return a / (x) + b;
        case 2:
            return a * (x.sqrt()) + b;
        case 3:
            return a * x + b;
        }

    }

    let ai = [];
    let bi = [];
    let ci = [];
    let vi = [];
    let func = [];
    let funcShuffle = [];
    for (let i = 0; i < 4; i++) {
        vi.push([0, 0, 1, 2, 2, 3].iz());
        ai.push(slKrome(ai, 1, 5, 0.5));
        bi.push(sl(1, 10).pm());
        ci.push(sl(1, 10).pm());

        switch (vi[i]) {
        case 0:
            func.push((ai[i] + 'x^2+' + bi[i] + 'x+' + ci[i]).plusminus());
            break;
        case 1:
            func.push(('\\frac{' + ai[i] + '}{x}+' + bi[i]).plusminus());
            break;
        case 2:
            func.push((ai[i] + '\\sqrt{x}+' + bi[i]).plusminus());
            break;
        case 3:
            func.push((ai[i] + 'x+' + bi[i]).plusminus());
            break;
        }
        funcShuffle[i] =
            func[i].replace('+0x', '').replace('+0', '');
        funcShuffle[i] = func[i];
    }

    funcShuffle.shuffle();

    let points = [];
    let x0 = [];
    let y0 = [];
    let a, b, c, v;
    let answers = [];
    for (let i = 0; i < 4; i++) {
        answers.push(1 + funcShuffle.indexOf(func[i]));
        a = ai[i];
        b = bi[i];
        c = ci[i];
        v = vi[i];

        points[i] = intPoints(f, {
            minX: -5,
            maxX: 6,
            minY: -5.5,
            maxY: 5.5
        });

        genAssert(points[i].length > 2, 'мало точек');

    }
    for (let i = 0; i < 4; i++)
        funcShuffle[i] = (i + 1) + ') $' + funcShuffle[i] + '$';
    answers.pop();
    console.log(func);
    console.log(funcShuffle);
    let paint1 = function(ct) {
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
            v = vi[i];
            graph9AdrawFunction(ct, f, {
                minX: -6.5,
                maxX: 6.5,
                minY: -7,
                maxY: 5.7,
                step: 0.01,
            });
            graph9AmarkCircles(ct, points[i], 3, 0.15);
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
//314771 314772 321919 321920 322008 60 86 112 138 190 311316 311328 311339 311351 311361 311371 311382 311908 311952 314682 314688 340583 340835 340861 340887 340916 341142 341377 349172 349265 349308 349719 350049 350104 350127 350202 350260 350286 350419 350720 351013 351048 351138 351276 351685 352058 352405 352819 355408 369498 369530 369676 369706 369732 369800 369829 369858 383601 384404 392897 406283 406334 406667 424907 424971 424996 425022 314683 314691 314694 314696 314698 314756 314760 314763 314765 314766 314769 314773 314775 314778 314779 314780 314782 314787 321814 321815 321816 321817 321818 321819 321820 321821 321822 321823 321824 321825 321826 321827 321828 321829 321910 321911 321912 321913 321914 321915 321916 321917 321918 321921 321922 321923 321924 321925 321926 321927 321928 321929 321930 321931 321932 321933 321934 321935 321936 321937 321938 321939 321940 321941 321942 321943 321944 321945 321946 321947 321948 321949 321983 321984 321985 321986 321987 321988 321990 322001 322005 322006 322007 322009 322010 341728 352554 353206 353271 355382 355434 357442 357443 357444 357445 357446 357447 357448 357449 357450 401083 401099 401152 401524 401594 401690 401887 402065 402163 402239 402282 402297 402406 402605 402616 402673 402797 402821 402865 402881 402919 402956 403036 403142 403163 403232 403350 403621 403754 403876 403958 404109 404138 404156 404217 404268 
