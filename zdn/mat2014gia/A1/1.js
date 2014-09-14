(function(){'use strict';
    
    var ch1=sl(1,5).pm();
    var ch2=sl(1,5).pm();
    var ch3=sl(1,5).pm();
    var zn1=[2,4,5,10].iz();
    var zn2=[2,4,5,10].iz();
    var zn3=[2,4,5,10].iz();
    
    window.vopr.txt=om.otvnaydite.iz().toZagl()+' значение выражения $$'+
        (
            [(ch1/zn1).ts(),ch1.frac(zn1)].iz()+'+'+[(ch2/zn2).ts(),ch2.frac(zn2)].iz()+'+'+[(ch3/zn3).ts(),ch3.frac(zn3)].iz()
        ).plusminus()+'$$';
            
    
    window.vopr.ver=[(ch1/zn1+ch2/zn2+ch3/zn3).ts()];
})();

//Проект базового уровня, №1, вариант 1.
//Николай Авдеев
