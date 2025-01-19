'use strict';

// Объявление объекта `vopr` в глобальной области видимости.
window.vopr = {};

// Функция `checkStandardData` проверяет, существует ли стандартная версия данных `candidate` в массиве `correctAnswers`.
window.vopr.checkStandardData = function(candidate) {
    for (var index = 0; index < this.correctAnswers.length; index++) {
        // Преобразуем данные в стандартный формат для сравнения
        this.correctAnswers[index] = this.correctAnswers[index].istDataToStd();
        if (this.correctAnswers[index] == candidate.istDataToStd())
            return 1; // Возвращаем 1, если найдено совпадение
    }
    return 0; // Возвращаем 0, если совпадений нет
};

// Функция `checkTimestampMatch` проверяет, совпадает ли временная метка `ts` объекта `candidate` с любым элементом в массиве `correctAnswers`.
window.vopr.checkTimestampMatch = function(candidate) {
    for (var index = 0; index < this.correctAnswers.length; index++) {
        if (this.correctAnswers[index].ts() == candidate.ts())
            return 1; // Возвращаем 1, если найдено совпадение
    }
    return 0; // Возвращаем 0, если совпадений нет
};

// Функция `compareListWithAnswers` сравнивает список, полученный из `candidate`, с массивом `correctAnswers`, удаляя дубликаты и сортируя.
window.vopr.compareListWithAnswers = function(candidate) {
    return '' + candidate.split(/;\s*/g).sortDelDubl() == '' + chaslib.toStringsArray(this.correctAnswers).sortDelDubl();
};

// Функция `initializeQuestion` инициализирует объект `vopr` с начальными значениями.
window.vopr.initializeQuestion = function() {
    window.vopr.dey = function() {}; // Пустая функция `dey`
    window.vopr.correctAnswers = []; // Массив для правильных ответов
    window.vopr.incorrectAnswers = []; // Массив для неправильных ответов
    window.vopr.text = ''; // Текст вопроса
    window.vopr.solution = ''; // Решение вопроса
    window.vopr.categories = []; // Категории вопроса
    window.vopr.authors = []; // Авторы вопроса
    window.vopr.dgn = 1; // Флаг диагностики
    window.vopr.error = 0; // Флаг ошибки
    window.vopr.vrn = window.vopr.checkTimestampMatch; // Установка функции проверки по умолчанию
}
window.vopr.initializeQuestion(); // Вызов функции инициализации

// Функция `trd` вызывает метод `dey` объекта `vopr` в строгом режиме, игнорируя ошибки.
window.vopr.trd = function() {
    'use strict';
    try {
        window.vopr.dey(); // Попытка вызова функции `dey`
    } catch (e) {
        // Игнорируем ошибки
    }
}

// Функция `AtoB` генерирует текстовые варианты ответов, учитывая количество неверных ответов `numberOfIncorrect`.
function AtoB(numberOfIncorrect) {
    // numberOfIncorrect - количество неверных ответов
    numberOfIncorrect = numberOfIncorrect ? numberOfIncorrect : 3; // Устанавливаем значение по умолчанию
    if (window.vopr.incorrectAnswers.hasDubl()) {
        // Удаляем дубликаты из неправильных ответов
        window.vopr.incorrectAnswers = window.vopr.incorrectAnswers.sortDelDubl();
        console.log('AtoB(): nev: повторяющиеся варианты;');
    }
    if (window.vopr.correctAnswers.hasDubl()) {
        // Удаляем дубликаты из правильных ответов
        window.vopr.correctAnswers = window.vopr.correctAnswers.sortDelDubl();
        console.log('AtoB(): ver: повторяющиеся варианты;');
    }
    if (vopr.dgn && dvig.dgn && dvig.validateVopr()) {
        // Проверка на ошибки в диагностике
        vopr.error = 1;
        return;
    }
    var incorrect = window.vopr.incorrectAnswers.iz(numberOfIncorrect); // Получаем неправильные ответы
    var correct = window.vopr.correctAnswers.iz(); // Получаем правильный ответ
    var options = [[correct].concat(incorrect), [].N(numberOfIncorrect + 1)].T().shuffle().T(); // Генерируем варианты ответов
    window.vopr.correctAnswers = [options[1].indexOf(1) + 1]; // Устанавливаем правильный ответ
    window.vopr.incorrectAnswers = []; // Очищаем неправильные ответы
    for (var i = 0; i <= numberOfIncorrect; i++) {
        // Формируем текст с вариантами ответов
        window.vopr.text += '<br/>' + (i + 1) + ') ' + options[0][i];
    }
}

console.log('core_vopr.js отработал'); // Сообщение о завершении работы скрипта
