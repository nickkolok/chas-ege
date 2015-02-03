function sklon(){
	var sl=$('#slovo').val();
	var rez=sklonlxkand(sl,undefined,0);
	for(var p in lxpad){
		$('#'+p).val(rez[p]);
		$('#'+p+'n').val(rez[p+'n']);
	}
	$('#my_select option:selected').each(function(){
		this.selected=false;
	});
	$('#sel_sklon [value='+rez.skl+']').attr('selected','selected');
	$('#sel_rod [value='+rez.rod+']').attr('selected','selected');
	$('#odu').removeAttr("checked");
	$('#sbs').removeAttr("checked");
	if(rez.odu)
		$('#odu').not(':checked').click();
	if(rez.sbs)
		$('#sbs').not(':checked').click();
	if(lx[sl])
		$('#est').show();
	else
		$('#est').hide();
	formkod();
}

function formkod(){
	var sl=$('#slovo').val();
	lxkand[sl]={};
	for(var p in lxpad){
		lxkand[sl][p]=$('#'+p).val();
		var nval=$('#'+p+'n').val();
		if(nval)
			lxkand[sl][p+'n']=nval;
	}
	lxkand[sl]['rod']=1*$('#sel_rod :selected').val();
	lxkand[sl]['skl']=1*$('#sel_sklon :selected').val();
	lxkand[sl]['odu']=$('#odu').is(':checked')?1:0;
	lxkand[sl]['sbs']=$('#sbs').is(':checked')?1:0;
	lxkand[sl]['chr']=1;
	$('#kod').val(strlxkand(sl));
}

function startShell(){
	setInterval(function(){
		  var curVal = $("#slovo").val();
		  var prevVal = $("#slovo").data("prevVal") || null;
		  if (prevVal !== curVal) {
			$("#slovo").data("prevVal",curVal);
			sklon();
		  }
	}, 100);

	setInterval(function(){
		var fl_form=0;
		$('#padtabl input').each(function(){
			var curVal = $(this).val();
			var prevVal  = $(this).data("prevVal") || null;
			if (prevVal !== curVal) {
				$(this).data("prevVal",curVal);
				fl_form=1;
				formkod();
			}else
				return true;
		});
		if(fl_form)
			formkod();
	}, 100);

	var kolvo=0;
	for(var sl in lx)
		kolvo++;
	$('#kolvoslov').text(kolvo.chislitlx('слово'));

	$('#sel_sklon').change(nesklon);
	function nesklon(){
		if($('#sel_sklon :selected').val()==0)
			$('.pad_neobh').val($('#slovo').val());
		formkod();
	}

	$('#sel_rod').change(formkod);
	$('#odu').click(formkod);
	$('#sbs').click(formkod);
	$('label').click(formkod);
}

