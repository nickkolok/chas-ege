(function(){

var b=sluchch(1,50);
var d=sluchch(1,50);

window.vopr.txt='Решите уравнение при всех $a$:'+
	'$$(a^2 - '+b*b+')x='+d+'(a-'+b+')$$';

window.vopr.ver=['При $a='+b+'$ - $x$  любое, при $a=-'+b+'$ - решений нет, при $a\\neq\\pm'+b+'$ - $x=\\frac{'+d+'}{a+'+b+'}$'];
})();
