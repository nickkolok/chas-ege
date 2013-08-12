if(top.location.href!=document.location.href)
	top.location.href=document.location.href;

$('#zadaniya').html('');
for(var i=1;i<=14;i++){
	document.getElementById('zadaniya').innerHTML+='<tr><td><label for="cB'+i+'" >B'+i+'</label></td>'+
	'<td><input type="text" class="kolvo" value="1" id="cB'+i+'" data-jstorage-id="pech-cB'+i+'"></td></tr>';
}

$('#gotov').hide();
var vr1=200;
var vr2=1500;
if(svinta){
	vr1=100;
	vr2=100;
}
var startxt='';
window.vopr.txt='';
var stardate=new Date().getTime();
var novdate;
var intervPole;
var nV=1;
var nZ=1;
var aZ=[];
var iZ=[];
var aV;
var strVopr='';
var strOtv='';
var ogran=[];
function vse1(){
	for(var i=1;i<=14;i++){
		$('#cB'+i).val(1);
	}
	$('#cV').val(1);
}
function zapusk(){
	nV=$('#cV').val();
	nV=1*nV;
	aV=nV;
	for(var i=1;i<=14;i++){
		aZ[i]=1*($('#cB'+i).val());
	}
	ogran['prz']=$('#cPRZ').is(':checked');
	ogran['log']=$('#cLOG').is(':checked');
	ogran['tri']=$('#cTRI').is(':checked');
	ogran['drs']=$('#cDRS').is(':checked');
	kZ=aZ.sum()*aV;
	iZ=aZ.slice();
	nZ=0;
	$('#panel').html('Тесты составляются, подождите...');
	$('#gotov').show();
	zadan();
}

function razrstr(){
	var d2=document.createElement('div');
	d2.innerHTML='<hr class="pbb"/><div class="d"></div>';
	d2.class='d';
	d2.style.width="100%";
	d2.style.overflow="hidden";
	d2.style.pageBreakBefore='always';
	d2.style.height='1px';
	document.getElementById('rez').appendChild(d2);

}
function zadan(){
	if(nZ==15){
		nV--;
		nZ=0;
		strOtv+='</table>';
		zadan();
		return;
	}else if (nZ==0){
		if(nV==0){
			strOtv='<hr class="pbb"/><h2>Ответы</h2>'+strOtv;
			$('#otv').html(strOtv);
			MathJax.Hub.Typeset();
			$('#panel').remove();
			$('#menucenter').remove();
			$('#inf').remove();
			$("hr:first").remove();
			$("hr:first").remove();
			document.body.style.backgroundColor="#FFF";
			$("h2:first").css("page-break-before","avoid");
			if(!(navigator.userAgent.search('Gecko/')+1)){
				razrstr();
			}			

			setTimeout("$('#gotov').hide();alert('Тесты составлены.\\nТеперь Вы можете распечатать их с помощью Вашего браузера.');",3000);
			return;
		}else{
			MathJax.Hub.Typeset();
			iZ=aZ.slice();
			stardate=novdate;
			novdate=new Date().getTime();
			strVopr='<div class="d"><h2>Вариант №'+novdate+'</h2></div>';

			if((!(navigator.userAgent.search('Gecko/')+1))*(aV!=nV)){
				razrstr();
			}

			var din=document.createElement('div');
			din.innerHTML=strVopr;
			din.class='d';
			din.style.width="100%";
			document.getElementById('rez').appendChild(din);
			strOtv+='<table class="normtabl" style="float:left; margin:1em;"><tr><th colspan="3">';
			strOtv+='Ответы к варианту<br/>№'+novdate+'</th></tr>';
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
			zagr('../zdn/mat/B'+nZ+'/main.js');
			vopr.podg();
			zagr('../zdn/mat/B'+nZ+'/'+nomer+'.js');
			intervPole=setTimeout('obnov('+');',vr1+vr2);
		}
		return;
	}
}
function obnov(){
	if((window.vopr.txt!=0)*(startxt!=window.vopr.txt)){
		clearInterval(intervPole);
		if(
			(ogran['prz'])*(window.vopr.kat["prz"])+
			(ogran['log'])*(window.vopr.kat["log"])+
			(ogran['tri'])*(window.vopr.kat["tri"])+
			(ogran['drs'])*(window.vopr.kat["drs"])
		){
			iZ[nZ]++;
			zadan();
			return;
		}
		starttxt=window.vopr.txt;
		strVopr='<br/><div class="d"><div class="b">B'+nZ+((aZ[nZ]==1)?(''):('-'+(aZ[nZ]-iZ[nZ])))+'</div>'+window.vopr.txt+'</div>';
		var din=document.createElement('div');
		din.innerHTML=strVopr;
		din.class='d';
		din.width="100%";
		din.style.width='100%';
		din.style.float='left';
		document.getElementById('rez').appendChild(din);
		strOtv+='<tr><td>'+novdate+'</td><td>B'+nZ+(aZ[nZ]==1?'':'-'+(aZ[nZ]-iZ[nZ]))+'</td><td>'+window.vopr.ver.join('; ')+'</td></tr>';
		try{
			window.vopr.dey();
		}catch(e){}
		var sdel=aZ.sum()*(aV-nV+1)-iZ.sum();
		var w=sdel/kZ;
		$('.tx').text((100*w).toFixedLess(1).dopdo(' ',4)+'%');
		$('#pr1').width($('#pr0').width()*w);
		var v=(vr1+vr2)*(kZ-sdel)/1000;
		$('#vrem').text(''+sdel+' из '+kZ+' '+v.toDvoet());
		zadan();
	}else{
		setTimeout("zagr('../zdn/mat/B'+"+nZ+"+'/'+nomer+'.js');",vr1);
		intervPole=setTimeout('obnov();',vr1+vr2);
		
	}
}
