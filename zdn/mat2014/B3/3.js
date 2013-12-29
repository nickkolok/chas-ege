(function(){'use strict';
	
var a=sluchch(8,12);
var b=[].N(a);
b=b.map(function(p1){return om.porchisl[p1].i[2];});
var c=[].zapMonot(a,20*a,-20,-10);
var d2=20*a;
var d1=c.minE();
var d=om.strany.ie.sluchiz(a);
var m1=d[0];
var m2=d[a-1];
var f=[b,c,d].T();
f.shuffle();
var h=f.T()[2];
f=f.T();
f=[[].N(a),f[1]];
f=f.T();
var g=sluchch(1,a-2);

var slid=sl(1000000000);

window.vopr.dey=function(){
		$.jqplot('ris'+slid, [f],{
				axes:{
					xaxis:{
						min:1,
						max:a,
						ticks:h,
						renderer:$.jqplot.CategoryAxisRenderer,
					},
					yaxis:{
						min:d1-10,
						max:d2+10,
					}
				},
				seriesDefaults: {
					renderer: $.jqplot.BarRenderer,
					rendererOptions: { barMargin: 15 },
				}
			}
		);
};

var t1=om.metally.re.iz();
window.vopr.txt='<div id="ris'+slid+'" style="text-align:center;height:320px; width:970;" opozn="'+Math.random()+'"></div>';
window.vopr.txt+='На диаграмме показано распределение выплавки '+t1+' в '+a+' странах мира (в тысячах тонн) за некоторый '+
				'период. Среди представленных стран первое место по выплавке '+t1+' занимает '+m1+', '+om.porchisl[a].i[2]+' место — '+
				m2+'. Какое место занимает '+d[g]+'?';

window.vopr.ver=[''+(g+1)];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
