(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let vod=sklonlxkand(['водоём','озеро','река','бассейн','море','пруд'].iz());
		let nazn=['водолазный','газовый',''].iz();
		let kol, gas;
		switch (nazn) {
		    case 'водолазный':
		    	kol=sklonlxkand(['колокол','баллон'].iz());
		    	gas=sklonlxkand(['воздух','кислород'].iz());
		    break;
		    case 'газовый':
		    	kol=sklonlxkand(['баллон'].iz());
		    	gas=sklonlxkand(['воздух','гелий','кислород','газ','метан','пропан','бутан'].iz());
		    break;
		    default:
		    	kol=sklonlxkand(['баллон','шар','баклажка','ёмкость'].iz());
		    	gas=sklonlxkand(['воздух','гелий','кислород','газ','метан','пропан','бутан'].iz());
		}
		let nach=(nazn==''?'':nazn+' ')+kol.ve;

		let log_2 = sl(1,6);//log_2(V1/V2)=A/avT - значение логарифма
		let alpha = sl(4,20,0.01);//alpha - постоянная
		let nu = sl(1,6,0.01);//nu - кол-во вещества в молях
		let T = sl(273,373,0.01);//T - температура в Кельвинах
		let A = alpha*nu*T*log_2;//А - работа по сжатию газа в Дж
		let V1 = sl(10,200,0.01);//V1 - начальный объем газа
		let V2 = V1/Math.pow(2,A/(alpha*nu*T));//V2 - конечный объем газа

		genAssertZ1000(A*0.1,'Работа слишком дробная');
		genAssertZ1000(V2*0.1,'Ответ слишком дробный');

		NAtask.setTask({
			text: (nach+', содержащ'+['ий','ую','ее','ие'][kol.rod]+
			    ' в начальный момент времени $\\nu='+nu+'~\\mbox{моль}$ '+gas.re+' объёмом '+
				'$V_1='+V1+'~\\mbox{л}$, медленно опускают на дно '+vod.re+'. При этом происходит изотермическое сжатие '+
				gas.re+' до конечного объёма $V_2$ (в $\\mbox{л}$). Работа, совершаемая водой при сжатии '+gas.re+', '+
				'вычисляется по формуле $A=\\alpha\\nu T\\log_2\\dfrac{V_1}{V_2}$, где $\\alpha='+alpha+
				'\\dfrac{\\mbox{Дж}}{\\mbox{моль}\\cdot \\mbox{К}}$ – постоянная, $T='+T+'~\\mbox{К}$ – температура '+
			        gas.re+'. Найдите, '+'какой объём $V_2$ будет занимать '+gas.ie+' в '+kol.pe+', если при сжатии '+
			        gas.re+' была '+'совершена работа в $'+A+'~\\mbox{Дж}$.  Ответ дайте в литрах.').toZagl(),
			answers: V2,
			analys: '$\\log_2 \\dfrac{'+V1+'}{V_2}='+log_2+'$',
			authors: ['Aisse-258'],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 20000);
})();
//Aisse-258
/*РешуЕГЭ 27996: 28489, 43097, 510067, 522119, 522145
      			   , 28491, 28493, 28495, 28497, 28499
      			   , 28501, 43051, 43053, 43055, 43057
      			   , 43059, 43061, 43063, 43065, 43067
      			   , 43069, 43071, 43073, 43075, 43077
      			   , 43079, 43081, 43083, 43085, 43087
      			   , 43089, 43091, 43093, 43095*/
