(function(){'use strict';
retryWhileError(function(){
    let imenam = ['Вася', 'Петя', 'Миша', 'Коля', 'Саша', 'Дима', 'Сергей', 'Иван'];
    let isGirl = sluchch(0, 1);
    let name, pupil, pronounPossessive;
    
    if (isGirl) {
        name = window.imenaj.ie.iz();
        pupil = 'Школьница';
        pronounPossessive = 'её';
    } else {
        name = imenam.iz();
        pupil = 'Школьник';
        pronounPossessive = 'его';
    }

    let coins = [
        {
            weights: [1, 2, 5, 10, 0.5],
            divs: [50, 20, 10, 5, 1],
        },
    ].iz();

    let w = coins.weights;
    let c4 = sluchch(1, 10);
    let c3 = sluchch(2, 15);
    let c2 = sluchch(5, 30);
    let c1 = sluchch(5, 30);
    let c0 = sluchch(10, 50);

    let sum = c0 + c1 + c2 + c3 + c4;
    let totalValue = c0*w[0] + c1*w[1] + c2*w[2] + c3*w[3] + c4*w[4];
    let s = totalValue / sum;

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
                 `Вероятность выпадения монеты каждого достоинства равна количеству таких монет, делённому на их общее количество (${sum}).<br/>` +
                 `$$M(X) = ${wStr[0]} \cdot rac{${cStr[0]}}{${sum}} + ${wStr[1]} \cdot rac{${cStr[1]}}{${sum}} + ${wStr[2]} \cdot rac{${cStr[2]}}{${sum}} + ${wStr[3]} \cdot rac{${cStr[3]}}{${sum}} + ${wStr[4]} \cdot rac{${cStr[4]}}{${sum}} = ${s}$$`;

    NAtask.setTask({
        text: `${pupil} ${name} копит деньги на велосипед. В ${pronounPossessive} копилке лежат монеты достоинством 1, 2, 5, 10 и 50 копеек (0,5 рубля). Распределение монет по достоинству следующее:<br/><br/>${condition}${name} трясёт копилку, и из неё выпадает одна случайно выбранная монета. Найдите математическое ожидание достоинства выпавшей монеты. Ответ дайте в рублях.`,
        answers: s,
        analys: analys,
        preference: [preference],
    });
    NAtask.modifiers.allDecimalsToStandard(true);
}, 2000);
})();
