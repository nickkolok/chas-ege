(function() {

var v1=sluchch(1);//синус или косинус
var v2=sluchch(1);//Наибольшее или наименьшее
var v3=sluchch(1);//возрастающая или убывающая

var t1=['\\cos x','\\sin x'];
var c1=[3		 ,6		   ];
var t2=['наибольшее','наименьшее'];
var t3=['-',''];

var a=sluchch(2,9).pm();//cos(x)
var b=sluchch((a*Math.PI).ceil().polozh(),39)*3;//x
var c=sluchch(-99,99);//св. член

var i1=sluchch(-2,2);
var i2=sluchch(i1+1,4);
i1=i1*c1[v1]+(1).pm();
i2=i2*c1[v1]+(1).pm();
var p=[i1,i2];
var h=[a+t1[v1],t3[v3]+'\\frac{'+b+'}{\\pi}x',c].shuffle().join('+');

var t4=(i1).pina(c1[v1])+';'+(i2).pina(c1[v1]);
//var v4=1-(v1==v3);
window.vopr.txt=('Найдите '+t2[v2]+' значение функции $y = '+h+'$ на отрезке $['+t4+']$').plusminus();
var u=p[1*(v1!=v3)]*Math.PI/c1[v1];

window.vopr.ver=[(a*(v1?u.sin():u.cos())+(v3?1:-1)*b*u/Math.PI+c).ts()];

/*
var p=[-a+c,a+c];

var m=sluchch(2,6);
var n=sluchch(m+1,2*m-1);

var g=n.pina(m);
var h=[f.iz()+a+t1.iz(),f[v1]+'\\frac{'+b+'}{\\pi}x',c];
h.shuffle();
h=h.join('+');
var t2=['0;'+g,'-'+g+';0'];
window.vopr.txt=('Найдите '+d[v2]+' значение функции $y = '+h+'$ на отрезке $['+t2[(v1-v2).abs()]+']$').plusminus();

window.vopr.ver=[''+p[v1]];
*/


window.vopr.kat['log']=0;
window.vopr.kat['prz']=1;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();

//Обзад 26698 
//Николай Авдеев
