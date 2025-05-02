(function () {
    'use strict';
    NAinfo.requireApiVersion(0, 0);

    var d;
    var e;
    var znam1;
    var znam12;
    var znam2;

    do {
        d = sluchch(1, 60);
        e = sluchch(0, 99) / 100;

        znam1 = d * d / 4;
        znam2 = 1 - e * e;
        znam12 = znam1 * znam2;

    } while (znam12 % 1); //пока не будет целым

    var error = '$$\\frac{x^2}{' + znam1 + '}+\\frac{y^2}{0}=1$$'; //один раз вылезла такая ошибка, несмотря на ограничения

    NAtask.setTask({
        text: 'Составить каноническое уравнение эллипса, если известны его большая ось ' + d + ' и эксцентриситет ' + e + '.',

        answers: '$$\\frac{x^2}{' + znam1 + '}+\\frac{y^2}{' + znam12 + '}=1$$',
    });
})();
//464
