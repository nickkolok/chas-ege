(function(){'use strict';

var a=sluchch(2,10);
var b=[2,4,5,8,10].iz().pm();
var c = NLsets.alphabets.english.get_random_items(3);
var d=sl1();
var f=a/b;
var g;
var slid=Math.random();

window.vopr.dey=function(){
	var ris=document.getElementById('ris'+slid);
	var ct = ris.getContext('2d');
	var w=480;
	var h=480;
	ct.translate(w/2,h/2);
	ct.lineWidth=2;
	var s=20;
	ct.setka(20,s);
	ct.lineWidth=5;
	ct.drawLine(0,0,Math.abs(b)*s,0);
	ct.drawLine(0,0,b*s,a*s);
	ct.font = 'italic bold 24px sans-serif';
	ct.textBaseline = 'top';
	ct.fillStyle='#00f';
	ct.fillText(c[1],3,3);
	ct.fillText(c[0],Math.abs(b)*s,0);
	ct.fillText(c[2],b*s,a*s);
	$('#ris').attr('id','');
};

//(scr.toString().udalPosl().udalPerv(12))

window.vopr.txt='Найдите тангенс угла $'+c.soed()+'$.'+
	'<canvas style="float:left;margin-right:1em;" width="480" height="480" id="ris'+slid+'" style="text-align:center"></canvas>';
window.vopr.ver=[''+f];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();

