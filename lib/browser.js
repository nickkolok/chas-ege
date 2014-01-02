var bIE=0;
var bOpera=0;
var bApple=0;
var bGecko=0;
var strBrowser;
if (!"\v1") {
	bIE=1;
	strBrowser='"MS Internet Explorer", жёстко привязанный к закрытой ОС "Microsoft Windows"';
}
if (/*@cc_on!@*/0) {
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
	document.write('<center><div id="browser"><font color="red" size="5">Вероятно, Вы используете проприетарный браузер '+strBrowser+'.<br/>  Система "Час ЕГЭ" официально не предназначалась и, скорее всего, не будет предназначаться для работы в проприетарных браузерах.</font><br/>Возможно, некоторые элементы будут работать.<br/><button onclick="$(\'#browser\').remove();" >Свернуть это предупреждение</button></div><div class="predupr">Настоятельно рекомендуем Вам скачать <a href="http://mozilla-russia.org/">Firefox</a> или <a href="https://www.google.com/intl/ru/chrome/browser/">Chrome</a></div></center>');
}

