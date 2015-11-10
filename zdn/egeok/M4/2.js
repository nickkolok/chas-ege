(function(){'use strict';

do{
	var a=sl(2,9);
	var b=sl(1,9);
	var c=sl(2,9);
	var d=sl(1,9);
}while(a.pow(b)==c.pow(d));

chas2.task.setAdditiveEquationTask({
	parts: [
		a+'^{'+b+'x}',
		'-'+c+'^{'+d+'x}',
		'-'+[(a*c)+'\\cdot'+a+'^{'+b+'x}',c+'\\cdot'+a+'^{'+b+'x+1}',].iz(),
		[(a*c)+'\\cdot'+c+'^{'+d+'x}',a+'\\cdot'+c+'^{'+d+'x+1}'].iz(),
	],
	roots: [0],
});
})();
//http://ege-ok.ru/2013/02/14/razlozhenie-mnogochlena-na-mnozhiteli-chast-2
//Николай Авдеев
