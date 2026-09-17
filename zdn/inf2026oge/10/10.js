(function () {
    'use strict';
    retryWhileError(function () {
        let key = 'inf2026oge_10';
        let preference = ['findMin', 'findMax'];
        let rand = getSelectedPreferenceFromList(key, preference);
        
        let n1 = sl(50, 500);
        let n2 = slKrome(n1, 50, 500);
        let n3 = slKrome([n1, n2], 50, 500);
        
        let isMin = (rand === 0);
        let target = isMin ? Math.min(n1, n2, n3) : Math.max(n1, n2, n3);
        let targetWord = isMin ? 'наименьшее' : 'наибольшее';
        
        let text = `Определите ${targetWord} среди чисел, записанных в двоичной, восьмеричной и шестнадцатеричной системах счисления:\n\n`;
        text += `${n1.toString(2)}_2, ${n2.toString(8)}_8, ${n3.toString(16).toUpperCase()}_16.\n\n`;
        text += `В ответе запишите число в десятичной системе счисления. Основание системы счисления указывать не нужно.`;
        
        NAtask.setTask({
            text: text,
            answers: target,
            preference: preference,
        });
    }, 100);
})();