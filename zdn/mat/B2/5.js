(function() {
	
var d1=sluchch(1,10);
var d2=sluchch(20,28);
var n=[].N(d2);
var b=[].zapslch(d1,d2,0,7,0.5);
n.splice(0,d1-1);
b.splice(0,d1);
var n0=n.slice();
n0.dopFixedLess(3);
var a=[n,b].T();


var v=sluchch(d2-d1);//Какой день рассматриваем
console.log(1);

var g=[	
		'какого числа был впервые выпало '+b[v]+' мм осадков',
		'какого числа был в последний раз выпало '+b[v]+' мм осадков',
		'какого числа впервые выпало максимальное количество осадков',
		'какого числа в последний раз выпало максимальное количество осадков',
		'сколько дней выпадало ровно '+b[v]+' мм осадков'
		];
		
var p=[
		d1+b.pervSovp(b[v]),
		d1+b.poslSovp(b[v]),
		d1+b.max(1),
		d1+b.max(),
		b.sovp(b[v])
		];

var v=sluchch(4);

var slid=sluchch(0,1000000000);

var ny=[].N(7);
ny.unshift(0);
ny.dopFixedLess(3);

window.vopr.dey=function(){
		$.jqplot('ris'+slid, [a],{
				axes:{
					xaxis:{
						min:d1,
						max:d2,
						ticks:n0,
					},
					yaxis:{
						min:0,
						max:7,
						ticks:ny,
					}
				}
			}
		);
};



window.vopr.txt='<div id="ris'+slid+'" style="text-align:center;height:320px; width:600;" opozn="'+Math.random()+'"></div>';
window.vopr.txt+='На рисунке жирными точками показано суточное количество осадков, выпадавших в '+om.goroda.pe.iz()+
				' с '+d1+' по '+d2+' '+om.mesiacy.re.iz()+' '+sluchch(1950,2013)+' года. По горизонтали указываются числа месяца, по вертикали — количество '+
				'осадков, выпавших в соответствующий день, в миллиметрах. Для наглядности жирные точки на рисунке'+
				' соединены линией. Определите по рисунку, '+g[v]+'.';
window.vopr.ver=[''+p[v]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
