(function(){'use strict';

var x1=sl(-5,5);
var x2=sl(-5,5);
var x3=sl(-5,5);

var p=[x1,1].mn_umn([x2,1]).mn_umn([x3,1]);

chas2.task.setEquationTask({
	parts: [p.mn_txt('x'), 0],
	roots: [x1,x2,x3],
	handleMultipleRoots: 'randomExceptList',
});
})();
//http://ege-ok.ru/2012/08/29/reshenie-uravneniya-s-pomoshhyu-ponizheniya-stepeni-delenie-mnogochlena-na-mnogochlen-stolbikom
//Николай Авдеев
