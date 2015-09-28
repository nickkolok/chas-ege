'use strict';

var umka;

function zagrUmka(){
	umka=chasStorage.getItem('umka'+nabor.name);
	if(!umka)
		pustUmka();
	if(!umka.vremya)
		umka.vremya=[];
	if(!umka.kvoNaVremya)
		umka.kvoNaVremya=[];
	for(var i=1;i<=nabor.nZad;i++){
		if(!umka.verno[i])
			umka.verno[i]=0;
		if(!umka.vsego[i])
			umka.vsego[i]=0;
		if(!umka.vremya[i])
			umka.vremya[i]=0;
		if(!umka.kvoNaVremya[i])
			umka.kvoNaVremya[i]=0;
	}
}

function pustUmka(){
	umka={
		verno:[].zapslch(0,nabor.nZad,0,0,0),
		vsego:[].zapslch(0,nabor.nZad,0,0,0),
		vremya:[].zapslch(0,nabor.nZad,0,0,0),
		kvoNaVremya:[].zapslch(0,nabor.nZad,0,0,0),
	}
}

function sbrosUmka(a){
	if(confirm('Вы действительно хотите сбросить статистику? Это действие нельзя отменить.')){
		pustUmka();
		sohrUmka();
		if(a && a.isFunction)
			a();
	}
}

function sohrUmka(){
	chasStorage.setItem('umka'+nabor.name,umka);
}

console.log('umka.js отработал');
