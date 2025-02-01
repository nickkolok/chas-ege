(function(){'use strict';


var mtr,
	det;
do{
	mtr=generateMatrix(3,3,-5,5);
	det=mtr.det();
}while(!det || !(100/det).isZ());

window.vopr.ver=[
	'$\\left('+	//Костыль!!! Нужна vrn_mtr
	mtr.inv().matrixToTex().ts()+
	'\\right)$'
];
window.vopr.txt='Найдите методом Гаусса обратную матрицу к матрице $A=\\left('+mtr.matrixToTex()+'\\right)$';

})();
