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
				var currentTask = nabor.adres+kat+'/'+zdn+'.js';
				rez+='<div class="task-wrapper">';
				rez+=currentTask.vTag('h2');
				console.log(currentTask);
				try{
					nabor.upak[kat][zdn]();
					vopr.template = currentTask.replace(/^(\.\.\/)+/,'');
					vopr.taskNumber = kat;
					rez+=(br+vopr.txt.vTag('div')+br);
					rez+=(
						(
							'<button class="copybutton" style="display:block; float:right;" title="Экспорт в РешуЕГЭ"'+
							'data-task="' + encodeURIComponent(JSON.stringify(vopr)) + '"' +
							'>' +
							'</button>'
							+
							'Ответ: '+vopr.ver.join('или')
						).vTag('div') +
						'<br/>'
					);
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
				rez += '</div>';
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
	$('button.copybutton').click(copyTask);
}

function copyTask(){
	console.log(this);
	//var theTask = this.getElementsByTagName('span')[0].innerHTML;
	var theTask = decodeURIComponent(this.getAttribute('data-task'));
	console.log(theTask);
	theTask = JSON.parse(theTask);
	console.log(theTask);
	replaceCanvasWithImgInTaskAndHTML($(this).parents('div.task-wrapper')[0], theTask, function(){
		var fillerCode = createFiller(theTask);
		copyToClipboard(fillerCode)
	});
}
