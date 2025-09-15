'use strict';

var nastr={};//Глобальный объект с настройками
nastr.nabor=nabor;

// Глобальный объект для отладочных параметров
window.parsedJSON = {};

try{
	var decodedJSON=document.location.hash.decodeURIComponent();
	document.location.hash=decodedJSON;
	var parsedJSON=JSON.parse(decodedJSON.substr(1));
	
	if(parsedJSON.isString)
		nastr.previousHash='#'+parsedJSON;
	else{
		nastr.nabor.importFrom(parsedJSON.nabor);
		for (var key in parsedJSON) {
			if (key !== 'nabor' && key !== 'style') {
				window.parsedJSON[key] = parsedJSON[key];
			}
		}
	}
}catch(e){
	console.log('Не удалось выделить настройки из адреса страницы.');
}
try {
	var searchParams = new URLSearchParams(window.location.search);
	if (searchParams.has('filepath') || searchParams.has('file') || searchParams.has('template') || 
		searchParams.has('autorun') || searchParams.has('alwaysShowAnswer')) {
		
		window.parsedJSON.filepath = searchParams.get('filepath') || searchParams.get('file') || searchParams.get('template');
		window.parsedJSON.autorun = searchParams.get('autorun');
		window.parsedJSON.alwaysShowAnswer = searchParams.get('alwaysShowAnswer');
		window.parsedJSON.lite = true; // Автоматически включаем lite режим
	}
} catch (e) {
	console.log('Не удалось парсить query параметры:', e);
}

var previousHeight=-1;
var previousWidth=-1;

function podgonIframeHeight(){
	if(window.parsedJSON.iframe){
		var h=getDocHeight();
		if(h!=previousHeight){
			previousHeight=h;
			var ifrh=[];
			ifrh[parsedJSON.iframe.nomer]=h;
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

function parseMessageInIframe(mes){
	if(!mes.data.chasMessage)
		return;
	var ifr=mes.data.chasMessage.iframeWidth;
	if(ifr<900 && ifr!=previousWidth && !self.location.href.match(/mini\.html/)){
		document.body.style.zoom=ifr/900;
		previousWidth=ifr;
		console.log(ifr);
	}
}

try{
	if(window!=top){
		$(setInterval(podgonIframeHeight,256));
		window.addEventListener("message",parseMessageInIframe,false);
	}
}catch(e){}

if(chas.naborRequired){
	if(nabor.zagol)
		addscript(nabor.zagol,'$(function(){zagr(nabor.adres+\'upak.js\')});');
	else
		addscript(nabor.adres+'upak.js');
}

console.log('urljson.js отработал');
