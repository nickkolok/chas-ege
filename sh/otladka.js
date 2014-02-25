dvig.dgn=0;//Отключаем диагностический режим движка. Под корень.

function obnov(){
	$('#pole').html(window.vopr.txt);
	$('#resh').html('');
	window.vopr.dey();
	MathJax.Hub.Typeset();
	$('#otvet').html(window.vopr.ver.join(';;'));
	$('#never').html(window.vopr.nev.join(';;'));
}

function sozdat(){
	if(!checkJQuery ('sozdat()','pole'))
		return;
	if(!checkMathJax('sozdat()','pole'))
		return;
	$('#pole').html('Задание составляется, подождите...');
	v=$('#adres').val();
	if(!v.length){
		$('#pole').html('Нужно указать путь к загружаемому файлу!');
		return;
	}
	$('#shabl').attr('src',v);
	window.vopr.podg();
	zagr(v+'?'+Math.random());
	dvig.flObn=0;
	dvig.startxt=window.vopr.txt;
	dvig.obnov(obnov);
	$('#otv').val('');
	$('#otvet').hide();
	setVKI();
	VKI_attach(document.getElementById('otv'));
}

function prover(){
	if(window.vopr.vrn($('#otv').val())){
		alert('Правильно!');
	}else{
		alert('Неправильно!\nПравильный ответ: '+window.vopr.ver.join(' или '));
		$('#otvet').show();
	}
	$('#resh').html(vopr.rsh);
	MathJax.Hub.Typeset();
}

function izTextarea(){
	eval($('#textarea-script').val());
	obnov();
}
