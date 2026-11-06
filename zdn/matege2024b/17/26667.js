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
let preference = ['full', 'zeroRoot', 'oppositeRoots'];
let variant = getSelectedPreferenceFromList('26667', preference);
var x2 = variant === 1 ? 0 : variant === 2 ? -x1 : slKrome(x1.abs(),1,9).pm();
if (variant === 1 && sl1()) {
    [x1, x2] = [x2, x1];
}

chas2.task.setAdditiveEquationTask({
    customPreamble: 'Найдите ' + preamble(x1,x2) + ' корень уравнения',
	preference: preference,
	parts: [
		a+'x^2',
		(-1)*a*(x1+x2)+'x',
		a*x1*x2,
	].filter(term => term !== '0x^2' && term !== '0x' && term !== 0),
	enablePartsDivision: 0,
	roots: x1,
});
})();

//26667
//Белозоров Никита

// A56777, B904D2, DB03C1, AD604F, 147DC0, 215385, 6264AA, B8EC0F, F8CD61, AC5265, 374E6B, 4D6A35, FDD8B8, BAFE47, 00AD5C, 2941A5, 46188A, 7D221B, F1F824, EE82C0, 6539B5, 780511, BC6D9B, EB0E65, D4B103, 044AA7, 6A4D3C, BFB48F, 8D616C, 474905, 61E1D7, 209F6F, 3F16E7, 476338, 588436, 4E653D, 4AF886, B8752B, 2D050E
