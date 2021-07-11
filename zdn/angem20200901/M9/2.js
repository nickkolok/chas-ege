(function () {
    'use strict';
    NAinfo.requireApiVersion(0, 0);

    var a;
    var b;
    var c;
    var d;
    do {
        c = sluchch(1, 80);
        a = sluchch(2, 100);
        d = (a ** 2) - (c ** 2);
        b = ((a ** 2) - (c ** 2)) ** (1 / 2);
    } while ((d <= 0) || (b % 1));

    NAtask.setTask({
        text: 'Определить фокусы эллипса $$\\frac{x^2}{' + a + '^2}+\\frac{y^2}{' + b + '^2}=1$$',

        answers: '$F_1(-' + c + ', 0), F_2(' + c + ', 0)$',
    });
})();
//465
