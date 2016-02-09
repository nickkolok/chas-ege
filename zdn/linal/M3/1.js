(function(){'use strict';
NAinfo.requireApiVersion(0, 0);

var mtr,det;
do{
	mtr=generateMatrix(4,4,-9,9);
	det=mtr.det();
}while(!det || det.abs()>500);

NAtask.setTask({

	text: 'Вычислите: $$\\left|'+mtr.matrixToTex()+'\\right|$$',
	answers:det,

});
})();
