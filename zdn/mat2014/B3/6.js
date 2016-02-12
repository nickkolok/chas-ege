(function(){'use strict';
NAinfo.requireApiVersion(0, 0);

	var c=1*(sluchch(0.1,0.5,0.1).toFixedLess(2));
	var a=sluchch(30,50,c);
	var d=sl1();
	var f=a+18*c;
	var b=[];
	b[0]=sluchch(a,f,c);
	for(var i=1;i<29;i++){
		b[i]=1*(sluchch(Math.max(a,b[i-1]-5*c),Math.min(f,b[i-1]+5*c),c).toFixedLess(2));
	}
	b[0]=b[1];
	var g=[	'Каков минимальный курс за этот период?',
		'Каков максимальный курс за этот период?',
		'Найдите амплитуду изменения курса за этот период.',
		'Какого числа был впервые достигнут минимальный курс?',
		'Какого числа был впервые достигнут максимальный курс?',
		'Какого числа в последний раз достигнут минимальный курс?',
		'Какого числа в последний раз достигнут максимальный курс?',
		];
	var h=sluchch(0,6);
	var m=[b[b.min()],b[b.max()],b[b.max()]-b[b.min()],b.min(1),b.max(1),b.min(),b.max()];
if(!m[h])
	m[h]=1;
	var slid=sl(1000000000);

NAtask.setTask({

	text: '<canvas style="float:left;margin-right:1em;" width="600" height="400" id="ris'+slid+'" style="text-align:center" opozn="'+Math.random()+'"></canvas>'+
	'На графике жирными точками, для наглядности соединёнными линией, показан курс криптовалюты Bitcoin к американскому доллару'+
	', установившийся на одной из бирж в период с 1 по 28 '+sluchiz(window.mesiacy.re)+' 2013 года. '+
	g[h],

	answers: m[h].toFixedLess(2),

	draw:function(){

		var ris=document.getElementById('ris'+slid);
		var ct = ris.getContext('2d');
		var w=600;
		var h=400;
		ct.lineWidth=2;
		ct.translate(0,h);
		ct.drawLine(-5,-5,5,5);
		ct.translate(40,-40);
		var s=20;
		ct.setkaXY(s,0,27,-18,0);
		ct.lineWidth=3;
		ct.font = 'bold 12 px sans-serif';
		ct.fillStyle='#000';
		for(var i=0;i<28;i++){
			ct.fillText(""+(i+1),i*s-5,20);
		}
		for(var i=0;i<19;i++){
			ct.fillText(""+(a+i*c).toFixedLess(2),-35,-i*s);
		}
		for(var i=1;i<28;i++){
			ct.drawLine(i*s-s,-(b[i]-a)*s/c,i*s,-(b[i+1]-a)*s/c);
		}
		ct.fillStyle='black';
		for(var i=1;i<29;i++){
			ct.fillKrug(i*s-s,-(b[i]-a)*s/c,5);
		}
		$('#ris').attr('id','');

	},
});
})();
