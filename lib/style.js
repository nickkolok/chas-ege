var fon='#FFFFCC';
var pan='pink';
if(egeok){//Если с сайта ege-ok.ru, меняем дизайн
	fon='white';
	pan='#DED';
}else if(izvk || _4ege){
	fon='#FFF';
	pan='#DDF';
}

document.write('<style>');
document.write('body{');
document.write('	background-color:'+fon);
document.write('}');
document.write('#panel, ul.pureCssMenu,ul.pureCssMenu ul, ul.pureCssMenu a, ul.pureCssMenu li.dis a:hover, ul.pureCssMenu li.sep a:hover, ul.pureCssMenu li a.pureCssMenui0{');
document.write('	background-color:'+pan);
document.write('}');
document.write('ul.pureCssMenu li:hover>a, ul.pureCssMenu li a:hover, ul.pureCssMenu li a.pureCssMenui0:hover, ul.pureCssMenu li.dis a:hover, ul.pureCssMenu li.sep a:hover {');
document.write('	background-color:'+fon);
document.write('}');
document.write('.anythingSlider .arrow span {');
document.write('	color:'+pan);
document.write('}');
document.write('#sovety, #menucenter{');
document.write("	font:15px bold 'liberation_sans';");
document.write('}');
document.write('</style>');
