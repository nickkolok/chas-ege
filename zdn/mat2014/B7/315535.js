(function(){retryWhileError(function(){'use strict';

var a=sluchch(2,7);
var b=sluchch(1,9).pm();
var c=sluchch(1,9).pm();
var d=sluchch(1,9);
var n=sluchch(1,5);

var part = [
	[a+'^{\\log_{'+a.pow(n)+'}{('+b+'x+'+c+')}}', d,],
	[a+'^{\\log_{'+a.pow(n)+'}{' +b+'x+'+c+ '}}', d,],
];

var x = [];

var x1=(d.pow(n)-c)/b;
genAssertZ1000(x1, "Один из корней очень нецелый");
x.pushIf(x1, b*x1+c>0);

var x2=(d.pow(n))/(b*(a.pow(c*n)));
genAssertZ1000(x2, "Один из корней очень нецелый");
x.pushIf(x2, b*x2>0 && x2.abs()<5000 && b>0);

genAssertNonempty(x, "Корни не попадают в ОДЗ!");

var i, j;

if(x.includes(x1) && x.includes(x2)){
    i=j=[0,1].iz();
}
else if(x.includes(x1)){
    i=j=0;
}
else if(x.includes(x2)){
    i=1;
    j=0;
}

chas2.task.setEquationTask({
	parts: part[i],
	roots: x[j],
	enablePartsSubtraction: 1,
});
});})();

//315535
//Белозоров Никита
