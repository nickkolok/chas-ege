function tt(){
	var t1=new Date().getTime();
	var code=$('#textarea-script').val();
	var iter=1*$('#iter').val();
	for(var i=iter;i;i--)
		eval(code);
	var t2=new Date().getTime();
	alert('Примерно '+(t2-t1)/iter+' сек.');
}
