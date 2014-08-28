dvig.dgn=0;//Отключаем диагностический режим движка. Под корень.
var flAce=0;
var editor;
var flFullscreen=0;

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
	saveAce();
	$('#pole').html('Если Вы видите эту надпись - задание не составлено, скорее всего, в программе ошибка.');
	eval(nabrano());
	obnov();
}

function tt(){
	saveAce();
	var t1=new Date().getTime();
	var code=nabrano();
	var iter=1*$('#iter').val();
	for(var i=iter;i;i--)
		eval(code);
	var t2=new Date().getTime();
	alert('Примерно '+(t2-t1)/iter+' сек.');
}

function podsvet(){
	var aceSize=1*$('#ace-size').val();
	var aceRows=1*$('#ace-rows').val();
	$('#ace-script')[0].style.position='relative';
	$('#ace-script')[0].style.height=aceSize*aceRows+'px';
	$('#ace-script')[0].style.textAlign='left';

	$('#ace-script').html($('#textarea-script').val().replace(/</g,'&lt;').replace(/>/g,'&gt;'));
	$('#textarea-script').hide();
	editor = ace.edit('ace-script');
	editor.getSession().setMode('ace/mode/javascript');
	editor.setFontSize(aceSize);
	$('#vklpodsv').hide();
	flAce=1;
}

function nabrano(){
	if(flAce)
		return editor.getValue();
	else
		return $('#textarea-script').val();
}

function saveAce(){
	if(flAce)
		$('#textarea-script').val(editor.getValue());
	$.jStorage.sohrData();
}

function pastebin(){
	saveAce();
	$('#textarea-paste').val($('#textarea-script').val());
}

function startFullscreen(){
	if(flFullscreen || !flAce)
		return;
	editor.beforeFullscreen={
		bodyHeight:document.body.style.height,
		bodyOverflow:document.body.style.overflow,

		height:editor.container.style.height,
		width:editor.container.style.width,
		left:editor.container.style.left,
		top:editor.container.style.top,
		position:editor.container.style.position,
	};

	document.body.style.height="0";
	document.body.style.overflow="hidden";

	editor.container.style.left="0";
	editor.container.style.top="0";
	editor.container.style.width="100%";
	editor.container.style.height="100%";
	editor.container.style.position="fixed";

	editor.resize();

	flFullscreen=1;
}

function stopFullscreen(){
	if(!flFullscreen || ! flAce)
		return;
	document.body.style.height=editor.beforeFullscreen.bodyHeight;
	document.body.style.overflow=editor.beforeFullscreen.bodyOverflow;

	editor.container.style.left=editor.beforeFullscreen.left;
	editor.container.style.top=editor.beforeFullscreen.top;
	editor.container.style.width=editor.beforeFullscreen.width;
	editor.container.style.height=editor.beforeFullscreen.height;
	editor.container.style.position=editor.beforeFullscreen.position;

	editor.resize();

	flFullscreen=0;
}

document.onkeydown = function(e) {
    e = e || event;
    if (e.keyCode == 27) { // escape
        stopFullscreen();
        return false;
    } else if ((e.ctrlKey && e.shiftKey && e.keyCode == 'F'.charCodeAt(0))) {
        startFullscreen();
        return false;
    }
}
