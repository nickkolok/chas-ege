'use strict';
try{
	var cashdiv=document.createElement('div');
	cashdiv.style.top='-9999px';
	cashdiv.style.position='absolute';
	cashdiv.style.display='none';
	document.body.appendChild(cashdiv);
	var generateFunctions = "";
	var nameFunctions = [
		'tg',
		'ctg',
		'sec',
		'cosec',
		'arctg',
		'arcctg',
		'arcsec',
		'arccosec',
		'arcsin',
		'arccos',
		'sh',
		'ch',
		'th',
		'cth',
		'sech',
		'csch',
		'arsh',
		'arch',
		'arth',
		'arcth',
		'arsch',
		'arcsch',
	];
	for (var i = 0; i < nameFunctions.length; i++) {
		generateFunctions += '\\def\\' + nameFunctions[i] + '{\\operatorname{' + nameFunctions[i] + '}}';
	}
	cashdiv.innerHTML = '$' + '0123456789=+-\\cdot' + latbukv.soed() + '\\in' + latbukv.soed().toLowerCase() + '\\sin\\cos\\ln\\log\\lg 2' + generateFunctions + '$';
$(window).load(function(){
	if(!window.mjConfig)
		window.mjConfig='TeX-AMS_HTML-full';
	chas.libs.fileMathJax='MathJax.js?config='+mjConfig+'&locale=ru';
	if(chas.mode.svinta || chas.mode.offline){
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
