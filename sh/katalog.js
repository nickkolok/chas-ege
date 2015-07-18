'use strict';

function generateKatalog(){
	var rez='';
	var toc='';
	var masdey=[];
	var br='<br/>';
	for(var kat in nabor.upak){
		window.comment='';
		try{
				nabor.upak[kat].main()
		}catch(e){}
		rez+=(
			('Показать категорию '+kat).vTag('button','class="spoiler-show"')+
			('Скрыть   категорию '+kat).vTag('button','class="spoiler-hide"')+
			'<div class="spoiler-body">'+
			('Категория '+kat).vTag('h1','id="'+kat+'"')+
			window.comment+
		'');
		toc+=(
			(kat+'. '+window.comment).vTag('a','href="#'+kat+'"')+
			br+
		'');
		for(var zdn in nabor.upak[kat])
			if(zdn!='main'){
				vopr.podg();
				rez+=((nabor.adres+kat+'/'+zdn+'.js').vTag('h2'));
				try{
					nabor.upak[kat][zdn]();
					rez+=(br+vopr.txt.vTag('div')+br);
					rez+=(('Ответ: '+vopr.ver.join('или')).vTag('div')+'<br/>');
					masdey.push(vopr.dey);
					if(vopr.rsh){
						rez+=(
							('Показать решение ').vTag('button','class="spoiler-show"')+
							('Скрыть   решение ').vTag('button','class="spoiler-hide"')+
							'<div class="spoiler-body">'+
							'Решение: '+br+
							vopr.rsh+
							'</div>'+
						'');
						
					}
				}catch(e){}
			}
			rez+=('</div>');
	}
	$('#divrez').html(toc+br+rez);
	MathJax.Hub.Typeset();
	var len=masdey.length;
	for(var i=0;i<len;i++){
		try{
			masdey[i]();
		}catch(e){}
	}
	spoiler();
	$('.spoiler-show').click();
}
