(function() {
    retryWhileError(function() {
        'use strict';
        NAinfo.requireApiVersion(0, 2);

        let key = "508394";
        let preference = ['liquid_ask_pour', 'liquid_ask_total', 'total_ask_pour', 'total_ask_liquid'];
        let randPref = getSelectedPreferenceFromList(key, preference);
        
        let N = sl(2, 4);
        let shapes = [
            {name: 'конуса', power: 3},
            {name: 'правильной треугольной пирамиды', power: 3},
            {name: 'правильной четырёхугольной пирамиды', power: 3},
            {name: 'цилиндра', power: 1},
            {name: 'прямоугольного параллелепипеда', power: 1}
        ];
        let shapeObj = shapes.iz();
        let shape = shapeObj.name;
        let power = shapeObj.power;
        
        let fractionText = `\\frac{1}{${N}}`;
        let text = '';
        let answers = '';

        if (randPref === 0) {
            let V = sl(10, 100);
            answers = V * (N**power - 1);
            text = `В сосуде, имеющем форму ${shape}, уровень жидкости достигает $${fractionText}$ высоты. Объём жидкости равен $${V}$ мл. Сколько миллилитров жидкости нужно долить, чтобы наполнить сосуд доверху?`;
        } else if (randPref === 1) {
            let V = sl(10, 100);
            answers = V * (N**power);
            text = `В сосуде, имеющем форму ${shape}, уровень жидкости достигает $${fractionText}$ высоты. Объём жидкости равен $${V}$ мл. Какова вместимость сосуда (в мл)?`;
        } else if (randPref === 2) {
            let C = sl(10, 100);
            let V_total = C * (N**power);
            answers = C * (N**power - 1);
            text = `В сосуде, имеющем форму ${shape}, уровень жидкости достигает $${fractionText}$ высоты. Объём сосуда равен $${V_total}$ мл. Сколько миллилитров жидкости нужно долить, чтобы наполнить сосуд доверху?`;
        } else {
            let C = sl(10, 100);
            let V_total = C * (N**power);
            answers = C;
            text = `В сосуде, имеющем форму ${shape}, уровень жидкости достигает $${fractionText}$ высоты. Объём сосуда равен $${V_total}$ мл. Сколько миллилитров жидкости уже налито в сосуд?`;
        }

        NAtask.setTask({
            text: text,
            answers: answers,
            authors: ['Селена'],
            preference: [preference],
        });
    }, 2000);
})();
//508394
