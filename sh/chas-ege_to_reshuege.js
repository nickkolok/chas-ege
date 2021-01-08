var fillerTemplate = function(){

	$('button[title="с кратким ответом"]').click();

	setTimeout(function(){

		$('select[name=editor_task]').val('{{vopr.taskNumber}}');



		$('#editor_body').val('{{vopr.txt}}');
		$('input[name=editor_answer]').val('{{vopr.ver}}');
		$('#editor_solution').val('{{vopr.rsh}}');

		// Create previews
		$('#editor_body')[0].onkeyup();
		$('#editor_solution')[0].onkeyup();

		var labels = $('label');
		var sourceField = null;
		for(var i = 0; i < labels.length; i++){
			if(labels[i].innerHTML.search('Источник') !== -1){
				sourceField = labels[i];
				break;
			}
		}
		if(sourceField){
			console.log(sourceField);
			console.log(sourceField.getElementsByTagName('input')[1]);
			$(sourceField.getElementsByTagName('input')[1]).val('ЧАС ЕГЭ, {{vopr.template}}');
			$(sourceField.getElementsByTagName('input')[0]).click();
		} else {
			alert('Не найдено поле "Источник!"');
		}


	},3000);
}


function createFiller(vopr){
	var fillerCode = (''+fillerTemplate).replace(/^function\(\)/, "");
	fillerCode = fillerCode.replace('{{vopr.txt}}', rearrangeFormulas(escapeText(vopr.txt)));
	fillerCode = fillerCode.replace('{{vopr.ver}}', escapeText(''+vopr.ver));
	fillerCode = fillerCode.replace('{{vopr.template}}', escapeText(''+vopr.template));
	fillerCode = fillerCode.replace('{{vopr.taskNumber}}', escapeText(''+vopr.taskNumber));
	fillerCode = fillerCode.replace('{{vopr.rsh}}', rearrangeFormulas(escapeText(vopr.rsh)));
	return fillerCode;
}

function escapeText(text){
	return text.
		replace(/'/g,'\\\'').
		replace(/[\\]/g,'\\\\');

}


function rearrangeFormulas(text){
	while(/\$\$/.test(text)){
		text = text.replace('$$','<center><math>');
		text = text.replace('$$','</math></center>');
	}
	while(/\$/.test(text)){
		text = text.replace('$','<math>');
		text = text.replace('$','</math>');
	}
	return text;
}



//https://stackoverflow.com/a/52082569/4514650

function copyToClipboard(text) {
    var selected = false;
    var el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    if (document.getSelection().rangeCount > 0) {
        selected = document.getSelection().getRangeAt(0)
    }
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
};




function replaceCanvasWithImgInTaskAndHTML(element, vopr, callback){
	if(!(/<canvas/i.test(vopr.txt))){
		// Nothing to do
		callback();
		return;
	}
	var canvases = element.getElementsByTagName('canvas');
	console.log(canvases);
	for(var i = 0; i < canvases.length; i++){
		var img = createImgFromCanvas(canvases[i]);
		vopr.txt = vopr.txt.replace(/<canvas.*?<\/canvas>/, img.outerHTML);
	}
	callback();
}
