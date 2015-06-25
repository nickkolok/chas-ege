function docFromCode(fun,nzv){
if(!fun.isFunction)
		return '';
	return '<div style="overflow:hidden;border:solid gray 1px;">'+
		(nzv+fun.attr()).vTag('div','style="height:100%;font-weight:bold;min-width:12em;font-size:120%;float:left;"')+' '+
		fun.codeComment().replace(/[\n\r]/g,'<br/>').vTag('span')+
		'<button class="spoiler-show">Показать код</button>'+
		'<button class="spoiler-hide">Скрыть код</button>'+
		'<div class="spoiler-body">'+
		fun.toStr().
		replace(/>/g,'&gt;').replace(/</g,'&lt;').
		vTag('pre').vTag('tt')+
		'</div>'+
		'</div>';
}
	function docdiv(spisok,nazv){
	var rez='';
	for(var chto in spisok)
		rez+=docFromCode(spisok[chto],chto);
	$(nazv).html(rez);
}
docdiv(docsFunction	,'#divFunction'	);
docdiv(docsArray	,'#divArray'	);
docdiv(docsNumber	,'#divNumber'	);
docdiv(docsString	,'#divString'	);
spoiler();
