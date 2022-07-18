(function(){'use strict';

var b=sluchch(1,8);
var c=sluchch(b+1,9);

var a=sluchch((c/b).ceil(),10);
var sgn=[-1,1].iz();
var whichroot=[];

if(sgn==1){
    whichroot=[
        'наибольший',
        'положительный',
        'неотрицательный',
    ];
}

else{
    whichroot=[
        'наименьший',
        'отрицательный',
        'неположительный',
    ];
}

chas2.task.setEquationTask({
    customPreamble: 'Найдите ' + whichroot.iz() + ' корень уравнения',
	parts: [b.texfrac(c)+'x^2', (a*a*b).texmixedfrac(c)],
	roots: a*sgn,
	enablePartsSubtraction: 1,
});
})();

//77371 с изменённым текстом
//Белозоров Никита
