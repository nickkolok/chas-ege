(function(){'use strict';

var mtr,
	det;
do{
	mtr=generateMatrix(3,3,-9,9);
	det=mtr.det();
}while(!det || det.abs()>100);

window.vopr.ver=[det];
window.vopr.txt='Вычислите: $$\\left|'+mtr.matrixToTex()+'\\right|$$';

})();
