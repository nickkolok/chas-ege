(function() {

var a=sklonlxkand(NLsets.goods.iz());
var td='</td><td>';
var tr='</td></tr><tr><td>';
var b=sluchch(0,2);
var c=['самую высокую оценку','самую низкую оценку','разницу между самой высокой и самой низкой оценкой'];
var d='Некоторая организация оценивает модели '+a.rm+', при этом учитывается ';
var f = NLsets.alphabets.english.getRandomItems(6);
var g = NLsets.alphabets.russian.getRandomItems(3);
var m=[[],[],[]];
var n=[0,0,0];
var p=sluchch(4,10);
var q=[].zapslch(0,4,2,4);
var r=[20,25,50,100].iz();
var i=0;
var j=0;
for(i=0;i<3;i++){
	for(j=0;j<5;j++){
		m[i][j]=sluchch(1,p);
		n[i]+=m[i][j]*q[j];
	}
}

var s;
switch (b){
	case 0:{s=Math.max(n[0],n[1],n[2])/r};break;
	case 1:{s=Math.min(n[0],n[1],n[2])/r};break;
	case 2:{s=(Math.max(n[0],n[1],n[2])-Math.min(n[0],n[1],n[2]))/r};break;
	
}
var t=sluchiz(window.kachestva.ie,5);
window.vopr.txt=d+t[0]+' '+f[0]+', '+t[1]+' '+f[1]+', '+t[2]+' '+f[2]+', '+t[3]+' '+f[3]+' и '+t[4]+' '+f[4]+'.';
window.vopr.txt+=' Каждый показатель оценивается по '+p+'-балльной шкале.';
window.vopr.txt+=' Оценка '+f[5]+' вычисляется по формуле:';
window.vopr.txt+='$$'+f[5]+'=\\frac{'+q[0]+f[0]+'+'+q[1]+f[1]+'+'+q[2]+f[2]+'+'+q[3]+f[3]+'+'+q[4]+f[4]+'}{'+r+'}'+'$$';
window.vopr.txt+='<br/>В таблице даны значения каждого показателя для трёх моделей '+a.rm+'.';
window.vopr.txt+=' Определите '+c[b]+' среди представленных моделей.';
window.vopr.txt+='<br/><br/><table style="text-align:center;font:inherit;" border=1><tr><td>Модели '+a.rm+td+t[0].toZagl()+td+t[1].toZagl()+td+t[2].toZagl()+td+t[3].toZagl()+td+t[4].toZagl()+tr;
for(i=0;i<3;i++){
	window.vopr.txt+=g[i]+td+m[i][0]+td+m[i][1]+td+m[i][2]+td+m[i][3]+td+m[i][4];
	if(i<2){window.vopr.txt+=tr;};
}
window.vopr.txt+='</td></tr></table>';
window.vopr.ver=[s.ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
