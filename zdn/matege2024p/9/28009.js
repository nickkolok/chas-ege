(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let alpha_2=[30,45,60,90].iz();//угол
		let m = sl(1,20,0.01);//масса
		let v= sl(1,20,0.01);//скорость
		let Q = m*(v*(alpha_2*Math.PI/180).sin()).sqr();//энергия
		genAssertZ1000(Q,'Ответ слишком дробный: '+Q);

		let gruz = sklonlxkand(['груз','тело','мяч','предмет','шар','куб','камень'].iz());
		let dvizh = [['движутся','двигаться'],['летят','лететь']].iz();
		let anlge_tex=['\\alpha','\\beta','\\gamma','\\theta'].iz();
		let l=sl1(),u=sl1();
		angle_tex=['\\dfrac{'+anlge_tex+'}{2}',anlge_tex,'2'+anlge_tex,];
		let udar=['при их абсолютно неупругом соударении','в результате соударения'];

		NAtask.setTask({
			text: ['Два '+gruz.re+' массой $'+m+'$ $\\text{кг}$ кажд'+['ый','ая','ое','ые'][gruz.rod]+' '+dvizh[0]+' с одинаковой скоростью $v='+v+'$ $\\dfrac{\\text{м}}{\\text{с}}$ под углом  $'+angle_tex[l+1]+'$ друг к другу.',
				'Под углом  $'+angle_tex[l+1]+'$ друг к другу '+dvizh[0]+' с одинаковой скоростью $v='+v+'$ $\\dfrac{\\text{м}}{\\text{с}}$ два '+gruz.re+' массой $'+m+'$ $\\text{кг}$ кажд'+['ый','ая','ое','ые'][gruz.rod]+'.'].iz()+
				' Энергия (в $\\text{Дж}$), выделяющаяся '+udar[u]+', '+['вычисляется','рассчитывается'].iz()+
				' по формуле $Q=mv^2\\sin^2'+angle_tex[l]+'$, где $m$ – масса'+[' '+gruz.re,''].iz()+' (в $\\text{кг}$), $v$ – скорость '+[' '+gruz.re,''].iz()+' (в $\\dfrac{\\text{м}}{\\text{с}}$). '+
				['Найдите, под каким углом $'+angle_tex[l+1]+'$ должны '+dvizh[1]+' '+gruz.im+', чтобы '+udar[1-u]+' выделилась энергия, равная $'+Q+'$ $\\text{Дж}$.',
				'Под каким наименьшим углом $'+angle_tex[l+1]+'$ (в градусах) должны '+dvizh[1]+' '+gruz.im+', чтобы '+udar[1-u]+' выделилось не менее $'+Q+'$ джоулей?'].iz()+
				 [' Ответ дайте в градусах.',''].iz(),
			answers: alpha_2*2,
			authors: ['Aisse-258']
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000000);
})();

/*РешуЕГЭ: 28009: 28643 28649 43741 541375 541819 647151 28645 28647 28651
           28653 43527 43529 43531 43533 43535 43537 43539 43541 43543
           43545 43547 43549 43551 43553 43555 43557 43559 43561 43563
           43565 43567 43569 43571 43573 43575 43577 43579 43581 43583
           43585 43587 43589 43591 43593 43595 43597 43599 43601 43603
           43605 43607 43609 43611 43613 43615 43617 43619 43621 43623
           43625 43627 43629 43631 43633 43635 43637 43639 43641 43643
           43645 43647 43649 43651 43653 43655 43657 43659 43661 43663
           43665 43667 43669 43671 43673 43675 43677 43679 43681 43683
           43685 43687 43689 43691 43693 43695 43697 43699 43701 43703
           43705 43707 43709 43711 43713 43715 43717 43719 43721 43723
           43725 43727 43729 43731 43733 43735 43737 43739*/
