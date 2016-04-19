(function(){'use strict';

var r=sl(2,4);
do{
var A=objUmn(generateMatrix(4,r,1,4),generateMatrix(r,5,-2,2));
A=A.T();
var B=A.splice(0,1);
A=A.T();
B=B.T();
}while(A.hasNullVect() || B.T()[0].isNullVect());

window.vopr.txt='Решить систему методом Гаусса и записать общее решение в виде суммы частного '+
	'решения неоднородной и общего решения однородной системы:'+
	'$$\\left('+A.matrixToTex().ts()+'\\left|'+B.matrixToTex().ts()+'\\right.\\right)$$'+
	'';

})();
