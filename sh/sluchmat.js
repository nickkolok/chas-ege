var startxt;
var intervPole;
var intervZadan;
var n;

var nas=200;
var zelen={r:0,g:nas,b:0};
var krasn={r:nas,g:0,b:0};
var zhelt={r:nas,g:nas,b:0};
	
var galki;
function sozdGalki(){
	galki='<tr>';
	for(var i=1;i<=nZad;i++){
		galki+='<td><input type="checkbox" id="cB'+i+'" /><label for="cB'+i+'" >B'+i+' </label></td>';
	}
	galki+='<td></td></tr><tr>';
	for(var i=1;i<=nZad;i++){
		galki+='<td><span id="pB'+i+'"></span></td>';
	}
	galki+='<td><span id="pB"></span></td></tr><tr>';
	for(var i=1;i<=nZad;i++){
		galki+='<td><span class="kolvoprav" id="pravB'+i+'"></span><br/>из<br/><span id="vsegB'+i+'"></span></td>';	
	}
	galki+='<td><span class="kolvoprav" id="pravB"></span><br/>из<br/><span id="vsegB"></span></td></tr>';
	$('#galki').html(galki);
}
sozdGalki();
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
	var pr;
	for(var i=1;i<=nZad;i++){
		pr=umka.verno[i]/umka.vsego[i];
		$('#pB'+i).html(
			umka.vsego[i]>4?
			(pr*100).toFixedLess(0)+'%':
			''
		);
		$('#pravB'+i).html(
			umka.verno[i]
		);
		$('#vsegB'+i).html(
			umka.vsego[i]
		);
		$('#pB'+i).css(
			'color',
			pr>0.5?
			cvetMezhdu(zhelt,zelen,pr*2-1):
			cvetMezhdu(krasn,zhelt,pr*2)
		);
	}
	$('#pB').html(
		umka.vsego.sum()>4?
		(umka.verno.sum()/umka.vsego.sum()*100).toFixedLess(0)+'%':
		''
	);
	$('#pravB').html(
		umka.verno.sum()
	);
	$('#vsegB').html(
		umka.vsego.sum()
	);

	
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
