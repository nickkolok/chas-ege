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
		let colorName =['зелён', 'жёлт', 'красн', 'фиолетов', 'оранжев', 'голуб', 'оранжев', 'розов', 'бел', 'чёрн', 'коричнев',].iz(2);
		let item =sklonlxkand(['карандаш', 'фломастер', 'маркер', 'ластик', 'транспортир', 'циркуль', 'угольник', 'корректор', 'степлер', 'трафорет'].iz());

        genAssertZ1000(probability);

        NAtask.setTask({
            text: 'Из ящика, где хранятся $' + color1 + '$ ' + colorName[0] + 'ых и $' + color2 + '$ ' + colorName[1] + 'ых ' + item.rm + ', ' +
                'не глядя достали два ' + item.re + '. Известно, что первый ' + item.ie + ' оказался ' + colorName[0] + 'ым. ' +
                'Найдите вероятность того, что второй ' + item.ie + ' оказался ' + colorSecond + ' ' + [colorName[0], colorName[1]][targetColor] + 'ым.',
            answers: probability,
            preference: preference,
        });
    }, 100);
})();
//3252902
//Открытый банк заданий 31A2A6
