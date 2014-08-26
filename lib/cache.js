'use strict';
try{
	var cashdiv=document.createElement('div');
	cashdiv.style.top='-9999px';
	cashdiv.style.position='absolute';
	cashdiv.style.display='none';
	document.body.appendChild(cashdiv);
	cashdiv.innerHTML='$'+'0123456789=+-\\cdot'+latbukv.soed()+'\\in'+
		latbukv.soed().toLowerCase()+'\\sin\\cos\\ln\\log\\lg 2'+
		'\\def\\tg{\\mathrm{tg~}}'+
		'\\def\\ctg{\\mathrm{ctg~}}'+
		'$';
$(window).load(function(){
	if(!window.mjConfig)
		window.mjConfig='TeX-AMS_HTML-full';
	chas.libs.fileMathJax='MathJax.js?config='+mjConfig+'&locale=ru';
	if(svinta || chas.mode.offline){
		zagr(chas.libs. localMathJax+chas.libs.fileMathJax);
	}else{
		zagr(chas.libs.remoteMathJax+chas.libs.fileMathJax);
	}
});
console.log('cache.js отработал');
}catch(e){
console.log('cache.js завершился с ошибкой');
console.log(e);
}
