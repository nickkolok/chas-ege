(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let tapeName = sklonlxkand(['лента', 'верёвка', 'нитка'].iz());
        let secondTapeLength = sluchch(5, 200, 1);
        let firstTapeLength = sluchch(5, 200, 1);
        let tapeColor = ['красн', 'жёлт', 'зелён', 'фиолетов', 'черн', 'оранжев', 'голуб'].iz(2);
        let typeOfTapes = ['тонкие', 'незаметные', 'полупрозранчые', 'маленькие'].iz();
        let unitsOfLength = sklonlxkand(['сантиметр', 'дециметр', 'метр', 'миллиметр', 'дюйм'].iz());
        NAtask.setTask({
            text: 'На ' + tapeName.de + ' по разные стороны от середины отмечены две ' + typeOfTapes + ' поперечные полоски: ' +
                tapeColor[0] + 'ая' + ' и ' + tapeColor[1] + 'ая' + '. Если разрезать ' + tapeName.ve + ' по ' + tapeColor[1] + 'ой' + ' полоске, то одна часть' +
                ' будет на ' + chislitlx(secondTapeLength, unitsOfLength, '$') + ' длиннее другой. Если разрезать ' + tapeName.ve + ' по ' + tapeColor[0] + 'ой' + ' полоске, ' +
                ' то одна часть будет на ' + chislitlx(firstTapeLength, unitsOfLength, '$') + ' длиннее другой.' +
                ' Найдите расстояние ( в ' + unitsOfLength.pm + ' ) между ' + tapeColor[1] + 'ой' + ' и ' + tapeColor[0] + 'ой' + ' полосками.',
            answers: (secondTapeLength + firstTapeLength) / 2,
        });
    });
})();
//https://ege314.ru/20-zadachi-na-smekalku/reshenie-2434/
//zer00player
