(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let maxPerRoom = sl(3, 6);
        let studentNumber = sl(50, 300);

        let rooms = (studentNumber / maxPerRoom).ceil();
        genAssert(studentNumber % maxPerRoom != 0, "Число студентов делится нацело на максимум в комнате — требуется остаток");

        let person = ['юноша', 'девушка'][rand];
        let student = ['студент', 'студентка'][rand];

        NAtask.setTask({
            text:
                'В одной комнате студенческого общежития можно поселить не больше ' +
                chislitlx(maxPerRoom, person, 'r$') + '. Какое наименьшее количество ' +
                'комнат потребуется для размещения ' + chislitlx(studentNumber, student, 'r$') + ' из других городов?',
            answers: rooms,
        });

        NAtask.modifiers.allDecimalsToStandard();
    }, 1000);
})();

//5539838
//Открытый банк заданий 5487FE
//zer00player


