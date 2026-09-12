(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        // Генерация параметров лотереи
        let totalTickets = sluchch(500, 2000, 100);
        let ticketPrice = sluchch(30, 100, 10);

        // Генерация выигрышей
        let w1 = sluchch(5, 20, 5);
        let w2 = sluchch(40, 90, 10);
        let w3 = sluchch(100, 500, 50);
        let w4 = sluchch(1000, 10000, 500);
        let winAmounts = [w1, w2, w3, w4];

        let count4 = sl(1, 3);
        let count3 = sluchch(4, 10);
        let count2 = sluchch(11, 15);

        let minCount1 = sl(50, 100, 10);
        let remaining = totalTickets - count4 - count3 - count2;

        genAssert(remaining > minCount1, "Недостаточно билетов для малого выигрыша");

        let count1 = remaining;
        let counts = [count1, count2, count3, count4];

        // Расчет математического ожидания
        let sumWin = 0;
        for (let i = 0; i < 4; i++) {
            sumWin += winAmounts[i] * counts[i];
        }

        let mathExpectation = sumWin / totalTickets;

        let answer = ticketPrice - mathExpectation;

        genAssertZ1000(answer / 10);
        genAssert(answer > 0, "Цена билета должна быть выше матожидания");
        genAssert(answer <= ticketPrice, "Разница не может быть больше цены билета");

        // Формирование строки таблицы
        let tableRows = '';
        tableRows += '<tr><td>Выигрыш (руб.)</td>';
        for (let w of winAmounts) {
            tableRows += `<td>${w}</td>`;
        }
        tableRows += '</tr>';

        tableRows += '<tr><td>Количество билетов</td>';
        for (let c of counts) {
            tableRows += `<td>${c}</td>`;
        }
        tableRows += '</tr>';

        let tableHtml =`<table border="1" style="border-collapse: collapse; text-align: center; margin: 10px auto;">${tableRows}</table>`.replace(/<td>/g, '<td style="padding: 8px 15px; min-width: 60px;">');
        
        NAtask.setTask({
            text: `В таблице показано количество билетов и возможные выигрыши беспроигрышной денежной лотереи. Цена билета лотереи равна ${ticketPrice} рублей. Всего билетов выпущено ${totalTickets} штук. Участник покупает один случайный билет. На сколько рублей цена билета выше, чем математическое ожидание выигрыша?` +
                `<br/>${tableHtml}`,
            answers: answer,
            analys: `Математическое ожидание выигрыша равно сумме произведений всех возможных выигрышей на их вероятности. ` +
                `Вероятность выиграть сумму $W_i$ равна $\\frac{N_i}{N_{total}}$, где $N_i$ — количество билетов с этим выигрышем, $N_{total} = ${totalTickets}$.` +
                `<br/>$E = \\frac{${winAmounts[0]} \\cdot ${counts[0]} + ${winAmounts[1]} \\cdot ${counts[1]} + ${winAmounts[2]} \\cdot ${counts[2]} + ${winAmounts[3]} \\cdot ${counts[3]}}{${totalTickets}} = ${mathExpectation}$ руб.` +
                `<br/>Разница между ценой билета и математическим ожиданием: $${ticketPrice} - ${mathExpectation} = ${answer}$ руб.`
        });

        NAtask.modifiers.allDecimalsToStandard(true);
    });
})();
//509353
