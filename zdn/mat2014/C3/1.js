(function(){

var a=sl(2,9);
var b=sl(2,5);
var x1=sl(-3,-1);
var x2=slKrome(-x1,1,3);

window.vopr.txt=('а) Решите систему неравенств:'+
	'$$\\left\\{\\begin{array}{l}'+
	[''+a+'^x',['\\frac{1}{'+a+'^x}','\\left(\\frac{1}{'+a+'}\\right)^x'].iz()].shuffle().slag()+'>2'+
	'\\\\'+
	''+b+'^{x^2}'+' \\leq '+b.pow(-x1*x2)+'\\cdot'+b+'^{'+(x1+x2)+'x}'+
	'\\end{array}\\right.$$').plusminus();

window.vopr.ver=['$['+x1+';0)\\cup(0;'+x2+']$'];
})();
