(function () {
    retryWhileError(function () {
        'use strict';

        NAinfo.requireApiVersion(0, 2);

        let transportArray = generateMatrix(1, sl(3, 5), 2, 10).iz();
        let numberOfTransport = transportArray.sum();
        let selectedTransport = sl(0, transportArray.length - 1);
        let answer = transportArray[selectedTransport] / numberOfTransport;

        genAssertZ1000(answer, "Кривая вероятность");

        let transport = [
            [
                ['метла', 'ступа'].iz(), 'прилетит'
            ],
            [
                ['автомобиль', 'печь'].iz(), 'приедет'
            ],
            [
                ['волк', 'ёж'].iz(), 'прибежит'
            ],
            [
                ['конь', 'единорог'].iz(), 'прискачет'
            ],
            ['улитка', 'приползёт']
        ].iz();

        let move = transport.pop();
        transport = sklonlxkand(transport).iz();

        let colors = om.trickyColors.iz(transportArray.length);
        let transportColor = colors.map((color, index) => '$' + transportArray[index] + '$ ' + color.replace('ый', 'ых').replace('ой', 'ых'));

        NAtask.setTask({
            text: `В фирме такси в данный момент свободно ${chislitlx(numberOfTransport, transport.ie, '$')}: 
			${transportColor.joinLast(` и `)}. 
			По вызову ${move} ${[`один`, `одна`, `одно`][transport.rod]} из ${transport.rm}, случайно оказавш${[`ий`, `ая`, `ие`][transport.rod]}ся ближе всего к заказчику. 
			Найдите вероятность того, что к нему ${move} ${colors[selectedTransport].slice(0, -2) + [`ый`, `ая`, `ое`][transport.rod]} ${transport.ie}.`,
            answers: answer,
            authors: ['Суматохина Александра'],
        });

    }, 100);
})();
// 1011 1012 1013 1014 1015 1016 1017 1018 1019 1020 320193 522432 522452 522472 522492 530288
