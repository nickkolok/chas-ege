var startxt;
var intervPole;
var intervZadan;
var n;
var nZad=14;

var galki='<tr>';
for(var i=1;i<=nZad;i++){
	galki+='<td><input type="checkbox" id="cB'+i+'" /><label for="cB'+i+'" >B'+i+' </label></td>';
}
galki+='</tr><tr>';
for(var i=1;i<=nZad;i++){
	galki+='<td><span id=pB'+i+'></span></td>';
}
galki+='</tr>';
$('#galki').html(galki);

/*
window.tmpvopr=$.jStorage.get('sluchvopr');
if(window.tmpvopr){
	window.vopr=window.tmpvopr;
	obnov();
}else{
//	window.vopr.podg();
	
}
*/
var umka=$.jStorage.get('umka');
if(!umka){
	umka={
			verno:[].zapslch(0,nZad,0,0,0),
			vsego:[].zapslch(0,nZad,0,0,0),
		}
}
veroyatn();

function veroyatn(){
	for(var i=1;i<=nZad;i++){
		$('#pB'+i).html(
			umka.vsego[i]>4?
			(umka.verno[i]/umka.vsego[i]*100).toFixedLess(0)+'%':
			''
		);
	}
}

function obnov(){
	if((window.vopr.txt!=0)*(startxt!=window.vopr.txt)){
		clearInterval(intervPole);
		clearInterval(intervZadan);
		if(
			($('#cPRZ').is(':checked'))*(window.vopr.kat["prz"])+
			($('#cLOG').is(':checked'))*(window.vopr.kat["log"])+
			($('#cTRI').is(':checked'))*(window.vopr.kat["tri"])+
			($('#cDRS').is(':checked'))*(window.vopr.kat["drs"])
		){
			sozdat();
			return;
		}
		$('#pole').html(window.vopr.txt);
		window.vopr.dey();
		MathJax.Hub.Typeset();
		$('#otvet').html(window.vopr.ver.join(';;'));
		$('#never').html(window.vopr.nev.join(';;'));
//		$.jStorage.set('sluchvopr',window.vopr);
	}
}
function sozdat(){
	if(!$){
		zagr('../ext/jquery-1.9.0.js');
		document.getElementById('pole').innerHTML='Проблемы с внешней библиотекой JQuery. Устранение неполадок, подождите...';
		setTimeout('sozdat()',1000);
		return;
	}
	$('#pole').html('Задание составляется, подождите...');
	$('#protv').hide();
	startxt=window.vopr.txt;
	window.vopr.podg();
	for(var i=1;i<=15;i++){
		if($('#cB'+i).is(':checked')){
			v[i]=1;
		}else{
			v[i]=0;
		}
	}
	localStorage.sluchmatb=v;
	var w=[];
	for(var i=1;i<=14;i++){
		if(v[i]){
			w.push(i);
		}
	}
	if(!w.length){
		$('#pole').html('Хотя бы один тип заданий должен быть выбран!');
		return;
	}
	n=w.iz();
	zagr('../zdn/mat/B'+n+'/main.js');
	intervZadan=setInterval("zagr('../zdn/mat/B'+"+n+"+'/'+nomer+'.js');",300);
	intervPole=setInterval("obnov();",100);
	var otvet=$('#otv').val('');
	$('#prov').unbind('click');
	$('#prov').bind('click',prover);
	if(!MathJax){
		$('#pole').html('Проблемы при обращении к библиотеке отрисовки формул, пытаемся дотянуться...');
		zagr('http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full');
		zagr('../ext/mathjax/MathJax.js?config=TeX-AMS_HTML-full');
		setTimeout('sozdat()',200);
		return;
	}
	VKI_imageURI='../ext/keyboard/keyboard.png';
	VKI_kts='Russian';
	VKI_kt='Russian';
	VKI_size=5;
	VKI_attach(document.getElementById('otv'));
	$('#prov').show();
	$('#sozd').hide();

}

function prover(){
	$('#protv').show();
	umka.vsego[n]++;
	if(window.vopr.vrn($('#otv').val())){
		$('#protv').html('Правильно!');
		umka.verno[n]++;
	}else{
		$('#protv').html('Неправильно!\nПравильный ответ: '+window.vopr.ver.join(' или '));
	}
	$('#prov').hide();
	$('#sozd').show();
	$.jStorage.set('umka',umka);
	veroyatn();
}

var v=[];
if(!localStorage.sluchmatb){
	v=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	localStorage.sluchmatb=v;
}else{
	v=localStorage.sluchmatb.split(',');
}

function stavGalki(){
	for(var i=1;i<=nZad;i++){
		$('#cB'+i).removeAttr('checked');
		if(v[i]=='1'){
			$('#cB'+i).attr('checked','checked');
		}
	}		
}
stavGalki();

function vybrv(){
	for(var i=1;i<=nZad;i++){
//		$('#cB'+i).removeAttr('checked');
		$('#cB'+i).not(':checked').attr('checked','checked');
		$('#cB'+i).not(':checked').click();
	}
}

function vybr0(){
	for(var i=1;i<=nZad;i++){
		$('#cB'+i).removeAttr('checked');
	}
}

$('#prov').hide();
