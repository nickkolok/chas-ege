(function() {
	'use strict';

	var point = {
		x: sl(-20, 20),
		y: sl(-20, 20),
	}
	
	var A1 = sl(-10, 10);
	var B1 = sl(-10, 10);
	var C1 = - A1*point.x - B1*point.y;
	
	var A2 = sl(-10, 10);
	var B2 = sl(-10, 10);
	var C2 = - A2*point.x - B2*point.y;
	
	
	NAtask.setTask({
		text: 'Найдите точку пересечения прямых ' +
			'$' + (A1 + 'x+' + B1 + 'y+' + C1 + '=0').replace(/^0x+/,'').replace('+0y','').replace('+0=','=').plusminus() + '$'+
			' и '+
			'$' + (A2 + 'x+' + B2 + 'y+' + C2 + '=0').replace(/^0x+/,'').replace('+0y','').replace('+0=','=').plusminus() + '$.'
			,
		answers: '('+point.x+'; '+point.y+')',
	});
})();

