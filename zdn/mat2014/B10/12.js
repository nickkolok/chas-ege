(function(){'use strict';

var Cube = makeStruct("lowAx lowAy lowBx lowBy lowCx lowCy height");
var bCube = new Cube(260, 200, 260, 300, 300, 200, -120);

//Задание координат
bCube.lowAx = Math.floor((((Math.random(1)*10)+6.7))*10)+50;
bCube.lowBx = bCube.lowAx;
bCube.lowBy += Math.floor(Math.random()*3)*10;
bCube.lowCx = bCube.lowAx+Math.floor((Math.random(1)*10+11.3))*20 - 80;
bCube.lowAx += 50;
bCube.lowBx += 50;
bCube.lowCx += 40;
bCube.lowBy -= 10;
var tmp = 0.3-Math.random(1)+0.000001;
tmp = (tmp/Math.abs(tmp));
bCube.height += ((Math.floor(Math.random(1)*2.8)*20)*tmp/Math.abs(tmp));
bCube.height -= 10;

var q_end = ' многогранника, изображённого на рисунке, если все его углы прямые.';
var g=[	'Найдите площадь поверхности'+q_end,
		'Найдите объём'+q_end];
var slid=sl(1000000000);
var q_id = getRandomInt(0,1);
var ab = getLen(bCube.lowAx, bCube.lowBx, bCube.lowAy, bCube.lowBy)/10;
var ac = getLen(bCube.lowAx, bCube.lowCx, bCube.lowAy, bCube.lowCy)/10;
var hh = Math.abs(bCube.height)/10;

var sCube = new Cube(bCube.lowAx, bCube.lowAy, bCube.lowBx, bCube.lowBy, bCube.lowCx, bCube.lowCy, bCube.height);
sCube.lowAx += 60;
sCube.lowAy += 50;
sCube.lowBx += 60;
sCube.lowCy += 50;
sCube.lowCx -= 50;
sCube.height = -1*Math.floor(hh*10/2.4);
var hplus = bCube.height-sCube.height;
sCube.lowAy += hplus;
sCube.lowBy += hplus;
sCube.lowCy += hplus;

var _ab = getLen(sCube.lowAx, sCube.lowBx, sCube.lowAy, sCube.lowBy)/10;
var _ac = getLen(sCube.lowAx, sCube.lowCx, sCube.lowAy, sCube.lowCy)/10;
var _hh = Math.floor(Math.round(Math.abs(sCube.height))/10);

if(q_id==0){
	var q_val = ((ab*ac)+(ab*hh)+(ac*hh))*2;
}
if(q_id==1){
	var q_val = (ab*ac*hh - (_ab*_ac*_hh));
}

window.vopr.dey=function(){

	var ris=document.getElementById('ris'+slid);
	var ct = ris.getContext('2d');
	var w=600;
	var h=400;
	ct.lineWidth=1;
	ct.fillStyle='#000000';
	ct.lineWidth = 2;

	/* A-B */ct.drawLineSpec(bCube.lowAx, bCube.lowAy, bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy);
	/* A-A' */ct.drawLineSpec(bCube.lowAx, bCube.lowAy, bCube.lowAx, bCube.lowAy+bCube.height);
	/* B-B' */ct.drawLine(bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy,bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy+bCube.height);

	/* A-B */ct.drawLineSpec(bCube.lowAx, bCube.lowAy, bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy);
	/* A-C */ct.drawLineSpec(bCube.lowAx, bCube.lowAy, bCube.lowCx, bCube.lowCy);
	/* C-C' */ct.drawLine(bCube.lowCx, bCube.lowCy, bCube.lowCx, bCube.lowCy+bCube.height);
	/* D-D' */ct.drawLine(bCube.lowCx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy, bCube.lowCx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy+bCube.height);

	/* A-B */ct.drawLineSpec(bCube.lowAx, bCube.lowAy, bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy);
	/* A-C */ct.drawLineSpec(bCube.lowAx, bCube.lowAy, bCube.lowCx, bCube.lowCy);
	/* C-D */ct.drawLine(bCube.lowCx, bCube.lowCy, bCube.lowCx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy);
	/* D-B */ct.drawLine(bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy, bCube.lowCx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy);

	/* A'-B' */ct.drawLine(bCube.lowAx, bCube.lowAy+bCube.height, bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy+bCube.height);
	/* A'-C' */ct.drawLine(bCube.lowAx, bCube.lowAy+bCube.height, bCube.lowCx, bCube.lowCy+bCube.height);
	/* D'-B' */ct.drawLine(bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy+bCube.height, bCube.lowCx-Math.abs(bCube.lowBy-bCube.lowCy), bCube.lowBy+bCube.height);

	ct.fillStyle = 'white';
	ct.strokeStyle = 'white';

	/* A-A' */ct.drawLine(sCube.lowAx, sCube.lowAy, sCube.lowAx, sCube.lowAy+sCube.height);
	/* B-B' */ct.drawLine(sCube.lowBx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy, sCube.lowBx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy+sCube.height);
	/* C-C' */ct.drawLine(sCube.lowCx, sCube.lowCy, sCube.lowCx, sCube.lowCy+sCube.height);
	/* D-D' */ct.drawLine(sCube.lowCx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy, sCube.lowCx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy+sCube.height);

	/* A-B */ct.drawLine(sCube.lowAx, sCube.lowAy, sCube.lowBx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy);
	/* A-C */ct.drawLine(sCube.lowAx, sCube.lowAy, sCube.lowCx, sCube.lowCy);
	/* C-D */ct.drawLine(sCube.lowCx, sCube.lowCy, sCube.lowCx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy);
	/* D-B */ct.drawLine(sCube.lowBx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy, sCube.lowCx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy);

	/* A'-B' */ct.drawLine(sCube.lowAx, sCube.lowAy+sCube.height, sCube.lowBx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy+sCube.height);
	/* A'-C' */ct.drawLine(sCube.lowAx, sCube.lowAy+sCube.height, sCube.lowCx, sCube.lowCy+sCube.height);
	/* C'-D' */ct.drawLine(sCube.lowCx, sCube.lowCy+sCube.height, sCube.lowCx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy+sCube.height);
	/* D'-B' */ct.drawLine(sCube.lowBx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy+sCube.height, sCube.lowCx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy+sCube.height);

	ct.fillStyle = '#000000';
	ct.strokeStyle = '#000000';

	/* sA-sA' */ct.drawLine(sCube.lowAx, sCube.lowAy, sCube.lowAx, sCube.lowAy+sCube.height);
	/* sB-sB' */ct.drawLine(sCube.lowBx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy, sCube.lowBx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy+sCube.height);
	/* sC-sC' */ct.drawLine(sCube.lowCx, sCube.lowCy, sCube.lowCx, sCube.lowCy+sCube.height);

	/* sA-sB */ct.drawLine(sCube.lowAx, sCube.lowAy, sCube.lowBx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy);
	/* sA-sC */ct.drawLine(sCube.lowAx, sCube.lowAy, sCube.lowCx, sCube.lowCy);
	/* sC-sD */ct.drawLine(sCube.lowCx, sCube.lowCy, sCube.lowCx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy);
	/* sD-sB */ct.drawLine(sCube.lowBx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy, sCube.lowCx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy);

	/* sA'-sB' */ct.drawLine(sCube.lowAx, sCube.lowAy+sCube.height, sCube.lowBx-Math.abs(sCube.lowBy-sCube.lowCy), sCube.lowBy+sCube.height);
	/* sA'-sC' */ct.drawLine(sCube.lowAx, sCube.lowAy+sCube.height, sCube.lowCx, sCube.lowCy+sCube.height);

	/* C'-sC' */ct.drawLine(bCube.lowCx, bCube.lowCy+bCube.height, sCube.lowCx, sCube.lowCy+sCube.height);

	ct.font = '12pt sans-serif';

	ct.fillText(Math.abs(bCube.lowAy-bCube.lowBy)/10,(bCube.lowAx+bCube.lowBx-Math.abs(bCube.lowBy-bCube.lowCy))/2 -20, ((bCube.lowAy+bCube.lowBy)/2)+bCube.height-20);
	ct.fillText(Math.abs(bCube.lowAx-bCube.lowCx)/10, Math.abs(bCube.lowAx+Math.abs(bCube.lowAx-bCube.lowCx)/2), bCube.lowAy+bCube.height-5);
	ct.fillText(-bCube.height/10, bCube.lowCx+5, bCube.lowCy+(bCube.height/2));

	ct.fillText(Math.abs(sCube.lowAy-sCube.lowBy)/10,(sCube.lowAx+sCube.lowBx-Math.abs(sCube.lowBy-sCube.lowCy))/2 -7, ((sCube.lowAy+sCube.lowBy)/2)+sCube.height-7);
	ct.fillText(Math.abs(sCube.lowAx-sCube.lowCx)/10, Math.abs(sCube.lowAx+Math.abs(sCube.lowAx-sCube.lowCx)/2), sCube.lowAy+sCube.height-5);
	ct.fillText(''+_hh, sCube.lowCx+5, (sCube.lowBy + sCube.lowCy)/2+hplus/2 -15);

	//Задание рамки
	ct.fillStyle='black';
	ct.drawLine(0,0,600,0);
	ct.drawLine(600,0,600,400);
	ct.drawLine(600,400,0,400);
	ct.drawLine(0,400,0,0);

	ct.fillKrug(0,0,10);
	ct.fillKrug(0,400,10);
	ct.fillKrug(600,400,10);
	ct.fillKrug(600,0,10);

	ct.fillStyle='black';

	$('#ris').attr('id','');
};

window.vopr.txt='<canvas style="float:left;margin-right:1em;" width="600" height="400" id="ris'+slid+'" style="text-align:center" opozn="'+Math.random()+'"></canvas>'+
	''+g[q_id];
window.vopr.ver=[''+q_val];

})();

//by _zevs
