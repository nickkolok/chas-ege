(function(){
	NAinfo.requireApiVersion(0, 0);

	var raz=sl(2,5);
	var v1=sl1();
	var v2=sl1();
	var izm=["уменьши","увеличи"];
	var vel=["период","частота"];

	NAtask.setTask({
		text:"Как изменится "+vel[v2]+" колебаний математического маятника, если длину нити "+izm[v1]+"ть в "+chislitlx(raz*raz,"раз")+"?",
		answers:izm[1*(v1!=v2)]+"тся в "+chislitlx(raz,"раз"),
		wrongAnswers:[
			izm[1*(v1==v2)]+"тся в "+chislitlx(raz*raz,"раз"),
			izm[1*(v1!=v2)]+"тся в "+chislitlx(raz*raz,"раз"),
			izm[1*(v1==v2)]+"тся в "+chislitlx(raz*raz*raz,"раз"),
			izm[1*(v1!=v2)]+"тся в "+chislitlx(raz*raz*raz,"раз"),
			izm[1*(v1==v2)]+"тся в "+chislitlx(raz*raz*raz*raz,"раз"),
			izm[1*(v1!=v2)]+"тся в "+chislitlx(raz*raz*raz*raz,"раз"),
			izm[1*(v1==v2)]+"тся в "+chislitlx(raz,"раз"),
		],
		analys:"Период прямо пропорционален квадратному корню из длины нити. "+
			"Частота есть величина, обратная к периоду.",
	});

	AtoB();
})();
