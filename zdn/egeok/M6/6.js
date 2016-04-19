    (function() {
            'use strict';
            NAinfo.requireApiVersion(0, 2);
            var a = sluchch(0, 2);
            var n = sluchch(4, 12);
            var k = sluchch(2, 4);
            var shag;
            var number;

            function fiba(n) {
                    if (n == 0 || n == 1)
                            return 1;
                    return fiba(n - 1) + fiba(n - 2);
            }
            switch (a) {
            case 0:
                    number = 'Прыгая вправо на произвольное число клеток, cколькими способами он может это сделать?';
                    shag = (2).pow(n - 2);
                    break;
            case 1:
                    number = 'Cколькими способами кузнечик может добраться в ' + n + '-ю клетку, сделав ' + chislitlx(k, 'шаг') + '?';
                    shag = ((n - 2).fct()) / ((k - 1).fct() * ((n - 2 - k - 1).fct()));

                    break;
            case 2:
                    number = 'Cколькими способами кузнечик может добраться в ' + n +
                            '-ю клетку, двигаясь на одну или на две клетки вправо?';
                    shag = fiba(n);
                    break;
            }
            NAtask.setTask({

                    text: 'Есть ' + chislitlx(n, 'клеточка') + ', расположенных последовательно. ' +
                            'Кузнечик должен попасть из крайней левой клеточки в крайнюю правую. ' + number,

                    answers: shag,

            });
    })();
//konan01
//http://ege-ok.ru/2015/08/20/zadachi-po-kombinatorike

