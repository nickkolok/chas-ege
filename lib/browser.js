'use strict';

var bIE=0;
var bOpera=0;
var bApple=0;
var bGecko=0;
var strBrowser='Chromium-based';
if (!"\v1") {
	bIE=1;
	strBrowser='"MS Internet Explorer", жёстко привязанный к закрытой ОС "Microsoft Windows"';
}
if (/*@cc_on!@*/0) {
	bIE=1;
	strBrowser='"MS Internet Explorer", жёстко привязанный к закрытой ОС "Microsoft Windows"';
}
if (navigator.userAgent.search('Trident')+1) {
	bIE=1;
	strBrowser='"MS Internet Explorer", жёстко привязанный к закрытой ОС "Microsoft Windows"';
}
if (self.opera) {
	bOpera=1;
	strBrowser='"Opera"';
}
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
	strBrowser='устройств "iPhone" или "iPod"';
	bApple=1;
}
if(navigator.userAgent.match('Gecko/')){
	strBrowser='Mozilla Firefox или ему подобный';
	bGecko=1;
}

if(bIE+bOpera+bApple) {
	var strpr='Вероятно, Вы используете проприетарный браузер '+strBrowser;
	if(bIE){
		alert(strpr+
			'\n\rТренажёр правильно работает в браузерах Firefox, Chromium, Google Chrome, Интернет.Mail.Ru и т. д.\n\rВ браузерах Internet Explorer и Opera тренажёр может не работать.');
	}
	document.write('<center><div id="browser"><font color="red" size="5">'+strpr+'.<br/>  Система "Час ЕГЭ" официально не предназначалась и, скорее всего, не будет предназначаться для работы в проприетарных браузерах.</font><br/>Возможно, некоторые элементы будут работать.<br/>'+
		'<button onclick="document.getElementById(\'browser\').innerHTML=\'\';" >Свернуть это предупреждение</button></div>'+
		'<div class="predupr">Настоятельно рекомендуем Вам скачать <a href="http://mozilla-russia.org/">Firefox</a> или <a href="https://www.google.com/intl/ru/chrome/browser/">Chrome</a></div></center>');
}

if(!window.chas)
	window.chas={};

if(bIE){
	chas.integrate=function(){
			document.write('Ваш браузер не поддерживается модулем интеграции.');
	}
}else{
	chas.integratedCount=0;
	chas.integrate=function(href,strn,width,height,predupr){
		if(!height){
			height='1500';
		}
		if(!width){
			width='900';
		}
		if(!strn){
			strn={};
		}
		if(!href){
			href="https://www.math.vsu.ru/chas-ege/sh/sluch.html";
		}
		strn.iframe={nomer:chas.integratedCount,};
		document.write(
			'<iframe'+
				' src="'+href.split('#')[0]+'#'+encodeURIComponent(JSON.stringify(strn))+'"'+
				' width="'+width+'"'+
				' height="'+height+'"'+
				' id="chas-integrated-iframe'+chas.integratedCount+'"'+
			'></iframe>'
		);
		if(predupr)try{
			document.getElementById(predupr).innerHTML='';
		}catch(e){};
		chas.integratedCount++;
	}
	
	chas.parseWindowMessage=function(mes){
		var ifr=mes.data.chasMessage.iframeHeight;
		for(var i=0;i<=chas.integratedCount;i++)
			if(ifr[i])
				document.getElementById('chas-integrated-iframe'+i).height=ifr[i];
	}
	window.addEventListener("message",chas.parseWindowMessage,false);
	
	chas.resizeIframes=function(interval){
		setInterval(chas.resizeIframesOnce,interval);
	}
}
