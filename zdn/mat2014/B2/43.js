    (function() {
            'use strict';
            NAinfo.requireApiVersion(0, 2);
     
            var fruct = sklonlxkand(['слива', 'вишня', 'черешня', 'абрикос'].iz());
            var n = sluchch(60, 150, 5);
            var x = sluchch(5, 50, 5);
            var months = chaslib.sets.months; //Массив. Объявлен, чтобы каждый раз не писать новый.
            var month = sl(0, 11)
            var month1 = sklonlxkand(months[month].name);
            var month2 = sklonlxkand(months[(month + 1) % 12].name); //Делим без остатка, чтобы не получить ошибку с 13-ым месяцем.
     
            NAtask.setTask({
                    text: 'В ' + month1.pe + ' 1 кг ' + fruct.rm + ' стоил ' + n + ' рублей. В ' + month2.pe + ' ' + fruct.im +
                            ' подорожали на ' + x + '%. ' +
                            'Сколько рублей стоил 1 кг ' + fruct.rm + ' после подорожания в ' + month2.pe + '?',
                    answers: n + (n / 100) * x,
            });
    })();
//Обзад 77353

