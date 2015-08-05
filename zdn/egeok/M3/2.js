(function(){'use strict';

var x1=sl(-5,5);
var x2=sl(-5,5);
var x3=sl(-5,5);
var x4=sl(-5,5);

var p=[x1,1].mn_umn([x2,1]).mn_umn([x3,1]).mn_umn([x4,1]);

chas2.task.setEquationTask({
	parts: [p.mn_txt('x'), 0],
	roots: [x1,x2,x3,x4],
	handleMultipleRoots: 'randomExceptList',
});
})();
//http://ege-ok.ru/2013/03/04/razlozhenie-mnogochlena-na-mnozhiteli-chast-3-teorema-bezu-i-shema-gornera
//Николай Авдеев
