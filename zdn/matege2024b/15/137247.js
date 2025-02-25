(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let rand = sl1();
        let govOrPriShare = ['государству', 'частным акционерам', 'крумным банкам', 'инвестиционным фондам'].iz(2);
        let nameOfCompany = ['Что за люди', 'Одичалая ягода', 'Гелий', 'Бра и Тришка', 'Винни и Пух', '1 раз отрежь - 8 раз переделывай', 'Стул да стол', 'Папины сапожки', 'Юпитерианцы', 'Вершки да Корешки'].iz();
        let persent = sl(20, 90, 1);
        let companyProfit = sl(40, 500, 1);
        let onePresent = companyProfit * 10000;

        let result = [onePresent * persent, onePresent * (100 - persent)][rand];
        let whoReceivedShares = [govOrPriShare[0], govOrPriShare[1]];
        let answer = [persent, 100 - persent];

        NAtask.setTask({
            text: govOrPriShare[0].toZagl() + ' принадлежит ',
            questions: [
                {
                    text: persent + '% акций предприятия "' + nameOfCompany + '", ' +
                        'остальные акции принадлежат ' + govOrPriShare[1] + '. ' +
                        'Общая прибыль предприятия после уплаты налогов за год составила ' + companyProfit + ' млн. р. ' +
                        'Какая сумма в рублях из этой прибыли должна пойти на выплату ' + whoReceivedShares[rand],
                    answers: result,
                },
                {
                    text: persent + '% акций предприятия "' + nameOfCompany + '", ' +
                        'остальные акции принадлежат ' + govOrPriShare[1] + '. ' +
                        'Прибыль, которая досталась ' + whoReceivedShares[rand] + ' составляет ' +
                        result + ' рублей. Чему была равна общая прибыль предприятия в млн. р.',
                    answers: companyProfit,
                },
                {
                    text: 'часть акций предприятия "' + nameOfCompany + '", ' +
                        'остальные акции принадлежат ' + govOrPriShare[1] + '. ' +
                        'Общая прибыль предприятия после уплаты налогов за год составила ' + companyProfit + ' млн. р. ' +
                        'Прибыль, которая досталась ' + whoReceivedShares[rand] + ' составляет ' +
                        result + ' рублей. Чему равен процент прибыли предприятия переданный ' + whoReceivedShares[rand],
                    answers: answer[rand],
                },
                {
                    text: 'часть акций предприятия "' + nameOfCompany + '", ' +
                        'остальные акции принадлежат ' + govOrPriShare[1] + '. ' +
                        'Общая прибыль предприятия после уплаты налогов за год составила ' + companyProfit + ' млн. р. ' +
                        'Прибыль, которая досталась ' + whoReceivedShares[rand] + ' составляет ' +
                        result + ' рублей. Чему равен процент прибыли предприятия переданный ' + whoReceivedShares[1 - rand],
                    answers: answer[1 - rand],
                },
            ],
            postquestion: '?',
        });
    }, 100);
})();
//https://oge.sdamgia.ru/test?likes=137247
//zer00player
