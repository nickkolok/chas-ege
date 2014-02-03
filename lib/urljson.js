'use strict';

var nastr={};//Глобальный объект с настройками
nastr.nabor=nabor;

try{
	var decodedJSON=document.location.hash.decodeURIComponent();
	document.location.hash=decodedJSON;
	var parsedJSON=JSON.parse(decodedJSON.substr(1));
	
	if(parsedJSON.isString)
		nastr.previousHash='#'+parsedJSON;
	else{
		nastr.nabor.importFrom(parsedJSON.nabor);
	}
}catch(e){
	console.log('Не удалось выделить настройки из адреса страницы.');
}

var previousHeight=-1;

function podgonIframeHeight(){
	if(window.parsedJSON.iframe){
		var h=getDocHeight();
		if(h!=previousHeight){
			previousHeight=h;
			var ifrh=[];
			ifrh[parsedJSON.iframe.nomer]=h
			parent.postMessage(
			{
				chasMessage:{
					iframeHeight:ifrh,
				},
			}
			,'*');
		}
	}
}


try{
	if(window!=top){
		$(setInterval(podgonIframeHeight,256));
	}
}catch(e){}

addscript(nabor.adres+'upak.js');
if(nabor.zagol)
	addscript(nabor.zagol,'$(function(){zagr(nabor.adres+\'upak.js\')});');
