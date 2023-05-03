function matrixOfEvent(length, number) {
    let matrix = [];
    for (let i = 0; i < length; i++) {
        matrix.push((i).toString(2));
        while (matrix[i].length < number)
            matrix[i] = matrix[i].replace(/^/, '0');
    }
    let event = [];
    let count;
    for (let i = 0; i < length; i++) {
        count = 0;
        event.push([]);
        for (let j = 0; j < number; j++) {
            if (!(matrix[i] % 10))
                count++;
            event[i].push(matrix[i] % 10);
            matrix[i] -= matrix[i] % 10;
            matrix[i] /= 10;
        }
        event[i].push(count);
    }


    return event;
}
(function() {
    retryWhileError(function() {
        NAinfo.requireApiVersion(0, 2);
        let number = sl(2, 6);
        let length = (2).pow(number);
        let event = matrixOfEvent(length, number);
        let ev = [];
        for (let i = 0; i < length; i++)
            ev.push(event[i].pop());
        let lamps = ['двумя', 'тремя','четырьмя','пятью','шестью'];
        let probability = sl(0.1, 0.5, 0.01);
        //1 перегорит
        //2 перегорит
        //1 НЕ перегорит
        //2 НЕ перегорит
        let variant = sl(1, number);
        let answ = 0;
            for (let i = 0; i < length; i++)
                if (ev[i] >= variant)
                    answ += probability.pow(ev[i]) * (1-probability).pow(number - ev[i]);
        let task = 'хотя бы ' + chislitlx(variant, 'лампа');
        if (number == variant)
            task = 'все лампы';
        let work = 'перегорит';
        if (variant > 1)
            work = 'перегорят';
        genAssertZ1000(answ * 1000, 'Кривой ответ');
        NAtask.setTask({
            text: 'Помещение освещается ' + lamps[number - 2] + ' лампами. ' +
                'Вероятность перегорания каждой лампы в течение года равна ' + probability.ts() + '. ' +
                'Лампы перегорают независимо друг от друга. Найдите вероятность того, ' +
                'что в течение года ' + task + ' ' + work + '.',
            answers: answ,
        });
    });
})();
//SugarHedgehog
//320175 320583 320585 320587 320589 320591 320593 320595 320597 320599 320601 320603 320605 320607 320609 320611 320613 320615 320617 320619 320621 320623 320625 320627 320629 320631 320633 320635 320637 320639
