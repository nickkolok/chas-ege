function peres_rang(){
	var a=$('#osnmatr').val().toMtr().T();
	$('#rk').text(a.rk());
	var s=$('#stolbec').val().toMtr().T();
	$('#rkr').text(a.concat(s).rk());
}

function prov_vector(){
	if(
		$('#vector').val().toMtr().testSLU(
			$('#osnmatr').val().toMtr(),
			$('#stolbec').val().toMtr()
		)
	){
		alert('Вектор является решением.');
	}else{
		alert('Вектор не является решением.');
	}
}

function prov_fsr(){
	if(
		$('#fsr').val().toMtr().isFSR(
			$('#osnmatr').val().toMtr()
		)
	){
		alert('ФСР верна.');
	}else{
		alert('ФСР неверна.');
	}
}
