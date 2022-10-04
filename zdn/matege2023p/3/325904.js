//РАБОТАЕТ
//61. Задание 4 № 325904
//За круглый стол на 9 стульев в случайном порядке рассаживаются 7 мальчиков и 2 девочки.
//Найдите вероятность того, что обе девочки будут сидеть рядом.

(function () {
    'use strict';
    NAinfo.requireApiVersion(0, 0);

    var people1 = ['мальчиков', 'девочек'].iz();
    var kolvomest;// = sluchch(5,201);
    var kolvopeople1;// = kolvomest - 2;
    var people2;
    var mest = 'обе';
    var stul;

    if (people1 == 'мальчиков') {
        people2 = 'девочки';
    } else {
        people2 = 'мальчика';
        mest = 'оба';
    }
    var nayti = ['будут', 'не будут'].iz();
    var answers;
    var answers1;
    var answ1;
    var answ2;
    do {
        kolvomest = sluchch(5, 201);
        kolvopeople1 = kolvomest - 2;
        answers1 = 2 / (kolvomest - 1);
        answ1 = answers1 * 10000; // можно умножать и на 1000, тогда ответ будет максимум до сотых
        answ2 = answ1 % 10;
    } while ((answ2 !== 0) || (answers1 <= 0) || (answers1 >= 1));

    stul =  chislitlx(kolvomest,'стул','r');// не склоняет нормально "стул", скинул на почту файл с исправлениями

    if (nayti == 'будут')
        answers = answers1;
    else
        answers = 1 - answers1;

    NAtask.setTask({

        text: 'За круглый стол на '+chislitM(kolvomest,'стул','стулья','стульев')+' в случайном порядке рассаживаются ' + kolvopeople1 + ' ' + people1 + ' и 2 ' + people2 + '. ' +
            'Найдите вероятность того, что ' + mest + ' ' + people2 + ' ' + nayti + ' сидеть рядом.',

        answers,
    });
})();