(function() {
    const m1 = sl(0, 10); // индекс месяца от 0 (январь) до 10 (ноябрь), чтобы m1+1 не вышел за пределы
    const month1Gen = mesiacy.re[m1];
    const month2Gen = mesiacy.re[m1 + 1];
    const month1Nom = om.months[m1];
    
    const n1 = (sl(100, 9000) + sl(0, 9)) / 10; // начальные показания, например, 76.1
    const consumption = sl(1, 30); // расход воды за месяц
    const n2 = n1 + consumption; // конечные показания
    
    const costRub = sl(15, 150);
    const costKop = sl(0, 9) * 10; // 00, 10, 20, ..., 90
    
    const waterType = sluchiz(['холодной', 'горячей']);

    NAtask.setTask({
        text: `В квартире установлен прибор учёта расхода ${waterType} воды (счётчик). 1 ${month1Gen} счётчик показывал ${n1} куб. м воды, а 1 ${month2Gen} — ${n2} куб. м. Сколько нужно заплатить за ${waterType} воду за ${month1Nom}, если стоимость 1 куб. м ${waterType} воды составляет ${costRub} руб. ${String(costKop).padStart(2, '0')} коп.? Ответ дайте в рублях.`,
        answers: (consumption * (costRub * 100 + costKop)) / 100,
    });
})();
// Обзад 318413
