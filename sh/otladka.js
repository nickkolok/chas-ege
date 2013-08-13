var startxt;
var intervPole;
var v=localStorage.otladka;
$('#adres').val(v);

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
	if(!$){
		zagr('../ext/jquery-1.9.0.js?'+Math.random());
		document.getElementById('pole').innerHTML='Проблемы с внешней библиотекой JQuery. Устранение неполадок, подождите...';
		setTimeout('sozdat()',1000);
		return;
	}
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
	localStorage.otladka=v;
	if(!intervPole){
		intervPole=setInterval("obnov();",500);
	}
	var otvet=$('#otv').val('');
	$('#prov').unbind('click');
	$('#prov').bind('click',prover);
	if(!MathJax){
		$('#pole').html('Проблемы при обращении к библиотеке отрисовки формул, пытаемся дотянуться...');
		zagr('http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full');
		zagr('../ext/mathjax/MathJax.js?config=TeX-AMS_HTML-full');
		setTimeout('sozdat()',1000);
		return;
	}
	VKI_imageURI='../ext/keyboard/keyboard.png';
	VKI_kts='Russian';
	VKI_kt='Russian';
	VKI_size=5;
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
