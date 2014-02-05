(function(){'use strict';

var a=sluchch(2,9);
var b=sluchch(1,100).pm();
var c=sluchch(0,4);
var v=sl1();
var d=(v?'+':'-');
var znak=(v?1:(-1));
var x=(a.pow(c)-b)*znak;
window.vopr.txt=('Найдите корень уравнения $$\\log_{'+a+'}{('+b+d+'x)}='+c+'$$').plusminus();
window.vopr.ver=[''+x];
window.vopr.rsh='Представим число в правой части как логарифм по основанию '+a+':'+
	('$$\\log_{'+a+'}{('+b+d+'x)}=\\log_{'+a+'}{'+a.pow(c)+'}$$').plusminus()+
	'Основания логарифмов равны, приравняем аргументы:'+
	('$$'+b+d+'x='+a.pow(c)+'$$').plusminus()+
	'Отсюда '+
	('$$'+d.esli(!v)+'x='+(a.pow(c)-b).ts()+'$$').plusminus()+
	('$$x='+d+(a.pow(c)-b).ts()+'$$').esli(!v).plusminus();

window.vopr.kat['log']=1;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
