(function() {

var a=sluchch(0.1,2.5,0.1);
var b=sluchch(2,4);
var c=sluchch(5,60);
var d=sluchch(5,20);
var f=sluchch(0.1,2.5,0.1);

window.vopr.txt='Больному прописано лекарство, которое нужно пить по '+a.ts()+' г '+b+' раза в день в течение '+
	chislitlx(c,'день','r')+'. '+	'В одной упаковке '+d+' таблеток лекарства по '+f.ts()+
	' г. Какого наименьшего количества упаковок хватит на весь курс лечения?';

window.vopr.ver=[(a*b*c/d/f).ceil().ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
