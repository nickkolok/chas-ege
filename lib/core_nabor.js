'use strict';

function readNabor(str){
//Строка вида favorgems.ru/sh/sluch.html#nabor&nZad=14&adres=..zdn/mat/
	var a=str.split('#nabor')[1];
	strNabor='##nabor'+a;
	if(a==undefined)
		return;
	var b=a.split('&');
	b.splice(0,1);//Первый элемент - пустой
	b.map(function(p1){
		var c=p1.split('=');
		nabor[c[0]]=c[1];
	});
}

var strNabor='';
var nabor={}; // Глобальная переменная, отвечающая за выбор предмета
nabor.nZad=15;
nabor.adres='../zdn/mat2014/';
nabor.prefix='B';
nabor.name='ege2014';
nabor.zagol='';
nabor.kat={
	prz:'Без производной'		,
	log:'Без логарифмов'		,
	tri:'Без тригонометрии'		,
	drs:'Без дробных степеней'	,
};
readNabor(document.location.href);

console.log('core_nabor.js отработал');
