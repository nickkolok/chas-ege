(function() {

var a=sluchch(2,9).pm();
var g=sluchch(1,9).pm();

var d=sluchch(2,2*a*g-1).pm();
var b=(2*a*g+d);

var f=sluchch(1,a*g*g-1).pm();
var c=(a*g*g+f);

var m=[a,c,d,f];
var n=['a','c','d','f'];
var h=sluchch(0,3);

window.vopr.txt=('Прямая $y='+((h-2)?(d):('d'))+'x+'+((h-3)?(f):('f'))+
					'$ является касательной к графику функции $y='
					+((h)?(a):('a'))+'x^{2}+'+b+'x+'+((h-1)?(c):('c'))+'$. Найдите $'+n[h]+'$.'
				).plusminus();
window.vopr.ver=[''+m[h]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
