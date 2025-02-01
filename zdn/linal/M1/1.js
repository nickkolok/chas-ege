(function(){'use strict';
NAinfo.requireApiVersion(0, 0);

var mtr=generateMatrix(2,2,-19,19);

NAtask.setTask({

	text: 'Вычислите: $$\\left|'+mtr.matrixToTex()+'\\right|$$',
	answers: mtr.det(),

});
})();
