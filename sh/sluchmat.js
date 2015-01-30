var n;

var nas=200;
var zelen={r:0,g:nas,b:0};
var krasn={r:nas,g:0,b:0};
var zhelt={r:nas,g:nas,b:0};
var flProv=1;
var vremyaStart;

function sozdGalki(){
	var galki,g1='',g2='',g3='',g4='';
	for(var i=1;i<=nabor.nZad;i++){
		if(!nabor.vykl[i]){
			var title='';
			window.comment='';
			try{
				nabor.upak[dvig.getzadname(i)].main();
				title=' title="'+window.comment+'"';
			}catch(e){}
			
			g1+='<td'+title+'><input type="checkbox" checked id="cB'+i+'" data-jstorage-id="sluch-cB'+i+'-'+nabor.name+'" /><label for="cB'+i+'" >'+
				dvig.getzadname(i)+' </label></td>';
			g2+='<td'+title+'><span id="pB'+i+'"></span></td>';
			g3+='<td'+title+'><span class="kolvoprav" id="pravB'+i+'"></span><br/>из<br/><span id="vsegB'+i+'"></span></td>';	
			g4+='<td'+title+'><span class="vremya" id="vremyaB'+i+'"></span></td>';	
		}
	}
	galki='<tr>'+g1+'<td></td></tr><tr class="praviln">'+g2+'<td><span id="pB"></span></td></tr><tr class="praviln">'+g3+
		'<td><span class="kolvoprav" id="pravB"></span><br/>из<br/><span id="vsegB"></span></td></tr>'+
		'<td></td></tr><tr class="vremya">'+g4;
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
		if(umka.kvoNaVremya[i]){
			$('#vremyaB'+i).html(
				(umka.vremya[i]/umka.kvoNaVremya[i]).round().toDvoet()
			);
		}
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
	slvopr.trd();
	MathJax.Hub.Typeset();
	$('#otvet').html(slvopr.ver.join(';;'));
	$('#never').html(slvopr.nev.join(';;'));
	vremyaStart=new Date().getTime();
}

function vybrZad(){
	for(var i=1;i<=nabor.nZad;i++)
		v[i]=($('#cB'+i).is(':checked')?1:0);
	var w=[];
	for(var i=1;i<=nabor.nZad;i++)
		if(v[i])
			w.push(i);
	if(!w.length){
		$('#pole').html('Хотя бы один тип заданий должен быть выбран! <button onclick="vybrv();">Выбрать все</button>');
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
	strelkaEst=0;
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
	vazhnOn();
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
	flProv=0;
	$('#bnomer').show().html(dvig.getzadname(n));
}

function prover(){
	vazhnOff();
	var flUchetPrav=0;
	var kand=$('#otv').val();
	if(kand===''){
		if(!confirm('Вы не ввели ответ, нажмите "Отмена" для того, чтобы ввести ответ или "ОК", чтобы сдаться и посмотреть ответ.'))
			return;
		uchetPrav(n,'N');
		flUchetPrav=1;
	}
	$('#protv').show();
	var checkPraviln=$('#check-praviln').is(':checked')
	if(checkPraviln){
		umka.vsego[n]++;
	}
	var txt='';

	if(slvopr.vrn(kand)){
		if(checkPraviln){
			umka.verno[n]++;
		}
		txt='Правильно!';
		uchetPrav(n,1);
	}else{
		txt='Неправильно! Правильный ответ: '+slvopr.ver.join(' или ');
		if(!flUchetPrav)
			uchetPrav(n,0);
	}

	if($('#check-na-vremya').is(':checked')){
		umka.vremya[n]+=(new Date().getTime()-vremyaStart)/1000;
		umka.kvoNaVremya[n]++;
	}
	if(vopr.rsh)
		txt+='<br/><br/>'+vopr.rsh;
	$('#protv').html(txt);
	MathJax.Hub.Typeset();
	$('#prov').hide();
	$('#sozd').show();
	$('#podob').show();
	sohrUmka();
	veroyatn();
	specCounter('sluch');
	flProv=1;
}

function uchetPrav(kat,prav,nom){
	if(svinta)
		return;
	var ifr=document.createElement('iframe');
	ifr.src='../sh/sluchcounter.html?'+nabor.name+'/'+kat+'#'+prav;
	ifr.style.display='none';
	ifr.style.top='-9999px';
	ifr.style.position='absolute';
	document.body.appendChild(ifr);
}

var v=[];

function vybrv(){
	for(var i=1;i<=nabor.nZad;i++){
		$('#cB'+i).not(':checked').click();
	}
}

function obrabNaVremya(){
	if($('#check-na-vremya').is(':checked')){
		$('.vremya').show();
	}else{
		$('.vremya').hide();
	}
}
$(obrabNaVremya);

function obrabPraviln(){
	if($('#check-praviln').is(':checked')){
		$('.praviln').show();
	}else{
		$('.praviln').hide();
	}
}
$(obrabPraviln);

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

$("#otv").keyup(function(event) {
	if(nabor.mnogostrOtvet || flProv)
		return true;
	if(event.keyCode==13){
		prover();
		return false;
	}
});

assertCheckability();
