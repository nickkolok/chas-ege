(function(){'use strict';
var pif=objUmn([[sl(1,5)]],[om.pifagtr.iz().slice()])[0];
var first=pif[0];
var second=pif[1];
var vector=['$\\overrightarrow{AB}$','$\\overrightarrow{AB}- \\overrightarrow{AC}$','$\\overrightarrow{AO}+\\overrightarrow{BO}$',
    '$\\overrightarrow{AO}-\\overrightarrow{BO}$','$\\overrightarrow{AO}$ и $\\overrightarrow{BO}$'];
var vecIndex=sluchch(0,4);
var required=['длину вектора','скалярное произведение векторов'];
var reqIndex=vecIndex==4 ? 1 : 0;
var add=vecIndex==2||vecIndex==3||vecIndex==4?'пересекаются в точке $O$ и ':'';
window.vopr.txt='Диагонали ромба $ABCD$ '+add+'равны '+first+' и '+second+'.'+
    ' Найдите '+required[reqIndex]+' '+vector[vecIndex]+'.';
window.vopr.ver=[ vecIndex==4 ? 0 : (pif[2]/2).ts() ];
})();
//Гущин 27713 27716 27717 27718 27719
//nadraliev
