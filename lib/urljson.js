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

function podgonIframeHeight(){
	if(window.parsedJSON.iframe){
		if(!bGecko)
			window.name='ih'+parsedJSON.iframe.nomer+':'+((getDocHeight()/200).ceil()*200).ts();
		else
			window.name='JSON'+JSON.stringify({nomer:parsedJSON.iframe.nomer,height:getDocHeight()});
	}
//	window.name='ih'+parsedJSON.iframe.nomer+':'+(getDocHeight()+150);
//	console.log(window.name);
//	setTimeout(podgonIframeHeight,1000);
}


try{
	if(window!=top && parsedJSON)
		$(podgonIframeHeight);
}catch(e){}

addscript(nabor.adres+'upak.js');
if(nabor.zagol)
	addscript(nabor.zagol,'$(function(){zagr(nabor.adres+\'upak.js\')});');
