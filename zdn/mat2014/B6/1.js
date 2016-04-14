(function() {

function monet(r,n){
	if(n>r)return 0;
	if(n==r)return 1;
	if(n==0)return 1;

	return monet(r-1,n-1)+monet(r-1,n);
}
var a=sluchch(2,4);
var b=sluchch(1,a);
var c=sluchiz(window.moneta,1)[0];

var d='В случайном эксперименте симметричную монету бросают '+a+' раза.';
var f=' Какова вероятность того, что '+c+' выпадет '+window.razy[b]+'?';
window.vopr.txt=d+f;
window.vopr.ver=[''+(monet(a,b)/Math.pow(2,a))];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
