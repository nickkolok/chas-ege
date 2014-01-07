(function(){'use strict';

var mtr=generateMatrix(2,2,-19,19);

window.vopr.ver=[mtr.det()];
window.vopr.txt='Вычислите: $$\\left|'+mtr.matrixToTex()+'\\right|$$';

})();
