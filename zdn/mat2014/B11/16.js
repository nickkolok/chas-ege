	

    (function() { 'use strict';
    /*Исходный текст задачи:
    Найдите значение выражения $({{\\log }_{2}}16)\\cdot ({{\\log }_{6}}36)$.
    */
    var L1=sluchch(2,4);
    var L2=sluchch(2,4);
    var Osn1=sluchch(2,6);
    var Osn2=sluchch(2,6);
     
    window.vopr.txt=  
            'Найдите значение выражения $({{\\log }_{'+Osn1+'}}'+Osn1 .pow(L1)+')\\cdot ({{\\log }_{'+Osn2+'}}'+Osn2 .pow(L2)+')$.'
           
    window.vopr.ver=[ (L1*L2).ts() ];  
     
    window.vopr.kat['log']=1;  //Логарифмы
    window.vopr.kat['prz']=0;  //Производная
    window.vopr.kat['drs']=0;  //Дробные (нецелые) степени
    window.vopr.kat['tri']=0;  //Тригонометрия
     
    })();
    //Источник задания.  Открытый банк заданий № 26843
    //DjUsagi

