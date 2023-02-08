'use strict';

var vr1=chas.mode.svinta?100:200;
var vr2=chas.mode.svinta?100:1500;

var variantNumber;
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

var options={};


var largeFontStyle='div.z{font-size:128%}\n .MathJax_SVG_Display {font-size: 128%;}'.vTag('style');

function vse1(){
	$('.kolvo').val(1);
}

function vse0(){
	$('.kolvo').val(0);
	$('#cV').val(1);
}

function zapusk(){
	//Сохраняем параметры генерации
	chasStorage.domData.save();

	//Читаем настройки
	options.editable=$('#redakt').is(':checked');
	options.largeFont=$('#largeFont').is(':checked');
	options.customNumber=$('#customNumber').is(':checked');
	options.vanishVariants=$('#vanishVariants').is(':checked');
	options.nopagebreak=$('#nopagebreak').is(':checked');
	options.compactAnswers=$('#compact-answers').is(':checked');
	options.solutionsIntoAnswers=$('#solutions-into-answers').is(':checked');
	options.nobackground=$('#nobackground').is(':checked');
	options.firstTaskNumber=1*$('#first-task-number').val();
	options.transitTaskNumbers=$('#transitTaskNumbers').is(':checked');
	options.splitAnswersNumber=1*$('#split-answers-number').val();
	options.splitAnswerTables=$('#splitAnswerTables').is(':checked');
	options.uniqueAnswersAndSolutions=$('#uniqueAnswersAndSolutions').is(':checked');
	options.startTransitNumber=1*$('#start-transit-number').val();

	if(customNumber){
		variantNumber=$('#start-number').val()-1;
	}

	if($('#htmlcss').is(':checked')){
		MathJax.Hub.setRenderer('HTML-CSS');
	}

	//Читаем количество заданий
	aV=nV=1*$('#cV').val();
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

function testGotov(){
	$('#gotov').hide();
	if(options.editable){
		$('#rez, #otv, #rsh').attr('contenteditable','true');
	}
	$('#dopoln').show();
	alert('Тесты составлены.\nТеперь Вы можете распечатать их с помощью Вашего браузера.');
	specCounter('pech');
}

function udalPanel(){
	$('#panel, #menucenter, #inf').remove();
}

function konecSozd(){
	strOtv='<h2>Ответы</h2>'+strOtv;

	if(options.largeFont){
		strOtv = largeFontStyle + strOtv;
	}

	$('#otv').html(strOtv);
	$('#rez').html(strVopr);
	if(strResh){
		$('#rsh').html('<h2>Решения</h2>'+strResh);
	}

	for(var i=voprosy.length;i;i--){
		try{
			voprosy[i-1].dey();
		}catch(e){};
	}
	convertCanvasToImagesIfNeeded();
	MathJax.Hub.Typeset(testGotov);
	udalPanel();
	spoiler();
	$('.spoiler-show').click();
	$("hr:first").remove();
	$("hr:first").remove();
	document.body.style.backgroundColor="white";
	$('body').append('<script>udalPanel()</script>');

	$('button.renewbutton[data-already-inited!=true]').click(renewTask).attr('data-already-inited', true);
}

function convertCanvasToImagesIfNeeded(){
	if(!options.nobackground){
		allCanvasToBackgroundImage();
	}
}

function bumpVariantNumber(){
	if(options.customNumber){
		variantNumber++;
	}else{
		variantNumber=new Date().getTime();
	}
}

function appendVariantTasksCaption(){
	if(!options.vanishVariants){
		strVopr+='<h2 class="d">Вариант №'+variantNumber+'</h2>';
	}
}

function appendVariantTasksEnding(){
	if(!options.nopagebreak)
		strVopr+='<p style="page-break-before: always"></p>';
}

function appendVariantAnswersCaption(){
	strOtv+='<table class="normtabl tablpech">';
	if(!options.vanishVariants){
		strOtv+='<tr><th colspan="10">';
		if (options.compactAnswers) {
			strOtv+='Вар. '+variantNumber;
		} else {
			strOtv+='Ответы к варианту<br/>№'+variantNumber;
		}
		strOtv+='</th></tr>';
	}
}

function appendVariantAnswersEnding(){
	strOtv+='</table>';
}

function endCurrentVariant(){
	nV--;
	nZ=0;
	appendVariantTasksEnding();
	appendVariantAnswersEnding();
	zadan();
}

function zadan(){
	if(nZ==1+1*nabor.nZad){
		endCurrentVariant();
		return;
	}

	if(nZ==0){
		if(!nV){
			konecSozd();
			return;
		}else{
			iZ=aZ.slice();

			bumpVariantNumber();
			appendVariantTasksCaption();
			appendVariantAnswersCaption();

			nZ=1;
			zadan();
			return;
		}
	}else{
		if(iZ[nZ]==0){
			nZ++;
			zadan();
		}else{
			if(options.splitAnswerTables){
				var tasksReadyInCurrentVariant = aZ.sum()-iZ.sum();
				if (tasksReadyInCurrentVariant && (tasksReadyInCurrentVariant % options.splitAnswersNumber === 0)){
					appendVariantAnswersEnding();
					appendVariantAnswersCaption();
				}
			}
			iZ[nZ]--;
			dvig.zadan(obnov,nZ);

		}
		return;
	}
}

function createHtmlForTask(nazvzad){
	var taskId = variantNumber+'-'+nazvzad;
	vopr.taskId = taskId;
	vopr.taskNumber = nZ;
	vopr.taskCategory = nazvzad;

	return {
		txt:
			'<div class="d" data-task-id="'+taskId+'" data-task-number="'+nZ+'">'+
				'<div class="b">'+nazvzad+'</div>'+
				'<div class="z">'+
					window.vopr.txt+
					'<button class="noprint renewbutton" title="Заменить задание на похожее"'+
					'>' +
						'&#x27F3;' +
					'</button>'+
				'</div>'+
				'<div class="grid-for-writing"></div>'+
			'</div>',
		ver:
			'<tr class="answer-container" data-task-id="'+variantNumber+'-'+nazvzad+'">'+
			('<td>'+variantNumber+'</td>').esli(!options.vanishVariants) +
			'<td>'+nazvzad+'</td>'+
			'<td>'+window.vopr.ver.join('; ')+'</td>'+
			('<td>'+window.vopr.rsh+'</td>').esli(options.solutionsIntoAnswers)+
			'</tr>',
		rsh:
			'<div class="solution-container" data-task-id="'+variantNumber+'-'+nazvzad+'">'+
				(
					'<h3>'+('Вариант №'+variantNumber+', ').esli(!options.vanishVariants) +
					'задача '+nazvzad+'</h3><br/>'+
					vopr.rsh
				).esli(vopr.rsh)+
			'</div>',
		unq:
			[vopr.ver.join('; '), vopr.rsh, vopr.unq].join(' [:////:] '), // Да, это служебная комбинация символов "баян"
	};
}

var unqDict = {};

function obnov(){
		var nazvzad;

		if (options.transitTaskNumbers){
			nazvzad = options.startTransitNumber + aZ.sum() - iZ.sum() - 1;
		}else{
			nazvzad =
				dvig.getzadname(nZ)+
				(aZ[nZ]==1? '' : '-' + (aZ[nZ] - iZ[nZ] + options.firstTaskNumber - 1) );
		}
		var html = createHtmlForTask(nazvzad);

		if(options.uniqueAnswersAndSolutions && (html.unq in unqDict)){
			console.log('Deduplicating ' + nazvzad + '...');
			dvig.zadan(obnov,nZ);
			return;
		}

		unqDict[html.unq] = true;

		strVopr += html.txt;
		strOtv  += html.ver;
		strResh += html.rsh;

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
	//{{Лютый, бешеный костыль, который нужен, чтобы html2canvas не обрезал знаменатели у MathJax-овских дробей
	var MJspans=$(".MathJax nobr * span");
	for(var i=0; i<MJspans.length; i++){
		if(MJspans[i].style.clip){
			//И невозбранно возмножаем высоту на константу Чурова
			MJspans[i].style.height=''+1.468*MJspans[i].offsetHeight+'px';
		}
	}

	//}}
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

var startShell = function (){
	window.vopr.txt='';
	$('#zadaniya').html(sozdKolvoHtml('pech'));
	$('#gotov').hide();
	galkiKat('#galki_kat','pech');
}


function renewTask(){
	console.log(this);
	var wrapper = $(this).parents('div.d');
	var nazvzad = wrapper.children('div.b')[0].innerHTML;
	console.log(wrapper);
	var taskId = wrapper.attr('data-task-id');
	var taskNumber = wrapper.attr('data-task-number');
	var answerRow = $('tr.answer-container[data-task-id='+taskId+']');
	var solution  = $('div.solution-container[data-task-id='+taskId+']');

	nZ = taskNumber;
	dvig.zadan(function(){
		console.log(wrapper);
		var taskHtml = createHtmlForTask(nazvzad);
		wrapper  .replaceWith(taskHtml.txt);
		answerRow.replaceWith(taskHtml.ver);
		solution .replaceWith(taskHtml.rsh);
		window.vopr.dey();
		convertCanvasToImagesIfNeeded();
		MathJax.Hub.Typeset(taskHtml[0]);
		$('button.renewbutton[data-already-inited!=true]').click(renewTask).attr('data-already-inited', true);
	}, taskNumber);
}


function insertGridFields(){
	var fieldHeight = $('#grid-field-height').val();
	$('#grid-svg-template')[0].style.minHeight = fieldHeight+'cm';

	var cellSize = $('#grid-cell-size').val();
	$('#grid-pattern')[0].setAttribute('width' ,cellSize);
	$('#grid-pattern')[0].setAttribute('height',cellSize);

	$('#grid-pattern-line-1')[0].setAttribute('x1',cellSize/2);
	$('#grid-pattern-line-1')[0].setAttribute('x2',cellSize/2);
	$('#grid-pattern-line-1')[0].setAttribute('y2',cellSize  );

	$('#grid-pattern-line-2')[0].setAttribute('y1',cellSize/2);
	$('#grid-pattern-line-2')[0].setAttribute('y2',cellSize/2);
	$('#grid-pattern-line-2')[0].setAttribute('x2',cellSize  );


	var svg = $('#grid-svg-container').html();
	var svgCode = window.btoa(svg);


	$('#grid-style-placeholder').html(
		'<style>'+
			'.grid-for-writing { ' +
				'display: block;' +
				'min-height: ' + fieldHeight + 'cm;' +
				'background-image: ' + 'url(data:image/svg+xml;base64,' + svgCode + ');' +
			'}'+
		'</style>'
	);

	$('#button-removeGridFields').show();
}

function removeGridFields(){
	$('#grid-style-placeholder').html('');

	$('#button-removeGridFields').hide();
}
