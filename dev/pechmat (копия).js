if(top.location.href!=document.location.href){
	top.location.href!=document.location.href;
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
var strVopr='';
var strOtv='';
function vse1(){
	for(var i=1;i<=14;i++){
		$('#cB'+i).val(1);
	}
	$('#cV').val(1);
}
function zapusk(){
	nV=$('#cV').val();
	nV=1*nV;
	for(var i=1;i<=14;i++){
		aZ[i]=1*($('#cB'+i).val());
	}
	iZ=aZ.slice();
	nZ=0;
	$('#panel').html('Тесты составляются, подождите...');
	zadan();
}
function zadan(){
//	console.log(nZ,'  ',iZ);
	if(nZ==15){
		nV--;
		nZ=0;
		strOtv+='</table>';
		zadan();
		return;
	}else if (nZ==0){
		if(nV==0){
			strOtv='<hr class="pbb"/>'+strOtv;
			$('#otv').html(strOtv);
			MathJax.Hub.Typeset();
			$('#panel').remove();
			$("hr:first").remove();
			document.body.style.backgroundColor="#FFF";
			setTimeout("alert('Тесты составлены.\\nТеперь Вы можете распечатать их с помощью Вашего браузера.');",3000);
//			alert('Тесты составлены.\nТеперь Вы можете распечатать их с помощью Вашего браузера.');
			return;
		}else{
			MathJax.Hub.Typeset();
			iZ=aZ.slice();
			stardate=novdate;
			novdate=new Date().getTime();
			strVopr='<td colspan="2"><hr class="pbb"/><h2>Вариант №'+novdate+'</h2></td>';
			var din=document.createElement('tr');
			din.innerHTML=strVopr;
			din.class='d';
			document.getElementById('rez').appendChild(din);
			strOtv+='<table class="normtabl" style="float:left; margin:1em;><tr><th colspan="2">';
			strOtv+='<h2>Ответы к варианту №'+novdate+'</h2></th></tr>';
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
//			setTimeout("zagr('../zdn/mat/B'+"+nZ+"+'/'+nomer+'.js');",1000);
			zagr('../zdn/mat/B'+nZ+'/'+nomer+'.js');
			intervPole=setTimeout('obnov('+');',1500);
		}
		return;
	}
}
function obnov(){
	if((window.vopr.txt!=0)*(startxt!=window.vopr.txt)){
		starttxt=window.vopr.txt;
		clearInterval(intervPole);
//		strVopr='<br/><div class="d"><div class="b">B'+nZ+'-'+(iZ[nZ]+1)+'</div>'+window.vopr.txt+'</div>';
		strVopr='<td><div class="b">B'+nZ+((aZ[nZ]==1)?(''):('-'+(aZ[nZ]-iZ[nZ])))+'</div></td><td>'+window.vopr.txt+'</td>';
		var din=document.createElement('tr');
		din.innerHTML=strVopr;
		din.class='d';
		din.width="100%";
		din.style.width='100%';
//		din.style.float='left';
		document.getElementById('rez').appendChild(din);
		strOtv+='<tr><td>B'+nZ+((aZ[nZ]==1)?(''):('-'+(aZ[nZ]-iZ[nZ])))+'</td><td>'+window.vopr.ver.join('; ')+'</td></tr>';
		try{
			window.vopr.dey();
		}catch(e){}
//		window.vopr.dey=function(){};
//		nZ++;
		zadan();
	}else{
		setTimeout("zagr('../zdn/mat/B'+"+nZ+"+'/'+nomer+'.js');",100);
//		setTimeout('zadan('+');',100);
		intervPole=setTimeout('obnov('+');',1100);
		
	}
//	zadan();
}
function sozdat(){


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
}


var v=[];
if(!localStorage.sluchmatb){
	v=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	localStorage.sluchmatb=v;
}else{
	v=localStorage.sluchmatb.split(',');
}

