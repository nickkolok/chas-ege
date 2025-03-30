
(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let moneyThatHaveGirl = sl(100, 1000, 100);
        let tariffPlan = sl(11, 23, 1);
        let nameOfPerson = sklonlxkand(om.femaleNames.iz());
        let tariffPlanName = ['Просто как день', 'Почему комутатор молчит', 'На Проводе', 'Линия Жизни', 'Полный улёт', 'Улитка', 'Копеечка', 'Моя Мечта',
            'Дикий Путь', '212-85-06', 'Агент 700', 'Вишня', 'Коты на Марсе'].iz();

        genAssert(!moneyThatHaveGirl.kratno(tariffPlan), "Количество денег не кратно тарифному плану");

        NAtask.setTask({
            text:
                'По тарифному плану «' + tariffPlanName + '» компания сотовой связи каждый вечер снимает со счёта абонента ' + '$' + tariffPlan + '$' + ' руб. ' +
                'Если на счету осталось меньше ' + '$' + tariffPlan + '$' + ' руб., ' +
                'то на следующее утро номер блокируют до пополнения счёта. ' +
                'Сегодня утром у ' + nameOfPerson.re + ' на счету было ' + '$' + moneyThatHaveGirl + '$' + ' руб. ' +
                'Сколько дней (включая сегодняшний) она сможет пользоваться телефоном, ' +
                'не пополняя счёт?',
            answers: (moneyThatHaveGirl / tariffPlan).ceil() - 1,
        });

    }, 100);
})();

//https://ege.sdamgia.ru/test?likes=323512
//zer00player


