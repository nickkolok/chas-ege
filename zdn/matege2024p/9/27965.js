(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(10,100)/10;//ускорение
		let v0 = sl(a*10,300)/10;//скорость
		let t = sl(10,v0/a*10)/10;//время
		let S = v0*t-a*t*t/2;//путь
		//TODO:заменить на встроенный массив транспорта
		let transp = ['автомобиль','мотоцикл','велосипед','электросамокат','гироскутер','мотоциклист','велосипедист','машина','поезд','транспортное средство'].iz();
		let transp_skl=sklonlxkand(transp);

		NAtask.setTask({
			text: [transp.toZagl()+', движущ'+['ийся','аяся','ееся','иеся'][transp_skl.rod]+' со скоростью $v_0='+v0.ts()+' \\dfrac{\\mbox{м}}{\\mbox{с}}$,'
			      ,'Движущ'+['ийся','аяся','ееся','иеся'][transp_skl.rod]+' со скоростью $v_0='+v0.ts()+' \\dfrac{\\mbox{м}}{\\mbox{с}}$ '+transp].iz()
			     +' начал'+['','а','о','и'][transp_skl.rod]+' торможение с постоянным '+['ускорением','замедлением'].iz()+' $a = '+a.ts()
			     +' \\dfrac{\\mbox{м}}{\\mbox{с}^2}$. За $t$ секунд после начала торможения он'+['','а','о','и'][transp_skl.rod]+' '
			     +['прош'+['ёл','ла','ло','ли'][transp_skl.rod],'проехал'+['','а','о','и'][transp_skl.rod]].iz()+' '
			     +['путь','расстояние'].iz()+' $S=v_0 t-\\dfrac{at^2}{2}(\\mbox{м})$'
			     +'. Определите время, прошедшее с момента начала торможения, если известно, что за это время '
			     +transp+' проехал'+['','а','о','и'][transp_skl.rod]+' $'+S.ts()+'$ метров. Ответ дайте в секундах.',
			answers: t,
		});
	}, 1000);
})();
//Aisse-258
/*РешуЕГЭ 27965, 41635, 520655, 520696
, 28147, 28149, 28151, 28153, 28155
, 28157, 28159, 41571, 41573, 41575
, 41577, 41579, 41581, 41583, 41585
, 41587, 41589, 41591, 41593, 41595
, 41597, 41599, 41601, 41603, 41605
, 41607, 41609, 41611, 41613, 41615
, 41617, 41619, 41621, 41623, 41625
, 41627, 41629, 41631, 41633*/
