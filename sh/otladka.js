var startxt;
var intervPole;

function obnov(){
	if((window.vopr.txt)&&(startxt!=window.vopr.txt)){
		clearInterval(intervPole);
		intervPole=0;
		$('#pole').html(window.vopr.txt);
		window.vopr.dey();
		MathJax.Hub.Typeset();
		$('#otvet').html(window.vopr.ver.join(';;'));
		$('#never').html(window.vopr.nev.join(';;'));
	}
}
function sozdat(){
	if(!checkJQuery('sozdat()','pole'))
		return;
	$('#pole').html('Задание составляется, подождите...');
	startxt=window.vopr.txt;
	v=$('#adres').val();
	if(!v.length){
		$('#pole').html('Нужно указать путь к загружаемому файлу!');
		return;
	}
	$('#shabl').attr('src',v);
	window.vopr.podg();
	zagr(v+'?'+Math.random());
	if(!intervPole){
		intervPole=setInterval("obnov();",500);
	}
	var otvet=$('#otv').val('');
	if(!checkMathJax('sozdat()','pole'))
		return;

	setVKI();
	VKI_attach(document.getElementById('otv'));
}
function prover(){
	if(window.vopr.vrn($('#otv').val()))
		alert('Правильно!');
	else
		alert('Неправильно!\nПравильный ответ: '+window.vopr.ver.join(' или '));
}

function izTextarea(){
	eval($('#textarea-script').val());
	obnov();
}
