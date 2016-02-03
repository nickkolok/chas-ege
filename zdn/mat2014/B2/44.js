(function() {
    NAinfo.requireApiVersion(0, 0);
    var prod = (['кефира', 'молока', 'сока'].iz());
    var stoi = sluchch(50, 130, 10);
    var otvet = sluchch(20, 80, 2);
    var rt = stoi - stoi * otvet / 100;
    var kop = rt - rt.floor();
    var ryb = kop * 100;
    NAtask.setTask({
        text: 'Магазин делает пенсионерам скидку на определенное количество процентов от цены покупки.' +
        ' Пакет ' + prod + ' стоит в магазине ' + chislitlx(stoi, 'рубль') + '. Пенсионер заплатил за пакет ' +
        chislitlx(rt.floor(), 'рубль') + (' ' + chislitlx(ryb, 'копейка')).esli(ryb) + '. ' +
        'Сколько процентов составляет скидка для пенсионеров?',
        answers: otvet,
    });
})();

