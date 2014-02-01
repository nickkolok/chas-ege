'use strict';
try{
$(window).load(function(){
	if(!window.mjConfig)
		window.mjConfig='TeX-AMS_HTML-full';
	if(svinta){
		zagr('../ext/mathjax/MathJax.js?config='+mjConfig+'&locale=ru');
	}else{
		zagr('https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config='+mjConfig+'&locale=ru');
	}

	$(window).load(function(){
		var cashdiv=document.createElement('div');
		cashdiv.style.top='-9999px';
		cashdiv.style.position='absolute';
		document.body.appendChild(cashdiv);
		cashdiv.innerHTML='$'+'0123456789=+-e'+latbukv.soed()+'\\in'+
			latbukv.soed().toLowerCase()+'\\sin\\cos\\ln\\log\\lg 2$';
		MathJax.Hub.Typeset();
	});
});
console.log('cache.js отработал');
}catch(e){
console.log('cache.js завершился с ошибкой');
console.log(e);
}
