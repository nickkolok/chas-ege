(function(){'use strict';

var A,
	X=generateMatrix(4,1,-2,2),
	B;
do{
	A=generateMatrix(4,4,-9,9);
}while(!A.det());

B=objUmn(A,X);

window.vopr.ver=[
	'$\\left('+
		X.matrixToTex().ts()+
	'\\right)$'
];

window.vopr.txt='Решить систему методом Гаусса и записать общее решение в виде суммы частного '+
	'решения неоднородной и общего решения однородной системы:'+
	'$$\\left('+A.matrixToTex().ts()+'\\left|'+B.matrixToTex().ts()+'\\right.\\right)$$'+
	'';

})();
