// kbsx32

(function() {

    var task = sluchch(0, 2);
    var cat_a = sluchch(1, 100), cat_b = sluchch(1, 100);

    if (task === 0)
        while (!Math.sqrt(cat_a * cat_a + cat_b * cat_b).isZ())
            cat_a = sluchch(1, 30), cat_b = sluchch(1, 30);

    switch(task)
    {
    case 0:
        window.vopr.txt=(
            'Катеты прямоугольного треугольника равны ' + 
            cat_a + ' и ' + cat_b + '. ' +
            'Найдите гипотенузу.');
        window.vopr.ver=[Math.sqrt(cat_a * cat_a + cat_b * cat_b)];
        break;
    case 1:
        window.vopr.txt=(
            'Катеты прямоугольного треугольника равны ' + 
            cat_a + ' и ' + cat_b + '. ' +
            'Найдите площадь этого треугольника.');
        window.vopr.ver=[0.5 * cat_a * cat_b];
        break;
    case 2:
        window.vopr.txt=(
            'В прямоугольном треугольнике один катет равен равен ' + 
            cat_a + ', а другой ' + 
            (cat_a == cat_b             // is equal
                ? 'равен ему. ' 
                : 'на ' + Math.abs(cat_b - cat_a) + 
                (cat_a < cat_b          // not equal: cat_a != cat_b
                    ? ' больше его. ' 
                    : ' меньше его. ')) + 
            'Найдите площадь треугольника.');
        window.vopr.ver=[0.5 * cat_a * cat_b];
        break;    
    }
    
    window.vopr.kat['log'] = 0;
    window.vopr.kat['prz'] = 0;
    window.vopr.kat['drs'] = 0;
    window.vopr.kat['tri'] = 0;
})();
