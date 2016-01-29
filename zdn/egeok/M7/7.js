    (function() {
            'use strict';
            NAinfo.requireApiVersion(0, 2);
            var kan = sluchch(2, 9);
            var country = kan;
            var cpecial = sluchch(9, 15);
            var otvet = ((cpecial).fct()) / (((cpecial - kan).fct()) * (country).fct())
     
     
            NAtask.setTask({
     
                    text: 'Сколько существует различных вариантов выбора ' + chislitlx(kan, 'кандидатура', 'r') + ' из ' + chislitlx(
                                    cpecial, 'специалист') +
                            ' для поездки в ' + chislitlx(country, 'различных страна') + '?',
     
                    answers: otvet,
     
     
     
            });
    })();

