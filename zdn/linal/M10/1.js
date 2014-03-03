(function(){'use strict';

var r=sl(3,4);

window.vopr.txt='Решить систему методом Гаусса и записать общее решение в виде '+
	'линейной комбинации фундаментальных решений:'+
	'$$\\left('+
		objUmn(generateMatrix(4,r,-2,2),generateMatrix(r,5,-2,2)).
		matrixToTex().ts()+'\\left|'+generateMatrix(4,1,0,0).matrixToTex().ts()+'\\right.\\right)$$'+
	'';

})();
