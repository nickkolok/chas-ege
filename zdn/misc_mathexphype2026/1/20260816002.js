(function(){'use strict';
retryWhileError(function(){
    let coins = [
        {
            weights: [1, 2, 5, 10, 0.5],
            divs: [50, 20, 10, 5, 1],
        },
    ].iz();

    let w = coins.weights;
    let c4, c3, c2, c1, c0;
    let attempts = 0;
    do {
        c4 = sluchch(1, 5);
        c3 = sluchch(1, 10);
        c2 = sluchch(5, 30);
        c1 = sluchch(10, 40);
        attempts++;
        if (attempts > 100) throw new Error("Cannot generate coins");
    } while (c1 + c2 + c3 + c4 >= 100);
    c0 = 100 - (c1 + c2 + c3 + c4);

    let sum = c0*w[0] + c1*w[1] + c2*w[2] + c3*w[3] + c4*w[4];
    let s = sum / 100;

    let wStr = w.map(x => x === 0.5 ? '0,5' : x.toLocaleString('ru-RU'));
    let cStr = [c0, c1, c2, c3, c4].map(x => x.toLocaleString('ru-RU'));

    let y = ['Достоинство монеты (в рублях)'].concat(wStr).tr('th');
    let z = [['Количество монет'].concat(cStr).tr()];
    let table = (y + z.soed()).vTabl();

    let preference = ['table', 'text'];
    let displayMode = getSelectedPreferenceFromList('misc_mathexphype2026_1_20260816002', preference);

    let condition = '';
    if (displayMode === 0) {
        condition = table;
    } else {
        condition = `монет достоинством ${wStr[0]} руб. — ${cStr[0]} шт.,<br/>` +
                    `монет достоинством ${wStr[1]} руб. — ${cStr[1]} шт.,<br/>` +
                    `монет достоинством ${wStr[2]} руб. — ${cStr[2]} шт.,<br/>` +
                    `монет достоинством ${wStr[3]} руб. — ${cStr[3]} шт.,<br/>` +
                    `монет достоинством ${wStr[4]} руб. — ${cStr[4]} шт.<br/>`;
    }

    let analys = `Математическое ожидание случайной величины равно сумме произведений её возможных значений на вероятности этих значений.<br/>` +
                 `Так как всего в копилке 100 монет, вероятность выпадения монеты каждого достоинства равна количеству таких монет, делённому на 100.<br/>` +
                 `$$M(X) = ${wStr[0]} \cdot rac{${cStr[0]}}{100} + ${wStr[1]} \cdot rac{${cStr[1]}}{100} + ${wStr[2]} \cdot rac{${cStr[2]}}{100} + ${wStr[3]} \cdot rac{${cStr[3]}}{100} + ${wStr[4]} \cdot rac{${cStr[4]}}{100} = ${s}$$`;

    NAtask.setTask({
        text: `Мальчик Вася копит деньги на велосипед. В его копилке лежит ровно 100 монет достоинством 1, 2, 5, 10 и 50 копеек (0,5 рубля). Распределение монет по достоинству следующее:<br/><br/>${condition}Вася трясёт копилку, и из неё выпадает одна случайно выбранная монета. Найдите математическое ожидание достоинства выпавшей монеты. Ответ дайте в рублях.`,
        answers: s,
        analys: analys,
        preference: [preference],
    });
    NAtask.modifiers.allDecimalsToStandard(true);
}, 2000);
})();
