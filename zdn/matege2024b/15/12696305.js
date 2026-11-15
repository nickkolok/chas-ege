(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '12696305';
        let preference = ['mint', 'blackTea', 'jasmine'];
        let rand = getSelectedPreferenceFromList(key, preference);

        let nameOfPerson = sklonlxkand([om.maleNames.iz(), om.femaleNames.iz()].iz());
        let nameOfCompany = ['Лучший чай', 'Чайное подполье', 'Поднебесный чай', 'Носочки императора', 'Мой Чай', 'Чай для чайников'].iz();
        let nameOfTea = ['Тонус', 'Расслабление', 'Бодрость духа', 'Внутреняя Сила', 'Рассвет', 'Закат', 'Волны чайного удовольствия'].iz();
        let nameColorOfTea = ['чёрного', 'белого', 'красного', 'зелёного', 'жёлтого'].iz();
        let addMint = ['мяты', 'мелиссы', 'ромашки', 'тимьяна', 'сушёный имбиря', 'палочек корицы', 'кардамона', 'гвоздики'].iz();
        let addJasmine = ['жасмина', 'лепесков календулы', 'лепестков розы', 'цветов лаванды', 'кусочков ванили', 'корня солодки', 'лепестков василька'].iz();

        let partBlackTea = sl(6, 12);
        let partMint = sl(2, 5);
        let partJasmine = sl(1, 3);
        let massOnePart = sl(5, 15);

        let mass = massOnePart * [partMint, partBlackTea, partJasmine][rand];
        let totalMass = (partBlackTea + partMint + partJasmine) * massOnePart;

        NAtask.setTask({
            text: 'Фирма «' + nameOfCompany + '» специализируется на фасовке чая по заказу клиентов. ' +
                'Чайная композиция «' + nameOfTea + '», состоящая из листьев ' + nameColorOfTea + ' чая, ' + addMint + ' и ' + addJasmine + ', ' +
                'получается смешиванием этих ингредиентов по массе в отношении $' + partBlackTea + ':' + partMint + ':' + partJasmine + '$ соответственно. ' +
                nameOfPerson.ie + ' заказал' + ['', 'а'][nameOfPerson.rod] + ' чай, в котором ' + [addMint, nameColorOfTea + ' чая', addJasmine][rand] + ' ' + chislitlx(mass, 'грамм', '$') + '. ' +
                'Какую массу будет иметь упаковка чая «' + nameOfTea + '», изготовленного по заказу ' + nameOfPerson.re + '? Ответ дайте в граммах.',
            answers: totalMass,
            preference: preference,
        });

        NAtask.modifiers.allDecimalsToStandard(true);
    }, 1000);
})();
//12696305
//Открытый банк заданий C1BAF1
//zer00player
