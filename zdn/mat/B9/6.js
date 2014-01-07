(function(){'use strict';

var A={};
var B={};
var C={};
var D={};
var p=0;
var d=[];
var g='';
for(;!p
		||(g.ie=='четырёхугольник')&&sluchch(0,2000)
		||(g.ie=='трапеция')&&sluchch(0,100)
		||(g.ie=='дельтоид')&&sluchch(0,25)
		||(g.ie=='параллелограмм')&&sluchch(0,50)
	;){
	A.x=sluchch(1,16);
	A.y=sluchch(1,16);
	B.x=sluchch(1,16);
	B.y=sluchch(1,16);
	C.x=sluchch(1,16);
	C.y=sluchch(1,16);
	D.x=sluchch(1,16);
	D.y=sluchch(1,16);
	d=[A,B,C,D];
	p=d.mt_isMnug(4);
	g=d.mt_imen4ug();
}
p=d.mt_s4ug();

window.vopr.txt='Найдите площадь '+g.re+' с вершинами, имеющими координаты '+d.mt_join()+'.';
window.vopr.ver=[p.ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;

})();
