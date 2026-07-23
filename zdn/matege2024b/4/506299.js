(function() { 'use strict'; retryWhileError(function() {
    let a=sluchch(1,30);
    let b=sluchch(1,30);
    let h=sluchch(1,30);
    let S=((a+b)/2)*h;
    NAtask.setTask({
        text:'Площадь трапеции вычисляется по формуле $S=\\frac{a+b}{2}h$, где $a$ и $b$ — основания трапеции, $h$ - eё высота. Пользуясь этой формулой, найдите $S$, если $'+
        ['a='+a, 'b='+b, 'h='+h].shuffleJoin('$, $')+'$.',
        answers: S,
    });
    NAtask.modifiers.allDecimalsToStandard(/*true*/);
    }, 20000);})(); 
//VeronikaKit
//РешуЕГЭ 506299
