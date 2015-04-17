function sortstr(){
	var txt=$('#ish').val()
		.replace(/\r/g,'\n')
		.replace(/\n+/g,'\n')
	;
	if($('#vydmail').is(':checked')){
		txt=txt.match(
			/[\-._a-z0-9A-Z]+@(?:[a-z0-9A-Z][\-a-z0-9A-Z]+\.)+[a-zA-Z]{2,6}/g
		);
	}else{
		txt=txt.split('\n')
	}
	txt=txt
		.sortDelDubl()
		.join($('#vyvzap').is(':checked')?',':'\r\n')
	;
	$('#rez').val(txt);
}
