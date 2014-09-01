(function(){'use strict';
var pif=objUmn([[sl(1,5)]],[om.pifagtr.iz().slice()])[0];
var width=pif[0];
var length=pif[1];
var required=['длину разности','длину суммы','скалярное произведение','длину'];
var reqIndex=sluchch(0,3);
var vector= reqIndex==3 ?' вектора $\\overrightarrow{AC}$' : ' векторов $\\overrightarrow{AB}$ и $\\overrightarrow{AD}$';
window.vopr.txt='Две стороны прямоугольника $ABCD$ равны '+width+' и '+length+'. '+
    'Найдите '+required[reqIndex]+' '+vector+'.';
window.vopr.ver=[ reqIndex==2 ? (0).ts() : pif[2].ts() ];
})();
//Гущин 27707 27708 27709 27710
//nadraliev
