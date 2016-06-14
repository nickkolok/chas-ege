
'use strict';
 
NAinfo.requireApiVersion(0, 0);
 
        var pervu = sluchch(10, 45);
        var vtoru = sluchch(10, 45);
        var par = ['данного', 'этого'].iz();
        var dat = ['Ответ нужно дать', 'Ответ дайте', 'Нужно дать ответ'].iz();
        var obraz = ['образует', 'будет образовывать'].iz();
        var dvum = ['его сторонами', 'его двумя сторонами', 'двумя сторонами данного параллелограмма'].iz();
        var bol = ['больший', 'наибольший'].iz();
        NAtask.setTask({
 
                text: 'Диагональ параллелограмма ' + obraz + ' с ' + dvum + ' углы ' + pervu + ' и ' + vtoru + '. Найдите ' + bol +
                        ' угол ' + par + ' параллелограмма. ' + dat + ' в градусах.',
                answers: 180 - pervu - vtoru,
        });
})();
// Обзад 70002
// ViVi
