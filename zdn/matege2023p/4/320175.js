(function() {
    retryWhileError(function() {
        NAinfo.requireApiVersion(0, 2);
        let numberOfLamps = sl(2, 6);
        let totalCombinations = Math.pow(2, numberOfLamps);
        let eventMatrix = generateBinaryMatrix(numberOfLamps);
        
        let zeroCounts = eventMatrix.map(event => event.pop());
        let lampDescriptions = ['двумя', 'тремя', 'четырьмя', 'пятью', 'шестью'];
        let failureProbability = sl(0.1, 0.5, 0.01);
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
            text: `Помещение освещается ${lampDescriptions[numberOfLamps - 2]} лампами. ` +
                  `Вероятность перегорания каждой лампы в течение года равна ${failureProbability.ts()}. ` +
                  `Лампы перегорают независимо друг от друга. Найдите вероятность того, ` +
                  `что в течение года ${taskDescription} ${verb}.`,
            answers: probabilitySum,
        });
    });
})();
