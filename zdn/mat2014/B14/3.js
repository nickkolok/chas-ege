(function() {

var t1=sluchch(om.transportm.ie.length-1);
var t2 = NLsets.alphabets.english.getRandomItems(2);
var v3=sluchch(1);
var t3=['Первый','Второй'];
var t4=['первого','второго'];
var t5=['c первым','co вторым'];

var a;
var b;
var x1=2.5;
var x2;
for(;!x1.isZ();){
	a=-sluchch(1,100);
	b=sluchch(1,100);
	x2=((a*a+b*b+6*a*b).sqrt()-a+b)/2;
	x1=(-(a*a+b*b+6*a*b).sqrt()-a+b)/2;
}
var v7=sluchch(1);
var t7=['меньше','больше'];
var m7=[x1,x2];

var t6=['со скоростью '+b+' км/ч','со скоростью, на '+(-a)+' км/ч меньшей скорости '+t4[v3]].shuffle();
window.vopr.txt='Из пункта '+t2[0]+' в пункт '+t2[1]+' одновременно выехали два '+om.transportm.r2[t1]+
				'. '+t3[v3]+' проехал с постоянной скоростью весь путь. '+t3[1-v3]+
				' проехал первую половину пути '+t6[0]+', а вторую половину пути — '+t6[1]+', в результате чего прибыл в пункт '+t2[1]+' одновременно '+
				t5[v3]+' '+om.transportm.te[t1]+'. Найдите скорость '+t4[v3]+' '+om.transportm.re[t1]+
				', если известно, что она '+t7[v7]+' '+sluchch(x1+1,x2-1,0.1).ts()+'. Ответ дайте в км/ч.';


window.vopr.ver=[m7[v7].ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
