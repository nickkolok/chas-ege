'use strict';
/*Функции, затрагивающие DOM, но не использующие jquery и другие внешние библиотеки*/

document.writeln=function(p1){
	return document.write(p1+'<br/>');
}

function escapeFromIframe(){
/**"Выпрыгивание" из iframe*/
	if(top.location.href!=document.location.href)
		top.location.href=document.location.href;
}

function getDocHeight(){
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}//Вроде как отсюда: http://james.padolsey.com/javascript/get-document-height-cross-browser/

function catchTab(elem,key){
	if(key.keyCode==9){
		var n=elem.scrollTop;
		var val=elem.value;
		var sel=elem.selectionStart;
		var rep=val.substr(elem.selectionStart-1,elem.selectionEnd-elem.selectionStart);
		if(rep.match(/[\n\r]/)){
			console.log(rep);
			rep=rep.replace(/[\n](?![\n\r])/g,'\n\t');
			rep=rep.replace(/[\r](?![\n\r])/g,'\r\t');
			elem.value=val.substr(0,sel-1)+rep+val.substr(elem.selectionEnd-1);
		}else{
			elem.value=val.substr(0,sel)+'\t'+val.substr(elem.selectionEnd);
			elem.selectionStart=elem.selectionEnd=sel+1;
		}
		elem.scrollTop=n;
		return false;
	}
}

function linkSpan(link,blank)
{
	if(blank)
		window.open(link.replace("_","http://"));
	else
		self.location.replace(link.replace("_","http://"));
}

try {
	global. escapeFromIframe = module.exports. escapeFromIframe = escapeFromIframe ;
	global. getDocHeight = module.exports. getDocHeight = getDocHeight ;
	global. catchTab = module.exports. catchTab = catchTab ;
	global. linkSpan = module.exports. linkSpan = linkSpan ;
} catch (e) {
}
