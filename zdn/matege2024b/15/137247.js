(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '137247';
        let preference = ['percentage', 'ratio'];
        if (getSelectedPreferenceFromList(key, preference) === 1) {
            let state = sl(1, 9);
            let privateShare = slKrome(state, 1, 9);
            genAssertIrreducible(state, privateShare);
            let onePart = sl(2, 15);
            let profit = (state + privateShare) * onePart;
            let findPrivate = sl1();
            let recipient = findPrivate ? 'частным акционерам' : 'государству';
            let answer = (findPrivate ? privateShare : state) * onePart;
            NAtask.setTask({
                text: 'Акции предприятия распределены между государством и частными акционерами в отношении $' +
                    state + ':' + privateShare + '$ соответственно. Прибыль предприятия за год после уплаты налогов ' +
                    'составила $' + profit + '$ млн рублей. Какая сумма из этой прибыли должна пойти на выплату ' +
                    recipient + '? Ответ дайте в миллионах рублей.',
                answers: answer,
                analys: 'Всего ' + (state + privateShare) + ' частей. На одну часть приходится ' + onePart +
                    ' млн рублей, поэтому выплата ' + recipient + ' составит ' + answer + ' млн рублей.',
                preference,
            });
            return;
        }
        let rand = sl1();
        let govOrPriShare = ['государству', 'частным акционерам', 'крупным банкам', 'инвестиционным фондам'].iz(2);
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
            preference,
        });
    }, 100);
})();
//https://oge.sdamgia.ru/test?likes=137247
//zer00player
// 81EEAE, 9AA389, E5C714, 90439E, 8C7D6E, 0FCD78, 4019C3, 18CF65, 1A5B32, D41782, C1BA47, 6289C7, D96276, 50AFBA, 00BBD1, 390352, C224A4, 120FE0, BF5A37, 31693C
