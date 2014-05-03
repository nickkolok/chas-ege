(function(){'use strict';

var a = slKrome(0,-5,5);
var b = slKrome(0,-5,5);
var c = slKrome(0,-5,5);
var d = slKrome(0,-5,5);
var e = slKrome(0,-5,5);
//var q = -1*d;
var r = slKrome(0,-5,5);
var t = slKrome(0,-5,5);

window.vopr.ver=[r*(c*a*e+c*b-d*a*t-d*b).plusminus()];

window.vopr.txt = ('Найдите значение выражения $'+ r+'(' +c+'p('+d+'x+'+e+')+'+(-1*d)+'p('+c+'x+'+t+'))$, если $ p(x)='+a+'x+'+b+'$.').plusminus();
})();
//Обзад 26821
//by _zevs
