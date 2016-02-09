(function(){'use strict';
NAinfo.requireApiVersion(0, 0);

var t=sl(om.eda.ie.length-1);
var c=sl(1,10);
var a=sl(3,9);
var b=sl(1,9);

NAtask.setTask({

	text:om.eda.ie[t].toZagl()+' стоит '+chislitlx(a,'рубль')+' '+b+'0 копеек. '+
	'Какое наибольшее число '+om.eda.rm[t]+' можно купить на '+c+'0 рублей?',

	answers:(c*100/(10*a+b)).floor().ts(),

});
})();
//Обзад 26616
