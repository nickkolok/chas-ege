(function(){

var a=sluchch(0,om.sroki.ve.length-1);
var b=sluchch(20,100);
var g=sluchch(20,100);
var d=sluchch(10,20);
var h=b*d-g;

NAtask.setTask({
	text : sluchiz(window.profesj.ie,1)[0].toZagl()+' '+
	sluchiz(window.imenaj.ie,1)[0]+' '+sluchiz(window.otchestvaj.ie,1)[0]+
	' купила проездной билет на '+om.sroki.ve[a]+' и совершила '+
	chislitlx(b,'поездка')+'. '+
	'Сколько рублей она сэкономила, если проездной билет на '+om.sroki.ve[a]+' стоит '+
	chislitlx(h,'рубль')+', а разовая поездка стоит '+d+' рублей?',
	answers : g,
});
})();
//Обзад 26625
