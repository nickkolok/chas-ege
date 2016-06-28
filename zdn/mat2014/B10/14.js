    (function() {
            'use strict';
            var kat1 = sluchch(2, 20, 2);
            var kat2 = sluchch(2, 20, 2);
            var reb = sluchch(2, 20, 2);
            var rebvis = ['боковое ребро равно', 'высота равна'].iz();
     
            chas2.task.setCountableTask([
                    [{
                                    vel: 'объём призмы',
                                    nah: 1,
                                    vin: 1,
                                    zna: reb * kat1 * kat2 / 2
                            }, {
                                    vel: 'площадь призмы. Число округлить по общим правилам округления',
                                    nah: 1,
                                    vin: 1,
                                    zna: (2 * (kat1 * kat2 / 2) + kat1 + kat2 + (Math.sqrt(Math.pow(kat1, 2) + Math.pow(kat2, 2))) * reb).round(),
                            }, {
                                    vel: 'периметр призмы. Число округлить по общим правилам округления',
                                    nah: 1,
                                    vin: 1,
                                    zna: (2 * (kat1 + kat2 + Math.sqrt(Math.pow(kat1, 2) + Math.pow(kat2, 2))) + 3 * reb).round(),
                            },
     
                    ].iz(),
     
            ], {
                    preambula: 'Основанием прямой треугольной призмы служит прямоугольный треугольник с катетами ' + kat1 + ' и ' +
                            kat2 + ', ' + rebvis + ' ' + reb + '.',
            });
     
    })();
    //Обзад 70006
    //Vivi
