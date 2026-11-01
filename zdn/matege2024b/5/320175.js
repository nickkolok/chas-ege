(function() {
    retryWhileError(function() {
        NAinfo.requireApiVersion(0, 2);
        let key = '320175';
		let preference = ['two', 'three', 'four', 'five', 'six'];
        let preference2 = ['lamps', 'terminals'];
        let device = getSelectedPreferenceFromList(key, preference2);
        let numberOfLamps = getSelectedPreferenceFromList(key, preference) + 2;
        let totalCombinations = Math.pow(2, numberOfLamps);
        let eventMatrix = generateBinaryMatrix(numberOfLamps);
        
        let zeroCounts = eventMatrix.map(event => event.pop());
        let lampDescriptions = ['двумя', 'тремя', 'четырьмя', 'пятью', 'шестью'];
        let failureProbability = sl(10, 50)/100;
        let requiredFailures = sl(1, numberOfLamps);
        
        let probabilitySum = 0;
        for (let i = 0; i < totalCombinations; i++) {
            if (zeroCounts[i] >= requiredFailures) {
                probabilitySum += Math.pow(failureProbability, zeroCounts[i]) * Math.pow(1 - failureProbability, numberOfLamps - zeroCounts[i]);
            }
        }
        
        let taskDescription = requiredFailures === numberOfLamps ? 'все лампы' : `хотя бы ${chislitlx(requiredFailures, 'лампа')}`;
        let verb = requiredFailures > 1 ? 'перегорят' : 'перегорит';
        
        genAssertZ1000(probabilitySum * 10, 'Кривой ответ');
        NAtask.setTask({
            text: (device ? `В магазине установлены ${chislitlx(numberOfLamps, 'автомат')}. Вероятность неисправности каждого равна ${failureProbability.ts()}. Неисправности независимы. Найдите вероятность того, что неисправны ${requiredFailures === numberOfLamps ? 'все автоматы' : 'хотя бы ' + chislitlx(requiredFailures, 'автомат')}.` : `Помещение освещается ${lampDescriptions[numberOfLamps - 2]} лампами. ` +
                  `Вероятность перегорания каждой лампы в течение года равна ${failureProbability.ts()}. ` +
                  `Лампы перегорают независимо друг от друга. Найдите вероятность того, ` +
                  `что в течение года ${taskDescription} ${verb}.`),
            answers: probabilitySum,
            preference: [preference, preference2],
        });
    });
})();
// Сверка ФИПИ: все исходные коды соответствующих позиций.
// 5.125: E0F8F7, 874308, BBED73, 2373BE, C563B8, 464824, 1FD521, CCAED0, 4FCB96, 15329D, 27E3EC
// 5.137: 1C114B, CF6990
// 5.138: A1E946, 0BD12E, 9E91A8, BDA2C1, 94BFCA, 33A9CE, 40BF93, 18D0E9, 7C7630
