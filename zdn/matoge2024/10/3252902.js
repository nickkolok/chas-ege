(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '3918958';
		let preference = ['diffColors', 'sameColors'];
		let targetColor = getSelectedPreferenceFromList(key, preference);
		
        let color1 = sl(10, 40, 1);
        let color2 = sl(5, 30, 1);
        let total = color1 + color2;

        let probability = [color1 - 1, color2][targetColor] / (total - 1);
        let colorSecond = ['тоже',''][targetColor];
		let colorName = om.trickyColors.iz(2);
		let item =sklonlxkand(['карандаш', 'фломастер', 'маркер', 'ластик', 'транспортир', 'циркуль', 'угольник', 'корректор', 'степлер', 'трафорет'].iz());

        genAssertZ1000(probability);

        NAtask.setTask({
            text: 'Из ящика, где хранятся ' + declensionOfAdjectives(color1, colorName[0])+ ' и ' + declensionOfAdjectives(color2, (colorName[1])) + chislitlx(color2,item.ie, 're').replace(color2, '') + ', ' +
                'не глядя достали два ' + item.re + '. Известно, что первый ' + item.ie + ' оказался ' + colorName[0].replace('ый', 'ым') + '. ' +
                'Найдите вероятность того, что второй ' + item.ie + ' оказался ' + colorSecond + ' ' + colorName[targetColor].replace('ый', 'ым') + '.',
            answers: probability,
            preference: preference,
        });
    }, 100);
})();
//3252902
//Открытый банк заданий 31A2A6
