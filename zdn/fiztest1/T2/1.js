(function(){
	NAinfo.requireApiVersion(0, 0);

	var raz=sl(2,5);
	var v1=sl1();
	var v2=sl1();
	var v3=sl1(); //Масса (0) или жёсткость (1)
	var izm=["уменьши","увеличи"];
	var vel=["период","частота"];
	var v=(v1+v2+v3)%2;

	NAtask.setTask({
		text:"Как изменится "+vel[v2]+" колебаний груза на пружине, если "+
			["маccу груза","жёсткость пружины"][v3]+" "+izm[v1]+"ть в "+chislitlx(raz*raz,"раз")+"?",
		answers:izm[v]+"тся в "+chislitlx(raz,"раз"),
		wrongAnswers:[
			izm[v]+"тся в "+chislitlx(raz*raz,"раз"),
			izm[1-v]+"тся в "+chislitlx(raz*raz,"раз"),
			izm[1-v]+"тся в "+chislitlx(raz*raz*raz,"раз"),
			izm[v]+"тся в "+chislitlx(raz*raz*raz,"раз"),
			izm[1-v]+"тся в "+chislitlx(raz*raz*raz*raz,"раз"),
			izm[v]+"тся в "+chislitlx(raz*raz*raz*raz,"раз"),
			izm[1-v]+"тся в "+chislitlx(raz,"раз"),
		],
		analys:"Период "+["прямо","обратно"][v3]+" пропорционален квадратному корню из "+["массы","жёсткости"][v3]+". "+
			"Частота есть величина, обратная к периоду.",
	});

	AtoB();
})();
