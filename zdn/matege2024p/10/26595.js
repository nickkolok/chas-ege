(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = "26595";
		let preference = ['first_worker', 'second_worker'];
		let v = getSelectedPreferenceFromList(key, preference);
		let A = sl(10,600);//кол-во деталей1
		let B = sl([A/2,10].maxE(),[1.5*A,600].minE());//кол-во деталей2
		genAssert(A!==B,'Заказ одинаковый: А: '+A+' B: '+B);
		let k = sl(1,[A/4-1,30].minE(),0.01);//кол-во деталей (разница)
		let x = sl(k+1,100,0.01);//кол-во деталей (ответ)
		let n = (B*k+(B-A)*x)/(x*(x+k));//время изготовления (разница)
		genAssertZ1000(n,'Время слишком дробное: '+n);
		genAssert(n>=0.01,'Время <=0: '+n);

		let detail = sklonlxkand(['деталь','заготовка','продукт','предмет','горшок','беляш','пирожок','бутерброд','кувшин','молоток','инструмент','игрушка'].iz());
		let rab = sklonlxkand(['рабочий','сотрудник','работник','мастер'].iz());
		let rab_num=['первый','второй'];
		let izgot=['изготовление','производство'].iz();

		NAtask.setTask({
			text: 'На '+izgot+' '+chislitlx(A, detail.ie,'r')+' первый '+rab.ie+' тратит на '+
				chislitlx(n, 'час')+' меньше, чем второй '+rab.ie+' на '+izgot+' '+
				chislitlx(B, detail, 'r', [' ', ' таких же '].iz())+
				'. Известно, что первый '+rab.ie+' '+['в','за'].iz()+' час делает на '+chislitlx(k, detail.ie,'v')+' больше, чем второй.'+
				' Сколько '+detail.rm+' '+['в','за'].iz()+' час делает '+rab_num[v]+' '+rab.ie+'?',
			answers: v==1 ? x : x+k,
			authors: ['Aisse-258'],
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000000);
})();

/*РешуЕГЭ: 26595: 5821 5857 560135 560654
	5823 5825 5827 5829 5831 5833 5835 5837
	5839 5841 5843 5845 5847 5849 5851 5853 5855*/
