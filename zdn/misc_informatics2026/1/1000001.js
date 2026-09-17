(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let v1 = sl(256, 511);
        let v2, v3;
        do { v2 = sl(256, 511); } while (v2 == v1);
        do { v3 = sl(256, 511); } while (v3 == v1 || v3 == v2);

        let vals = [v1, v2, v3];
        let bases = [2, 8, 16];
        
        for (let i = bases.length - 1; i > 0; i--) {
            let j = sl(0, i);
            let temp = bases[i];
            bases[i] = bases[j];
            bases[j] = temp;
        }
        
        let nums = [];
        for(let i=0; i<3; i++) {
            let val = vals[i];
            let base = bases[i];
            let str = val.toString(base);
            if (base === 16) {
                str = str.toUpperCase();
            }
            nums.push(str + '<sub>' + base + '</sub>');
        }
        
        let isMin = sl1();
        let word = isMin ? 'наименьшее' : 'наибольшее';
        let answer = isMin ? Math.min(v1, v2, v3) : Math.max(v1, v2, v3);
        
        NAtask.setTask({
            text: 'Определите ' + word + ' среди чисел, записанных в двоичной, восьмеричной и шестнадцатеричной системах счисления: ' +
                  nums.join(', ') + '. ' +
                  'В ответе запишите число в десятичной системе счисления. Основание системы счисления указывать не нужно.',
            answers: answer,
        });

    }, 1000);
})();
//1000001
