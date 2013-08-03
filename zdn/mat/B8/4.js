(function() {

var p;
for(p=-1;p<0;){
	var t=sluchch(1,10);
	var v1=sluchch(3,6);
	var m=[];
	for(var i=0;i<v1;i++){
		m[i]={ch:sluchch(-10,10),zn:(t.pow((i-2).polozh())*10).sluchDel()};
	}
	var n=m.mn_proizv();
	p=n.mn_vychisl(t);
}

console.log(m);
console.log(n);
window.vopr.txt=(
				'Материальная точка движется прямолинейно по закону $x(t)='+m.mn_txt('t')+'$, где x — расстояние от точки отсчета в метрах, t — время в секундах, измеренное с начала движения. Найдите ее скорость (в метрах в секунду) в момент времени t='+t+' с.'
				).plusminus();
window.vopr.ver=[p.ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
