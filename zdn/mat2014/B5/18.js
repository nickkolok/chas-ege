    (function() {
            'use strict';
            var pl = sluchch(4, 300, 4);
     
     
            chas2.task.setCountableTask([
                    [{
                                    vel: 'площадь треугольника CDE',
                                    nah: 1,
                                    vin: 1,
                                    zna: pl / 4,
                            }, {
                                    vel: 'площадь параллелограмма CEDF, если FE-одна из его диагоналей',
                                    nah: 1,
                                    vin: 1,
                                    zna: pl / 2,
                            }, {
                                    vel: 'полуплощадь треугольника CDE',
                                    nah: 1,
                                    vin: 1,
                                    zna: pl / 2,
                            },
     
                    ].iz(),
     
            ], {
                    preambula: 'Площадь треугольника ABC равна ' + pl + '. DE — средняя линия.',
            });
     
    })();
    //Обзад 70005
    //Vivi
