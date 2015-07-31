(function(){'use strict';
	
var d1=sluchch(1,10);
var d2=sluchch(20,28);
var n=[].N(d2);
var b1=[].zapslch(d1,d2,0,7);
var b2=[].zapslch(d1,d2,0,7);
n.splice(0,d1-1);
b1.splice(0,d1);
b2.splice(0,d1);
var n0=n.slice();
n0.dopFixedLess(3);
var a=[n,b1].T();
var a2=[n,b2].T();
var t3=om.rusbukv.sluchiz(2);

var v=sluchch(4);

var ny=[].N(7);
ny.unshift(0);
ny.dopFixedLess(3);

var i=0;
var ur=b1.udFunc(function(p1){return p1==b2[i++]});
i=0;
var ub=b1.udFunc(function(p1){return p1>b2[i++]});

var t1=['больше'	,'не меньше'	,'меньше'		,'не больше'	];
var p1=[ub			,ub+ur			,b1.length-ub-ur,b1.length-ub	];
var v1=sluchch(3);

NAtask.setTask({
	text: 'На рисунке жирными точками показано суточное количество осадков, выпадавших в городах ' +t3[0]+' и '+t3[1]+' с '+d1+
		' по '+d2+' '+om.mesiacy.re.iz()+' '+sluchch(1950,2013)+' года. По горизонтали указываются числа месяца, по вертикали '+
		'— количество осадков, выпавших в соответствующий день, в миллиметрах. Для наглядности жирные точки на рисунке'+
		' соединены линией. Определите по рисунку, сколько дней в '+t3[0]+' выпадало осадков '+t1[v1]+', чем в '+t3[1]+'.',
	answers: p1[v1],
});
NAtask.modifiers.addJqplot({
	dataArray: [a,a2],
	options: {
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
		},
		legend:{
			show:true,
			location:'se',
		},
		series:[
			{label:t3[0],color:"#ccc",shadowAlpha:0},
			{label:t3[1],color:"#111",shadowAlpha:0},
		],
	},
});
})();
