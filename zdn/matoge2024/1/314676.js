retryWhileError(function() {
    NAinfo.requireApiVersion(0, 2);

    function interval(f, x0) {
        if (f ^ a < 0)
            return '[' + x0 + '; \\infty)';
        else
            return '(-\\infty;' + x0 + ']';
    }

    function pol() {
        if (a < 0)
            return 1;
        else
            return 0;
    }


    function f(x) {
        return x * x / a + b * x + c;
    }

    let a = sluchch(2, 10, 0.5).pm();
    let b = sl(-10, 10, 0.5);
    let c = sl(-10, 10, 0.5);
    let points = intPoints(f, {
        minX: -5,
        maxX: 6,
        minY: -5.5,
        maxY: 5.5
    });

    genAssert(points.length > 3);

    let x0 = -b * a / 2;

    genAssert(x0.isZ());
    genAssert(x0.abs() < 6);

    let y0 = f(x0);

    genAssert(y0.abs() < 6);
    genAssert(y0.isZ());

    let point = points[0];

    let question = [
        ['Абсцисса вершины равна', x0],
        ['Ордината вершины равна', f(x0)],
        [
            ['Функция убывает на промежутке', interval(false, x0)],
            ['Функция возрастает на промежутке', interval(true, x0)]
        ].iz(), [
            ['Наименьшее значение функции равно ', f(x0)],
            ['Наибольшее значение функции равно ', f(x0)]
        ][pol()],
        ['$f(' + point[0] + ')=$', point[1]],
    ];

    let answers = question.T()[1];
    question = question.T()[0];
    
    console.log(answers);
    console.log(question);


    let rightOrWrong = sl1();//1 много неправильных, один правильный, 0 наоборот
    let answ = question[0];
    
    if (rightOrWrong) {
        answ += ' $' + answers[0] + '$';
    } else {
        if (answers[0].isNumber)
            answ += ' $' + slKrome(answers[0], 1, 10, 0.5) + '$';
        if (question[0].includes('убывает'))
            answ += ' $' + interval(true, x0) + '$';
        if (question[0].includes('возрастает'))
            answ += ' $' + interval(false, x0) + '$';
    }
    answers.shift();
    question.shift();

    let wrongAnsw = [];

    for (let i = 0; i < answers.length; i++) {
        wrongAnsw[i] = question[i];
        if (!rightOrWrong) {
            wrongAnsw[i] += ' $' + answers[i] + '$';
        } else {
            if (answers[i].isNumber)
                wrongAnsw[i] += ' $' + slKrome(answers[i], 1, 10, 0.5) + '$';
            if (question[i].includes('убывает'))
                wrongAnsw[i] += ' $' + interval(true, x0) + '$';
            if (question[i].includes('возрастает'))
                wrongAnsw[i] += ' $' + interval(false, x0) + '$';
        }
    }

    let paint1 = function(ct) {
        let h = 300;
        let w = 300;
        //Оси координат
        graph9AdrawAxes_20_300(ct);
        ct.translate(-10, -10);
        ct.lineWidth = 0.1;
        ct.translate(h / 2, h / 2);
        ct.scale(20, -20);
        //График
        graph9AdrawFunction(ct, f, {
            minX: -6.5,
            maxX: 6.5,
            minY: -7,
            maxY: 5.7,
            step: 0.05,
        });

    };
    NAtask.setTask({
        text: 'На рисунке изображён график квадратичной функции $y=f(x)$. ' +
            'Какое из следующих утверждений о данной функции ' + 'не'.esli(!rightOrWrong) + 'верно?',
        answers: answ,
        wrongAnswers: wrongAnsw,
    });
    chas2.task.modifiers.addCanvasIllustration({
        width: 300,
        height: 300,
        paint: paint1,
    });
},
100000);
AtoB(4);
//314676 314703 314704 314670 314681 314684 314706 314707 314709 314711 314712 314718 314746 314747 314748 314750 314751 314753
