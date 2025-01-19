(function(){'use strict';

var c=[0.1,0.2,0.25,0.5].iz();
var x=sl(-10,10,0.1);
var b=c-x;
var a=(1/c).ts();

var fn=fn_zadan({
	slag:[a+'x','-\\ln(x+'+b.ts()+')'],
	minx:x,
});

window.vopr.text=fn.txt;
window.vopr.correctAnswers=[fn.ver];

window.vopr.categories['log']=1;
window.vopr.categories['prz']=1;
window.vopr.categories['drs']=0;
window.vopr.categories['tri']=1;
})();

//Обзад 26694 26695 26696 26697
//Николай Авдеев
