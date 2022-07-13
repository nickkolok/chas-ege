(function(){'use strict';

function preamble(Sol,notSol){
    if(Sol==notSol)
        return '';

    if(Sol>0 && notSol<0)
        return [
            'наибольший',
            'положительный',
            'неотрицательный',
        ].iz();

    if(Sol<0 && notSol>0)
        return [
            'наименьший',
            'отрицательный',
            'неположительный',
        ].iz();

    if(Sol>0 && notSol>Sol)
        return 'наименьший';

    if(notSol>0 && Sol>notSol)
        return 'наибольший';

    if(Sol<0 && notSol<Sol)
        return 'наибольший';

    if(notSol<0 && Sol<notSol)
        return 'наименьший';

    if(Sol==0 && notSol>0)
        return [
            'наименьший',
            'неположительный',
        ].iz();

    if(Sol==0 && notSol<0)
        return [
            'наибольший',
            'неотрицательный',
        ].iz();

    if(notSol==0 && Sol>0)
        return [
            'наибольший',
            'положительный',
        ].iz();

    if(notSol==0 && Sol<0)
        return [
            'наименьший',
            'отрицательный',
        ].iz();

}

var a=sluchch(1,9).pm();
var x1=sluchch(1,9).pm();
var x2=slKrome(x1.abs(),1,9).pm();

chas2.task.setAdditiveEquationTask({
    customPreamble: 'Найдите ' + preamble(x1,x2) + ' корень уравнения',
	parts: [
		a+'x^2',
		(-1)*a*(x1+x2)+'x',
		a*x1*x2,
	],
	roots: x1,
});
})();

//26667
//Белозоров Никита
