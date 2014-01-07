(function() {


var a=sluchiz([100,200,250,400,500,1000,2000])[0];
var b=sluchch(2,20);
var v1=sluchch(1);
var v2=sluchch(1);
var c=(v1?b:a-b)/a;
var d=v2?a-b:b;
var f=sluchch(om.tovary.ie.length-1);
var t1=v1?'имеет дефекты':'не имеет дефектов';
window.vopr.txt='В среднем из '+a+' '+om.tovary.rm[f]+', поступивших в продажу, '+
				d+' '+(v2?'не ':'')+chislit(d,'имеет','имеют','имеют')+' дефект'+(!v2?'ы':'ов')+
				'. Найдите вероятность того, что один случайным образом выбранный экземпляр товара '+t1+'.';
window.vopr.ver=[''+c.ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
