(function(){'use strict';

var d1=sluchch(1,10);
var d2=sluchch(20,28);
var d3=slKrome(9,d1,d2-1);
var d4=slKrome(9,d3+1,d2);

var n=[].N(d2);
var b=[];
b[d1]=sl(300,500,100);
for(var i=d1+1; i<=d2; i++){
    b[i] = b[i - 1] + sl(0,200,100);
}
var minMoney=b[d1];
var maxMoney=b[d2];
var stolen=b[d4]-b[d3];


n.splice(0,d1-1);
b.splice(0,d1);
var n0=n.slice();
n0.dopFixedLess(3);
var a=[n,b].T();

var ny=[];
for(var j=minMoney-100; j<maxMoney+200; j+=200){
    ny.push(j);
}


NAtask.setTask({
	text: 'На рисунке изображён график стоимости аренды помещения на выпускной в тысячах рублей на протяжении мая 2016 года. ' +
	    'Председатель родительского комитета Иван Петрович Взяткин оплатил аренду ' + d3 + ' мая, а остальным родителям сказал, что ' + d4 + ' мая. ' +
	    'Сколько рублей положит Иван Петрович в карман?',
	answers: stolen*1000,
});
NAtask.modifiers.addJqplot({
	dataArray: [a],
	options: {
		axes:{
			xaxis:{
				min:d1,
				max:d2,
				ticks:n0,
			},
			yaxis:{
				min:b[d1],
				max:b[d2],
				ticks:ny,
			}
		}
	},
});
})();
