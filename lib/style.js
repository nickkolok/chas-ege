'use strict';
var stylestring1="",stylestring2="";
nastr.style={
	menuLinkTarget:"_self",
};//Оформление по умолчанию
if(!window.bootstrapdesign){
	nastr.style.fon='white';
	nastr.style.pan='#e9b96e';
}
if(egeok || (document.referrer.search(/\/\/ege-ok\.ru/)+1)){
	//Если с сайта ege-ok.ru, меняем оформление
	nastr.style.fon='white';
	nastr.style.pan='#DED';
	stylestring1+=('div.egeok{display:block;}');
//	$('.egeok').css('display','auto');
}else if(izvk || _4ege){
	nastr.style.fon='#FFF';
	nastr.style.pan='#DDF';
}else if(document.referrer.search(/\/\/edu\.ru/)+1){
	nastr.style.fon='white';
	nastr.style.menuLinkTarget='_self';
}

try{
	if(parsedJSON){
		nastr.style.importFrom(parsedJSON.style);
	}
}catch(e){};


var style1=document.createElement('style');
stylestring1+=('body, .fon{');
stylestring1+=('	background-color:'+nastr.style.fon+';');
stylestring1+=('}');
stylestring1+=('#prov_knopki, #panel, ul.pureCssMenu,ul.pureCssMenu ul, ul.pureCssMenu a, ul.pureCssMenu li.dis a:hover, ul.pureCssMenu li.sep a:hover, ul.pureCssMenu li a.pureCssMenui0{');
stylestring1+=('	background-color:'+nastr.style.pan+';');
stylestring1+=('}');
stylestring1+=('ul.pureCssMenu li:hover>a, ul.pureCssMenu li a:hover, ul.pureCssMenu li a.pureCssMenui0:hover, ul.pureCssMenu li.dis a:hover, ul.pureCssMenu li.sep a:hover {');
stylestring1+=('	background-color:'+nastr.style.fon+';');
stylestring1+=('}');
stylestring1+=('.anythingSlider .arrow span {');
stylestring1+=('	color:'+nastr.style.pan+';');
stylestring1+=('}');
stylestring1+=('#inf {');
stylestring1+=('	border: 2px ridge'+nastr.style.pan+';');
stylestring1+=('	border-top:none;');
stylestring1+=('}');
stylestring1+=('#sovety{');
stylestring1+=("	font:13.5px bold;");
stylestring1+=("	font-family:'liberation_sans';");
stylestring1+=('}');
stylestring1+=('#menucenter{');
stylestring1+=("	font:14px bold;");
stylestring1+=("	font-family:'liberation_sans';");
stylestring1+=('}');

style1.innerHTML=stylestring1;

var style2=document.createElement('style');
style2.id="imported";

try{
	stylestring2+=(''+(nastr.style.strCSS).neutralizeXSS());
}catch(e){}
style2.innerHTML=stylestring2;

document.getElementById("document-write").appendChild(style1);
document.getElementById("document-write").appendChild(style2);

/*
$(document).ready(function() {
	$("body").append("<link rel='stylesheet' type='text/css' href='../ext/fonts/stylesheet.css' />");
});
*/
