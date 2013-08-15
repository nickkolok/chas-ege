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
	for(var i=1;i<=nabor.nZad;i++){
		galki+='<td><input type="checkbox" id="cB'+i+'" data-jstorage-id="sluch-cB'+i+'" /><label for="cB'+i+'" >B'+i+' </label></td>';
	}
	galki+='<td></td></tr><tr>';
	for(var i=1;i<=nabor.nZad;i++){
		galki+='<td><span id="pB'+i+'"></span></td>';
	}
	galki+='<td><span id="pB"></span></td></tr><tr>';
	for(var i=1;i<=nabor.nZad;i++){
		galki+='<td><span class="kolvoprav" id="pravB'+i+'"></span><br/>из<br/><span id="vsegB'+i+'"></span></td>';	
	}
	galki+='<td><span class="kolvoprav" id="pravB"></span><br/>из<br/><span id="vsegB"></span></td></tr>';
	$('#galki').html(galki);
}
sozdGalki();
zagrUmka();
veroyatn();

function veroyatn(){
	var pr;
	for(var i=1;i<=nabor.nZad;i++){
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
	pr=umka.verno.sum()/umka.vsego.sum();
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
	$('#pB').css(
		'color',
		pr>0.5?
		cvetMezhdu(zhelt,zelen,pr*2-1):
		cvetMezhdu(krasn,zhelt,pr*2)
	);	
}

function obnov(){
	if((window.vopr.txt!=0)*(startxt!=window.vopr.txt)){
		clearInterval(intervPole);
		clearInterval(intervZadan);
		if(!sootvKat()){
			sozdat();
			return;
		}
		$('#pole').html(window.vopr.txt);
		window.vopr.dey();
		MathJax.Hub.Typeset();
		$('#otvet').html(window.vopr.ver.join(';;'));
		$('#never').html(window.vopr.nev.join(';;'));
	}
}

function vybrZad(){
	for(var i=1;i<=nabor.nZad;i++)
		v[i]=($('#cB'+i).is(':checked')?1:0);
	localStorage.sluchmatb=v;
	var w=[];
	for(var i=1;i<=nabor.nZad;i++)
		if(v[i])
			w.push(i);
	if(!w.length){
		$('#pole').html('Хотя бы один тип заданий должен быть выбран!');
		return;
	}
	if($("#radio-sluch").prop("checked"))
		return w.iz();
	if($("#radio-porad").prop("checked")){
		var tekzad=n?n:0;
		for(var i=0;w[i]<=tekzad;i++);
		return w[i]?w[i]:w[0];
	}
	if($("#radio-umka" ).prop("checked")){
		var masV=[];
		for(var i=1;i<=nabor.nZad;i++)
			if(v[i] && (umka.vsego[i]<5))
				return i;
		for(var i=1;i<=nabor.nZad;i++)
			if(v[i])
				masV.push(1.1-umka.verno[i]/umka.vsego[i])
			else
				masV.push(0);
		return masV.sVeroyatn()+1;
	}
	return w.iz();
}

function sozdat(){
	if(!checkJQuery('sozdat()','pole'))
		return;
	$('#pole').html('Задание составляется, подождите...');
	$('#protv').hide();
	startxt=window.vopr.txt;
	window.vopr.podg();
	n=vybrZad();
	if(n==undefined)
		return;
	zagr(nabor.adres+nabor.prefix+n+'/main.js');
	intervZadan=setInterval("zagr(nabor.adres+nabor.prefix+"+n+"+'/'+nomer+'.js');",300);
	intervPole=setInterval("obnov();",100);
	var otvet=$('#otv').val('');
	$('#prov').unbind('click');
	$('#prov').bind('click',prover);

	if(!checkMathJax('sozdat()','pole'))
		return;

	setVKI();
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
	sohrUmka();
	veroyatn();
}

var v=[];

function vybrv(){
	for(var i=1;i<=nabor.nZad;i++){
		$('#cB'+i).not(':checked').click();
	}
}

function vybr0(){
	for(var i=1;i<=nabor.nZad;i++){
		$('#cB'+i).removeAttr('checked');
	}
}

$('#prov').hide();

spoiler();
