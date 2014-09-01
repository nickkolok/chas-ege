(function(){'use strict';
var side=sluchch(2,20);
var required=['длину вектора $\\overrightarrow{AB}-\\overrightarrow{AC}$',
    'скалярное произведение векторов $\\overrightarrow{AB}$ и $\\overrightarrow{AC}$'];
var index=sl1();
window.vopr.txt='Стороны правильного треугольника $ABC$ равны '+side+'. Найдите '+required[index]+'.';
window.vopr.ver=[ index ? (side*side/2).ts() : side.ts() ];
})();
//Гущин 27721 27722
//nadraliev
