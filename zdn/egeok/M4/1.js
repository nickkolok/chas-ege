(function(){'use strict';

var a=sl(1,9).pm();
var b=sl(1,9).pm();
var p=sl(2,9);
var k=-[1,2,4,5,10,20,25].iz().pm()+1;//Чтобы делилось хорошо!

chas2.task.setEquationTask({
	parts: ['(x+'+a+')^'+p+'(x+'+b+')', k+'(x+'+a+')^{'+(p+1)+'}'],
	roots: [-a,-(-k*a+b)/(-k+1)],
	handleMultipleRoots: 'randomExceptList',
	enablePartsDivision: 0,
});
})();
//http://ege-ok.ru/2013/02/14/razlozhenie-mnogochlena-na-mnozhiteli-chast-1
//Николай Авдеев
