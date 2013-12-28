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
		galki+='<td><input type="checkbox" id="cB'+i+'" data-jstorage-id="sluch-cB'+i+'" /><label for="cB'+i+'" >'+nabor.prefix+i+' </label></td>';
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

var slvopr;
function obnov(p1){
	slvopr=p1;
	$('#pole').html(slvopr.txt);
	slvopr.dey();
	MathJax.Hub.Typeset();
	$('#otvet').html(slvopr.ver.join(';;'));
	$('#never').html(slvopr.nev.join(';;'));
}

function vybrZad(){
	for(var i=1;i<=nabor.nZad;i++)
		v[i]=($('#cB'+i).is(':checked')?1:0);
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
	n=vybrZad();
	if(n==undefined)
		return;
	dvig.zadan(obnov,n);
	zdnSost();
}

function podobnoe(){
	dvig.zadan(obnov,n,nomer);
	zdnSost();
}

function zdnSost(){
	if(!checkJQuery('sozdat()','pole'))
		return;
	if(!checkMathJax('sozdat()','pole'))
		return;
	$('#pole').html('Задание составляется, подождите...');
	$('#protv').hide();
	$('#otv').val('');
	$('#prov').unbind('click');
	$('#prov').bind('click',prover);
	$('#prov').show();
	$('#sozd').hide();
	$('#podob').hide();
	setVKI();
	VKI_attach(document.getElementById('otv'));
}

function prover(){
	$('#protv').show();
	umka.vsego[n]++;
	if(slvopr.vrn($('#otv').val())){
		$('#protv').html('Правильно!');
		umka.verno[n]++;
	}else{
		$('#protv').html('Неправильно!<br/>Правильный ответ: '+slvopr.ver.join(' или '));
	}
	$('#prov').hide();
	$('#sozd').show();
	$('#podob').show();
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

var strelkaEst=1;

function strelkaDvig(){
	if(!strelkaEst){
		$('#strelka').remove();
		return;
	}
	$('#strelka').animate({left:'-=20'},{duration:1000});
	$('#strelka').animate({left:'+=20'},{duration:1000,complete:strelkaDvig});
	$('#sozd').animate({opacity:'0.5'},{duration:1000});
	$('#sozd').animate({opacity:'1'},{duration:1000});
	
}
strelkaDvig();
$('#prov').hide();
$('#podob').hide();
galkiKat('#galki_kat','sluch');
spoiler();
