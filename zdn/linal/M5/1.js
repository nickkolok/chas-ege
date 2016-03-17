(function(){'use strict';
NAinfo.requireApiVersion(0, 0);

var mtr,det;
do{
	mtr=generateMatrix(3,3,-5,5);
	det=mtr.det();
}while(!det || !(100/det).isZ());

NAtask.setTask({

	text:'Найдите обратную матрицу к матрице $A=\\left('+mtr.matrixToTex()+'\\right)$',
	answers:
		'$\\left('+	//Костыль!!! Нужна vrn_mtr
	mtr.inv().matrixToTex().ts()
	+'\\right)$',

});
})();
