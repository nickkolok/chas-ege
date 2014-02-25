(function(){'use strict';

var a=[];

for(var i=0;i<3;i++){
	a[i]=[];
	for(var j=0;j<3;j++){
		a[i][j]=new Complex(sl(4),sl(2));
	}
}

var det=new Complex().sum(
	a[1][1].umn(a[2][2],a[2][0]),
	a[1][2].umn(a[2][0],a[0][1]),
	a[2][1].umn(a[0][2],a[1][0]),
	a[1][0].umn(a[2][2],a[0][1]).minus(),
	a[1][2].umn(a[2][1],a[0][0]).minus(),
	a[1][1].umn(a[2][0],a[0][2]).minus()
);

window.vopr.ver=[det];
window.vopr.txt='Вычислите: $$\\left|'+a.matrixToTex()+'\\right|$$';

})();
