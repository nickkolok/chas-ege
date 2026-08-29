(function () {
    'use strict';
    retryWhileError(function () {
        let n1 = sl(50, 500);
        let n2 = sl(50, 500);
        let n3 = sl(50, 500);
        
        while (n2 === n1) { n2 = sl(50, 500); }
        while (n3 === n1 || n3 === n2) { n3 = sl(50, 500); }
        
        let isMin = sl1();
        let target = isMin ? Math.min(n1, n2, n3) : Math.max(n1, n2, n3);
        let targetWord = isMin ? 'наименьшее' : 'наибольшее';
        
        let text = `Определите ${targetWord} среди чисел, записанных в двоичной, восьмеричной и шестнадцатеричной системах счисления:\n\n`;
        text += `${n1.toString(2)}_2, ${n2.toString(8)}_8, ${n3.toString(16).toUpperCase()}_16.\n\n`;
        text += `В ответе запишите число в десятичной системе счисления. Основание системы счисления указывать не нужно.`;
        
        NAtask.setTask({
            text: text,
            answers: target,
        });
        NAtask.modifiers.assertSaneDecimals();
    }, 100);
})();