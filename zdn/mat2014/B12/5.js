(function() {

var a=sluchch(1,20);
var p1=sluchch(1,15);
var p2=sluchch(p1+1,20);

var v1=sl1();

var c='Зависимость объёма спроса $q$ (единиц в месяц) на продукцию предприятия-монополиста от цены $p$ (тыс. руб.) '+
	'задаётся формулой $q='+((p1+p2)*a)+'-'+a+'p$. Выручка предприятия за месяц $r$ (в тыс. руб.) вычисляется по формуле $r(p)=q\\cdot p$.'+
	' Определите '+(v1?'наибольшую':'наименьшую')+' цену $p$, при которой месячная выручка $r(p)$ составит не менее '+(a*p1*p2)+' тыс. руб. '+
	'Ответ приведите в тыс. руб.';

window.vopr.text=c.plusminus();
window.vopr.correctAnswers=[v1?p2:p1];

window.vopr.categories['log']=0;
window.vopr.categories['prz']=0;
window.vopr.categories['drs']=0;
window.vopr.categories['tri']=0;
})();

