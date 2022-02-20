//РАБОТАЕТ
//58. Задание 4 № 320210
//Вероятность того, что батарейка бракованная, равна 0,06. Покупатель в
//магазине выбирает случайную упаковку, в которой две таких батарейки.
//Найдите вероятность того, что обе батарейки окажутся исправными.

(function () {
    'use strict';
    NAinfo.requireApiVersion(0, 0);
    var predmet = sklonlxkand(['батарейка', 'сережка', 'насадка', 'шайба', 'лампочка'].iz());
    var mesto;
    if ((predmet.ie == 'батарейка') || (predmet == 'лампочка'))
        mesto = ['магазине', 'супермаркете', 'торговом центре', 'киоске'].iz();
    else
        mesto = ['магазине', 'торговом центре'].iz();
    var k = [2,3].iz();
    var kolvo = [,,'две', 'три'][k];
    var nayti = ['исправными', 'неисправными'].iz();
    var verbrak = (sluchch(1, 30)) / 100;
    var verispr;
    var mest;
    var answers;

    if (kolvo == 'две')
        mest = 'обе';
    else
        mest = 'все';
    if (nayti == 'исправными') {
        verispr = 1 - verbrak;
        if (kolvo == 'две')
            answers = verispr * verispr;
        else
            answers = verispr * verispr * verispr;
    } else {
        if (kolvo == 'две')
            answers = verbrak * verbrak;
        else
            answers = verbrak * verbrak * verbrak;
    }

    NAtask.setTask({
        text: 'Вероятность того, что ' + predmet.ie + ' бракованная, равна ' + verbrak + '. Покупатель в ' +
            '' + mesto + ' выбирает случайную упаковку, в которой ' + kolvo + ' таких ' + predmet.im + '. ' +
            'Найдите вероятность того, что ' + mest + ' ' + predmet.im + ' окажутся ' + nayti + '.',
        answers,
    });
})();
