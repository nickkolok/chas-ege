(function() {

for(var t=0.5;!t.isZ();){
	var a=sl(10,20);
	var b=sl(a+1,110);
	var s=sl(b,990);
	var t=60*s*(b-a)/a/b;
}

var t1=[].N(om.transportm.ie.length-1).sluchiz(2);
var t3=[om.transportm.ie[t1[0]],om.transportm.ie[t1[1]]];
var t4=[om.transportm.re[t1[0]],om.transportm.re[t1[1]]];

window.vopr.txt='Из пункта A в пункт B, расстояние между которыми '+s+' км, одновременно выехали '
				+t3[0]+' и '+t3[1]+
				'. Известно, что в час '+t3[0]+' проезжает на '+(b-a).abs()+' км '
				+(b-a>0?'меньше':'больше')+', чем '+t3[1]+
				'. Определите скорость '+t4[0]+', если известно, что он прибыл в пункт B на '+t.toChMin()+
				' '+(b-a>0?'позже':'раньше')+' '+t4[1]+'. Ответ дайте в км/ч.';

window.vopr.ver=[a.ts()];

chas2.task.modifiers.variativeABC();
})();
