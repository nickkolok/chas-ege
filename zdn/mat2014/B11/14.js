(function(){'use strict';

do {
var num1=sluchch(2,15);
var num2=sluchch(15,40);
var num3=sluchch(2,6);
var degree=sluchch(2,4);
var num=num1.pow(1/degree)*num2.pow(1/degree)/num3.pow(1/degree);
} while (!num.isZ());
if (degree == 2)
degree='';

window.vopr.txt='Найдите значение выражения $\frac{\sqrt ['+degree+']{'+num1+'}\cdot \sqrt ['+degree+']{'+num2+'}}{\sqrt ['+degree+']{'+num3+'}}$.';
window.vopr.ver=[num];

})();
//Обзад 26746
//Lincor
