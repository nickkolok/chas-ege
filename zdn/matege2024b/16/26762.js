(function(){ retryWhileError(function(){
	'use strict';
	
	let func = ['sindeg', 'cosdeg', 'tgdeg', 'ctgdeg'].iz();
	let angle = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330].iz();
	
	angle += sl(0, 2) * 360;
	
	let sqrtN = [1, 2, 3].iz();
	
	NAtask.setEvaluationTask({
		expr: sl(2, 99).pm() + '*' + (sqrtN > 1 ? 'sqrt(' + sqrtN + ')*' : '') + func + '(' + angle.pm() + ')',
		authors: ['Алендарь Сергей'],
	});
	
	}, 10000);
})();
//26762
