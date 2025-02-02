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

function assertCheckability(){
	if(nabor.notCheckable){
		alert("Загруженный набор заданий не предназначен для проверки компьютером. "+
			  "Рекомендуется переключиться в тест на печать или каталог заданий.","Предупреждение");
	}
}

var strNabor='';
var nabor={}; // Глобальная переменная, отвечающая за выбор предмета
nabor.zagol='';
nabor.mnogostrOtvet=0;
nabor.importFrom({
	nZad:11,
	adres:'../zdn/matege2024p/',
	name:'matege2024p',
	prefix:'',
	scheduler:'main',
	preferences:{},
});
nabor.kat={
	prz:'Без производной'		,
	log:'Без логарифмов'		,
	tri:'Без тригонометрии'		,
	drs:'Без дробных степеней'	,
};

nabor.vykl=[];
nabor.altz=[];

readNabor(document.location.href);

console.log('core_nabor.js отработал');
