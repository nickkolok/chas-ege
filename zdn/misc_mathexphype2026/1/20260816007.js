(function(){'use strict';
retryWhileError(function(){

    let variants = [
        {
            prices: [2500, 3500, 5000, 7000, 9000],
        },
        {
            prices: [2000, 3000, 4500, 6000, 8000],
        },
        {
            prices: [3000, 4000, 5500, 7500, 10000],
        },
    ].iz();

    let p = variants.prices;
    let c0 = sluchch(8, 15, 1);
    let c1 = sluchch(5, 12, 1);
    let c2 = sluchch(3, 8, 1);
    let c3 = sluchch(2, 5, 1);
    let c4 = sluchch(1, 3, 1);

    let total = c0 + c1 + c2 + c3 + c4;
    let s = (p[0]*c0 + p[1]*c1 + p[2]*c2 + p[3]*c3 + p[4]*c4) / total;
    genAssertZ1000(s, 'Ответ должен быть целым числом');

    let pStr = p.map(x => x.toLocaleString('ru-RU'));
    let cStr = [c0, c1, c2, c3, c4].map(x => x.toLocaleString('ru-RU'));
    let tStr = total.toLocaleString('ru-RU');

    let y = ['Цена (в рублях)'].concat(pStr).tr('th');
    let z = [['Количество пар'].concat(cStr).tr()];
    let table = (y + z.soed()).vTabl();

    let preference = ['table', 'text'];
    let displayMode = getSelectedPreferenceFromList('misc_mathexphype2026_1_20260816007', preference);

    let condition = '';
    if (displayMode === 0) {
        condition = table;
    } else {
        condition = `цена ${pStr[0]} рублей — ${cStr[0]} пар,<br/>` +
                    `цена ${pStr[1]} рублей — ${cStr[1]} пар,<br/>` +
                    `цена ${pStr[2]} рублей — ${cStr[2]} пар,<br/>` +
                    `цена ${pStr[3]} рублей — ${cStr[3]} пар,<br/>` +
                    `цена ${pStr[4]} рублей — ${cStr[4]} пар.<br/>`;
    }

    let analys = `Математическое ожидание случайной величины равно сумме произведений её возможных значений на вероятности этих значений.<br/>` +
                 `Вероятность каждой цены равна отношению количества пар по этой цене к общему количеству пар (${tStr}).<br/>` +
                 `$$M(X) = ${pStr[0]} \cdot \frac{${cStr[0]}}{${tStr}} + ${pStr[1]} \cdot \frac{${cStr[1]}}{${tStr}} + ${pStr[2]} \cdot \frac{${cStr[2]}}{${tStr}} + ${pStr[3]} \cdot \frac{${cStr[3]}}{${tStr}} + ${pStr[4]} \cdot \frac{${cStr[4]}}{${tStr}} = ${s}$$`;

    NAtask.setTask({
        text: `Одиннадцатиклассница купила к 1 сентября туфли на ПВЗ, не глядя на цену. Она взяла первую попавшуюся коробку своего размера. В магазине были туфли её размера по следующим ценам:<br/><br/>${condition}Найдите математическое ожидание величины «цена купленных туфель». Ответ дайте в рублях.`,
        answers: s,
        analys: analys,
        preference: [preference],
    });
    NAtask.modifiers.allDecimalsToStandard(true);
}, 2000);
})();
