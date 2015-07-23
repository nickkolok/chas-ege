'use strict';

$('#zadaniya').html(sozdKolvoHtml('pech'));
$('#gotov').hide();

var vr1=chas.mode.svinta?100:200;
var vr2=chas.mode.svinta?100:1500;

window.vopr.txt='';
var stardate=new Date().getTime();
var novdate;
var nV=1;
var nZ=1;
var aZ=[];
var iZ=[];
var aV;
var kZ;
var strVopr='';
var strOtv='';
var strResh='';
var voprosy=[];

var redakt;

function vse1(){
	$('.kolvo').val(1);
}

function vse0(){
	for(var i=1;i<=nabor.nZad;i++)
		$('#cB'+i).val(0);
	$('#cV').val(1);
}

function zapusk(){
	$.jStorage.sohrData();
	redakt=$('#redakt').is(':checked');
	if($('#htmlcss').is(':checked')){
		MathJax.Hub.setRenderer('HTML-CSS');
	}
	nV=1*$('#cV').val();
	aV=nV;
	for(var i=1;i<=nabor.nZad;i++)
		aZ[i]=1*($('#cB'+i).val());
	cacheKat();
	kZ=aZ.sum()*aV;
	if(!kZ){
		alert('Ни одно задание не выбрано.');
		return;
	}
	iZ=aZ.slice();
	nZ=0;
	$('#panel').html('Тесты составляются, подождите...');
	$('#gotov').show();
	zadan();
}

function razrstr(){return;
	var d2=document.createElement('div');
	d2.innerHTML='<hr class="pbb" clear="all"/><div class="d"></div>';
	d2["class"]='d d2';
	document.getElementById('rez').appendChild(d2);
}

function testGotov(){
	$('#gotov').hide();
	allCanvasToBackgroundImage();
	if(redakt){
		$('#rez').attr('contenteditable','true');
		$('#otv').attr('contenteditable','true');
	}
	$('#dopoln').show();
	$('.col-md-3').hide();
	$('nav').hide();
	$('#build-markers').hide();
	$('.well').css({
		'background-color':'white',
		'border':'none',
		'margin-left':'auto',
		'margin-right':'auto',
	});
	alert('Тесты составлены.\nТеперь Вы можете распечатать их с помощью Вашего браузера.');
	specCounter('pech');
}

function udalPanel(){
	$('#panel').remove();
	$('#menucenter').remove();
	$('#inf').remove();
}

function konecSozd(){
	strOtv='<h2>Ответы</h2>'+strOtv;
	if(strResh){
		strOtv+='<h2>Решения</h2>'+strResh;
	}
	$('#otv').html(strOtv);
	$('#rez').html(strVopr);
	for(var i=voprosy.length;i;i--)
		try{
			voprosy[i-1].dey();
		}catch(e){};
	MathJax.Hub.Typeset(testGotov);
	udalPanel();
	spoiler();
	$('.spoiler-show').click();
	$("hr:first").remove();
	$("hr:first").remove();
	document.body.style.backgroundColor="#FFF";
	if(!bGecko)
		razrstr();
	$('body').append('<script>udalPanel()</script>');			
}

function vNachaloVarianta(){
	nV--;
	nZ=0;
	strOtv+='</table>';
	strVopr+='<p style="page-break-before: always"></p>';
	zadan();
}

function zadan(){
	if(nZ==1+1*nabor.nZad){
		vNachaloVarianta();
		return;
	}else if (nZ==0){
		if(!nV){
			konecSozd();
			return;
		}else{
			iZ=aZ.slice();
			stardate=novdate;

			novdate=new Date().getTime();
			strVopr+='<h2 class="d">Вариант №'+novdate+'</h2>';

			if(!bGecko && aV!=nV)
				razrstr();
			strOtv+='<table class="normtabl tablpech"><tr><th colspan="3">'+
				'Ответы к варианту<br/>№'+novdate+'</th></tr>';
			nZ=1;
			zadan();
			return;
		}
	}else{
		if(iZ[nZ]==0){
			nZ++;
			zadan();
		}else{
			iZ[nZ]--;
			dvig.zadan(obnov,nZ);
		}
		return;
	}
}
function obnov(){
		var nazvzad=dvig.getzadname(nZ)+(aZ[nZ]==1?'':'-'+(aZ[nZ]-iZ[nZ]))
		strVopr+='<div class="d"><div class="b">'+nazvzad+'</div><div class="z">'+window.vopr.txt+'</div></div>';
		strOtv+='<tr><td>'+novdate+'</td><td>'+nazvzad+'</td><td>'+window.vopr.ver.join('; ')+'</td></tr>';
		if(vopr.rsh)
			strResh+='<br/><h3>Вариант №'+novdate+', задача '+nazvzad+'</h3><br/>'+vopr.rsh+
				'<br/><br/>';
			
		voprosy.push(vopr.clone());

		var sdel=aZ.sum()*(aV-nV+1)-iZ.sum();
		var w=sdel/kZ;
		$('.tx').text((100*w).toFixedLess(1).dopdo(' ',4)+'%');
		$('#pr1').width($('#pr0').width()*w);
		var v=(vr1+vr2)*(kZ-sdel)/1000;
		$('#vrem').text(sdel+' из '+kZ+' '+v.toDvoet());
		zadan();
}

function shirprim(){
	$('.z').css("width",$('#shir').val()+'cm');
}

var ds;
var selector1='.jqplot-target, .MathJax>nobr>span>span>span';
var selector2='canvas';

function optimcopy(){
	ds=$('.d');
	$('#otv').hide();
	optimcopyd(1);
}

function optimcopyd(n){
		if(n>=ds.length){
			$('.d').show();
			$('#otv').show();
			return;
		}
		var d=$(ds[n]);
		ds.hide();
		var sel1=d.find(selector1);
		var sel2=d.find(selector2);
		if(!(sel1.length+sel2.length)){
			setTimeout("optimcopyd("+n+"+1);",100);
			return;
		}
		d.show();
		sel1.each(function(){
			innerHTMLtoImg(this);
		});
		sel2.each(function(){
			replaceWithImg(this);
		});
		setTimeout("optimcopyd("+n+"+1);",100);
}

galkiKat('#galki_kat','pech');
