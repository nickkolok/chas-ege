(function(){'use strict';

var mtr,
	det;
do{
	mtr=generateMatrix(4,4,-9,9);
	det=mtr.det();
}while(!det || det.abs()>500);

window.vopr.ver=[det];
window.vopr.txt='Вычислите: $$\\left|'+mtr.matrixToTex()+'\\right|$$';

})();
