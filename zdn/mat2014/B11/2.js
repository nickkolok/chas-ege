(function(){'use strict';

var a=slKrome(isPolnKvadr,10,99);
do{
	var b=slKrome(isPolnKvadr,10,99);
}while(b==a);

var c=['+','-'].shuffle();
window.vopr.text='Найдите значение выражения $$(\\sqrt{'+a+'}'+c[0]+'\\sqrt{'+b+'})(\\sqrt{'+a+'}'+c[1]+'\\sqrt{'+b+'})$$';
window.vopr.correctAnswers=[''+(a-b)];

window.vopr.categories['log']=0;
window.vopr.categories['prz']=0;
window.vopr.categories['drs']=0;
window.vopr.categories['tri']=0;
})();
