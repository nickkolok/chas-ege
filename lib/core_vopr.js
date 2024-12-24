'use strict';

// Объявление объекта `vopr` в глобальной области видимости.
window.vopr = {};

// Функция `vrn_ist` проверяет, существует ли стандартная версия данных `kand` в массиве `ver`.
window.vopr.vrn_ist = function(candidate) {
    for (var index = 0; index < this.correctAnswers.length; index++) {
        this.correctAnswers[index] = this.correctAnswers[index].istDataToStd();
        if (this.correctAnswers[index] == candidate.istDataToStd())
            return 1;
    }
    return 0;
};

// Функция `vrn_mat` проверяет, совпадает ли временная метка `ts` объекта `kand` с любым элементом в массиве `ver`.
window.vopr.vrn_mat = function(candidate) {
    for (var index = 0; index < this.correctAnswers.length; index++)
        if (this.correctAnswers[index].ts() == candidate.ts())
            return 1;
    return 0;
};

// Функция `vrn_list` сравнивает список, полученный из `kand`, с массивом `ver`, удаляя дубликаты и сортируя.
window.vopr.vrn_list = function(candidate) {
    return '' + candidate.split(/;\s*/g).sortDelDubl() == '' + chaslib.toStringsArray(this.correctAnswers).sortDelDubl();
};

// Функция `podg` инициализирует объект `vopr` с начальными значениями.
window.vopr.podg = function() {
    window.vopr.dey = function() {};
    window.vopr.correctAnswers = [];
    window.vopr.incorrectAnswers = [];
    window.vopr.text = '';
    window.vopr.solution = '';
    window.vopr.kat = [];
    window.vopr.authors = [];
    window.vopr.dgn = 1;
    window.vopr.err = 0;
    window.vopr.vrn = window.vopr.vrn_mat;
}
window.vopr.podg();

// Функция `trd` вызывает метод `dey` объекта `vopr` в строгом режиме, игнорируя ошибки.
window.vopr.trd = function() {
    'use strict';
    try {
        window.vopr.dey();
    } catch (e) {}
}

// Функция `AtoB` генерирует текстовые варианты ответов, учитывая количество неверных ответов `n`.
function AtoB(numberOfIncorrect) {
    // numberOfIncorrect - количество неверных ответов
    numberOfIncorrect = numberOfIncorrect ? numberOfIncorrect : 3;
    if (window.vopr.incorrectAnswers.hasDubl()) {
        window.vopr.incorrectAnswers = window.vopr.incorrectAnswers.sortDelDubl();
        console.log('AtoB(): nev: повторяющиеся варианты;');
    }
    if (window.vopr.correctAnswers.hasDubl()) {
        window.vopr.correctAnswers = window.vopr.correctAnswers.sortDelDubl();
        console.log('AtoB(): ver: повторяющиеся варианты;');
    }
    if (vopr.dgn && dvig.dgn && dvig.validateVopr()) {
        vopr.err = 1;
        return;
    }
    var incorrect = window.vopr.incorrectAnswers.iz(numberOfIncorrect);
    var correct = window.vopr.correctAnswers.iz();
    var options = [[correct].concat(incorrect), [].N(numberOfIncorrect + 1)].T().shuffle().T();
    window.vopr.correctAnswers = [options[1].indexOf(1) + 1];
    window.vopr.incorrectAnswers = [];
    for (var i = 0; i <= numberOfIncorrect; i++) {
        window.vopr.text += '<br/>' + (i + 1) + ') ' + options[0][i];
    }
}

console.log('core_vopr.js отработал');
