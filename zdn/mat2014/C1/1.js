(function(){

var t1=['\\sin x','-\\sin(-x)','\\cos\\left('+1 .pina(2)+'-x\\right)'];
var t2=['\\cos x', '\\cos(-x)','\\sin\\left('+1 .pina(2)+'-x\\right)'];
var t=[	t1.iz(),t2.iz()].shuffle();

var a=sl(2,20);
var b=slKrome(a,2,20);
var l=sl(1,10);

window.vopr.txt='а) Решите уравнение:'+
	'$$'+(a*b)+'^{'+t1.concat(t2).iz()+'}='+a+'^{'+t[0]+'}\\cdot'+b+'^{'+t[1]+'}$$'+'<br/>'+
	'б) Выберите корни, принадлежащие отрезку $\\left['+l+'\\pi;'+[''+(l+1)+'\\pi',(2*l+3).pina(2)].iz()+'\\right]$';

window.vopr.ver=[('а) $'+1 .pina(4)+'\\pi n, n \\in \\mathbb{Z}$<br/> б)$'+(4*l+1).pina(4)+';'+(4*l+5).pina(4)+'$').plusminus()];
})();
