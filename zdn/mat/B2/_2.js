(function() {
	
var a=sluchch(8,12);
var b=[].N(a);

var c=[].zapslch(0,a-1,-10,25);
var d2=c.maxE()+1;
var d1=c.minE()-2;
var a1=sluchch(c.minE()+1,c.maxE()-2);
var a2=sluchch(a1,c.maxE());
d=om.strany.ie.sluchiz(a);
f=[b,c,d].T();
f.shuffle();
var h=f.T()[2];
f=f.T();
f=[[].N(a),f[1]];
f=f.T();

var slid=sluchch(0,1000000000);
var ny=[].N(d2);
ny.splice(0,d1);
ny=[ny,ny.toFixedLess(3)].T();

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
						min:d1,
						max:d2,
						ticks:ny,
					}
				},
				seriesDefaults: {
					renderer: $.jqplot.BarRenderer,
					rendererOptions: { barMargin: 15 },
				}
			}
		);
};


var t1=['превышает '+a1		,'не превышает '+a1	,'ниже '+a2			,'не ниже '+a2			,'находится между '+a1+' и '+a2+' (включительно)'];
var p1=[c.kolvoMzhd(a1,100)	,c.kolvoMzhd(0,a1,1),c.kolvoMzhd(0,a2)	,c.kolvoMzhd(a2,100,1)	,c.kolvoMzhd(a1,a2,1)		];
var v1=sluchch(4);
window.vopr.txt='<div id="ris'+slid+'" style="text-align:center;height:320px; width:970;" opozn="'+Math.random()+'"></div>';
window.vopr.txt+='На диаграмме показан уровень подоходного налога в '+a+' странах мира (в процентах), предлагаемый '+
				'некоей программой по преодолению Всемирного Экономического Кризиса. По горизонтали указана страна, по '+
				'вертикали — уровень подоходного налога в процентах. '+
				'Определите, в скольких из перечисленных государств уровень подоходного налога '+t1[v1]+'.';

window.vopr.ver=[''+p1[v1]];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
