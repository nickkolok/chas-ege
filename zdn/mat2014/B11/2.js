(function(){'use strict';

var a=slKrome(isPolnKvadr,10,99);
do{
	var b=slKrome(isPolnKvadr,10,99);
}while(b==a);

var c=['+','-'].shuffle();
window.vopr.txt='Найдите значение выражения $$(\\sqrt{'+a+'}'+c[0]+'\\sqrt{'+b+'})(\\sqrt{'+a+'}'+c[1]+'\\sqrt{'+b+'})$$';
window.vopr.ver=[''+(a-b)];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
