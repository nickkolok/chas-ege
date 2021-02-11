(function(){'use strict';

var q = sl(1,9);

var argumentMultiplier = sl(1,9);

var options = {
	slag: [
		'e^{'+q+'\\sin ' + argumentMultiplier + 'x'+'}', // TODO: \\sin(x+2\\pi) etc.
	],
};

var findMax=sl1();
var leftEdge = sl1();

var k = sl(1,99).pm();
var shiftDenominator = sl(2,9);
var shiftNumerator = sl(0, shiftDenominator-1);

if (leftEdge){
	options.prnz = (2*k-findMax).pina(argumentMultiplier);
	options.prnb = false;

	options.prkz = (shiftDenominator * (2*k+1-findMax) - shiftNumerator).pina(shiftDenominator*argumentMultiplier);
	options.prkb = sl1();
} else {
	options.prkz = (2*k+1-findMax)+'\\pi';
	options.prkb = false;

	options.prnz = (shiftDenominator * (2*k-findMax) + shiftNumerator).pina(shiftDenominator*argumentMultiplier);
	options.prnb = sl1();
}

if(findMax){
	options.maxy = 1;
}else{
	options.miny = 1;
}

var fn=fn_zadan(options);

window.vopr.txt=fn.txt;
window.vopr.ver=[fn.ver];


window.vopr.kat['log']=0;
window.vopr.kat['prz']=1;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=1;
})();

//Оriginal
//Николай Авдеев
