(function(){'use strict';
NAinfo.requireApiVersion(0, 0);

	var mtr=generateMatrix(3,3,-4,4),
	a=sl(2,4).pm(),
	b=sl(2,4).pm(),
	c=sl(2,4).pm();

NAtask.setTask({

	text:'Вычислите $'+(a+'A^2+'+b+'A+'+c+'I$').plusminus()+
	', где $I$ - единичная матрица, $A=\\left('+mtr.matrixToTex()+'\\right)$',
	answers:
	'$\\left('+	//Костыль!!! Нужна vrn_mtr
	[
		[a,mtr,mtr].umnObj(),
		objUmn(b,mtr),
		generateScalMatrix(c,3),
	].sumObj().matrixToTex()
	+'\\right)$',

});
})();
