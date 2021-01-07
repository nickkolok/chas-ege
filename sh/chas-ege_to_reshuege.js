var fillerTemplate = function(){

	$('button[title="с кратким ответом"]').click();

	setTimeout(function(){

		$('select[name=editor_task]').val(3);



		$('#editor_body').val('{{vopr.txt}}');
		$('input[name=editor_answer]').val('{{vopr.ver}}');
		$('#editor_solution').val('{{vopr.rsh}}');

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
			$(sourceField.getElementsByTagName('input')[1]).val('ЧАС ЕГЭ');
			$(sourceField.getElementsByTagName('input')[1]).click();
		} else {
			alert('Не найдено поле "Источник!"');
		}


	},3000);
}


function createFiller(vopr){
	var fillerCode = (''+fillerTemplate).replace(/^function\(\)/, "");
	fillerCode = fillerCode.replace('{{vopr.txt}}', rearrangeFormulas(escapeText(vopr.txt)));
	fillerCode = fillerCode.replace('{{vopr.ver}}', escapeText(''+vopr.ver));
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
