(function() {

var a=sluchch(2,9).pm();
var g=sluchch(1,9).pm();

var d=sluchch(2,2*a*g-1).pm();
var b=(2*a*g+d);

var f=sluchch(1,a*g*g-1).pm();
var c=(a*g*g+f);

var h=2*(a*(c-f)).sqrt();

var m1=[d-h,d+h];
var t1=['меньше','больше'];
var v1=sluchch(1);

window.vopr.txt=(
				'Прямая $y='+d+'x+'+f+'$ является касательной к графику функции $y='+a+'x^{2}+bx+'+c
				+'$. Найдите $b$, зная, что оно '+t1[v1]+' '+sluchch(m1[0]+1,m1[1]-1)
				).plusminus();
window.vopr.ver=[''+m1[v1]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
