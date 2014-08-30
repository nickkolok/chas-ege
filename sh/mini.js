//Удаляем лишнее
$('#menucenter').remove();
$('#inf').remove();

var slvopr;
function obnov(p1){
	slvopr=p1;
	$('#pole').html(slvopr.txt);
	slvopr.trd();
	MathJax.Hub.Typeset();
}

function sozdat(){
	$('#pole').html('Задание составляется, подождите...');
	try{
		zagr(parsedJSON.mini.src.iz());
	}catch(e){
		$('#pole').text('Не удалось выделить адреса шаблонов.');
		$('#panel').hide();
	}
	dvig.flObn=0;
	dvig.startxt=window.vopr.txt;
	dvig.obnov(obnov);

	if(!checkJQuery('sozdat()','pole'))
		return;
	if(!checkMathJax('sozdat()','pole'))
		return;
	$('#protv').hide();
	$('#otv').val('');
	$('#prov').unbind('click');
	$('#prov').bind('click',prover);
	$('#prov').show();
	$('#sozd').hide();
	$('#podob').hide();
}

function prover(){
	var kand=$('#otv').val();
	if(kand==='')
		if(!confirm('Вы не ввели ответ, нажмите "Отмена" для того, чтобы ввести ответ или "ОК", чтобы сдаться и посмотреть ответ.'))
			return;
	$('#protv').show();
	var txt='';
	if(slvopr.vrn(kand)){
		txt='Правильно!';
	}else{
		txt='Неправильно! Правильный ответ: '+slvopr.ver.join(' или ');
	}
	if(vopr.rsh)
		txt+='<br/><br/>'+vopr.rsh;
	$('#protv').html(txt);
	MathJax.Hub.Typeset();
	$('#prov').hide();
	$('#sozd').show();
	specCounter('mini');
}
$('#prov').hide();

function trysozd(){
	if(window.MathJax===undefined){
		setTimeout(trysozd,100);
	}else{
		sozdat();
	}
}
$(trysozd);
allLinksToSpans();
