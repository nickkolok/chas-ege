(function(){'use strict';

var a=sluchch(1,9).pm();
var b=slKrome(a.abs(),1,9).pm();
var q=sluchch(2,7);

var n = q==2? sluchch(3,13,2) : [3,5].iz();

var sgn=[-1,1].iz();
var part;

if((a*a-a*b+sgn*2)!=0)
    part='('+(b-a)+'x+'+(a*a-a*b+sgn*q)+')^{'+n+'}';
else if(b-a!=1)
    part='('+(b-a)+'x'+')^{'+n+'}';
else
    part=(b-a)+'x^{'+n+'}';

chas2.task.setEquationTask({
    parts: [part, sgn*Math.pow(q,n)],
    roots: a,
    enablePartsSubtraction: 1,
});
})();

//282849
//282850
//Белозоров Никита
