(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let bottlePrice = sluchch(5, 25, 1);
        let priceOfKvass = sluchch(30, 200, 1);
        let numberLitersOfKvass = sluchch(2, 10, 1);
        let numberLitersOfKvassNeedToFind = sluchch(0.5, 5.5, 1);

        let priceFor1LiterOfKvass = bottlePrice + priceOfKvass;
        let priceOfSeveralLitersOfKvass = bottlePrice + priceOfKvass * numberLitersOfKvass;

        NAtask.setTask({
            text: 'В магазине квас на разлив можно купить в бутылках, причём стоимость кваса в бутылке складывается из стоимости самой бутылки и кваса, налитого в неё.' +
                ' Цена бутылки не зависит от её объёма. Бутылка кваса объёмом $1$ литр стоит ' + chislitlx(priceFor1LiterOfKvass, 'рубль', '$') +
                ', объёмом ' + chislitlx(numberLitersOfKvass, 'литр', '$') + ' —  ' + chislitlx(priceOfSeveralLitersOfKvass, 'рубль', '$') +
                '. Сколько рублей будет стоить бутылка кваса объёмом ' + chislitlx(numberLitersOfKvassNeedToFind, 'литр', '$') + '?',
            answers: bottlePrice + priceOfKvass * numberLitersOfKvassNeedToFind,
        });
    });
})();
//https://mathb-ege.sdamgia.ru/test?likes=512508
//zer00player
