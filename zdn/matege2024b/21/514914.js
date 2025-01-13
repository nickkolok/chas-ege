(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        //Вот тут у меня вопрос, мне на сколько разгуляться по числам? Насколько мне их больше сделать ,чтобы это не совсем превратилось в головую боль
        //но и задание не стало слишком простым?
        //или оно и должно быть простым?
        
        let firstCountNumber = sluchch(6, 15, 1);
        let secondCountNumber = firstCountNumber + 1;
        let firstArithmeticSum = firstCountNumber + sluchch(1, 15, 1);
        let secondArithmeticSum = firstArithmeticSum + sluchch(1, 15, 1);
        let wordVarious = [' различных ', ' '].iz();

        NAtask.setTask({
            text: 'Среднее арифметическое ' + firstCountNumber + wordVarious + 'натуральных чисел равно ' + firstArithmeticSum + '. Среднее арифметическое ' +
                'этих чисел и ' + secondCountNumber + ' числа равно ' + secondArithmeticSum + '. Чему равно ' + secondCountNumber + ' число?',
            answers: secondCountNumber * secondArithmeticSum - firstCountNumber * firstArithmeticSum,
        });
    });
})();
//https://mathb-ege.sdamgia.ru/test?likes=514914
//zer00player
