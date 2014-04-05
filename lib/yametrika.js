'use strict';
try{
	if(egeok){
		document.referrer=document.referrer.replace('ege-ok.ru','ege_ok.referrer');
	}
}catch(e){}

var referrer=egeok?document.referrer.replace('ege-ok.ru','ege_ok.referrer'):document.referrer;

try{
//$(function(){
	if(!svinta){
//		var ymdiv=document.createElement('div');
//		ymdiv.style.top='-9999px';
//		ymdiv.style.position='absolute';
//		document.body.appendChild(ymdiv);
		var h='';
		if(!egeok)
			h=('<!-- Yandex.Metrika counter -->'+
			'<script type="text/javascript">'+
			'(function (d, w, c) { (w[c] = w[c] || []).push(function() {'+
			' try { w.yaCounter22534447 = new Ya.Metrika({id:22534447, clickmap:true, trackLinks:true, accurateTrackBounce:true, trackHash:true}); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script>'+
			'<noscript><div><img src="//mc.yandex.ru/watch/22534447" style="position:absolute; left:-9999px;" alt="" /></div></noscript>'+
			'<!-- /Yandex.Metrika counter -->');
		h+=('<!--LiveInternet counter--><script type="text/javascript">'+
		'document.write("<a href=\'http://www.liveinternet.ru/click\' target=_blank>'+
		'<img src=\'//counter.yadro.ru/hit?t22.6;r" + escape(referrer) + ((typeof(screen)=="undefined")?"":";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?screen.colorDepth:screen.pixelDepth)) +'+
		' ";u" + escape(document.URL) +";h"+escape(document.title.substring(0,80)) +'+
		'  ";" + Math.random() + "\' border=0 width=88 height=31 alt=\'\' '+
		'title=\'LiveInternet: показано число просмотров за 24 часа, посетителей за 24 часа и за сегодня\'>'+
		'<\/a>")</script><!--/LiveInternet-->');
//		if(!(document.location.href.search('/sh/')+1)
			document.write(h.vTag('div','hidden style="display:none;position:absolute;top:-9999px;"'));
//		ymdiv.innerHTML=h;
//		console.log('Счётчики добавлены');
	}
//});
console.log('yametrika.js отработал');
}catch(e){
console.log('yametrika.js завершился с ошибкой');
console.log(e);
}
