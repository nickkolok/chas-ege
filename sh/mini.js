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
	$('#protv').show();
	if(slvopr.vrn($('#otv').val())){
		$('#protv').html('Правильно!');
	}else{
		$('#protv').html('Неправильно! Правильный ответ: '+slvopr.ver.join(' или '));
	}
	$('#prov').hide();
	$('#sozd').show();
	specCounter('mini');
}
$('#prov').hide();

function trysozd(){
	if(window.MathJax===undefined){
		setTimeout(trysozd,10);
	}else{
		sozdat();
	}
}
$(trysozd);
