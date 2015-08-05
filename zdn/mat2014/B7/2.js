(function(){'use strict';

var a=sluchch(2,9);
var b=sluchch(1,100).pm();
var c=sluchch(0,4);
var v=sl1();
var d=(v?'+':'-');
var znak=(v?1:(-1));
var x=(a.pow(c)-b)*znak;

chas2.task.setEquationTask({
	parts: ['\\log_{'+a+'}{('+b+d+'x)}', c],
	roots: x,
	enablePartsSubtraction: 1,
},{
	tags: {log:1},
	analys: 'Представим число в правой части уравнения $$\\log_{'+a+'}{('+b+d+'x)}='+c+'$$ как логарифм по основанию '+a+':'+
		'$$\\log_{'+a+'}{('+b+d+'x)}=\\log_{'+a+'}{'+a.pow(c)+'}$$'+
		'Основания логарифмов равны, приравняем аргументы:'+
		'$$'+b+d+'x='+a.pow(c)+'$$'+
		'Отсюда '+
		'$$'+d.esli(!v)+'x='+(a.pow(c)-b).ts()+'$$'+
		('$$x='+d+(a.pow(c)-b).ts()+'$$').esli(!v),
});
})();
