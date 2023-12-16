(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let liquid = sklonlxkand(['вода','масло','глицерин','пропиленгликоль'].iz());
		let capacity={'вода':4200,'масло':1810,'глицерин':2350, 'пропиленгликоль':2480};
		//TODO: добавить в склонялку слово узел
		let room=sklonlxkand(['помещение','комната','магазин','здание','квартира','санузл','ангар'].iz());
		let heat_system=sklonlxkand(['радиатор','система', 'батарея','нагреватель','климат-контроль'].iz());

		let log_zn = sl(1,6);//значение логарифма, x*j/a*c*m
		let alpha = sl(0.1,1.9,0.01);//коэф альфа
		let gamma = sl(10,50,0.01);//коэф гамма
		let m = sl(0.1,0.9,0.01);//расход жидкости
		let x = alpha*capacity[liquid.ie]*m*log_zn/gamma;//длина трубы
		let T_R = sl(15,30,0.01);//температура помещения
		let T_L = sl(T_R+10,99,0.01);//температура жидкости
		let T = (T_L-T_R)/math.pow(2,log_zn)+T_R;

		genAssertZ1000(x,'Длина слишком дробная');
		genAssertZ1000(T,'Ответ слишком дробный');

		NAtask.setTask({
			text: 'Для обогрева '+room.re+', температура в котор'+['ом','ой','ом','ых'][room.rod]+
				' поддерживается на уровне $T_\\text{'+room.ie[0].toUpperCase()+'}='+T_R+' {}^\\circ C$, через '+
				heat_system.ve+' отопления '+['пропускают','прокачивают'].iz()+' горяч'+['ий','ую','ее','ие'][liquid.rod]+' '+liquid.ve+'. '+
				'Расход проходящ'+['его','ей','его','их'][liquid.rod]+' через трубу '+heat_system.re+' '+liquid.re+' $m='+m+
				' \\dfrac{\\mbox{кг}}{\\mbox{с}}$. Проходя по трубе расстояние $x~(\\mbox{м})$, '+liquid.ie+' охлаждается от начальной температуры '+
				'$T_\\text{'+liquid.ie[0].toUpperCase()+'}='+T_L+
				' {}^\\circ C$, до температуры $T~({}^\\circ C)$, причём $x=\\alpha \\cdot \\dfrac{cm}{\\gamma}\\cdot \\log_2 \\dfrac{T_\\text{'+
				liquid.ie[0].toUpperCase()+'}-T_\\text{'+room.ie[0].toUpperCase()+'}}{T-T_\\text{'+room.ie[0].toUpperCase()+'}}$, где '+
				'$c='+capacity[liquid.ie]+'\\dfrac{\\mbox{Вт}\\cdot \\mbox{с}}{\\mbox{кг}\\cdot {}^\\circ C}$ — теплоёмкость '+liquid.re+', $\\gamma='+
				gamma+'\\dfrac{\\mbox{Вт}}{\\mbox{м}\\cdot {}^\\circ C}$ — коэффициент '+
				'теплообмена, а $\\alpha='+alpha+'$ — постоянная. Найдите, до какой температуры (в градусах '+
				'Цельсия) охладится '+liquid.ie+', если длина трубы '+heat_system.re+' '+
				'равна $'+x+' ~\\mbox{м}$.',
			answers: T,
			analys: '$\\log_2 \\dfrac{'+T_L+'-'+T_R+'}{T-'+T_R+'}='+log_zn+'$',
			authors: ['Aisse-258'],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 20000);
})();
//Aisse-258
/*РешуЕГЭ 27995, 28477, 43049, 28479, 28481
        , 28483, 28485, 28487, 43001, 43003
        , 43005, 43007, 43009, 43011, 43013
        , 43015, 43017, 43019, 43021, 43023
        , 43025, 43027, 43029, 43031, 43033
        , 43035, 43037, 43039, 43041, 43043
        , 43045, 43047*/
