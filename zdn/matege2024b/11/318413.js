(function() {
    var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября'];
    var m1 = sl(0, 10);
    var month1 = months[m1];
    var month2 = months[m1 + 1];
    
    var n1 = (sl(100, 9000) + sl(0, 9)) / 10;
    var consumption = sl(1, 30);
    var n2 = n1 + consumption;
    
    var costRub = sl(15, 150);
    var costKop = sl(0, 9) * 10;
    
    var waterType = sluchiz(['холодной', 'горячей']);

    NAtask.setTask({
        text: 'В квартире установлен прибор учёта расхода ' + waterType + ' воды (счётчик). 1 ' + month1 + ' счётчик показывал ' + n1 + ' куб. м воды, а 1 ' + month2 + ' — ' + n2 + ' куб. м. Сколько нужно заплатить за ' + waterType + ' воду за ' + month1 + ', если стоимость 1 куб. м ' + waterType + ' воды составляет ' + costRub + ' руб. ' + (costKop < 10 ? '0' + costKop : costKop) + ' коп.? Ответ дайте в рублях.',
        answers: (consumption * (costRub * 100 + costKop)) / 100,
    });
})();
// Обзад 318413
