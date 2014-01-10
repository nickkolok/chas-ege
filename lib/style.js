'use strict';
nastr.style={fon:'#FFFFCC',pan:'pink',menuLinkTarget:"_blank"};//Оформление по умолчанию
if(egeok){//Если с сайта ege-ok.ru, меняем оформление
	nastr.style.fon='white';
	nastr.style.pan='#DED';
}else if(izvk || _4ege){
	nastr.style.fon='#FFF';
	nastr.style.pan='#DDF';
}else if(document.referrer.search(/\/\/edu\.ru/)){
	nastr.style.fon='white';
	nastr.style.menuLinkTarget='_self';
}

try{
	if(parsedJSON){
		nastr.style.importFrom(parsedJSON.style);
	}
}catch(e){};

document.write('<style>');
document.write('body{');
document.write('	background-color:'+nastr.style.fon);
document.write('}');
document.write('#panel, ul.pureCssMenu,ul.pureCssMenu ul, ul.pureCssMenu a, ul.pureCssMenu li.dis a:hover, ul.pureCssMenu li.sep a:hover, ul.pureCssMenu li a.pureCssMenui0{');
document.write('	background-color:'+nastr.style.pan);
document.write('}');
document.write('ul.pureCssMenu li:hover>a, ul.pureCssMenu li a:hover, ul.pureCssMenu li a.pureCssMenui0:hover, ul.pureCssMenu li.dis a:hover, ul.pureCssMenu li.sep a:hover {');
document.write('	background-color:'+nastr.style.fon);
document.write('}');
document.write('.anythingSlider .arrow span {');
document.write('	color:'+nastr.style.pan);
document.write('}');
document.write('#sovety, #menucenter{');
document.write("	font:15px bold 'liberation_sans';");
document.write('}');
document.write('</style>');
