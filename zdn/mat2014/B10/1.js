(function() {

var a = NLsets.alphabets.english.get_random_items(4);
var b='В прямоугольном параллелепипеде ';
var c=sluchiz(window.pifagtr,1)[0];
var d=sluchch(1,5);
var f=sluchch(2,30);
var g=' известно, что ';
var h='Найдите площадь сечения, проходящего через вершины ';
var m=b+' $'+a.soed()+a.join('_{1}')+'_{1}'+'$ '+g;
var n1=sluchiz([(a[0]+a[1]),(a[2]+'_{1}'+a[3]+'_{1}')])[0]+' = ' + c[0];
var n2=sluchiz([(a[0]+'_{1}'+a[3]+'_{1}'),(a[2]+a[1])])[0]+' = ' + c[1];
//var n3=sluchiz([(a[0]+'_{1}'+a[2]+'_{1}'),(a[3]+a[1])])[0].mesh()+' = ' + c[2];
var p=sluchiz(a,1)[0];
var n3=p+p+'_{1} = '+f;
var r=sluchiz(
				sluchiz([
						[a[0],a[2],a[0]+'_{1}',a[2]+'_{1}'],
						[a[1],a[3],a[1]+'_{1}',a[3]+'_{1}']
						],1)[0]
			 ,3);

window.vopr.txt=m+' $'+n1+'$, $'+n2+'$, $'+n3+'$. '+h+'$'+r[0]+'$, $'+r[1]+'$ и $'+r[2]+'$.';
window.vopr.ver=[''+(c[2]*f)];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
