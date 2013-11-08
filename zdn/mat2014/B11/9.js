(function() {

var a=sluchch(2,9);
for(var c=a;c==a;c=sluchch(2,9));
for(var b=0;b.isZ();b=sluchch(0.1,4.9,0.1));
var f=sluchch(1,4);
for(var d=f;d==f;d=sluchch(1,4));
var g=sluchch(1,[f,d][[f,d].min()]-1);
(a-1)*(a-2)*(a-4)||(f-=sluchch(1,4));
(c-1)*(c-2)*(c-4)||(d-=sluchch(1,4));
var m=['\\cdot',':    '];
var n=[1,-1];
var p=[];
var v=sluchch(0,1);
p[0]=m[v]+(a*c)+'^{'+((-b-g)*n[v]).ts()+'}';
v=sluchch(0,1);
p[1]=m[v]+a+'^{'+((b+f)*n[v]).ts()+'}';
v=sluchch(0,1);
p[2]=m[v]+c+'^{'+((b+d)*n[v]).ts()+'}';
p.shuffle();
p.toStandart();
y='1'+p.soed();
y=y.replace('1\\cdot','');
window.vopr.txt=('Найдите значение выражения $$'+y+'$$').plusminus();
window.vopr.ver=[''+(a.pow(f-g)*c.pow(d-g))];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=1;
window.vopr.kat['tri']=0;
})();
