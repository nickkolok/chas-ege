'use strict';

window.vopr.txt='';
var nV=1;
var kategory=1;
var aZ=[];
var iZ=[];
var kZ;
var aV;
var strVopr='';
var strOtv='';
var voprosy=[];

function vse1(){
	$('.kolvo').val(1);
}

function vse0(){
	$('.kolvo').val(0);
}

function zapusk(){
	chasStorage.domData.save()
	for(var i=1;i<=nabor.nZad;i++)
		aZ[i]=1*($('#cB'+i).val());
	cacheKat();
	kZ=aZ.sum();
	if(!kZ){
		alert('Ни одно задание не выбрано.');
		return;
	}
	iZ=aZ.slice();
	kategory=1;
	$('#panel').html('Тест составляется, подождите...');
	$('#gotov').show();
	zadan();
}

function testGotov(){
	vazhnOn();
	$('#gotov').hide();
	for(var i=0;i<aZ.sum();i++)
		try{
			voprosy[i].dey();
		}catch(e){};
	allCanvasToBackgroundImage();
	$('#panel').remove();
	if(!(parsedJSON && parsedJSON.shellOptions && parsedJSON.shellOptions.noalert)) {
		alert('Тест составлен.\nМожно приступать к решению!');
	}
}

function konecSozd(){
	document.getElementById('rez').innerHTML=strVopr;
	$('#prov_knopki').show();
	MathJax.Hub.Typeset('rez',testGotov);
}

function zadan(){
	if (kategory>nabor.nZad){
		konecSozd();
		return;
	}else if(iZ[kategory]==0){
		kategory++;
		zadan();
	}else{
		iZ[kategory]--;
		dvig.zadan(obnov,kategory);
	}
}

function obnov(){
		var sdel=aZ.sum()-iZ.sum();
		var nazvzad=dvig.getzadname(kategory)+(aZ[kategory]==1?'':(iZ[kategory]-aZ[kategory]));
		strVopr+=
			'<br/>'+
			'<div class="d">'+
				'<div class="b">'+nazvzad+
				'</div>'+
				'<div class="z">'+
				window.vopr.txt+
				'</div>'+
				'<div class="r">'+
					'Ответ:'+
					'<textarea class="text_otv" rows="1"></textarea>'+
					'<div class="otv_ver" id="otv_ver'+(sdel-1)+'">'+
						'Правильно!'+
					'</div>'+
					'<div class="otv_nev" id="otv_nev'+(sdel-1)+'">'+
						'Неправильно!<br/>'+
						'Правильный ответ: '+window.vopr.ver.join('или')+
					'</div>'+
				'</div>'+
				('<br/>Решение:<br/><br/>'+vopr.rsh).vTag('div','class="resh-poln"').esli(vopr.rsh)+
			'</div>';
		//Копируем вопрос в массив
		voprosy.push(vopr.clone());

		var w=sdel/kZ;
		$('.tx').text((100*w).toFixedLess(1).dopdo(' ',4)+'%');
		$('#pr1').width($('#pr0').width()*w);
		var v=dvig.ping*2.2*(kZ-sdel)/1000;
		$('#vrem').text(sdel+' из '+kZ+' '+v.toDvoet());
		zadan();
}

function prov(){
	vazhnOff();
	var nVer=0;
	var nNev=0;
	var textareas=$('textarea');
	for(var i=0;i<aZ.sum();i++)
	{
		if(voprosy[i].vrn.call(voprosy[i],textareas[i].value)){
			nVer++;
			$('#otv_ver'+i).show();
		}else{
			nNev++;
			$('#otv_nev'+i).show();
		}
	}
	$('#but_prov').hide();
	$('.resh-poln').show();
	$('#prov_knopki').append('<br/>Правильно решено '+chislitlx(nVer,'задание')+' из '+aZ.sum());
	specCounter('poln');
}

var startShell = function (){
	$('#zadaniya').html(sozdKolvoHtml('poln'));
	$('#gotov').hide();
	galkiKat('#galki_kat','pech');
	$('#prov_knopki').hide();
	assertCheckability();
}
