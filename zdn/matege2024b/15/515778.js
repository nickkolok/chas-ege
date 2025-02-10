(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl(0, 1);
        let govOrPriShare = ['государству', 'частным акционерам'][rand];
        let nameOfCompany = ['Что за люди', 'Одичалая ягода', 'Гелий', 'Бра и Тришка', 'Винни и Пух', '1 раз отрежь - 8 раз переделывай', 'Стул да стол', 'Папины сапожки', 'Юпитерианцы', 'Вершки да Корешки'].iz();
        let companyProfit = sl(10, 200, 1);
        let government = sl(1, 10, 1);
        let privateSharehorders = sl(1, 10, 1);

        genAssert(government !== privateSharehorders, 'части отношения у государства и частных акционеров совпадает');
        genAssert(government.nod(privateSharehorders) == 1, 'части отношения у государства и частных акционеров имеют общие множители по мимо 1');
        genAssert(companyProfit.kratno(government + privateSharehorders), 'прибыль не кратка сумме отношения');

        let theAmountThatWillBeRecived = companyProfit / (government + privateSharehorders) * [government, privateSharehorders][rand];


        NAtask.setTask({
            text:
                'Акции предприятия "' + nameOfCompany + '" распределены между государством и частными акционерами в отношении ' + government + ':' + privateSharehorders + ' соответственно. ' +
                'Общая прибыль предприятия после уплаты налогов за год составила ' + companyProfit + ' млн рублей. ' +
                'Какая сумма из этой прибыли должна пойти на выплату ' + govOrPriShare + '? Ответ дайте в миллионах рублей.',
            answers: theAmountThatWillBeRecived,
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=515778
//zer00player
