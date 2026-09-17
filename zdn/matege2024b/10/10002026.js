(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '10002026';
        let preference = ['speedLimit30', 'speedLimit40', 'speedLimit50', 'speedLimit60', 'speedLimit70', 'speedLimit80', 'speedLimit90', 'speedLimit100', 'speedLimit110'];
        let rand = getSelectedPreferenceFromList(key, preference);

        // Параметры
        let speedLimits = [30, 40, 50, 60, 70, 80, 90, 100, 110];
        let speedLimit = speedLimits[rand];
        let totalVehicles = sl(2, 40, 1) * 500; // от 1000 до 20000 с шагом 500

        // Второе нарушение
        let otherViolations = [
            {name: 'проезд на запрещающий сигнал светофора', fine: 1500},
            {name: 'использование мобильного телефона за рулём', fine: 1500},
            {name: 'отсутствие ремня безопасности', fine: 1500},
            {name: 'пересечение сплошной линии разметки между попутными полосами движения', fine: 1500},
            {name: 'заезд за стоп-линию', fine: 800},
        ];
        let otherViolation = otherViolations.iz();
        let otherViolationCount = sl(10, 300, 5);

        // Интервалы скоростей
        let intervals = [];
        for (let i = 0; i <= 150; i += 10) {
            intervals.push({min: i, max: i + 9});
        }
        intervals.push({min: 160, max: null}); // 160 и более
        // Всего 17 интервалов

        // Генерируем количество машин в каждом интервале
        let counts = [];
        let remaining = totalVehicles;
        for (let i = 0; i < intervals.length - 1; i++) {
            let maxPossible = remaining - (intervals.length - 1 - i);
            let c = sl(0, Math.floor(maxPossible / 2));
            counts.push(c);
            remaining -= c;
        }
        counts.push(remaining);
        counts.shuffle();

        // Функция определения штрафа за превышение скорости
        function getSpeedingFine(speed) {
            let excess = speed - speedLimit;
            if (excess < 20) return 0;
            if (excess < 40) return 750;
            if (excess < 60) return 1500;
            if (excess < 80) return 2500;
            return 5000;
        }

        // Посчитать сумму штрафов за превышение скорости
        let totalSpeedingFine = 0;
        let speedingTable = [];
        for (let i = 0; i < intervals.length; i++) {
            let speed = intervals[i].min;
            let fine = getSpeedingFine(speed);
            totalSpeedingFine += fine * counts[i];
            if (fine > 0) {
                speedingTable.push({
                    interval: intervals[i],
                    count: counts[i],
                    fine: fine
                });
            }
        }

        // Общая сумма штрафов
        let totalFine = totalSpeedingFine + otherViolationCount * otherViolation.fine;

        // Матожидание штрафа на одно ТС
        let expectedValue = totalFine / totalVehicles;

        // Проверка что результат конечный и разумный
        genAssert(expectedValue > 0, 'матожидание должно быть положительным');
        genAssert(expectedValue < 10000, 'матожидание должно быть разумным');

        // Формируем текст таблицы
        let tableHTML = '<table border="1" cellpadding="5" style="border-collapse: collapse; margin: 10px 0;"><thead><tr><th>Интервал скоростей (км/ч)</th><th>Количество ТС</th></tr></thead><tbody>';
        for (let i = 0; i < intervals.length; i++) {
            let label;
            if (intervals[i].max === null) {
                label = intervals[i].min + ' и более';
            } else {
                label = intervals[i].min + '–' + intervals[i].max;
            }
            tableHTML += '<tr><td>' + label + '</td><td>' + counts[i] + '</td></tr>';
        }
        tableHTML += '</tbody></table>';

        // Формируем текст задачи
        let taskText = 'На столбе висит камера фиксации нарушений ПДД. Максимальная разрешённая скорость в зоне действия камеры составляет $' + speedLimit + '$ км/ч. ';
        taskText += 'За отчётный период через зону действия камеры проехало $' + totalVehicles + '$ транспортных средств. ';
        taskText += 'В таблице приведено количество транспортных средств, имевших скорость в каждом из контрольных диапазонов.';
        taskText += tableHTML;
        taskText += 'Камера также зафиксировала $' + otherViolationCount + '$ случаев нарушения «' + otherViolation.name + '» (штраф $' + otherViolation.fine + '$ руб.). ';
        taskText += 'За превышение разрешённой скорости менее чем на $20$ км/ч штраф не назначается; ';
        taskText += 'от $20$ до $39$ км/ч — штраф $750$ руб.; ';
        taskText += 'от $40$ до $59$ км/ч — штраф $1500$ руб.; ';
        taskText += 'от $60$ до $79$ км/ч — штраф $2500$ руб.; ';
        taskText += 'на $80$ км/ч и более — штраф $5000$ руб. ';
        taskText += 'Каково математическое ожидание штрафа, выписанного каждому из $' + totalVehicles + '$ транспортных средств? ';
        taskText += 'Ответ выразите в рублях.';

        // Формируем решение
        let solution = 'Сначала посчитаем сумму штрафов за превышение скорости. ';
        solution += 'Для каждого интервала скоростей определяем характерную скорость (нижнюю границу интервала) и вычисляем превышение над разрешённой скоростью $' + speedLimit + '$ км/ч. ';
        solution += '<br/><br/>';

        let totalSpeeding = 0;
        for (let i = 0; i < speedingTable.length; i++) {
            let st = speedingTable[i];
            let label = st.interval.max === null ? st.interval.min + '+' : st.interval.min + '–' + st.interval.max;
            solution += 'Интервал $' + label + '$ км/ч: превышение ' + (st.interval.min - speedLimit) + ' км/ч, штраф $' + st.fine + '$ руб., количество ТС: $' + st.count + '$. Сумма штрафов: $' + st.fine + ' \cdot ' + st.count + ' = ' + (st.fine * st.count) + '$ руб.<br/>';
            totalSpeeding += st.fine * st.count;
        }

        solution += '<br/>Общая сумма штрафов за превышение скорости: $' + totalSpeeding + '$ руб. ';
        solution += '<br/>Сумма штрафов за нарушение «' + otherViolation.name + '»: $' + otherViolationCount + ' \cdot ' + otherViolation.fine + ' = ' + (otherViolationCount * otherViolation.fine) + '$ руб. ';
        solution += '<br/><br/>Общая сумма всех штрафов: $' + totalSpeeding + ' + ' + (otherViolationCount * otherViolation.fine) + ' = ' + totalFine + '$ руб. ';
        solution += '<br/><br/>Математическое ожидание штрафа на одно транспортное средство: $' + totalFine + ' / ' + totalVehicles + ' = ' + expectedValue + '$ руб.';

        NAtask.setTask({
            text: taskText,
            solution: solution,
            answers: expectedValue,
            preference: preference,
        });
    }, 20000);
})();
// chas-ege-selena
// Камера фиксации нарушений ПДД: матожидание штрафа
