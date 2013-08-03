(function() {

var a=sluchch(2,90);
var b=sluchch(a+1,99);
var c=sluchch(-99,99);

var m=sluchch(2,6);
var n=sluchch(m+1,2*m-1);
var g=n.pina(m);

var v1=sluchch(1);//v1=0
var v2=sluchch(2);//v2=1;
var v3=sluchch(1);//v3=0;
var t1=['наибольшее','наименьшее'];

var t2=['\\cos x','\\cos x','\\sin x'];
var t3=['-','',['','-'].iz()];

var p=[-a+c,a+c,c];
var h=[/*t3[v1]+*/t3[v2]+a+t2[v2],t3[v3]+b+'x',c].shuffle().join('+');

var t4=['0;'+g,'-'+g+';0'];
var v4=1-(v1==v3);
window.vopr.txt=('Найдите '+t1[v1]+' значение функции $y = '+h+'$ на отрезке $['+t4[v4]+']$').plusminus();

window.vopr.ver=[''+p[v2]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=1;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();

//Обзад 26694 26695 26696 26697 
//Николай Авдеев
