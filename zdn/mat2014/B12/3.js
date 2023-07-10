(function() {

	var v=sluchch(50,500,10);
	var p=sluchch(v+10,700,10);
	var q=sluchch(1000,20000,100);
	var a=q*(p-v);
	var f=sluchch(10000,a-10000,100);
	a-=f;
	var f=svVel([
		{vel:'цена за единицу продукции'									,zna:p,bkv:'p'	,rod:1,nah:1,nmn:'\\mbox{руб}.'},
		{vel:'месячный объём производства продукции'						,zna:q,bkv:'q'	,rod:1,nah:1,nmn:'\\mbox{шт}.'},
		{vel:'переменные затраты на производство одной единицы продукции'	,zna:v,bkv:'v'	,rod:3,nah:1,nmn:'\\mbox{руб}.'},
		{vel:'постоянные расходы предприятия'								,zna:f,bkv:'f'	,rod:3,nah:1,nmn:'\\mbox{руб}.'},
		[
			{vel:'месячная операционная прибыль предприятия'				,zna:a			,rod:1,nah:1,nmn:'\\mbox{руб}.'},
			{vel:'месячная операционная прибыль предприятия'				,zna:a/1000		,rod:1,nah:1,nmn:'\\mbox{тыс. руб}.'},
			{vel:'месячная операционная прибыль предприятия'				,zna:a/1000000	,rod:1,nah:1,nmn:'\\mbox{млн. руб}.'},
		].iz(),
	]);
	
	window.vopr.ver=[''+f.splice(0,1)];
	window.vopr.txt='Некоторая компания продает свою продукцию. Месячная операционная прибыль предприятия (в рублях) вычисляется по формуле $a(q)=q(p-v)-f$. '+f.shuffle().soed();
	
	window.vopr.kat['log']=0;
	window.vopr.kat['prz']=0;
	window.vopr.kat['drs']=0;
	window.vopr.kat['tri']=0;
	})();
	