(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let rand = sl1();
        let govOrPriShare = ['государству', 'частным акционерам'].iz(2);
        let nameOfCompany = ['Что за люди', 'Одичалая ягода', 'Гелий', 'Бра и Тришка', 'Винни и Пух', '1 раз отрежь - 8 раз переделывай', 'Стул да стол', 'Папины сапожки', 'Юпитерианцы', 'Вершки да Корешки'].iz();
        let persent = sl(20, 90, 1);
        let companyProfit = sl(40, 500, 1);
        let onePresent = companyProfit * 10000;

        NAtask.setTask({
            text: '',
            questions: [
                {
                    text: govOrPriShare[0].toZagl() + ' принадлежит ' + persent + '% акций предприятия "' + nameOfCompany + '", ' +
                        'остальные акции принадлежат ' + govOrPriShare[1] + '. ' +
                        'Общая прибыль предприятия после уплаты налогов за год составила ' + companyProfit + ' млн. р. ' +
                        'Какая сумма в рублях из этой прибыли должна пойти на выплату ' + [govOrPriShare[0], govOrPriShare[1]][rand],
                    answers: [onePresent * persent, onePresent * (100 - persent)][rand],
                },
                {
                    text: govOrPriShare[0].toZagl() + ' принадлежит ' + persent + '% акций предприятия "' + nameOfCompany + '", ' +
                        'остальные акции принадлежат ' + govOrPriShare[1] + '. ' +
                        'Прибыль, которая досталась ' + [govOrPriShare[0], govOrPriShare[1]][rand] + ' составляет ' +
                        [onePresent * persent, onePresent * (100 - persent)][rand] +
                        ' рублей. Чему была равна общая прибыль предприяти в млн. р.',
                    answers: companyProfit,
                },
                {
                    text: govOrPriShare[0].toZagl() + ' принадлежит часть акций предприятия "' + nameOfCompany + '", ' +
                        'остальные акции принадлежат ' + govOrPriShare[1] + '. ' +
                        'Общая прибыль предприятия после уплаты налогов за год составила ' + companyProfit + ' млн. р. ' +
                        'Прибыль, которая досталась ' + [govOrPriShare[0], govOrPriShare[1]][rand] + ' составляет ' +
                        [onePresent * persent, onePresent * (100 - persent)][rand] +
                        ' рублей. Чему равен процент прибыли предприятия переданный ' + [govOrPriShare[0], govOrPriShare[1]][rand],
                    answers: [persent, 100 - persent][rand],
                },
                {
                    text: govOrPriShare[0].toZagl() + ' принадлежит часть акций предприятия "' + nameOfCompany + '", ' +
                        'остальные акции принадлежат ' + govOrPriShare[1] + '. ' +
                        'Общая прибыль предприятия после уплаты налогов за год составила ' + companyProfit + ' млн. р. ' +
                        'Прибыль, которая досталась ' + [govOrPriShare[0], govOrPriShare[1]][rand] + ' составляет ' +
                        [onePresent * persent, onePresent * (100 - persent)][rand] +
                        ' рублей. Чему равен процент прибыли предприятия переданный ' + [govOrPriShare[1], govOrPriShare[0]][rand],
                    answers: [100 - persent, persent][rand],
                },
            ],
            postquestion: '?',
        });
    }, 100);
})();
//https://oge.sdamgia.ru/test?likes=137247
//zer00player
