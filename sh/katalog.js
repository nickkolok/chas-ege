'use strict';


function generateHtmlForTask(category,taskNumber,actionsArray){
	var htmlContent='';
	vopr.podg();
	var currentTaskPath = nabor.adres+category+'/'+taskNumber+'.js';
	htmlContent+='<div class="task-wrapper" data-category="'+category+'" data-tasknumber="'+taskNumber+'">';
	htmlContent+=currentTaskPath.vTag('h2');
	console.log(currentTaskPath);
	try{
		nabor.upak[category][taskNumber]();
		vopr.template = currentTaskPath.replace(/^(\.\.\/)+/,'');
		vopr.taskNumber = category;
		htmlContent+=('<br/>'+vopr.txt.vTag('div')+'<br/>');
		htmlContent+=(
			(
				'<button class="copybutton" style="display:block; float:right;" title="Экспорт в РешуЕГЭ"'+
				'data-task="' + encodeURIComponent(JSON.stringify(vopr)) + '"' +
				'>' +
					'&#x2398;' +
				'</button>'+

				'<button class="renewbutton" style="display:block; float:right; margin-right:1.46em;" title="Заменить задание на похожее"'+
				'>' +
					'&#x27F3;' +
				'</button>'+

				'<button class="addbutton" style="display:block; float:right; margin-right:1.46em;" title="Добавить похожее задание"'+
				'>' +
					'+' +
				'</button>'+

				'Ответ: '+vopr.ver.join('или')
			).vTag('div') +
			'<br/>'
		);
		actionsArray.push(vopr.dey);
		if(vopr.rsh){
			htmlContent+=(
				('Показать решение ').vTag('button','class="spoiler-show"')+
				('Скрыть   решение ').vTag('button','class="spoiler-hide"')+
				'<div class="spoiler-body">'+
				'Решение: '+'<br/>'+
				vopr.rsh+
				'</div>'+
			'');

		}
		if(vopr.authors && vopr.authors.length){
			htmlContent+=(
				'<br/>' +
				'<div class="katalog-authors">' +
						'Автор' + ('ы').esli(vopr.authors.length > 1) + ': &nbsp;' +
						vopr.authors.join(', ') +
				'</div>'+
				'<br/>'+
			'');
		}
	}catch(e){
		console.log(e);
	}
	htmlContent += '</div>';
	return htmlContent;
}

function generateKatalog(){
	var rez='';
	var toc='';
	var masdey=[];
	var br='<br/>';
	for(var kat in nabor.upak){
		window.comment='';
		window.availableTaskNumbers = null;
		try{
				nabor.upak[kat][nabor.scheduler]()
		}catch(e){
			console.log(e);
		}
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
		var tasksToList = window.availableTaskNumbers || Object.keys(nabor.upak[kat]);

		for(var zdn of tasksToList)
			if(zdn!='main' && zdn!='fipi'){
				rez += generateHtmlForTask(kat,zdn,masdey);
			}
			rez += '</div>';
	}
	$('#divrez').html(toc+br+rez);
	var len=masdey.length;
	for(var i=0;i<len;i++){
		try{
			masdey[i]();
		}catch(e){
			console.log(e);
		}
	}
	MathJax.Hub.Typeset();
	afterTasksGenerated();
	$('.spoiler-show').click();
}

function afterTasksGenerated(){
	spoiler();
	$( 'button.copybutton[data-already-inited!=true]').click( copyTask).attr('data-already-inited', true);
	$('button.renewbutton[data-already-inited!=true]').click(renewTask).attr('data-already-inited', true);
	$(  'button.addbutton[data-already-inited!=true]').click(  addTask).attr('data-already-inited', true);
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

function renewTask(){
	console.log(this);
	var wrapper = $(this).parents('div.task-wrapper')[0];
	var actions = [];
	var taskHtml = $(generateHtmlForTask(wrapper.getAttribute('data-category'),wrapper.getAttribute('data-tasknumber'),actions));
	$(wrapper).replaceWith(taskHtml);
	actions[0]();
	MathJax.Hub.Typeset(taskHtml[0]);
	afterTasksGenerated();
}

function addTask(){
	console.log(this);
	var wrapper = $(this).parents('div.task-wrapper')[0];
	var actions = [];
	var taskHtml = $(generateHtmlForTask(wrapper.getAttribute('data-category'),wrapper.getAttribute('data-tasknumber'),actions));
	taskHtml.insertAfter(wrapper);
	actions[0]();
	MathJax.Hub.Typeset(taskHtml[0]);
	afterTasksGenerated();
}
