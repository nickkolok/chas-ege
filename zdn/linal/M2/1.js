(function(){'use strict';
NAinfo.requireApiVersion(0, 0);

var mtr,det;
do{
	mtr=generateMatrix(3,3,-9,9);
	det=mtr.det();

}while(!det || det.abs()>100);

NAtask.setTask({

	text: 'Вычислите: $$\\left|'+mtr.matrixToTex()+'\\right|$$',
	answers:det,

});
})();
